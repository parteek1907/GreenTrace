"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

import IconRenderer from "@/components/ui/IconRenderer";

const features = [
  {
    title: "Intelligence, not just numbers.",
    description: "Most carbon trackers just show you a number. GreenTrace analyzes your daily habits, pinpoints your highest emission areas, and explains exactly why they matter using real environmental science.",
    icon: "BrainCircuit",
    bullets: ["Automatic categorization", "Peer-reviewed emission factors", "Personalized insights"],
  },
  {
    title: "Challenges that build real habits.",
    description: "Turn climate anxiety into action. Join community-driven challenges designed to help you slowly integrate sustainable choices into your lifestyle without overwhelming you.",
    icon: "Target",
    bullets: ["Gamified progression", "Streak tracking", "Community leaderboards"],
  },
  {
    title: "Bank-grade privacy for your data.",
    description: "Your lifestyle data is intimately personal. We treat it with the exact same security standards as a financial institution. Your data is encrypted, never sold, and always yours.",
    icon: "ShieldCheck",
    bullets: ["End-to-end encryption", "Zero third-party sharing", "One-click data export"],
  }
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative py-32 px-6 bg-gt-bg overflow-hidden">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-sm font-bold text-gt-emerald tracking-widest uppercase mb-4 block">
            Core Features
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gt-dark tracking-tight leading-tight">
            Designed to make <br className="hidden md:block" />
            sustainability <span className="text-gt-primary">effortless.</span>
          </h2>
        </motion.div>

        {/* Alternating Feature Blocks */}
        <div className="space-y-32">
          {features.map((feature, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={i} className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-16 items-center`}>
                
                {/* Visual Side */}
                <motion.div 
                  className="flex-1 w-full"
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="aspect-[4/3] w-full bg-white premium-card rounded-[40px] p-8 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-gt-primary/5 to-transparent opacity-50" />
                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gt-bg rounded-full flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-700">
                      <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center text-gt-primary">
                         <IconRenderer name={feature.icon} size={48} strokeWidth={2} />
                      </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-6 left-6 w-3 h-3 rounded-full bg-gt-border" />
                    <div className="absolute top-6 left-12 w-3 h-3 rounded-full bg-gt-border" />
                    <div className="absolute bottom-6 right-6 w-16 h-1 bg-gt-border rounded-full" />
                  </div>
                </motion.div>

                {/* Content Side */}
                <motion.div 
                  className="flex-1 w-full"
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="text-3xl md:text-4xl font-extrabold text-gt-dark tracking-tight mb-6 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-lg font-medium text-gt-gray leading-relaxed mb-8">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-4">
                    {feature.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-gt-emerald/20 flex items-center justify-center text-gt-emerald shrink-0">
                          <IconRenderer name="Check" size={14} strokeWidth={3} />
                        </div>
                        <span className="font-bold text-gt-dark">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
