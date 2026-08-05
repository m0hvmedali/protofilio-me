'use client';

import { motion } from 'motion/react';
import { UserProfile } from '@/lib/schema';
import { Download, ChevronRight } from 'lucide-react';

export default function Hero({ profile, avatarUrl }: { profile: UserProfile, avatarUrl?: string }) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-10 px-6 lg:px-12 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left Column: Headline & Value Prop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            <span className="block text-secondary text-2xl md:text-3xl font-medium mb-4 tracking-normal">Hi, I&apos;m {profile.name}</span>
            Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Premium</span> Digital Experiences.
          </h1>
          <p className="text-lg md:text-xl text-secondary mb-10 max-w-lg leading-relaxed">
            {profile.headline}. {profile.bio}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-background font-semibold rounded-lg hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]"
            >
              Explore Services
              <ChevronRight className="w-5 h-5" />
            </a>
            <a
              href={profile.resume_url}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 glass text-primary font-medium rounded-lg hover:bg-surface/80 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Executive Resume
            </a>
          </div>
        </motion.div>

        {/* Right Column: Interactive CV Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative lg:ml-auto w-full max-w-md perspective-1000"
        >
          <div className="glass rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
            {/* Glossy reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-accent to-blue-600 p-[2px]">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-2xl font-bold overflow-hidden">
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    profile.name.charAt(0)
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold">{profile.name}</h3>
                <p className="text-accent text-sm font-medium uppercase tracking-wider">{profile.headline.split('&')[0]}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-secondary text-sm uppercase tracking-wider">Experience</span>
                <span className="font-semibold text-lg">2 Years</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-secondary text-sm uppercase tracking-wider">Availability</span>
                <span className="font-semibold text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Accepting Clients
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-secondary text-sm uppercase tracking-wider">Location</span>
                <span className="font-semibold text-lg">Global (Remote)</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
