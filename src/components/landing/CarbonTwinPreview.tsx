"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import IconRenderer from "@/components/ui/IconRenderer";
import { fadeInUp } from "@/lib/utils/animations";

/**
 * Interactive Carbon Twin preview section — a mini-demo on the landing page
 * showing how the simulator works with a single slider.
 */
export default function CarbonTwinPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // States for interactive sliders
  const [carReduction, setCarReduction] = useState(25);
  const [meatReduction, setMeatReduction] = useState(10);
  const [energyReduction, setEnergyReduction] = useState(15);

  const baselineKg = 8400;
  
  // Calculate impacts
  const carSavings = (carReduction / 100) * 2400; // Assuming 2400kg from cars
  const meatSavings = (meatReduction / 100) * 1800; // Assuming 1800kg from meat
  const energySavings = (energyReduction / 100) * 3200; // Assuming 3200kg from energy
  
  const totalSavings = carSavings + meatSavings + energySavings;
  const currentTotal = baselineKg - totalSavings;
  const pctReduction = (totalSavings / baselineKg) * 100;

  return (
    <section id="carbon-twin" className="relative py-32 px-6 bg-white overflow-hidden border-t border-gt-border">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-sm font-bold text-gt-emerald tracking-widest uppercase mb-4 block">
            The Carbon Twin
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gt-dark tracking-tight leading-tight mb-6">
            Simulate your <span className="text-gt-primary">future impact.</span>
          </h2>
          <p className="text-lg md:text-xl font-medium text-gt-gray leading-relaxed max-w-2xl mx-auto">
            Test how small lifestyle adjustments cascade into massive environmental impact using our interactive simulator.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left: Interactive Controls */}
          <motion.div 
            className="flex-1 w-full space-y-8"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="premium-card p-8 space-y-10">
              
              {/* Slider 1 */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#146E45]/10 flex items-center justify-center text-[#146E45]">
                      <IconRenderer name="CarFront" size={16} strokeWidth={2.5} />
                    </div>
                    <span className="font-bold text-gt-dark">Reduce Car Usage</span>
                  </div>
                  <span className="font-extrabold text-[#146E45]">{carReduction}%</span>
                </div>
                <input
                  type="range"
                  min="0" max="100" value={carReduction}
                  onChange={(e) => setCarReduction(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none bg-gt-bg cursor-pointer"
                  style={{ background: `linear-gradient(to right, #146E45 ${carReduction}%, #F6F4ED ${carReduction}%)` }}
                />
              </div>

              {/* Slider 2 */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#90B816]/10 flex items-center justify-center text-[#90B816]">
                      <IconRenderer name="Utensils" size={16} strokeWidth={2.5} />
                    </div>
                    <span className="font-bold text-gt-dark">Plant-based Meals</span>
                  </div>
                  <span className="font-extrabold text-[#90B816]">{meatReduction}%</span>
                </div>
                <input
                  type="range"
                  min="0" max="100" value={meatReduction}
                  onChange={(e) => setMeatReduction(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none bg-gt-bg cursor-pointer"
                  style={{ background: `linear-gradient(to right, #90B816 ${meatReduction}%, #F6F4ED ${meatReduction}%)` }}
                />
              </div>

              {/* Slider 3 */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#16A085]/10 flex items-center justify-center text-[#16A085]">
                      <IconRenderer name="Zap" size={16} strokeWidth={2.5} />
                    </div>
                    <span className="font-bold text-gt-dark">Energy Efficiency</span>
                  </div>
                  <span className="font-extrabold text-[#16A085]">{energyReduction}%</span>
                </div>
                <input
                  type="range"
                  min="0" max="100" value={energyReduction}
                  onChange={(e) => setEnergyReduction(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none bg-gt-bg cursor-pointer"
                  style={{ background: `linear-gradient(to right, #16A085 ${energyReduction}%, #F6F4ED ${energyReduction}%)` }}
                />
              </div>
              
            </div>
            
            <style>{`
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 24px; height: 24px;
                border-radius: 50%;
                background: #FFFFFF;
                border: 2px solid currentColor;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                cursor: grab;
              }
              input[type="range"]:active::-webkit-slider-thumb { cursor: grabbing; }
            `}</style>
          </motion.div>

          {/* Right: Dynamic Results */}
          <motion.div 
            className="flex-1 w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="premium-card p-8 h-full flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-white to-gt-bg/50">
              {/* Background decorative circles */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-gt-emerald/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gt-mint/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 mb-12">
                <h3 className="text-sm font-bold text-gt-gray uppercase tracking-widest mb-2">Projected Annual Footprint</h3>
                <div className="flex items-baseline gap-2">
                  <motion.span 
                    key={currentTotal}
                    initial={{ scale: 1.1, color: "#146E45" }}
                    animate={{ scale: 1, color: "#212121" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-6xl font-extrabold text-gt-dark tracking-tight"
                  >
                    {Math.round(currentTotal).toLocaleString()}
                  </motion.span>
                  <span className="text-2xl font-bold text-gt-gray">kg CO₂</span>
                </div>
                
                <div className="mt-6 flex items-center gap-3">
                  <div className="px-3 py-1 bg-gt-error/10 text-gt-error rounded-full text-sm font-bold border border-gt-error/20 line-through">
                    {baselineKg.toLocaleString()} kg Baseline
                  </div>
                  <div className="px-3 py-1 bg-gt-primary/10 text-gt-primary rounded-full text-sm font-bold flex items-center gap-1 border border-gt-primary/20">
                    <IconRenderer name="TrendingDown" size={14} strokeWidth={3} />
                    {pctReduction.toFixed(1)}% Reduction
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="p-6 bg-white border border-gt-border rounded-2xl shadow-sm">
                  <div className="text-sm font-bold text-gt-gray mb-1">Total Savings</div>
                  <motion.div 
                    key={totalSavings}
                    initial={{ scale: 1.1 }} animate={{ scale: 1 }}
                    className="text-3xl font-extrabold text-gt-emerald"
                  >
                    {Math.round(totalSavings).toLocaleString()}<span className="text-lg">kg</span>
                  </motion.div>
                </div>
                <div className="p-6 bg-white border border-gt-border rounded-2xl shadow-sm">
                  <div className="text-sm font-bold text-gt-gray mb-1">Tree Equivalent</div>
                  <motion.div 
                    key={totalSavings}
                    initial={{ scale: 1.1 }} animate={{ scale: 1 }}
                    className="text-3xl font-extrabold text-[#16A085] flex items-center gap-2"
                  >
                    {Math.round(totalSavings / 22)} 
                    <IconRenderer name="TreePine" size={24} strokeWidth={2.5} />
                  </motion.div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
