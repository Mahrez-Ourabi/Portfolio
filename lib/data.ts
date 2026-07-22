export const skills = {
  frontend: [
    { name: 'Next.js', level: 98 },
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 96 },
    { name: 'Tailwind CSS', level: 92 },
    { name: 'Angular', level: 65 },
  ],
  backend: [
    { name: 'Spring Boot', level: 95 },
    { name: 'NestJS', level: 88 },
    { name: 'Laravel', level: 85 },
    { name: 'Node.js', level: 88 },
    { name: 'Django', level: 70 },
  ],
  ai: [
    { name: 'PyTorch', level: 85 },
    { name: 'FastAI', level: 82 },
    { name: 'NLP / Transformers', level: 88 },
    { name: 'Ollama (Local LLMs)', level: 85 },
    { name: 'Scikit-learn', level: 80 },
  ],
  devops: [
    { name: 'Docker', level: 90 },
    { name: 'GitHub Actions', level: 88 },
    { name: 'AWS', level: 72 },
    { name: 'Kubernetes', level: 65 },
    { name: 'CI/CD Pipelines', level: 90 },
  ],
  databases: [
    { name: 'PostgreSQL', level: 88 },
    { name: 'MySQL', level: 88 },
    { name: 'MongoDB', level: 75 },
    { name: 'Oracle', level: 70 },
  ],
  tools: [
    { name: 'Git', level: 96 },
    { name: 'Keycloak / OAuth2', level: 88 },
    { name: 'OpenAPI / Swagger', level: 90 },
    { name: 'Power BI', level: 82 },
    { name: 'Agile / Scrum', level: 95 },
  ],
}

export type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  metrics: { label: string; value: string }[]
  image: string
  reportUrl: string
  color: string
  year: string
  type: string
  caseStudy: {
    period: string
    company: string
    role: string
    overview: string
    challenge: string[]
    myRole: { icon: string; title: string; desc: string }[]
    architecture: { layer: string; tech: string }[]
    results: { label: string; value: string; bar?: number }[]
    stack: { category: string; items: string }[]
    lessons: string[]
    future: string[]
    gallery: { src: string; caption: string }[]
  }
}

export const projects: Project[] = [
  {
    id: 'hire-tech',
    title: 'Hire-Tech',
    subtitle: 'AI-Driven Recruitment Platform',
    description:
      'Enterprise ATS integrating NLP-powered CV parsing (87% accuracy), semantic candidate-job matching with 78% precision, local LLM via Ollama, and a full microservices architecture with Keycloak OAuth2.',
    tags: ['Next.js', 'Spring Boot', 'Python FastAPI', 'PostgreSQL', 'Keycloak', 'Docker', 'Ollama'],
    metrics: [
      { label: 'CV Parsing Accuracy', value: '87%' },
      { label: 'Matching Precision', value: '78%' },
      { label: 'API Response Time', value: '<150ms' },
      { label: 'Test Coverage', value: '85%' },
    ],
    image: '/images/hire-tech.png',
    reportUrl: '/reports/hiretech.pdf',
    color: '#00d4ff',
    year: '2025',
    type: 'Final Year Project',
    caseStudy: {
      period: 'Jan 2025 – Jul 2025',
      company: 'Audaxis Maghreb',
      role: 'Full-Stack Software Engineer (PFE)',
      overview:
        'Hire-Tech is an enterprise-grade AI-powered recruitment platform that automates the entire talent acquisition lifecycle. Built during my final year internship at Audaxis Maghreb, it integrates NLP-based CV parsing, semantic candidate-job matching, complete applicant tracking, interview scheduling, and real-time analytics — all powered by a privacy-first local LLM via Ollama.',
      challenge: [
        'Manual CV screening causing 2–4 week hiring delays',
        'Unconscious bias compromising candidate selection quality',
        'Large application volumes degrading shortlist quality',
        'No GDPR-compliant AI tooling — external LLMs posed data risks',
        'Fragmented tools: no single ATS covering the full hiring lifecycle',
      ],
      myRole: [
        { icon: 'Target', title: 'Product Owner', desc: 'Defined requirements, backlog, and sprint goals across 12 Agile sprints' },
        { icon: 'Layers', title: 'Software Architect', desc: 'Designed the 3-service microservices system with clean service boundaries' },
        { icon: 'Code', title: 'Full-Stack Developer', desc: 'Built Next.js frontend and Spring Boot backend from scratch' },
        { icon: 'Brain', title: 'AI Engineer', desc: 'Implemented NLP CV parsing pipeline and Sentence Transformer matching engine' },
        { icon: 'Container', title: 'DevOps Engineer', desc: 'Containerized all services with Docker and built the GitHub Actions CI/CD pipeline' },
        { icon: 'BarChart2', title: 'Project Manager', desc: 'Led 12 sprints delivering 31 user stories across 3 production releases' },
      ],
      architecture: [
        { layer: 'Frontend', tech: 'Next.js 14 · TypeScript · Tailwind CSS' },
        { layer: 'Backend API', tech: 'Spring Boot 3.2 · Java 17 · Maven · REST' },
        { layer: 'AI Service', tech: 'Python · FastAPI · PyTorch · Ollama · Sentence Transformers' },
        { layer: 'Auth', tech: 'Keycloak 22 · OAuth2 · OIDC · JWT · RBAC' },
        { layer: 'Database', tech: 'PostgreSQL 15 · JSONB · GIN Indexes' },
        { layer: 'DevOps', tech: 'Docker · GitHub Actions · CI/CD · Automated Tests' },
      ],
      results: [
        { label: 'CV Parsing Accuracy', value: '87%', bar: 87 },
        { label: 'Matching Precision', value: '78%', bar: 78 },
        { label: 'API Response Time', value: '<150ms', bar: 92 },
        { label: 'Backend Test Coverage', value: '85%', bar: 85 },
        { label: 'CI/CD Success Rate', value: '98%', bar: 98 },
        { label: 'User Stories Delivered', value: '31 / 3 releases', bar: 100 },
      ],
      stack: [
        { category: 'Frontend', items: 'Next.js 14 · TypeScript · Tailwind · ShadCN' },
        { category: 'Backend', items: 'Spring Boot 3.2 · Java 17 · Maven' },
        { category: 'AI / ML', items: 'Python · FastAPI · PyTorch · Ollama · spaCy' },
        { category: 'Auth', items: 'Keycloak 22 · OAuth2 · OIDC · JWT' },
        { category: 'Database', items: 'PostgreSQL 15 · JSONB · GIN Indexes' },
        { category: 'Testing', items: 'JUnit 5 · Jest · pytest · Cypress' },
        { category: 'DevOps', items: 'Docker · GitHub Actions · CI/CD' },
      ],
      lessons: [
        'Building production-grade NLP pipelines from scratch using PyTorch and spaCy',
        'Designing secure microservices with well-defined boundaries and contracts',
        'Implementing OAuth2/OIDC SSO with Keycloak across multiple services',
        'Privacy-first AI architecture: running LLMs locally with Ollama, zero data leakage',
        'Leading a 6-month Agile project solo as both developer and product owner',
        'Achieving high CI/CD reliability (98%) through rigorous test automation',
      ],
      future: [
        'Third-party HRIS integration (SAP, Workday)',
        'Mobile application (React Native)',
        'Advanced NLP for soft-skill and culture-fit assessment',
        'Team collaboration features for multi-recruiter hiring committees',
      ],
      gallery: [
        { src: '/images/hire-tech.png', caption: 'Main Platform Overview' },
        { src: '/images/hire-tech-dashboard.png', caption: 'Recruiter Dashboard & Kanban' },
        { src: '/images/hire-tech-arch.png', caption: 'Microservices Architecture' },
      ],
    },
  },
  {
    id: 'eyewear-b2b',
    title: 'B2B Eyewear Platform',
    subtitle: 'Secure Invitation-Only E-Commerce',
    description:
      'A private B2B portal for eyewear suppliers with multi-step email verification & admin approval, SSR catalog pages with sub-200ms TTFB, OpenAPI TypeScript clients, and Hetzner Cloud VPC deployment.',
    tags: ['Next.js', 'TypeScript', 'Laravel', 'MySQL', 'Docker', 'GitHub Actions', 'OpenAPI'],
    metrics: [
      { label: 'Bug Reduction', value: '85%' },
      { label: 'Deploy Time', value: '<10min' },
      { label: 'TTFB', value: '<200ms' },
      { label: 'TLS Secured', value: '100%' },
    ],
    image: '/images/eyewear.png',
    reportUrl: '/reports/eyewear-report.pdf',
    color: '#7c3aed',
    year: '2025',
    type: 'Freelance',
    caseStudy: {
      period: 'Mar 2025 – Apr 2025',
      company: 'Private Client',
      role: 'Full-Stack Developer (Freelance)',
      overview:
        'A secure, invitation-only B2B portal enabling verified eyewear suppliers to manage product catalogs and fulfill client orders efficiently. Delivered in 8 weeks from concept to production with zero security incidents, sub-200ms TTFB, and a contract-first API approach that cut integration bugs by 85%.',
      challenge: [
        'Restrict platform access to verified, admin-approved suppliers only',
        'Deliver fast SSR catalog pages suitable for SEO and UX',
        'Eliminate API contract bugs between Next.js frontend and Laravel backend',
        'Automate deployment to Hetzner Cloud VPC with full TLS termination',
        'Deliver production-ready in 8 weeks with a single developer',
      ],
      myRole: [
        { icon: 'Code', title: 'Full-Stack Developer', desc: 'Built both Next.js frontend and Laravel backend end-to-end' },
        { icon: 'Shield', title: 'Security Architect', desc: 'Designed the multi-step invite + email verification + admin approval flow' },
        { icon: 'FileCode', title: 'API Designer', desc: 'Authored OpenAPI spec, auto-generated TypeScript clients for the frontend' },
        { icon: 'Container', title: 'DevOps', desc: 'Containerised with Docker, deployed to Hetzner Cloud with GitHub Actions CI/CD' },
      ],
      architecture: [
        { layer: 'Frontend', tech: 'Next.js · TypeScript · Tailwind CSS · SSR' },
        { layer: 'Backend API', tech: 'Laravel (PHP 8) · Sanctum · REST' },
        { layer: 'Auth', tech: 'Sanctum Tokens · Scoped Roles · Email Verification' },
        { layer: 'Database', tech: 'MySQL · Composite Indexes · Normalized Schema' },
        { layer: 'Infrastructure', tech: 'Hetzner Cloud VPC · TLS Load Balancer' },
        { layer: 'DevOps', tech: 'Docker · GitHub Actions · OpenAPI Codegen' },
      ],
      results: [
        { label: 'API Contract Bug Reduction', value: '85%', bar: 85 },
        { label: 'SSR TTFB', value: '<200ms', bar: 90 },
        { label: 'Deploy Pipeline Time', value: '<10 min', bar: 88 },
        { label: 'TLS Encrypted Traffic', value: '100%', bar: 100 },
        { label: 'Delivery Timeline', value: '8 weeks', bar: 100 },
      ],
      stack: [
        { category: 'Frontend', items: 'Next.js · TypeScript · Tailwind CSS' },
        { category: 'Backend', items: 'Laravel (PHP 8) · Sanctum · JWT' },
        { category: 'Database', items: 'MySQL · Composite Indexing' },
        { category: 'API', items: 'OpenAPI Spec · Auto-generated TS Clients' },
        { category: 'Infrastructure', items: 'Hetzner Cloud VPC · TLS Termination' },
        { category: 'DevOps', items: 'Docker · GitHub Actions' },
      ],
      lessons: [
        'Contract-first API development eliminates the #1 source of frontend/backend bugs',
        'Rapid delivery (8 weeks) with disciplined scope management and SSR-first architecture',
        'B2B security patterns: invite-only onboarding, admin approval gates, scoped tokens',
        'Hetzner Cloud VPC deployment with TLS load balancer termination',
      ],
      future: [
        'Advanced order workflow with approval chains',
        'Supplier analytics and sales reporting dashboard',
        'Mobile-responsive catalog with offline support',
      ],
      gallery: [
        { src: '/images/eyewear.png', caption: 'Platform Overview' },
      ],
    },
  },
  {
    id: 'kdayes',
    title: 'Kdayes',
    subtitle: 'Tunisian Freelancer Platform',
    description:
      'Co-founded a platform enabling Tunisian freelancers with seamless invoicing, compliance, and payment solutions. Led the full product lifecycle from concept to deployment.',
    tags: ['Next.js', 'NestJS', 'Tailwind CSS', 'JWT', 'TypeScript'],
    metrics: [
      { label: 'Role', value: 'Co-Founder' },
      { label: 'Timeline', value: '6 months' },
      { label: 'Stack', value: 'Full-Stack' },
      { label: 'Status', value: 'Deployed' },
    ],
    image: '/images/kdayes.png',
    reportUrl: '/reports/kdayes.pdf',
    color: '#10b981',
    year: '2024',
    type: 'Startup',
    caseStudy: {
      period: 'Jul 2024 – Jan 2025',
      company: 'Kdayes (Startup)',
      role: 'Co-Founder & Product Owner',
      overview:
        'Kdayes is a startup platform empowering Tunisian freelancers with seamless invoicing, compliance, and payment solutions. As co-founder, I owned the product vision and led the full product lifecycle — from market research and architecture to development, team coordination, and production deployment.',
      challenge: [
        'Tunisian freelancers spend hours on manual, error-prone invoicing',
        'Complex and changing compliance requirements with no centralized guidance',
        'Difficulty collecting payments reliably and tracking outstanding invoices',
        'No platform tailored to the specific legal and financial context of Tunisia',
        'Building a startup with limited resources and a small, distributed team',
      ],
      myRole: [
        { icon: 'Lightbulb', title: 'Product Vision', desc: 'Defined product roadmap, user personas, and feature priorities based on market research' },
        { icon: 'Layers', title: 'System Architect', desc: 'Designed the Next.js + NestJS architecture with JWT auth and payment gateway integration' },
        { icon: 'Code', title: 'Full-Stack Developer', desc: 'Built core features: invoicing engine, compliance tracker, and user dashboards' },
        { icon: 'Users', title: 'Team Lead', desc: 'Coordinated a small cross-functional team across design, backend, and QA' },
        { icon: 'Rocket', title: 'Launch Manager', desc: 'Managed the deployment pipeline and coordinated the public launch' },
      ],
      architecture: [
        { layer: 'Frontend', tech: 'Next.js · Tailwind CSS · TypeScript' },
        { layer: 'Backend API', tech: 'NestJS · TypeScript · REST' },
        { layer: 'Auth', tech: 'JWT · Session Management' },
        { layer: 'Payments', tech: 'Payment Gateway Integration' },
        { layer: 'Database', tech: 'PostgreSQL · TypeORM' },
      ],
      results: [
        { label: 'Platform Status', value: 'Deployed', bar: 100 },
        { label: 'Core Features Delivered', value: '100%', bar: 100 },
        { label: 'Timeline', value: '6 months', bar: 85 },
        { label: 'Team Size', value: '4 members', bar: 70 },
      ],
      stack: [
        { category: 'Frontend', items: 'Next.js · Tailwind CSS · TypeScript' },
        { category: 'Backend', items: 'NestJS · TypeScript · JWT' },
        { category: 'Database', items: 'PostgreSQL · TypeORM' },
        { category: 'Tools', items: 'Git · Agile · Notion' },
      ],
      lessons: [
        'End-to-end product ownership: from zero to deployed product in 6 months',
        'Startup mindset: build fast, validate assumptions, iterate based on user feedback',
        'Team leadership and cross-functional coordination in a resource-constrained startup',
        'Deep understanding of the Tunisian freelance market and its regulatory context',
        'Payment gateway integration patterns and invoice lifecycle management',
      ],
      future: [
        'Advanced compliance automation with real-time regulatory updates',
        'Mobile application for on-the-go invoicing',
        'Integration with Tunisian banking APIs for direct payment collection',
        'Expansion to other North African freelance markets',
      ],
      gallery: [
        { src: '/images/kdayes.png', caption: 'Platform Dashboard' },
      ],
    },
  },
  {
    id: 'palm-tree',
    title: 'Palm Tree AI',
    subtitle: 'Disease Detection Mobile App',
    description:
      'Flutter mobile app with a CNN (EfficientNet) model achieving 92% classification accuracy for real-time palm tree disease detection, treatment suggestions, and recovery tracking.',
    tags: ['Flutter', 'NestJS', 'MongoDB', 'PyTorch', 'FastAI', 'EfficientNet'],
    metrics: [
      { label: 'Detection Accuracy', value: '92%' },
      { label: 'Platform', value: 'Mobile' },
      { label: 'Model', value: 'CNN' },
      { label: 'Real-time', value: 'Yes' },
    ],
    image: '/images/palm-tree.png',
    reportUrl: '/reports/palmtree.pdf',
    color: '#f59e0b',
    year: '2024',
    type: 'Academic',
    caseStudy: {
      period: 'Oct 2024 – Dec 2024',
      company: 'Tek-Up University (Academic)',
      role: 'Full-Stack & AI Developer',
      overview:
        'A Flutter-based mobile application with an AI-powered disease detection backend for palm trees. The EfficientNet CNN model achieves 92% classification accuracy on real-world palm leaf images, providing farmers with instant disease identification, treatment recommendations, and recovery progress tracking — all from their smartphone camera.',
      challenge: [
        'Palm tree farmers struggle to identify diseases early without expert access',
        'Manual inspection is slow, inconsistent, and requires specialist knowledge',
        'No accessible, mobile-first tool existed for the Tunisian agricultural sector',
        'Training a CNN on a limited, domain-specific palm disease image dataset',
        'Delivering real-time inference on mobile within an academic project timeline',
      ],
      myRole: [
        { icon: 'Brain', title: 'AI / ML Engineer', desc: 'Trained the EfficientNet CNN model using FastAI + PyTorch, achieving 92% accuracy' },
        { icon: 'Smartphone', title: 'Mobile Developer', desc: 'Built the Flutter cross-platform app with real-time camera integration' },
        { icon: 'Code', title: 'Backend Developer', desc: 'Developed the NestJS API serving model inference results to the mobile client' },
        { icon: 'Database', title: 'Data Engineer', desc: 'Collected, cleaned, and augmented the palm disease image training dataset' },
      ],
      architecture: [
        { layer: 'Mobile App', tech: 'Flutter · Dart · Camera Plugin' },
        { layer: 'Backend API', tech: 'NestJS · TypeScript · REST' },
        { layer: 'AI Model', tech: 'Python · FastAI · PyTorch · EfficientNet CNN' },
        { layer: 'Database', tech: 'MongoDB · Mongoose' },
      ],
      results: [
        { label: 'Disease Classification Accuracy', value: '92%', bar: 92 },
        { label: 'Real-time Detection', value: 'Yes', bar: 100 },
        { label: 'Platforms Supported', value: 'iOS & Android', bar: 100 },
        { label: 'Diseases Identified', value: '6 classes', bar: 80 },
      ],
      stack: [
        { category: 'Mobile', items: 'Flutter · Dart' },
        { category: 'Backend', items: 'NestJS · TypeScript' },
        { category: 'AI / ML', items: 'FastAI · PyTorch · EfficientNet' },
        { category: 'Database', items: 'MongoDB' },
      ],
      lessons: [
        'Training and fine-tuning CNN models (EfficientNet) on domain-specific small datasets',
        'Flutter cross-platform development and real-time camera integration',
        'End-to-end AI application: from data collection to mobile deployment',
        'The importance of data augmentation when training sets are limited',
        'Bridging agricultural domain knowledge with AI solution design',
      ],
      future: [
        'GPS-based disease mapping to visualize outbreak hotspots',
        'Offline inference mode for use in remote areas without connectivity',
        'Arabic language support for wider North African adoption',
        'Integration with agricultural advisory services',
      ],
      gallery: [
        { src: '/images/palm-tree.png', caption: 'Disease Detection Interface' },
        { src: '/images/palm-tree-arch.png', caption: 'System Architecture' },
      ],
    },
  },
]

export const experience = [
  {
    role: 'Software Engineer – Final Year Internship (PFE)',
    company: 'Audaxis Maghreb',
    period: 'Jan 2025 – Jul 2025',
    description:
      'Designed and built Hire-Tech, an enterprise AI-powered recruitment platform at Audaxis. Integrated NLP CV parsing (87% accuracy), semantic matching (78% precision), Keycloak OAuth2/RBAC, Docker microservices, and GitHub Actions CI/CD (98% success rate). Led 12 Agile sprints delivering 31 user stories across 3 releases.',
    tags: ['Next.js', 'Spring Boot', 'Python FastAPI', 'PostgreSQL', 'Keycloak', 'Docker', 'Ollama'],
    type: 'pfe',
  },
  {
    role: 'Freelance Full-Stack Developer',
    company: 'Private B2B Eyewear Platform',
    period: 'Mar 2025 – Apr 2025',
    description:
      'Architected end-to-end secure B2B portal with Next.js, Laravel, Docker, and GitHub Actions CI/CD. Achieved sub-200ms TTFB and 85% reduction in API contract bugs.',
    tags: ['Next.js', 'Laravel', 'Docker', 'GitHub Actions'],
    type: 'freelance',
  },
  {
    role: 'Co-Founder & Full-Stack Developer',
    company: 'Kdayes',
    period: 'Jul 2024 – Jan 2025',
    description:
      'Co-founded a Tunisian freelancer platform. Led product vision, architected Next.js + NestJS stack, and managed team coordination for compliance and invoicing features.',
    tags: ['Next.js', 'NestJS', 'TypeScript', 'Startup'],
    type: 'startup',
  },
  {
    role: 'Software Engineering Intern',
    company: 'Code Cooperation',
    period: 'Jul 2024 – Aug 2024',
    description:
      'Deep-dived into full-stack development and DevOps. Built production-grade Next.js + NestJS applications and contributed to startup launch infrastructure.',
    tags: ['Next.js', 'NestJS', 'DevOps', 'TypeScript'],
    type: 'internship',
  },
  {
    role: 'Data Analyst Intern',
    company: 'Tunisair Airlines',
    period: 'Apr 2022 – Jun 2022',
    description:
      'Developed interactive BI dashboards using Talend, Power BI, and Oracle SQL for the loyalty program administration, enabling data-driven decision-making.',
    tags: ['Talend', 'Power BI', 'Oracle SQL', 'BI'],
    type: 'internship',
  },
]

export const education = [
  {
    degree: 'Engineering Degree in Computer Science',
    school: 'Tek-Up University',
    location: 'Ariana, Tunisia',
    period: 'Sep 2022 – Nov 2025',
    description: 'Specialization in Software Engineering. Final Year Project: Hire-Tech AI Recruitment Platform at Audaxis Maghreb. Degree awarded November 20, 2025.',
    type: 'engineering',
  },
  {
    degree: 'Diploma in CS Applied to Management',
    school: 'Faculty of Economics & Management, Nabeul',
    location: 'Nabeul, Tunisia',
    period: '2019 – Aug 2022',
    description: 'Specialization in Business Intelligence. Key project: Tunisair Airlines loyalty dashboard.',
    type: 'diploma',
  },
]
