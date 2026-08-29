import { Clock, Mail, MapPin, MessageCircle, Navigation, PhoneCall } from "lucide-react";
import hospitalConfig from "../config/hospital";
import { containerClass, waLink } from "../lib/utils";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

const CONTACT_ROWS = [
  {
    icon: MapPin,
    label: "Address",
    value: `${hospitalConfig.address}`,
    href: hospitalConfig.mapsUrl,
    external: true,
  },
  {
    icon: PhoneCall,
    label: "Phone",
    value: hospitalConfig.phone,
    href: hospitalConfig.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: hospitalConfig.email,
    href: `mailto:${hospitalConfig.email}`,
  },
  {
    icon: Clock,
    label: "Hours",
    value: `${hospitalConfig.hours} — Emergency, Pharmacy & Ambulance included`,
  },
];

/** Stylised map placeholder (no external map service required). */
function MapPlaceholder() {
  return (
    <div className="relative flex h-full min-h-[380px] flex-col overflow-hidden rounded-2xl border border-line bg-[#eaf1f7] shadow-sm lg:min-h-[520px]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="520" height="520" fill="#eaf1f7" />

        {/* City blocks */}
        <g fill="#f6fafd">
          <rect x="30" y="30" width="130" height="100" rx="6" />
          <rect x="190" y="30" width="120" height="100" rx="6" />
          <rect x="30" y="160" width="130" height="110" rx="6" />
          <rect x="190" y="160" width="120" height="110" rx="6" />
          <rect x="350" y="160" width="140" height="110" rx="6" />
          <rect x="30" y="300" width="130" height="110" rx="6" />
          <rect x="190" y="300" width="120" height="110" rx="6" />
          <rect x="350" y="300" width="140" height="110" rx="6" />
          <rect x="350" y="30" width="140" height="100" rx="6" />
        </g>

        {/* Park & water */}
        <rect x="352" y="162" width="136" height="106" rx="10" fill="#dcefe2" />
        <circle cx="410" cy="205" r="26" fill="#cfe8d8" />
        <circle cx="445" cy="230" r="18" fill="#cfe8d8" />
        <path d="M30 460 Q 120 435 200 455 T 380 450 T 520 445 L 520 520 L 30 520 Z" fill="#d6e8f5" />

        {/* Streets */}
        <g stroke="#ffffff" strokeLinecap="round">
          <line x1="20" y1="150" x2="500" y2="150" strokeWidth="12" />
          <line x1="20" y1="290" x2="500" y2="290" strokeWidth="12" />
          <line x1="175" y1="20" x2="175" y2="430" strokeWidth="10" />
          <line x1="340" y1="20" x2="340" y2="430" strokeWidth="10" />
          <line x1="20" y1="40" x2="500" y2="130" strokeWidth="6" opacity="0.8" />
          <line x1="20" y1="380" x2="500" y2="330" strokeWidth="6" opacity="0.8" />
        </g>

        {/* Main avenue */}
        <line x1="40" y1="480" x2="480" y2="60" stroke="#fbd9a6" strokeWidth="14" strokeLinecap="round" />
        <line x1="40" y1="480" x2="480" y2="60" stroke="#f7c98a" strokeWidth="2" strokeDasharray="10 12" />

        {/* Minor street grid */}
        <g stroke="#ffffff" strokeWidth="4" opacity="0.9">
          <line x1="30" y1="80" x2="500" y2="80" />
          <line x1="30" y1="220" x2="500" y2="220" />
          <line x1="30" y1="360" x2="500" y2="360" />
          <line x1="90" y1="20" x2="90" y2="430" />
          <line x1="255" y1="20" x2="255" y2="430" />
          <line x1="430" y1="20" x2="430" y2="430" />
        </g>
      </svg>

      {/* Pin */}
      <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-full">
        <span className="absolute left-1/2 top-full h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-rose-500/25" aria-hidden="true" />
        <span className="relative flex flex-col items-center">
          <span className="mb-1.5 whitespace-nowrap rounded-lg bg-navy-900 px-3 py-1.5 text-[12px] font-bold text-white shadow-lg">
            {hospitalConfig.shortName} Hospital
          </span>
          <svg width="34" height="44" viewBox="0 0 34 44" fill="none" aria-hidden="true" className="drop-shadow-lg">
            <path d="M17 0C7.6 0 0 7.6 0 17c0 12.5 17 27 17 27s17-14.5 17-27C34 7.6 26.4 0 17 0Z" fill="#e11d48" />
            <circle cx="17" cy="17" r="6.5" fill="#ffffff" />
            <path d="M17 13.2h1.6v1.6H17v1.6h1.6v1.6H17v2.4h-1.6v-2.4h-1.6v-1.6h1.6v-1.6h-1.6v-1.6H17Z" fill="#e11d48" />
          </svg>
        </span>
      </div>

      {/* Bottom info bar */}
      <div className="mt-auto flex flex-col gap-3 border-t border-line bg-white/95 p-5 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2.5">
          <MapPin size={18} className="mt-0.5 shrink-0 text-primary-600" aria-hidden="true" />
          <div>
            <p className="text-sm font-bold text-navy-900">{hospitalConfig.name}</p>
            <p className="mt-0.5 text-[13px] text-slate-500">{hospitalConfig.address}</p>
          </div>
        </div>
        <Button as="a" href={hospitalConfig.mapsUrl} target="_blank" rel="noopener noreferrer" size="sm" className="shrink-0">
          <Navigation size={14} aria-hidden="true" />
          Open in Google Maps
        </Button>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 bg-mist py-16 sm:py-20 lg:py-28">
      <div className={containerClass}>
        <SectionHeading
          eyebrow="Contact Us"
          title="We're here when you need us"
          description="Reach out for appointments, reports or guidance — or simply walk in. Our campus is easy to find and easy to reach."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Contact card */}
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl bg-navy-900 p-7 text-white shadow-lift sm:p-9">
              <h3 className="font-display text-2xl font-extrabold tracking-tight">{hospitalConfig.name}</h3>
              <p className="mt-1.5 text-sm text-accent-300">{hospitalConfig.tagline}</p>

              <ul className="mt-8 space-y-5">
                {CONTACT_ROWS.map(({ icon: Icon, label, value, href, external }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-accent-300">
                      <Icon size={19} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-navy-100/60">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="mt-0.5 inline-block py-1 text-[15px] font-semibold leading-snug text-white transition-colors hover:text-accent-200"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-[15px] font-semibold leading-snug text-white">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <div className="flex flex-wrap gap-3">
                  <Button as="a" href={hospitalConfig.phoneHref} variant="white">
                    <PhoneCall size={16} aria-hidden="true" />
                    Call Now
                  </Button>
                  <Button
                    as="a"
                    href={waLink(hospitalConfig.whatsapp, hospitalConfig.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="whatsapp"
                  >
                    <MessageCircle size={16} aria-hidden="true" />
                    WhatsApp
                  </Button>
                  <Button as="a" href={hospitalConfig.mapsUrl} target="_blank" rel="noopener noreferrer" variant="outlineWhite">
                    <Navigation size={16} aria-hidden="true" />
                    Get Directions
                  </Button>
                </div>
                <p className="mt-5 text-[13px] text-navy-100/60">
                  Free on-site parking · Wheelchair accessible · Near {hospitalConfig.landmark}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={120}>
            <MapPlaceholder />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
