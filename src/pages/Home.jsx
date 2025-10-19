import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ cuisine: [], diet: [] });
  const [randomRecipes, setRandomRecipes] = useState([]);
  const navigate = useNavigate();

  // Fetch recipes from API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );
        const data = await res.json();
        if (data.meals) {
          const formatted = data.meals.map((meal) => ({
            id: meal.idMeal,
            name: meal.strMeal,
            description: meal.strInstructions
              ? meal.strInstructions.slice(0, 100) + "..."
              : "No description available.",
            prepTime: "N/A",
            cookTime: "N/A",
            servings: "N/A",
            category: meal.strCategory,
            cuisine: meal.strArea,
            image: meal.strMealThumb,
            youtube: meal.strYoutube,
            source: meal.strSource,
          }));
          setRecipes(formatted);
          setRandomRecipes(formatted.sort(() => 0.5 - Math.random()).slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };
    fetchRecipes();
  }, []);

  // Filter Logic
  const filteredRecipes = recipes
    .filter((recipe) => {
      if (!query) return true;
      return (
        recipe.name.toLowerCase().includes(query.toLowerCase()) ||
        (recipe.description &&
          recipe.description.toLowerCase().includes(query.toLowerCase()))
      );
    })
    .filter((recipe) => {
      if (filters.cuisine.length && !filters.cuisine.includes(recipe.cuisine))
        return false;

      if (filters.diet.length) {
        const dietMap = {
          Vegetarian: ["Vegetarian", "Side", "Dessert"],
          Vegan: ["Vegan", "Vegetarian"],
          "Gluten-free": ["Beef", "Chicken", "Seafood"], // example mapping
        };
        const matched = filters.diet.some((d) => dietMap[d]?.includes(recipe.category));
        if (!matched) return false;
      }

      return true;
    });

  const handleSurprise = () => {
    setRandomRecipes(recipes.sort(() => 0.5 - Math.random()).slice(0, 3));
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center text-orange-500">
        Flavor Quest 🍽️
      </h1>
      <p className="text-center mt-2 text-gray-600">
        Search by dish name or ingredients (use commas for multiple ingredients)
      </p>

      <SearchBar query={query} setQuery={setQuery} />
      <Filters filters={filters} setFilters={setFilters} />

      {/* --- SEARCH RESULTS --- */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((item) => (
            <RecipeCard
              key={item.id}
              image={item.image}
              title={item.name}
              category={item.category}
              cuisine={item.cuisine}
              onClick={() => navigate(`/recipe/${item.id}`)}
            />
          ))
        ) : (
          <p className="text-center text-red-500 mt-10">
            No recipes found. Try another keyword or filter.
          </p>
        )}
      </div>

      {/* --- RANDOM RECIPES --- */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Are you feeling hungry? 🍴
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {randomRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              image={recipe.image}
              title={recipe.name}
              category={recipe.category}
              cuisine={recipe.cuisine}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            />
          ))}
        </div>
        <div className="text-center mt-6">
          <button
            onClick={handleSurprise}
            className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600 transition"
          >
            Surprise Me Again 🍳
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
