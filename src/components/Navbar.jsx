// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center">
              {/* simple emoji logo - replace with svg if you have an asset */}
              <span className="text-2xl">🍊</span>
            </div>
            <div>
              <div className="h-fancy text-xl text-orange-600">Flavor Quest</div>
              <div className="text-xs text-gray-500 -mt-1">Find tasty recipes</div>
            </div>
          </Link>

          {/* Links (desktop) */}
          <nav className="hidden md:flex items-center gap-3">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md ${isActive("/") ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}
            >
              Home
            </Link>

            <Link
              to="/favorites"
              className={`px-3 py-2 rounded-md ${isActive("/favorites") ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}
            >
              Favorites
            </Link>
          </nav>

          {/* Mobile icon navigation (simple) */}
          <div className="md:hidden flex gap-2">
            <Link to="/" className="p-2 rounded-md bg-gray-100">
              🏠
            </Link>
            <Link to="/favorites" className="p-2 rounded-md bg-gray-100">
              ❤️
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
