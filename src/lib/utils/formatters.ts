/** Number formatting utilities */

export function formatCO2(kg: number): string {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)}t`;
  }
  return `${Math.round(kg)}kg`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(Math.round(num));
}

/** Grade color mapping */
export function gradeColor(grade: string): string {
  const colors: Record<string, string> = {
    "A+": "#10B981",
    A: "#22C55E",
    "A-": "#4ADE80",
    "B+": "#86EFAC",
    B: "#A3E635",
    "B-": "#FACC15",
    "C+": "#F59E0B",
    C: "#FB923C",
    "C-": "#F97316",
    "D+": "#EF4444",
    D: "#DC2626",
    F: "#991B1B",
  };
  return colors[grade] || "#94A3B8";
}

/** Category icon mapping */
export function categoryIcon(category: string): string {
  const icons: Record<string, string> = {
    transport: "🚗",
    food: "🍽️",
    energy: "⚡",
    shopping: "🛍️",
    waste: "♻️",
  };
  return icons[category] || "🌍";
}

/** Category color mapping */
export function categoryColor(category: string): string {
  const colors: Record<string, string> = {
    transport: "#3B82F6",
    food: "#F59E0B",
    energy: "#8B5CF6",
    shopping: "#EC4899",
    waste: "#10B981",
  };
  return colors[category] || "#94A3B8";
}
