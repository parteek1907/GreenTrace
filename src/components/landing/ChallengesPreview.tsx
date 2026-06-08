"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";
import IconRenderer from "@/components/ui/IconRenderer";
import Button from "@/components/ui/Button";

const challenges = [
  {
    title: "No Car Week",
    description: "Use public transport or bike for 7 days.",
    impact: "-45kg CO₂",
    icon: "CarFront",
    color: "bg-[#146E45]",
    progress: 70,
  },
  {
    title: "Vegetarian Challenge",
    description: "Eat plant-based meals for 5 days.",
    impact: "-15kg CO₂",
    icon: "Leaf",
    color: "bg-[#90B816]",
    progress: 40,
  },
  {
    title: "Energy Saver",
    description: "Reduce home electricity usage by 10%.",
    impact: "-20kg CO₂",
    icon: "BatteryCharging",
    color: "bg-[#16A085]",
    progress: 90,
  },
];

export default function ChallengesPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-sm font-bold text-gt-emerald tracking-widest uppercase mb-4 block">
              Gamified Action
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gt-dark tracking-tight leading-tight mb-6">
              Turn intent into <br/>
              <span className="text-gt-primary">lifelong habits.</span>
            </h2>
            <p className="text-lg md:text-xl font-medium text-gt-gray leading-relaxed mb-8 max-w-lg">
              Knowledge isn't enough. GreenTrace provides structured, gamified challenges that translate climate anxiety into measurable real-world action.
            </p>
            <Button variant="primary" size="lg" className="text-base font-bold">
              Explore Challenges
            </Button>
          </motion.div>

          {/* Cards Stack */}
          <motion.div
            className="relative h-[500px] w-full max-w-[500px] mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {challenges.map((challenge, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className={`absolute w-full premium-card p-6 flex flex-col justify-between`}
                style={{
                  top: `${i * 90}px`,
                  zIndex: challenges.length - i,
                  transform: `scale(${1 - i * 0.05})`,
                  transformOrigin: "top center",
                }}
                whileHover={{ y: -10, scale: 1.02, zIndex: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${challenge.color} flex items-center justify-center text-white shadow-sm`}>
                      <IconRenderer name={challenge.icon} size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gt-dark text-lg">{challenge.title}</h3>
                      <p className="text-sm font-medium text-gt-gray">{challenge.description}</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-gt-bg border border-gt-border rounded-full text-sm font-bold text-gt-primary">
                    {challenge.impact}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-gt-gray mb-2">
                    <span>Progress</span>
                    <span>{challenge.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-gt-bg rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${challenge.color}`} 
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${challenge.progress}%` } : { width: 0 }}
                      transition={{ duration: 1.5, delay: 0.5 + i * 0.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
