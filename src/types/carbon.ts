/** Carbon assessment data from onboarding */
export interface CarbonAssessment {
  id: string;
  userId: string;
  // Transport
  carKmWeekly: number;
  carType: "petrol" | "diesel" | "hybrid" | "electric";
  publicTransportKmWeekly: number;
  flightsPerYear: number;
  // Diet
  dietType: "vegan" | "vegetarian" | "pescatarian" | "mixed" | "heavy_meat";
  localFoodPct: number;
  // Energy
  electricityKwhMonthly: number;
  renewablePct: number;
  heatingType: "gas" | "electric" | "heat_pump" | "solar";
  // Shopping
  clothingItemsMonthly: number;
  electronicsYearly: number;
  secondhandPct: number;
  // Household
  householdSize: number;
  homeSqm: number;
  recyclingPct: number;
  // Meta
  createdAt: string;
  isActive: boolean;
}

/** Computed carbon score */
export interface CarbonScore {
  id: string;
  userId: string;
  assessmentId: string;
  totalKgCo2Yearly: number;
  transportKg: number;
  foodKg: number;
  energyKg: number;
  shoppingKg: number;
  wasteKg: number;
  score: number; // 0-100
  grade: string; // A+ to F
  percentile: number;
  createdAt: string;
}

/** Carbon breakdown by category */
export interface CarbonBreakdown {
  category: string;
  kgCo2: number;
  percentage: number;
  color: string;
  icon: string;
}

/** Environmental equivalents */
export interface EnvironmentalEquivalent {
  type: "trees" | "km_driven" | "kwh" | "flights";
  value: number;
  label: string;
  icon: string;
}

/** Monthly carbon data point */
export interface MonthlyDataPoint {
  month: string;
  totalKg: number;
  transportKg: number;
  foodKg: number;
  energyKg: number;
  shoppingKg: number;
  wasteKg: number;
}

/** Simulation parameters */
export interface SimulationParams {
  carReductionPct: number;
  publicTransportIncreasePct: number;
  meatReductionPct: number;
  electricityReductionPct: number;
  renewableIncreasePct: number;
  shoppingReductionPct: number;
  recyclingIncreasePct: number;
}

/** Simulation result */
export interface SimulationResult {
  baselineKg: number;
  simulatedKg: number;
  reductionKg: number;
  reductionPct: number;
  equivalents: EnvironmentalEquivalent[];
  breakdownComparison: {
    category: string;
    baselineKg: number;
    simulatedKg: number;
  }[];
}
