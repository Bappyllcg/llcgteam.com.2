/**
 * LLCG Team Data Store
 * Official studio data: Websites, Enterprise-Level ERP & Custom Web-Based Software
 * Headquarters: Fulbari, Dinajpur, BD
 * WhatsApp: +880 1303-755748 | Email: mail.llcgteam@gmail.com
 */

const LLCG_DATA = {
  agency: {
    name: "LLCG Team",
    domain: "llcgteam.com",
    tagline: "A digital studio focused on web, enterprise-level ERP, and custom web-based software.",
    email: "mail.llcgteam@gmail.com",
    phone: "+880 1303-755748",
    whatsapp: "+880 1303-755748",
    whatsappUrl: "https://wa.me/8801303755748?text=Hello%20LLCG%20Team%2C%20I%20would%20like%20to%20discuss%20a%20project.",
    location: "Fulbari, Dinajpur, Bangladesh & Worldwide",
    address: "Fulbari, Dinajpur, BD",
    founded: "2016",
    yearsInnovation: "10+",
    completedProjects: "150+",
    clientsRetained: "99.8%",
    dataTransactions: "50M+"
  },

  navigation: [
    { number: "01", label: "HOME", href: "./", key: "home" },
    { number: "02", label: "WORK", href: "work", key: "work" },
    { number: "03", label: "SERVICES", href: "services", key: "services" },
    { number: "04", label: "ABOUT", href: "about", key: "about" },
    { number: "05", label: "CONTACT", href: "lets-talk", key: "contact" }
  ],

  footerLinks: [
    { label: "Home", href: "./" },
    { label: "Work", href: "work" },
    { label: "Services", href: "services" },
    { label: "About", href: "about" },
    { label: "Contact", href: "lets-talk" }
  ],

  projects: [
    {
      id: "omnierp",
      title: "OmniERP Suite",
      client: "Apex Manufacturing Global",
      category: "Enterprise ERP & Supply Chain",
      year: "2026",
      tags: ["Enterprise ERP", "Supply Chain", "PostgreSQL", "Multi-Plant Sync"],
      summary: "Comprehensive industrial ERP ecosystem orchestrating inventory, multi-warehouse logistics, bill of materials (BOM), and financial ledgers across 12 manufacturing facilities.",
      challenge: "Legacy disjointed desktop databases caused 18-hour reporting delays, inventory discrepancies, and lack of real-time auditability across distributed plant operations.",
      solution: "Architected a high-concurrency cloud ERP system with ACID-compliant relational databases, real-time inventory ledgering, automated purchase-order approval workflows, and role-based access control (RBAC).",
      impact: "-68% Inventory Discrepancy, 12 Plants Synchronized in Real-Time, 99.99% Core System Uptime",
      bgGradient: "linear-gradient(135deg, #064e3b 0%, #022c22 60%, #111827 100%)",
      accentColor: "#10b981",
      accentGradient: "from-emerald-600 to-teal-700",
      image: "assets/images/project-omnicloud.svg"
    },
    {
      id: "novapay",
      title: "NovaPay Treasury",
      client: "NovaPay Financial Inc.",
      category: "Fintech & Web Platform",
      year: "2026",
      tags: ["Web Application", "Fintech Portal", "WebSocket Realtime", "Security"],
      summary: "Institutional multi-currency payment platform and automated treasury engine handling high-velocity cross-border transactions.",
      challenge: "Legacy web architecture suffered from slow page-loads, unverified websocket connections, and complex reconciliation between disparate banking APIs.",
      solution: "Engineered a high-performance web platform utilizing event-driven microservices, sub-second conversion rate streams, and bank-grade data encryption.",
      impact: "+240% User Conversion, $4.2B Annual Transaction Volume, Sub-second Execution Speed",
      bgGradient: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
      accentColor: "#6366f1",
      accentGradient: "from-indigo-600 to-purple-600",
      image: "assets/images/project-novapay.svg"
    },
    {
      id: "apexflow",
      title: "ApexFlow ERP",
      client: "TransCorp Logistics & Trade",
      category: "Enterprise ERP & HRMS",
      year: "2025",
      tags: ["Enterprise ERP", "HR & Payroll", "Multi-Branch Ledger", "Automation"],
      summary: "Unified business management platform combining double-entry general ledger, biometric attendance sync, automated tax payroll, and vendor billing.",
      challenge: "Managing hundreds of branch employees and manual spreadsheets created severe accounting compliance hurdles and payroll calculation errors.",
      solution: "Delivered a centralized enterprise web ERP with modular permission hierarchy, automated payroll computation, real-time balance sheets, and audit-ready fiscal reporting.",
      impact: "100% Payroll Accuracy, 4.5x Faster Month-End Financial Close, Zero Compliance Penalties",
      bgGradient: "linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f3f46 100%)",
      accentColor: "#f84525",
      accentGradient: "from-orange-600 to-red-600",
      image: "assets/images/project-aether.svg"
    },
    {
      id: "healthpulse",
      title: "HealthPulse Portal",
      client: "PrimeCare Healthcare Network",
      category: "Web-Based Software & EMR",
      year: "2025",
      tags: ["Web-Based Software", "Hospital Management", "HIPAA Compliant", "Cloud Portal"],
      summary: "Web-based clinical operations software integrating patient electronic medical records, diagnostic scheduling, lab reporting, and pharmacy stock.",
      challenge: "Physical paperwork and disjointed clinic terminals resulted in lengthy patient wait times and siloed medical records.",
      solution: "Constructed an ultra-secure, intuitive web application with encrypted patient timelines, doctor consultation workflows, and real-time pharmacy inventory sync.",
      impact: "85% Reduction in Patient Waiting Time, 65,000+ Electronic Records Migrated Securely",
      bgGradient: "linear-gradient(135deg, #1e293b 0%, #0f172a 60%, #0284c7 100%)",
      accentColor: "#38bdf8",
      accentGradient: "from-sky-500 to-blue-600",
      image: "assets/images/project-zenith.svg"
    },
    {
      id: "logisticspro",
      title: "LogisticsPro Cloud",
      client: "InterFreight Global Express",
      category: "Custom Web Software & Telemetry",
      year: "2024",
      tags: ["Custom Web Software", "Fleet Tracking", "RESTful API", "Live Telemetry"],
      summary: "Cloud-native freight operations web portal featuring live GPS vehicle dispatch, automated route manifests, and client delivery verification.",
      challenge: "Lack of central visibility over 450+ fleet units led to delayed dispatches, fuel wastage, and manual driver check-in calls.",
      solution: "Engineered a reactive web dashboard with geospatial mapping, automated dispatch algorithms, and instant SMS/WhatsApp delivery status triggers.",
      impact: "+32% Fleet Fuel Efficiency, 10,000+ Daily Waybills Tracked, 99.4% On-Time Delivery",
      bgGradient: "linear-gradient(135deg, #1f2937 0%, #111827 60%, #0f172a 100%)",
      accentColor: "#f59e0b",
      accentGradient: "from-amber-500 to-orange-600",
      image: "assets/images/project-omnicloud.svg"
    },
    {
      id: "primecommerce",
      title: "PrimeCommerce Flagship",
      client: "Nordic Living Brand",
      category: "Website & Headless E-Commerce",
      year: "2024",
      tags: ["High-Performance Website", "Headless Commerce", "Design System", "Core Web Vitals"],
      summary: "Ultra-fast headless commerce flagship website featuring bespoke product customizers, international checkout, and sub-800ms page transitions.",
      challenge: "Monolithic e-commerce platform suffered from 4.8s mobile load times, high checkout abandonment, and poor mobile search engine rankings.",
      solution: "Built an elevated, custom-engineered website utilizing headless commerce APIs, image CDN edge optimization, and fluid micro-animations.",
      impact: "+185% Mobile Conversion Lift, 99 Lighthouse Performance Score, 0.4s Average LCP",
      bgGradient: "linear-gradient(135deg, #18181b 0%, #1f1e1d 60%, #2f2e2d 100%)",
      accentColor: "#f84525",
      accentGradient: "from-red-600 to-rose-700",
      image: "assets/images/project-novapay.svg"
    }
  ],

  services: [
    {
      id: "website",
      watermark: "WEBSITES",
      title: "High-Performance Websites & Digital Flagships",
      subtitle: "We design and engineer bespoke websites that combine emotional aesthetic resonance with lightning-fast technical execution.",
      description: "From custom corporate marketing flagships to complex brand portals, our websites are custom-architected for maximum SEO authority, sub-second speeds, and enduring elegance.",
      capabilities: [
        "Custom Corporate Websites",
        "Responsive UI/UX Architecture",
        "Jamstack & Headless CMS",
        "Design Systems & Token Libraries",
        "Core Web Vitals & Speed Optimization",
        "Technical SEO & Schema Markup",
        "Interactive Motion & 60fps Micro-Interactions"
      ],
      metrics: "Consistently scoring 98+ on Google Lighthouse, sub-800ms Time-to-Interactive"
    },
    {
      id: "erp",
      watermark: "ENTERPRISE ERP",
      title: "Enterprise-Level ERP Systems & Automation",
      subtitle: "Custom-built, scalable ERP architectures engineered to eliminate operational bottlenecks and unify business processes.",
      description: "We architect mission-critical enterprise resource planning software tailored to manufacturing, supply chain, retail, and corporate operations. Complete with robust databases, multi-branch synchronization, and audit-proof workflows.",
      capabilities: [
        "Multi-Plant Supply Chain & Logistics",
        "Inventory & Warehouse Tracking",
        "General Ledger & Double-Entry Accounting",
        "HRMS, Biometric Sync & Automated Payroll",
        "Multi-Branch & Multi-Currency Architecture",
        "Role-Based Access Control (RBAC) & Audit Logs",
        "Custom Analytics & Executive Reporting"
      ],
      metrics: "Zero data inconsistency, ACID-compliant transactions, 99.99% mission-critical uptime"
    },
    {
      id: "software",
      watermark: "WEB SOFTWARE",
      title: "Custom Web-Based Software & Cloud Platforms",
      subtitle: "Tailored SaaS platforms, internal operations portals, and secure cloud software engineered for complex business demands.",
      description: "When generic off-the-shelf software fails your business logic, we engineer bespoke web-based applications with bulletproof backend architecture, reactive APIs, and frictionless user interfaces.",
      capabilities: [
        "B2B & B2C Cloud SaaS Platforms",
        "Custom Workflow & Operations Portals",
        "High-Concurrency RESTful & GraphQL APIs",
        "Database Optimization (PostgreSQL, MySQL, Redis)",
        "Legacy Software & Spreadsheet Modernization",
        "Third-Party Banking, Payment & Telemetry Integrations",
        "End-to-End Maintenance & SLA Support"
      ],
      metrics: "Over 50M+ annual database transactions handled across our deployed software"
    }
  ],

  insights: [
    {
      id: "custom-erp-vs-saas",
      date: "September 2026",
      category: "Enterprise ERP Strategy",
      readTime: "7 min read",
      title: "Custom Enterprise ERP vs. Generic Off-The-Shelf SaaS: The 2026 Calculus",
      summary: "Why high-velocity enterprises and manufacturing leaders are ditching bloated subscription SaaS in favor of proprietary, custom-built ERP architectures."
    },
    {
      id: "modern-web-playbook",
      date: "August 2026",
      category: "Web Engineering",
      readTime: "6 min read",
      title: "The Modern Web Playbook: High-Performance Architecture That Resonates & Converts",
      summary: "How our digital studio achieves sub-second page loads, 99+ Core Web Vitals, and kinetic motion without compromising on aesthetic luxury."
    },
    {
      id: "scalable-web-architecture",
      date: "July 2026",
      category: "Software Architecture",
      readTime: "8 min read",
      title: "Architecting Scalable Web Software: Event-Driven Pipelines & Relational Integrity",
      summary: "Inside the backend engineering behind mission-critical web applications: database sharding, asynchronous job queues, and robust role-based security."
    }
  ],

  clients: [
    { name: "Apex Manufacturing", category: "Industrial ERP" },
    { name: "NovaPay Financial", category: "Fintech Platform" },
    { name: "TransCorp Logistics", category: "Supply Chain" },
    { name: "PrimeCare Health", category: "Healthcare EMR" },
    { name: "Nordic Living", category: "Headless E-Commerce" },
    { name: "InterFreight Express", category: "Fleet Telemetry" },
    { name: "CloudScale B2B", category: "Enterprise SaaS" },
    { name: "GlobalRetail Hub", category: "Retail Operations" }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = LLCG_DATA;
}
