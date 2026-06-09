"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface PremiumSliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (val: number) => void;
  unit?: string;
  icon?: React.ElementType;
}

export default function PremiumSlider({ min, max, step = 1, value, onChange, unit = "", icon: Icon }: PremiumSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const percent = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  const handleDrag = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const newPercent = x / rect.width;
    let newValue = min + newPercent * (max - min);
    
    if (step) {
      newValue = Math.round(newValue / step) * step;
    }
    
    onChange(Math.max(min, Math.min(max, newValue)));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleDrag(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      handleDrag(e.clientX);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div className="relative w-full py-6 group" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} style={{ touchAction: 'none' }}>
      
      {/* Floating Value Bubble */}
      <motion.div 
        className="absolute top-0 -translate-x-1/2 -translate-y-full bg-white px-3 py-1.5 rounded-xl shadow-[0_4px_20px_rgba(20,110,69,0.15)] border border-gt-primary/20 text-gt-dark font-black text-xs whitespace-nowrap z-20 pointer-events-none"
        animate={{ 
          left: `${percent}%`,
          opacity: isDragging ? 1 : 0,
          y: isDragging ? -8 : 0,
          scale: isDragging ? 1 : 0.9
        }}
        initial={false}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {value} {unit}
        {/* Tiny triangle */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-gt-primary/20 rotate-45 rounded-sm"></div>
      </motion.div>

      {/* Track */}
      <div ref={trackRef} className="relative w-full h-3 bg-gt-bg rounded-full overflow-hidden shadow-inner cursor-pointer">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-gt-primary/80 to-gt-teal"
          style={{ width: `${percent}%` }}
          layout
        />
      </div>

      {/* Thumb Orb */}
      <motion.div 
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-gt-border flex items-center justify-center cursor-grab active:cursor-grabbing z-10 hover:shadow-[0_8px_24px_rgba(20,110,69,0.2)]"
        style={{ left: `${percent}%` }}
        animate={{ scale: isDragging ? 1.15 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="w-6 h-6 rounded-full bg-gt-primary/5 flex items-center justify-center">
          {Icon ? <Icon className="w-3.5 h-3.5 text-gt-primary" /> : <div className="w-2 h-2 rounded-full bg-gt-primary" />}
        </div>
      </motion.div>
    </div>
  );
}
