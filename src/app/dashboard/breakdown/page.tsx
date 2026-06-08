"use client";

import { motion } from "framer-motion";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { mockCarbonScore } from "@/lib/mock-data";
import { getBreakdown } from "@/lib/carbon/calculator";
import { formatCO2 } from "@/lib/utils/formatters";
import AnimatedCounter from "@/components/charts/AnimatedCounter";
import { staggerContainer, fadeInUp } from "@/lib/utils/animations";
import IconRenderer from "@/components/ui/IconRenderer";

const breakdown = getBreakdown(mockCarbonScore);

export default function BreakdownPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 pb-12">
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gt-dark mb-2 tracking-tight">Carbon Breakdown</h1>
        <p className="text-gt-gray font-medium">Analyze your emissions across different lifestyle categories.</p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {breakdown.map((cat) => (
          <div
            key={cat.category}
            className="premium-card p-6 text-center flex flex-col items-center justify-center hover:-translate-y-1 transition-transform cursor-default"
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-sm" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
              <IconRenderer name={cat.iconName} size={24} strokeWidth={2.5} />
            </div>
            <div className="text-xs font-bold text-gt-gray uppercase tracking-wider mb-2">{cat.category}</div>
            <div className="text-2xl font-extrabold text-gt-dark tracking-tight">
              <AnimatedCounter value={cat.kgCo2} /> <span className="text-sm font-bold text-gt-gray">kg</span>
            </div>
            <div className="text-xs font-bold mt-3 px-3 py-1 rounded-lg" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
              {Math.round(cat.percentage)}%
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <motion.div variants={fadeInUp} className="premium-card p-8 flex flex-col">
          <h3 className="text-lg font-bold text-gt-dark mb-6">Distribution</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={breakdown}
                  dataKey="kgCo2"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  strokeWidth={3}
                  stroke="#FFFFFF"
                  label={({ name, percent }) => `${name ?? ""} ${Math.round((percent ?? 0) * 100)}%`}
                  labelLine={false}
                  isAnimationActive={true}
                  animationBegin={200}
                  animationDuration={1500}
                  animationEasing="ease-out"
                >
                  {breakdown.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#FFFFFF",
                    border: "1px solid #ECE8DA",
                    borderRadius: "12px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#212121",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
                  }}
                  formatter={(value) => [`${formatCO2(Number(value))} kg`, "CO₂/year"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div variants={fadeInUp} className="premium-card p-8 flex flex-col">
          <h3 className="text-lg font-bold text-gt-dark mb-6">Comparison</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={breakdown} layout="vertical" margin={{ left: 10, right: 20 }}>
                <XAxis type="number" hide />
                <YAxis
                  dataKey="category"
                  type="category"
                  tick={{ fontSize: 13, fill: "#212121", fontWeight: 700 }}
                  tickFormatter={(value) => String(value).charAt(0).toUpperCase() + String(value).slice(1)}
                  axisLine={false}
                  tickLine={false}
                  width={90}
                />
                <Tooltip
                  cursor={{ fill: '#F6F4ED' }}
                  contentStyle={{
                    background: "#FFFFFF",
                    border: "1px solid #ECE8DA",
                    borderRadius: "12px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#212121",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
                  }}
                  formatter={(value) => [`${formatCO2(Number(value))} kg`, "CO₂/year"]}
                />
                <Bar dataKey="kgCo2" radius={[0, 8, 8, 0]} barSize={32} isAnimationActive={true} animationBegin={600} animationDuration={1200} animationEasing="ease-out">
                  {breakdown.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Detailed Breakdown Bars */}
      <motion.div variants={fadeInUp} className="premium-card p-8 lg:p-10">
        <h3 className="text-xl font-bold text-gt-dark mb-8">Detailed Impact Analysis</h3>
        <div className="space-y-8">
          {breakdown.map((cat) => (
            <div key={cat.category} className="group cursor-default">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                    <IconRenderer name={cat.iconName} size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <span className="text-base font-extrabold text-gt-dark capitalize block leading-tight">{cat.category}</span>
                    <span className="text-xs font-bold text-gt-gray uppercase tracking-wider">{Math.round(cat.percentage)}% of total</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-gt-dark tracking-tight block">{formatCO2(cat.kgCo2)} kg</span>
                  <span className="text-xs font-bold text-gt-gray uppercase tracking-wider">per year</span>
                </div>
              </div>
              <div className="w-full h-4 bg-gt-bg rounded-full overflow-hidden border border-gt-border/50">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: cat.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.percentage}%` }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
