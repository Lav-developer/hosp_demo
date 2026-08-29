import { useState } from "react";
import { ArrowRight, CalendarCheck, CalendarClock, GraduationCap, Languages, User } from "lucide-react";
import doctors from "../data/doctors";
import departments from "../data/departments";
import { containerClass } from "../lib/utils";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

function DoctorCard({ doctor, onProfile, onBook }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <button
        type="button"
        onClick={() => onProfile(doctor)}
        className="relative block overflow-hidden"
        aria-label={`View profile of ${doctor.name}, ${doctor.specialty}`}
      >
        <img
          src={doctor.photo}
          alt={`Portrait of ${doctor.name}, ${doctor.specialty} at MediCare Hospital`}
          className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-navy-900 shadow-sm backdrop-blur">
          {doctor.experience.replace(" Years Experience", " yrs exp")}
        </span>
        <span className="absolute inset-x-3 bottom-3 translate-y-2 rounded-lg bg-navy-900/80 py-2 text-center text-[13px] font-bold text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View Profile
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[17px] font-bold tracking-tight text-navy-900">{doctor.name}</h3>
        <p className="mt-0.5 text-sm font-semibold text-primary-700">{doctor.specialty}</p>
        <p className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-slate-500">
          <CalendarClock size={14} className="text-accent-600" aria-hidden="true" />
          {doctor.experience}
        </p>
        <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4 sm:flex-row lg:flex-col xl:flex-row">
          <Button variant="secondary" size="sm" className="flex-1" onClick={() => onProfile(doctor)}>
            <User size={14} aria-hidden="true" />
            View Profile
          </Button>
          <Button size="sm" className="flex-1" onClick={() => onBook({ departmentId: doctor.departmentId, doctorId: doctor.id })}>
            <CalendarCheck size={14} aria-hidden="true" />
            Book Now
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function Doctors({ onBook }) {
  const [selected, setSelected] = useState(null);
  const selectedDept = selected ? departments.find((d) => d.id === selected.departmentId) : null;

  return (
    <section id="doctors" className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-28">
      <div className={containerClass}>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Our Doctors"
            title="Meet Our Specialists"
            description="Senior consultants with 10–15+ years of experience across every major specialty — all available for consultation this week."
          />
          <Reveal delay={150}>
            <Button as="a" href="#appointment" variant="secondary" size="lg" className="shrink-0">
              Book a Consultation
              <ArrowRight size={17} aria-hidden="true" />
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor, i) => (
            <Reveal key={doctor.id} delay={i * 80}>
              <DoctorCard doctor={doctor} onProfile={setSelected} onBook={onBook} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 text-center text-[13px] text-slate-400">
            Doctors shown are fictional specialists created for this website demo.
          </p>
        </Reveal>
      </div>

      {/* Doctor profile modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} ariaLabel={selected ? `Profile of ${selected.name}` : undefined}>
        {selected && (
          <div className="grid sm:grid-cols-[220px_1fr]">
            <div className="relative h-60 sm:h-full sm:min-h-[380px]">
              <img
                src={selected.photo}
                alt={`Portrait of ${selected.name}, ${selected.specialty}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary-600">
                {selectedDept?.name}
              </p>
              <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-navy-900">
                {selected.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                {selected.specialty} · {selected.experience}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">{selected.bio}</p>

              <dl className="mt-5 space-y-3 rounded-xl bg-mist p-4 text-sm">
                <div className="flex gap-2.5">
                  <GraduationCap size={16} className="mt-0.5 shrink-0 text-primary-600" aria-hidden="true" />
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Qualifications</dt>
                    <dd className="mt-0.5 font-semibold text-navy-800">{selected.qualifications.join(" · ")}</dd>
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <CalendarClock size={16} className="mt-0.5 shrink-0 text-primary-600" aria-hidden="true" />
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500">OPD Timings</dt>
                    <dd className="mt-0.5 font-semibold text-navy-800">{selected.opd}</dd>
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <Languages size={16} className="mt-0.5 shrink-0 text-primary-600" aria-hidden="true" />
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Languages</dt>
                    <dd className="mt-0.5 font-semibold text-navy-800">{selected.languages}</dd>
                  </div>
                </div>
              </dl>

              <h4 className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-navy-800/70">Areas of Focus</h4>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {selected.focus.map((f) => (
                  <li key={f} className="rounded-full border border-line bg-white px-3 py-1.5 text-[12.5px] font-semibold text-navy-800">
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className="mt-6 w-full"
                onClick={() => {
                  const { departmentId, id } = selected;
                  setSelected(null);
                  onBook({ departmentId, doctorId: id });
                }}
              >
                <CalendarCheck size={18} aria-hidden="true" />
                Book Appointment with Dr. {selected.name.split(" ").pop()}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
