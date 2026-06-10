import React from "react";
import { motion } from "framer-motion";

type IllustrationId = "forest-horizon" | "ocean-breeze" | "solar-plains" | "wind-valleys" | "urban-canopy";

// Re-mapped names to fit the deep green / atmospheric "vibe" theme while keeping existing IDs
export const TOP_BAR_ILLUSTRATIONS: { id: IllustrationId; name: string }[] = [
  { id: "forest-horizon", name: "Misty Pines" },
  { id: "ocean-breeze", name: "Emerald Glow" },
  { id: "solar-plains", name: "Mossy Glass" },
  { id: "wind-valleys", name: "Topographic Valleys" },
  { id: "urban-canopy", name: "Aurora Canopy" },
];

export function IllustrationBanner({ id, className = "" }: { id: string; className?: string }) {
  switch (id) {
    case "forest-horizon":
      return (
        <div className={`relative overflow-hidden bg-[#0A1A12] flex items-end justify-center ${className}`}>
          {/* Deep atmospheric backdrop */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A12] to-[#143625]" />
          
          {/* Glowing mist (sunlight behind trees) */}
          <div className="absolute top-[20%] left-[30%] w-[40%] h-[100%] rounded-full bg-[#C7EA46] opacity-10 blur-[60px]" />
          <div className="absolute top-[30%] left-[40%] w-[20%] h-[100%] rounded-full bg-[#E5F99B] opacity-10 blur-[40px]" />

          {/* Background blurred trees */}
          <svg className="absolute bottom-0 w-full min-w-[800px] h-[100%] opacity-50 blur-[4px]" preserveAspectRatio="none" viewBox="0 0 1000 100" fill="none">
            <path d="M0,80 Q100,40 200,80 T400,50 T600,70 T800,40 T1000,70 L1000,100 L0,100 Z" fill="#146E45" />
          </svg>

          {/* Midground trees */}
          <svg className="absolute bottom-0 w-full min-w-[800px] h-[80%] opacity-80 blur-[1px]" preserveAspectRatio="none" viewBox="0 0 1000 100" fill="none">
            <path d="M-50,100 L0,70 L50,90 L100,60 L150,90 L200,50 L250,90 L300,70 L350,100 Z" fill="#0D4B2E" />
            <path d="M300,100 L350,60 L400,90 L450,50 L500,90 L550,60 L600,100 Z" fill="#0D4B2E" />
            <path d="M600,100 L650,70 L700,90 L750,50 L800,90 L850,70 L900,100 L950,60 L1050,100 Z" fill="#0D4B2E" />
          </svg>

          {/* Foreground sharp silhouette */}
          <svg className="absolute bottom-[-10px] w-full min-w-[800px] h-[50%]" preserveAspectRatio="none" viewBox="0 0 1000 100" fill="none">
            <path d="M0,80 Q250,60 500,80 T1000,70 L1000,110 L0,110 Z" fill="#050C08" />
          </svg>
        </div>
      );
      
    case "ocean-breeze":
      return (
        <div className={`relative overflow-hidden bg-[#030906] flex items-center justify-center ${className}`}>
          {/* Deep sky gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05110B] to-[#0A2616]" />
          
          {/* Giant glowing emerald moon */}
          <div className="absolute top-[10%] right-[25%] w-32 h-32 rounded-full bg-[#C7EA46] opacity-30 blur-[20px]" />
          <div className="absolute top-[15%] right-[25%] w-24 h-24 rounded-full bg-[#E5F99B] opacity-50 blur-[8px]" />

          {/* Distant Mountains */}
          <svg className="absolute top-[30%] w-full min-w-[800px] h-[40%] opacity-60" preserveAspectRatio="none" viewBox="0 0 1000 100" fill="none">
            <path d="M0,80 L50,50 L120,70 L200,40 L300,80 L350,50 L450,90 L550,40 L650,80 L750,30 L850,70 L950,50 L1050,80 L1050,100 L0,100 Z" fill="#0A2616" />
            <path d="M0,90 L80,60 L180,85 L280,55 L380,95 L480,65 L580,90 L680,50 L780,85 L880,60 L980,90 L1050,70 L1050,100 L0,100 Z" fill="#05110B" />
          </svg>

          {/* Ocean Water Base */}
          <div className="absolute bottom-0 w-full h-[30%] bg-gradient-to-b from-[#0B2114] to-[#05110B]" />

          {/* Water Reflections */}
          <svg className="absolute bottom-0 w-full min-w-[800px] h-[30%] opacity-40 blur-[1px]" preserveAspectRatio="none" viewBox="0 0 1000 100" fill="none">
            <line x1="680" y1="10" x2="820" y2="10" stroke="#C7EA46" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <line x1="700" y1="25" x2="800" y2="25" stroke="#C7EA46" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
            <line x1="720" y1="40" x2="780" y2="40" stroke="#C7EA46" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
            <line x1="730" y1="55" x2="770" y2="55" stroke="#C7EA46" strokeWidth="5" strokeLinecap="round" opacity="0.2" />
            
            {/* Distant ripples */}
            <line x1="200" y1="15" x2="300" y2="15" stroke="#1B8A5A" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="400" y1="30" x2="550" y2="30" stroke="#1B8A5A" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      );

    case "solar-plains":
      return (
        <div className={`relative overflow-hidden bg-[#0A1A12] flex items-center justify-center ${className}`}>
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#05110B] via-[#0F2E1E] to-[#146E45] opacity-80" />
          
          {/* Floating frosted glass shapes */}
          <div className="absolute left-[10%] top-[-20%] w-[30%] h-[150%] rounded-[40px] border border-[#C7EA46]/20 bg-[#1B8A5A]/10 backdrop-blur-md rotate-[15deg] shadow-[0_8px_32px_rgba(0,0,0,0.3)]" />
          <div className="absolute right-[20%] top-[10%] w-[25%] h-[120%] rounded-[30px] border border-[#ffffff]/10 bg-[#C7EA46]/5 backdrop-blur-lg rotate-[-10deg]" />
          
          {/* Light accents */}
          <div className="absolute left-[20%] top-[30%] w-32 h-32 bg-[#C7EA46] rounded-full opacity-10 blur-[40px]" />
          <div className="absolute right-[30%] bottom-[-20%] w-48 h-48 bg-[#146E45] rounded-full opacity-40 blur-[50px]" />
        </div>
      );

    case "wind-valleys":
      return (
        <div className={`relative overflow-hidden bg-[#05110B] flex items-end justify-center ${className}`}>
          {/* Dark glowing sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A2616] to-[#05110B] opacity-50" />
          
          {/* Deep distant hill */}
          <svg className="absolute bottom-0 w-full min-w-[800px] h-[90%]" preserveAspectRatio="none" viewBox="0 0 1000 100" fill="none">
            <path d="M0,50 Q250,20 500,50 T1000,40 L1000,100 L0,100 Z" fill="#0A2616" />
          </svg>

          {/* Valley mist */}
          <div className="absolute bottom-[30%] left-0 w-[100%] h-[20%] bg-[#C7EA46] opacity-10 blur-[30px]" />

          {/* Midground hill */}
          <svg className="absolute bottom-0 w-full min-w-[800px] h-[70%]" preserveAspectRatio="none" viewBox="0 0 1000 100" fill="none">
            <path d="M-100,60 Q300,10 600,60 T1100,40 L1100,100 L-100,100 Z" fill="#0D331D" />
            
            {/* Wind Turbines on midground hill */}
            <g stroke="#C7EA46" strokeWidth="1" strokeLinecap="round" opacity="0.6">
              <line x1="300" y1="35" x2="300" y2="15" />
              <line x1="300" y1="15" x2="293" y2="8" />
              <line x1="300" y1="15" x2="307" y2="8" />
              <line x1="300" y1="15" x2="300" y2="5" />

              <line x1="350" y1="40" x2="350" y2="20" />
              <line x1="350" y1="20" x2="343" y2="13" />
              <line x1="350" y1="20" x2="357" y2="13" />
              <line x1="350" y1="20" x2="350" y2="10" />
            </g>
          </svg>

          {/* More valley mist */}
          <div className="absolute bottom-0 left-[30%] w-[50%] h-[30%] bg-[#1B8A5A] opacity-30 blur-[40px]" />

          {/* Foreground steep hill */}
          <svg className="absolute bottom-[-10px] w-full min-w-[800px] h-[60%]" preserveAspectRatio="none" viewBox="0 0 1000 100" fill="none">
            <path d="M500,110 Q700,20 1050,60 L1050,110 Z" fill="#05110B" />
            <path d="M-50,110 Q100,30 400,90 L400,110 Z" fill="#030906" />
          </svg>
        </div>
      );

    case "urban-canopy":
      return (
        <div className={`relative overflow-hidden bg-[#030906] flex items-center justify-center ${className}`}>
          {/* Deep dark base */}
          <div className="absolute inset-0 bg-[#030906]" />
          
          {/* Dramatic sweeping aurora */}
          <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[140%] rounded-full bg-[#1B8A5A] opacity-30 blur-[70px] transform -rotate-12" />
          <div className="absolute bottom-[-40%] right-[-10%] w-[60%] h-[100%] rounded-full bg-[#C7EA46] opacity-15 blur-[80px] transform rotate-12" />
          
          {/* Glowing mist ribbon */}
          <svg className="absolute inset-0 w-full h-full opacity-40 blur-[8px]" preserveAspectRatio="none" viewBox="0 0 1000 100" fill="none">
            <path d="M-100,80 Q200,20 500,50 T1100,30 L1100,100 L-100,100 Z" fill="#146E45" />
          </svg>
          <svg className="absolute inset-0 w-full h-full opacity-60 blur-[3px]" preserveAspectRatio="none" viewBox="0 0 1000 100" fill="none">
            <path d="M-100,100 Q200,40 500,70 T1100,40 L1100,110 L-100,110 Z" fill="#C7EA46" />
          </svg>

          {/* Lower shadow mask */}
          <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-[#030906] to-transparent" />
        </div>
      );

    default:
      return <div className={`bg-gt-bg ${className}`} />;
  }
}
