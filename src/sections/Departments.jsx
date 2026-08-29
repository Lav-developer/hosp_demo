import { useState } from "react";
import { ArrowRight, CalendarCheck, CheckCircle2, Clock } from "lucide-react";
import departments from "../data/departments";
import doctors from "../data/doctors";
import { cn, containerClass } from "../lib/utils";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

export default function Departments({ onBook }) {
  const [selected, setSelected] = useState(null);
  const deptDoctors = selected ? doctors.filter((d) => d.departmentId === selected.id) : [];

  return (
    <section id="departments" className="scroll-mt-24 bg-mist py-16 sm:py-20 lg:py-28">
      <div className={containerClass}>
        <SectionHeading
          align="center"
          eyebrow="Our Departments"
          title="Specialized Care Under One Roof"
          description="Fifteen-plus specialty departments led by senior consultants — so whatever your concern, you'll find the right expert here."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {departments.map((dept, i) => {
            const Icon = dept.icon;
            return (
              <Reveal key={dept.id} delay={(i % 4) * 70}>
                <article className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-300 hover:shadow-lift">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-50 text-primary-600 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
                    <Icon size={23} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-[17px] font-bold tracking-tight text-navy-900">
                    {dept.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{dept.tagline}</p>
                  <button
                    type="button"
                    onClick={() => setSelected(dept)}
                    className="mt-5 inline-flex items-center gap-1.5 self-start py-1 text-sm font-bold text-primary-700 transition-colors hover:text-primary-800"
                    aria-label={`View ${dept.name} department details`}
                  >
                    View Department
                    <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Department detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} ariaLabel={selected ? `${selected.name} department details` : undefined}>
        {selected && (
          <div>
            <div className="flex items-start gap-4 border-b border-line p-6 sm:p-8">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary-600 text-white shadow-sm">
                <selected.icon size={26} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary-600">Department</p>
                <h3 id="dept-modal-title" className="mt-0.5 font-display text-2xl font-extrabold tracking-tight text-navy-900">
                  {selected.name}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-[15px] leading-relaxed text-slate-600">{selected.about}</p>

              <h4 className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-navy-800/70">Key Services</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {selected.services.map((service) => (
                  <li
                    key={service}
                    className="flex items-center gap-1.5 rounded-full border border-line bg-mist px-3 py-1.5 text-[13px] font-semibold text-navy-800"
                  >
                    <CheckCircle2 size={13} className="text-accent-600" aria-hidden="true" />
                    {service}
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid gap-3 rounded-xl bg-mist p-4 sm:grid-cols-2">
                <p className="flex items-center gap-2.5 text-sm font-semibold text-navy-800">
                  <Clock size={16} className="shrink-0 text-primary-600" aria-hidden="true" />
                  {selected.opd}
                </p>
                <p className="flex items-center gap-2.5 text-sm font-semibold text-navy-800">
                  <span className="shrink-0 text-primary-600" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </span>
                  {deptDoctors.length > 0
                    ? `${deptDoctors.length} specialist${deptDoctors.length > 1 ? "s" : ""} available`
                    : "Specialist consultations daily"}
                </p>
              </div>

              <div className={cn("mt-7 flex flex-col gap-3 sm:flex-row")}>
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={() => {
                    const { id } = selected;
                    setSelected(null);
                    onBook({ departmentId: id });
                  }}
                >
                  <CalendarCheck size={18} aria-hidden="true" />
                  Book Appointment in {selected.name}
                </Button>
                <Button as="a" href="#doctors" size="lg" variant="secondary" className="flex-1" onClick={() => setSelected(null)}>
                  Meet Our Doctors
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
