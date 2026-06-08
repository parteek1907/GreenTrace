"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "@/components/charts/AnimatedCounter";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";
import IconRenderer from "@/components/ui/IconRenderer";

const stats = [
  {
    value: 12400,
    suffix: "+",
    label: "Users Helped",
    icon: "Users",
    color: "text-[#146E45]",
  },
  {
    value: 2.4,
    suffix: "M",
    decimals: 1,
    label: "kg CO₂ Tracked",
    icon: "Globe",
    color: "text-[#16A085]",
  },
  {
    value: 450,
    suffix: "k",
    label: "kg Carbon Reduced",
    icon: "TrendingDown",
    color: "text-[#90B816]",
  },
  {
    value: 85,
    suffix: "k",
    label: "Challenges Completed",
    icon: "Flag",
    color: "text-[#90B816]",
  },
];

export default function Statistics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="impact" className="relative py-32 px-6 overflow-hidden bg-gt-bg">
      {/* Background visual elements */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] rounded-full bg-gt-primary/5 blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-sm font-bold text-gt-emerald tracking-widest uppercase mb-4 block">
            Collective Impact
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-gt-dark tracking-tight leading-tight">
            Small changes.<br/>
            <span className="text-gt-primary">Global scale.</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="text-center p-8 bg-white premium-card hover:border-gt-primary transition-all duration-500"
            >
              <div className="flex justify-center mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gt-bg border border-gt-border flex items-center justify-center shadow-inner ${stat.color}`}>
                  <IconRenderer name={stat.icon} size={32} strokeWidth={2.5} />
                </div>
              </div>
              <div className="text-5xl md:text-6xl font-extrabold text-gt-dark mb-2 tracking-tight">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                />
              </div>
              <p className="text-gt-gray font-bold uppercase tracking-wider text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
