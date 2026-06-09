export interface Theme {
  id: string;
  name: string;
  image: string;
  overlay: string;
  blur: string;
  gradient: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  glass: string;
}

export const THEMES: Theme[] = [
  {
    id: "deep-forest",
    name: "Deep Forest",
    image: "/deepforest.jpg",
    overlay: "bg-[#02180B]/60",
    blur: "backdrop-blur-md",
    gradient: "from-[#022C16]/80 via-[#052E16]/60 to-[#042F2E]/80",
    textPrimary: "text-[#ECFDF5]",
    textSecondary: "text-[#6EE7B7]",
    accent: "text-[#10B981]",
    glass: "bg-[#064E3B]/40 border-[#34D399]/30 shadow-[0_0_50px_rgba(16,185,129,0.15)]"
  },
  {
    id: "aurora",
    name: "Aurora",
    image: "/aurora.jpg",
    overlay: "bg-[#020617]/50",
    blur: "backdrop-blur-md",
    gradient: "from-[#0F172A]/80 via-[#047857]/60 to-[#064E3B]/80",
    textPrimary: "text-white",
    textSecondary: "text-[#A7F3D0]",
    accent: "text-[#34D399]",
    glass: "bg-[#022C16]/50 border-[#10B981]/40 shadow-[0_0_80px_rgba(52,211,153,0.2)]"
  },
  {
    id: "emerald-glass",
    name: "Emerald Glass",
    image: "/emerald.jpg",
    overlay: "bg-[#042F2E]/40",
    blur: "backdrop-blur-md",
    gradient: "from-[#065F46]/70 via-[#047857]/60 to-[#059669]/70",
    textPrimary: "text-white",
    textSecondary: "text-[#D1FAE5]",
    accent: "text-[#A7F3D0]",
    glass: "bg-white/10 border-white/20 shadow-[0_30px_60px_rgba(4,120,87,0.4)] backdrop-blur-xl"
  },
  {
    id: "future-nature",
    name: "Future Nature",
    image: "/futurenature.jpg",
    overlay: "bg-[#022C16]/50",
    blur: "backdrop-blur-md",
    gradient: "from-[#020617]/80 via-[#064E3B]/60 to-[#14532D]/80",
    textPrimary: "text-[#F0FDF4]",
    textSecondary: "text-[#86EFAC]",
    accent: "text-[#4ADE80]",
    glass: "bg-[#022C16]/60 border-[#22C55E]/20 shadow-[0_0_60px_rgba(34,197,94,0.15)]"
  },
  {
    id: "earth",
    name: "Earth",
    image: "/earth.jpg",
    overlay: "bg-[#1C1917]/60",
    blur: "backdrop-blur-sm",
    gradient: "from-[#292524]/80 via-[#451A03]/60 to-[#14532D]/80",
    textPrimary: "text-[#FFFBF0]",
    textSecondary: "text-[#FDE68A]",
    accent: "text-[#F59E0B]",
    glass: "bg-[#78350F]/30 border-[#D97706]/30 shadow-2xl"
  }
];

export const QUOTES = [
  "Measured impact. Meaningful change.",
  "Building a lighter footprint every day.",
  "Small choices. Lasting impact.",
  "The future is shaped by today's decisions.",
  "Leaving the world better than we found it.",
  "Rewiring the future of sustainability.",
  "My carbon signature, my legacy."
];

export const TEMPLATES = [
  { id: "signature", name: "Carbon Signature" },
  { id: "snapshot", name: "Impact Snapshot" },
  { id: "twin", name: "Carbon Twin Evolution" },
  { id: "passport", name: "Sustainability Passport" },
  { id: "review", name: "Year In Impact" }
];
