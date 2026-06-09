export type Theme = {
  id: string;
  name: string;
  gradient: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  glass: string;
};

export const THEMES: Theme[] = [
  {
    id: "forest",
    name: "Deep Forest",
    gradient: "from-[#0A1A12] via-[#112F20] to-[#0A1A12]",
    textPrimary: "text-white",
    textSecondary: "text-white/60",
    accent: "text-[#4ADE80]",
    glass: "bg-white/5 border-white/10"
  },
  {
    id: "aurora",
    name: "Aurora",
    gradient: "from-[#0F172A] via-[#064E3B] to-[#1E3A8A]",
    textPrimary: "text-white",
    textSecondary: "text-blue-200",
    accent: "text-emerald-400",
    glass: "bg-white/10 border-white/20"
  },
  {
    id: "earth",
    name: "Earth",
    gradient: "from-[#1C1917] via-[#292524] to-[#1C1917]",
    textPrimary: "text-[#F5F5F4]",
    textSecondary: "text-[#A8A29E]",
    accent: "text-[#D97706]",
    glass: "bg-white/5 border-white/10"
  },
  {
    id: "minimal",
    name: "Minimal",
    gradient: "from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0]",
    textPrimary: "text-[#0F172A]",
    textSecondary: "text-[#64748B]",
    accent: "text-[#059669]",
    glass: "bg-black/5 border-black/10 shadow-sm"
  },
  {
    id: "executive",
    name: "Executive",
    gradient: "from-[#09090B] via-[#18181B] to-[#09090B]",
    textPrimary: "text-[#FAFAFA]",
    textSecondary: "text-[#A1A1AA]",
    accent: "text-[#FFFFFF]",
    glass: "bg-white/5 border-white/10"
  },
  {
    id: "dark-carbon",
    name: "Dark Carbon",
    gradient: "from-[#000000] via-[#0A0A0A] to-[#000000]",
    textPrimary: "text-[#FFFFFF]",
    textSecondary: "text-[#737373]",
    accent: "text-[#22C55E]",
    glass: "bg-white/5 border-white/10"
  }
];

export const QUOTES = [
  "Small choices create lasting impact.",
  "Progress matters more than perfection.",
  "The future is built through daily decisions.",
  "Every footprint tells a story.",
  "Measured impact. Meaningful change.",
  "Less carbon. More future.",
  "Better habits. Better planet.",
  "Building a lighter footprint, one decision at a time."
];

export const TEMPLATES = [
  { id: "signature", name: "Carbon Signature" },
  { id: "snapshot", name: "Impact Snapshot" },
  { id: "twin", name: "Carbon Twin Achievement" },
  { id: "challenge", name: "Challenge Completion" },
  { id: "review", name: "Year In Review" }
];
