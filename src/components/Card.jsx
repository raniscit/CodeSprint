import React from "react";

const Card = ({ title, description, imageUrl }) => {
  return (
    <div className="flex flex-col md:flex-row max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Image Section */}
      {imageUrl && (
        <div className="md:w-1/2 w-full">
          <img
            src={imageUrl}
            alt={title}
            className="h-64 md:h-full w-full object-cover"
          />
        </div>
      )}

      {/* Text Section */}
      <div className="md:w-1/2 w-full p-6 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">{title}</h2>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default Card;
