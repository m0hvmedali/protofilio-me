'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Mail, Linkedin, Github, Phone, X } from 'lucide-react';
import { UserProfile } from '@/lib/schema';

export default function FAB({ profile }: { profile: UserProfile }) {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    { icon: Mail, label: 'Email', href: `mailto:${profile.email}`, color: 'hover:text-red-400' },
    { icon: Linkedin, label: 'LinkedIn', href: profile.linkedin_url, color: 'hover:text-blue-400' },
    { icon: Github, label: 'GitHub', href: profile.github_url, color: 'hover:text-gray-300' },
    { icon: Phone, label: 'WhatsApp', href: `https://wa.me/${profile.whatsapp?.replace('+', '')}`, color: 'hover:text-green-400' },
  ].filter(opt => opt.href);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 glass p-4 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-2 min-w-[200px]"
          >
            <div className="px-3 py-2 border-b border-white/10 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Rapid Contact</span>
            </div>
            {contactOptions.map((opt, i) => {
              const Icon = opt.icon;
              return (
                <motion.a
                  key={opt.label}
                  href={opt.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group ${opt.color}`}
                >
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span className="text-sm font-medium text-primary">{opt.label}</span>
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 rounded-full bg-primary text-background flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] relative"
      >
        {/* Pulsing effect */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
        )}
        
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
