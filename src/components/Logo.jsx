import { Cross } from "lucide-react";
import hospitalConfig from "../config/hospital";
import { cn } from "../lib/utils";

/** Minimal medical-cross logomark + wordmark. */
export default function Logo({ variant = "light", className }) {
  const onDark = variant === "dark";

  return (
    <a href="#home" className={cn("group flex items-center gap-2.5", className)} aria-label={`${hospitalConfig.name} — back to top`}>
      <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-600 text-white shadow-sm transition-colors group-hover:bg-primary-700">
        <Cross size={20} strokeWidth={2.6} aria-hidden="true" />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-accent-500" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span
          className={cn(
            "block font-display text-[19px] font-extrabold tracking-tight",
            onDark ? "text-white" : "text-navy-900"
          )}
        >
          {hospitalConfig.shortName}
        </span>
        <span
          className={cn(
            "block text-[9.5px] font-semibold uppercase tracking-[0.16em]",
            onDark ? "text-primary-200" : "text-slate-500"
          )}
        >
          {hospitalConfig.wordmarkSub}
        </span>
      </span>
    </a>
  );
}
