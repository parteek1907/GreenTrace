"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import GlowOrb from "@/components/effects/GlowOrb";
import GridBackground from "@/components/effects/GridBackground";

const steps = [
  {
    id: "transport",
    title: "How do you get around?",
    subtitle: "Tell us about your weekly transportation habits.",
    icon: "🚗",
    fields: [
      { key: "carKmWeekly", label: "Car km per week", type: "range", min: 0, max: 500, step: 10, defaultValue: 100, unit: "km" },
      { key: "carType", label: "Car type", type: "select", options: ["petrol", "diesel", "hybrid", "electric", "none"], defaultValue: "petrol" },
      { key: "publicTransportKmWeekly", label: "Public transport km per week", type: "range", min: 0, max: 300, step: 5, defaultValue: 20, unit: "km" },
      { key: "flightsPerYear", label: "Flights per year", type: "range", min: 0, max: 20, step: 1, defaultValue: 2, unit: "flights" },
    ],
  },
  {
    id: "diet",
    title: "What's on your plate?",
    subtitle: "Your diet is a big part of your carbon footprint.",
    icon: "🍽️",
    fields: [
      { key: "dietType", label: "Diet type", type: "select", options: ["vegan", "vegetarian", "pescatarian", "mixed", "heavy_meat"], defaultValue: "mixed" },
      { key: "localFoodPct", label: "Locally sourced food", type: "range", min: 0, max: 100, step: 5, defaultValue: 30, unit: "%" },
    ],
  },
  {
    id: "energy",
    title: "Powering your home",
    subtitle: "How you heat and power your space matters.",
    icon: "⚡",
    fields: [
      { key: "electricityKwhMonthly", label: "Monthly electricity usage", type: "range", min: 0, max: 1000, step: 10, defaultValue: 300, unit: "kWh" },
      { key: "renewablePct", label: "Renewable energy", type: "range", min: 0, max: 100, step: 5, defaultValue: 10, unit: "%" },
      { key: "heatingType", label: "Heating type", type: "select", options: ["gas", "electric", "heat_pump", "solar"], defaultValue: "gas" },
    ],
  },
  {
    id: "shopping",
    title: "Your shopping habits",
    subtitle: "Fast fashion and electronics have a hidden cost.",
    icon: "🛍️",
    fields: [
      { key: "clothingItemsMonthly", label: "New clothing items per month", type: "range", min: 0, max: 20, step: 1, defaultValue: 3, unit: "items" },
      { key: "electronicsYearly", label: "Electronics purchased per year", type: "range", min: 0, max: 10, step: 1, defaultValue: 2, unit: "items" },
      { key: "secondhandPct", label: "Secondhand purchases", type: "range", min: 0, max: 100, step: 5, defaultValue: 10, unit: "%" },
    ],
  },
  {
    id: "household",
    title: "Your household",
    subtitle: "Final details about your living situation.",
    icon: "🏠",
    fields: [
      { key: "householdSize", label: "People in household", type: "range", min: 1, max: 8, step: 1, defaultValue: 2, unit: "people" },
      { key: "homeSqm", label: "Home size", type: "range", min: 20, max: 300, step: 5, defaultValue: 80, unit: "m²" },
      { key: "recyclingPct", label: "Waste you recycle", type: "range", min: 0, max: 100, step: 5, defaultValue: 40, unit: "%" },
    ],
  },
];

type FormData = Record<string, number | string>;

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(() => {
    const initial: FormData = {};
    steps.forEach((step) => {
      step.fields.forEach((field) => {
        initial[field.key] = field.defaultValue;
      });
    });
    return initial;
  });
  const [completed, setCompleted] = useState(false);
  const [direction, setDirection] = useState(1);

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (isLast) {
      setCompleted(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2500);
    } else {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentStep((s) => Math.max(0, s - 1));
  };

  const updateField = (key: string, value: number | string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Completion celebration
  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <GridBackground />
        <GlowOrb color="rgba(34, 197, 94, 0.2)" size={600} x="50%" y="50%" />
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="text-8xl mb-6"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            🌱
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">You&apos;re all set!</h1>
          <p className="text-gt-muted text-lg mb-2">Calculating your carbon footprint...</p>
          <motion.div
            className="w-48 h-1 bg-white/10 rounded-full mx-auto mt-6 overflow-hidden"
          >
            <motion.div
              className="h-full bg-gt-emerald rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 py-12">
      <GridBackground />
      <GlowOrb color="rgba(34, 197, 94, 0.08)" size={400} x="20%" y="30%" />
      <GlowOrb color="rgba(11, 61, 46, 0.12)" size={350} x="80%" y="70%" delay={2} />

      <div className="relative z-10 w-full max-w-lg">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <Link href="/" className="text-sm text-gt-muted hover:text-gt-text transition-colors">
              ← Back to home
            </Link>
            <span className="text-sm text-gt-muted">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gt-emerald to-gt-mint rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          {/* Step dots */}
          <div className="flex justify-between mt-3">
            {steps.map((s, i) => (
              <div
                key={s.id}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                  i <= currentStep
                    ? "bg-gt-emerald/20 text-gt-emerald"
                    : "bg-white/5 text-gt-dim"
                } ${i === currentStep ? "ring-2 ring-gt-emerald/30" : ""}`}
              >
                {i < currentStep ? "✓" : s.icon}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="glass rounded-2xl p-8 border border-white/5 min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-center mb-8">
                <div className="text-4xl mb-3">{step.icon}</div>
                <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
                <p className="text-gt-muted text-sm">{step.subtitle}</p>
              </div>

              <div className="space-y-6">
                {step.fields.map((field) => (
                  <div key={field.key}>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm text-gt-muted">{field.label}</label>
                      {field.type === "range" && (
                        <span className="text-sm font-medium text-gt-emerald">
                          {formData[field.key]} {field.unit}
                        </span>
                      )}
                    </div>
                    {field.type === "range" && (
                      <input
                        type="range"
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        value={formData[field.key] as number}
                        onChange={(e) => updateField(field.key, Number(e.target.value))}
                        className="w-full h-2 rounded-full appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #22C55E ${((Number(formData[field.key]) - (field.min || 0)) / ((field.max || 100) - (field.min || 0))) * 100}%, rgba(248, 250, 252, 0.1) ${((Number(formData[field.key]) - (field.min || 0)) / ((field.max || 100) - (field.min || 0))) * 100}%)`,
                        }}
                        aria-label={field.label}
                      />
                    )}
                    {field.type === "select" && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {field.options?.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => updateField(field.key, opt)}
                            className={`px-3 py-2 rounded-lg text-sm capitalize transition-all cursor-pointer ${
                              formData[field.key] === opt
                                ? "bg-gt-emerald/20 border-gt-emerald/40 text-gt-emerald border"
                                : "bg-white/5 border border-white/10 text-gt-muted hover:bg-white/10"
                            }`}
                          >
                            {opt.replace(/_/g, " ")}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6 gap-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className={currentStep === 0 ? "invisible" : ""}
          >
            ← Back
          </Button>
          <Button variant="primary" onClick={handleNext} magnetic>
            {isLast ? "Calculate My Footprint" : "Continue →"}
          </Button>
        </div>
      </div>
    </div>
  );
}
