export interface Recommendation {
  id: string;
  userId: string;
  category: string;
  title: string;
  description: string;
  impactKgCo2: number;
  impactPct: number;
  difficulty: "easy" | "medium" | "hard";
  isCompleted: boolean;
  isDismissed: boolean;
  createdAt: string;
}
