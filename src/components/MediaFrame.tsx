"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image, { type ImageProps } from "next/image";
import { EASE_OUT } from "@/lib/motion";

export function MediaFrame({
  className = "",
  imgClassName = "",
  ...imgProps
}: {
  className?: string;
  imgClassName?: string;
} & Omit<ImageProps, "fill" | "className">) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        initial={
          prefersReducedMotion ? { opacity: 0 } : { scale: 1.12, opacity: 0 }
        }
        whileInView={
          prefersReducedMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }
        }
        viewport={{ once: true }}
        whileHover={
          prefersReducedMotion
            ? undefined
            : { scale: 1.04, transition: { duration: 0.4, ease: EASE_OUT } }
        }
        transition={{
          duration: prefersReducedMotion ? 0.3 : 1.6,
          ease: EASE_OUT,
        }}
      >
        <Image {...imgProps} fill className={`object-cover ${imgClassName}`} />
      </motion.div>
    </div>
  );
}
