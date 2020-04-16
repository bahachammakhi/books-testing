import React from "react";
import "./index.css";

function BookList({ books, loading, error }) {
  if (loading) {
    return <div className="loading">Loading</div>;
  }
  if (error) return <div className="error">Error</div>;
  return (
    <div className="books">
      {books.map((book) => {
        return (
          <div key={book.id} className="book">
            <h2 className="title">{book.name}</h2>
            <a href={`/books/${book.id}`} className="view-detail">
              View Detail
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default BookList;
