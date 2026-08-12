import type { ImageProps } from "next/image";
import { MediaFrame } from "./MediaFrame";

export function PhotoAttach({
  caption,
  className = "",
  frameClassName = "aspect-[4/5]",
  rotate = "-rotate-2",
  ...imgProps
}: {
  caption: string;
  className?: string;
  frameClassName?: string;
  rotate?: string;
} & Omit<ImageProps, "fill" | "className">) {
  return (
    <figure
      className={`relative bg-white p-2.5 pb-9 shadow-[0_18px_34px_-16px_rgba(28,63,75,0.4),0_2px_10px_rgba(28,63,75,0.14)] ${rotate} ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute -top-2.5 left-1/2 h-6 w-[74px] -translate-x-1/2 -rotate-3 border border-acento/25 bg-acento/20"
      />
      <MediaFrame className={frameClassName} {...imgProps} />
      <figcaption className="absolute right-2.5 bottom-2.5 left-2.5 font-condensed text-[9px] tracking-wide text-graphite uppercase">
        {caption}
      </figcaption>
    </figure>
  );
}
