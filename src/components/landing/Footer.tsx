"use client";

import Link from "next/link";
import { Leaf, Globe, Activity, Orbit, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const ENDING_QUOTES = [
  "Every footprint leaves a trace.",
  "Every choice shapes tomorrow.",
  "Understand your impact.",
  "Measure. Simulate. Improve."
];

// Generate random particles once on mount
const Particles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-gt-primary rounded-full blur-[1px] opacity-20"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: ["0%", "-50%", "0%"],
            x: ["0%", "20%", "0%"],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % ENDING_QUOTES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-gt-bg text-gt-dark overflow-hidden border-t border-gt-border/30">
      
      {/* =========================================
          DESKTOP FOOTER (Hidden on mobile) 
          ========================================= */}
      <div className="hidden md:block relative w-full pt-32 pb-12">
        {/* 9. Depth & Atmosphere Backgrounds */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,110,69,0.03),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(20,110,69,0.02),transparent_50%)] pointer-events-none"></div>
        
        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

        {/* 4. Giant Background Statistic */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-gt-dark opacity-[0.02] whitespace-nowrap pointer-events-none select-none z-0 tracking-tighter">
          TRACE
        </div>

        {/* 1. Large Background Element (Topographic / Orbital curves) */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-[0.03] overflow-hidden">
          <svg viewBox="0 0 1000 500" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,250 C250,300 750,150 1000,250" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M0,280 C300,340 700,100 1000,280" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M0,220 C200,260 800,200 1000,220" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M0,310 C350,380 650,60 1000,310" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M0,190 C150,220 850,240 1000,190" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        {/* 6. Floating Particles */}
        <Particles />

        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 flex flex-col items-center">
          
          {/* Top Section: Brand & Statement */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center space-y-8 mb-24"
          >
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 group relative">
              <div className="absolute inset-0 bg-gt-primary/10 blur-[40px] rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
              <Leaf className="w-8 h-8 text-gt-primary transition-transform duration-700 group-hover:rotate-12" strokeWidth={1.5} />
              <span className="text-2xl font-bold tracking-widest text-gt-dark uppercase">
                GreenTrace
              </span>
            </Link>
            
            {/* Statement */}
            <div className="space-y-3">
              <p className="text-2xl sm:text-3xl font-medium text-gt-dark tracking-wide max-w-2xl">
                Every footprint tells a story.
              </p>
              <p className="text-xl sm:text-2xl text-gt-gray font-serif italic">
                Understand yours.
              </p>
            </div>
          </motion.div>


          {/* Lower Section: Mission & Creator */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full grid grid-cols-2 gap-16 mb-24"
          >
            {/* 5. Current Mission */}
            <div className="flex flex-col justify-end">
              <h5 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gt-gray/70 mb-4">
                Current Mission
              </h5>
              <p className="text-base font-serif italic text-gt-dark leading-relaxed max-w-xs">
                Making sustainability<br/>understandable for everyone.
              </p>
            </div>

            {/* 8. Premium Signature Area */}
            <div className="flex flex-col items-end text-right">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gt-gray/70 mb-4">
                Crafted by
              </p>
              <h3 className="text-xl font-bold text-gt-dark mb-2 tracking-tight">
                Parteek Garg
              </h3>
              <p className="text-sm text-gt-gray leading-relaxed font-medium mb-6">
                Building Practical Systems
              </p>
              <div className="flex gap-4 justify-end">
                <a href="https://www.parteekgarg.in/" target="_blank" rel="noopener noreferrer" className="text-gt-gray hover:text-gt-primary transition-colors">
                  <Globe className="w-4 h-4" />
                </a>
                <a href="https://github.com/parteek1907/GreenTrace" target="_blank" rel="noopener noreferrer" className="text-gt-gray hover:text-gt-dark transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/parteek1907/" target="_blank" rel="noopener noreferrer" className="text-gt-gray hover:text-[#0A66C2] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-full pt-8 border-t border-gt-border/30 flex items-center justify-between"
          >
            <p className="text-xs font-medium text-gt-gray tracking-wide">
              © {currentYear} GreenTrace
            </p>
            
            {/* 10. Animated Footer Ending */}
            <div className="relative h-6 w-64 flex items-center justify-end overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute text-xs font-serif text-gt-gray/80 tracking-wide text-right"
                >
                  {ENDING_QUOTES[quoteIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* =========================================
          MOBILE FOOTER (Hidden on desktop) 
          ========================================= */}
      <div className="md:hidden relative w-full pt-16 pb-12 px-6 flex flex-col items-center text-center">
        {/* Particles */}
        <Particles />
        
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,110,69,0.04),transparent_60%)] pointer-events-none"></div>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-gt-primary/5 blur-[40px] rounded-full pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center w-full"
        >
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Leaf className="w-6 h-6 text-gt-primary" strokeWidth={1.5} />
            <span className="text-xl font-bold tracking-widest text-gt-dark uppercase">
              GreenTrace
            </span>
          </Link>

          <div className="space-y-1 mb-10">
            <p className="text-[15px] font-medium text-gt-dark tracking-wide">
              Every footprint tells a story.
            </p>
            <p className="text-[15px] text-gt-gray">
              Understand yours.
            </p>
          </div>

          <div className="w-full max-w-[120px] h-[1px] bg-gradient-to-r from-transparent via-gt-border/40 to-transparent mb-10"></div>

          <div className="mb-10">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gt-gray/70 mb-2">
              Crafted by
            </p>
            <h3 className="text-lg font-bold text-gt-dark mb-1 tracking-tight">
              Parteek Garg
            </h3>
            <p className="text-[13px] text-gt-gray font-medium">
              Building Practical Systems
            </p>
          </div>

          <div className="w-full max-w-[120px] h-[1px] bg-gradient-to-r from-transparent via-gt-border/40 to-transparent mb-10"></div>

          {/* Social Links (Pills) */}
          <div className="flex flex-col gap-3 w-full max-w-[220px] mb-12">
            <a href="https://www.parteekgarg.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-5 py-3 rounded-full border border-gt-border/50 bg-white/50 text-[13px] font-medium text-gt-dark hover:bg-white hover:border-gt-border hover:shadow-sm transition-all">
              <span className="flex items-center gap-3"><Globe className="w-4 h-4 text-gt-primary" /> Portfolio</span>
              <span className="text-gt-gray/40 text-xs font-serif">→</span>
            </a>
            <a href="https://github.com/parteek1907/GreenTrace" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-5 py-3 rounded-full border border-gt-border/50 bg-white/50 text-[13px] font-medium text-gt-dark hover:bg-white hover:border-gt-border hover:shadow-sm transition-all">
              <span className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gt-dark/70" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                GitHub
              </span>
              <span className="text-gt-gray/40 text-xs font-serif">→</span>
            </a>
            <a href="https://www.linkedin.com/in/parteek1907/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-5 py-3 rounded-full border border-gt-border/50 bg-white/50 text-[13px] font-medium text-gt-dark hover:bg-white hover:border-gt-border hover:shadow-sm transition-all">
              <span className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                LinkedIn
              </span>
              <span className="text-gt-gray/40 text-xs font-serif">→</span>
            </a>
          </div>

          <div className="w-full flex flex-col items-center gap-2">
            <p className="text-[10px] font-bold text-gt-gray tracking-widest uppercase">
              © {currentYear} GreenTrace
            </p>
            <p className="text-[11px] text-gt-gray/70 tracking-wide font-serif italic">
              Every footprint leaves a trace.
            </p>
          </div>

        </motion.div>
      </div>

    </footer>

  );
}
