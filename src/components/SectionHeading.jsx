import Reveal from "./Reveal";
import { cn } from "../lib/utils";

/**
 * Consistent section header: small eyebrow label, display heading,
 * optional supporting copy. Aligns left or center.
 */
export default function SectionHeading({ eyebrow, title, description, align = "left", dark = false, className }) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        centered && "mx-auto max-w-3xl text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.18em]",
            dark ? "text-accent-300" : "text-primary-600",
            centered && "justify-center"
          )}
        >
          <span className={cn("h-px w-6", dark ? "bg-accent-400/60" : "bg-primary-300")} aria-hidden="true" />
          {eyebrow}
          {centered && <span className={cn("h-px w-6", dark ? "bg-accent-400/60" : "bg-primary-300")} aria-hidden="true" />}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-extrabold leading-[1.15] tracking-tight text-balance sm:text-4xl",
          dark ? "text-white" : "text-navy-900"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-[15px] leading-relaxed sm:text-base", dark ? "text-navy-100/75" : "text-slate-500")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
