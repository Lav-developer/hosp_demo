import { Ambulance, Clock, Navigation, PhoneCall, ShieldCheck, Siren } from "lucide-react";
import hospitalConfig from "../config/hospital";
import { containerClass } from "../lib/utils";
import Button from "../components/Button";
import Reveal from "../components/Reveal";

const HIGHLIGHTS = [
  { icon: Clock, text: "Rapid-response emergency team, day & night" },
  { icon: Ambulance, text: "GPS-tracked ambulances across Lucknow" },
  { icon: ShieldCheck, text: "Fully equipped trauma centre & ICU backup" },
];

export default function EmergencyCTA() {
  return (
    <section id="emergency" className="scroll-mt-24 border-y border-rose-100 bg-rose-50/70 py-14 sm:py-16 lg:py-20">
      <div className={containerClass}>
        <Reveal>
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-xl">
              <div className="flex items-center gap-4">
                <span className="relative grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-rose-600 text-white shadow-lg shadow-rose-600/30">
                  <Siren size={26} aria-hidden="true" />
                  <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-60" />
                    <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-rose-500" />
                  </span>
                </span>
                <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-4xl">
                  Need Urgent Medical Assistance?
                </h2>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600 sm:text-base">
                Our emergency team is available 24 hours a day, 7 days a week. Call now and our
                trauma-trained staff will guide you until help arrives.
              </p>

              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                {HIGHLIGHTS.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-2 text-[13.5px] font-semibold text-navy-800">
                    <Icon size={16} className="text-rose-600" aria-hidden="true" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[300px]">
              <Button as="a" href={hospitalConfig.emergencyPhoneHref} variant="danger" size="lg" className="w-full">
                <PhoneCall size={19} aria-hidden="true" />
                Call Emergency — {hospitalConfig.emergencyPhone}
              </Button>
              <Button
                as="a"
                href={hospitalConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                className="w-full"
              >
                <Navigation size={17} aria-hidden="true" />
                Get Directions
              </Button>
              <p className="mt-1 text-center text-xs font-medium text-slate-500">
                Ambulance dispatch available throughout Lucknow, 24 × 7
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
