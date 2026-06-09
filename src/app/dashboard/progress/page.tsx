"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useCarbon } from "@/lib/contexts/CarbonContext";
import { formatCO2, categoryColor } from "@/lib/utils/formatters";
import AnimatedCounter from "@/components/charts/AnimatedCounter";
import { staggerContainer, fadeInUp } from "@/lib/utils/animations";
import IconRenderer from "@/components/ui/IconRenderer";

export default function ProgressPage() {
  const { score: carbonScore, monthlyData, rank } = useCarbon();

  const totalCurrent = monthlyData[monthlyData.length - 1]?.totalKg || 0;
  const totalPrevious = monthlyData[0]?.totalKg || 0;
  const improvement = totalPrevious > 0 ? ((totalPrevious - totalCurrent) / totalPrevious) * 100 : 0;

  // Derive category comparison from monthly data
  const firstMonth = monthlyData[0];
  const lastMonth = monthlyData[monthlyData.length - 1];
  const categoryData = firstMonth && lastMonth ? [
    { name: "Transport", current: lastMonth.transportKg, previous: firstMonth.transportKg, color: categoryColor("transport") },
    { name: "Food", current: lastMonth.foodKg, previous: firstMonth.foodKg, color: categoryColor("food") },
    { name: "Energy", current: lastMonth.energyKg, previous: firstMonth.energyKg, color: categoryColor("energy") },
    { name: "Shopping", current: lastMonth.shoppingKg, previous: firstMonth.shoppingKg, color: categoryColor("shopping") },
    { name: "Waste", current: lastMonth.wasteKg, previous: firstMonth.wasteKg, color: categoryColor("waste") },
  ] : [];

  // Activity feed derived from live data
  const activityFeed = [
    { id: "act-1", type: "assessment", description: `Carbon assessment: ${carbonScore.grade} grade (Score: ${carbonScore.score}/100)`, time: "Just now", icon: "BarChart3" },
    { id: "act-2", type: "rank", description: `Sustainability rank: ${rank.name}`, time: "Just now", icon: "Trophy" },
    { id: "act-3", type: "footprint", description: `Annual footprint: ${formatCO2(carbonScore.totalKgCo2Yearly)} CO₂/year`, time: "Just now", icon: "Globe" },
    { id: "act-4", type: "percentile", description: `You are in the top ${100 - carbonScore.percentile}% of users`, time: "Just now", icon: "TrendingUp" },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={fadeInUp} className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Progress Tracking</h1>
        <p className="text-gt-muted">Your sustainability journey over time.</p>
      </motion.div>

      {/* Summary Stats */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="glass rounded-xl p-5 border border-white/5 text-center">
          <div className="text-xs text-gt-muted mb-1">Current Monthly</div>
          <div className="text-2xl font-bold text-gt-text">
            <AnimatedCounter value={totalCurrent} suffix=" kg" />
          </div>
        </div>
        <div className="glass rounded-xl p-5 border border-white/5 text-center">
          <div className="text-xs text-gt-muted mb-1">12-Month Avg</div>
          <div className="text-2xl font-bold text-gt-text">
            <AnimatedCounter value={Math.round(monthlyData.reduce((s, m) => s + m.totalKg, 0) / 12)} suffix=" kg" />
          </div>
        </div>
        <div className="glass rounded-xl p-5 border border-gt-success/20 text-center bg-gt-success/5">
          <div className="text-xs text-gt-muted mb-1">Improvement</div>
          <div className="text-2xl font-bold text-gt-success">
            <AnimatedCounter value={improvement} suffix="%" decimals={1} prefix="↓ " />
          </div>
        </div>
        <div className="glass rounded-xl p-5 border border-white/5 text-center">
          <div className="text-xs text-gt-muted mb-1">Annual Score</div>
          <div className="text-2xl font-bold" style={{ color: "#22C55E" }}>
            {carbonScore.grade}
          </div>
        </div>
      </motion.div>

      {/* Monthly Trend - Stacked */}
      <motion.div variants={fadeInUp} className="glass rounded-2xl p-6 border border-white/5 mb-6">
        <h3 className="text-sm text-gt-muted mb-4">Monthly Emissions Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="gTransport" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={categoryColor("transport")} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={categoryColor("transport")} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gFood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={categoryColor("food")} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={categoryColor("food")} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gEnergy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={categoryColor("energy")} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={categoryColor("energy")} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(248,250,252,0.1)",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "#F8FAFC",
                }}
              />
              <Area type="monotone" dataKey="transportKg" stackId="1" stroke={categoryColor("transport")} fill="url(#gTransport)" name="Transport" />
              <Area type="monotone" dataKey="foodKg" stackId="1" stroke={categoryColor("food")} fill="url(#gFood)" name="Food" />
              <Area type="monotone" dataKey="energyKg" stackId="1" stroke={categoryColor("energy")} fill="url(#gEnergy)" name="Energy" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Comparison */}
        <motion.div variants={fadeInUp} className="glass rounded-2xl p-6 border border-white/5">
          <h3 className="text-sm text-gt-muted mb-4">Category Comparison (This Month vs First Month)</h3>
          <div className="space-y-4">
            {categoryData.map((cat) => {
              const maxVal = Math.max(cat.previous, cat.current, 1);
              return (
                <div key={cat.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gt-text">{cat.name}</span>
                    <span className="text-gt-success text-xs">
                      ↓ {cat.previous > 0 ? Math.round(((cat.previous - cat.current) / cat.previous) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full opacity-40"
                        style={{ backgroundColor: cat.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(cat.previous / maxVal) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-1 items-center mt-1">
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: cat.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(cat.current / maxVal) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div variants={fadeInUp} className="glass rounded-2xl p-6 border border-white/5">
          <h3 className="text-sm text-gt-muted mb-4">Activity Timeline</h3>
          <div className="space-y-6">
            {activityFeed.map((activity, i) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="relative flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-lg border border-white/5">
                    <IconRenderer name={activity.icon} size={18} strokeWidth={2} />
                  </div>
                  {i < activityFeed.length - 1 && (
                    <div className="w-px h-8 bg-white/5 mt-2" />
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <p className="text-sm text-gt-text">{activity.description}</p>
                  <p className="text-xs text-gt-dim mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
