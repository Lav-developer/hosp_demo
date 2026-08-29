import { ArrowRight, Award, CheckCircle2 } from "lucide-react";
import hospitalConfig from "../config/hospital";
import { containerClass } from "../lib/utils";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import aboutCare from "../assets/images/about-care.jpg";

const KEY_POINTS = [
  "Experienced medical professionals",
  "Advanced diagnostic technology",
  "Patient-focused care",
  "24/7 emergency services",
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-28">
      <div className={`${containerClass} grid items-center gap-14 lg:grid-cols-2 lg:gap-20`}>
        {/* Visual */}
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative mx-auto max-w-[540px]">
            <div
              className="pointer-events-none absolute -left-8 -top-8 h-36 w-36 opacity-60"
              style={{ backgroundImage: "radial-gradient(#8cbee0 1.5px, transparent 1.5px)", backgroundSize: "16px 16px" }}
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[1.75rem] shadow-lift ring-1 ring-navy-900/10">
              <img
                src={aboutCare}
                alt="MediCare doctor explaining medical reports to a senior patient during consultation"
                className="aspect-[16/11] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Experience badge */}
            <div className="absolute -bottom-7 right-4 flex items-center gap-3.5 rounded-2xl border border-line bg-white p-4 shadow-lift sm:right-8 sm:p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent-600">
                <Award size={24} aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-2xl font-extrabold leading-none text-navy-900">
                  25<span className="text-primary-600">+</span>
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Years of trusted care
                  <span className="block font-medium text-slate-400">Since {hospitalConfig.established}</span>
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="About MediCare Hospital"
            title="Healthcare built around you."
          />

          <Reveal delay={100}>
            <p className="mt-5 text-[15px] leading-relaxed text-slate-600 sm:text-base">
              For more than two decades, {hospitalConfig.name} has stood for one simple promise —
              healthcare that revolves around the patient, not the other way around. From preventive
              checkups to complex procedures, our 100+ specialists work as one team to make every
              step of your journey clear, comfortable and safe.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600 sm:text-base">
              Our modern Lucknow campus brings advanced diagnostics, modular operation theatres and
              compassionate nursing care together under a single roof — so families never have to
              look elsewhere in their moment of need.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <ul className="mt-7 grid gap-3.5 sm:grid-cols-2">
              {KEY_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[14.5px] font-semibold text-navy-800">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-600" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Button as="a" href="#why-us" size="lg">
                Learn More About Us
                <ArrowRight size={17} aria-hidden="true" />
              </Button>
              <a
                href="#doctors"
                className="group inline-flex items-center gap-1.5 py-1.5 text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800"
              >
                Meet our specialists
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
