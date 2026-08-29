import facilityRoom from "../assets/images/facility-room.jpg";
import facilityIcu from "../assets/images/facility-icu.jpg";
import facilityOt from "../assets/images/facility-ot.jpg";

/** Facilities gallery — images are AI-generated for this demo. */
export const facilities = [
  {
    id: "patient-rooms",
    image: facilityRoom,
    title: "Modern Patient Rooms",
    description: "Private, airy rooms with attendant beds and modern monitoring, designed for restful recovery.",
  },
  {
    id: "icu",
    image: facilityIcu,
    title: "Intensive Care Unit",
    description: "Intensivist-led ICU with advanced ventilators and round-the-clock monitoring.",
  },
  {
    id: "operation-theatres",
    image: facilityOt,
    title: "Operation Theatres",
    description: "Modular OTs with laminar airflow, precision optics and integrated recovery care.",
  },
];

/** Additional on-campus amenities listed as chips below the gallery. */
export const amenities = [
  "Diagnostic Laboratory",
  "Advanced Imaging (CT · MRI · X-Ray)",
  "24/7 Pharmacy",
  "Blood Bank",
  "Ambulance Service",
  "Cafeteria & Waiting Lounge",
];

export default facilities;
