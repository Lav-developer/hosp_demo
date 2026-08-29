import { Baby, Bone, Brain, Ear, HeartHandshake, HeartPulse, Sparkles, Stethoscope } from "lucide-react";

/** Department catalogue — icons are Lucide components. */
export const departments = [
  {
    id: "cardiology",
    name: "Cardiology",
    icon: HeartPulse,
    tagline: "Advanced heart care — from preventive cardiology to angioplasty and cardiac rehabilitation.",
    about:
      "Our Department of Cardiology combines experienced interventional cardiologists with a modern cath lab to deliver accurate diagnosis and effective treatment for every kind of heart condition — from routine hypertension management to emergency angioplasty.",
    services: ["Angiography & Angioplasty", "Echocardiography & TMT", "Pacemaker Implantation", "Heart Failure Clinic", "Cardiac Rehabilitation", "Preventive Heart Screening"],
    opd: "Mon – Sat · 10:00 AM – 2:00 PM",
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    icon: Bone,
    tagline: "Joint replacement, sports injury and spine care with modern surgical techniques.",
    about:
      "From minimally invasive knee and hip replacements to arthroscopic sports-injury repair, our orthopedic team helps patients return to pain-free movement faster, supported by dedicated physiotherapy and rehabilitation.",
    services: ["Knee & Hip Replacement", "Arthroscopy & Sports Medicine", "Spine Surgery", "Fracture & Trauma Care", "Physiotherapy & Rehab", "Bone Density Screening"],
    opd: "Mon – Sat · 11:00 AM – 3:00 PM",
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    icon: Baby,
    tagline: "Comprehensive child healthcare — from newborn care to adolescent wellness.",
    about:
      "Our child-friendly pediatric department offers complete care for newborns, children and teenagers — immunisation, growth monitoring, nutrition guidance and treatment of childhood illnesses — in a calm, reassuring environment.",
    services: ["Newborn & Well-Baby Clinic", "Immunisation Program", "Growth & Development Monitoring", "Childhood Asthma & Allergy Care", "Pediatric Emergency Care", "Nutrition Counselling"],
    opd: "Mon – Sat · 9:00 AM – 1:00 PM",
  },
  {
    id: "gynecology",
    name: "Gynecology & Obstetrics",
    icon: HeartHandshake,
    tagline: "Complete women's health — prenatal care, safe deliveries and gynecological care.",
    about:
      "Our Obstetrics & Gynecology department supports women through every stage of life — from adolescent health and family planning to prenatal care, safe deliveries and menopause management — with experienced women's health specialists.",
    services: ["Antenatal Care & Scan", "Normal & Cesarean Delivery", "High-Risk Pregnancy Care", "Laparoscopic Gynec Surgery", "Infertility Consultation", "Menopause Clinic"],
    opd: "Mon – Sat · 10:00 AM – 4:00 PM",
  },
  {
    id: "neurology",
    name: "Neurology",
    icon: Brain,
    tagline: "Diagnosis and treatment of stroke, epilepsy, migraine and nerve disorders.",
    about:
      "Our neurologists provide precise diagnosis and long-term management of disorders of the brain, spine and nervous system, backed by modern imaging, EEG studies and a dedicated stroke-care pathway.",
    services: ["Stroke Care & Clot Management", "Epilepsy & Seizure Clinic", "Headache & Migraine Treatment", "EEG & Nerve Studies", "Parkinson's & Movement Disorders", "Neuropathy & Vertigo Care"],
    opd: "Mon – Sat · 12:00 PM – 4:00 PM",
  },
  {
    id: "general-medicine",
    name: "General Medicine",
    icon: Stethoscope,
    tagline: "Everyday healthcare — fever, infections, diabetes, hypertension and preventive care.",
    about:
      "Our general physicians are often the first point of contact for patients — diagnosing and managing everyday illnesses, chronic lifestyle diseases and coordinating specialist care whenever it is needed.",
    services: ["Fever & Infection Management", "Diabetes & Thyroid Clinic", "Hypertension Care", "Health Checkups", "Vaccination & Travel Advice", "Senior Citizen Care"],
    opd: "Mon – Sun · 9:00 AM – 8:00 PM",
  },
  {
    id: "dermatology",
    name: "Dermatology",
    icon: Sparkles,
    tagline: "Medical and cosmetic dermatology for skin, hair and nail concerns.",
    about:
      "From persistent acne and eczema to hair loss and pigmentation, our dermatologists offer evidence-based treatment for skin, hair and nail conditions for all ages.",
    services: ["Acne & Scar Management", "Eczema & Psoriasis Care", "Hair Loss Treatment", "Pigmentation & Laser Procedures", "Allergy Patch Testing", "Pediatric Dermatology"],
    opd: "Tue – Sat · 11:00 AM – 3:00 PM",
  },
  {
    id: "ent",
    name: "ENT",
    icon: Ear,
    tagline: "Care for ear, nose and throat conditions — from infections to hearing evaluation.",
    about:
      "Our ENT specialists treat the full range of ear, nose and throat conditions — chronic sinusitis, tonsillitis, hearing loss, vertigo and voice disorders — with modern endoscopic diagnostics.",
    services: ["Endoscopic Sinus Surgery", "Hearing & Audiometry Tests", "Tonsillitis & Adenoid Care", "Vertigo & Balance Clinic", "Nasal Allergy Treatment", "Voice & Swallowing Therapy"],
    opd: "Mon – Fri · 10:00 AM – 1:00 PM",
  },
];

export default departments;
