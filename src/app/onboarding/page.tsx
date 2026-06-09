"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Car, Utensils, Zap, ShoppingBag, Home, Leaf, ChevronRight, ChevronLeft, 
  Check, Plane, Bus, Battery, BatteryCharging, Flame, Bike, 
  Globe, Sun, Wind, Recycle, Droplet, Trees, Smartphone, Monitor, Shirt,
  ChevronDown, Search
} from "lucide-react";
import PremiumSlider from "@/components/ui/PremiumSlider";
import PremiumOnboardingBackground from "@/components/effects/PremiumOnboardingBackground";
import CarbonTwinCreation from "@/components/effects/CarbonTwinCreation";
import { useRef, useEffect } from "react";

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Japan",
  "India", "Brazil", "South Africa", "Italy", "Spain", "Mexico", "Netherlands", "Sweden",
  "Switzerland", "New Zealand", "Singapore", "Norway", "Denmark", "Finland", "Ireland",
  "Argentina", "Chile", "Colombia", "South Korea", "United Arab Emirates", "Saudi Arabia",
  "Turkey", "Egypt", "Nigeria", "Kenya", "Thailand", "Vietnam", "Malaysia", "Indonesia",
  "Philippines", "Poland", "Austria", "Belgium", "Portugal", "Greece", "Czech Republic",
  "Hungary", "Romania", "Ukraine", "Israel", "Morocco", "Peru", "Venezuela"
].sort();

const steps = [
  {
    id: "profile",
    title: "Who's building this?",
    subtitle: "Let's personalize your environmental identity.",
    impactHint: "Knowing your location helps us calculate grid emissions accurately.",
    icon: Globe,
    bgIcon: Globe,
    fields: [
      { key: "firstName", label: "First Name", type: "text", defaultValue: "" },
      { key: "lastName", label: "Last Name", type: "text", defaultValue: "" },
      { key: "country", label: "Country", type: "text", defaultValue: "United States" },
    ],
  },
  {
    id: "diet",
    title: "What's on your plate?",
    subtitle: "Food choices shape nearly 25% of your personal carbon footprint.",
    impactHint: "Small dietary shifts today create massive, measurable environmental impact tomorrow.",
    icon: Utensils,
    bgIcon: Leaf,
    fields: [
      { 
        key: "dietType", 
        label: "Diet type", 
        type: "select", 
        options: [
          { value: "vegan", label: "Vegan", icon: Leaf, micro: "Lowest carbon impact" },
          { value: "vegetarian", label: "Vegetarian", icon: Trees, micro: "High carbon savings" },
          { value: "pescatarian", label: "Pescatarian", icon: Droplet, micro: "Moderate emissions" },
          { value: "mixed", label: "Mixed Diet", icon: Utensils, micro: "Average emissions" },
          { value: "heavy_meat", label: "Heavy Meat", icon: Flame, micro: "Highest dietary emissions" }
        ], 
        defaultValue: "mixed",
        feedback: {
          "vegan": "Exceptional choice. Your dietary emissions are incredibly low.",
          "vegetarian": "Great choice. Plant-based diets save thousands of liters of water.",
          "pescatarian": "Good balance. Consider local, sustainable seafood for maximum impact.",
          "mixed": "A standard footprint. Swapping one meat meal a week makes a difference.",
          "heavy_meat": "Higher expected emissions. Consider exploring plant-based alternatives."
        }
      },
      { key: "localFoodPct", label: "Locally Sourced Food", type: "range", min: 0, max: 100, step: 5, defaultValue: 30, unit: "%", icon: Home },
    ],
  },
  {
    id: "transport",
    title: "How do you get around?",
    subtitle: "Transportation accounts for 29% of global greenhouse gas emissions.",
    impactHint: "EVs and active transport dramatically reduce your Carbon Twin's size.",
    icon: Car,
    bgIcon: Car,
    fields: [
      { 
        key: "carType", 
        label: "Primary Vehicle", 
        type: "select", 
        options: [
          { value: "petrol", label: "Gasoline", icon: Flame, micro: "Highest emissions/km" },
          { value: "hybrid", label: "Hybrid", icon: Battery, micro: "Lower city emissions" },
          { value: "electric", label: "Electric (EV)", icon: Zap, micro: "Zero tailpipe emissions" },
          { value: "none", label: "Car-Free", icon: Bike, micro: "Maximum carbon savings" }
        ], 
        defaultValue: "petrol",
        feedback: {
          "petrol": "Standard internal combustion engines are the leading cause of transport emissions.",
          "hybrid": "A great transitional choice, significantly lowering urban pollution.",
          "electric": "Fantastic. Charging on a renewable grid makes your transport emissions near zero.",
          "none": "Incredible. Walking, cycling, or public transit are the best choices for the planet."
        }
      },
      { key: "carKmWeekly", label: "Driving Distance", type: "range", min: 0, max: 1000, step: 10, defaultValue: 100, unit: "km/wk", icon: Car },
      { key: "flightsPerYear", label: "Air Travel", type: "range", min: 0, max: 30, step: 1, defaultValue: 2, unit: "flights/yr", icon: Plane },
    ],
  },
  {
    id: "energy",
    title: "Powering your space",
    subtitle: "How you heat, cool, and power your home matters deeply.",
    impactHint: "Switching to a renewable energy provider is the fastest way to drop your footprint.",
    icon: Zap,
    bgIcon: Sun,
    fields: [
      { 
        key: "heatingType", 
        label: "Home Heating", 
        type: "select", 
        options: [
          { value: "gas", label: "Natural Gas", icon: Flame, micro: "Fossil fuel dependent" },
          { value: "electric", label: "Electric Grid", icon: Zap, micro: "Depends on grid mix" },
          { value: "heat_pump", label: "Heat Pump", icon: Wind, micro: "Ultra high efficiency" },
          { value: "solar", label: "Solar/Geothermal", icon: Sun, micro: "Clean and renewable" }
        ], 
        defaultValue: "gas",
        feedback: {
          "gas": "Common, but fossil-fuel reliant. Heat pumps are the future of home heating.",
          "electric": "Efficiency depends entirely on how clean your local grid is.",
          "heat_pump": "Excellent! Heat pumps are 3-4x more efficient than traditional heating.",
          "solar": "Perfect. Zero-emission heating sets a gold standard for sustainability."
        }
      },
      { key: "electricityKwhMonthly", label: "Electricity Usage", type: "range", min: 0, max: 2000, step: 10, defaultValue: 300, unit: "kWh/mo", icon: Zap },
      { key: "renewablePct", label: "Renewable Energy Mix", type: "range", min: 0, max: 100, step: 5, defaultValue: 20, unit: "%", icon: Sun },
    ],
  },
  {
    id: "lifestyle",
    title: "Your lifestyle footprint",
    subtitle: "Fast fashion and electronics carry heavy embedded carbon costs.",
    impactHint: "Buying secondhand or extending product lifespans halts the cycle of overproduction.",
    icon: ShoppingBag,
    bgIcon: ShoppingBag,
    fields: [
      { key: "clothingItemsMonthly", label: "New Clothing Purchases", type: "range", min: 0, max: 20, step: 1, defaultValue: 3, unit: "items/mo", icon: Shirt },
      { key: "electronicsYearly", label: "New Tech Devices", type: "range", min: 0, max: 10, step: 1, defaultValue: 1, unit: "items/yr", icon: Smartphone },
      { key: "secondhandPct", label: "Secondhand Shopping", type: "range", min: 0, max: 100, step: 5, defaultValue: 10, unit: "%", icon: Recycle },
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
  
  // Country dropdown state
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = COUNTRIES.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  const handleNext = () => {
    if (isLast) {
      setCompleted(true);
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

  const activeFeedback = (step.fields.find(f => f.type === "select") as any)?.feedback?.[formData[step.fields.find(f => f.type === "select")?.key || ""] as string];

  if (completed) {
    return <CarbonTwinCreation />;
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0, scale: 0.98 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, scale: 0.98 }),
  };

  const BgIcon = step.bgIcon;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-12 md:py-20 font-sans">
      {/* Dynamic Ambient Background */}
      <PremiumOnboardingBackground stepId={step.id} />

      <div className="relative z-10 w-full max-w-[800px] flex flex-col gap-8">
        
        {/* Journey Tracker */}
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center gap-4 mb-8">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                    i < currentStep ? "bg-gt-primary text-white shadow-md scale-95" :
                    i === currentStep ? "bg-white border-2 border-gt-primary text-gt-primary shadow-[0_0_20px_rgba(20,110,69,0.2)] scale-110" :
                    "bg-white border border-gt-border text-gt-gray"
                  }`}>
                    {i < currentStep ? <Check className="w-5 h-5" /> : <s.icon className="w-4 h-4" strokeWidth={2.5} />}
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 md:w-16 h-1 mx-2 rounded-full transition-all duration-1000 ${
                    i < currentStep ? "bg-gt-primary" : "bg-gt-border"
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-xs font-black tracking-[0.2em] text-gt-primary uppercase mb-1">
              Milestone 0{currentStep + 1}
            </p>
            <h1 className="text-lg font-bold text-gt-dark uppercase tracking-widest">{step.id} PROFILE</h1>
          </div>
        </div>

        {/* Floating Panel Card */}
        <div className="bg-white/80 backdrop-blur-3xl rounded-[40px] p-8 md:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.08),0_0_40px_rgba(20,110,69,0.05)] border border-white min-h-[500px] relative group">
          
          {/* Subtle Background Graphic Layer (Overflow Hidden) */}
          <div className="absolute inset-0 overflow-hidden rounded-[40px] pointer-events-none">
            <div className="absolute -right-20 -bottom-20 opacity-[0.03] text-gt-primary transition-transform duration-1000 group-hover:scale-105 group-hover:rotate-3">
              <BgIcon className="w-[400px] h-[400px]" strokeWidth={1} />
            </div>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full flex flex-col relative z-10"
            >
              {/* Step Header */}
              <div className="text-center max-w-xl mx-auto mb-12">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white to-gt-bg rounded-3xl border border-white shadow-[0_8px_30px_rgba(20,110,69,0.08)] flex items-center justify-center mb-6">
                  <step.icon className="w-10 h-10 text-gt-primary" strokeWidth={1.5} />
                </div>
                <h2 className="text-4xl font-black text-gt-dark tracking-tight mb-4">{step.title}</h2>
                <p className="text-gt-gray font-medium text-lg leading-relaxed">{step.subtitle}</p>
                <div className="mt-4 inline-flex items-center gap-2 bg-gt-primary/5 px-4 py-2 rounded-full border border-gt-primary/10">
                  <Leaf className="w-4 h-4 text-gt-primary" />
                  <p className="text-sm font-bold text-gt-primary">{step.impactHint}</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-12 flex-1 max-w-2xl mx-auto w-full">
                {step.fields.map((field) => (
                  <div key={field.key} className="space-y-4">
                    <label className="text-sm font-black text-gt-dark uppercase tracking-widest">{field.label}</label>
                    
                    {field.type === "text" && field.key === "country" ? (
                      <div className="relative" ref={dropdownRef}>
                        <button 
                          type="button"
                          onClick={() => setIsCountryOpen(!isCountryOpen)}
                          className="w-full flex items-center justify-between px-6 py-4 bg-white border border-gt-border rounded-2xl text-gt-dark font-medium focus:ring-2 focus:ring-gt-primary focus:border-gt-primary transition-all shadow-sm"
                        >
                          <span className="flex items-center gap-3">
                            <Globe className="w-5 h-5 text-gt-primary" />
                            {formData.country || "Select Country"}
                          </span>
                          <ChevronDown className={`w-5 h-5 text-gt-gray transition-transform duration-300 ${isCountryOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                          {isCountryOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.98 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gt-border overflow-hidden z-50"
                            >
                              <div className="p-3 border-b border-gt-border bg-gt-bg/50">
                                <div className="relative">
                                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gt-gray" />
                                  <input 
                                    type="text" 
                                    placeholder="Search countries..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-gt-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gt-primary/50"
                                  />
                                </div>
                              </div>
                              <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                {filteredCountries.length > 0 ? (
                                  filteredCountries.map(country => (
                                    <button
                                      key={country}
                                      type="button"
                                      onClick={() => {
                                        updateField("country", country);
                                        setIsCountryOpen(false);
                                        setSearchQuery("");
                                      }}
                                      className={`w-full text-left px-5 py-3 text-sm transition-colors flex items-center justify-between group hover:bg-gt-primary/5 ${formData.country === country ? 'text-gt-primary font-bold bg-gt-primary/5' : 'text-gt-dark font-medium'}`}
                                    >
                                      {country}
                                      {formData.country === country && <Check className="w-4 h-4 text-gt-primary" />}
                                    </button>
                                  ))
                                ) : (
                                  <div className="px-5 py-8 text-center text-sm text-gt-gray font-medium">
                                    No countries found.
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : field.type === "text" ? (
                      <input 
                        type="text" 
                        value={formData[field.key] as string}
                        onChange={(e) => updateField(field.key, e.target.value)}
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                        className="w-full bg-white border border-gt-border rounded-2xl px-6 py-4 font-medium text-gt-dark shadow-sm focus:outline-none focus:ring-2 focus:ring-gt-primary/50 focus:border-gt-primary transition-all"
                      />
                    ) : null}

                    {field.type === "range" && (
                      <PremiumSlider 
                        min={(field as any).min} 
                        max={(field as any).max} 
                        step={(field as any).step} 
                        value={formData[field.key] as number} 
                        onChange={(val) => updateField(field.key, val)}
                        unit={(field as any).unit}
                        icon={(field as any).icon}
                      />
                    )}

                    {field.type === "select" && (
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {field.options?.map((opt) => {
                          const isSelected = formData[field.key] === opt.value;
                          const OptIcon = opt.icon;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => updateField(field.key, opt.value)}
                              className={`relative p-5 rounded-3xl text-left transition-all duration-500 ease-out flex flex-col gap-3 group/btn overflow-hidden ${
                                isSelected
                                  ? "bg-gt-primary text-white shadow-[0_12px_30px_rgba(20,110,69,0.3)] scale-[1.02] border-transparent"
                                  : "bg-white/80 border border-gt-border text-gt-gray hover:text-gt-dark hover:shadow-lg hover:border-gt-primary/30"
                              }`}
                            >
                              {isSelected && (
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                              )}
                              <div className="flex justify-between items-start relative z-10 w-full">
                                <OptIcon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gt-primary'}`} strokeWidth={2} />
                                {isSelected && (
                                  <motion.div 
                                    initial={{ scale: 0 }} 
                                    animate={{ scale: 1 }} 
                                    className="w-5 h-5 bg-white rounded-full flex items-center justify-center"
                                  >
                                    <Check className="w-3 h-3 text-gt-primary" strokeWidth={3} />
                                  </motion.div>
                                )}
                              </div>
                              <div className="relative z-10">
                                <div className={`font-black text-sm mb-1 ${isSelected ? 'text-white' : 'text-gt-dark'}`}>{opt.label}</div>
                                <div className={`text-[11px] leading-tight font-medium ${isSelected ? 'text-white/80' : 'text-gt-gray group-hover/btn:text-gt-gray/80'}`}>
                                  {opt.micro}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Live Impact Feedback Card */}
              <AnimatePresence mode="popLayout">
                {activeFeedback && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="mt-12 bg-gradient-to-r from-gt-primary/10 to-transparent border-l-4 border-gt-primary rounded-r-2xl p-6 flex items-start gap-4 max-w-2xl mx-auto w-full"
                  >
                    <div className="w-8 h-8 rounded-full bg-gt-primary flex items-center justify-center shrink-0 shadow-md">
                      <Zap className="w-4 h-4 text-white" fill="currentColor" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-gt-dark tracking-widest uppercase mb-1">Impact Insight</h4>
                      <p className="text-gt-dark font-medium leading-relaxed">{activeFeedback}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Actions */}
        <div className="flex justify-between items-center w-full max-w-2xl mx-auto mt-4 px-4">
          <button
            onClick={handleBack}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
              currentStep === 0 
                ? "opacity-0 pointer-events-none" 
                : "text-gt-gray hover:text-gt-dark hover:bg-white hover:shadow-md active:scale-95"
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Go Back
          </button>
          
          <button 
            onClick={handleNext}
            className="flex items-center gap-3 px-10 py-4 bg-gt-dark text-white rounded-full font-bold shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_16px_30px_rgba(0,0,0,0.25)] hover:scale-105 hover:bg-black transition-all duration-300 active:scale-95 group"
          >
            {isLast ? "Calculate Carbon Twin" : "Continue Journey"} 
            {!isLast && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>
      </div>
    </div>
  );
}
