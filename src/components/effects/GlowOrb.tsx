"use client";

import { motion } from "framer-motion";

/**
 * Animated gradient orbs for ambient lighting effects.
 * Creates a deep, atmospheric glow that reinforces the bioluminescent theme.
 */
export default function GlowOrb({
  color = "rgba(34, 197, 94, 0.15)",
  size = 400,
  x = "50%",
  y = "50%",
  delay = 0,
  className = "",
}: {
  color?: string;
  size?: number;
  x?: string;
  y?: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        transform: "translate(-50%, -50%)",
        filter: "blur(60px)",
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      aria-hidden="true"
    />
  );
}
