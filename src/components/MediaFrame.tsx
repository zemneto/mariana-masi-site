"use client";

import { motion } from "framer-motion";
import Image, { type ImageProps } from "next/image";

export function MediaFrame({
  className = "",
  imgClassName = "",
  ...imgProps
}: {
  className?: string;
  imgClassName?: string;
} & Omit<ImageProps, "fill" | "className">) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image {...imgProps} fill className={`object-cover ${imgClassName}`} />
      </motion.div>
    </div>
  );
}
