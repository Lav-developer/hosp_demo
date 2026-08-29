import { cn } from "../lib/utils";

const VARIANTS = {
  primary:
    "bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:shadow-md focus-visible:outline-primary-700",
  accent:
    "bg-accent-600 text-white shadow-sm hover:bg-accent-700 hover:shadow-md focus-visible:outline-accent-700",
  secondary:
    "bg-white text-navy-900 border border-line shadow-sm hover:border-primary-300 hover:text-primary-700 focus-visible:outline-primary-600",
  outlineWhite:
    "bg-transparent text-white border border-white/40 hover:bg-white/10 hover:border-white/70 focus-visible:outline-white",
  white:
    "bg-white text-navy-900 shadow-sm hover:bg-primary-50 focus-visible:outline-navy-900",
  danger:
    "bg-rose-600 text-white shadow-sm hover:bg-rose-700 hover:shadow-md focus-visible:outline-rose-700",
  whatsapp:
    "bg-[#1fae5a] text-white shadow-sm hover:bg-[#189a4e] hover:shadow-md focus-visible:outline-[#12833f]",
  ghost: "text-primary-700 hover:bg-primary-50 focus-visible:outline-primary-600",
};

const SIZES = {
  sm: "px-3.5 py-2 text-[13px] gap-1.5 rounded-lg",
  md: "px-5 py-2.5 text-sm gap-2 rounded-lg",
  lg: "px-6 py-3 text-[15px] gap-2 rounded-xl",
};

/** Consistent, accessible button / link styling across the site. */
export default function Button({ as: Tag = "button", variant = "primary", size = "md", className, ...props }) {
  return (
    <Tag
      className={cn(
        "inline-flex cursor-pointer items-center justify-center font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    />
  );
}
