/** GreenTrace global constants */

/** Average annual CO2 emissions per person (kg) by country */
export const COUNTRY_AVERAGES: Record<string, number> = {
  US: 15240,
  UK: 5550,
  DE: 7920,
  IN: 1910,
  CN: 7380,
  global: 4660,
};

/** CO2 equivalents for environmental impact visualization */
export const CO2_EQUIVALENTS = {
  treesPerKg: 1 / 22, // one mature tree absorbs ~22kg CO2/year
  kmDrivenPerKg: 1 / 0.21, // average car emits ~0.21kg CO2/km
  kwhPerKg: 1 / 0.42, // average grid emits ~0.42kg CO2/kWh
  flightsLHRtoJFKPerKg: 1 / 986, // ~986kg CO2 per transatlantic flight
};

/** Carbon score grading thresholds (yearly kg CO2) */
export const GRADE_THRESHOLDS = [
  { grade: "A+", maxKg: 2000 },
  { grade: "A", maxKg: 3000 },
  { grade: "A-", maxKg: 3500 },
  { grade: "B+", maxKg: 4000 },
  { grade: "B", maxKg: 5000 },
  { grade: "B-", maxKg: 6000 },
  { grade: "C+", maxKg: 7500 },
  { grade: "C", maxKg: 9000 },
  { grade: "C-", maxKg: 11000 },
  { grade: "D+", maxKg: 13000 },
  { grade: "D", maxKg: 16000 },
  { grade: "F", maxKg: Infinity },
] as const;

/** Navigation items */
export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "grid" },
  { label: "Breakdown", href: "/dashboard/breakdown", icon: "pie-chart" },
  { label: "Simulator", href: "/dashboard/simulator", icon: "sliders" },
  { label: "Challenges", href: "/dashboard/challenges", icon: "trophy" },
  { label: "Progress", href: "/dashboard/progress", icon: "trending-up" },
  { label: "Recommendations", href: "/dashboard/recommendations", icon: "lightbulb" },
] as const;

/** Challenge definitions */
export const CHALLENGES = [
  {
    id: "no-car-week",
    title: "No Car Week",
    description: "Avoid driving for 7 days. Walk, bike, or take public transport.",
    category: "transport",
    durationDays: 7,
    targetReductionPct: 15,
    badgeName: "Road Warrior",
    badgeIcon: "Footprints",
  },
  {
    id: "vegetarian-challenge",
    title: "Vegetarian Week",
    description: "Go fully vegetarian for 7 days.",
    category: "food",
    durationDays: 7,
    targetReductionPct: 10,
    badgeName: "Leaf Lover",
    badgeIcon: "Leaf",
  },
  {
    id: "green-commute",
    title: "Green Commute",
    description: "Use only public transport or cycling for 14 days.",
    category: "transport",
    durationDays: 14,
    targetReductionPct: 20,
    badgeName: "Green Commuter",
    badgeIcon: "Bike",
  },
  {
    id: "energy-saver",
    title: "Energy Saver",
    description: "Reduce electricity usage by 20% for 30 days.",
    category: "energy",
    durationDays: 30,
    targetReductionPct: 8,
    badgeName: "Power Down",
    badgeIcon: "Lightbulb",
  },
  {
    id: "zero-waste-week",
    title: "Zero Waste Week",
    description: "Minimize waste — recycle, compost, and avoid single-use plastics.",
    category: "waste",
    durationDays: 7,
    targetReductionPct: 5,
    badgeName: "Waste Warrior",
    badgeIcon: "Recycle",
  },
  {
    id: "local-food-month",
    title: "Local Food Month",
    description: "Buy only locally sourced food for 30 days.",
    category: "food",
    durationDays: 30,
    targetReductionPct: 12,
    badgeName: "Local Hero",
    badgeIcon: "Wheat",
  },
] as const;
