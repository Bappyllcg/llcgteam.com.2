/**
 * LLCG Team Data Store
 * Showcase projects, services, insights, and agency stats
 */

const LLCG_DATA = {
  agency: {
    name: "LLCG Team",
    domain: "llcgteam.com",
    tagline: "A digital agency focused on web & digital engineering.",
    email: "hello@llcgteam.com",
    phone: "+880 1303-755748",
    location: "Silicon Valley & Global Studio",
    address: "300 Santana Row, Suite 400, San Jose, CA 95128",
    founded: "2011",
    awards: "120+",
    clientsRetained: "99.8%",
    usersReached: "500M+"
  },

  projects: [
    {
      id: "novapay",
      title: "NovaPay",
      client: "Nova Financial Inc.",
      category: "Fintech & Web Platform",
      year: "2026",
      tags: ["Corporate Website", "Design System", "Full-Stack Web App", "Fintech"],
      summary: "Next-generation global payments and multi-currency treasury engine built for high-growth enterprise scale.",
      challenge: "Legacy architecture struggled with sub-second global conversion transparency and multi-region currency flows.",
      solution: "Engineered an ultra-fast web application with reactive WebSockets, real-time liquidity visualization, and an award-winning brand identity.",
      impact: "+240% User Conversion, $4.2B Volume Processed, Awwwards Site of the Day",
      bgGradient: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
      accentColor: "#6366f1",
      accentGradient: "from-indigo-600 to-purple-600",
      image: "assets/images/project-novapay.svg"
    },
    {
      id: "aether-systems",
      title: "Aether Systems",
      client: "Aether Robotics Corp",
      category: "Autonomous Robotics & AI",
      year: "2025",
      tags: ["Web Experience", "3D Interactive WebGL", "Brand Identity"],
      summary: "AI-powered perception and autonomous humanoid robotics platform deployed in mission-critical manufacturing facilities.",
      challenge: "Communicating complex spatial robotics intelligence with clarity to enterprise customers and tier-1 investors.",
      solution: "Developed an immersive 60fps web experience with interactive 3D robot model inspections and kinetic typography.",
      impact: "$85M Series B Raised, 18.4min Avg Session Time, FWA of the Month",
      bgGradient: "linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f3f46 100%)",
      accentColor: "#f84525",
      accentGradient: "from-orange-600 to-red-600",
      image: "assets/images/project-aether.svg"
    },
    {
      id: "omnicloud",
      title: "OmniCloud",
      client: "Omni Platform Technologies",
      category: "Cloud Infrastructure & DevOps",
      year: "2025",
      tags: ["Enterprise SaaS", "Design System", "Developer Portal"],
      summary: "Zero-latency multi-cloud orchestration and observability mesh for enterprise Kubernetes workloads.",
      challenge: "Fragmented UX across multiple dev tools caused friction during enterprise platform evaluations.",
      solution: "Created an enterprise design system, high-converting product landing page, and frictionless live playground environment.",
      impact: "3.4x Pipeline Velocity, 140K+ Devs Onboarded, Webby Honoree",
      bgGradient: "linear-gradient(135deg, #064e3b 0%, #022c22 60%, #111827 100%)",
      accentColor: "#10b981",
      accentGradient: "from-emerald-600 to-teal-700",
      image: "assets/images/project-omnicloud.svg"
    },
    {
      id: "zenith-health",
      title: "Zenith Health",
      client: "Zenith Therapeutics",
      category: "Precision Biotech & Digital Health",
      year: "2024",
      tags: ["Digital Platform", "Interactive Storytelling", "HealthTech"],
      summary: "Genomic sequencing insights and personalized oncology treatment intelligence for clinical practitioners.",
      challenge: "Bridging scientific oncology research with intuitive clinical patient timeline visualizations.",
      solution: "Delivered a patient-first digital ecosystem featuring accessible interactive charts, HIPAA-compliant flows, and pristine aesthetics.",
      impact: "94% Doctor Usability Score, 45 Global Research Labs Connected",
      bgGradient: "linear-gradient(135deg, #1e293b 0%, #0f172a 60%, #0284c7 100%)",
      accentColor: "#38bdf8",
      accentGradient: "from-sky-500 to-blue-600",
      image: "assets/images/project-zenith.svg"
    }
  ],

  services: [
    {
      id: "website",
      watermark: "WEBSITES",
      title: "Web Design & Development",
      subtitle: "We build impactful digital experiences through world-class UX, visual design, and high-performance engineering.",
      description: "From custom marketing flagships to complex enterprise web platforms, our websites are architected for speed, conversion, and enduring elegance.",
      capabilities: [
        "Digital Product UX/UI",
        "Responsive Web Design",
        "Full-Stack Web Engineering",
        "Design Systems & Token Architecture",
        "CMS Implementation (Headless/Custom)",
        "Performance Optimization & CWV",
        "Micro-Interactions & WebGL Motion"
      ],
      metrics: "Average 99+ Lighthouse performance scores, under 800ms Time-to-Interactive"
    },
    {
      id: "creative",
      watermark: "CREATIVE",
      title: "Brand Identity & Art Direction",
      subtitle: "We design visually-engaging marketing assets and brand identities that propel category-defining companies forward.",
      description: "Every touchpoint is crafted to tell an authentic story—establishing visual systems that scale seamlessly across digital channels and products.",
      capabilities: [
        "Brand Strategy & Positioning",
        "Visual Identity Systems",
        "Typography & Color Theory",
        "3D Motion & Kinetic Graphics",
        "Editorial Art Direction",
        "Marketing Campaigns & Collateral",
        "Interactive Design Guidelines"
      ],
      metrics: "Over 40 distinct brand identities successfully deployed across Silicon Valley"
    },
    {
      id: "strategy",
      watermark: "STRATEGY",
      title: "Digital Strategy & Growth",
      subtitle: "We identify business challenges and develop tailor-made technical and design solutions to achieve your goals.",
      description: "Rooted in user research and empirical data, our strategic framework accelerates customer acquisition, maximizes LTV, and ensures brand loyalty.",
      capabilities: [
        "Conversion Rate Optimization (CRO)",
        "User Journey Mapping",
        "Technical Architecture Audits",
        "SEO Strategy & Search Architecture",
        "Analytics & Behavioral Tracking",
        "Competitive Market Benchmarking",
        "Digital Roadmap Planning"
      ],
      metrics: "+185% average conversion lift within 90 days of project deployment"
    }
  ],

  insights: [
    {
      id: "partnership",
      date: "September 2026",
      category: "Web & Digital Design",
      readTime: "6 min read",
      title: "Building an Unrivaled Partnership with Your Digital Agency",
      summary: "How modern high-growth tech companies and creative studios collaborate synchronously to build category-defining web experiences."
    },
    {
      id: "modern-playbook",
      date: "August 2026",
      category: "Frontend Architecture",
      readTime: "8 min read",
      title: "The Modern Web Playbook: Launching a Platform That Resonates & Converts",
      summary: "Exploring the convergence of micro-animations, ultra-responsive typography, and headless web engineering for B2B enterprises."
    },
    {
      id: "ai-growth",
      date: "July 2026",
      category: "AI & Future Web",
      readTime: "5 min read",
      title: "Where AI Meets Growth: Future-Ready Digital Products in 2026",
      summary: "Designing conversational interfaces and generative experiences that elevate human intent without cluttering UI purity."
    }
  ],

  clients: [
    { name: "Stripe", category: "Fintech" },
    { name: "Figma", category: "Design" },
    { name: "Brex", category: "Finance" },
    { name: "Snowflake", category: "Data Cloud" },
    { name: "Datadog", category: "Monitoring" },
    { name: "Vercel", category: "Cloud" },
    { name: "Supabase", category: "Backend" },
    { name: "Linear", category: "Software" }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = LLCG_DATA;
}
