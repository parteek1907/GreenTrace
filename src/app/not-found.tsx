"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutDashboard, Orbit, Flag, BarChart3, Lightbulb, MapPin, ArrowRight, ArrowDown } from "lucide-react";

export default function NotFound() {
  const recoveryLinks = [
    { name: "Carbon Dashboard", href: "/dashboard", icon: LayoutDashboard, desc: "Your main sustainability hub" },
    { name: "Carbon Twin", href: "/dashboard/simulator", icon: Orbit, desc: "Simulate lifestyle changes" },
    { name: "Challenges", href: "/dashboard/challenges", icon: Flag, desc: "Join community habits" },
    { name: "Progress", href: "/dashboard/progress", icon: BarChart3, desc: "Track your emission trends" },
    { name: "Recommendations", href: "/dashboard/recommendations", icon: Lightbulb, desc: "Smart ways to reduce" }
  ];

  return (
    <div className="min-h-screen bg-gt-bg text-gt-dark font-sans flex flex-col relative overflow-hidden selection:bg-gt-primary selection:text-white">
      {/* Background Particles / Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[15%] w-64 h-64 bg-gt-teal/10 rounded-full blur-[80px]"
        />
        <motion.div 
          animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[10%] right-[20%] w-96 h-96 bg-gt-primary/5 rounded-full blur-[100px]"
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8 relative z-10 max-w-5xl mx-auto w-full pt-10 pb-16">
        
        {/* Visual Centerpiece: Topographic Trail */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl h-32 md:h-48 mb-8"
        >
          {/* Fading gradient mask to make path disappear into distance */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-transparent via-transparent to-gt-bg pointer-events-none" />
          <div className="absolute inset-0 z-10 bg-gradient-to-l from-gt-bg via-transparent to-transparent pointer-events-none" />

          <svg className="w-full h-full" viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="trailGrad" x1="0" y1="300" x2="800" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#146E45" stopOpacity="1" />
                <stop offset="50%" stopColor="#16A085" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#90B816" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Topographic background lines */}
            <path d="M-100 250 Q 150 220 300 150 T 800 100" stroke="rgba(20, 110, 69, 0.05)" strokeWidth="1" fill="none" />
            <path d="M-100 280 Q 200 280 400 180 T 900 80" stroke="rgba(20, 110, 69, 0.08)" strokeWidth="1" fill="none" />
            <path d="M-100 320 Q 250 340 500 220 T 950 150" stroke="rgba(20, 110, 69, 0.04)" strokeWidth="1" fill="none" />
            
            {/* Main Trail */}
            <motion.path 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              d="M50 280 C 200 280 250 150 450 150 S 650 50 850 0" 
              stroke="url(#trailGrad)" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeDasharray="8 8"
              fill="none" 
            />

            {/* "You are here" Indicator */}
            <motion.g 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <circle cx="450" cy="150" r="12" fill="#146E45" opacity="0.2" className="animate-ping" style={{ transformOrigin: '450px 150px' }} />
              <circle cx="450" cy="150" r="6" fill="#146E45" />
              <circle cx="450" cy="150" r="2" fill="#FFFFFF" />
              <foreignObject x="465" y="140" width="120" height="40">
                <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-gt-border shadow-sm">
                  <MapPin className="w-3 h-3 text-gt-primary" />
                  <span className="text-[10px] font-bold text-gt-dark uppercase tracking-wider">You are here</span>
                </div>
              </foreignObject>
            </motion.g>
          </svg>
        </motion.div>

        {/* Messaging */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-gt-primary/10 text-gt-primary font-bold text-xs uppercase tracking-widest mb-4 border border-gt-primary/20">
            Untracked Journey
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gt-dark tracking-tight mb-4 leading-tight">
            Looks like you've <span className="text-gt-primary">wandered off the trail.</span>
          </h1>
          <p className="text-base md:text-lg font-medium text-gt-gray leading-relaxed mb-8 max-w-xl mx-auto">
            The route you're looking for couldn't be found. It may have moved or no longer exists. Let's get you back on track towards your sustainability goals.
          </p>
          <div className="flex flex-col items-center justify-center gap-10">
            <div className="flex items-center justify-center gap-4">
              <Link 
                href="/dashboard"
                className="bg-gt-dark hover:bg-black text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] flex items-center gap-2"
              >
                Return to Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            {/* Scroll Indicator */}
            <motion.button 
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="flex flex-col items-center gap-2 text-gt-gray hover:text-gt-primary transition-colors cursor-pointer group"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-gt-primary transition-colors">Scroll for mapped routes</span>
              <div className="animate-bounce mt-1">
                <ArrowDown className="w-4 h-4" />
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Smart Recovery Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-gt-border flex-1" />
            <span className="text-sm font-bold text-gt-gray uppercase tracking-widest">Or explore mapped routes</span>
            <div className="h-px bg-gt-border flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recoveryLinks.map((link, idx) => (
              <Link 
                key={link.name}
                href={link.href}
                className="group bg-white border border-gt-border rounded-2xl p-5 hover:border-gt-primary/50 hover:shadow-lg transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-gt-bg flex items-center justify-center shrink-0 group-hover:bg-gt-primary/10 transition-colors">
                  <link.icon className="w-5 h-5 text-gt-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gt-dark group-hover:text-gt-primary transition-colors flex items-center gap-1.5">
                    {link.name}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-xs font-medium text-gt-gray mt-1 leading-snug">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
