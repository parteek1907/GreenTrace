"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";
import IconRenderer from "@/components/ui/IconRenderer";
import { ArrowRight } from "lucide-react";

const pairings = [
  {
    problem: "People don't understand their actual carbon footprint.",
    solution: "GreenTrace processes your lifestyle data into actionable intelligence.",
    icon: "PieChart",
  },
  {
    problem: "People don't know what changes actually matter.",
    solution: "Carbon Twin instantly visualizes the impact of your choices.",
    icon: "Orbit",
  },
  {
    problem: "People lose motivation when acting alone.",
    solution: "Gamified challenges build sustainable, lifelong habits.",
    icon: "Flag",
  },
];

const TypewriterText = ({ text, delay = 0, className = "", isInView, isCursorActive = false }: { text: string; delay?: number; className?: string, isInView: boolean, isCursorActive?: boolean }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isInView) {
      setDisplayedText("");
      setStarted(false);
      return;
    }
    
    let timeout: NodeJS.Timeout;
    if (delay > 0) {
      timeout = setTimeout(() => setStarted(true), delay * 1000);
    } else {
      setStarted(true);
    }
    return () => clearTimeout(timeout);
  }, [isInView, delay]);

  useEffect(() => {
    if (!started) return;
    
    let i = 0;
    // Add slight randomness to typing speed to feel more human
    const typeNextChar = () => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i < text.length) {
        setTimeout(typeNextChar, Math.random() * 30 + 30); // 30-60ms per char
      }
    };
    
    const initialDelay = setTimeout(typeNextChar, 50);
    return () => clearTimeout(initialDelay);
  }, [started, text]);

  return (
    <span className={className}>
      {displayedText}
      {isCursorActive && (
        <motion.span 
          animate={{ opacity: [1, 0, 1] }} 
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} 
          className="inline-block w-[3px] h-[0.9em] bg-gt-primary ml-1 translate-y-[2px] shadow-[0_0_8px_rgba(199,234,70,0.8)]" 
        />
      )}
    </span>
  );
};

export default function ProblemSolution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // State to manage which cursor is active
  const [firstLineFinished, setFirstLineFinished] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setFirstLineFinished(true);
      }, 2000); // Wait for first line to finish typing + delay
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section className="relative py-32 px-6 bg-white overflow-hidden">
      {/* Background organic shape */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gt-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          className="max-w-3xl mb-24 min-h-[120px]"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gt-dark tracking-tight leading-tight">
            <TypewriterText text="Sustainability is complex." isInView={isInView} delay={0.2} isCursorActive={!firstLineFinished} />
            <br />
            <TypewriterText text="We made it intuitive." className="text-gt-primary drop-shadow-[0_0_15px_rgba(199,234,70,0.3)]" isInView={isInView} delay={2.0} isCursorActive={firstLineFinished} />
          </h2>
        </motion.div>

        <motion.div
          className="space-y-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {pairings.map((pair, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="group flex flex-col md:flex-row items-center gap-6 md:gap-12 p-8 md:p-12 premium-card hover:border-gt-primary hover:shadow-lg transition-all duration-500 cursor-default"
            >
              {/* Problem */}
              <div className="flex-1 flex items-start gap-6 w-full">
                <div className="w-12 h-12 rounded-full bg-gt-bg border border-gt-border flex items-center justify-center shrink-0">
                  <span className="text-gt-gray font-bold">0{i + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gt-gray uppercase tracking-wider mb-2">The Problem</h3>
                  <p className="text-xl md:text-2xl font-bold text-gt-dark leading-snug">
                    {pair.problem}
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className="md:rotate-0 rotate-90 text-gt-border group-hover:text-gt-primary transition-colors duration-500 shrink-0">
                <ArrowRight className="w-8 h-8" strokeWidth={1.5} />
              </div>

              {/* Solution */}
              <div className="flex-1 flex items-start gap-6 w-full">
                <div className="w-12 h-12 rounded-full bg-gt-primary/10 border border-gt-primary/20 flex items-center justify-center text-gt-primary shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <IconRenderer name={pair.icon} size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gt-primary uppercase tracking-wider mb-2">Our Solution</h3>
                  <p className="text-xl md:text-2xl font-bold text-gt-dark leading-snug">
                    {pair.solution}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
