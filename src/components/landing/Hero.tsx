"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 }
  }
};

const lineVariants: Variants = {
  hidden: { y: 100, opacity: 0, rotateZ: 2 },
  visible: {
    y: 0,
    opacity: 1,
    rotateZ: 0,
    transition: { type: "spring", damping: 25, stiffness: 100, duration: 1.2 }
  }
};

const fadeVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", damping: 25, stiffness: 100, duration: 1.5 }
  }
};

export default function Hero() {
  return (
    <section className="relative min-h-[96vh] flex items-end justify-start pt-24 pb-0 overflow-hidden">
      {/* Animated Image Background */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      />

      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/40 z-0 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gt-dark/30 z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-start justify-end gap-8 w-full pt-24 md:pt-32 pb-0">

          <motion.div
            className="flex-1 text-left w-full max-w-5xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Masked Title Reveal */}
            <div className="overflow-hidden pb-3 -mb-2">
              <motion.h1
                variants={lineVariants}
                className="text-[56px] md:text-[76px] lg:text-[84px] font-[900] text-white leading-[1.05] tracking-tight origin-left"
              >
                Master your
              </motion.h1>
            </div>

            <div className="overflow-hidden pb-3 mb-5">
              <motion.h1
                variants={lineVariants}
                className="text-[56px] md:text-[76px] lg:text-[84px] font-[900] leading-[1.05] tracking-tight origin-left text-transparent bg-clip-text bg-gradient-to-r from-white to-[#146E45]"
              >
                carbon footprint.
              </motion.h1>
            </div>

            <motion.p
              variants={fadeVariants}
              className="text-[18px] md:text-[22px] font-medium text-white/80 w-full max-w-4xl leading-[1.6] -translate-y-5"
            >
              The most advanced personal sustainability platform. Understand your impact, <br className="hidden md:block" /> simulate lifestyle changes, and build habits that matter for the planet.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
