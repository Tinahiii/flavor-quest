// src/pages/Welcome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaHeart } from "react-icons/fa";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="block md:hidden h-screen w-full bg-orange-400 flex flex-col items-center justify-center px-6">
      {/* App Name */}
      <h1 className="text-5xl font-fancy text-white mb-8 text-center">
        Flavor Quest 🍽️
      </h1>

      {/* Short Welcome Message */}
      <p className="text-white text-center text-lg mb-12">
        Discover delicious recipes and save your favorites!
      </p>

      {/* Navigation Icons */}
      <div className="flex gap-12">
        <button
          onClick={() => navigate("/home")}
          className="flex flex-col items-center text-white hover:text-yellow-200 transition"
        >
          <FaHome size={40} />
          <span className="mt-2 font-semibold">Home</span>
        </button>

        <button
          onClick={() => navigate("/favorites")}
          className="flex flex-col items-center text-white hover:text-yellow-200 transition"
        >
          <FaHeart size={40} />
          <span className="mt-2 font-semibold">Favorites</span>
        </button>
      </div>
    </div>
  );
};

export default Welcome;
