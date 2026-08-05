'use client';

import { motion } from 'motion/react';
import { Course } from '@/lib/schema';

export default function Timeline({ courses }: { courses: Course[] }) {
  return (
    <section id="education" className="py-24 px-6 lg:px-12 bg-surface/30 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Continuous Mastery</h2>
          <p className="text-secondary text-lg">
            A commitment to staying at the bleeding edge of technology.
          </p>
        </motion.div>

        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:border-none">
          {/* Desktop central line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

          {courses.map((course, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative pl-8 md:pl-0 mb-12 flex flex-col md:flex-row ${
                  isEven ? 'md:flex-row-reverse' : ''
                } items-center group`}
              >
                {/* Mobile indicator dot */}
                <div className="md:hidden absolute left-0 w-2 h-2 rounded-full bg-accent -translate-x-[5px] mt-2 group-hover:shadow-[0_0_10px_#66FCF1] transition-shadow" />

                {/* Desktop indicator dot */}
                <div className="hidden md:block absolute left-1/2 w-4 h-4 rounded-full bg-background border-2 border-accent -translate-x-1/2 group-hover:scale-125 group-hover:bg-accent transition-all duration-300 z-10" />

                {/* Content Card */}
                <div className={`md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'} w-full`}>
                  <div className="glass p-6 rounded-xl hover:bg-surface/80 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-accent text-sm font-bold tracking-wider">{course.date}</span>
                      <span className="text-secondary text-xs uppercase px-2 py-1 bg-white/5 rounded-md">{course.provider}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                    <p className="text-secondary text-sm leading-relaxed">
                      {course.key_takeaway}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
