export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  durationDays: number;
  targetReductionPct: number;
  badgeName: string;
  badgeIcon: string;
}

export interface ChallengeProgress {
  id: string;
  userId: string;
  challengeId: string;
  startedAt: string;
  completedAt?: string;
  progressPct: number;
  status: "active" | "completed" | "abandoned";
  dailyLogs: { date: string; note: string }[];
}
