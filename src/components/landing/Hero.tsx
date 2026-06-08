"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

/**
 * Hero section — the first impression.
 * Animated Earth (CSS globe), floating particles, gradient lighting, strong headline.
 */
export default function Hero() {
  return (
    <section className="relative min-h-[96vh] flex items-end justify-start pt-24 pb-0 overflow-hidden">
      {/* Image Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
        style={{ backgroundImage: "url('/hero.jpg')" }} 
      />
      {/* Dark overlay to ensure text readability but show leaf texture clearly */}
      <div className="absolute inset-0 bg-black/40 z-0 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gt-dark/30 z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-start justify-end gap-8 w-full pt-24 md:pt-32 pb-8">
          
          {/* Left — Copy (Anchored Lower) */}
          <motion.div 
            className="flex-1 text-left w-full max-w-5xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-[64px] font-[800] text-white leading-[1.1] tracking-tight mb-4"
            >
              Master your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#146E45] relative">
                carbon footprint.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-[18px] font-normal text-white/90 w-full max-w-none leading-[1.7] whitespace-nowrap overflow-hidden text-ellipsis md:whitespace-normal"
            >
              The most advanced personal sustainability platform. <br className="hidden sm:block" /> Understand your impact, simulate lifestyle changes, and build habits that matter for the planet.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
