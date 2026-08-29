import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, PhoneCall, Youtube } from "lucide-react";
import hospitalConfig from "../config/hospital";
import { cn, containerClass, waLink } from "../lib/utils";
import Logo from "./Logo";

const QUICK_LINKS = [
  { label: "About", href: "#about" },
  { label: "Departments", href: "#departments" },
  { label: "Doctors", href: "#doctors" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const PATIENT_LINKS = [
  { label: "Book Appointment", href: "#appointment" },
  { label: "Emergency", href: "#emergency" },
  { label: "Diagnostics", href: "#services" },
  { label: "Pharmacy", href: "#services" },
];

const SOCIALS = [
  { icon: Facebook, label: "Facebook", href: hospitalConfig.social.facebook },
  { icon: Instagram, label: "Instagram", href: hospitalConfig.social.instagram },
  { icon: Youtube, label: "YouTube", href: hospitalConfig.social.youtube },
  { icon: Linkedin, label: "LinkedIn", href: hospitalConfig.social.linkedin },
];

function FooterLink({ href, label }) {
  return (
    <li>
      <a href={href} className="group flex items-center gap-2 py-1.5 text-[14px] text-navy-100/75 transition-colors hover:text-white">
        <span className="h-px w-3 bg-primary-500/60 transition-all duration-200 group-hover:w-5 group-hover:bg-accent-400" aria-hidden="true" />
        {label}
      </a>
    </li>
  );
}

export default function Footer() {
  const { developer } = hospitalConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className={cn(containerClass, "grid gap-12 py-14 sm:py-16 lg:grid-cols-12 lg:gap-8")}>
        {/* Brand */}
        <div className="lg:col-span-4">
          <Logo variant="dark" />
          <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-navy-100/70">
            {hospitalConfig.tagline} Advanced multispeciality healthcare in Lucknow — with 100+
            specialists, modern diagnostics and round-the-clock emergency care.
          </p>
          <ul className="mt-6 flex gap-3">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={`${hospitalConfig.shortName} on ${label}`}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-navy-100/70 transition-all duration-200 hover:border-primary-500 hover:bg-primary-600 hover:text-white"
                >
                  <Icon size={17} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <nav className="lg:col-span-2" aria-label="Quick links">
          <h3 className="text-[13px] font-bold uppercase tracking-[0.16em] text-white">Quick Links</h3>
          <ul className="mt-5 space-y-3">
            {QUICK_LINKS.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </ul>
        </nav>

        {/* Patient services */}
        <nav className="lg:col-span-3" aria-label="Patient services">
          <h3 className="text-[13px] font-bold uppercase tracking-[0.16em] text-white">Patient Services</h3>
          <ul className="mt-5 space-y-3">
            {PATIENT_LINKS.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="lg:col-span-3">
          <h3 className="text-[13px] font-bold uppercase tracking-[0.16em] text-white">Contact</h3>
          <ul className="mt-5 space-y-4 text-[14px] text-navy-100/75">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-primary-400" aria-hidden="true" />
              {hospitalConfig.address}
            </li>
            <li>
              <a href={hospitalConfig.phoneHref} className="flex items-center gap-3 transition-colors hover:text-white">
                <PhoneCall size={16} className="shrink-0 text-primary-400" aria-hidden="true" />
                {hospitalConfig.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${hospitalConfig.email}`} className="flex items-center gap-3 break-all py-0.5 transition-colors hover:text-white">
                <Mail size={16} className="shrink-0 text-primary-400" aria-hidden="true" />
                {hospitalConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock size={16} className="shrink-0 text-primary-400" aria-hidden="true" />
              {hospitalConfig.hours}
            </li>
          </ul>
        </div>
      </div>

      {/* Demo disclaimer */}
      <div className="border-t border-white/10">
        <div className={cn(containerClass, "flex flex-col items-center justify-between gap-3 py-5 text-center text-[13px] text-navy-100/50 sm:flex-row sm:text-left")}>
          <p>© {year} {hospitalConfig.name}. Demo website.</p>
          <p className="max-w-md">
            Demo website created for presentation purposes. MediCare is a fictional demonstration
            brand — not a real hospital.
          </p>
        </div>
      </div>

      {/* Developer credit */}
      <div className="border-t border-white/10 bg-navy-900/60">
        <div className={cn(containerClass, "flex flex-col items-center justify-center gap-1.5 py-4 text-center text-xs text-navy-100/55 sm:flex-row sm:gap-3")}>
          <p>
            Need a website for your hospital?{" "}
            <span className="font-semibold text-navy-100/80">Contact {developer.name}</span> ·{" "}
            <a href={developer.phoneHref} className="font-semibold text-primary-300 transition-colors hover:text-primary-200">
              {developer.phone}
            </a>
          </p>
          <span className="hidden h-3 w-px bg-white/15 sm:block" aria-hidden="true" />
          <a
            href={waLink(developer.whatsapp, developer.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-accent-300 transition-colors hover:text-accent-200"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.2L2.1 21.8l4.72-1.5A9.9 9.9 0 1 0 12.04 2Zm5.8 14.1c-.25.7-1.45 1.35-2 1.4-.5.06-1.13.08-1.83-.12a16 16 0 0 1-1.66-.6c-2.92-1.26-4.83-4.2-4.98-4.4-.14-.2-1.18-1.58-1.18-3s.74-2.13 1-2.42c.27-.29.58-.36.78-.36s.4 0 .57.01c.19.01.44-.07.68.52.25.6.85 2.07.92 2.22.07.15.12.32.02.51-.1.2-.15.32-.29.5-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.75 1.24 1.61 2 1.1.99 2.03 1.3 2.32 1.44.29.15.46.13.63-.08.17-.2.73-.85.92-1.14.2-.29.4-.24.66-.15.27.1 1.7.8 1.99.95.29.14.48.22.55.34.07.13.07.74-.17 1.45Z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
