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

interface CarbonContextType {
  formData: FormData;
  emissions: CategoryEmissions;
  score: CarbonScore;
  recommendations: Recommendation[];
  monthlyData: MonthlyDataPoint[];
  rank: { name: string; description: string };
  recalculate: (newFormData: FormData) => void;
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
  isLoaded: false,
});

// ─── Provider ─────────────────────────────────────────────────────────

const STORAGE_KEY = "gt_onboarding_data";

export function CarbonProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [result, setResult] = useState<EngineResult>(defaultResult);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persisted onboarding data on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as FormData;
        setFormData(parsed);
        setResult(runEngine(parsed));
      } catch (e) {
        console.error("Failed to parse onboarding data", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Recalculate everything when formData changes
  const recalculate = useCallback((newFormData: FormData) => {
    setFormData(newFormData);
    setResult(runEngine(newFormData));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFormData));
  }, []);

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
