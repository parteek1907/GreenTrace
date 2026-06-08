"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import GlowOrb from "@/components/effects/GlowOrb";
import GridBackground from "@/components/effects/GridBackground";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock login — redirects to dashboard
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      <GridBackground />
      <GlowOrb color="rgba(34, 197, 94, 0.1)" size={500} x="30%" y="40%" />
      <GlowOrb color="rgba(11, 61, 46, 0.15)" size={400} x="70%" y="60%" delay={2} />

      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gt-emerald to-gt-mint flex items-center justify-center text-gt-dark font-bold">
              G
            </div>
            <span className="text-xl font-bold tracking-tight">
              Green<span className="text-gt-emerald">trace</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-gt-muted">Sign in to continue your sustainability journey.</p>
        </motion.div>

        {/* Form */}
        <motion.div
          variants={fadeInUp}
          className="glass rounded-2xl p-8 border border-white/5"
        >
          {/* Google Button */}
          <button
            type="button"
            onClick={() => (window.location.href = "/dashboard")}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gt-text hover:bg-white/10 transition-colors mb-6 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gt-dim uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-gt-muted mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gt-text placeholder-gt-dim focus:border-gt-emerald/50 focus:outline-none transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-gt-muted mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gt-text placeholder-gt-dim focus:border-gt-emerald/50 focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </motion.div>

        {/* Sign up link */}
        <motion.p
          variants={fadeInUp}
          className="text-center text-sm text-gt-muted mt-6"
        >
          Don't have an account?{" "}
          <Link href="/signup" className="text-gt-emerald hover:text-gt-mint transition-colors">
            Sign up
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
