import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await res.json();
      const meal = data.meals[0];

      setRecipe({
        id: meal.idMeal,
        name: meal.strMeal,
        description: meal.strInstructions.slice(0, 100) + "...",
        prepTime: "N/A",
        cookTime: "N/A",
        servings: "N/A",
        ingredients: Array.from({ length: 20 }, (_, i) => {
          const ingredient = meal[`strIngredient${i + 1}`];
          const measure = meal[`strMeasure${i + 1}`];
          return ingredient ? `${ingredient} - ${measure}` : null;
        }).filter(Boolean),
        instructions: meal.strInstructions.split(/\r?\n/).filter(Boolean),
        category: meal.strCategory,
        cuisine: meal.strArea,
        image: meal.strMealThumb,
        youtube: meal.strYoutube,
        source: meal.strSource,
      });
    };

    fetchRecipe();

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, [id]);

  const toggleFavorite = () => {
    const isFav = favorites.some((fav) => fav.id === recipe.id);
    const updated = isFav
      ? favorites.filter((fav) => fav.id !== recipe.id)
      : [...favorites, recipe];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (!recipe)
    return <p className="text-center mt-10 text-red-500">Loading...</p>;

  const isFavorite = favorites.some((fav) => fav.id === recipe.id);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* IMAGE */}
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-64 object-cover rounded-md shadow-md"
      />

      {/* HEADER + FAVORITE BUTTON */}
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-3xl font-bold">{recipe.name}</h1>
        <button
          onClick={toggleFavorite}
          className={`px-4 py-2 rounded text-white ${
            isFavorite ? "bg-red-500 hover:bg-red-600" : "bg-gray-400 hover:bg-gray-500"
          }`}
        >
          {isFavorite ? "❤️ Remove" : "🤍 Favorite"}
        </button>
      </div>

      {/* CATEGORY & CUISINE */}
      <p className="mt-2 text-gray-700 italic">
        <strong>Category:</strong> {recipe.category} | <strong>Cuisine:</strong> {recipe.cuisine}
      </p>

      {/* DESCRIPTION */}
      <p className="mt-3 text-gray-600">{recipe.description}</p>
      <p className="text-gray-500 mt-1">
        ⏱ {recipe.prepTime} prep | 🍳 {recipe.cookTime} cook
      </p>
      <p className="mt-2 font-semibold">Servings: {recipe.servings}</p>

      {/* INGREDIENTS */}
      <h2 className="mt-6 text-xl font-semibold border-b pb-2">Ingredients:</h2>
      <ul className="list-disc list-inside mt-2 space-y-1">
        {recipe.ingredients.map((ing, index) => (
          <li key={index}>{ing}</li>
        ))}
      </ul>

      {/* INSTRUCTIONS */}
      <h2 className="mt-6 text-xl font-semibold border-b pb-2">Instructions:</h2>
      <ol className="list-decimal list-inside mt-2 space-y-1">
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      {/* YOUTUBE VIDEO */}
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

      {/* SOURCE LINK */}
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
