"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  runEngine,
  type CategoryEmissions,
  type EngineResult,
} from "@/lib/carbon/engine";
import type { CarbonScore, MonthlyDataPoint } from "@/types/carbon";
import type { Recommendation } from "@/types/recommendation";

// ─── Types ────────────────────────────────────────────────────────────

type FormData = Record<string, number | string>;

export interface LoggedActivity {
  id: string;
  category: string;
  activityId: string;
  amount: number;
  impactKg: number;
  timestamp: string;
}

interface CarbonContextType {
  formData: FormData;
  emissions: CategoryEmissions;
  score: CarbonScore;
  recommendations: Recommendation[];
  monthlyData: MonthlyDataPoint[];
  rank: { name: string; description: string };
  recalculate: (newFormData: FormData) => void;
  loggedActivities: LoggedActivity[];
  logActivity: (category: string, activityId: string, amount: number, impactKg: number) => void;
  isLoaded: boolean;
}

// ─── Defaults ─────────────────────────────────────────────────────────

const defaultFormData: FormData = {
  firstName: "",
  lastName: "",
  country: "United States",
  dietType: "mixed",
  localFoodPct: 30,
  carType: "petrol",
  carKmWeekly: 100,
  flightsPerYear: 2,
  heatingType: "gas",
  electricityKwhMonthly: 300,
  renewablePct: 20,
  clothingItemsMonthly: 3,
  electronicsYearly: 1,
  secondhandPct: 10,
};

const defaultResult = runEngine(defaultFormData);

const CarbonContext = createContext<CarbonContextType>({
  formData: defaultFormData,
  emissions: defaultResult.emissions,
  score: defaultResult.score,
  recommendations: defaultResult.recommendations,
  monthlyData: defaultResult.monthlyData,
  rank: defaultResult.rank,
  recalculate: () => {},
  loggedActivities: [],
  logActivity: () => {},
  isLoaded: false,
});

// ─── Provider ─────────────────────────────────────────────────────────

const STORAGE_KEY = "gt_onboarding_data";
const ACTIVITIES_STORAGE_KEY = "gt_logged_activities";

export function CarbonProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [loggedActivities, setLoggedActivities] = useState<LoggedActivity[]>([]);
  const [result, setResult] = useState<EngineResult>(defaultResult);
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper to calculate offsets
  const getOffsets = useCallback((activities: LoggedActivity[]) => {
    return activities.reduce((acc, act) => {
      acc[act.category] = (acc[act.category] || 0) + act.impactKg;
      return acc;
    }, {} as Record<string, number>);
  }, []);

  // Load persisted onboarding data and activities on mount
  useEffect(() => {
    let currentFormData = defaultFormData;
    let currentActivities: LoggedActivity[] = [];
    
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        currentFormData = JSON.parse(saved) as FormData;
        setFormData(currentFormData);
      } catch (e) {
        console.error("Failed to parse onboarding data", e);
      }
    }
    
    const savedActivities = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
    if (savedActivities) {
      try {
        currentActivities = JSON.parse(savedActivities) as LoggedActivity[];
        setLoggedActivities(currentActivities);
      } catch (e) {
        console.error("Failed to parse logged activities", e);
      }
    }

    setResult(runEngine(currentFormData, getOffsets(currentActivities)));
    setIsLoaded(true);
  }, [getOffsets]);

  // Recalculate everything when formData changes
  const recalculate = useCallback((newFormData: FormData) => {
    setFormData(newFormData);
    setResult(runEngine(newFormData, getOffsets(loggedActivities)));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFormData));
  }, [loggedActivities, getOffsets]);

  // Log a new activity
  const logActivity = useCallback((category: string, activityId: string, amount: number, impactKg: number) => {
    const newActivity: LoggedActivity = {
      id: `act-${Date.now()}`,
      category,
      activityId,
      amount,
      impactKg,
      timestamp: new Date().toISOString(),
    };
    
    setLoggedActivities(prev => {
      const next = [...prev, newActivity];
      localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(next));
      setResult(runEngine(formData, getOffsets(next)));
      return next;
    });
  }, [formData, getOffsets]);

  return (
    <CarbonContext.Provider
      value={{
        formData,
        emissions: result.emissions,
        score: result.score,
        recommendations: result.recommendations,
        monthlyData: result.monthlyData,
        rank: result.rank,
        recalculate,
        loggedActivities,
        logActivity,
        isLoaded,
      }}
    >
      {children}
    </CarbonContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────

export function useCarbon() {
  return useContext(CarbonContext);
}
