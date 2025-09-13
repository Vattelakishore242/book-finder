import React from "react";
import "./Bookcard.css";

/**
 * BookCard accepts:
 *  - book: object returned by Open Library (partial)
 *  - onDetails(book)
 *  - onToggleFav(book)
 *  - isFavorite boolean
 */
const BookCard = ({ book, onDetails, onToggleFav, isFavorite }) => {
  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : `https://via.placeholder.com/300x420.png?text=No+Cover`;

  const subtitle = book.author_name?.[0] ?? "Unknown author";

  return (
    <article className="book-card">
      {/* Book Cover */}
      <img src={cover} alt={`${book.title} cover`} />

      {/* Book Info */}
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>{subtitle}</p>

        {/* Action Buttons */}
        <div className="card-buttons">
          <button className="details-btn" onClick={() => onDetails(book)}>
            Details
          </button>
          <button
            className={`fav-btn ${isFavorite ? "saved" : "not-saved"}`}
            onClick={() => onToggleFav(book)}
          >
            {isFavorite ? "♥ Saved" : "♡ Save"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
