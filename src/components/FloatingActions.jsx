import { MessageCircle, PhoneCall, Siren } from "lucide-react";
import hospitalConfig from "../config/hospital";
import { waLink } from "../lib/utils";

/** Unobtrusive floating actions — WhatsApp, Call, Emergency (bottom-right). */
export default function FloatingActions() {
  const actions = [
    {
      label: "WhatsApp Us",
      href: waLink(hospitalConfig.whatsapp, hospitalConfig.whatsappMessage),
      icon: MessageCircle,
      classes: "bg-[#1fae5a] text-white hover:bg-[#189a4e]",
      external: true,
    },
    {
      label: `Call ${hospitalConfig.phone}`,
      href: hospitalConfig.phoneHref,
      icon: PhoneCall,
      classes: "bg-white text-primary-700 border border-line hover:bg-primary-50",
    },
    {
      label: "24/7 Emergency",
      href: hospitalConfig.emergencyPhoneHref,
      icon: Siren,
      classes: "bg-rose-600 text-white hover:bg-rose-700",
    },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5">
      {actions.map(({ label, href, icon: Icon, classes, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={`group flex h-11 w-11 items-center justify-center rounded-full shadow-lift transition-all duration-200 hover:scale-105 active:scale-95 ${classes}`}
        >
          <Icon size={19} aria-hidden="true" />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-13 whitespace-nowrap rounded-full bg-navy-900 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 hidden sm:block"
          >
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}
