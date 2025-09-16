import React from "react";
import "./Map.css";

export default function Map() {
  return (
    <section className="map-section">
      <h2>Find Us Here</h2>
      <div className="map-container">
        <iframe
          title="MeStore Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799199956!2d-74.25986568789892!3d40.69767006640766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDQyJzU0LjAiTiA3NMKwMTUnMzAuMCJX!5e0!3m2!1sen!2sus!4v1672837370422!5m2!1sen!2sus"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
