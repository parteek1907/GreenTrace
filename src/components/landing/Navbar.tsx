"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

/**
 * Fixed navigation bar with glassmorphism, scroll-aware backdrop,
 * and mobile hamburger menu.
 */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Carbon Twin", href: "#carbon-twin" },
    { label: "Impact", href: "#impact" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <motion.header
      className="sticky top-6 left-0 right-0 w-full flex justify-center z-50 px-4 md:px-8 lg:px-12 mb-[-5rem]"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      {/* Pill Container */}
      <nav className="w-full max-w-[1400px] px-4 md:px-6 h-16 flex items-center justify-between rounded-full bg-transparent backdrop-blur-md border border-white/10 shadow-lg relative">
        
        {/* Left Nav Links */}
        <div className="hidden md:flex flex-1 items-center gap-8 justify-start">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-bold text-white/80 hover:text-white transition-colors duration-200 relative group py-2"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#90B816] transition-all duration-300 group-hover:w-full rounded-full" />
            </a>
          ))}
        </div>

        {/* Centered Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 relative transition-transform group-hover:scale-105">
            <Image src="/logo.png" alt="GreenTrace Logo" fill className="object-contain brightness-0 invert" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-white hidden sm:block">
            GreenTrace
          </span>
        </Link>

        {/* Right CTA */}
        <div className="hidden md:flex flex-1 items-center gap-3 justify-end">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10 !rounded-full text-sm font-bold px-4">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary" size="sm" className="!rounded-full shadow-lg text-sm font-bold bg-[#90B816] text-gt-dark hover:bg-white px-6 py-2 transition-all duration-300 border-none" magnetic>
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer rounded-full hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <motion.span
            className="w-5 h-0.5 bg-white block rounded-full"
            animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="w-5 h-0.5 bg-white block rounded-full"
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="w-5 h-0.5 bg-white block rounded-full"
            animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="md:hidden absolute top-20 left-0 right-0 rounded-3xl bg-gt-dark/95 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl p-4"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/80 font-bold hover:text-white transition-colors p-4 rounded-xl hover:bg-white/5 text-center"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-white/10">
                <Link href="/login" className="w-full">
                  <Button variant="ghost" className="w-full text-white font-bold h-12 rounded-full border border-white/20">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup" className="w-full">
                  <Button variant="primary" className="w-full font-bold h-12 rounded-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
