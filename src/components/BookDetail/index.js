import React from "react";

const BookDetail = ({ book, loading }) => {
  if (loading) return <div>loading</div>;
  return (
    <div className="detail">
      <h2 className="name">{book?.name}</h2>
      <div className="description">
        {book?.description ? book.description : book?.name}
      </div>
    </div>
  );
};

export default BookDetail;
