import React from "react";

const Filters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {
      setFilters({
        ...filters,
        [name]: checked
          ? [...filters[name], value]
          : filters[name].filter((v) => v !== value),
      });
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md my-4 flex flex-wrap gap-4 justify-center">
      {/* Cuisine Filters */}
      <div>
        <h3 className="font-semibold mb-1">Cuisine</h3>
        {["Italian", "Mexican", "Asian"].map((c) => (
          <label key={c} className="mr-2">
            <input
              type="checkbox"
              name="cuisine"
              value={c}
              checked={filters.cuisine.includes(c)}
              onChange={handleChange}
              className="mr-1"
            />
            {c}
          </label>
        ))}
      </div>

      {/* Dietary Filters */}
      <div>
        <h3 className="font-semibold mb-1">Diet</h3>
        {["Vegetarian", "Vegan", "Gluten-free"].map((d) => (
          <label key={d} className="mr-2">
            <input
              type="checkbox"
              name="diet"
              value={d}
              checked={filters.diet.includes(d)}
              onChange={handleChange}
              className="mr-1"
            />
            {d}
          </label>
        ))}
      </div>

      {/* Optional: Cooking time filter */}
      {/* You can add here if mockData provides numeric cookTime */}
    </div>
  );
};

export default Filters;
