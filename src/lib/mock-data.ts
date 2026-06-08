/**
 * Mock data for GreenTrace development
 * Provides realistic sample data without requiring Supabase
 */

import type { CarbonScore, MonthlyDataPoint } from "@/types/carbon";
import type { Recommendation } from "@/types/recommendation";
import type { ChallengeProgress } from "@/types/challenge";
import { CHALLENGES } from "@/lib/utils/constants";

/** Mock user carbon score */
export const mockCarbonScore: CarbonScore = {
  id: "score-1",
  userId: "user-1",
  assessmentId: "assessment-1",
  totalKgCo2Yearly: 6840,
  transportKg: 2460,
  foodKg: 1820,
  energyKg: 1340,
  shoppingKg: 780,
  wasteKg: 440,
  score: 62,
  grade: "B-",
  percentile: 55,
  createdAt: new Date().toISOString(),
};

/** Mock monthly data (last 12 months) */
export const mockMonthlyData: MonthlyDataPoint[] = [
  { month: "Jul", totalKg: 620, transportKg: 230, foodKg: 155, energyKg: 120, shoppingKg: 75, wasteKg: 40 },
  { month: "Aug", totalKg: 590, transportKg: 210, foodKg: 150, energyKg: 115, shoppingKg: 78, wasteKg: 37 },
  { month: "Sep", totalKg: 610, transportKg: 225, foodKg: 152, energyKg: 118, shoppingKg: 80, wasteKg: 35 },
  { month: "Oct", totalKg: 580, transportKg: 200, foodKg: 155, energyKg: 112, shoppingKg: 76, wasteKg: 37 },
  { month: "Nov", totalKg: 560, transportKg: 195, foodKg: 148, energyKg: 108, shoppingKg: 72, wasteKg: 37 },
  { month: "Dec", totalKg: 600, transportKg: 215, foodKg: 160, energyKg: 120, shoppingKg: 68, wasteKg: 37 },
  { month: "Jan", totalKg: 575, transportKg: 200, foodKg: 150, energyKg: 115, shoppingKg: 73, wasteKg: 37 },
  { month: "Feb", totalKg: 555, transportKg: 190, foodKg: 148, energyKg: 110, shoppingKg: 70, wasteKg: 37 },
  { month: "Mar", totalKg: 570, transportKg: 205, foodKg: 150, energyKg: 105, shoppingKg: 73, wasteKg: 37 },
  { month: "Apr", totalKg: 545, transportKg: 185, foodKg: 145, energyKg: 108, shoppingKg: 70, wasteKg: 37 },
  { month: "May", totalKg: 530, transportKg: 180, foodKg: 142, energyKg: 102, shoppingKg: 70, wasteKg: 36 },
  { month: "Jun", totalKg: 520, transportKg: 175, foodKg: 140, energyKg: 100, shoppingKg: 68, wasteKg: 37 },
];

/** Mock recommendations */
export const mockRecommendations: Recommendation[] = [
  {
    id: "rec-1",
    userId: "user-1",
    category: "transport",
    title: "Switch two weekly trips to public transport",
    description: "Replacing just 2 car trips per week with bus or train could significantly reduce your transport emissions. Start with your commute or regular errands.",
    impactKgCo2: 340,
    impactPct: 5,
    difficulty: "easy",
    isCompleted: false,
    isDismissed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "rec-2",
    userId: "user-1",
    category: "food",
    title: "Try two meat-free days per week",
    description: "Going vegetarian twice a week can reduce your food emissions by up to 15%. Try Meatless Mondays and plant-based Fridays.",
    impactKgCo2: 270,
    impactPct: 4,
    difficulty: "easy",
    isCompleted: false,
    isDismissed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "rec-3",
    userId: "user-1",
    category: "energy",
    title: "Switch to a renewable energy provider",
    description: "Switching to 100% renewable electricity could eliminate most of your energy-related emissions. Many providers offer competitive rates.",
    impactKgCo2: 520,
    impactPct: 7.6,
    difficulty: "medium",
    isCompleted: false,
    isDismissed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "rec-4",
    userId: "user-1",
    category: "shopping",
    title: "Buy 50% of clothing secondhand",
    description: "Thrift shopping, consignment stores, and online resale platforms offer quality items at a fraction of the environmental cost.",
    impactKgCo2: 180,
    impactPct: 2.6,
    difficulty: "easy",
    isCompleted: true,
    isDismissed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "rec-5",
    userId: "user-1",
    category: "transport",
    title: "Consider an electric or hybrid vehicle",
    description: "If you're planning to replace your car, an EV or hybrid could cut your driving emissions by 60-75%.",
    impactKgCo2: 1200,
    impactPct: 17.5,
    difficulty: "hard",
    isCompleted: false,
    isDismissed: false,
    createdAt: new Date().toISOString(),
  },
];

/** Mock challenge progress */
export const mockChallengeProgress: (ChallengeProgress & { challenge: typeof CHALLENGES[number] })[] = [
  {
    id: "cp-1",
    userId: "user-1",
    challengeId: "vegetarian-challenge",
    startedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    progressPct: 43,
    status: "active",
    dailyLogs: [
      { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), note: "Started strong! Had lentil soup." },
      { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), note: "Made veggie tacos for dinner." },
      { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), note: "Tried a new tofu stir-fry recipe." },
    ],
    challenge: CHALLENGES[1],
  },
  {
    id: "cp-2",
    userId: "user-1",
    challengeId: "no-car-week",
    startedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    progressPct: 100,
    status: "completed",
    dailyLogs: [],
    challenge: CHALLENGES[0],
  },
];

/** Mock activity feed */
export const mockActivityFeed = [
  { id: "act-1", type: "challenge_complete", description: "Completed No Car Week challenge!", time: "3 days ago", icon: "Trophy" },
  { id: "act-2", type: "recommendation_complete", description: "Started buying secondhand clothing", time: "5 days ago", icon: "CheckCircle" },
  { id: "act-3", type: "challenge_start", description: "Started Vegetarian Week challenge", time: "3 days ago", icon: "Sprout" },
  { id: "act-4", type: "assessment", description: "Updated carbon assessment", time: "1 week ago", icon: "BarChart3" },
  { id: "act-5", type: "simulation", description: "Simulated switching to public transport", time: "1 week ago", icon: "Orbit" },
];
