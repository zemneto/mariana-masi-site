import type { ReactNode } from "react";

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="font-condensed text-xs tracking-[0.08em] text-tinta-suave">
      {children}
    </span>
  );
}
