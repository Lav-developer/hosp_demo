# MediCare Multispeciality Hospital — Premium Website Demo

> **Demo website created for presentation purposes.** MediCare Multispeciality Hospital is a
> fictional demonstration brand — every name, statistic, photo and testimonial on this site is
> fictional and can be replaced with a real hospital's content.
>
> **Website designed & developed by Lav Kush** · [WhatsApp / Call: +91 63942 14116](tel:+916394214116)

A production-quality, conversion-focused hospital website demo built to show hospital owners and
administrators what a modern digital presence can look like for their institution.

## ✨ Highlights

- **Premium healthcare design** — clean whitespace, strong typography hierarchy, deep-navy/medical-blue/teal palette, subtle shadows and micro-interactions (no template look)
- **Conversion-focused** — persistent *Book Appointment* CTA, department & doctor cards that pre-fill the booking form, prominent 24/7 emergency contact, WhatsApp/call actions everywhere
- **Fully responsive** — layouts redesigned (not just stacked) for desktop, laptop, tablet and mobile, including a mobile navigation drawer
- **Accessible** — semantic HTML, correct heading hierarchy, labelled forms with inline validation, keyboard-navigable menus/modals/accordion, focus states, alt text, `prefers-reduced-motion` support
- **SEO-ready** — meta description, Open Graph/Twitter cards, JSON-LD `Hospital` schema with local Lucknow address, semantic headings
- **Fast & dependency-light** — React + Vite + Tailwind CSS v4 + Lucide icons, self-hosted fonts (no external requests)

## 🧱 Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Framework  | React 18 + Vite                     |
| Styling    | Tailwind CSS v4                     |
| Icons      | Lucide React                        |
| Fonts      | Inter + Plus Jakarta Sans (bundled) |
| Imagery    | AI-generated, demo-safe visuals     |

## 🚀 Getting Started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build (dist/)
npm run preview   # preview the production build
```

## 🎨 Customizing for a Real Hospital

Almost everything brand-related lives in **one file**:

```
src/config/hospital.js
```

Change the hospital name, tagline, phone numbers, WhatsApp number, email, address,
OPD timings, social links — or the two **brand colours** — and the entire site
(navbar, hero, contact cards, footer, floating actions, forms, emergency CTAs,
developer credit…) updates automatically.

Content is equally centralized:

| Content            | File                       |
| ------------------ | -------------------------- |
| Departments        | `src/data/departments.js`  |
| Doctors            | `src/data/doctors.js`      |
| Services           | `src/data/services.js`     |
| Facilities gallery | `src/data/facilities.js`   |
| Testimonials       | `src/data/testimonials.js` |
| FAQ                | `src/data/faqs.js`         |
| Images             | `src/assets/images/`       |
| Page metadata/SEO  | `index.html`               |

### Changing brand colours

In `src/config/hospital.js`, set:

```js
colors: {
  primary: "#1f6da1", // medical blue — buttons, links, icons
  accent:  "#157f73", // healing teal — highlights, checkmarks
}
```

A complete 50–950 shade scale is generated at runtime from each base colour, so hover states,
tints and dark sections all follow automatically.

## 📐 Project Structure

```
src/
├── components/    # Navbar, Footer, Button, Modal, Reveal, SectionHeading, …
├── sections/      # Hero, Stats, About, Departments, Doctors, Services,
│                  # WhyChooseUs, Facilities, Appointment, EmergencyCTA,
│                  # Testimonials, FAQ, Contact, DeveloperCTA
├── pages/         # HomePage (section composition)
├── data/          # all editable content
├── config/        # hospitalConfig — single source of brand truth
├── hooks/         # useCountUp (animated statistics)
├── lib/           # utils, runtime theming
└── assets/        # images
```

## ✅ Quality Checks

- `node scripts/audit.mjs` — automated headless-browser audit: layout overflow at
  desktop/tablet/mobile, broken images, tap-target sizes, heading hierarchy, anchor links,
  and full interaction tests (mobile menu, modals, FAQ accordion, form validation & success state)
- `node scripts/screenshot.mjs` — full-page screenshots at three viewports

## 📄 License & Attribution

This is a sales demonstration website. All hospital content, doctors, testimonials and images are
fictional / AI-generated and safe to present. Do not reuse imagery or content as real medical
advice or as a real institution's website.

© 2026 MediCare Multispeciality Hospital (fictional demo brand). Demo website created by
**Lav Kush** for presentation purposes.
