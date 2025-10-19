import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { mockData } from "../utils/mockData";

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = mockData.find((r) => r.id === parseInt(id));

  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Save favorites to localStorage
  const updateFavorites = (updatedFavorites) => {
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Toggle favorite
  const toggleFavorite = () => {
    const isFav = favorites.some((fav) => fav.id === recipe.id);
    if (isFav) {
      const updated = favorites.filter((fav) => fav.id !== recipe.id);
      updateFavorites(updated);
    } else {
      updateFavorites([...favorites, recipe]);
    }
  };

  const isFavorite = favorites.some((fav) => fav.id === recipe.id);

  if (!recipe)
    return <p className="text-center mt-10 text-red-500">Recipe not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* --- IMAGE --- */}
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-64 object-cover rounded-md shadow-md"
      />

      {/* --- HEADER + FAVORITE BUTTON --- */}
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-3xl font-bold">{recipe.name}</h1>
        <button
          onClick={toggleFavorite}
          className={`px-4 py-2 rounded text-white ${
            isFavorite
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
        >
          {isFavorite ? "❤️ Remove" : "🤍 Favorite"}
        </button>
      </div>

      {/* --- CATEGORY & CUISINE --- */}
      <p className="mt-2 text-gray-700 italic">
        <strong>Category:</strong> {recipe.category || "N/A"} |{" "}
        <strong>Cuisine:</strong> {recipe.cuisine || "N/A"}
      </p>

      {/* --- DESCRIPTION --- */}
      <p className="mt-3 text-gray-600">{recipe.description}</p>
      <p className="text-gray-500 mt-1">
        ⏱ {recipe.prepTime} prep | 🍳 {recipe.cookTime} cook
      </p>
      <p className="mt-2 font-semibold">Servings: {recipe.servings}</p>

      {/* --- INGREDIENTS --- */}
      <h2 className="mt-6 text-xl font-semibold border-b pb-2">Ingredients:</h2>
      <ul className="list-disc list-inside mt-2 space-y-1">
        {recipe.ingredients.map((ing, index) => (
          <li key={index}>{ing}</li>
        ))}
      </ul>

      {/* --- INSTRUCTIONS --- */}
      <h2 className="mt-6 text-xl font-semibold border-b pb-2">Instructions:</h2>
      <ol className="list-decimal list-inside mt-2 space-y-1">
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      {/* --- YOUTUBE VIDEO --- */}
      {recipe.youtube && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Watch Tutorial 🎥</h2>
          <iframe
            className="w-full h-64 rounded-md"
            src={`https://www.youtube.com/embed/${recipe.youtube.split("v=")[1]}`}
            title="Recipe Video"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* --- SOURCE LINK --- */}
      {recipe.source && (
        <div className="mt-6">
          <a
            href={recipe.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            🔗 View full recipe on TheMealDB
          </a>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
