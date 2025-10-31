import React from "react";
import MaangImage from "../maangImage.webp";
import Testimonials from "../components/Testimonials";
import HeroSection from "../components/HeroSection";

export default function LandingPage() {
  return (
    <>
      <div className="text-center my-15 ">
        <img
          src={MaangImage}
          alt="Maang Logo"
          className="w-5xl h-auto rounded-lg m-auto transform transition-transform duration-500 hover:scale-105"
        />
        <h1 className="text-4xl font-bold my-8">Sprint to your dream tech job with confidence! </h1>
        <p className="font-semibold">Your ultimate accelerator for placements, learning, and interviews.</p>
        <div className="font-semibold">“We bring together a world-class curriculum, live mentorship, and a gamified, step-by-step growth path—designed to help you master coding tests, ace interviews, and land your dream tech job with confidence.”</div>
      </div>
      <Testimonials />
      <HeroSection />
    </>
  );
}

function Feature({ icon, name, desc }) {
  return (
    <div style={{ border: "1px solid #eaeaea", borderRadius: 12, padding: 28, minWidth: 180, textAlign: "center", background: '#f8fafc' }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontWeight: "bold" }}>{name}</div>
      <div>{desc}</div>
    </div>
  );
}
