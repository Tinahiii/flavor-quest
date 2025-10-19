import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { mockData } from "../utils/mockData";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const carouselImages = favorites.length > 0 ? favorites : mockData.slice(0, 5);

  // Automatic sliding every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Smooth slide effect
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${carouselIndex * 100}%)`;
    }
  }, [carouselIndex]);

  const removeFavorite = (id) => {
    const updated = favorites.filter((recipe) => recipe.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      {/* --- HERO CAROUSEL --- */}
      <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-md mb-6">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ width: `${carouselImages.length * 100}%` }}
        >
          {carouselImages.map((item) => (
            <img
              key={item.id}
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
        <div className="absolute bottom-4 left-4 bg-orange-500 bg-opacity-70 text-white px-3 py-1 rounded font-semibold">
          {favorites.length > 0 ? "Your Favorites ❤️" : "Discover Delicious Dishes 🍴"}
        </div>
      </div>

      {/* --- FAVORITES GRID --- */}
      {favorites.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>No favorites yet. Add some from the home page!</p>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-center mb-6">Your Favorites ❤️</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg shadow hover:shadow-lg transition p-4"
              >
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
      )}
    </div>
  );
};

export default Favorites;
