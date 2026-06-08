"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from "recharts";
import { Car, Bus, Drumstick, Zap, Sun, ShoppingBag, Recycle } from "lucide-react";
import { mockCarbonScore } from "@/lib/mock-data";
import { getEquivalents } from "@/lib/carbon/calculator";
import { formatCO2 } from "@/lib/utils/formatters";
import AnimatedCounter from "@/components/charts/AnimatedCounter";
import { staggerContainer, fadeInUp } from "@/lib/utils/animations";
import IconRenderer from "@/components/ui/IconRenderer";

interface SliderConfig {
  key: string;
  label: string;
  iconName: string;
  category: string;
  maxSavingsKg: number;
}

const sliders: SliderConfig[] = [
  { key: "car", label: "Reduce personal driving", iconName: "Car", category: "transport", maxSavingsKg: 1200 },
  { key: "publicTransport", label: "Increase public transit", iconName: "Bus", category: "transport", maxSavingsKg: 400 },
  { key: "meat", label: "Reduce meat consumption", iconName: "Utensils", category: "food", maxSavingsKg: 800 },
  { key: "electricity", label: "Optimize home energy", iconName: "Zap", category: "energy", maxSavingsKg: 600 },
  { key: "renewable", label: "Adopt solar power", iconName: "Sun", category: "energy", maxSavingsKg: 500 },
  { key: "shopping", label: "Buy secondhand goods", iconName: "ShoppingBag", category: "shopping", maxSavingsKg: 400 },
  { key: "recycling", label: "Maximize recycling", iconName: "Recycle", category: "waste", maxSavingsKg: 200 },
];

export default function SimulatorPage() {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(sliders.map((s) => [s.key, 0]))
  );

  const baseline = mockCarbonScore.totalKgCo2Yearly;

  const totalSavings = useMemo(() => {
    return sliders.reduce((sum, s) => sum + (values[s.key] / 100) * s.maxSavingsKg, 0);
  }, [values]);

  const simulated = baseline - totalSavings;
  const reductionPct = (totalSavings / baseline) * 100;
  const equivalents = getEquivalents(totalSavings);

  const comparisonData = [
    { name: "Current", value: baseline, fill: "#ECE8DA" }, // Baseline gray
    { name: "Simulated", value: Math.max(0, simulated), fill: "#146E45" }, // Primary green
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 pb-12">
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gt-dark mb-2 tracking-tight">Carbon Twin Simulator</h1>
        <p className="text-gt-gray font-medium">Model lifestyle changes and instantly visualize the environmental impact.</p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Sliders — Left Side */}
        <motion.div variants={fadeInUp} className="xl:col-span-3 premium-card p-8 lg:p-10">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gt-border">
            <h3 className="text-xl font-bold text-gt-dark">Scenario Parameters</h3>
            <button 
              onClick={() => setValues(Object.fromEntries(sliders.map((s) => [s.key, 0])))}
              className="text-sm font-bold text-gt-gray hover:text-gt-primary transition-colors px-4 py-2 bg-gt-bg rounded-lg border border-gt-border hover:border-gt-primary/30"
            >
              Reset Scenarios
            </button>
          </div>
          
          <div className="space-y-10">
            {sliders.map((s) => (
              <div key={s.key} className="group">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gt-bg border border-gt-border flex items-center justify-center text-gt-dark shadow-sm group-hover:border-gt-primary group-hover:text-gt-primary transition-colors">
                      <IconRenderer name={s.iconName} size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                      <span className="text-base font-bold text-gt-dark block leading-tight">{s.label}</span>
                      <span className="text-xs font-semibold text-gt-gray uppercase tracking-wider">{s.category}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-gt-primary block">
                      {values[s.key]}%
                    </span>
                  </div>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={values[s.key]}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, [s.key]: Number(e.target.value) }))
                  }
                  className="w-full h-3 bg-gt-bg border border-gt-border rounded-full appearance-none cursor-pointer focus:outline-none transition-all"
                  style={{
                    background: `linear-gradient(to right, #146E45 ${values[s.key]}%, transparent ${values[s.key]}%)`,
                  }}
                  aria-label={s.label}
                />
                
                <style>{`
                  input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 28px; height: 28px;
                    border-radius: 50%;
                    background: #FFFFFF;
                    border: 3px solid #146E45;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
                    cursor: pointer;
                    margin-top: -1.5px;
                    transition: transform 0.1s;
                  }
                  input[type="range"]::-webkit-slider-thumb:hover {
                    transform: scale(1.1);
                  }
                  input[type="range"]::-moz-range-thumb {
                    width: 28px; height: 28px;
                    border-radius: 50%;
                    background: #FFFFFF;
                    border: 3px solid #146E45;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
                    cursor: pointer;
                    transition: transform 0.1s;
                  }
                  input[type="range"]::-moz-range-thumb:hover {
                    transform: scale(1.1);
                  }
                `}</style>
                
                <div className="flex justify-between text-xs font-semibold mt-3">
                  <span className="text-gt-gray">0%</span>
                  <span className="text-gt-primary bg-gt-primary/5 px-2 py-0.5 rounded border border-gt-primary/10">
                    Saves up to {formatCO2((values[s.key] / 100) * s.maxSavingsKg)} kg CO₂
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Results — Right Side */}
        <div className="xl:col-span-2 space-y-6">
          
          <motion.div variants={fadeInUp} className="premium-card p-8 lg:p-10 sticky top-6">
            <h3 className="text-xl font-bold text-gt-dark mb-8">Projection Results</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-2xl bg-gt-bg border border-gt-border">
                <div className="text-xs font-bold text-gt-gray uppercase tracking-wider mb-2">Current Baseline</div>
                <div className="text-3xl font-extrabold text-gt-dark tracking-tight">{formatCO2(baseline)}</div>
                <div className="text-xs font-semibold text-gt-gray mt-1">kg CO₂/year</div>
              </div>
              <div className="p-5 rounded-2xl bg-gt-primary/5 border border-gt-primary/20 shadow-inner">
                <div className="text-xs font-bold text-gt-primary uppercase tracking-wider mb-2">Simulated</div>
                <motion.div
                  className="text-3xl font-extrabold text-gt-primary tracking-tight"
                  key={Math.round(simulated)}
                  initial={{ scale: 1.1, color: '#C7EA46' }}
                  animate={{ scale: 1, color: '#146E45' }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {formatCO2(Math.max(0, simulated))}
                </motion.div>
                <div className="text-xs font-semibold text-gt-primary mt-1">kg CO₂/year</div>
              </div>
            </div>

            {totalSavings > 0 && (
              <motion.div
                className="p-6 rounded-2xl bg-[#146E45] text-white shadow-xl mb-8 flex flex-col items-center justify-center relative overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Decorative background elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#C7EA46]/20 rounded-full blur-xl" />
                
                <div className="text-xs font-bold text-[#C7EA46] uppercase tracking-widest mb-2 relative z-10">Potential Reduction</div>
                <div className="text-5xl font-extrabold relative z-10 tracking-tighter">
                  <AnimatedCounter value={reductionPct} suffix="%" decimals={1} prefix="↓ " />
                </div>
              </motion.div>
            )}

            {/* Comparison bar chart */}
            <div className="h-[140px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} layout="vertical" margin={{ left: 10, right: 40, top: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fontSize: 13, fill: "#212121", fontWeight: 700 }}
                    axisLine={false}
                    tickLine={false}
                    width={90}
                  />
                  <RechartsTooltip
                    cursor={{ fill: '#F6F4ED' }}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #ECE8DA', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24} label={{ position: 'right', fill: '#212121', fontSize: 12, fontWeight: 600, formatter: (val: any) => formatCO2(Number(val)) }} isAnimationActive={true} animationBegin={300} animationDuration={1000} animationEasing="ease-out">
                    {comparisonData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Equivalents */}
            {totalSavings > 0 && (
              <motion.div variants={fadeInUp} className="mt-8 pt-8 border-t border-gt-border">
                <h4 className="text-sm font-bold text-gt-gray uppercase tracking-wider mb-4 text-center">Equivalent To</h4>
                <div className="grid grid-cols-2 gap-4">
                  {equivalents.map((eq) => (
                    <div key={eq.type} className="p-4 rounded-2xl bg-gt-bg border border-gt-border flex flex-col items-center justify-center text-center">
                      <div className="text-2xl font-extrabold text-gt-dark mb-1">
                        <AnimatedCounter value={eq.value} />
                      </div>
                      <div className="text-xs font-bold text-gt-gray leading-tight uppercase tracking-wide">{eq.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
