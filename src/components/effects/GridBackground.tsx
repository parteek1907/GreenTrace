"use client";

/**
 * Dot-grid background with radial fade — gives depth without competing with content.
 */
export default function GridBackground({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
      style={{
        backgroundImage: `radial-gradient(rgba(248, 250, 252, 0.04) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
      }}
    />
  );
}
