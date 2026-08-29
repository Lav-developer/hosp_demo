import facilityRoom from "../assets/images/facility-room.jpg";
import facilityIcu from "../assets/images/facility-icu.jpg";
import facilityOt from "../assets/images/facility-ot.jpg";
import facilityLab from "../assets/images/facility-lab.jpg";
import facilityReception from "../assets/images/facility-reception.jpg";
import facilityWaiting from "../assets/images/facility-waiting.jpg";

/**
 * Facilities gallery — images are AI-generated for this demo.
 * `size`: "featured" (spans 2 columns) · "wide" (full-width banner) · default tile.
 */
export const facilities = [
  {
    id: "reception",
    image: facilityReception,
    title: "Reception & Help Desk",
    description: "Warm, welcoming assistance from the moment you arrive.",
    size: "featured",
  },
  {
    id: "icu",
    image: facilityIcu,
    title: "Intensive Care Unit",
    description: "Intensivist-led ICU with round-the-clock monitoring.",
  },
  {
    id: "patient-rooms",
    image: facilityRoom,
    title: "Modern Patient Rooms",
    description: "Private, airy rooms designed for restful recovery.",
  },
  {
    id: "operation-theatres",
    image: facilityOt,
    title: "Operation Theatres",
    description: "Modular OTs with laminar airflow and precision equipment.",
  },
  {
    id: "diagnostic-lab",
    image: facilityLab,
    title: "Diagnostic Laboratory",
    description: "Automated pathology and imaging for fast, accurate reports.",
  },
  {
    id: "waiting-lounge",
    image: facilityWaiting,
    title: "Waiting Lounge",
    description: "Calm, comfortable spaces for patients and families.",
    size: "wide",
  },
];

/** Additional on-campus amenities listed as chips below the gallery. */
export const amenities = [
  "Advanced Imaging (CT · MRI · X-Ray)",
  "24/7 Pharmacy",
  "Blood Bank",
  "Ambulance Service",
  "Cafeteria",
  "Free Parking",
];

export default facilities;
