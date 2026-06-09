"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IconRenderer from "./IconRenderer";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-white/80 backdrop-blur-md border border-gt-border shadow-lg hover:shadow-xl hover:border-gt-primary/30 text-gt-dark hover:text-gt-primary transition-all duration-300 group"
          aria-label="Back to top"
        >
          <div className="relative z-10 transform group-hover:-translate-y-0.5 transition-transform duration-300">
            <IconRenderer name="ArrowUp" size={20} strokeWidth={2.5} />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
