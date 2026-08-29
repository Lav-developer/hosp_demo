import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  Loader2,
  MessageCircle,
  PhoneCall,
  Send,
} from "lucide-react";
import hospitalConfig from "../config/hospital";
import departments from "../data/departments";
import doctors from "../data/doctors";
import { containerClass, todayISO, waLink } from "../lib/utils";
import Button from "../components/Button";
import Reveal from "../components/Reveal";

const TIME_SLOTS = [
  { value: "morning", label: "Morning (9:00 AM – 12:00 PM)" },
  { value: "afternoon", label: "Afternoon (12:00 PM – 4:00 PM)" },
  { value: "evening", label: "Evening (4:00 PM – 8:00 PM)" },
];

const INITIAL_FORM = {
  name: "",
  phone: "",
  email: "",
  department: "",
  doctor: "",
  date: "",
  time: "",
  message: "",
};

function validate(form) {
  const errors = {};

  if (!form.name.trim()) errors.name = "Please enter your full name.";
  else if (form.name.trim().length < 3) errors.name = "Name must be at least 3 characters.";

  const digits = form.phone.replace(/[\s-]/g, "").replace(/^\+91/, "");
  if (!form.phone.trim()) errors.phone = "Please enter your phone number.";
  else if (!/^[6-9]\d{9}$/.test(digits)) errors.phone = "Enter a valid 10-digit Indian mobile number.";

  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!form.department) errors.department = "Please choose a department.";
  if (!form.date) errors.date = "Please choose a preferred date.";
  else if (form.date < todayISO()) errors.date = "Preferred date cannot be in the past.";
  if (!form.time) errors.time = "Please choose a preferred time.";

  return errors;
}

function Field({ label, htmlFor, required = false, error, children, className = "" }) {
  return (
    <div className={className}>
      <label className="field-label" htmlFor={htmlFor}>
        {label}
        {required && (
          <span className="ml-0.5 text-rose-500" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p className="field-error" id={`${htmlFor}-error`} role="alert">
          <AlertCircle size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

function formatSummary(form) {
  const dept = departments.find((d) => d.id === form.department)?.name;
  const doctor = doctors.find((d) => d.id === form.doctor)?.name;
  const slot = TIME_SLOTS.find((t) => t.value === form.time)?.label;
  const date = form.date
    ? new Date(`${form.date}T00:00:00`).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })
    : "";
  return { dept, doctor, slot, date };
}

export default function Appointment({ bookingRequest }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [submitted, setSubmitted] = useState(null);
  const nameInputRef = useRef(null);

  const availableDoctors = useMemo(() => {
    if (!form.department) return doctors;
    const inDept = doctors.filter((d) => d.departmentId === form.department);
    return inDept.length ? inDept : doctors;
  }, [form.department]);

  /* Apply prefills coming from the Departments / Doctors sections */
  useEffect(() => {
    if (!bookingRequest) return;
    setForm((prev) => ({
      ...prev,
      department: bookingRequest.departmentId || prev.department,
      doctor: bookingRequest.doctorId || (bookingRequest.departmentId ? prev.doctor : prev.doctor),
    }));
    setStatus("idle");
    const t = setTimeout(() => nameInputRef.current?.focus({ preventScroll: true }), 450);
    return () => clearTimeout(t);
  }, [bookingRequest]);

  const setField = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "department" && prev.doctor) {
        const doctorBelongsToDept = doctors.some((d) => d.id === prev.doctor && d.departmentId === value);
        if (!doctorBelongsToDept) next.doctor = "";
      }
      return next;
    });
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "submitting") return;

    const nextErrors = validate(form);
    setErrors(nextErrors);

    const errorKeys = Object.keys(nextErrors).filter((k) => nextErrors[k]);
    if (errorKeys.length) {
      const firstInvalid = document.getElementById(errorKeys[0]);
      firstInvalid?.focus();
      firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("submitting");
    window.setTimeout(() => {
      setSubmitted({ ...form });
      setStatus("success");
    }, 900);
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setStatus("idle");
    setTimeout(() => nameInputRef.current?.focus(), 50);
  };

  const summary = submitted ? formatSummary(submitted) : null;

  return (
    <section id="appointment" className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-28">
      <div className={containerClass}>
        <div className="overflow-hidden rounded-[1.75rem] shadow-lift ring-1 ring-navy-900/10 lg:grid lg:grid-cols-5">
          {/* Left — info panel */}
          <div className="relative overflow-hidden bg-navy-900 p-8 text-white sm:p-10 lg:col-span-2">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl" aria-hidden="true" />
            <svg
              className="pointer-events-none absolute bottom-8 left-0 w-[600px] max-w-none opacity-[0.08]"
              viewBox="0 0 600 80"
              fill="none"
              aria-hidden="true"
            >
              <path d="M0 40h120l16-24 20 48 18-36 14 12h90l16-24 20 48 18-36 14 12h90l16-24 20 48 18-36 14 12h116" stroke="#46b7a7" strokeWidth="2.5" />
            </svg>

            <div className="relative">
              <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-accent-300">
                <span className="h-px w-6 bg-accent-400/60" aria-hidden="true" />
                Book an Appointment
              </p>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                Your health shouldn't have to wait.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-navy-100/75">
                Request an appointment online and our care team will confirm your slot within
                two working hours. No queues, no waiting on hold.
              </p>

              <ul className="mt-7 space-y-3.5">
                {[
                  "Choose your specialist and preferred time",
                  "Confirmation call from our care team",
                  "Zero payment needed to request a slot",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm font-medium text-navy-100">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-accent-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-navy-100/60">
                  Prefer to talk now?
                </p>
                <a
                  href={hospitalConfig.phoneHref}
                  className="flex items-center gap-3 font-display text-xl font-extrabold tracking-tight text-white transition-colors hover:text-accent-200"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-accent-300">
                    <PhoneCall size={18} aria-hidden="true" />
                  </span>
                  {hospitalConfig.phone}
                </a>
                <Button as="a" href={waLink(hospitalConfig.whatsapp, hospitalConfig.whatsappMessage)} target="_blank" rel="noopener noreferrer" variant="whatsapp" className="w-full">
                  <MessageCircle size={17} aria-hidden="true" />
                  Chat on WhatsApp
                </Button>
              </div>

              <dl className="mt-7 space-y-2 border-t border-white/10 pt-6 text-[13px] text-navy-100/70">
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold text-navy-100/90">OPD (Mon – Sat)</dt>
                  <dd>9:00 AM – 8:00 PM</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold text-navy-100/90">Sunday</dt>
                  <dd>10:00 AM – 2:00 PM</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold text-navy-100/90">Emergency</dt>
                  <dd className="text-accent-300">24 × 7</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white p-6 sm:p-10 lg:col-span-3">
            {status === "success" && submitted ? (
              <div className="flex h-full flex-col items-center justify-center py-8 text-center" role="status" aria-live="polite">
                <span className="grid h-20 w-20 animate-pop-in place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={42} aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-navy-900 sm:text-3xl">
                  Request Received!
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate-600">
                  Thank you, <strong className="font-semibold text-navy-800">{submitted.name.trim().split(" ")[0]}</strong>.
                  Our care team will call <strong className="font-semibold text-navy-800">{submitted.phone}</strong> shortly
                  to confirm your appointment.
                </p>

                <dl className="mt-6 w-full max-w-md space-y-2.5 rounded-xl border border-line bg-mist p-5 text-left text-sm">
                  {[
                    ["Department", summary.dept],
                    ["Doctor", summary.doctor || "Assigned by our team"],
                    ["Preferred date", summary.date],
                    ["Preferred time", summary.slot],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className="font-medium text-slate-500">{k}</dt>
                      <dd className="text-right font-semibold text-navy-800">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button onClick={resetForm} size="lg">
                    <CalendarCheck size={18} aria-hidden="true" />
                    Book Another Appointment
                  </Button>
                  <Button
                    as="a"
                    href={waLink(
                      hospitalConfig.whatsapp,
                      `Hello MediCare Hospital, I just requested an appointment for ${summary.dept ?? "consultation"}. Name: ${submitted.name}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="whatsapp"
                    size="lg"
                  >
                    <MessageCircle size={18} aria-hidden="true" />
                    Follow up on WhatsApp
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="font-display text-xl font-extrabold tracking-tight text-navy-900">
                  Request an appointment
                </h3>
                <p className="mt-1.5 text-sm text-slate-500">
                  Fill in your details — our team will call to confirm.{" "}
                  <span className="text-slate-400">Fields marked * are required.</span>
                </p>

                <div className="mt-6 grid gap-x-5 gap-y-4 sm:grid-cols-2">
                  <Field label="Full Name" htmlFor="appt-name" required error={errors.name}>
                    <input
                      ref={nameInputRef}
                      id="appt-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Aarav Gupta"
                      className="field-input"
                      value={form.name}
                      onChange={setField("name")}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "appt-name-error" : undefined}
                    />
                  </Field>

                  <Field label="Phone Number" htmlFor="appt-phone" required error={errors.phone}>
                    <input
                      id="appt-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="10-digit mobile number"
                      className="field-input"
                      value={form.phone}
                      onChange={setField("phone")}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "appt-phone-error" : undefined}
                    />
                  </Field>

                  <Field label="Email" htmlFor="appt-email" error={errors.email} className="sm:col-span-2">
                    <input
                      id="appt-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com (optional)"
                      className="field-input"
                      value={form.email}
                      onChange={setField("email")}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "appt-email-error" : undefined}
                    />
                  </Field>

                  <Field label="Department" htmlFor="appt-department" required error={errors.department}>
                    <div className="relative">
                      <select
                        id="appt-department"
                        name="department"
                        className="field-input appearance-none pr-10"
                        value={form.department}
                        onChange={setField("department")}
                        aria-invalid={!!errors.department}
                        aria-describedby={errors.department ? "appt-department-error" : undefined}
                      >
                        <option value="">Select department</option>
                        {departments.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                    </div>
                  </Field>

                  <Field label="Doctor" htmlFor="appt-doctor" error={errors.doctor}>
                    <div className="relative">
                      <select
                        id="appt-doctor"
                        name="doctor"
                        className="field-input appearance-none pr-10"
                        value={form.doctor}
                        onChange={setField("doctor")}
                        aria-invalid={!!errors.doctor}
                        aria-describedby={errors.doctor ? "appt-doctor-error" : undefined}
                      >
                        <option value="">No preference</option>
                        {availableDoctors.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name} — {d.specialty}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                    </div>
                  </Field>

                  <Field label="Preferred Date" htmlFor="appt-date" required error={errors.date}>
                    <input
                      id="appt-date"
                      name="date"
                      type="date"
                      min={todayISO()}
                      className="field-input"
                      value={form.date}
                      onChange={setField("date")}
                      aria-invalid={!!errors.date}
                      aria-describedby={errors.date ? "appt-date-error" : undefined}
                    />
                  </Field>

                  <Field label="Preferred Time" htmlFor="appt-time" required error={errors.time}>
                    <div className="relative">
                      <select
                        id="appt-time"
                        name="time"
                        className="field-input appearance-none pr-10"
                        value={form.time}
                        onChange={setField("time")}
                        aria-invalid={!!errors.time}
                        aria-describedby={errors.time ? "appt-time-error" : undefined}
                      >
                        <option value="">Select time slot</option>
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot.value} value={slot.value}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                    </div>
                  </Field>

                  <Field label="Message" htmlFor="appt-message" error={errors.message} className="sm:col-span-2">
                    <textarea
                      id="appt-message"
                      name="message"
                      rows={3}
                      placeholder="Briefly describe your concern (optional)"
                      className="field-input resize-none"
                      value={form.message}
                      onChange={setField("message")}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "appt-message-error" : undefined}
                    />
                  </Field>
                </div>

                <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button type="submit" size="lg" className="w-full sm:w-auto sm:min-w-[240px]" disabled={status === "submitting"}>
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                        Requesting…
                      </>
                    ) : (
                      <>
                        <Send size={17} aria-hidden="true" />
                        Request Appointment
                      </>
                    )}
                  </Button>
                  <p className="text-[13px] leading-relaxed text-slate-400">
                    Prefer WhatsApp?{" "}
                    <a
                      href={waLink(hospitalConfig.whatsapp, hospitalConfig.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block py-1 font-semibold text-[#12833f] underline-offset-2 hover:underline"
                    >
                      Chat with us directly
                    </a>{" "}
                    — we usually reply within minutes.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
