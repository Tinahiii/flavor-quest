// src/components/SearchBar.jsx
import React from "react";

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="flex justify-center mt-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by dish name or ingredients..."
        className="w-full md:w-1/2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default SearchBar;
