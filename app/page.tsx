import Hero from '@/components/Hero';
import SkillsGrid from '@/components/SkillsGrid';
import Timeline from '@/components/Timeline';
import Services from '@/components/Services';
import ProjectsGrid from '@/components/ProjectsGrid';
import FAB from '@/components/FAB';
import { userProfile, skills, courses, services, projects } from '@/lib/data';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Decorative gradient overlay for the entire page */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[1000px] h-[1000px] bg-accent/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-blue-500/3 rounded-full blur-[150px]" />
      </div>

      <Hero profile={userProfile} />
      <SkillsGrid skills={skills} />
      <Services services={services} />
      <Timeline courses={courses} />
      <ProjectsGrid projects={projects} />
      
      <FAB profile={userProfile} />
      
      <footer className="py-8 text-center text-secondary/60 text-sm relative z-10 border-t border-white/5">
        <p>&copy; {new Date().getFullYear()} {userProfile.name}. All rights reserved.</p>
      </footer>
    </main>
  );
}
