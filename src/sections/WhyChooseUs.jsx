import { BadgeCheck, CalendarCheck, Clock, Cpu, HeartHandshake, PhoneCall, Star, UserCheck } from "lucide-react";
import hospitalConfig from "../config/hospital";
import { containerClass } from "../lib/utils";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

const FEATURES = [
  {
    icon: UserCheck,
    title: "Experienced Specialists",
    description: "Qualified senior consultants across multiple specialties, with 10–15+ years of clinical experience each.",
  },
  {
    icon: Cpu,
    title: "Advanced Technology",
    description: "Modern diagnostic and treatment facilities — cath lab, modular OTs, 3T MRI and automated pathology.",
  },
  {
    icon: HeartHandshake,
    title: "Patient First",
    description: "Personalized care focused on patient comfort — clear communication, transparent billing and respectful treatment.",
  },
  {
    icon: Clock,
    title: "Available 24/7",
    description: "Emergency, trauma, ICU, pharmacy and ambulance support whenever you need it — day or night, all year.",
  },
];

const HIGHLIGHTS = [
  { icon: Star, text: "4.9/5 average patient satisfaction rating" },
  { icon: BadgeCheck, text: "Cashless treatment with 30+ insurance & TPAs" },
  { icon: HeartHandshake, text: "Dedicated care coordinators for every admission" },
];

export default function WhyChooseUs({ onBook }) {
  return (
    <section id="why-us" className="relative scroll-mt-24 overflow-hidden bg-navy-900 py-16 sm:py-20 lg:py-28">
      {/* Decorative ECG line + glow */}
      <div className="pointer-events-none absolute -top-16 right-0 h-96 w-96 rounded-full bg-primary-500/15 blur-3xl" aria-hidden="true" />
      <svg
        className="pointer-events-none absolute bottom-6 left-0 w-[1400px] max-w-none opacity-[0.07]"
        viewBox="0 0 1200 120"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 60h180l24-38 30 76 26-58 22 20h120l24-38 30 76 26-58 22 20h120l24-38 30 76 26-58 22 20h120l24-38 30 76 26-58 22 20h120l24-38 30 76 26-58 22 20h130"
          stroke="#46b7a7"
          strokeWidth="2.5"
        />
      </svg>

      <div className={`${containerClass} relative grid gap-12 lg:grid-cols-12 lg:gap-16`}>
        {/* Left — intro */}
        <div className="lg:col-span-5">
          <SectionHeading
            dark
            eyebrow="Why Choose Us"
            title="Why patients trust MediCare"
            description="Great outcomes come from more than medicine — they come from experience, technology and genuine care working together."
          />

          <Reveal delay={140}>
            <ul className="mt-8 space-y-4">
              {HIGHLIGHTS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-[14.5px] font-semibold text-navy-100">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-500/15 text-accent-300">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-9 rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-300">
                Need urgent care?
              </p>
              <a
                href={hospitalConfig.emergencyPhoneHref}
                className="mt-1.5 block font-display text-2xl font-extrabold tracking-tight text-white transition-colors hover:text-accent-200"
              >
                {hospitalConfig.emergencyPhone}
              </a>
              <p className="mt-1 text-sm text-navy-100/70">
                Emergency desk staffed round the clock.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button variant="white" as="a" href={hospitalConfig.emergencyPhoneHref}>
                  <PhoneCall size={16} aria-hidden="true" />
                  Call Now
                </Button>
                <Button variant="outlineWhite" onClick={onBook}>
                  <CalendarCheck size={16} aria-hidden="true" />
                  Book a Checkup
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right — feature tiles */}
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7 lg:content-center">
          {FEATURES.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 90}>
              <article className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:border-accent-400/40 hover:bg-white/[0.07] lg:p-7">
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-500/15 text-accent-300 transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-white">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm font-extrabold text-white/15" aria-hidden="true">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-100/70">{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
