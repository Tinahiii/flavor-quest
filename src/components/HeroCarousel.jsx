import React, { useState, useEffect } from "react";

const HeroCarousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  // Automatically move to next slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h2>
            <p className="text-sm md:text-lg">{slide.subtitle}</p>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === i ? "bg-orange-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
