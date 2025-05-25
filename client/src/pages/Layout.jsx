import React from "react";
import LandingPage from "../pages/LandingPage";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorks from "../components/HowItWorks";
import TestimonialsSection from "../components/TestimonialsSection";
import Footer from "../components/Footer";

function Layout() {
  return (
    <>
      <LandingPage />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <Footer />
    </>
  );
}

export default Layout;
