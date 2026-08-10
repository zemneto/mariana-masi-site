"use client";

import { motion } from "framer-motion";

const PATHS = [
  { d: "M2 120 C 90 20, 180 200, 280 60 S 420 40, 500 140", color: "var(--color-terracota)" },
  { d: "M0 60 C 100 160, 220 -20, 320 120 S 460 180, 560 40", color: "var(--color-salvia)" },
  { d: "M20 180 C 120 80, 200 220, 340 100 S 480 20, 580 160", color: "var(--color-tinta)" },
];

export function AbstractLines({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 220"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {PATHS.map((path, index) => (
        <motion.path
          key={path.d}
          d={path.d}
          stroke={path.color}
          strokeWidth={1.25}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{
            duration: 2.2,
            delay: index * 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </svg>
  );
}
