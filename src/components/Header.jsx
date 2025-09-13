import React, { useState, useEffect } from "react";

/**
 * Header with brand, search hint, and dark-mode toggle.
 * Persists dark mode in localStorage.
 */
const Header = () => {
  const [dark, setDark] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bf-dark")) ?? false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("bf-dark", JSON.stringify(dark));
  }, [dark]);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 px-4 rounded-b-xl shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-3xl">📚</div>
          <div>
            <div className="text-2xl font-extrabold tracking-tight">BookFinder</div>
            <div className="text-sm opacity-90">Search. Discover. Save. — powered by Open Library</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle dark mode"
            className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-full transition"
            title="Toggle dark mode"
          >
            {dark ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
