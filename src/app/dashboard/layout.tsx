"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Tabs } from "@ark-ui/react/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileProvider, useProfile } from "@/lib/contexts/ProfileContext";
import { 
  LayoutDashboard, 
  PieChart, 
  Orbit, 
  Flag, 
  BarChart3, 
  Lightbulb, 
  Settings, 
  Bell, 
  Search, 
  X, 
  Menu,
  FileText,
  LogOut,
  User,
  CreditCard,
  Palette,
  LifeBuoy,
  Leaf,
  Flame,
  Droplet,
  Mountain,
  Trees,
  Sun
} from "lucide-react";

const AVATAR_ICONS = [
  { id: "leaf", icon: Leaf },
  { id: "flame", icon: Flame },
  { id: "droplet", icon: Droplet },
  { id: "mountain", icon: Mountain },
  { id: "trees", icon: Trees },
  { id: "sun", icon: Sun },
];

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Carbon Breakdown", href: "/dashboard/breakdown", icon: PieChart },
  { label: "Carbon Twin Simulator", href: "/dashboard/simulator", icon: Orbit },
  { label: "Challenges", href: "/dashboard/challenges", icon: Flag },
  { label: "Progress", href: "/dashboard/progress", icon: BarChart3 },
  { label: "Recommendations", href: "/dashboard/recommendations", icon: Lightbulb },
  { label: "Reports", href: "#", icon: FileText },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProfileProvider>
      <DashboardInner>{children}</DashboardInner>
    </ProfileProvider>
  );
}

function DashboardInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isNew = searchParams.get("new") === "true";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { profile } = useProfile();
  const CurrentIcon = AVATAR_ICONS.find(a => a.id === profile.avatar)?.icon || Leaf;

  const tips = [
    "Lowering your thermostat by 2°C saves up to 180kg CO₂ per year.",
    "Cycling to work twice a week saves ~360kg CO₂ annually.",
    "Switching to a plant-based meal once a day cuts food emissions by 30%.",
    "Unplugging idle devices saves the average home 65kg CO₂ per year.",
    "Line-drying clothes instead of tumble drying saves ~150kg CO₂/year.",
    "A reusable water bottle saves ~156 plastic bottles per year.",
    "Taking the train instead of flying saves 10x the carbon per km."
  ];
  const dailyTip = tips[new Date().getDay()];

  return (
    <div className="h-screen overflow-hidden flex bg-gt-bg text-gt-dark font-sans">
      {/* Desktop Sidebar */}
      <motion.aside 
        initial={isNew ? { x: -300, opacity: 0 } : false}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: isNew ? 0.2 : 0 }}
        className="hidden lg:flex flex-col w-[280px] bg-gt-primary text-white shadow-2xl z-20 shrink-0"
      >
        {/* Branding */}
        <div className="px-8 py-8">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <Leaf className="w-8 h-8 text-white transition-transform group-hover:scale-110" strokeWidth={2.5} />
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-gt-bright transition-colors uppercase">
              GreenTrace
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <Tabs.Root 
          value={pathname} 
          onValueChange={(details) => router.push(details.value)}
          className="flex-1 px-2 space-y-1 overflow-y-auto pb-4 mt-4 w-full"
        >
          <Tabs.List className="flex flex-col relative ml-4 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Tabs.Trigger
                  key={item.href}
                  value={item.href}
                  className="flex items-center gap-3 text-left px-4 py-3 text-sm font-medium text-white/60 hover:text-white/90 transition-all duration-300 relative group cursor-pointer w-full"
                >
                  {isActive && (
                    <motion.div
                      layoutId="desktop-sidebar-active"
                      className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-gt-bright rounded-full z-10 shadow-[0_0_8px_rgba(144,184,22,0.6)]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  <Icon className={`w-5 h-5 transition-colors relative z-10 ${isActive ? "text-white drop-shadow-md" : "text-white/50 group-hover:text-white/80"}`} strokeWidth={isActive ? 2.5 : 2} />
                  <span className={`relative z-10 transition-all duration-300 tracking-wide ${isActive ? "text-white font-bold drop-shadow-md" : "font-medium"}`}>{item.label}</span>
                </Tabs.Trigger>
              );
            })}
          </Tabs.List>
        </Tabs.Root>

        {/* Tip of the Day */}
        <div className="mt-auto mb-6 mx-4 p-5 bg-gradient-to-br from-gt-bright to-gt-teal rounded-2xl relative shadow-[0_8px_24px_rgba(0,0,0,0.15)] overflow-hidden shrink-0 border border-white/20 min-h-[180px] flex flex-col justify-between group">
          <div className="relative z-10">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-gt-dark/80 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gt-dark/60 animate-pulse" />
              Tip of the Day
            </h4>
            <p className="text-[14px] font-bold text-gt-dark leading-relaxed mb-4 pr-12">
              {dailyTip}
            </p>
          </div>
          <Link href="/dashboard/recommendations" className="text-[12px] font-extrabold text-gt-dark bg-white/30 hover:bg-white/50 px-4 py-2 rounded-xl transition-all relative z-10 self-start backdrop-blur-md shadow-sm border border-white/40">
            Explore &rarr;
          </Link>
          
          <svg className="absolute bottom-[-15px] right-[-15px] w-32 h-32 opacity-[0.85] z-0 group-hover:scale-105 group-hover:-translate-y-1 group-hover:-translate-x-1 transition-all duration-700" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="28" fill="white" opacity="0.25" />
            <path d="M42 22 C42 18 38 15 32 15 C26 15 22 18 22 22 L22 30 C22 35 26 40 32 40 C38 40 42 35 42 30 Z" fill="#146E45" />
            <path d="M32 40 L32 55" stroke="#146E45" strokeWidth="6" strokeLinecap="round" />
            <path d="M32 45 L20 35" stroke="#146E45" strokeWidth="5" strokeLinecap="round" />
            <path d="M32 45 L44 35" stroke="#146E45" strokeWidth="5" strokeLinecap="round" />
            <circle cx="32" cy="18" r="8" fill="#FFFFFF" />
            <path d="M48 40 L52 30 L45 28" stroke="#146E45" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="20" cy="50" r="4" fill="#FFFFFF" opacity="0.8" />
            <circle cx="45" cy="52" r="3" fill="#FFFFFF" opacity="0.6" />
          </svg>
        </div>
      </motion.aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Topbar */}
        <motion.header 
          initial={isNew ? { y: -100, opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: isNew ? 0.4 : 0 }}
          className="h-[88px] bg-gt-surface border-b border-gt-border px-6 lg:px-10 flex items-center justify-between z-10 shadow-sm shrink-0"
        >
          {/* Mobile Menu Toggle & Branding */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl border border-gt-border hover:bg-gt-bg transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-gt-dark" />
            </button>
            <Link href="/dashboard" className="flex items-center gap-2">
              <Leaf className="w-7 h-7 text-gt-primary" strokeWidth={2.5} />
            </Link>
          </div>

          {/* Search Bar (Hidden on mobile) */}
          <div className="hidden lg:flex items-center flex-1 max-w-md">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gt-gray group-focus-within:text-gt-primary transition-colors" />
              <input
                type="text"
                placeholder="Search analytics, insights..."
                className="w-full pl-11 pr-4 py-2.5 bg-gt-bg border border-gt-border rounded-full text-sm font-medium text-gt-dark placeholder-gt-gray focus:outline-none focus:border-gt-primary focus:ring-1 focus:ring-gt-primary focus:bg-white transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2.5 rounded-full bg-gt-surface border border-gt-border text-gt-gray hover:text-gt-primary hover:border-gt-primary hover:bg-gt-bg transition-all relative shadow-sm">
              <Bell className="w-5 h-5" strokeWidth={2} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-gt-error rounded-full border-2 border-white" />
            </button>
            
            <div className="h-8 w-px bg-gt-border mx-2 hidden sm:block" />
            
            <div className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 p-1.5 pr-4 rounded-full border border-gt-border hover:border-gt-primary transition-all bg-gt-surface shadow-sm hover:shadow group"
              >
                <div className="w-8 h-8 rounded-full bg-gt-primary flex items-center justify-center text-white shadow-[0_2px_8px_rgba(20,110,69,0.25)]">
                  <CurrentIcon className="w-4 h-4" strokeWidth={2.5} />
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-sm font-bold text-gt-dark leading-none group-hover:text-gt-primary transition-colors">{profile.firstName} {profile.lastName}</span>
                </div>
                <Settings className="w-4 h-4 text-gt-gray group-hover:text-gt-primary transition-colors ml-2 hidden sm:block" />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <>
                    {/* Invisible backdrop to close the menu when clicking outside */}
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gt-border overflow-hidden z-50 flex flex-col"
                    >
                      {/* User Header */}
                      <div className="p-4 border-b border-gt-border bg-gt-bg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gt-primary flex items-center justify-center text-white shadow-inner">
                            <CurrentIcon className="w-5 h-5" strokeWidth={2.5} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gt-dark">{profile.firstName} {profile.lastName}</p>
                            <p className="text-xs text-gt-gray mt-0.5">{profile.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2 space-y-1">
                        <Link href="/dashboard/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gt-dark hover:bg-gt-bg rounded-xl transition-colors">
                          <User className="w-4 h-4 text-gt-gray" />
                          My Profile
                        </Link>
                        <Link href="/dashboard/settings" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gt-dark hover:bg-gt-bg rounded-xl transition-colors">
                          <Settings className="w-4 h-4 text-gt-gray" />
                          Account Settings
                        </Link>
                      </div>

                      <div className="h-px bg-gt-border w-full" />

                      <div className="p-2 space-y-1">
                        <Link href="/" onClick={() => setUserMenuOpen(false)} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-gt-error hover:bg-red-50 rounded-xl transition-colors">
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </Link>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.header>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                className="lg:hidden fixed inset-0 bg-gt-dark/40 z-40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
              />
              <motion.aside
                className="lg:hidden fixed inset-y-0 left-0 w-[280px] z-50 bg-gt-primary text-white shadow-2xl flex flex-col"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="px-6 py-8 flex items-center justify-between">
                  <Link href="/dashboard" className="flex items-center gap-3">
                    <Leaf className="w-8 h-8 text-white" strokeWidth={2.5} />
                    <span className="text-xl font-bold tracking-tight text-white uppercase">GreenTrace</span>
                  </Link>
                  <button onClick={() => setSidebarOpen(false)} className="p-2 text-white/70 hover:text-white bg-white/10 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <Tabs.Root 
                  value={pathname} 
                  onValueChange={(details) => {
                    setSidebarOpen(false);
                    router.push(details.value);
                  }}
                  className="flex-1 px-2 space-y-1 overflow-y-auto pb-4 mt-4 w-full"
                >
                  <Tabs.List className="flex flex-col relative ml-4 mt-2">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Tabs.Trigger
                          key={item.href}
                          value={item.href}
                          className="flex items-center gap-3 text-left px-4 py-3 text-sm font-medium text-white/60 hover:text-white/90 transition-all duration-300 relative group cursor-pointer w-full"
                        >
                          {isActive && (
                            <motion.div
                              layoutId="mobile-sidebar-active"
                              className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-gt-bright rounded-full z-10 shadow-[0_0_8px_rgba(144,184,22,0.6)]"
                              transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            />
                          )}
                          <Icon className={`w-5 h-5 transition-colors relative z-10 ${isActive ? "text-white drop-shadow-md" : "text-white/50 group-hover:text-white/80"}`} strokeWidth={isActive ? 2.5 : 2} />
                          <span className={`relative z-10 transition-all duration-300 tracking-wide ${isActive ? "text-white font-bold drop-shadow-md" : "font-medium"}`}>{item.label}</span>
                        </Tabs.Trigger>
                      );
                    })}
                  </Tabs.List>
                </Tabs.Root>
                {/* Tip of the Day - Mobile */}
                <div className="mt-auto mb-6 mx-4 p-5 bg-gradient-to-br from-gt-bright to-gt-teal rounded-2xl relative shadow-[0_8px_24px_rgba(0,0,0,0.15)] overflow-hidden shrink-0 border border-white/20 min-h-[180px] flex flex-col justify-between group">
                  <div className="relative z-10">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-gt-dark/80 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gt-dark/60 animate-pulse" />
                      Tip of the Day
                    </h4>
                    <p className="text-[14px] font-bold text-gt-dark leading-relaxed mb-4 pr-12">
                      {dailyTip}
                    </p>
                  </div>
                  <Link href="/dashboard/recommendations" onClick={() => setSidebarOpen(false)} className="text-[12px] font-extrabold text-gt-dark bg-white/30 hover:bg-white/50 px-4 py-2 rounded-xl transition-all relative z-10 self-start backdrop-blur-md shadow-sm border border-white/40">
                    Explore &rarr;
                  </Link>
                  
                  <svg className="absolute bottom-[-15px] right-[-15px] w-32 h-32 opacity-[0.85] z-0 group-hover:scale-105 group-hover:-translate-y-1 group-hover:-translate-x-1 transition-all duration-700" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="28" fill="white" opacity="0.25" />
                    <path d="M42 22 C42 18 38 15 32 15 C26 15 22 18 22 22 L22 30 C22 35 26 40 32 40 C38 40 42 35 42 30 Z" fill="#146E45" />
                    <path d="M32 40 L32 55" stroke="#146E45" strokeWidth="6" strokeLinecap="round" />
                    <path d="M32 45 L20 35" stroke="#146E45" strokeWidth="5" strokeLinecap="round" />
                    <path d="M32 45 L44 35" stroke="#146E45" strokeWidth="5" strokeLinecap="round" />
                    <circle cx="32" cy="18" r="8" fill="#FFFFFF" />
                    <path d="M48 40 L52 30 L45 28" stroke="#146E45" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="20" cy="50" r="4" fill="#FFFFFF" opacity="0.8" />
                    <circle cx="45" cy="52" r="3" fill="#FFFFFF" opacity="0.6" />
                  </svg>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Page Content */}
        <motion.main 
          initial={isNew ? { opacity: 0, y: 40 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: isNew ? 0.7 : 0 }}
          className="flex-1 overflow-y-auto p-6 lg:p-10 relative"
        >
          <div className="max-w-[1400px] mx-auto w-full">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
}
