import { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import BackToTop from "./components/BackToTop";
import HomePage from "./pages/HomePage";

export default function App() {
  /**
   * Booking prefill — any section can request an appointment with a
   * department/doctor pre-selected (e.g. a doctor card's "Book Now").
   */
  const [bookingRequest, setBookingRequest] = useState(null);

  const requestBooking = useCallback(({ departmentId, doctorId } = {}) => {
    setBookingRequest({ departmentId, doctorId, at: Date.now() });
    document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>

      <Navbar onBook={() => requestBooking()} />

      <main id="main">
        <HomePage onBook={requestBooking} bookingRequest={bookingRequest} />
      </main>

      <Footer />
      <FloatingActions />
      <BackToTop />
    </>
  );
}
