// src/utils/api.js
export const fetchRecipes = async (searchQuery = "") => {
  try {
    const url = searchQuery
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      : `https://www.themealdb.com/api/json/v1/1/search.php?s=`;

    const res = await fetch(url);
    const data = await res.json();

    // Transform data to match our previous structure
    return data.meals?.map((meal) => ({
      id: meal.idMeal,
      name: meal.strMeal,
      description: meal.strInstructions.slice(0, 100) + "...",
      prepTime: "N/A", // API does not provide prepTime
      cookTime: "N/A", // API does not provide cookTime
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
    })) || [];
  } catch (err) {
    console.error("Error fetching recipes:", err);
    return [];
  }
};
