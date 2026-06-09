"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-white border border-gt-border rounded-2xl px-6 shadow-sm data-[state=open]:shadow-md transition-all duration-300"
              >
                <AccordionTrigger className="text-left hover:no-underline font-bold text-gt-dark text-lg py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg text-gt-gray font-medium leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
