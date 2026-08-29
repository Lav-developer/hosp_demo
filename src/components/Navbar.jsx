import { useCallback, useEffect, useRef, useState } from "react";
import { CalendarCheck, ChevronRight, Mail, Menu, PhoneCall, Siren, X } from "lucide-react";
import hospitalConfig from "../config/hospital";
import { cn, containerClass } from "../lib/utils";
import Logo from "./Logo";
import Button from "./Button";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "departments", label: "Departments" },
  { id: "doctors", label: "Doctors" },
  { id: "services", label: "Services" },
  { id: "facilities", label: "Facilities" },
  { id: "contact", label: "Contact" },
];

function TopBar({ hidden }) {
  return (
    <div
      className={cn(
        "overflow-hidden bg-navy-950 text-[12.5px] text-navy-100 transition-all duration-300",
        hidden ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
      )}
    >
      <div className={cn(containerClass, "flex h-9 items-center justify-between gap-4")}>
        <a
          href={hospitalConfig.emergencyPhoneHref}
          className="group flex items-center gap-2 py-1.5 font-medium text-white/90 transition-colors hover:text-white"
        >
          <Siren size={13} className="text-rose-400" aria-hidden="true" />
          <span className="hidden sm:inline">24/7 Emergency &amp; Ambulance:</span>
          <span className="sm:hidden">Emergency:</span>
          <span className="font-semibold tracking-wide group-hover:underline">{hospitalConfig.emergencyPhone}</span>
        </a>
        <div className="hidden items-center gap-5 md:flex">
          <a href={`mailto:${hospitalConfig.email}`} className="flex items-center gap-1.5 transition-colors hover:text-white">
            <Mail size={13} aria-hidden="true" />
            {hospitalConfig.email}
          </a>
          <span className="h-3 w-px bg-white/20" aria-hidden="true" />
          <span className="flex items-center gap-1.5">
            <PhoneCall size={13} aria-hidden="true" />
            OPD: {hospitalConfig.opdHours.weekdays}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Navbar({ onBook }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const drawerRef = useRef(null);

  /* Navbar appearance on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scrollspy — highlight the nav item for the section in view */
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!sections.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* Mobile drawer: lock body scroll, close on Escape, trap focus */
  useEffect(() => {
    if (!menuOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const closeBtn = drawerRef.current?.querySelector("[data-drawer-close]");
    closeBtn?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-line bg-white/95 shadow-header backdrop-blur-md"
            : "border-b border-transparent bg-white/85 backdrop-blur-sm"
        )}
      >
        <TopBar hidden={scrolled} />

        <nav className={cn(containerClass, "flex items-center justify-between transition-all duration-300", scrolled ? "h-16" : "h-[70px]")} aria-label="Primary">
          <Logo />

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? "true" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-[14.5px] font-semibold transition-colors",
                    active === link.id ? "text-primary-700" : "text-navy-800/80 hover:text-primary-700"
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-[2.5px] rounded-full bg-primary-600 transition-all duration-200",
                      active === link.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Button onClick={onBook} className="hidden sm:inline-flex" size="md">
              <CalendarCheck size={17} aria-hidden="true" />
              Book Appointment
            </Button>

            {/* Mobile hamburger */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Open navigation menu"
              className="grid h-11 w-11 place-items-center rounded-lg border border-line bg-white text-navy-900 shadow-sm transition hover:border-primary-300 lg:hidden"
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="absolute inset-0 animate-fade-in bg-navy-950/55 backdrop-blur-sm" onClick={closeMenu} aria-hidden="true" />
          <div
            ref={drawerRef}
            id="mobile-menu"
            className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm animate-drawer-in flex-col bg-white shadow-2xl"
          >
            <div className="flex h-16 items-center justify-between border-b border-line px-5">
              <Logo />
              <button
                type="button"
                data-drawer-close
                onClick={closeMenu}
                aria-label="Close navigation menu"
                className="grid h-10 w-10 place-items-center rounded-lg border border-line text-navy-900 transition hover:border-primary-300 hover:text-primary-700"
              >
                <X size={19} aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="space-y-0.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={closeMenu}
                      className={cn(
                        "group flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors",
                        active === link.id ? "bg-primary-50 text-primary-700" : "text-navy-800 hover:bg-mist"
                      )}
                    >
                      {link.label}
                      <ChevronRight size={16} className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-primary-500" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-xl border border-line bg-mist p-4">
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-navy-800/60">
                  <Siren size={13} className="text-rose-500" aria-hidden="true" />
                  24/7 Emergency
                </p>
                <a href={hospitalConfig.emergencyPhoneHref} className="mt-1.5 block font-display text-xl font-extrabold tracking-tight text-navy-900">
                  {hospitalConfig.emergencyPhone}
                </a>
                <p className="mt-1 text-xs text-slate-500">{hospitalConfig.addressShort}</p>
              </div>
            </div>

            <div className="border-t border-line p-4">
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  closeMenu();
                  onBook();
                }}
              >
                <CalendarCheck size={18} aria-hidden="true" />
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
