"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type FocusRailItem = {
  id: string;
  title: string;
  description?: string;
  imageSrc?: string;
  meta?: string;
  node?: React.ReactNode;
};

interface FocusRailProps {
  items: FocusRailItem[];
  initialIndex?: number;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
  onItemChange?: (item: FocusRailItem) => void;
  onSelect?: (item: FocusRailItem) => void;
}

/**
 * Helper to wrap indices (e.g., -1 becomes length-1)
 */
function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

/**
 * Physics Configuration
 * Base spring for spatial movement (x/z)
 */
const BASE_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1,
};

/**
 * Scale Spring
 * Bouncier spring specifically for the visual "Click/Tap" feedback on the center card
 */
const TAP_SPRING = {
  type: "spring",
  stiffness: 450,
  damping: 18, // Lower damping = subtle overshoot/wobble "tap"
  mass: 1,
};

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  className,
  onItemChange,
  onSelect
}: FocusRailProps) {
  const [active, setActive] = React.useState(initialIndex);
  const [isHovering, setIsHovering] = React.useState(false);
  const lastWheelTime = React.useRef<number>(0);

  const count = items.length;
  const activeIndex = wrap(0, count, active);
  const activeItem = items[activeIndex];

  // Notify parent when active item changes
  React.useEffect(() => {
    if (onItemChange) {
      onItemChange(activeItem);
    }
  }, [activeItem, onItemChange]);

  // --- NAVIGATION HANDLERS ---
  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  // --- MOUSE WHEEL / TRACKPAD LOGIC ---
  const onWheel = React.useCallback(
    (e: React.WheelEvent) => {
      const now = Date.now();
      // Debounce: prevent rapid firing from inertia scrolling (400ms lockout)
      if (now - lastWheelTime.current < 400) return;

      // Detect horizontal scroll primarily, but also fallback to vertical if shift is held
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : e.deltaY;

      // Threshold to avoid accidental micro-scrolls
      if (Math.abs(delta) > 20) {
        if (delta > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        lastWheelTime.current = now;
      }
    },
    [handleNext, handlePrev]
  );

  // Autoplay logic
  React.useEffect(() => {
    if (!autoPlay || isHovering) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, handleNext, interval]);

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Enter" && onSelect) onSelect(activeItem);
  };

  // --- SWIPE / DRAG LOGIC ---
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const onDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      handleNext();
    } else if (swipe > swipeConfidenceThreshold) {
      handlePrev();
    }
  };

  const visibleIndices = [-2, -1, 0, 1, 2];

  return (
    <div
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden outline-none select-none overflow-x-hidden",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
    >


      {/* Main Stage */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4">
        
        {/* Left Arrow */}
        <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-40 hidden md:block">
          <button
            onClick={handlePrev}
            className="p-4 rounded-full bg-white/90 border border-gt-border text-gt-dark hover:bg-white hover:scale-110 backdrop-blur-md transition-all duration-500 ease-out active:scale-95 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Right Arrow */}
        <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-40 hidden md:block">
          <button
            onClick={handleNext}
            className="p-4 rounded-full bg-white/90 border border-gt-border text-gt-dark hover:bg-white hover:scale-110 backdrop-blur-md transition-all duration-500 ease-out active:scale-95 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* DRAGGABLE RAIL CONTAINER */}
        <motion.div
          className="relative mx-auto flex flex-1 h-full min-h-[500px] w-full max-w-6xl items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing z-30"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
        >
          {visibleIndices.map((offset) => {
            const absIndex = active + offset;
            const index = wrap(0, count, absIndex);
            const item = items[index];

            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

            const isCenter = offset === 0;
            const dist = Math.abs(offset);

            // Dynamic transforms
            const xOffset = offset * 220; // smaller distance
            const zOffset = -dist * 120;
            const scale = isCenter ? 1 : 0.85;
            const rotateY = offset * -20;

            const opacity = isCenter ? 1 : Math.max(0.1, 1 - dist * 0.6);
            // REMOVED BLUR TO FIX MASSIVE GPU LAG ON HEAVY REACT NODES
            const brightness = isCenter ? 1 : 0.3;

            return (
              <motion.div
                key={absIndex}
                className={cn(
                  "absolute aspect-[9/16] w-[160px] md:w-[220px] rounded-2xl border-t border-white/20 bg-neutral-900 shadow-2xl transition-shadow duration-300",
                  isCenter ? "z-20 shadow-[0_0_50px_rgba(255,255,255,0.1)] ring-1 ring-white/30" : "z-10"
                )}
                initial={false}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  scale: scale,
                  rotateY: rotateY,
                  opacity: opacity,
                  filter: `brightness(${brightness})`,
                }}
                transition={(val) => {
                    if (val === "scale") return TAP_SPRING;
                    return BASE_SPRING;
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                onClick={() => {
                  if (offset !== 0) setActive((p) => p + offset);
                  else if (onSelect) onSelect(item);
                }}
              >
                {/* Only render complex node if center to save immense GPU load during swipe, otherwise just show image */}
                {isCenter && item.node ? (
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    {item.node}
                  </div>
                ) : item.imageSrc ? (
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="h-full w-full rounded-2xl object-cover pointer-events-none"
                  />
                ) : null}

                {/* Lighting layers */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl bg-black/20 pointer-events-none mix-blend-multiply" />
                
                {/* Fallback title for non-center cards that only show images */}
                {!isCenter && (
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent rounded-b-2xl flex items-end justify-center h-24">
                    <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold text-center">{item.title}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Info & Controls (Moved to bottom) */}
        <div className="mx-auto mt-8 flex w-full flex-col items-center justify-center gap-4 pointer-events-auto z-40 relative pb-4">
          <div className="flex flex-col items-center text-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 justify-center mb-2">
                  <div className="h-[1px] w-8 bg-gt-primary/20" />
                  <span className="text-[10px] text-gt-primary/60 tracking-[0.3em] font-bold uppercase">
                    0{activeIndex + 1} / 0{count}
                  </span>
                  <div className="h-[1px] w-8 bg-gt-primary/20" />
                </div>
                <h2 className="text-2xl font-black tracking-[0.4em] uppercase text-gt-dark drop-shadow-lg">
                  {activeItem.title}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Arrows (since desktop absolute arrows might be hidden on small screens) */}
          <div className="flex items-center gap-4 md:hidden mt-4">
            <div className="flex items-center gap-2 rounded-full bg-white/40 p-1 ring-1 ring-gt-primary/10 backdrop-blur-md shadow-lg border border-gt-border">
              <button onClick={handlePrev} className="rounded-full p-3 text-gt-primary/60 transition hover:bg-gt-primary/10 hover:text-gt-dark">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={handleNext} className="rounded-full p-3 text-gt-primary/60 transition hover:bg-gt-primary/10 hover:text-gt-dark">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
