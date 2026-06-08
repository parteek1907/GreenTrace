"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Designer",
    avatar: "SC",
    bg: "bg-[#146E45]",
    quote: "GreenTrace changed how I think about my daily choices. The Carbon Twin simulator was an eye-opener — I had no idea switching to public transport twice a week could make such a difference.",
  },
  {
    name: "Marcus Rivera",
    role: "Software Engineer",
    avatar: "MR",
    bg: "bg-[#16A085]",
    quote: "As a data nerd, I love how GreenTrace visualizes everything. The charts are gorgeous and the gamified challenges actually kept me engaged beyond the first week.",
  },
  {
    name: "Anja Patel",
    role: "Sustainability Consultant",
    avatar: "AP",
    bg: "bg-[#90B816]",
    quote: "I recommend GreenTrace to all my clients. It's the only tool I've seen that makes carbon tracking feel premium and approachable instead of guilt-inducing.",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6 bg-white border-y border-gt-border">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-sm font-bold text-gt-emerald tracking-widest uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gt-dark tracking-tight">
            Loved by <span className="text-gt-primary">change-makers.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
              className="premium-card p-8 flex flex-col justify-between"
            >
              <div>
                <svg
                  className="w-8 h-8 text-gt-emerald/20 mb-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                </svg>
                <p className="text-lg text-gt-gray font-medium leading-relaxed mb-8">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full ${testimonial.bg} flex items-center justify-center text-white font-bold text-sm`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-extrabold text-gt-dark">
                    {testimonial.name}
                  </div>
                  <div className="text-sm font-bold text-gt-primary">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
