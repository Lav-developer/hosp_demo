import services from "../data/services";
import { containerClass } from "../lib/utils";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-28">
      <div className={containerClass}>
        <SectionHeading
          align="center"
          eyebrow="Our Services"
          title="Everything you need for better healthcare"
          description="From emergencies to everyday care — a complete range of medical services, diagnostics and support, delivered under one roof."
        />

        <Reveal delay={120}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-line shadow-sm">
            <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
              {services.map(({ icon: Icon, title, description }) => (
                <li key={title} className="group bg-white p-6 transition-colors duration-300 hover:bg-accent-50/50 lg:p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-50 text-accent-600 transition-colors duration-300 group-hover:bg-accent-600 group-hover:text-white">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-[16.5px] font-bold tracking-tight text-navy-900">{title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slate-500">{description}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
