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

  if (!recipe) return <p className="text-center mt-10">Recipe not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-64 object-cover rounded-md"
      />
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-3xl font-bold">{recipe.name}</h1>
        <button
          onClick={toggleFavorite}
          className={`px-4 py-2 rounded ${
            isFavorite ? "bg-red-500 text-Black hover:bg-red-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {isFavorite ? "❤️ Remove" : "🤍 Favorite"}
        </button>
      </div>

      <p className="mt-2 text-gray-600">{recipe.description}</p>
      <p className="text-gray-500 mt-1">
        ⏱ {recipe.prepTime} prep | 🍳 {recipe.cookTime} cook
      </p>
      <p className="mt-4 font-semibold">Servings: {recipe.servings}</p>

      <h2 className="mt-4 text-xl font-semibold">Ingredients:</h2>
      <ul className="list-disc list-inside mt-2">
        {recipe.ingredients.map((ing, index) => (
          <li key={index}>{ing}</li>
        ))}
      </ul>

      <h2 className="mt-4 text-xl font-semibold">Instructions:</h2>
      <ol className="list-decimal list-inside mt-2 space-y-1">
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetail;
