import { type CarbonScore } from "@/types/carbon";
import { categoryColor } from "@/lib/utils/formatters";

/**
 * Utility to process carbon score into breakdown arrays for charts
 */
export function getBreakdown(score: CarbonScore) {
  const total = score.totalKgCo2Yearly;
  
  return [
    { 
      category: "transport", 
      kgCo2: score.transportKg, 
      percentage: (score.transportKg / total) * 100,
      color: categoryColor("transport"),
      iconName: "Car"
    },
    { 
      category: "food", 
      kgCo2: score.foodKg, 
      percentage: (score.foodKg / total) * 100,
      color: categoryColor("food"),
      iconName: "Utensils"
    },
    { 
      category: "energy", 
      kgCo2: score.energyKg, 
      percentage: (score.energyKg / total) * 100,
      color: categoryColor("energy"),
      iconName: "Zap"
    },
    { 
      category: "shopping", 
      kgCo2: score.shoppingKg, 
      percentage: (score.shoppingKg / total) * 100,
      color: categoryColor("shopping"),
      iconName: "ShoppingBag"
    },
    { 
      category: "waste", 
      kgCo2: score.wasteKg, 
      percentage: (score.wasteKg / total) * 100,
      color: categoryColor("waste"),
      iconName: "Recycle"
    },
  ].sort((a, b) => b.kgCo2 - a.kgCo2); // Sort largest to smallest
}

/**
 * Get environmental equivalents for a given CO2 reduction amount
 */
export function getEquivalents(kgCo2Saved: number) {
  return [
    {
      type: "trees",
      label: "Trees planted",
      value: Math.round(kgCo2Saved / 22),
      iconName: "Leaf"
    },
    {
      type: "driving",
      label: "Car miles avoided",
      value: Math.round(kgCo2Saved / 0.4),
      iconName: "Car"
    }
  ];
}
