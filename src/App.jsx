// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import RecipeDetail from "./pages/RecipeDetail";
import Welcome from "./pages/Welcome";
import Navbar from "./components/Navbar";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // check on load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      {/* Show Navbar only if not mobile welcome page */}
      {!isMobile && <Navbar />}

      <Routes>
        {/* Mobile Welcome Page */}
        {isMobile && <Route path="/" element={<Welcome />} />}

        {/* Desktop & Mobile Routes */}
        {!isMobile && <Route path="/" element={<Home />} />}
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />

        {/* Redirect unknown paths to home or welcome */}
        <Route
          path="*"
          element={<Navigate to={isMobile ? "/" : "/"} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
