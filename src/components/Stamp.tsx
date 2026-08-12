import type { ReactNode } from "react";

export function Stamp({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-28 w-28 shrink-0 -rotate-6 items-center justify-center rounded-full border-2 border-acento p-3 text-center font-condensed text-[9px] leading-relaxed tracking-wide text-acento uppercase">
      {children}
    </div>
  );
}
