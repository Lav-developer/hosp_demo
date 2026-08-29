import drAnanyaSharma from "../assets/images/dr-ananya-sharma.jpg";
import drRahulVerma from "../assets/images/dr-rahul-verma.jpg";
import drPriyaMehta from "../assets/images/dr-priya-mehta.jpg";
import drArjunKapoor from "../assets/images/dr-arjun-kapoor.jpg";

/**
 * Specialist directory — all doctors are fictional, created for this demo.
 * Photos are AI-generated for the demo and are not real people.
 */
export const doctors = [
  {
    id: "dr-ananya-sharma",
    name: "Dr. Ananya Sharma",
    specialty: "Senior Cardiologist",
    departmentId: "cardiology",
    experience: "15+ Years Experience",
    photo: drAnanyaSharma,
    qualifications: ["MBBS", "MD (Medicine)", "DM (Cardiology)"],
    focus: ["Interventional Cardiology", "Preventive Heart Care", "Heart Failure Management"],
    opd: "Mon – Sat · 10:00 AM – 1:00 PM",
    languages: "English, Hindi",
    bio: "Dr. Ananya Sharma has performed over 4,000 cardiac procedures in her 15-year career, with a special interest in preventive cardiology. Known for her patient-first approach, she ensures every patient understands their condition and treatment options clearly.",
  },
  {
    id: "dr-rahul-verma",
    name: "Dr. Rahul Verma",
    specialty: "Orthopedic Surgeon",
    departmentId: "orthopedics",
    experience: "12+ Years Experience",
    photo: drRahulVerma,
    qualifications: ["MBBS", "MS (Orthopedics)", "Fellowship – Joint Replacement"],
    focus: ["Knee & Hip Replacement", "Arthroscopy", "Sports Injuries"],
    opd: "Mon – Sat · 11:00 AM – 3:00 PM",
    languages: "English, Hindi",
    bio: "Dr. Rahul Verma specialises in minimally invasive joint replacement and arthroscopic procedures. His structured pre-and post-surgery rehabilitation plans help most of his knee-replacement patients walk unaided within a day of surgery.",
  },
  {
    id: "dr-priya-mehta",
    name: "Dr. Priya Mehta",
    specialty: "Gynecologist & Obstetrician",
    departmentId: "gynecology",
    experience: "10+ Years Experience",
    photo: drPriyaMehta,
    qualifications: ["MBBS", "MS (Obstetrics & Gynecology)"],
    focus: ["High-Risk Pregnancy", "Laparoscopic Surgery", "Prenatal Care"],
    opd: "Mon – Sat · 10:00 AM – 4:00 PM",
    languages: "English, Hindi",
    bio: "Dr. Priya Mehta has guided thousands of mothers through safe pregnancies and deliveries, including complex high-risk cases. She is a strong advocate of informed, respectful maternity care and gentle, minimally invasive surgical techniques.",
  },
  {
    id: "dr-arjun-kapoor",
    name: "Dr. Arjun Kapoor",
    specialty: "Senior Neurologist",
    departmentId: "neurology",
    experience: "14+ Years Experience",
    photo: drArjunKapoor,
    qualifications: ["MBBS", "MD (Medicine)", "DM (Neurology)"],
    focus: ["Stroke Care", "Epilepsy", "Headache & Movement Disorders"],
    opd: "Mon – Sat · 12:00 PM – 4:00 PM",
    languages: "English, Hindi",
    bio: "Dr. Arjun Kapoor leads our neurology department with 14 years of experience in stroke management, epilepsy and movement disorders. He combines thorough clinical evaluation with advanced neuroimaging for accurate, early diagnosis.",
  },
];

export default doctors;
