"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How does GreenTrace calculate my carbon footprint?",
    answer:
      "We use research-based emission factors from peer-reviewed studies and global databases (IPCC, EPA, DEFRA). Your inputs across transport, diet, energy, shopping, and waste are converted to kg CO₂ equivalent using these standardized factors. Our engine is transparent — you can see exactly how each number is calculated.",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "Absolutely. Your data is stored securely with Supabase's enterprise-grade infrastructure. We never sell your data, and you can export or delete everything at any time. We're GDPR compliant and use row-level security to ensure only you can access your information.",
  },
  {
    question: "What is the Carbon Twin simulator?",
    answer:
      "Carbon Twin is our flagship feature that lets you create a virtual copy of your lifestyle and experiment with changes. Slide a control to reduce car usage, switch to a different diet, or add solar panels — and watch your total emissions, environmental equivalents, and score update in real-time. It's the fastest way to find which changes matter most for your specific situation.",
  },
  {
    question: "How accurate are the calculations?",
    answer:
      "Our calculations are based on average emission factors, so they provide a strong estimate rather than an exact measurement. Factors like your specific electricity grid, vehicle efficiency, and local food systems can affect precision. We continuously refine our models and plan to add location-specific adjustments in future updates.",
  },
  {
    question: "Is GreenTrace really free?",
    answer:
      "Yes. The core platform — carbon tracking, simulator, challenges, and recommendations — is completely free. We believe sustainability tools should be accessible to everyone. We may introduce optional premium features in the future, but the core experience will always remain free.",
  },
  {
    question: "Can I use GreenTrace for my organization?",
    answer:
      "Currently GreenTrace is designed for individual use. We're exploring team and organization features including aggregate dashboards, team challenges, and carbon offsetting integrations. Join our waitlist if you're interested in the organizational version.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-32 px-6 bg-gt-bg">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-sm font-bold text-gt-emerald tracking-widest uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gt-dark tracking-tight mb-6">
            Got <span className="text-gt-primary">questions?</span>
          </h2>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-gt-border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer"
                aria-expanded={openIndex === i}
              >
                <span className="font-bold text-gt-dark text-lg pr-4">
                  {faq.question}
                </span>
                <motion.div
                  className="w-8 h-8 rounded-full bg-gt-bg flex items-center justify-center flex-shrink-0 text-gt-primary"
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 pb-6 text-base md:text-lg text-gt-gray font-medium leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
