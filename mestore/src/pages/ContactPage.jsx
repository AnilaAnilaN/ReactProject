import React from "react";
import HeroContact from "../components/contact/HeroContact";
import Map from "../components/contact/Map";  // <-- Import Map
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <HeroContact />

      {/* Map Section */}
      <Map />

      {/* Contact Information */}
      <ContactInfo />

      {/* Contact Form */}
      <ContactForm />
    </div>
  );
}
