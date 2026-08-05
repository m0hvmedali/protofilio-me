'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Service } from '@/lib/schema';
import { Layers, BrainCircuit, PenTool, X, CheckCircle2 } from 'lucide-react';

const icons = {
  Layers: Layers,
  BrainCircuit: BrainCircuit,
  PenTool: PenTool,
};

export default function Services({ services }: { services: Service[] }) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services" className="py-24 px-6 lg:px-12 bg-background relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Premium Services</h2>
          <p className="text-secondary text-lg">
            High-end technical solutions delivered with uncompromising quality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const Icon = icons[service.icon as keyof typeof icons] || Layers;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setSelectedService(service)}
                className="glass p-8 rounded-2xl cursor-pointer hover:bg-white/5 border border-white/5 hover:border-accent/30 transition-all duration-300 group flex flex-col h-full"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-secondary text-sm flex-grow mb-6">
                  {service.short_desc}
                </p>
                <div className="mt-auto flex items-center text-accent text-sm font-semibold group-hover:underline underline-offset-4">
                  View Service Level Agreement
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal / Side Drawer Concept implemented as an overlay Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center lg:justify-end lg:pr-12 lg:pt-12 lg:pb-12 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg glass bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden h-full max-h-[80vh] flex flex-col z-10"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                <h3 className="text-xl font-bold">{selectedService.title}</h3>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 rounded-full hover:bg-white/10 text-secondary hover:text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto space-y-8 flex-grow">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-accent font-semibold mb-3">Overview</h4>
                  <p className="text-secondary leading-relaxed text-sm">
                    {selectedService.detailed_deliverables.overview}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-accent font-semibold mb-3">Core Features</h4>
                  <ul className="space-y-3">
                    {selectedService.detailed_deliverables.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-primary">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-accent font-semibold mb-3">Delivery Process</h4>
                  <div className="space-y-4">
                    {selectedService.detailed_deliverables.process.map((step, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-secondary border border-white/10 shrink-0">
                          {i + 1}
                        </div>
                        <span className="text-sm font-medium">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-white/5 bg-white/5">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="w-full py-4 bg-primary text-background font-bold rounded-lg hover:bg-white/90 transition-colors"
                >
                  Request Consultation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
