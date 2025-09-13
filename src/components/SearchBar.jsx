import React from "react";

/**
 * Controlled search input with a search button.
 * Props:
 *  - query, setQuery, onSearch, placeholder
 */
const SearchBar = ({ query, setQuery, onSearch, placeholder = "Search books by title, author or ISBN..." }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <label htmlFor="book-search" className="sr-only">Search books</label>
      <div className="flex shadow-md rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
        <input
          id="book-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-5 py-3 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
        />
        <button
          onClick={onSearch}
          className="px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:opacity-95"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
