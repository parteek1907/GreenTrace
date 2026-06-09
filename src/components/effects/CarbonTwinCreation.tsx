"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Leaf, Utensils, Car, Zap, ShoppingBag } from "lucide-react";
import PremiumOnboardingBackground from "./PremiumOnboardingBackground";

const ANALYSIS_MESSAGES = [
  "Analyzing dietary patterns...",
  "Calculating transport emissions...",
  "Evaluating consumption habits...",
  "Modeling future impact...",
  "Generating sustainability profile...",
  "Predicting reduction opportunities..."
];

export default function CarbonTwinCreation() {
  const router = useRouter();
  const [phase, setPhase] = useState(1);
  const [analysisIndex, setAnalysisIndex] = useState(0);

  useEffect(() => {
    // Ultra-tight 10s cinematic sequence
    const p2 = setTimeout(() => setPhase(2), 1500);
    const p3 = setTimeout(() => setPhase(3), 3000);
    const p4 = setTimeout(() => setPhase(4), 4500);
    const p5 = setTimeout(() => setPhase(5), 7000);
    const p6 = setTimeout(() => setPhase(6), 8500);
    const p7 = setTimeout(() => {
      window.location.href = "/dashboard?new=true";
    }, 11000); // Redirect seamlessly right after climax finishes

    return () => {
      clearTimeout(p2); clearTimeout(p3); clearTimeout(p4);
      clearTimeout(p5); clearTimeout(p6); clearTimeout(p7);
    };
  }, [router]);

  useEffect(() => {
    if (phase === 4) {
      const interval = setInterval(() => {
        setAnalysisIndex(prev => Math.min(prev + 1, ANALYSIS_MESSAGES.length - 1));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [phase]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center font-sans bg-white">
      
      <PremiumOnboardingBackground stepId="results" />

      {/* Subtle floating particles for light theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gt-primary rounded-full blur-[1px]"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.2
            }}
            animate={{ 
              y: [null, Math.random() * -100 - 50],
              opacity: [null, 0]
            }}
            transition={{ 
              duration: Math.random() * 4 + 3, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Main Orchestration Layer */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full max-w-4xl mx-auto">
        
        {/* Visualizer Canvas */}
        <div className="relative w-[400px] h-[400px] flex items-center justify-center mb-12">
          <AnimatePresence mode="wait">
            
            {/* Phase 2: Nodes and Connections */}
            {phase === 2 && (
              <motion.div 
                key="phase2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  <motion.path 
                    d="M100 100 Q 200 200 300 100" 
                    fill="none" stroke="rgba(20,110,69,0.3)" strokeWidth="1"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }}
                  />
                  <motion.path 
                    d="M100 300 Q 200 200 300 300" 
                    fill="none" stroke="rgba(20,110,69,0.3)" strokeWidth="1"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.3 }}
                  />
                  <motion.path 
                    d="M100 100 Q 200 200 100 300" 
                    fill="none" stroke="rgba(20,110,69,0.3)" strokeWidth="1"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.4 }}
                  />
                  <motion.path 
                    d="M300 100 Q 200 200 300 300" 
                    fill="none" stroke="rgba(20,110,69,0.3)" strokeWidth="1"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }}
                  />
                </svg>

                {/* Nodes */}
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} className="absolute top-[80px] left-[80px] w-10 h-10 rounded-full bg-white/60 border border-gt-primary/20 flex items-center justify-center backdrop-blur-xl shadow-[0_4px_20px_rgba(20,110,69,0.1)]">
                  <Utensils className="w-4 h-4 text-gt-primary" />
                </motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="absolute top-[80px] right-[80px] w-10 h-10 rounded-full bg-white/60 border border-gt-primary/20 flex items-center justify-center backdrop-blur-xl shadow-[0_4px_20px_rgba(20,110,69,0.1)]">
                  <Car className="w-4 h-4 text-gt-primary" />
                </motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} className="absolute bottom-[80px] left-[80px] w-10 h-10 rounded-full bg-white/60 border border-gt-primary/20 flex items-center justify-center backdrop-blur-xl shadow-[0_4px_20px_rgba(20,110,69,0.1)]">
                  <Zap className="w-4 h-4 text-gt-primary" />
                </motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} className="absolute bottom-[80px] right-[80px] w-10 h-10 rounded-full bg-white/60 border border-gt-primary/20 flex items-center justify-center backdrop-blur-xl shadow-[0_4px_20px_rgba(20,110,69,0.1)]">
                  <ShoppingBag className="w-4 h-4 text-gt-primary" />
                </motion.div>
              </motion.div>
            )}

            {/* Phase 3 & 4: Abstract Wireframe Figure */}
            {(phase === 3 || phase === 4) && (
              <motion.div
                key="phase3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, rotate: [0, 5, -5, 0] }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 1, rotate: { duration: 10, repeat: Infinity, ease: "linear" } }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg className="w-[300px] h-[300px]" viewBox="0 0 200 200">
                  <motion.g stroke="rgba(20,110,69,0.5)" strokeWidth="0.5" fill="none">
                    <motion.circle cx="100" cy="50" r="15" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
                    <motion.circle cx="100" cy="50" r="25" strokeDasharray="2 4" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
                    <motion.circle cx="100" cy="110" r="30" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }} />
                    <motion.path d="M100 65 L100 80" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
                    <motion.path d="M100 140 Q 60 180 50 200" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.4 }} />
                    <motion.path d="M100 140 Q 140 180 150 200" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.4 }} />
                    <motion.path d="M70 110 Q 40 100 20 130" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />
                    <motion.path d="M130 110 Q 160 100 180 130" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />
                    <motion.path d="M85 95 L115 125 M115 95 L85 125" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.7 }} />
                  </motion.g>
                </svg>
              </motion.div>
            )}

            {/* Phase 5: Wireframe Earth */}
            {phase === 5 && (
              <motion.div
                key="phase5"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-64 h-64">
                  <motion.div 
                    className="absolute inset-0 rounded-full border border-gt-primary/20 shadow-[0_0_40px_rgba(20,110,69,0.08)] bg-white/20 backdrop-blur-sm"
                    animate={{ rotateX: 360, rotateY: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  >
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <ellipse cx="50" cy="50" rx="50" ry="20" fill="none" stroke="rgba(20,110,69,0.4)" strokeWidth="0.5" />
                      <ellipse cx="50" cy="50" rx="20" ry="50" fill="none" stroke="rgba(20,110,69,0.4)" strokeWidth="0.5" />
                      <ellipse cx="50" cy="50" rx="50" ry="50" fill="none" stroke="rgba(20,110,69,0.5)" strokeWidth="0.5" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Phase 6: Climax Logo */}
            {phase >= 6 && (
              <motion.div
                key="phase6"
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.8, 2.5], opacity: [0.3, 0, 0] }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 bg-gt-primary rounded-full blur-2xl"
                  />
                  <div className="w-32 h-32 rounded-[32px] bg-white border border-white flex items-center justify-center shadow-[0_20px_80px_rgba(20,110,69,0.15)] relative z-10">
                    <Leaf className="w-16 h-16 text-gt-primary drop-shadow-sm" strokeWidth={1.5} />
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Typography Orchestration (Premium & Light) */}
        <div className="h-32 flex flex-col items-center justify-start text-center">
          <AnimatePresence mode="wait">
            
            {phase === 1 && (
              <motion.h1
                key="t1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-medium tracking-tight text-gt-dark"
              >
                Every footprint tells a story.
              </motion.h1>
            )}

            {phase === 2 && (
              <motion.h1
                key="t2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-medium tracking-tight text-gt-dark"
              >
                We&apos;re reading yours.
              </motion.h1>
            )}

            {phase === 3 && (
              <motion.h1
                key="t3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-medium tracking-tight text-gt-dark"
              >
                Building your Carbon Twin
              </motion.h1>
            )}

            {phase === 4 && (
              <motion.div
                key="t4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center"
              >
                <h1 className="text-3xl font-medium tracking-tight text-gt-gray mb-4">
                  Building your Carbon Twin
                </h1>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={analysisIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl font-semibold text-gt-primary tracking-wide"
                  >
                    {ANALYSIS_MESSAGES[analysisIndex]}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            )}

            {phase === 5 && (
              <motion.h1
                key="t5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-medium tracking-tight text-gt-dark"
              >
                Predicting your future impact
              </motion.h1>
            )}

            {phase >= 6 && (
              <motion.div
                key="t6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-gt-dark mb-4 drop-shadow-sm">
                  Carbon Twin Created
                </h1>
                <p className="text-xl text-gt-gray font-medium tracking-wide">
                  Welcome to your Environmental Intelligence Platform.
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
      
      {/* Final White Fade Transition */}
      <AnimatePresence>
        {phase === 7 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#F8FAFC] z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
