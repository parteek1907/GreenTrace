"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface BackgroundProps {
  stepId: string;
}

const STEP_BACKGROUNDS: Record<string, { image: string, pattern: React.ReactNode }> = {
  profile: {
    image: "/earth.jpg",
    pattern: (
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="profile-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#profile-pattern)" />
      </svg>
    )
  },
  diet: {
    image: "/deepforest.jpg",
    pattern: (
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="diet-pattern" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M0 60 Q 30 0, 60 60 T 120 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0 60 Q 30 120, 60 60 T 120 60" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#diet-pattern)" />
      </svg>
    )
  },
  transport: {
    image: "/futurenature.jpg",
    pattern: (
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="transport-pattern" width="200" height="200" patternUnits="userSpaceOnUse">
          <path d="M-50,200 L200,-50 M0,250 L250,0 M-50,150 L150,-50" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="2" fill="currentColor" />
          <circle cx="50" cy="150" r="1.5" fill="currentColor" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#transport-pattern)" />
      </svg>
    )
  },
  energy: {
    image: "/emerald.jpg",
    pattern: (
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="energy-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="80" height="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="1" fill="currentColor" />
          <circle cx="80" cy="0" r="1" fill="currentColor" />
          <circle cx="0" cy="80" r="1" fill="currentColor" />
          <circle cx="80" cy="80" r="1" fill="currentColor" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#energy-pattern)" />
      </svg>
    )
  },
  lifestyle: {
    image: "/aurora.jpg",
    pattern: (
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="lifestyle-pattern" width="150" height="150" patternUnits="userSpaceOnUse">
          <ellipse cx="75" cy="75" rx="60" ry="20" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(45 75 75)" />
          <ellipse cx="75" cy="75" rx="60" ry="20" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(-45 75 75)" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#lifestyle-pattern)" />
      </svg>
    )
  },
  results: {
    image: "/earth.jpg",
    pattern: (
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="results-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 50 10 Q 70 30 50 50 Q 30 70 50 90" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#results-pattern)" />
      </svg>
    )
  }
};

export default function PremiumOnboardingBackground({ stepId }: BackgroundProps) {
  const currentBg = STEP_BACKGROUNDS[stepId] || STEP_BACKGROUNDS.profile;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-gt-bg">
      <AnimatePresence mode="wait">
        <motion.div
          key={stepId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Layer 1, 2, 3: Image with heavy blur and 5-10% opacity */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${currentBg.image})`,
              filter: "blur(40px)",
              opacity: 0.08
            }}
          />

          {/* Layer 4: Cream-to-transparent overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-gt-bg/90 via-gt-bg/50 to-gt-bg/90" />

          {/* Layer 5: Subtle premium grain/noise texture */}
          <div 
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
          />

          {/* Layer 6: Extremely subtle environmental patterns */}
          <div className="absolute inset-0 text-gt-primary">
            {currentBg.pattern}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Premium Depth Effects: Floating Blobs */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0] + mousePos.x,
          y: [0, -40, 20, 0] + mousePos.y,
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-gt-primary/5 rounded-full blur-[100px]"
      />
      
      <motion.div
        animate={{
          x: [0, -40, 30, 0] + mousePos.x * -1,
          y: [0, 30, -50, 0] + mousePos.y * -1,
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[10%] right-[10%] w-[800px] h-[800px] bg-gt-teal/5 rounded-full blur-[120px]"
      />

      {/* 3 smaller floating light particles */}
      <motion.div
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 w-4 h-4 bg-gt-primary rounded-full blur-md"
      />
      <motion.div
        animate={{ y: [30, -30, 30], x: [20, -20, 20], opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-gt-teal rounded-full blur-lg"
      />
      <motion.div
        animate={{ y: [-40, 40, -40], x: [-30, 30, -30], opacity: [0.05, 0.2, 0.05] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-1/2 right-1/3 w-3 h-3 bg-gt-primary rounded-full blur-sm"
      />
    </div>
  );
}
