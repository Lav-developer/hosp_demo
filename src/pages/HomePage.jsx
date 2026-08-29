import Hero from "../sections/Hero";
import Stats from "../sections/Stats";
import About from "../sections/About";
import Departments from "../sections/Departments";
import Doctors from "../sections/Doctors";
import Services from "../sections/Services";
import WhyChooseUs from "../sections/WhyChooseUs";
import Facilities from "../sections/Facilities";
import Appointment from "../sections/Appointment";
import EmergencyCTA from "../sections/EmergencyCTA";
import Testimonials from "../sections/Testimonials";
import FAQ from "../sections/FAQ";
import Contact from "../sections/Contact";
import DeveloperCTA from "../sections/DeveloperCTA";

/** Single-page home — all sections composed in display order. */
export default function HomePage({ onBook, bookingRequest }) {
  return (
    <>
      <Hero onBook={onBook} />
      <Stats />
      <About />
      <Departments onBook={onBook} />
      <Doctors onBook={onBook} />
      <Services />
      <WhyChooseUs onBook={onBook} />
      <Facilities />
      <Appointment bookingRequest={bookingRequest} />
      <EmergencyCTA />
      <Testimonials />
      <FAQ />
      <Contact />
      <DeveloperCTA />
    </>
  );
}
