import React from "react";
import { useNavigate } from "react-router-dom";

import ClassicPreview from "../Classic_page-0001.jpg";
import ModernPreview from "../Modern_page-0001.jpg";
import MinimalPreview from "../Minimal_page-0001.jpg";

export default function TemplateSelect() {
  const navigate = useNavigate();
  const templates = [
    { id: "modern", name: "Modern", preview: ModernPreview },
    { id: "classic", name: "Classic", preview: ClassicPreview },
    { id: "minimal", name: "Minimal", preview: MinimalPreview },
  ];

  return (
    <div className=" bg-linear-to-br from-gray-50 to-gray-100 flex justify-center items-center p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {templates.map((t) => (
          <div
            key={t.id}
            onClick={() => navigate(`/builder/${t.id}`)}
            className="group border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
          >
            <div className="flex justify-center items-center bg-gray-50 p-3 overflow-hidden">
              <img
                src={t.preview}
                alt={t.name}
                className="max-h-64 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5 text-center">
              <h2 className="font-semibold text-xl text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                {t.name}
              </h2>
              <p className="text-gray-500 mt-2 text-sm">Click to customize</p>
            </div>
          </div>
        ))}
      </div>
    </div>


  );
}
