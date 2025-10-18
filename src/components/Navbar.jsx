import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `px-4 py-2 rounded ${
      location.pathname === path
        ? "bg-White-500 text-Black"
        : "bg-white-200 text-Black-800 hover:bg-gray-300"
    }`;

  return (
    <nav className="bg-white shadow p-4 flex justify-center gap-4 sticky top-0 z-50">
      <Link to="/" className={linkClass("/")}>
        Home
      </Link>
      <Link to="/favorites" className={linkClass("/favorites")}>
        Favorites ❤️
      </Link>
    </nav>
  );
};

export default Navbar;
