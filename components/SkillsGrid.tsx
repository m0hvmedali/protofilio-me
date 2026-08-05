'use client';

import { motion } from 'motion/react';
import { Skill } from '@/lib/schema';
import Image from 'next/image';

export default function SkillsGrid({ skills }: { skills: Skill[] }) {
  return (
    <section id="skills" className="py-24 px-6 lg:px-12 bg-background relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 text-center lg:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">The Arsenal</h2>
          <p className="text-secondary text-lg max-w-2xl">
            Core competencies engineered for performance and visual fidelity.
          </p>
        </motion.div>

        {/* Masonry/Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[300px]">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative group overflow-hidden rounded-xl border border-white/10 ${
                i === 0 || i === 3 ? 'lg:col-span-2' : 'lg:col-span-1'
              }`}
            >
              {/* Background Image */}
              <Image
                src={skill.image_url}
                alt={skill.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {skill.title}
                </h3>
                
                {/* Hover Description */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <p className="text-sm text-secondary line-clamp-3">
                    {skill.hover_description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
