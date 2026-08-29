import { ArrowRight, CalendarCheck, Clock, PhoneCall, ScanLine, ShieldCheck, Siren, Stethoscope } from "lucide-react";
import hospitalConfig from "../config/hospital";
import { containerClass } from "../lib/utils";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import heroDoctor from "../assets/images/hero-doctor.jpg";

const TRUST_ITEMS = [
  { icon: Clock, label: "24/7 Emergency" },
  { icon: Stethoscope, label: "Experienced Specialists" },
  { icon: ScanLine, label: "Advanced Diagnostics" },
];

export default function Hero({ onBook }) {
  return (
    <section id="home" className="relative overflow-hidden bg-mist">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-primary-200/40 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-28 bottom-10 h-80 w-80 rounded-full bg-accent-200/30 blur-3xl" aria-hidden="true" />
      <div
        className="pointer-events-none absolute right-[6%] top-28 hidden h-44 w-44 opacity-50 lg:block"
        style={{ backgroundImage: "radial-gradient(#8cbee0 1.5px, transparent 1.5px)", backgroundSize: "18px 18px" }}
        aria-hidden="true"
      />

      <div className={`${containerClass} grid items-center gap-12 pb-16 pt-28 sm:pt-32 lg:grid-cols-2 lg:gap-10 lg:pb-24 lg:pt-40`}>
        {/* Copy */}
        <div className="max-w-xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-3.5 py-1.5 text-xs font-bold text-primary-700 shadow-sm">
              <ShieldCheck size={14} className="text-accent-600" aria-hidden="true" />
              Trusted Multispeciality Hospital · Lucknow
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-navy-900 sm:text-5xl xl:text-[3.6rem]">
              Expert Care. Advanced Medicine.{" "}
              <span className="text-primary-600">Better Outcomes.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
              Comprehensive healthcare delivered by experienced specialists, advanced technology
              and a team that puts patients first.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" onClick={onBook}>
                <CalendarCheck size={19} aria-hidden="true" />
                Book an Appointment
              </Button>
              <Button as="a" href="#services" size="lg" variant="secondary">
                Explore Our Services
                <ArrowRight size={17} aria-hidden="true" />
              </Button>
            </div>
          </Reveal>

          {/* Emergency element */}
          <Reveal delay={320}>
            <div className="mt-8 flex max-w-lg items-center gap-4 rounded-xl border border-line bg-white p-4 shadow-soft">
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                <Siren size={22} aria-hidden="true" />
                <span className="absolute -right-1 -top-1 flex h-3 w-3" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-rose-500" />
                </span>
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  24/7 Emergency Care
                </p>
                <a
                  href={hospitalConfig.emergencyPhoneHref}
                  className="font-display text-xl font-extrabold tracking-tight text-navy-900 transition-colors hover:text-rose-700"
                >
                  {hospitalConfig.emergencyPhone}
                </a>
              </div>
              <a
                href={hospitalConfig.emergencyPhoneHref}
                aria-label={`Call emergency number ${hospitalConfig.emergencyPhone}`}
                className="ml-auto grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-rose-600 text-white shadow-sm transition hover:scale-105 hover:bg-rose-700 active:scale-95"
              >
                <PhoneCall size={18} aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          {/* Trust indicators */}
          <Reveal delay={400}>
            <ul className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
              {TRUST_ITEMS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm font-semibold text-navy-800">
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-primary-100/80 text-primary-700">
                    <Icon size={15} aria-hidden="true" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Visual */}
        <Reveal delay={200} className="relative">
          <div className="relative mx-auto w-full max-w-[460px] lg:ml-auto lg:mr-0">
            <div className="absolute -right-4 -top-4 hidden h-32 w-32 rounded-2xl border-2 border-primary-300/60 sm:block" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[1.75rem] shadow-lift ring-1 ring-navy-900/10">
              <img
                src={heroDoctor}
                alt="Senior consultant doctor smiling in a bright corridor at MediCare Multispeciality Hospital"
                className="aspect-[4/5] w-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy-950/25 to-transparent" aria-hidden="true" />
            </div>

            {/* Floating card — patients treated */}
            <div className="absolute -left-4 top-8 hidden animate-soft-float rounded-xl border border-line bg-white/95 p-3.5 shadow-lift backdrop-blur sm:block lg:-left-10">
              <div className="flex items-center">
                {["RS", "AK", "PM"].map((initials, i) => (
                  <span
                    key={initials}
                    className={`grid h-8 w-8 place-items-center rounded-full border-2 border-white text-[10px] font-bold text-white ${
                      i === 0 ? "bg-primary-500" : i === 1 ? "bg-accent-500" : "bg-navy-700"
                    } ${i > 0 ? "-ml-2.5" : ""}`}
                    aria-hidden="true"
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <p className="mt-2 font-display text-lg font-extrabold leading-none text-navy-900">50,000+</p>
              <p className="mt-1 text-[11px] font-semibold text-slate-500">Patients treated</p>
            </div>

            {/* Floating card — open today */}
            <div className="absolute -bottom-5 left-4 right-4 flex items-center gap-3 rounded-xl border border-line bg-white/95 p-3.5 shadow-lift backdrop-blur sm:left-auto sm:right-0 sm:w-64 sm:translate-x-6">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-50 text-accent-600">
                <Clock size={19} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-[13px] font-bold text-navy-900">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                  OPD open today
                </p>
                <p className="truncate text-xs font-medium text-slate-500">9:00 AM – 8:00 PM</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
