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
                  <div className="aspect-[4/3] w-full bg-white premium-card rounded-[40px] relative overflow-hidden group border border-gt-border shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                    {/* Visual 1: Intelligence / Analytics */}
                    {i === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center p-8 bg-gradient-to-br from-gt-bg to-[#e6f4ea]">
                        <div className="w-full max-w-[280px] bg-white rounded-2xl shadow-[0_20px_40px_rgba(20,110,69,0.08)] p-6 border border-gt-border group-hover:-translate-y-3 transition-transform duration-700">
                          <div className="flex justify-between items-center mb-8">
                            <div className="space-y-2">
                              <div className="h-2 w-16 bg-gt-border rounded-full"></div>
                              <div className="h-2 w-10 bg-gt-border/50 rounded-full"></div>
                            </div>
                            <div className="px-3 py-1 bg-gt-bright/20 text-gt-primary text-[11px] font-bold rounded-full border border-gt-bright/30">-18%</div>
                          </div>
                          <div className="flex items-end gap-3 h-28 mb-5">
                            <div className="w-1/4 bg-gt-primary/20 rounded-t-lg h-[40%] group-hover:h-[50%] transition-all duration-700"></div>
                            <div className="w-1/4 bg-gt-teal/30 rounded-t-lg h-[60%] group-hover:h-[70%] transition-all duration-700 delay-100"></div>
                            <div className="w-1/4 bg-gt-bright/50 rounded-t-lg h-[80%] group-hover:h-[90%] transition-all duration-700 delay-200"></div>
                            <div className="w-1/4 bg-gt-primary rounded-t-lg h-[100%] relative overflow-hidden">
                              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700 delay-300"></div>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className="h-1.5 w-8 bg-gt-border rounded-full"></div>
                            <div className="h-1.5 w-8 bg-gt-border rounded-full"></div>
                            <div className="h-1.5 w-8 bg-gt-border rounded-full"></div>
                            <div className="h-1.5 w-8 bg-gt-border rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Visual 2: Challenges / Habits */}
                    {i === 1 && (
                      <div className="absolute inset-0 flex items-center justify-center p-8 bg-gradient-to-tr from-[#f0fdf4] to-gt-bg">
                        <div className="relative flex flex-col items-center">
                          <div className="relative w-40 h-40 group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-700 ease-out">
                            <div className="absolute inset-0 bg-gt-bright rounded-full opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-700"></div>
                            <div className="absolute inset-0 flex items-center justify-center bg-white rounded-full border-4 border-gt-bg shadow-xl">
                               <IconRenderer name="Trophy" size={64} strokeWidth={1.5} className="text-gt-primary drop-shadow-md" />
                            </div>
                            <div className="absolute -top-2 -right-2 bg-white p-2 rounded-full shadow-lg border border-gt-border group-hover:rotate-[-15deg] transition-transform duration-700">
                               <IconRenderer name="Star" size={20} strokeWidth={2} className="text-gt-bright fill-gt-bright" />
                            </div>
                          </div>
                          <div className="mt-6 bg-white px-5 py-3 rounded-full shadow-lg border border-gt-border flex items-center gap-3 group-hover:-translate-y-2 transition-transform duration-700 delay-100 relative z-10">
                            <div className="flex -space-x-2">
                              <div className="w-6 h-6 rounded-full bg-gt-primary/20 border border-white"></div>
                              <div className="w-6 h-6 rounded-full bg-gt-teal/30 border border-white"></div>
                              <div className="w-6 h-6 rounded-full bg-gt-bright/40 border border-white"></div>
                            </div>
                            <span className="text-sm font-bold text-gt-dark">14 Day Streak!</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Visual 3: Privacy */}
                    {i === 2 && (
                      <div className="absolute inset-0 flex items-center justify-center p-8 bg-gradient-to-b from-[#0f2c1f] to-gt-primary overflow-hidden">
                        {/* Encrypted Data Stream */}
                        <div className="absolute inset-0 opacity-10 flex flex-col justify-around text-gt-bright text-[12px] font-mono whitespace-nowrap -rotate-[15deg] scale-150">
                          <div className="group-hover:-translate-x-10 transition-transform duration-1000">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</div>
                          <div className="group-hover:translate-x-10 transition-transform duration-1000">d2a4c14298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b834</div>
                          <div className="group-hover:-translate-x-10 transition-transform duration-1000">f9b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b899</div>
                          <div className="group-hover:translate-x-10 transition-transform duration-1000">a1b2c3d4e5f678901234567890abcdef1234567890abcdef1234567890abcdef</div>
                        </div>
                        
                        <div className="relative w-40 h-40 group-hover:scale-105 transition-transform duration-700">
                          <div className="absolute inset-0 bg-gt-bright rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                          <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                             <div className="relative">
                               <IconRenderer name="ShieldCheck" size={64} strokeWidth={1.5} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gt-bright rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                             </div>
                          </div>
                        </div>

                        {/* Top Left Dots */}
                        <div className="absolute top-6 left-6 flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-white/20"></div>
                          <div className="w-3 h-3 rounded-full bg-white/20"></div>
                          <div className="w-3 h-3 rounded-full bg-white/20 group-hover:bg-gt-bright transition-colors duration-700 delay-300 shadow-[0_0_8px_rgba(144,184,22,0.8)]"></div>
                        </div>
                      </div>
                    )}
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
