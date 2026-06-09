import {
  Trophy,
  CheckCircle,
  Sprout,
  BarChart3,
  Orbit,
  Footprints,
  Leaf,
  Bike,
  Lightbulb,
  Recycle,
  Wheat,
  LayoutDashboard,
  Target,
  Globe,
  PieChart,
  Flag,
  Settings,
  User,
  Bell,
  Activity,
  FileText,
  Car,
  Utensils,
  Zap,
  ShoppingBag,
  ArrowUp,
  type LucideIcon
} from "lucide-react";

/**
 * Maps string identifiers to Lucide React components.
 * This allows storing icon names in mock data or database without storing React components.
 */
const iconMap: Record<string, LucideIcon> = {
  Trophy,
  CheckCircle,
  Sprout,
  BarChart3,
  Orbit,
  Footprints,
  Leaf,
  Bike,
  Lightbulb,
  Recycle,
  Wheat,
  LayoutDashboard,
  Target,
  Globe,
  PieChart,
  Flag,
  Settings,
  User,
  Bell,
  Activity,
  FileText,
  Car,
  Utensils,
  Zap,
  ShoppingBag,
  ArrowUp,
};

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number | string;
  strokeWidth?: number;
}

export default function IconRenderer({ name, className, size = 24, strokeWidth = 2 }: IconRendererProps) {
  const IconComponent = iconMap[name] || Target; // Fallback to Target if not found
  
  return <IconComponent className={className} size={size} strokeWidth={strokeWidth} />;
}
