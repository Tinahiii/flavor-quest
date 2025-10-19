import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import RecipeCard from "../components/RecipeCard";
import { mockData } from "../utils/mockData";

const Home = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    cuisine: [],
    diet: [],
  });
  const [randomRecipes, setRandomRecipes] = useState([]);

  const navigate = useNavigate();

  const filteredData = mockData
    .filter((recipe) => {
      const searchTerms = query
        .toLowerCase()
        .split(",")
        .map((term) => term.trim())
        .filter((term) => term.length > 0);

      if (searchTerms.length === 0) return true;

      return searchTerms.some(
        (term) =>
          recipe.name.toLowerCase().includes(term) ||
          recipe.ingredients.some((ing) => ing.toLowerCase().includes(term))
      );
    })
    .filter((recipe) => {
      if (filters.cuisine.length > 0 && !filters.cuisine.includes(recipe.cuisine))
        return false;
      if (filters.diet.length > 0 && !filters.diet.includes(recipe.diet))
        return false;
      return true;
    });

  const getRandomRecipes = () => {
    return [...mockData].sort(() => 0.5 - Math.random()).slice(0, 3);
  };

  useEffect(() => {
    setRandomRecipes(getRandomRecipes());
  }, []);

  const handleSurprise = () => {
    setRandomRecipes(getRandomRecipes());
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600">
        Flavor Quest 🍽️
      </h1>
      <p className="text-center mt-2 text-gray-600">
        Search by dish name or ingredients (use commas for multiple ingredients)
      </p>

      <SearchBar query={query} setQuery={setQuery} />
      <Filters filters={filters} setFilters={setFilters} />

      {/* --- SEARCH RESULTS --- */}
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
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
            No recipes found. Try another keyword or ingredient.
          </p>
        )}
      </div>

      {/* --- ARE YOU FEELING HUNGRY SECTION --- */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Are you feeling hungry? 🍴
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
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
