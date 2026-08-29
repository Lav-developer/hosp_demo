import facilityRoom from "../assets/images/facility-room.jpg";
import facilityIcu from "../assets/images/facility-icu.jpg";
import facilityOt from "../assets/images/facility-ot.jpg";
import facilityLab from "../assets/images/facility-lab.jpg";
import facilityReception from "../assets/images/facility-reception.jpg";
import facilityWaiting from "../assets/images/facility-waiting.jpg";

/** Facilities gallery — images are AI-generated for this demo. */
export const facilities = [
  {
    id: "reception",
    image: facilityReception,
    title: "Reception & Help Desk",
    description: "Warm, welcoming assistance from the moment you arrive.",
    featured: true,
  },
  {
    id: "patient-rooms",
    image: facilityRoom,
    title: "Modern Patient Rooms",
    description: "Private, airy rooms designed for restful recovery.",
  },
  {
    id: "icu",
    image: facilityIcu,
    title: "Intensive Care Unit",
    description: "Intensivist-led ICU with round-the-clock monitoring.",
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
  },
];

export default facilities;
