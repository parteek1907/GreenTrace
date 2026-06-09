/**
 * GreenTrace Emissions Engine
 * 
 * Pure functions that take onboarding formData and produce:
 * - Per-category emissions (kg CO₂/year)
 * - Overall carbon score (0-100)
 * - Grade (A+ to F)
 * - Sustainability rank
 * - Context-aware recommendations
 * - Monthly projections
 * - Simulation results
 * 
 * All emission factors are loaded from emission-factors.json
 * so they can be tuned without touching this code.
 */

import emissionFactors from "./emission-factors.json";
import { GRADE_THRESHOLDS } from "@/lib/utils/constants";
import type { CarbonScore, MonthlyDataPoint, SimulationResult } from "@/types/carbon";
import type { Recommendation } from "@/types/recommendation";

// ─── Types ────────────────────────────────────────────────────────────

export interface CategoryEmissions {
  transport: number;
  food: number;
  energy: number;
  shopping: number;
  waste: number;
  total: number;
}

export interface EngineResult {
  emissions: CategoryEmissions;
  score: CarbonScore;
  recommendations: Recommendation[];
  monthlyData: MonthlyDataPoint[];
  rank: { name: string; description: string };
}

type FormData = Record<string, number | string>;

// ─── Emission Calculators ─────────────────────────────────────────────

function calculateTransport(formData: FormData): number {
  const ef = emissionFactors.transport;
  const carType = (formData.carType as string) || "petrol";
  const carKmWeekly = (formData.carKmWeekly as number) || 0;
  const flightsPerYear = (formData.flightsPerYear as number) || 0;

  const carEmissions =
    carKmWeekly *
    (ef.carEmissionsKgPerKm[carType as keyof typeof ef.carEmissionsKgPerKm] ?? 0.21) *
    ef.weeksPerYear;

  const flightEmissions = flightsPerYear * ef.flightEmissionsKgPerFlight;

  return Math.round(carEmissions + flightEmissions);
}

function calculateFood(formData: FormData): number {
  const ef = emissionFactors.food;
  const dietType = (formData.dietType as string) || "mixed";
  const localFoodPct = (formData.localFoodPct as number) || 0;

  const baseEmissions =
    ef.dietAnnualKg[dietType as keyof typeof ef.dietAnnualKg] ?? 2100;

  // Local food reduces transport emissions of food
  const localReduction = (localFoodPct / 100) * ef.localFoodReductionMax;

  return Math.round(baseEmissions * (1 - localReduction));
}

function calculateEnergy(formData: FormData): number {
  const ef = emissionFactors.energy;
  const heatingType = (formData.heatingType as string) || "gas";
  const electricityKwh = (formData.electricityKwhMonthly as number) || 300;
  const renewablePct = (formData.renewablePct as number) || 0;

  const heatingEmissions =
    ef.heatingAnnualKg[heatingType as keyof typeof ef.heatingAnnualKg] ?? 2200;

  const electricityEmissions =
    electricityKwh * ef.monthsPerYear * ef.electricityKgPerKwh;

  // Renewable energy offsets grid electricity
  const renewableReduction =
    (renewablePct / 100) * ef.renewableReductionMax;

  const totalElectricity = electricityEmissions * (1 - renewableReduction);

  return Math.round(heatingEmissions + totalElectricity);
}

function calculateShopping(formData: FormData): number {
  const ef = emissionFactors.shopping;
  const clothingItems = (formData.clothingItemsMonthly as number) || 0;
  const electronics = (formData.electronicsYearly as number) || 0;
  const secondhandPct = (formData.secondhandPct as number) || 0;

  const clothingEmissions =
    clothingItems * ef.monthsPerYear * ef.clothingKgPerItem;
  const electronicsEmissions = electronics * ef.electronicsKgPerDevice;

  const secondhandReduction =
    (secondhandPct / 100) * ef.secondhandReductionMax;

  return Math.round(
    (clothingEmissions + electronicsEmissions) * (1 - secondhandReduction)
  );
}

function calculateWaste(): number {
  // Waste is a baseline — future versions will take recycling % as input
  return emissionFactors.waste.baseAnnualKg;
}

// ─── Core Engine ──────────────────────────────────────────────────────

export function calculateEmissions(formData: FormData): CategoryEmissions {
  const transport = calculateTransport(formData);
  const food = calculateFood(formData);
  const energy = calculateEnergy(formData);
  const shopping = calculateShopping(formData);
  const waste = calculateWaste();

  return {
    transport,
    food,
    energy,
    shopping,
    waste,
    total: transport + food + energy + shopping + waste,
  };
}

export function calculateScore(totalKg: number): {
  score: number;
  grade: string;
  percentile: number;
} {
  const { globalAverageKg, maxScore, scalingFactor } = emissionFactors.scoring;

  // Score: 100 at 0 emissions, 50 at global average, 0 at 2x global average
  const raw = maxScore - (totalKg / globalAverageKg) * scalingFactor;
  const score = Math.max(0, Math.min(maxScore, Math.round(raw)));

  // Grade from thresholds
  const gradeEntry = GRADE_THRESHOLDS.find((g) => totalKg <= g.maxKg);
  const grade = gradeEntry?.grade ?? "F";

  // Percentile: approximate based on score
  const percentile = Math.min(99, Math.max(1, Math.round(score * 0.95)));

  return { score, grade, percentile };
}

export function getSustainabilityRank(
  score: number
): { name: string; description: string } {
  const ranks = emissionFactors.ranks;
  const rank = ranks.find((r) => score >= r.minScore);
  return rank || ranks[ranks.length - 1];
}

// ─── Recommendations Generator ────────────────────────────────────────

export function generateRecommendations(
  formData: FormData,
  emissions: CategoryEmissions
): Recommendation[] {
  const recs: Recommendation[] = [];
  let id = 1;

  const total = emissions.total;

  // Transport recommendations
  if (formData.carType === "petrol" || formData.carType === "hybrid") {
    recs.push({
      id: `rec-${id++}`,
      userId: "user-1",
      category: "transport",
      title: "Consider switching to an electric vehicle",
      description:
        "Replacing your current vehicle with an EV could cut your driving emissions by 60-75%. With growing charging infrastructure, EVs are increasingly practical for daily use.",
      impactKgCo2: Math.round(emissions.transport * 0.6),
      impactPct: Math.round((emissions.transport * 0.6 / total) * 100),
      difficulty: "hard",
      isCompleted: false,
      isDismissed: false,
      createdAt: new Date().toISOString(),
    });
  }

  if ((formData.carKmWeekly as number) > 50) {
    recs.push({
      id: `rec-${id++}`,
      userId: "user-1",
      category: "transport",
      title: "Switch two weekly trips to public transport",
      description:
        "Replacing just 2 car trips per week with bus or train could significantly reduce your transport emissions. Start with your commute or regular errands.",
      impactKgCo2: Math.round(emissions.transport * 0.25),
      impactPct: Math.round((emissions.transport * 0.25 / total) * 100),
      difficulty: "easy",
      isCompleted: false,
      isDismissed: false,
      createdAt: new Date().toISOString(),
    });
  }

  if ((formData.flightsPerYear as number) > 2) {
    recs.push({
      id: `rec-${id++}`,
      userId: "user-1",
      category: "transport",
      title: "Reduce air travel by half",
      description:
        "A single round-trip transatlantic flight emits nearly 1 tonne of CO₂. Consider trains for shorter routes and video calls for business trips.",
      impactKgCo2: Math.round(((formData.flightsPerYear as number) / 2) * 986),
      impactPct: Math.round((((formData.flightsPerYear as number) / 2) * 986 / total) * 100),
      difficulty: "medium",
      isCompleted: false,
      isDismissed: false,
      createdAt: new Date().toISOString(),
    });
  }

  // Food recommendations
  if (formData.dietType === "heavy_meat" || formData.dietType === "mixed") {
    recs.push({
      id: `rec-${id++}`,
      userId: "user-1",
      category: "food",
      title: "Try two meat-free days per week",
      description:
        "Going vegetarian twice a week can reduce your food emissions by up to 15%. Try Meatless Mondays and plant-based Fridays.",
      impactKgCo2: Math.round(emissions.food * 0.15),
      impactPct: Math.round((emissions.food * 0.15 / total) * 100),
      difficulty: "easy",
      isCompleted: false,
      isDismissed: false,
      createdAt: new Date().toISOString(),
    });
  }

  if ((formData.localFoodPct as number) < 50) {
    recs.push({
      id: `rec-${id++}`,
      userId: "user-1",
      category: "food",
      title: "Source more food locally",
      description:
        "Buying from local farmers markets reduces transport emissions embedded in your food. Aim for 50%+ locally sourced groceries.",
      impactKgCo2: Math.round(emissions.food * 0.08),
      impactPct: Math.round((emissions.food * 0.08 / total) * 100),
      difficulty: "easy",
      isCompleted: false,
      isDismissed: false,
      createdAt: new Date().toISOString(),
    });
  }

  // Energy recommendations
  if (formData.heatingType === "gas") {
    recs.push({
      id: `rec-${id++}`,
      userId: "user-1",
      category: "energy",
      title: "Switch to a heat pump for home heating",
      description:
        "Heat pumps are 3-4x more efficient than gas boilers and run on electricity. They can slash your heating emissions by 70%.",
      impactKgCo2: Math.round(2200 - 600),
      impactPct: Math.round(((2200 - 600) / total) * 100),
      difficulty: "hard",
      isCompleted: false,
      isDismissed: false,
      createdAt: new Date().toISOString(),
    });
  }

  if ((formData.renewablePct as number) < 50) {
    recs.push({
      id: `rec-${id++}`,
      userId: "user-1",
      category: "energy",
      title: "Switch to a renewable energy provider",
      description:
        "Switching to 100% renewable electricity could eliminate most of your energy-related emissions. Many providers offer competitive rates.",
      impactKgCo2: Math.round(emissions.energy * 0.4),
      impactPct: Math.round((emissions.energy * 0.4 / total) * 100),
      difficulty: "medium",
      isCompleted: false,
      isDismissed: false,
      createdAt: new Date().toISOString(),
    });
  }

  // Shopping recommendations
  if ((formData.clothingItemsMonthly as number) > 2) {
    recs.push({
      id: `rec-${id++}`,
      userId: "user-1",
      category: "shopping",
      title: "Buy 50% of clothing secondhand",
      description:
        "Thrift shopping, consignment stores, and online resale platforms offer quality items at a fraction of the environmental cost.",
      impactKgCo2: Math.round(emissions.shopping * 0.35),
      impactPct: Math.round((emissions.shopping * 0.35 / total) * 100),
      difficulty: "easy",
      isCompleted: false,
      isDismissed: false,
      createdAt: new Date().toISOString(),
    });
  }

  if ((formData.electronicsYearly as number) > 1) {
    recs.push({
      id: `rec-${id++}`,
      userId: "user-1",
      category: "shopping",
      title: "Extend device lifespans",
      description:
        "Using phones and laptops for an extra year cuts their lifetime carbon cost by 25%. Consider repairs over replacements.",
      impactKgCo2: Math.round(emissions.shopping * 0.25),
      impactPct: Math.round((emissions.shopping * 0.25 / total) * 100),
      difficulty: "easy",
      isCompleted: false,
      isDismissed: false,
      createdAt: new Date().toISOString(),
    });
  }

  // Sort by impact (highest first)
  return recs.sort((a, b) => b.impactKgCo2 - a.impactKgCo2);
}

// ─── Monthly Projection Generator ─────────────────────────────────────

export function generateMonthlyProjection(
  emissions: CategoryEmissions
): MonthlyDataPoint[] {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const currentMonthIndex = new Date().getMonth();
  const monthlyBase = {
    transport: emissions.transport / 12,
    food: emissions.food / 12,
    energy: emissions.energy / 12,
    shopping: emissions.shopping / 12,
    waste: emissions.waste / 12,
  };

  return months.map((month, i) => {
    // Add realistic seasonal variation
    const offset = i - currentMonthIndex;
    const seasonalFactor = 1 + Math.sin(((i - 6) / 12) * Math.PI * 2) * 0.08;
    // Slight downward trend toward future months (improvement)
    const trendFactor = offset > 0 ? 1 - offset * 0.01 : 1 + Math.abs(offset) * 0.015;
    const factor = seasonalFactor * trendFactor;

    const transportKg = Math.round(monthlyBase.transport * factor);
    const foodKg = Math.round(monthlyBase.food * factor);
    const energyKg = Math.round(monthlyBase.energy * (factor + (i < 3 || i > 9 ? 0.12 : -0.05))); // Winter energy spike
    const shoppingKg = Math.round(monthlyBase.shopping * factor);
    const wasteKg = Math.round(monthlyBase.waste * factor);

    return {
      month,
      totalKg: transportKg + foodKg + energyKg + shoppingKg + wasteKg,
      transportKg,
      foodKg,
      energyKg,
      shoppingKg,
      wasteKg,
    };
  });
}

// ─── Simulation Engine ─────────────────────────────────────────────────

export function simulateChanges(
  emissions: CategoryEmissions,
  adjustments: Record<string, number>
): SimulationResult {
  const baseline = emissions.total;

  // Each slider maps to a category's max savings potential
  const savings = {
    car: (adjustments.car || 0) / 100 * emissions.transport * 0.5,
    publicTransport: (adjustments.publicTransport || 0) / 100 * emissions.transport * 0.2,
    meat: (adjustments.meat || 0) / 100 * emissions.food * 0.4,
    electricity: (adjustments.electricity || 0) / 100 * emissions.energy * 0.3,
    renewable: (adjustments.renewable || 0) / 100 * emissions.energy * 0.5,
    shopping: (adjustments.shopping || 0) / 100 * emissions.shopping * 0.5,
    recycling: (adjustments.recycling || 0) / 100 * emissions.waste * 0.4,
  };

  const totalSavings = Object.values(savings).reduce((a, b) => a + b, 0);
  const simulated = Math.max(0, baseline - totalSavings);

  return {
    baselineKg: baseline,
    simulatedKg: Math.round(simulated),
    reductionKg: Math.round(totalSavings),
    reductionPct: baseline > 0 ? Math.round((totalSavings / baseline) * 1000) / 10 : 0,
    equivalents: [
      {
        type: "trees",
        label: "Trees planted",
        value: Math.round(totalSavings / 22),
        icon: "Leaf",
      },
      {
        type: "km_driven",
        label: "Car km avoided",
        value: Math.round(totalSavings / 0.21),
        icon: "Car",
      },
    ],
    breakdownComparison: [
      {
        category: "transport",
        baselineKg: emissions.transport,
        simulatedKg: Math.round(emissions.transport - (savings.car + savings.publicTransport)),
      },
      {
        category: "food",
        baselineKg: emissions.food,
        simulatedKg: Math.round(emissions.food - savings.meat),
      },
      {
        category: "energy",
        baselineKg: emissions.energy,
        simulatedKg: Math.round(emissions.energy - (savings.electricity + savings.renewable)),
      },
      {
        category: "shopping",
        baselineKg: emissions.shopping,
        simulatedKg: Math.round(emissions.shopping - savings.shopping),
      },
      {
        category: "waste",
        baselineKg: emissions.waste,
        simulatedKg: Math.round(emissions.waste - savings.recycling),
      },
    ],
  };
}

// ─── Full Engine Run ──────────────────────────────────────────────────

export function runEngine(formData: FormData): EngineResult {
  const emissions = calculateEmissions(formData);
  const { score, grade, percentile } = calculateScore(emissions.total);
  const rank = getSustainabilityRank(score);
  const recommendations = generateRecommendations(formData, emissions);
  const monthlyData = generateMonthlyProjection(emissions);

  const carbonScore: CarbonScore = {
    id: "live-score",
    userId: "user-1",
    assessmentId: "live-assessment",
    totalKgCo2Yearly: emissions.total,
    transportKg: emissions.transport,
    foodKg: emissions.food,
    energyKg: emissions.energy,
    shoppingKg: emissions.shopping,
    wasteKg: emissions.waste,
    score,
    grade,
    percentile,
    createdAt: new Date().toISOString(),
  };

  return {
    emissions,
    score: carbonScore,
    recommendations,
    monthlyData,
    rank,
  };
}
