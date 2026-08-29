import {
  Activity,
  Ambulance,
  ClipboardCheck,
  FlaskConical,
  Pill,
  ScanLine,
  Siren,
  Video,
} from "lucide-react";

/** Hospital-wide services & facilities of care. */
export const services = [
  {
    icon: Siren,
    title: "Emergency Care",
    description: "Fully equipped 24/7 emergency & trauma department with rapid triage and immediate specialist support.",
  },
  {
    icon: FlaskConical,
    title: "Diagnostic Laboratory",
    description: "Automated pathology lab with accurate, same-day reports for most routine and advanced tests.",
  },
  {
    icon: ScanLine,
    title: "Advanced Imaging",
    description: "CT, MRI, digital X-ray, ultrasound and echo — modern imaging under one roof.",
  },
  {
    icon: Activity,
    title: "ICU & Critical Care",
    description: "Intensivist-led critical care units with round-the-clock monitoring and 1:1 nursing for critical patients.",
  },
  {
    icon: Pill,
    title: "Pharmacy",
    description: "In-house pharmacy open 24/7, stocked with genuine medicines at fair prices.",
  },
  {
    icon: Ambulance,
    title: "Ambulance",
    description: "GPS-tracked ambulances with trained paramedics, oxygen and life-support equipment on board.",
  },
  {
    icon: ClipboardCheck,
    title: "Preventive Health Checkups",
    description: "Curated full-body health packages for every age, with doctor consultation included.",
  },
  {
    icon: Video,
    title: "Online Consultation",
    description: "Consult our specialists securely over video from home — prescriptions sent digitally.",
  },
];

export default services;
