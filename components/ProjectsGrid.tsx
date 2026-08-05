'use client';

import { motion } from 'motion/react';
import { Project } from '@/lib/schema';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="py-24 px-6 lg:px-12 bg-surface/30 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 text-center lg:text-left flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Selected Works</h2>
            <p className="text-secondary text-lg max-w-2xl">
              A curated collection of digital products and technical architecture.
            </p>
          </div>
          <button className="text-accent font-semibold hover:underline underline-offset-4">
            View Complete Archive &rarr;
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden glass border border-white/5 aspect-[4/3] flex flex-col"
            >
              {/* Poster Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={project.poster_url}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
              </div>

              {/* Content overlay */}
              <div className="relative z-10 p-8 flex flex-col h-full justify-end">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech_stack.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 text-xs font-semibold bg-white/10 backdrop-blur-md rounded-full border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-3xl font-bold mb-3 group-hover:text-accent transition-colors">{project.title}</h3>
                
                <p className="text-sm text-secondary/90 line-clamp-3 mb-6">
                  {project.description}
                </p>
                
                <div className="flex items-center gap-4">
                  {project.live_link && (
                    <a
                      href={project.live_link}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background font-bold rounded-lg hover:bg-white/90 transition-colors"
                    >
                      View Case Study
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.repo_link && (
                    <a
                      href={project.repo_link}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 glass hover:bg-white/10 transition-colors border border-white/10 font-bold rounded-lg"
                      aria-label="View Source"
                    >
                      <Github className="w-5 h-5" />
                      View Source
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
