import React from "react";
import MaangImage from "../maangImage.webp"; 
import Testimonials from "../components/Testimonials";
import HeroSection from "../components/HeroSection";

export default function Dashboard() {
  return (
    <>
    <div className="text-center mt-16">
      <img src={MaangImage} alt="Maang Logo" className="w-5xl h-auto rounded-lg m-auto" />
      <h1  className="text-4xl font-bold my-3">Cracking Top Software Jobs made Simple!</h1>
      <p>Your placement, learning and interview accelerator.</p>
      <div>We combine a world-class curriculum, live mentorship, and a step-by-step gamified growth process to ensure you can crack any coding test or interview with confidence !</div>
    </div>
    <Testimonials/>
    <HeroSection/>
    </>
  );
}

function Feature({icon, name, desc}) {
  return (
    <div style={{border: "1px solid #eaeaea", borderRadius: 12, padding: 28, minWidth: 180, textAlign: "center", background:'#f8fafc'}}>
      <div style={{fontSize: 40, marginBottom: 12}}>{icon}</div>
      <div style={{fontWeight: "bold"}}>{name}</div>
      <div>{desc}</div>
    </div>
  );
}
