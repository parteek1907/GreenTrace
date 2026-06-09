/**
 * Legacy mock data — Challenge progress only
 * 
 * Challenge progress is user-action data (start/complete challenges)
 * that belongs to a future "activity tracking" layer, not the emissions engine.
 * Retained here until challenge tracking is fully implemented.
 */

import type { ChallengeProgress } from "@/types/challenge";
import { CHALLENGES } from "@/lib/utils/constants";

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
