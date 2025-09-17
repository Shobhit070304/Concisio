import React from "react";
import Hero from "../../components/Landing/Hero";
import About from "../../components/Landing/About";
import Features from "../../components/Landing/Features";
import HowItWorks from "../../components/Landing/HowItWorks";
import FAQs from "../../components/Landing/FAQs";

const LandingPage = () => {

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <FAQs />
    </div>
  );
};

export default LandingPage;
