import { Info, Quote, Star } from "lucide-react";
import testimonials from "../data/testimonials";
import { containerClass } from "../lib/utils";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`Rated ${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={15}
          className={i < count ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24 bg-mist py-16 sm:py-20 lg:py-28">
      <div className={containerClass}>
        <SectionHeading
          align="center"
          eyebrow="Patient Stories"
          title="What our patients say"
          description="Families across Lucknow trust MediCare for everything from routine checkups to complex procedures."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 80}>
              <figure className="relative flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lift">
                <Quote size={30} className="absolute right-5 top-5 text-primary-100" aria-hidden="true" />
                <Stars count={t.rating} />
                <blockquote className="mt-4 flex-1 text-[14.5px] leading-relaxed text-slate-600">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-100 text-[13px] font-bold text-primary-700"
                    aria-hidden="true"
                  >
                    {t.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[14.5px] font-bold text-navy-900">{t.name}</p>
                    <p className="truncate text-xs font-medium text-slate-500">{t.context}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <p className="mt-8 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
            <Info size={13} aria-hidden="true" />
            Patient names and testimonials are fictional, shown for demonstration purposes only.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
