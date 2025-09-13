import React, { useEffect } from "react";

/**
 * Modal to show deeper book details
 */
const BookModal = ({ book, onClose, enableTTS }) => {
  if (!book) return null;

  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : `https://via.placeholder.com/400x600.png?text=No+Cover`;

  const summaryText = `${book.title}. Authors: ${book.author_name?.join(", ") || "Unknown"}. First published: ${book.first_publish_year || "N/A"}. Subjects: ${book.subject?.slice(0, 8).join(", ") || "N/A"}.`;

  // Text-to-Speech
  const handleListen = () => {
    if (!("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(summaryText);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  // Alt+L shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (enableTTS && e.altKey && e.key.toLowerCase() === "l") {
        handleListen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [book, enableTTS]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative max-w-3xl w-full glass rounded-3xl overflow-hidden shadow-2xl">
        <div className="md:flex">
          <div className="md:w-1/3 p-4">
            <img className="w-full rounded-xl shadow" src={cover} alt={book.title} />
          </div>
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{book.title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">{book.author_name?.join(", ") || "Unknown"}</p>
                <p className="text-xs text-slate-400 mt-2">First published: {book.first_publish_year || "N/A"}</p>
                <p className="text-xs text-slate-400 mt-1">OpenLibrary ID: {book.key}</p>
                <p className="text-sm text-slate-700 dark:text-slate-200 mt-3">
                  Subjects: {book.subject ? book.subject.slice(0, 8).join(", ") : "N/A"}
                </p>
              </div>
              <button onClick={onClose} className="text-xl font-bold px-2 text-slate-600 dark:text-slate-300">×</button>
            </div>

            <div className="mt-6 flex gap-3 flex-wrap">
              {enableTTS && (
                <button onClick={handleListen} className="listen-button px-4 py-2 bg-green-600 text-white rounded-lg">
                  Listen 📢
                </button>
              )}

              <a
                href={`https://openlibrary.org${book.key}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg"
              >
                View on OpenLibrary
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
