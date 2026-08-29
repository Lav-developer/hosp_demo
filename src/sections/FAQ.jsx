import { useState } from "react";
import { ChevronDown, MessageCircle, PhoneCall } from "lucide-react";
import faqs from "../data/faqs";
import hospitalConfig from "../config/hospital";
import { cn, containerClass, waLink } from "../lib/utils";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

function FAQItem({ faq, open, onToggle }) {
  return (
    <div className="border-b border-line last:border-b-0">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={faq.id}
          className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-primary-700"
        >
          <span className={cn("text-[15.5px] font-semibold tracking-tight transition-colors sm:text-base", open ? "text-primary-700" : "text-navy-900 group-hover:text-primary-700")}>
            {faq.question}
          </span>
          <span
            className={cn(
              "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
              open ? "rotate-180 border-primary-200 bg-primary-50 text-primary-600" : "border-line text-slate-400 group-hover:border-primary-200 group-hover:text-primary-600"
            )}
            aria-hidden="true"
          >
            <ChevronDown size={16} />
          </span>
        </button>
      </h3>
      <div id={faq.id} className="acc-panel" data-open={open} role="region" aria-label={faq.question}>
        <div>
          <p className="pb-5 pr-10 text-[14.5px] leading-relaxed text-slate-500">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null);

  return (
    <section id="faq" className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-28">
      <div className={`${containerClass} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            description="Everything patients commonly ask us about appointments, emergencies and diagnostics. Can't find your answer? We're one call away."
          />

          <Reveal delay={160}>
            <div className="mt-8 rounded-2xl border border-line bg-mist p-6">
              <p className="font-display text-lg font-bold tracking-tight text-navy-900">
                Still have questions?
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                Our help desk is happy to assist you in Hindi or English, any time of day.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button as="a" href={hospitalConfig.phoneHref} size="sm">
                  <PhoneCall size={14} aria-hidden="true" />
                  {hospitalConfig.phone}
                </Button>
                <Button
                  as="a"
                  href={waLink(hospitalConfig.whatsapp, "Hello MediCare Hospital, I have a question.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  size="sm"
                >
                  <MessageCircle size={14} aria-hidden="true" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={120}>
            <div className="rounded-2xl border border-line bg-white px-6 shadow-sm sm:px-8">
              {faqs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  open={openId === faq.id}
                  onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
