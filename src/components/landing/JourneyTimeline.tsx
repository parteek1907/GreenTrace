"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";
import IconRenderer from "@/components/ui/IconRenderer";

const steps = [
  {
    title: "Assess",
    description: "Connect your data and answer a few questions to establish your baseline.",
    icon: "Target",
  },
  {
    title: "Understand",
    description: "Explore your Carbon Breakdown to see exactly where your emissions originate.",
    icon: "PieChart",
  },
  {
    title: "Simulate",
    description: "Use the Carbon Twin to test lifestyle changes before committing to them.",
    icon: "Orbit",
  },
  {
    title: "Improve",
    description: "Accept gamified challenges designed to help you build sustainable habits.",
    icon: "Flag",
  },
  {
    title: "Track",
    description: "Monitor your real-world progress against your twin and global averages.",
    icon: "TrendingDown",
  },
];

export default function JourneyTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6 bg-gt-bg overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-sm font-bold text-gt-emerald tracking-widest uppercase mb-4 block">
            The Methodology
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gt-dark tracking-tight">
            Your Journey to Net Zero.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gt-border -translate-y-1/2 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gt-emerald to-gt-mint"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            />
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-6 relative z-10"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeInUp} className="relative flex flex-col items-center text-center">
                {/* Connecting Line (Mobile) */}
                {i !== steps.length - 1 && (
                  <div className="lg:hidden absolute top-12 left-1/2 w-1 h-full bg-gt-border -translate-x-1/2 -z-10" />
                )}

                <div className="w-24 h-24 rounded-full premium-card flex items-center justify-center mb-6 relative group z-10">
                  <div className="absolute inset-0 rounded-full bg-gt-emerald opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <IconRenderer name={step.icon} size={32} className="text-gt-primary" strokeWidth={2} />
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gt-dark text-white flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm">
                    {i + 1}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gt-dark mb-3">{step.title}</h3>
                <p className="text-sm font-medium text-gt-gray leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
