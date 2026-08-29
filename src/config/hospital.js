/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  HOSPITAL CONFIGURATION — edit this file to rebrand the entire website.
 *
 *  Change the name, contact details, address or brand colours below and every
 *  section, button, link and form on the site updates automatically.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const hospitalConfig = {
  name: "MediCare Multispeciality Hospital",
  shortName: "MediCare",
  wordmarkSub: "Multispeciality Hospital",
  tagline: "Advanced Care. Compassionate Healing.",

  // Contact
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  emergencyPhone: "+91 98765 43210",
  emergencyPhoneHref: "tel:+919876543210",
  email: "care@medicare-demo.com",
  address: "123 Healthcare Avenue, Lucknow, Uttar Pradesh 226001",
  addressShort: "123 Healthcare Avenue, Lucknow",
  landmark: "Near Gomti Nagar, Lucknow",
  hours: "Open 24/7",

  // WhatsApp (digits only, with country code, no "+")
  whatsapp: "919876543210",
  whatsappMessage: "Hello MediCare Hospital, I would like to book an appointment.",

  // Google Maps (used for the "Get Directions" buttons)
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Gomti+Nagar+Lucknow+Uttar+Pradesh",

  // Social links (use "#" as placeholder in the demo)
  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
    linkedin: "#",
  },

  // OPD timings shown across the site
  opdHours: {
    weekdays: "Mon – Sat · 9:00 AM – 8:00 PM",
    sunday: "Sunday · 10:00 AM – 2:00 PM",
    emergency: "Emergency & Ambulance · 24 × 7",
  },

  established: 2001,

  /**
   * Brand colours — change these two hex values to re-theme the whole site.
   * (Shades for hover states, tints and dark sections are generated
   * automatically from these base colours.)
   */
  colors: {
    primary: "#1f6da1", // medical blue  — buttons, links, icons
    accent: "#157f73", // healing teal — highlights, checkmarks, accents
  },

  // Demo / attribution (kept separate so it is never confused with the hospital brand)
  developer: {
    name: "Lav Kush",
    role: "Web Developer",
    phone: "+91 63942 14116",
    phoneHref: "tel:+916394214116",
    whatsapp: "916394214116",
    whatsappMessage:
      "Hello Lav Kush, I saw your hospital website demo and I'm interested in getting a website for my hospital.",
  },
};

export default hospitalConfig;
