// src/components/RecipeCard.jsx
import React from "react";

const RecipeCard = ({ image, title, category, cuisine, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Category:</span> {category || "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Cuisine:</span> {cuisine || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
