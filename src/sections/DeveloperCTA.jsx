import { Laptop, MessageCircle, PhoneCall } from "lucide-react";
import hospitalConfig from "../config/hospital";
import { containerClass, waLink } from "../lib/utils";
import Button from "../components/Button";
import Reveal from "../components/Reveal";

/**
 * Developer CTA — presented as a professional attribution, clearly separated
 * from the fictional MediCare brand.
 */
export default function DeveloperCTA() {
  const { developer } = hospitalConfig;

  return (
    <section id="developer" className="scroll-mt-24 bg-white py-14 sm:py-16 lg:py-20">
      <div className={containerClass}>
        <Reveal>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[1.75rem] border border-line bg-mist p-8 text-center shadow-soft sm:p-12">
            <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary-200/40 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-accent-200/40 blur-3xl" aria-hidden="true" />

            <div className="relative">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-navy-900 text-white shadow-lg">
                <Laptop size={26} aria-hidden="true" />
              </span>

              <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
                Want a Website Like This for Your Hospital?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
                Give your hospital a modern digital presence with a professional, mobile-friendly
                website designed around your patients and services.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  as="a"
                  href={waLink(developer.whatsapp, developer.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <MessageCircle size={19} aria-hidden="true" />
                  Get Your Hospital Website
                </Button>
                <Button as="a" href={developer.phoneHref} variant="secondary" size="lg" className="w-full sm:w-auto">
                  <PhoneCall size={17} aria-hidden="true" />
                  {developer.phone}
                </Button>
              </div>

              <p className="mt-7 text-sm font-semibold text-navy-800">
                {developer.name} — {developer.role} ·{" "}
                <a href={developer.phoneHref} className="text-primary-700 transition-colors hover:text-primary-800">
                  WhatsApp / Call: {developer.phone}
                </a>
              </p>

              <div className="mx-auto mt-6 h-px w-24 bg-line" aria-hidden="true" />

              <p className="mt-5 text-[13px] leading-relaxed text-slate-400">
                MediCare is a fictional demonstration brand — every colour, name, photo and section
                of this website can be customised for your hospital.{" "}
                <a
                  href={waLink(developer.whatsapp, developer.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 font-semibold text-slate-500 underline decoration-line underline-offset-2 transition-colors hover:text-primary-700"
                >
                  Website designed &amp; developed by {developer.name}
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
