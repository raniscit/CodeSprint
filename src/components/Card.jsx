import React from "react";

const Card = ({ title, description, imageUrl }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 ">
        {/* Image Section */}
        {imageUrl && (
          <div className="md:w-1/2 w-full">
            <img
              src={imageUrl}
              alt={title}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Text Section */}
        <div className="md:w-1/2 w-full p-6 flex flex-col justify-center bg-[#22223b]">
          <h2 className="text-2xl font-semibold text-[#c9ada7] mb-3">{title}</h2>
          <p className="text-[#f2e9e4] leading-relaxed">{description}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
