"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";
import IconRenderer from "@/components/ui/IconRenderer";

const trustPillars = [
  {
    title: "Privacy First",
    description: "Your data is end-to-end encrypted. We never sell your lifestyle data to third-party advertisers or brokers.",
    icon: "ShieldCheck",
  },
  {
    title: "Open Methodology",
    description: "Our carbon footprint calculations are completely transparent and based on peer-reviewed environmental science.",
    icon: "BookOpen",
  },
  {
    title: "Data Ownership",
    description: "You own your data. Export your entire history at any time or permanently delete your account with one click.",
    icon: "HardDriveDownload",
  },
  {
    title: "Bank-Grade Security",
    description: "Built on enterprise infrastructure with continuous vulnerability scanning and strict access controls.",
    icon: "Lock",
  },
];

export default function Trust() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 px-6 bg-gt-bg border-y border-gt-border overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gt-dark tracking-tight mb-4">
            Built on transparency.
          </h2>
          <p className="text-lg font-medium text-gt-gray max-w-2xl mx-auto">
            Environmental impact tracking requires deep trust. We operate with radical transparency regarding how your data is used and protected.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {trustPillars.map((pillar, i) => (
            <motion.div key={i} variants={fadeInUp} className="flex flex-col items-start p-6">
              <div className="w-10 h-10 rounded-lg bg-gt-primary/10 flex items-center justify-center text-gt-primary mb-5">
                <IconRenderer name={pillar.icon} size={20} strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-gt-dark mb-2">{pillar.title}</h3>
              <p className="text-sm font-medium text-gt-gray leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
