import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Remove a recipe from favorites
  const removeFavorite = (id) => {
    const updated = favorites.filter((recipe) => recipe.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (favorites.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold">Your Favorites ❤️</h1>
        <p className="mt-4 text-gray-600">No favorites yet. Add some from the home page!</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Favorites ❤️</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg shadow hover:shadow-lg transition p-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-3">{item.name}</h2>
            <p className="text-gray-600 mt-1">{item.description}</p>
            <p className="text-gray-500 text-sm mt-2">
              ⏱ {item.prepTime} prep | 🍳 {item.cookTime} cook
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => navigate(`/recipe/${item.id}`)}
                className="bg-blue-500 text-Black px-4 py-2 rounded hover:bg-blue-600 flex-1"
              >
                View Detail
              </button>
              <button
                onClick={() => removeFavorite(item.id)}
                className="bg-red-500 text-Black px-4 py-2 rounded hover:bg-red-600 flex-1"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
