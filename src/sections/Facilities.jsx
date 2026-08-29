import { ArrowUpRight, CheckCircle2, MapPin } from "lucide-react";
import { amenities, facilities } from "../data/facilities";
import hospitalConfig from "../config/hospital";
import { cn, containerClass } from "../lib/utils";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

export default function Facilities() {
  return (
    <section id="facilities" className="scroll-mt-24 bg-mist py-16 sm:py-20 lg:py-28">
      <div className={containerClass}>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Our Facilities"
            title="Infrastructure designed for healing"
            description="World-class facilities built around patient comfort and clinical excellence — take a look inside MediCare."
          />
          <Reveal delay={150}>
            <Button as="a" href={hospitalConfig.mapsUrl} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg" className="shrink-0">
              <MapPin size={17} aria-hidden="true" />
              Explore Our Facilities
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility, i) => (
            <Reveal
              key={facility.id}
              delay={(i % 3) * 90}
              className={cn(
                facility.size === "featured" && "sm:col-span-2",
                facility.size === "wide" && "sm:col-span-2 lg:col-span-3"
              )}
            >
              <figure className="group relative h-[220px] overflow-hidden rounded-2xl shadow-sm ring-1 ring-navy-900/5 transition-shadow duration-300 hover:shadow-lift sm:h-[250px] lg:h-[280px]">
                <img
                  src={facility.image}
                  alt={`${facility.title} at MediCare Multispeciality Hospital`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/25 to-transparent transition-opacity duration-300 group-hover:from-navy-950/90"
                  aria-hidden="true"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <div>
                    <h3 className="font-display text-[17px] font-bold tracking-tight text-white">
                      {facility.title}
                    </h3>
                    <p className="mt-1 max-w-md text-[13px] leading-snug text-white/75">
                      {facility.description}
                    </p>
                  </div>
                  <span
                    className="grid h-9 w-9 shrink-0 translate-y-1 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <ArrowUpRight size={16} />
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* On-campus amenities */}
        <Reveal delay={140}>
          <ul className="mt-8 flex flex-wrap items-center gap-2.5">
            <li className="mr-1 text-[13px] font-bold uppercase tracking-[0.14em] text-navy-800/60">
              Also on campus
            </li>
            {amenities.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-[13px] font-semibold text-navy-800"
              >
                <CheckCircle2 size={13} className="text-accent-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
