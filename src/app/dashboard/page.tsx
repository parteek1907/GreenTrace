"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Target, Globe, TrendingDown, Medal, ArrowRight, Activity, Leaf, BatteryCharging, Orbit, Sparkles } from "lucide-react";
import { useCarbon } from "@/lib/contexts/CarbonContext";
import { useProfile } from "@/lib/contexts/ProfileContext";
import { getBreakdown } from "@/lib/carbon/calculator";
import { formatCO2 } from "@/lib/utils/formatters";
import dynamic from "next/dynamic";
import { staggerContainer, fadeInUp } from "@/lib/utils/animations";
import Link from "next/link";
import Button from "@/components/ui/Button";
import IconRenderer from "@/components/ui/IconRenderer";
import { LogActivityModal } from "@/components/dashboard/LogActivityModal";

const AnimatedCounter = dynamic(() => import("@/components/charts/AnimatedCounter"), { ssr: false });
const CarbonSignatureStudio = dynamic(() => import("@/components/dashboard/CarbonSignature/CarbonSignatureStudio").then(mod => mod.CarbonSignatureStudio), { ssr: false });

export default function DashboardPage() {
  const { score: carbonScore, monthlyData, recommendations, rank } = useCarbon();
  const { profile, hasCreatedSignature } = useProfile();
  const [isSignatureStudioOpen, setIsSignatureStudioOpen] = useState(false);
  const [isLogActivityOpen, setIsLogActivityOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleCraftSignatureClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsSignatureStudioOpen(true);
      setTimeout(() => setIsTransitioning(false), 500); // reset after open
    }, 1200); // wait for premium animation to finish
  };
  
  const breakdown = getBreakdown(carbonScore);

  const currentMonth = monthlyData[monthlyData.length - 1];
  const prevMonth = monthlyData[monthlyData.length - 2];
  const monthlyReduction = prevMonth ? prevMonth.totalKg - currentMonth.totalKg : 0;
  const reductionPct = prevMonth && prevMonth.totalKg > 0 ? (monthlyReduction / prevMonth.totalKg) * 100 : 0;

  // Data for the Hero Radial Score
  const scoreData = [
    { name: "Score", value: carbonScore.score, fill: "#146E45" }, // Primary
    { name: "Remaining", value: 100 - carbonScore.score, fill: "#ECE8DA" } // Border
  ];

  // Activity feed derived from live data
  const activityFeed = [
    { id: "act-1", type: "assessment", description: `Carbon assessment calculated: ${carbonScore.grade} grade`, time: "Just now", icon: "BarChart3" },
    { id: "act-2", type: "rank", description: `Sustainability rank: ${rank.name}`, time: "Just now", icon: "Trophy" },
    { id: "act-3", type: "emissions", description: `Annual footprint: ${formatCO2(carbonScore.totalKgCo2Yearly)} CO₂/year`, time: "Just now", icon: "Globe" },
    { id: "act-4", type: "recommendation", description: recommendations[0]?.title || "Complete onboarding for recommendations", time: "Just now", icon: "Lightbulb" },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 pb-12">
      
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gt-dark mb-2 tracking-tight">Environmental Intelligence</h1>
          <p className="text-gt-gray font-medium">Welcome back, <span suppressHydrationWarning>{profile.firstName || "Explorer"}</span>. Here is your sustainability impact overview.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/simulator">
            <Button variant="secondary" className="font-bold">
              <Orbit className="w-4 h-4 mr-1" /> Simulator
            </Button>
          </Link>
          <Button variant="primary" className="font-bold shadow-md" onClick={() => setIsLogActivityOpen(true)}>
            <Activity className="w-4 h-4 mr-1" /> Log Activity
          </Button>
        </div>
      </motion.div>

      {/* Hero Section & Top KPIs */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* HERO: Carbon Score */}
        <motion.div variants={fadeInUp} className="premium-card p-8 xl:col-span-1 flex flex-col items-center justify-center relative overflow-hidden group">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gt-primary/5 rounded-full blur-3xl group-hover:bg-gt-primary/10 transition-colors duration-700 pointer-events-none" />
          
          <AnimatePresence>
            {isTransitioning && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-t from-gt-primary/20 to-transparent mix-blend-overlay z-20 pointer-events-none"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gt-primary/40 blur-[50px] rounded-full animate-pulse"></div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center w-full mb-4 z-10">
            <h2 className="text-sm font-bold text-gt-gray uppercase tracking-widest mb-1">Overall Carbon Score</h2>
          </div>

          <div className="relative w-56 h-56 flex items-center justify-center z-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scoreData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={10}
                  isAnimationActive={true}
                  animationBegin={200}
                  animationDuration={2000}
                  animationEasing="ease-out"
                >
                  {scoreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={isTransitioning && index === 0 ? "#22C55E" : entry.fill} className="transition-colors duration-1000" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Score */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <motion.div 
                className="text-6xl font-extrabold text-gt-dark tracking-tighter"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <AnimatedCounter value={carbonScore.score} />
              </motion.div>
              <div className="text-sm font-bold text-gt-primary px-3 py-1 bg-gt-primary/10 rounded-full mt-2">
                Grade {carbonScore.grade}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-6 border-t border-gt-border z-10">
            <div className="text-center">
              <div className="text-xs font-bold text-gt-gray uppercase tracking-wider mb-1">Percentile</div>
              <div className="text-lg font-bold text-gt-dark">Top {100 - carbonScore.percentile}%</div>
            </div>
            <div className="text-center">
              <div className="text-xs font-bold text-gt-gray uppercase tracking-wider mb-1">Rank</div>
              <div className="text-lg font-bold text-gt-success">{rank.name}</div>
            </div>
          </div>
          
          {/* Carbon Signature CTA */}
          <div className="w-full mt-8 z-10">
            <button
              onClick={handleCraftSignatureClick}
              disabled={isTransitioning}
              className={`relative w-full group overflow-hidden rounded-[20px] p-4 text-left transition-all duration-500
                bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)]
                hover:shadow-[0_12px_40px_rgba(20,110,69,0.12)] hover:border-gt-primary/30 hover:-translate-y-1`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gt-primary/0 via-gt-primary/5 to-gt-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gt-primary/10 to-gt-teal/10 flex items-center justify-center shrink-0 border border-gt-primary/10 group-hover:scale-110 group-hover:bg-gt-primary group-hover:text-white transition-all duration-500 text-gt-primary">
                  {isTransitioning ? (
                    <Sparkles className="w-5 h-5 animate-spin-slow" />
                  ) : (
                    <Orbit className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-extrabold text-gt-dark group-hover:text-gt-primary transition-colors duration-300">
                    {hasCreatedSignature ? "View Carbon Signature" : "Craft Your Carbon Signature"}
                  </h3>
                  <p className="text-xs font-medium text-gt-gray mt-0.5">
                    Turn your sustainability journey into a premium shareable identity.
                  </p>
                </div>
              </div>
            </button>
          </div>
        </motion.div>

        {/* 4 Standard KPI Cards */}
        <motion.div variants={fadeInUp} className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div className="premium-card p-6 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <Globe className="w-24 h-24 text-gt-dark" />
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gt-bg border border-gt-border flex items-center justify-center text-gt-dark mb-4 shadow-sm group-hover:border-gt-primary group-hover:text-gt-primary transition-colors">
                <Globe className="w-6 h-6" />
              </div>
              <div className="text-sm font-bold text-gt-gray uppercase tracking-wider mb-2">Annual Footprint</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-gt-dark tracking-tight">
                <AnimatedCounter value={carbonScore.totalKgCo2Yearly} />
              </div>
              <div className="text-sm font-medium text-gt-gray mt-1">kilograms CO₂/year</div>
            </div>
          </div>

          <div className="premium-card p-6 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <TrendingDown className="w-24 h-24 text-gt-teal" />
            </div>
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-gt-bg border border-gt-border flex items-center justify-center text-gt-teal mb-4 shadow-sm group-hover:border-gt-teal transition-colors">
                <TrendingDown className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-gt-success/10 text-gt-success rounded-lg border border-gt-success/20">
                {reductionPct > 0 ? "On Track" : "Baseline"}
              </span>
            </div>
            <div>
              <div className="text-sm font-bold text-gt-gray uppercase tracking-wider mb-2">Monthly Reduction</div>
              <div className="text-4xl font-extrabold text-gt-dark tracking-tight">
                <AnimatedCounter value={Math.abs(monthlyReduction)} />
              </div>
              <div className="text-sm font-medium text-gt-gray mt-1">kilograms avoided</div>
            </div>
          </div>

          <div className="premium-card p-6 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <Medal className="w-24 h-24 text-gt-yellow" />
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gt-bg border border-gt-border flex items-center justify-center text-gt-yellow mb-4 shadow-sm group-hover:border-gt-yellow transition-colors">
                <Medal className="w-6 h-6" />
              </div>
              <div className="text-sm font-bold text-gt-gray uppercase tracking-wider mb-2">Challenges Won</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-gt-dark tracking-tight">
                <AnimatedCounter value={4} />
              </div>
              <div className="text-sm font-medium text-gt-gray mt-1">Active badges earned</div>
            </div>
          </div>

          <div className="premium-card p-6 flex flex-col justify-between group relative overflow-hidden bg-gt-primary text-white border-none shadow-lg">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <Target className="w-24 h-24 text-white" />
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-4">
                <Target className="w-6 h-6" />
              </div>
              <div className="text-sm font-bold text-gt-bright uppercase tracking-wider mb-2">Target Goal</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold tracking-tight">
                {formatCO2(Math.round(carbonScore.totalKgCo2Yearly * 0.75))} <span className="text-2xl font-bold text-white/80">kg</span>
              </div>
              <div className="text-sm font-medium text-white/80 mt-1">25% reduction target by Dec 2026</div>
            </div>
          </div>

        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Carbon Breakdown (Donut) */}
        <motion.div variants={fadeInUp} className="premium-card p-8 lg:col-span-1 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-gt-dark">Emissions Breakdown</h3>
            <Link href="/dashboard/breakdown" className="p-2 rounded-lg hover:bg-gt-bg border border-transparent hover:border-gt-border transition-all text-gt-gray hover:text-gt-primary">
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center relative min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={breakdown}
                  dataKey="kgCo2"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  strokeWidth={3}
                  stroke="#FFFFFF"
                  isAnimationActive={true}
                  animationBegin={300}
                  animationDuration={1500}
                  animationEasing="ease-out"
                >
                  {breakdown.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #ECE8DA', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [`${formatCO2(Number(value))} kg`, "CO₂"]}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-bold text-gt-gray uppercase tracking-wider mb-1">Total</span>
              <span className="text-2xl font-extrabold text-gt-dark">{formatCO2(carbonScore.totalKgCo2Yearly)}</span>
            </div>
          </div>

          <div className="space-y-4 mt-8">
            {breakdown.slice(0, 4).map((cat) => (
              <div key={cat.category} className="flex items-center justify-between group cursor-default">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: cat.color }} />
                  <div className="text-sm font-bold text-gt-dark capitalize group-hover:text-gt-primary transition-colors">{cat.category}</div>
                </div>
                <div className="text-sm font-bold text-gt-gray">{Math.round(cat.percentage)}%</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Monthly Progress (Bar + Line) */}
        <motion.div variants={fadeInUp} className="premium-card p-8 lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-gt-dark">Emissions Trend</h3>
              <p className="text-sm font-medium text-gt-gray mt-1">Historical tracking vs reduction target</p>
            </div>
            <select className="bg-gt-bg border border-gt-border text-sm font-bold text-gt-dark rounded-xl px-4 py-2 outline-none focus:border-gt-primary focus:ring-2 focus:ring-gt-primary/20 shadow-sm cursor-pointer">
              <option>Last 12 Months</option>
              <option>Year to Date</option>
            </select>
          </div>
          
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ECE8DA" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "#6B7280", fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "#6B7280", fontWeight: 600 }} />
                <RechartsTooltip
                  contentStyle={{ borderRadius: '16px', border: '1px solid #ECE8DA', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '12px 16px' }}
                  cursor={{ fill: '#F6F4ED' }}
                />
                <Bar dataKey="totalKg" name="Actual Emissions" fill="#C7EA46" radius={[6, 6, 0, 0]} maxBarSize={48} isAnimationActive={true} animationBegin={400} animationDuration={1500} animationEasing="ease-out" />
                <Line type="monotone" dataKey="totalKg" name="Trend" stroke="#146E45" strokeWidth={4} dot={{ r: 5, fill: '#146E45', strokeWidth: 3, stroke: '#FFFFFF' }} activeDot={{ r: 8, fill: '#16A085', strokeWidth: 0 }} isAnimationActive={true} animationBegin={800} animationDuration={2000} animationEasing="ease-in-out" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recommendations */}
        <motion.div variants={fadeInUp} className="premium-card p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-gt-dark">Top Recommendations</h3>
            <Link href="/dashboard/recommendations" className="text-sm font-bold text-gt-primary hover:text-gt-teal transition-colors">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recommendations.filter(r => !r.isCompleted).slice(0, 3).map((rec) => (
              <div key={rec.id} className="group flex items-start gap-5 p-5 rounded-2xl border border-gt-border hover:border-gt-primary bg-white hover:bg-gt-bg/50 transition-all shadow-sm hover:shadow-md cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-gt-bg border border-gt-border flex items-center justify-center text-gt-dark shrink-0 group-hover:scale-110 transition-transform">
                  {rec.category === "transport" ? <Target className="w-6 h-6" /> : rec.category === "food" ? <Leaf className="w-6 h-6" /> : <BatteryCharging className="w-6 h-6" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gt-dark text-base mb-1.5">{rec.title}</h4>
                  <p className="text-sm font-medium text-gt-gray line-clamp-1 mb-3">{rec.description}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gt-primary px-3 py-1 bg-gt-primary/10 rounded-lg border border-gt-primary/20">
                      -{formatCO2(rec.impactKgCo2)} kg/yr
                    </span>
                    <span className="text-xs font-bold text-gt-dark px-3 py-1 bg-gt-bg border border-gt-border rounded-lg capitalize">
                      {rec.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div variants={fadeInUp} className="premium-card p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-gt-dark">Recent Activity</h3>
            <button className="text-sm font-bold text-gt-gray hover:text-gt-dark transition-colors">
              Filter
            </button>
          </div>
          <div className="relative border-l-2 border-gt-border ml-6 space-y-8 pb-2">
            {activityFeed.slice(0, 4).map((activity) => (
              <div key={activity.id} className="relative pl-8 group">
                <div className="absolute -left-[21px] top-1 w-10 h-10 rounded-full bg-white border-2 border-gt-border flex items-center justify-center text-gt-dark shadow-sm z-10 group-hover:border-gt-primary group-hover:text-gt-primary transition-colors">
                  <IconRenderer name={activity.icon} size={18} strokeWidth={2.5} />
                </div>
                <div className="bg-gt-bg/50 rounded-2xl p-4 border border-gt-border/50 group-hover:bg-gt-bg group-hover:border-gt-border transition-all">
                  <p className="text-sm font-bold text-gt-dark">{activity.description}</p>
                  <p className="text-xs font-semibold text-gt-gray mt-1.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      <CarbonSignatureStudio 
        isOpen={isSignatureStudioOpen} 
        onClose={() => setIsSignatureStudioOpen(false)} 
      />
      <LogActivityModal
        isOpen={isLogActivityOpen}
        onClose={() => setIsLogActivityOpen(false)}
      />
    </motion.div>
  );
}
