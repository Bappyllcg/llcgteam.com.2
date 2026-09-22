/**
 * LLCG Team - Agency-Grade Clean URL & SPA Page Transition Router
 * Supports local dev server, custom domains, and GitHub Pages (subpaths & custom domain)
 */

(function () {
  'use strict';

  // 1. Dynamic Base Path Detection (Supports localhost, custom domain, and github.io/repo-name)
  function getBasePath() {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    if (hostname.endsWith('github.io')) {
      const segments = pathname.split('/').filter(Boolean);
      if (segments.length > 0) {
        return '/' + segments[0];
      }
    }
    return '';
  }

  const BASE_PATH = getBasePath();

  // 2. Decode GitHub Pages SPA Redirect (from 404.html)
  (function decodeGitHubPagesRedirect() {
    const search = window.location.search;
    if (search && search.startsWith('?/')) {
      const parts = search.slice(2).split('&');
      const cleanRoute = parts[0].replace(/~and~/g, '&');
      const remainingSearch = parts.slice(1).join('&');
      const searchStr = remainingSearch ? '?' + remainingSearch.replace(/~and~/g, '&') : '';
      const hashStr = window.location.hash || '';

      const targetPath = (BASE_PATH ? BASE_PATH : '') + '/' + cleanRoute.replace(/^\/+/, '');
      window.history.replaceState(null, '', targetPath + searchStr + hashStr);
    }
  })();

  // 3. Immediately sanitize any legacy .html in the URL bar
  (function sanitizeHtmlExtension() {
    const pathname = window.location.pathname;
    if (pathname.endsWith('.html')) {
      let clean = pathname.replace(/\.html$/, '');
      if (clean === '/index' || clean === BASE_PATH + '/index') {
        clean = BASE_PATH ? BASE_PATH + '/' : '/';
      }
      window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
    }
  })();

  // Cache fetched pages for instantaneous transitions
  const pageCache = new Map();
  let isNavigating = false;

  // Resolve an internal link to a clean canonical pathname
  function resolveTargetUrl(href) {
    try {
      const resolved = new URL(href, window.location.origin + BASE_PATH + '/');
      if (resolved.origin !== window.location.origin) return null;

      let cleanPathname = resolved.pathname;

      // Normalize .html
      if (cleanPathname.endsWith('.html')) {
        cleanPathname = cleanPathname.replace(/\.html$/, '');
        if (cleanPathname.endsWith('/index')) {
          cleanPathname = cleanPathname.slice(0, -6) || '/';
        }
      }

      // Trailing slash normalization (except root or base path root)
      if (cleanPathname.length > 1 && cleanPathname.endsWith('/')) {
        cleanPathname = cleanPathname.slice(0, -1);
      }

      resolved.pathname = cleanPathname;
      return resolved;
    } catch (e) {
      return null;
    }
  }

  // Fetch page HTML with smart fallback
  async function fetchPage(cleanUrl) {
    const targetUrl = new URL(cleanUrl, window.location.origin);
    const cacheKey = targetUrl.pathname;

    if (pageCache.has(cacheKey)) {
      return pageCache.get(cacheKey);
    }

    let response = await fetch(targetUrl.href, {
      headers: { 'X-Requested-With': 'LLCG-Router' }
    });

    // If server does not have clean URL rewrites, fall back to .html
    if (!response.ok && response.status === 404 && !targetUrl.pathname.endsWith('.html')) {
      const htmlUrl = new URL(targetUrl.href);
      const subpath = targetUrl.pathname === '/' || targetUrl.pathname === BASE_PATH || targetUrl.pathname === BASE_PATH + '/'
        ? (BASE_PATH ? BASE_PATH + '/index.html' : '/index.html')
        : targetUrl.pathname + '.html';
      htmlUrl.pathname = subpath;

      const fallbackResponse = await fetch(htmlUrl.href);
      if (fallbackResponse.ok) {
        response = fallbackResponse;
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to load ${targetUrl.pathname}`);
    }

    const htmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    pageCache.set(cacheKey, doc);
    return doc;
  }

  // Swap page DOM and execute transitions
  async function navigateTo(targetUrl, pushState = true) {
    if (isNavigating) return;
    isNavigating = true;

    // Close mobile/radial cover menu if open
    if (window.closeCoverMenu) {
      window.closeCoverMenu();
    }

    try {
      const doc = await fetchPage(targetUrl.href);
      const newMain = doc.querySelector('main');
      const currentMain = document.querySelector('main');

      if (!newMain || !currentMain) {
        // Fallback to normal navigation if page structure differs
        window.location.href = targetUrl.href;
        return;
      }

      const performSwap = () => {
        // 1. Update Document Title
        document.title = doc.title;

        // 2. Update Meta Tags
        ['meta[name="description"]', 'meta[property="og:title"]', 'meta[property="og:description"]'].forEach(selector => {
          const newEl = doc.querySelector(selector);
          const curEl = document.querySelector(selector);
          if (newEl && curEl) curEl.setAttribute('content', newEl.getAttribute('content'));
        });

        // 3. Update Body Classes & Theme
        document.body.className = doc.body.className;
        const newTheme = doc.body.getAttribute('data-theme') || 'dark';
        document.body.setAttribute('data-theme', newTheme);

        // 4. Swap Main Content
        currentMain.replaceWith(newMain);

        // 5. Update Active Menu Items
        updateActiveNavLinks(targetUrl.pathname);

        // 6. Reset Scroll
        if (window.lenisInstance) {
          window.lenisInstance.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }

        // 7. Update History State
        if (pushState) {
          window.history.pushState({ path: targetUrl.pathname }, '', targetUrl.pathname + targetUrl.search + targetUrl.hash);
        }

        // 8. Re-initialize interactive features
        if (window.initPageFeatures) {
          window.initPageFeatures();
        }
      };

      // Use native View Transitions API if supported
      if (document.startViewTransition) {
        await document.startViewTransition(() => performSwap()).finished;
      } else {
        // Agency-grade smooth CSS crossfade fallback
        currentMain.style.transition = 'opacity 0.2s cubic-bezier(0.475, 0.425, 0, 0.995), transform 0.2s cubic-bezier(0.475, 0.425, 0, 0.995)';
        currentMain.style.opacity = '0';
        currentMain.style.transform = 'translateY(8px)';

        await new Promise(resolve => setTimeout(resolve, 200));
        performSwap();

        const activeMain = document.querySelector('main');
        if (activeMain) {
          activeMain.style.opacity = '0';
          activeMain.style.transform = 'translateY(-8px)';
          activeMain.style.transition = 'opacity 0.28s cubic-bezier(0.475, 0.425, 0, 0.995), transform 0.28s cubic-bezier(0.475, 0.425, 0, 0.995)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              activeMain.style.opacity = '1';
              activeMain.style.transform = 'translateY(0)';
            });
          });
        }
      }
    } catch (err) {
      console.warn('[LLCG Router] Dynamic navigation fallback:', err);
      window.location.href = targetUrl.href;
    } finally {
      isNavigating = false;
    }
  }

  // Update active styling on navigation items
  function updateActiveNavLinks(currentPath) {
    const normCurrent = currentPath.replace(/\/+$/, '') || '/';
    document.querySelectorAll('.menu-nav-link, footer a').forEach(link => {
      const linkTarget = resolveTargetUrl(link.getAttribute('href'));
      if (!linkTarget) return;
      const normLink = linkTarget.pathname.replace(/\/+$/, '') || '/';
      if (normLink === normCurrent) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  }

  // Intercept Click Events
  document.addEventListener('click', function (e) {
    // Only handle primary left click without modifier keys
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) {
      return;
    }

    const anchor = e.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    // Ignore hash-only anchors (#manifesto, #work, #contact)
    if (href.startsWith('#')) return;

    // Ignore protocols
    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;

    // Ignore explicit download or external target
    if (anchor.hasAttribute('download') || anchor.getAttribute('target') === '_blank') return;
    if (anchor.getAttribute('rel') === 'external' || anchor.hasAttribute('data-no-router')) return;

    const targetUrl = resolveTargetUrl(href);
    if (!targetUrl) return;

    // If same path, let in-page hash scroll or do nothing
    if (targetUrl.pathname === window.location.pathname && !targetUrl.hash) {
      e.preventDefault();
      if (window.lenisInstance) {
        window.lenisInstance.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    e.preventDefault();
    navigateTo(targetUrl, true);
  });

  // Handle Browser Back & Forward Buttons
  window.addEventListener('popstate', function () {
    const targetUrl = new URL(window.location.href);
    navigateTo(targetUrl, false);
  });

  // Expose Router API
  window.LLCGRouter = {
    navigate: (url) => {
      const target = resolveTargetUrl(url);
      if (target) navigateTo(target, true);
    },
    getBasePath: () => BASE_PATH
  };

  console.log('[LLCG Router] Initialized. Base path:', BASE_PATH || '/');
})();
