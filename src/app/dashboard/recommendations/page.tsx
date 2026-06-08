"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockRecommendations } from "@/lib/mock-data";
import { formatCO2 } from "@/lib/utils/formatters";
import Button from "@/components/ui/Button";
import { staggerContainer, fadeInUp } from "@/lib/utils/animations";
import { Leaf } from "lucide-react";
import IconRenderer from "@/components/ui/IconRenderer";

const categoryIcons: Record<string, string> = {
  transport: "Car",
  food: "Utensils",
  energy: "Zap",
  shopping: "ShoppingBag",
  waste: "Recycle",
};

export default function RecommendationsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [completed, setCompleted] = useState<string[]>(
    mockRecommendations.filter((r) => r.isCompleted).map((r) => r.id)
  );
  const [dismissed, setDismissed] = useState<string[]>([]);

  const categories = ["all", "transport", "food", "energy", "shopping"];

  const filtered = mockRecommendations.filter((r) => {
    if (dismissed.includes(r.id)) return false;
    if (filter !== "all" && r.category !== filter) return false;
    return true;
  });

  const handleComplete = (id: string) => {
    setCompleted((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleDismiss = (id: string) => {
    setDismissed((prev) => [...prev, id]);
  };

  const totalImpact = filtered
    .filter((r) => completed.includes(r.id))
    .reduce((sum, r) => sum + r.impactKgCo2, 0);

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 pb-12">
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gt-dark mb-2 tracking-tight">Recommendations</h1>
        <p className="text-gt-gray font-medium">Personalized, high-impact actions to systematically reduce your carbon footprint.</p>
      </motion.div>

      {/* Impact summary */}
      {totalImpact > 0 && (
        <motion.div
          variants={fadeInUp}
          className="premium-card p-8 border-l-4 border-l-gt-success bg-white shadow-sm flex flex-col sm:flex-row sm:items-center gap-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-gt-success/10 flex items-center justify-center text-gt-success shrink-0">
            <Leaf className="w-8 h-8" />
          </div>
          <div>
            <div className="text-sm font-bold text-gt-gray uppercase tracking-widest mb-1">Impact from completed actions</div>
            <div className="text-4xl font-extrabold text-gt-success tracking-tight">-{formatCO2(totalImpact)} <span className="text-lg font-bold">kg CO₂/year</span></div>
          </div>
        </motion.div>
      )}

      {/* Filters */}
      <motion.div variants={fadeInUp} className="flex gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold capitalize transition-all cursor-pointer flex items-center gap-2 ${
              filter === cat
                ? "bg-gt-dark text-white shadow-md"
                : "bg-white text-gt-gray border border-gt-border hover:border-gt-dark hover:text-gt-dark shadow-sm hover:shadow"
            }`}
          >
            {cat !== "all" && <IconRenderer name={categoryIcons[cat]} size={16} strokeWidth={3} className={filter === cat ? "text-white" : "text-gt-gray"} />}
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Recommendations list */}
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((rec) => {
            const isCompleted = completed.includes(rec.id);

            return (
              <motion.div
                key={rec.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className={`premium-card p-8 transition-all ${
                  isCompleted
                    ? "border-l-4 border-l-gt-success bg-gt-success/5 border-t-gt-border border-r-gt-border border-b-gt-border"
                    : "hover:border-gt-primary shadow-sm hover:shadow-md"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-gt-bg border border-gt-border flex items-center justify-center text-gt-dark shrink-0 shadow-sm">
                    <IconRenderer name={categoryIcons[rec.category] || "Globe"} size={28} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                      <h3 className={`text-2xl font-extrabold tracking-tight ${isCompleted ? "text-gt-success line-through" : "text-gt-dark"}`}>
                        {rec.title}
                      </h3>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-xs font-bold px-4 py-1.5 rounded-lg uppercase tracking-wider ${
                          rec.difficulty === "easy" ? "bg-gt-success/10 text-gt-success border border-gt-success/20" :
                          rec.difficulty === "medium" ? "bg-gt-warning/10 text-gt-warning border border-gt-warning/20" :
                          "bg-gt-error/10 text-gt-error border border-gt-error/20"
                        }`}>
                          {rec.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-base font-medium text-gt-gray mb-8 leading-relaxed max-w-4xl">{rec.description}</p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-gt-border">
                      <div className="flex items-center gap-8">
                        <div>
                          <span className="text-xs font-bold text-gt-gray uppercase tracking-widest block mb-1">Est. Savings</span>
                          <span className="text-xl font-extrabold text-gt-primary tracking-tight">
                            -{formatCO2(rec.impactKgCo2)} <span className="text-sm font-bold">kg CO₂/yr</span>
                          </span>
                        </div>
                        <div className="w-px h-10 bg-gt-border hidden sm:block" />
                        <div>
                          <span className="text-xs font-bold text-gt-gray uppercase tracking-widest block mb-1">Impact Score</span>
                          <span className="text-xl font-extrabold text-gt-dark tracking-tight">
                            {rec.impactPct}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 mt-4 sm:mt-0">
                        <Button
                          variant={isCompleted ? "secondary" : "primary"}
                          onClick={() => handleComplete(rec.id)}
                          className="shadow-sm"
                        >
                          {isCompleted ? "Undo Completion" : "Mark as Complete"}
                        </Button>
                        {!isCompleted && (
                          <Button
                            variant="ghost"
                            onClick={() => handleDismiss(rec.id)}
                          >
                            Dismiss Idea
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
