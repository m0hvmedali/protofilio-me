import { db } from './src/db/index';
import { projects, skills, courses, services, users, profiles } from './src/db/schema';

const initialProfile = {
  name: 'Mohamed Aly Maher',
  role: 'Full-Stack Developer & AI Integrator',
  bio: 'Highly analytical Full-Stack Developer and AI Integrator with a deep foundation in applied mathematics and networking. Expert in architecting scalable backend systems, integrating sophisticated Natural Language Processing (NLP) models, and building intuitive, data-rich frontend experiences. Proven track record in developing complex API ecosystems and AI-driven platforms that bridge the gap between theoretical science and high-performance software solutions.',
  location: 'Egypt',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
  resumeUrl: '#',
  email: 'mohamedalix546@gmail.com',
  linkedinUrl: 'https://linkedin.com/in/mohamedalymaher',
  githubUrl: 'https://github.com/mohamedalymaher',
  whatsapp: '+201281320192',
};

const initialProjects = [
  {
    title: 'Math Hub',
    description: 'An AI-driven educational platform helping students organize studies, track progress, and analyze performance. Features include a visual "Knowledge Universe" mind map, a Pomodoro timer with Spotify sync, advanced search radar, detailed analytics, and interactive math labs.',
    posterUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    techStack: ['Python', 'React', 'NLP', 'PyTorch', 'D3.js'],
    repoLink: 'https://github.com/m0hvmedali/math-hub',
  },
  {
    title: 'Growth Tree',
    description: 'A digital platform supporting mental health and self-growth using CBT and DBT techniques. It features an interactive wheel of feelings, mental skills modules, calming exercises, a gratitude wall, and detailed emotional progress tracking.',
    posterUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    techStack: ['Flask', 'PostgreSQL', 'Tailwind', 'Sentiment Analysis'],
    repoLink: 'https://github.com/m0hvmedali/mental-journey-tracker',
  },
  {
    title: 'AS Inventory Management',
    description: 'A production-grade RESTful Inventory Management API built with Laravel 11. Designed for Supabase deployment, it includes token authentication, atomic stock adjustments, low-stock alerts, role-based protection, and a developer documentation portal.',
    posterUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    techStack: ['Laravel 11', 'PostgreSQL', 'Supabase', 'Redis', 'Swagger'],
    repoLink: 'https://github.com/m0hvmedali/Inventory-Management-_API',
  },
  {
    title: 'AI-OS — Unified Gateway',
    description: 'A unified gateway over multiple cloud AI services with full support for LLMs, TTS, STT, image generation, embeddings, and vector DBs. Features a smart fallback router, circuit breakers, and zero hardcoding via JSON configuration.',
    posterUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    techStack: ['TypeScript', 'Node.js', 'SQLite', 'LLMs', 'Vector DBs'],
    repoLink: 'https://github.com/m0hvmedali/ai-os',
  },
];

const initialCourses = [
  {
    title: 'Certified NLP Specialist',
    provider: 'Certification',
    date: 'Recent',
    keyTakeaway: 'Deep learning for language understanding and generation.',
  },
  {
    title: 'Certified Backend Developer',
    provider: 'Certification',
    date: 'Recent',
    keyTakeaway: 'Mastery in scalable server-side architecture and complex API ecosystems.',
  },
  {
    title: 'Certified Python Developer',
    provider: 'Certification',
    date: 'Recent',
    keyTakeaway: 'Advanced data structures and algorithmic efficiency.',
  },
  {
    title: 'Certified Networking Specialist',
    provider: 'Certification',
    date: 'Recent',
    keyTakeaway: 'Expertise in TCP/IP, security, and cloud infrastructure.',
  }
];

async function seed() {
  console.log('Seeding profile...');
  await db.insert(profiles).values(initialProfile);
  
  console.log('Seeding courses...');
  for (const course of initialCourses) {
    await db.insert(courses).values(course);
  }
  console.log('Seeding complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
