import React, { useState, useEffect, useRef } from "react";
import BookCard from "../components/BookCard";
import BookModal from "../components/BookModal";
import "./home.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const [filter, setFilter] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const recognitionRef = useRef(null);

  // Voice recognition
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      handleSearch(transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  const startVoiceSearch = () => {
    if (recognitionRef.current) recognitionRef.current.start();
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSearch = async (inputQuery) => {
    const searchQuery = inputQuery ?? query;
    if (!searchQuery) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&page=${page}`
      );
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setBooks(data.docs || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Autocomplete suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) return setSuggestions([]);
      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5`
        );
        const data = await res.json();
        setSuggestions(data.docs || []);
      } catch {}
    };
    fetchSuggestions();
  }, [query]);

  // Toggle favorites
  const toggleFavorite = (book) => {
    setFavorites((prev) =>
      prev.some((b) => b.key === book.key)
        ? prev.filter((b) => b.key !== book.key)
        : [...prev, book]
    );
  };

  const isFavorite = (book) => favorites.some((b) => b.key === book.key);

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    setPage(newPage);
    handleSearch();
  };

  const filteredBooks = books.filter(
    (book) => !filter || book.subject?.includes(filter)
  );

  // Open modal
  const handleDetails = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className={`home-container ${darkMode ? "dark-mode" : ""}`}>
      <header className="home-header">
        <h1 className="home-title">📚 Welcome Alex!</h1>
        <p className="home-subtitle">Discover books, authors, and topics easily</p>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </header>

      <div className="search-wrapper">
        <form
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books..."
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
          <button
            type="button"
            className="voice-button"
            onClick={startVoiceSearch}
            title="Voice Search"
          >
            🎤
          </button>
        </form>

        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((book) => (
              <li
                key={book.key}
                onClick={() => {
                  setQuery(book.title);
                  setSuggestions([]);
                  handleSearch(book.title);
                }}
              >
                {book.title} - {book.author_name?.[0]}
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading && <p className="status-text">Loading books...</p>}
      {error && <p className="status-text error-text">Error: {error}</p>}

      <div className="books-grid">
        {filteredBooks.map((b) => (
          <BookCard
            key={b.key}
            book={b}
            onDetails={handleDetails}
            onToggleFav={toggleFavorite}
            isFavorite={isFavorite(b)}
          />
        ))}
      </div>

      {books.length > 0 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Prev</button>
          <span className="page-number">Page {page}</span>
          <button onClick={() => handlePageChange(page + 1)}>Next</button>
        </div>
      )}

      {favorites.length > 0 && (
        <section className="favorites-section">
          <h2 className="favorites-title">⭐ Favorites</h2>
          <div className="books-grid">
            {favorites.map((b) => (
              <BookCard
                key={b.key}
                book={b}
                onDetails={handleDetails}
                onToggleFav={toggleFavorite}
                isFavorite={true}
              />
            ))}
          </div>
        </section>
      )}

      {/* Book Modal */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          enableTTS={true}
        />
      )}
    </div>
  );
}
