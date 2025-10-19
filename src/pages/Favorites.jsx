import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

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
          <div key={item.id} className="border rounded-lg shadow hover:shadow-lg transition p-4">
            <RecipeCard
              image={item.image}
              title={item.name}
              category={item.category}
              cuisine={item.cuisine}
              onClick={() => navigate(`/recipe/${item.id}`)}
            />
            <button
              onClick={() => removeFavorite(item.id)}
              className="mt-3 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
