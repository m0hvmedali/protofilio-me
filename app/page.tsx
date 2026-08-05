import Hero from '@/components/Hero';
import SkillsGrid from '@/components/SkillsGrid';
import Timeline from '@/components/Timeline';
import Services from '@/components/Services';
import ProjectsGrid from '@/components/ProjectsGrid';
import FAB from '@/components/FAB';
import { userProfile, skills, services, projects as staticProjects, courses as staticCourses } from '@/lib/data';
import { supabase } from '@/src/db/supabase';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let dbProjects: any[] = [];
  let dbCourses: any[] = [];
  let dbProfile: any = null;

  try {
    const { data: profilesData } = await supabase.from('profiles').select('*').limit(1);
    if (profilesData && profilesData.length > 0) {
      dbProfile = profilesData[0];
    }

    const { data: projectsData } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (projectsData) {
      dbProjects = projectsData;
    }

    const { data: coursesData } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
    if (coursesData) {
      dbCourses = coursesData;
    }
  } catch (error) {
    console.error("Database query failed", error);
  }

  const mappedProfile = dbProfile ? {
    id: dbProfile.id.toString(),
    name: dbProfile.name,
    headline: dbProfile.role,
    bio: dbProfile.bio,
    resume_url: dbProfile.resume_url,
    email: dbProfile.email,
    linkedin_url: dbProfile.linkedin_url,
    github_url: dbProfile.github_url,
    whatsapp: dbProfile.whatsapp || undefined,
    avatar_url: dbProfile.avatar_url || undefined,
  } : userProfile;
  
  const mappedProjects = dbProjects.length > 0 ? dbProjects.map(p => ({
    id: p.id.toString(),
    title: p.title,
    description: p.description,
    poster_url: p.poster_url,
    tech_stack: p.tech_stack as string[],
    live_link: p.live_link || undefined,
    repo_link: p.repo_link || undefined,
  })) : staticProjects;

  const mappedCourses = dbCourses.length > 0 ? dbCourses.map(c => ({
    id: c.id.toString(),
    title: c.title,
    provider: c.provider,
    date: c.date,
    key_takeaway: c.key_takeaway,
  })) : staticCourses;

  return (
    <main className="relative min-h-screen bg-background">
      {/* Decorative gradient overlay for the entire page */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[1000px] h-[1000px] bg-accent/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-blue-500/3 rounded-full blur-[150px]" />
      </div>

      <header className="absolute top-0 left-0 w-full p-6 lg:px-12 flex justify-end z-50">
        <a 
          href={`mailto:${mappedProfile.email}`} 
          className="glass px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Contact Me
        </a>
      </header>

      <Hero profile={mappedProfile} avatarUrl={dbProfile?.avatar_url || mappedProfile.avatar_url} />
      <SkillsGrid skills={skills} />
      <Services services={services} />
      <Timeline courses={mappedCourses} />
      <ProjectsGrid projects={mappedProjects} />
      
      <FAB profile={mappedProfile} />
      
      <footer className="py-8 text-center text-secondary/60 text-sm relative z-10 border-t border-white/5">
        <p>&copy; {new Date().getFullYear()} {mappedProfile.name}. All rights reserved. <a href="/admin" className="hover:text-accent ml-2 transition-colors">Admin Area</a></p>
      </footer>
    </main>
  );
}
