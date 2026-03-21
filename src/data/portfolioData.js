export const accentPalette = {
  cyan: {
    line: '#8cf2ff',
    glow: 'rgba(140, 242, 255, 0.2)',
    soft: 'rgba(140, 242, 255, 0.1)',
  },
  violet: {
    line: '#9a88ff',
    glow: 'rgba(154, 136, 255, 0.2)',
    soft: 'rgba(154, 136, 255, 0.1)',
  },
  magenta: {
    line: '#ff88c6',
    glow: 'rgba(255, 136, 198, 0.2)',
    soft: 'rgba(255, 136, 198, 0.1)',
  },
  gold: {
    line: '#ffd27a',
    glow: 'rgba(255, 210, 122, 0.2)',
    soft: 'rgba(255, 210, 122, 0.1)',
  },
};

export const portfolioData = {
  meta: {
    title: 'Muhammad Malik — Premium React Portfolio',
    description:
      'A cinematic portfolio for Muhammad Malik, spanning QA automation, AI and data systems, premium web experiences, and a complete project archive.',
  },
  hero: {
    name: 'Muhammad Malik',
    eyebrow: 'QA Automation Engineer · Data Science Graduate · AI / Data Systems Builder',
    roles: [
      'QA Automation Engineer',
      'AI & Data Product Builder',
      'Data Systems & Analytics Engineer',
      'Design-Aware Web Builder',
    ],
    summary:
      'I build testing systems, AI and data products, and polished digital experiences that help teams ship with more confidence.',
    location: 'Sydney, NSW',
    availability: 'Open to full-time roles, contract work, and serious product collaborations',
    tags: ['Playwright', 'TypeScript', 'Python', 'SQL', 'React', 'YOLOv8', 'Kafka', 'Flask'],
    labels: ['Playwright', 'TypeScript', 'Python', 'AI/ML', 'ETL', 'React'],
    primaryCta: {
      label: 'See selected work',
      href: '#featured',
    },
    secondaryCta: {
      label: 'Download CV',
      href: '/assets/Muhammad-Malik-Tech-CV.pdf',
    },
    links: [
      {
        label: 'Email',
        href: 'mailto:mu.malik2001@gmail.com',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/MuhammadMalik297',
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/muhammad-malik-b687b4223/',
      },
    ],
  },
  metrics: [
    { value: 18, suffix: '', label: 'public repositories' },
    { value: 3, suffix: '', label: 'platforms covered in QA work' },
    { value: 6, suffix: '+', label: 'flagship builds' },
    { value: 4, suffix: '', label: 'capability lanes combined' },
  ],
  about: {
    headline: 'I like work that is useful, reliable, and presented well.',
    paragraphs: [
      'Most people stay in one lane. My strength has been combining a few of them properly. I can move from Playwright automation and release coverage to forecasting models, computer-vision workflows, ETL pipelines, dashboards, and front-end presentation without losing the thread of what the product is supposed to do for real users.',
      'That range comes from a mix of professional roles, university projects, founder-led work, and self-directed builds. The common pattern is always the same: make the system clearer, make it more dependable, and make the final experience feel considered rather than thrown together.',
    ],
    portrait: '/assets/muhammad-malik-portrait.webp',
    quickFacts: [
      { label: 'Based in', value: 'Sydney / Mosman, NSW' },
      { label: 'Primary email', value: 'mu.malik2001@gmail.com' },
      { label: 'Phone', value: '+61 432 770 270' },
      {
        label: 'Core stack',
        value: "Playwright, TypeScript, Python, C++, JavaScript, SQL, Flask, REST API's, React",
      },
      {
        label: 'Focus',
        value: 'QA automation, AI/ML, data systems, and high-end product websites',
      },
      {
        label: 'Current study',
        value: 'Master of Data Science — Macquarie University',
      },
    ],
  },
  capabilities: [
    {
      key: 'qa',
      title: 'QA automation & release systems',
      kicker: 'Reliability',
      description:
        'I like turning release risk into a repeatable system: solid coverage, clearer flows, and fewer surprises when a product goes live.',
      detail:
        'This is where I am strongest professionally right now. I work across manual coverage, exploratory testing, automation design, CI integration, and the last-mile release checks that actually decide whether a team ships with confidence or not.',
      points: [
        'Playwright + TypeScript automation',
        'Page Object Model structure',
        'Regression, smoke, and exploratory coverage',
        'GitHub Actions CI/CD runs',
        'Jira test cases and release checks',
      ],
      accent: 'cyan',
      stats: ['Web, iOS, Android', 'Framework from scratch', 'Release-readiness mindset'],
    },
    {
      key: 'ai',
      title: 'AI & machine learning builds',
      kicker: 'Intelligence',
      description:
        'I build practical ML systems that are tied to a visible use case, not just a notebook result.',
      detail:
        'That includes real-time detection, accessibility tooling, forecasting, evaluation workflows, and the plumbing required to make model outputs part of a usable product experience.',
      points: [
        'Time-series forecasting',
        'YOLOv8 computer vision',
        'Vosk + MediaPipe workflows',
        'Model evaluation and optimisation',
        'ML pipeline experimentation',
      ],
      accent: 'violet',
      stats: ['Forecasting', 'Computer vision', 'Accessibility tooling'],
    },
    {
      key: 'data',
      title: 'Data engineering & BI',
      kicker: 'Structure',
      description:
        'I enjoy the part where messy information becomes something a team can actually make decisions from.',
      detail:
        'My work here has covered warehouse modelling, ETL design, reporting logic, and analysis outputs that connect technical structure to business questions like revenue, supplier performance, and trend visibility.',
      points: [
        'Star schema design',
        'SQL extraction and transformation',
        'Java / Python ETL',
        'Tableau and reporting',
        'Supplier and revenue analysis',
      ],
      accent: 'gold',
      stats: ['Warehouse design', 'ETL pipelines', 'Reporting-ready outputs'],
    },
    {
      key: 'web',
      title: 'Websites, landing pages & storefronts',
      kicker: 'Experience',
      description:
        'I care about how the work is presented, because good work can still get overlooked when the interface feels average.',
      detail:
        'That shows up in product-style websites, ecommerce thinking, cleaner visual hierarchy, stronger section flow, and the kind of presentation that gives technical work more impact.',
      points: [
        'Single-page premium experiences',
        'Brand-led layouts',
        'Storefront curation',
        'Visual storytelling',
        'Conversion-minded structure',
      ],
      accent: 'magenta',
      stats: ['High-end visual direction', 'Product-style layouts', 'Clearer UX'],
    },
    {
      key: 'tooling',
      title: 'Fast business tooling',
      kicker: 'Utility',
      description:
        'I like building useful tools that save time, reduce friction, and make day-to-day work less messy.',
      detail:
        'Sometimes that means lightweight internal helpers. Sometimes it means automating a workflow or structuring a process properly so a founder or team stops losing time on avoidable manual work.',
      points: [
        'Automation thinking',
        'Rapid prototyping',
        'Workflow mapping',
        'Operational documentation',
        'Decision-ready outputs',
      ],
      accent: 'cyan',
      stats: ['Fast iteration', 'Utility over fluff', 'Clear outcomes'],
    },
    {
      key: 'clarity',
      title: 'Documentation & stakeholder clarity',
      kicker: 'Trust',
      description:
        'I am comfortable taking fuzzy requirements and turning them into something a team can actually execute against.',
      detail:
        'That includes test cases, edge-case coverage, structured notes, acceptance criteria, and the kind of documentation that reduces confusion across design, product, engineering, and QA.',
      points: [
        'Acceptance criteria breakdowns',
        'Testing reports',
        'Process documentation',
        'Cross-functional communication',
        'Edge-case coverage',
      ],
      accent: 'violet',
      stats: ['Cleaner handoff', 'Less ambiguity', 'Better delivery rhythm'],
    },
  ],
  experience: [
    {
      period: 'Jul 2025 — Jan 2026',
      company: 'CitrusBits',
      role: 'QA & Automation Engineer',
      location: 'Islamabad, Pakistan',
      summary:
        'Worked on real client products including IntelliXR MDM, Rubio’s, and BlackGreeks, with a strong focus on automation quality, release confidence, and cross-platform coverage.',
      highlights: [
        'Built a Playwright + TypeScript automation framework from scratch using the Page Object Model and reusable helper layers.',
        'Handled QA across web, iOS, and Android with manual, exploratory, smoke, and regression coverage.',
        'Integrated automated runs with GitHub Actions and supported releases through structured Jira cases, bug triage, and validation checks.',
      ],
      tags: ['Playwright', 'TypeScript', 'Web / iOS / Android', 'GitHub Actions', 'Jira', 'Release QA'],
    },
    {
      period: 'Aug 2024 — Feb 2025',
      company: 'AZTRA Tech Pvt. Ltd.',
      role: 'Machine Learning Engineer',
      location: 'Islamabad, Pakistan',
      summary:
        'Built and improved predictive models, prepared cleaner datasets, and worked with development teams to turn model outputs into practical product functionality.',
      highlights: [
        'Developed supervised ML models for predictive business use cases.',
        'Preprocessed larger datasets and tuned models for efficiency and accuracy.',
        'Collaborated with software teams to connect model outputs with wider solution pipelines.',
      ],
      tags: ['Machine Learning', 'Python', 'Model Evaluation', 'Data Preparation', 'Integration'],
    },
    {
      period: 'May 2024 — Aug 2024',
      company: 'Mercurial Minds',
      role: 'Data Intern — Automation Department',
      location: 'Islamabad, Pakistan',
      summary:
        'Worked on ETL optimisation, reporting automation, and structured data workflows that improved consistency and reduced manual effort.',
      highlights: [
        'Extracted and transformed datasets using SQL and Python.',
        'Contributed to ETL optimisation and reporting automation improvements.',
        'Documented data processes and integrity checks for more reliable operations.',
      ],
      tags: ['SQL', 'Python', 'ETL', 'Reporting', 'Data Validation'],
    },
    {
      period: '2023 — 2024',
      company: 'Tishnagii Clothing Brand',
      role: 'Founder & Store Operator',
      location: 'Pakistan',
      summary:
        'Built and ran an ecommerce clothing brand, handling inventory, orders, vendor coordination, reporting, and the practical realities of selling to customers online.',
      highlights: [
        'Managed stock movement, reporting, and operational workflows.',
        'Handled fulfilment flow and vendor communication.',
        'Built hands-on understanding of brand presentation, ecommerce, and customer-facing execution.',
      ],
      tags: ['Ecommerce', 'Inventory', 'Excel', 'Operations', 'Brand Building'],
    },
  ],
  featured: [
    {
      id: 'citrusbits',
      eyebrow: 'Flagship case study',
      title: 'CitrusBits QA Systems',
      subtitle: 'Automation architecture, cross-platform coverage, and calmer releases.',
      theme: 'cyan',
      story:
        'At CitrusBits, I worked on real products where quality had to hold up under release pressure. My role covered automation design, manual and exploratory testing, regression planning, and the execution habits that help teams ship with more confidence.',
      role: 'QA & Automation Engineer',
      stack: ['Playwright', 'TypeScript', 'GitHub Actions', 'Jira', 'iOS', 'Android', 'Web'],
      bullets: [
        'Framework-from-scratch Playwright setup with the Page Object Model.',
        'Coverage for IntelliXR MDM, Rubio’s, and BlackGreeks.',
        'OTP/session-state handling, Jira test design, bug triage, and release checks.',
      ],
    },
    {
      id: 'signfusion',
      eyebrow: 'Accessibility + real-time interaction',
      title: 'SignFusion',
      subtitle:
        'A Chrome extension that translates speech and text into animated ASL overlays for multimedia content.',
      theme: 'violet',
      story:
        'SignFusion focused on a meaningful accessibility problem: making video content easier to follow for Deaf and hard-of-hearing audiences. The system combined speech processing, gesture mapping, animation rendering, backend communication, and browser integration into one experience.',
      role: 'Project contributor — text-to-gesture mapping, Chrome extension integration, packaging & deployment',
      stack: ['Flask', 'Vosk', 'MediaPipe', 'OpenCV', 'Pygame', 'Chrome Extension APIs', 'MySQL'],
      bullets: [
        'Designed around live YouTube overlay behaviour rather than a standalone demo.',
        'Included adjustable overlay size, position, and appearance controls.',
        'Connected backend gesture retrieval with browser-side playback logic.',
      ],
      cta: {
        label: 'Open repository',
        href: 'https://github.com/MuhammadMalik297/SignFusion---FYP',
      },
    },
    {
      id: 'metro',
      eyebrow: 'Data engineering',
      title: 'METRO Data Warehouse',
      subtitle: 'Near-real-time warehousing for revenue, supplier, and product reporting.',
      theme: 'gold',
      story:
        'This project was about building a more decision-ready data foundation for METRO-style retail analysis. I worked on the schema design, Java and SQL ETL flow, and reporting outputs tied to sales, suppliers, and product-level performance.',
      role: 'Data warehouse & BI builder',
      stack: ['Java', 'SQL', 'Star Schema', 'ETL', 'MESHJOIN', 'BI Reporting'],
      bullets: [
        'Designed warehouse architecture for near-real-time ingestion patterns.',
        'Generated structured revenue and supplier reports.',
        'Connected engineering decisions to practical reporting use cases.',
      ],
      cta: {
        label: 'Open repository',
        href: 'https://github.com/MuhammadMalik297/metro-datawarehouse-project',
      },
    },
    {
      id: 'billing',
      eyebrow: 'Computer vision',
      title: 'AI-Powered Billing System',
      subtitle: 'Real-time product detection and automated billing for toiletries.',
      theme: 'magenta',
      story:
        'A practical computer-vision workflow built around a real retail interaction: capture products through a live camera, detect them with YOLOv8, connect them to pricing, and generate a running bill through a user-facing interface.',
      role: 'Builder',
      stack: ['Python', 'YOLOv8', 'OpenCV', 'Flask', 'GUI Workflow'],
      bullets: [
        'Detected toiletries from live camera input.',
        'Retrieved item pricing and generated bill totals automatically.',
        'Turned object detection into a business-facing user flow.',
      ],
      cta: {
        label: 'Open repository',
        href: 'https://github.com/MuhammadMalik297/ai-billing-system-yolov8',
      },
    },
    {
      id: 'recommender',
      eyebrow: 'Streaming systems',
      title: 'Real-Time Recommender',
      subtitle: 'Big-data recommendation pipeline with streaming, model logic, and a live interface.',
      theme: 'cyan',
      story:
        'This system ingested Amazon-style product data, processed it through a big-data stack, trained recommendation logic, and surfaced live suggestions through a web application. The goal was an end-to-end build, not just model experimentation in isolation.',
      role: 'Builder',
      stack: ['Apache Spark', 'Kafka', 'MongoDB', 'Flask', 'Machine Learning'],
      bullets: [
        'End-to-end workflow from ingestion to recommendations.',
        'Streaming architecture for live product suggestion behaviour.',
        'Web-facing delivery instead of analysis-only output.',
      ],
      cta: {
        label: 'Open repository',
        href: 'https://github.com/MuhammadMalik297/Live-Product-Recommendation-System-BigData',
      },
    },
    {
      id: 'carbon',
      eyebrow: 'Forecasting',
      title: 'Carbon Emissions Forecasting',
      subtitle: 'Time-series models, measured evaluation, and clear visual outputs.',
      theme: 'violet',
      story:
        'Built as a forecasting application using both classical and neural approaches, this project compared multiple methods and evaluated them with standard metrics so the output was not only predictive, but also measurable and easier to trust.',
      role: 'Builder',
      stack: ['Python', 'Flask', 'ARIMA', 'SARIMA', 'SVR', 'ANN', 'LSTM'],
      bullets: [
        'Used multiple forecasting approaches instead of relying on one model family.',
        'Evaluated outputs with MAE, MSE, RMSE, and R².',
        'Wrapped forecasting logic inside a more visual application flow.',
      ],
    },
  ],
  studio: [
    {
      name: 'Eyesy',
      role: 'Website design',
      summary:
        'Dark luxury storefront direction for jewellery and watch products, with stronger contrast, cleaner navigation, and a more premium product feel.',
      image: '/assets/eyesy-site.webp',
      mediaType: 'image',
    },
    {
      name: 'Tishnagii',
      role: 'Founder brand / storefront',
      summary:
        'My own clothing brand. I handled the brand direction, storefront thinking, vendor coordination, stock flow, fulfilment, and the operational side that taught me what ecommerce looks like outside the classroom.',
      mediaType: 'video',
      video: '/assets/tishnagii-showcase.mp4',
      poster: '/assets/tishnagii-poster.webp',
      featured: true,
      uploadHint: 'Add your showcase video as public/assets/tishnagii-showcase.mp4',
    },
    {
      name: 'BLNDR',
      role: 'Website design',
      summary:
        'Soft, product-led ecommerce design built around freshness, portability, and a lighter premium aesthetic.',
      image: '/assets/blndr-site.webp',
      logo: '/assets/blndr-logo.webp',
      mediaType: 'image',
    },
  ],
  projects: [
    {
      title: 'SignFusion---FYP',
      category: 'ai',
      label: 'Accessibility / browser extension',
      summary:
        'Chrome extension translating speech and text into real-time ASL gestures for multimedia content.',
      stack: ['Flask', 'Vosk', 'MediaPipe', 'Chrome Extension APIs'],
      href: 'https://github.com/MuhammadMalik297/SignFusion---FYP',
    },
    {
      title: 'parallel-ml-training-cpu-vs-gpu',
      category: 'ai',
      label: 'Performance engineering',
      summary:
        'Benchmark comparing serial CPU training, parallel multithreaded CPU training, and GPU-accelerated XGBoost workflows.',
      stack: ['Python', 'XGBoost', 'scikit-learn', 'Multithreading'],
      href: 'https://github.com/MuhammadMalik297/parallel-ml-training-cpu-vs-gpu',
    },
    {
      title: 'Live-Product-Recommendation-System-BigData',
      category: 'data',
      label: 'Streaming recommender',
      summary:
        'End-to-end live product recommendation system using Apache Spark, MongoDB, Flask, and Kafka.',
      stack: ['Spark', 'Kafka', 'MongoDB', 'Flask'],
      href: 'https://github.com/MuhammadMalik297/Live-Product-Recommendation-System-BigData',
    },
    {
      title: 'metro-datawarehouse-project',
      category: 'data',
      label: 'Warehouse / BI',
      summary:
        'Near-real-time data warehouse project for METRO Pakistan using a MESHJOIN-based approach.',
      stack: ['Java', 'SQL', 'ETL', 'Star Schema'],
      href: 'https://github.com/MuhammadMalik297/metro-datawarehouse-project',
    },
    {
      title: 'ai-billing-system-yolov8',
      category: 'ai',
      label: 'Computer vision product',
      summary:
        'Real-time automated billing system for toiletries using YOLOv8 object detection, pricing lookup, and bill generation.',
      stack: ['Python', 'YOLOv8', 'OpenCV', 'Flask'],
      href: 'https://github.com/MuhammadMalik297/ai-billing-system-yolov8',
    },
    {
      title: 'Interactive-Data-Visualizations',
      category: 'data',
      label: 'Visual analytics',
      summary:
        'Processed text data with NLTK and served interactive D3-based graph and tree visualisations with brushing, linking, and focus-context techniques.',
      stack: ['Python', 'Flask', 'D3.js', 'NLTK'],
      href: 'https://github.com/MuhammadMalik297/Interactive-Data-Visualizations',
    },
    {
      title: 'heart-disease-predictor-react.js',
      category: 'ai',
      label: 'Full-stack ML app',
      summary:
        'Heart-disease likelihood predictor with a logistic regression model, Flask API, React front-end, and MongoDB storage.',
      stack: ['React', 'Flask', 'MongoDB', 'Machine Learning'],
      href: 'https://github.com/MuhammadMalik297/heart-disease-predictor-react.js',
    },
    {
      title: 'Grocery-Store-Management-System-OOP',
      category: 'systems',
      label: 'OOP systems build',
      summary:
        'Complete C++ grocery-store management system for registration, login, inventory, shopping, payments, and checkout simulation.',
      stack: ['C++', 'OOP', 'Console Systems'],
      href: 'https://github.com/MuhammadMalik297/Grocery-Store-Management-System-OOP',
    },
    {
      title: 'parallel-mapreduce-wordcount-OS',
      category: 'systems',
      label: 'Parallel computing',
      summary:
        'Multithreaded C++ MapReduce-style word counter demonstrating chunk processing, synchronization, and reduction flow.',
      stack: ['C++', 'Threads', 'Mutex', 'MapReduce'],
      href: 'https://github.com/MuhammadMalik297/parallel-mapreduce-wordcount-OS',
    },
    {
      title: 'os-mapreduce-wordcount',
      category: 'systems',
      label: 'Operating systems lab',
      summary:
        'Word-count and systems experimentation repository focused on operating-systems style parallel processing patterns.',
      stack: ['C++', 'Systems', 'Parallelism'],
      href: 'https://github.com/MuhammadMalik297/os-mapreduce-wordcount',
    },
    {
      title: 'secure-authentication-system-testing-report',
      category: 'qa',
      label: 'Testing & documentation',
      summary:
        'Comprehensive testing report for a Flask-based secure authentication system with OTP verification and email integration.',
      stack: ['Testing', 'QA', 'Flask', 'OTP'],
      href: 'https://github.com/MuhammadMalik297/secure-authentication-system-testing-report',
    },
    {
      title: 'Mlop-Project',
      category: 'mlops',
      label: 'MLOps / CI-CD lab',
      summary:
        'CI/CD-focused MLOps project with DVC, MLflow, Docker, Jenkins, automated workflows, tests, and Kubernetes-related structure.',
      stack: ['Python', 'DVC', 'MLflow', 'Docker', 'Jenkins', 'K8s'],
      href: 'https://github.com/MuhammadMalik297/Mlop-Project',
    },
    {
      title: 'i212688_Mlops-Assignment-2',
      category: 'mlops',
      label: 'Containerized full-stack lab',
      summary:
        'MLOps assignment repository with backend, frontend, Docker Compose, and Kubernetes manifests for end-to-end setup.',
      stack: ['JavaScript', 'Python', 'HTML/CSS', 'Docker', 'K8s'],
      href: 'https://github.com/MuhammadMalik297/i212688_Mlops-Assignment-2',
    },
    {
      title: 'Assignment-1',
      category: 'mlops',
      label: 'Intro MLOps assignment',
      summary:
        'Python MLOps assignment with tests, workflow triggering, and repository setup geared toward automation practice.',
      stack: ['Python', 'Testing', 'GitHub Actions'],
      href: 'https://github.com/MuhammadMalik297/Assignment-1',
    },
    {
      title: 'flask-vercel-deployment',
      category: 'web',
      label: 'Deployment experiment',
      summary:
        'Minimal Flask deployment experiment with Vercel configuration and simple app setup.',
      stack: ['Python', 'Flask', 'Vercel'],
      href: 'https://github.com/MuhammadMalik297/flask-vercel-deployment',
    },
    {
      title: 'CommBank-Server',
      category: 'archive',
      label: 'Fork / server exploration',
      summary: 'Forked C# server repository kept as part of the broader public code archive.',
      stack: ['C#', 'Fork'],
      href: 'https://github.com/MuhammadMalik297/CommBank-Server',
    },
    {
      title: 'AWS Cloud Development & Data Engineering',
      category: 'data',
      label: 'CV project',
      summary:
        'AWS-based web apps and data pipelines spanning EC2, RDS, VPC, load balancing, Lambda, S3, Glue, automation, and secure data handling.',
      stack: ['AWS', 'EC2', 'RDS', 'Lambda', 'S3', 'Glue'],
      href: '',
    },
    {
      title: 'BI Dashboard for METRO',
      category: 'data',
      label: 'CV project',
      summary:
        'BI dashboard and warehouse work for sales, supplier, and product analysis in a METRO retail context.',
      stack: ['Java', 'SQL', 'Star Schema', 'Dashboarding'],
      href: '',
    },
    {
      title: 'BLNDR Website',
      category: 'brand',
      label: 'Design portfolio',
      summary:
        'Product-led ecommerce concept centred around softness, portability, freshness, and premium presentation.',
      stack: ['UI/UX', 'Brand Direction', 'Storefront Design'],
      href: '',
    },
    {
      title: 'Eyesy Website',
      category: 'brand',
      label: 'Design portfolio',
      summary:
        'Luxury-style jewelry and watch storefront direction built around contrast, restraint, and premium product presentation.',
      stack: ['UI/UX', 'Storefront Design', 'Visual Direction'],
      href: '',
    },
    {
      title: 'Tishnagii Clothing Brand',
      category: 'brand',
      label: 'Founder brand',
      summary:
        'Founder-led clothing brand covering storefront thinking, product presentation, inventory flow, fulfilment, and the operational side of ecommerce.',
      stack: ['Ecommerce', 'Brand Direction', 'Operations', 'Storefront Thinking'],
      href: '',
    },
  ],
  credentials: {
    education: [
      {
        title: 'Master of Data Science',
        institution: 'Macquarie University',
        period: 'Feb 2026 — Present',
        meta: 'Sydney, Australia',
      },
      {
        title: 'Bachelor of Science — Data Science',
        institution: 'FAST — National University of Computer and Emerging Sciences',
        period: 'Aug 2021 — Jun 2025',
        meta: 'Islamabad, Pakistan',
      },
      {
        title: 'A-Levels — Physics, Computer Science, Mathematics',
        institution: 'Beaconhouse Defence Campus',
        period: 'Aug 2018 — May 2020',
        meta: 'Lahore, Pakistan',
      },
    ],
    certifications: [
      'IELTS Academic — Band 7.5',
      'Diploma in Cybersecurity — Brentwood Open Learning College',
    ],
    leadership: [
      'NASCON — Head of Logistics (2024)',
      'NASCON — Head of Food & Accommodation (2023, 2022)',
    ],
    proof: [
      'GitHub profile with 18 public repositories',
      'GitHub achievements: Pull Shark and YOLO',
      'Portfolio spanning QA, AI, data, systems, and premium web work',
    ],
    skills: [
      'Python',
      'TypeScript',
      'JavaScript',
      'Java',
      'C++',
      'R',
      'SQL',
      'MongoDB',
      'Playwright',
      'GitHub Actions',
      'Jira',
      'Flask',
      'React',
      'HTML/CSS',
      'Spark',
      'Hadoop',
      'Tableau',
      'AWS',
      'Postman',
      'YOLOv8',
      'LSTM',
      'ARIMA',
      'Kafka',
    ],
  },
  contact: {
    headline: 'If the work needs to look sharp and hold up under pressure, we should talk.',
    body:
      'I am open to QA automation roles, AI and data work, and premium digital projects where strong engineering and strong presentation both matter.',
    email: 'mu.malik2001@gmail.com',
    phone: '+61 432 770 270',
    location: 'Sydney, NSW, Australia',
    github: 'https://github.com/MuhammadMalik297',
    linkedin: 'https://www.linkedin.com/in/muhammad-malik-b687b4223/',
    cv: '/assets/Muhammad-Malik-Tech-CV.pdf',
  },
  notes: {
    citrusbitsPeriod:
      'Uploaded CVs conflict between Jul 2025 — Jan 2026 and Jul 2025 — Present. This build uses Jul 2025 — Jan 2026 from the newer Sydney-based CV variants; update src/data/portfolioData.js if you want the public portfolio to show Present instead.',
    tishnagiiVideo:
      'To activate the Tishnagii video card, add your file at public/assets/tishnagii-showcase.mp4. Optional poster image: public/assets/tishnagii-poster.webp.',
  },
};

export const atlasFilters = [
  { key: 'all', label: 'All' },
  { key: 'qa', label: 'QA' },
  { key: 'mlops', label: 'MLOps / Infra' },
  { key: 'ai', label: 'AI / ML' },
  { key: 'data', label: 'Data / BI' },
  { key: 'web', label: 'Web' },
  { key: 'systems', label: 'Systems' },
  { key: 'brand', label: 'Brand' },
  { key: 'archive', label: 'Archive / fork' },
];
