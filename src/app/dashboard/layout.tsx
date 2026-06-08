"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
  FileText
} from "lucide-react";

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
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gt-bg text-gt-dark font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[280px] bg-gt-primary text-white shadow-2xl z-20 shrink-0">
        {/* Branding */}
        <div className="px-8 py-8">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 relative group-hover:scale-105 transition-transform">
              <Image src="/logo.png" alt="GreenTrace Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-gt-bright transition-colors">
              GreenTrace
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-4 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold
                  transition-all duration-200 relative group
                  ${isActive
                    ? "text-gt-primary bg-gt-bright shadow-sm"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-gt-bright rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={`relative z-10 w-5 h-5 ${isActive ? "text-gt-primary" : "text-white/70 group-hover:text-white"}`} strokeWidth={2.5} />
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10">
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors group"
          >
            <Settings className="w-5 h-5 text-white/70 group-hover:text-white" strokeWidth={2.5} />
            <span>Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Topbar */}
        <header className="h-[88px] bg-gt-surface border-b border-gt-border px-6 lg:px-10 flex items-center justify-between z-10 shadow-sm shrink-0">
          {/* Mobile Menu Toggle & Branding */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl border border-gt-border hover:bg-gt-bg transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-gt-dark" />
            </button>
            <div className="w-9 h-9 relative">
              <Image src="/logo.png" alt="GreenTrace Logo" fill className="object-contain" />
            </div>
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
            
            <button className="flex items-center gap-3 p-1.5 pr-4 rounded-full border border-gt-border hover:border-gt-primary transition-all bg-gt-surface shadow-sm hover:shadow">
              <div className="w-8 h-8 rounded-full bg-gt-secondary flex items-center justify-center text-white font-bold text-xs tracking-wider">
                JS
              </div>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-bold text-gt-dark leading-none">Jane Smith</span>
                <span className="text-xs font-medium text-gt-gray mt-1 leading-none">Pro Plan</span>
              </div>
            </button>
          </div>
        </header>

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
                    <div className="w-9 h-9 relative">
                      <Image src="/logo.png" alt="GreenTrace Logo" fill className="object-contain" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">GreenTrace</span>
                  </Link>
                  <button onClick={() => setSidebarOpen(false)} className="p-2 text-white/70 hover:text-white bg-white/10 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="flex-1 px-4 space-y-1 overflow-y-auto mt-4">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                          isActive ? "text-gt-primary bg-gt-bright" : "text-white/80 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? "text-gt-primary" : "text-white/70"}`} strokeWidth={2.5} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
          <div className="max-w-[1400px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
