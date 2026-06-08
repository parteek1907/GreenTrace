"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CHALLENGES } from "@/lib/utils/constants";
import { mockChallengeProgress } from "@/lib/mock-data";
import Button from "@/components/ui/Button";
import { staggerContainer, fadeInUp } from "@/lib/utils/animations";
import IconRenderer from "@/components/ui/IconRenderer";
import { Trophy } from "lucide-react";

export default function ChallengesPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [joinedChallenges, setJoinedChallenges] = useState<string[]>(
    mockChallengeProgress.map((cp) => cp.challengeId)
  );

  const categories = ["all", "transport", "food", "energy", "waste"];
  const filtered = activeFilter === "all"
    ? CHALLENGES
    : CHALLENGES.filter((c) => c.category === activeFilter);

  const handleJoin = (id: string) => {
    setJoinedChallenges((prev) => [...prev, id]);
  };

  const earnedBadges = mockChallengeProgress.filter((cp) => cp.status === "completed");

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 pb-12">
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gt-dark mb-2 tracking-tight">Challenges & Rewards</h1>
        <p className="text-gt-gray font-medium">Take on targeted challenges to reduce your footprint and earn achievements.</p>
      </motion.div>

      {/* Earned Badges */}
      <motion.div variants={fadeInUp} className="premium-card p-8 lg:p-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-gt-yellow" />
            <h3 className="text-xl font-bold text-gt-dark">Your Trophy Case</h3>
          </div>
          <span className="text-sm font-bold text-gt-primary bg-gt-primary/10 px-4 py-2 rounded-xl border border-gt-primary/20 shadow-sm">
            {earnedBadges.length} Badges Earned
          </span>
        </div>
        <div className="flex gap-6 flex-wrap">
          {earnedBadges.map((cp) => (
            <motion.div
              key={cp.id}
              className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gt-bg border border-gt-border hover:border-gt-primary transition-colors cursor-default shadow-sm min-w-[140px]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-gt-dark shadow-sm border border-gt-border">
                <IconRenderer name={cp.challenge.badgeIcon} size={32} strokeWidth={2} />
              </div>
              <span className="text-sm font-bold text-gt-dark text-center leading-tight">{cp.challenge.badgeName}</span>
            </motion.div>
          ))}
          {earnedBadges.length === 0 && (
            <div className="w-full text-center py-10 text-sm font-bold text-gt-gray uppercase tracking-wider bg-gt-bg rounded-2xl border border-dashed border-gt-border">
              Complete challenges to start filling your trophy case
            </div>
          )}
        </div>
      </motion.div>

      {/* Filter tabs */}
      <motion.div variants={fadeInUp} className="flex gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold capitalize transition-all cursor-pointer ${
              activeFilter === cat
                ? "bg-gt-dark text-white shadow-md"
                : "bg-white text-gt-gray border border-gt-border hover:border-gt-dark hover:text-gt-dark shadow-sm hover:shadow"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Challenge Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((challenge) => {
            const isJoined = joinedChallenges.includes(challenge.id);
            const progress = mockChallengeProgress.find(
              (cp) => cp.challengeId === challenge.id
            );

            return (
              <motion.div
                key={challenge.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="premium-card p-8 flex flex-col group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gt-bg border border-gt-border flex items-center justify-center text-gt-dark shadow-sm group-hover:border-gt-primary group-hover:text-gt-primary transition-colors">
                    <IconRenderer name={challenge.badgeIcon} size={28} strokeWidth={2} />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider ${
                    challenge.category === "transport" ? "bg-blue-50 text-blue-600 border border-blue-200" :
                    challenge.category === "food" ? "bg-orange-50 text-orange-600 border border-orange-200" :
                    challenge.category === "energy" ? "bg-yellow-50 text-yellow-700 border border-yellow-200" :
                    "bg-gt-success/10 text-gt-success border border-gt-success/20"
                  }`}>
                    {challenge.category}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-gt-dark mb-3 tracking-tight">{challenge.title}</h3>
                <p className="text-sm font-medium text-gt-gray mb-8 flex-1 leading-relaxed">{challenge.description}</p>

                <div className="flex items-center gap-6 text-sm font-bold text-gt-dark mb-8 bg-gt-bg p-4 rounded-xl border border-gt-border shadow-sm">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gt-gray uppercase tracking-wider">Duration</span>
                    <span>{challenge.durationDays} days</span>
                  </div>
                  <div className="w-px h-8 bg-gt-border" />
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gt-gray uppercase tracking-wider">Target</span>
                    <span className="text-gt-primary">-{challenge.targetReductionPct}% CO₂</span>
                  </div>
                </div>

                {progress && progress.status !== "completed" && (
                  <div className="mb-8">
                    <div className="flex justify-between text-xs font-bold text-gt-dark mb-2 uppercase tracking-wider">
                      <span>Progress</span>
                      <span>{progress.progressPct}%</span>
                    </div>
                    <div className="w-full h-3 bg-gt-bg border border-gt-border rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full bg-gt-primary rounded-full transition-all"
                        style={{ width: `${progress.progressPct}%` }}
                      />
                    </div>
                  </div>
                )}

                {progress?.status === "completed" ? (
                  <div className="text-center py-3.5 text-sm font-bold text-gt-success bg-gt-success/10 rounded-xl border border-gt-success/20 shadow-sm">
                    ✓ Challenge Completed
                  </div>
                ) : isJoined ? (
                  <div className="text-center py-3.5 text-sm font-bold text-gt-primary bg-gt-primary/10 rounded-xl border border-gt-primary/20 shadow-sm">
                    🏃 Challenge Active
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    className="w-full shadow-md"
                    onClick={() => handleJoin(challenge.id)}
                  >
                    Join Challenge
                  </Button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
