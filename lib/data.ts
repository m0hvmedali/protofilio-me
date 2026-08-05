import { UserProfile, Skill, Course, Service, Project } from './schema';

export const userProfile: UserProfile = {
  id: 'usr_1',
  name: 'Mohamed Aly Maher',
  headline: 'Full-Stack Developer & AI Integrator',
  bio: 'Highly analytical Full-Stack Developer and AI Integrator with a deep foundation in applied mathematics and networking. Expert in architecting scalable backend systems, integrating sophisticated Natural Language Processing (NLP) models, and building intuitive, data-rich frontend experiences. Proven track record in developing complex API ecosystems and AI-driven platforms that bridge the gap between theoretical science and high-performance software solutions.',
  resume_url: '#',
  email: 'mohamedalix546@gmail.com',
  linkedin_url: 'https://linkedin.com/in/mohamedalymaher',
  github_url: 'https://github.com/mohamedalymaher',
  whatsapp: '+201281320192',
};

export const skills: Skill[] = [
  {
    id: 'sk_1',
    title: 'AI & Machine Learning',
    image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
    hover_description: 'PyTorch, NLP, Scikit-learn, OpenAI API, NumPy, Pandas.',
  },
  {
    id: 'sk_2',
    title: 'Backend & Databases',
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
    hover_description: 'Node.js, Express, Flask, PostgreSQL, Redis, MongoDB, GraphQL.',
  },
  {
    id: 'sk_3',
    title: 'Frontend Development',
    image_url: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=800&auto=format&fit=crop',
    hover_description: 'React, Redux, Tailwind CSS, HTML5/CSS3, D3.js.',
  },
  {
    id: 'sk_4',
    title: 'Infrastructure & Net',
    image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    hover_description: 'Docker, Nginx, Linux (Ubuntu), Git, TCP/IP, SSH, CI/CD.',
  },
  {
    id: 'sk_5',
    title: 'Applied Mathematics',
    image_url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop',
    hover_description: 'Linear Algebra, Calculus, Statistics, Discrete Mathematics.',
  },
  {
    id: 'sk_6',
    title: 'Programming Languages',
    image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    hover_description: 'Python, JavaScript, TypeScript, SQL, C++, Bash Scripting.',
  },
];

export const courses: Course[] = [
  {
    id: 'c_1',
    title: 'Certified NLP Specialist',
    provider: 'Certification',
    date: 'Recent',
    key_takeaway: 'Deep learning for language understanding and generation.',
  },
  {
    id: 'c_2',
    title: 'Certified Backend Developer',
    provider: 'Certification',
    date: 'Recent',
    key_takeaway: 'Mastery in scalable server-side architecture and complex API ecosystems.',
  },
  {
    id: 'c_3',
    title: 'Certified Python Developer',
    provider: 'Certification',
    date: 'Recent',
    key_takeaway: 'Advanced data structures and algorithmic efficiency.',
  },
  {
    id: 'c_4',
    title: 'Certified Networking Specialist',
    provider: 'Certification',
    date: 'Recent',
    key_takeaway: 'Expertise in TCP/IP, security, and cloud infrastructure.',
  },
  {
    id: 'c_5',
    title: 'Autodidact Studies',
    provider: 'Self-Directed',
    date: 'Ongoing',
    key_takeaway: 'Intensive self-directed research in Applied Mathematics & AI.',
  },
  {
    id: 'c_6',
    title: 'High School Diploma',
    provider: 'Specialized Track',
    date: 'Past',
    key_takeaway: 'Specialized in Advanced Mathematics and Science.',
  },
];

export const services: Service[] = [
  {
    id: 'srv_1',
    title: 'Full-Stack Development',
    icon: 'Layers',
    short_desc: 'End-to-end web application development from architecture to deployment.',
    detailed_deliverables: {
      overview: 'A complete technical solution tailored to your business needs, built for scale and performance.',
      features: ['Custom Frontend UI', 'REST/GraphQL API Development', 'Database Design & Optimization', 'Cloud Deployment'],
      process: ['Discovery', 'Architecture Design', 'Development Sprints', 'Launch'],
    },
  },
  {
    id: 'srv_2',
    title: 'Custom AI & Data Solutions',
    icon: 'BrainCircuit',
    short_desc: 'Integrating NLP models and data pipelines into your existing workflows.',
    detailed_deliverables: {
      overview: 'Leveraging modern AI APIs and PyTorch/NLP pipelines to automate tasks and enhance user experiences.',
      features: ['OpenAI/Custom Model Integration', 'NLP Pipelines', 'Data Visualization (D3.js)', 'Mathematical Modeling'],
      process: ['Use-Case Analysis', 'Data Preparation', 'Model Integration', 'Testing & Scaling'],
    },
  },
  {
    id: 'srv_3',
    title: 'System Architecture',
    icon: 'PenTool',
    short_desc: 'Designing robust infrastructures and scalable database schemas.',
    detailed_deliverables: {
      overview: 'Translating complex theoretical requirements into high-performance software and cloud topologies.',
      features: ['Docker Containerization', 'Redis Caching & Optimization', 'PostgreSQL Advanced Indexing', 'CI/CD Pipelines'],
      process: ['Requirements Gathering', 'Infrastructure Topology Design', 'Security Auditing', 'Deployment'],
    },
  },
];

export const projects: Project[] = [
  {
    id: 'p_1',
    title: 'Math Hub',
    description: 'An AI-driven educational platform helping students organize studies, track progress, and analyze performance. Features include a visual "Knowledge Universe" mind map, a Pomodoro timer with Spotify sync, advanced search radar, detailed analytics, and interactive math labs.',
    poster_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    tech_stack: ['Python', 'React', 'NLP', 'PyTorch', 'D3.js'],
    repo_link: 'https://github.com/m0hvmedali/math-hub',
  },
  {
    id: 'p_2',
    title: 'Growth Tree',
    description: 'A digital platform supporting mental health and self-growth using CBT and DBT techniques. It features an interactive wheel of feelings, mental skills modules, calming exercises, a gratitude wall, and detailed emotional progress tracking.',
    poster_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    tech_stack: ['Flask', 'PostgreSQL', 'Tailwind', 'Sentiment Analysis'],
    repo_link: 'https://github.com/m0hvmedali/mental-journey-tracker',
  },
  {
    id: 'p_3',
    title: 'AS Inventory Management',
    description: 'A production-grade RESTful Inventory Management API built with Laravel 11. Designed for Supabase deployment, it includes token authentication, atomic stock adjustments, low-stock alerts, role-based protection, and a developer documentation portal.',
    poster_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    tech_stack: ['Laravel 11', 'PostgreSQL', 'Supabase', 'Redis', 'Swagger'],
    repo_link: 'https://github.com/m0hvmedali/Inventory-Management-_API',
  },
  {
    id: 'p_4',
    title: 'AI-OS — Unified Gateway',
    description: 'A unified gateway over multiple cloud AI services with full support for LLMs, TTS, STT, image generation, embeddings, and vector DBs. Features a smart fallback router, circuit breakers, and zero hardcoding via JSON configuration.',
    poster_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    tech_stack: ['TypeScript', 'Node.js', 'SQLite', 'LLMs', 'Vector DBs'],
    repo_link: 'https://github.com/m0hvmedali/ai-os',
  },
];
