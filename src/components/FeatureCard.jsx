import React from "react";

export default function FeatureCard({ title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-[#22223b] hover:bg-[#4a4e69] cursor-pointer rounded-2xl p-6 w-64 text-center transition-transform hover:scale-105"
    >
      <h3 className="text-[#c9ada7] text-lg font-bold mb-2">{title}</h3>
      <p className="text-[#f2e9e4] text-sm">{desc}</p>
    </div>
  );
}
