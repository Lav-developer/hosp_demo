/** Small shared helpers used across the site. */

/** Join class names, skipping falsy values. */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** Build a https://wa.me link with a pre-filled message. */
export function waLink(number, message = "") {
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export const containerClass = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

/* ─── Runtime theming ────────────────────────────────────────────────────────
 * The default palette lives in index.css (@theme). If the colours in
 * hospitalConfig differ from those defaults, we derive a full 50–950 scale
 * from the configured base colour and inject it as CSS variables, which
 * Tailwind utilities (bg-primary-600, text-accent-700, …) pick up instantly.
 */

const DEFAULT_PRIMARY = "#1f6da1";
const DEFAULT_ACCENT = "#157f73";

function hexToRgb(hex) {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex([r, g, b]) {
  return `#${[r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("")}`;
}

/** Mix a base colour toward white (t > 0) or black (t < 0). */
function mix(hex, t) {
  const [r, g, b] = hexToRgb(hex);
  const target = t >= 0 ? [255, 255, 255] : [0, 0, 0];
  const amount = Math.abs(t);
  return rgbToHex([
    r + (target[0] - r) * amount,
    g + (target[1] - g) * amount,
    b + (target[2] - b) * amount,
  ]);
}

/** Generate a 50–950 scale from a base colour (base lands on shade 600). */
function buildScale(base) {
  return {
    50: mix(base, 0.92),
    100: mix(base, 0.82),
    200: mix(base, 0.62),
    300: mix(base, 0.4),
    400: mix(base, 0.18),
    500: mix(base, 0.08),
    600: base,
    700: mix(base, -0.16),
    800: mix(base, -0.3),
    900: mix(base, -0.44),
    950: mix(base, -0.62),
  };
}

/** Apply configured brand colours to CSS variables (no-op for the defaults). */
export function applyThemeColors(colors) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const apply = (name, base, fallback) => {
    const hex = (base || fallback).toLowerCase();
    if (hex === fallback) return; // keep the hand-tuned palette in index.css
    Object.entries(buildScale(hex)).forEach(([shade, value]) => {
      root.style.setProperty(`--color-${name}-${shade}`, value);
    });
  };
  apply("primary", colors?.primary, DEFAULT_PRIMARY);
  apply("accent", colors?.accent, DEFAULT_ACCENT);
}

/** Today's date as yyyy-mm-dd (for the date input's min attribute). */
export function todayISO() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
