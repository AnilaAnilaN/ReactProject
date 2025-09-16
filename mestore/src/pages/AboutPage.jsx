import React from "react";
import Hero from "../components/about/Hero.jsx";
import OurStory from "../components/about/OurStory.jsx";
import Mission from "../components/about/MissionValues.jsx";
import WhyShop from "../components/about/WhyShop.jsx";
import CTA from "../components/about/CTA.jsx";

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Our Story Section */}
      <OurStory />

      {/* Mission & Values Section */}
      <Mission />

      {/* Why Shop With Us Section */}
      <WhyShop />

      {/* Call To Action Section */}
      <CTA />
    </main>
  );
}
