import React, { useEffect, useState } from "react";
import BookList from "../../components/BookList";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SearchBox from "../../components/SearchBox/index";
import { setSearchTerm, fetchBooks } from "../../actions";

export function BookListContainer({
  setSearchTerm,
  fetchBooks,
  term,
  books,
  loading,
  error,
}) {
  useEffect(
    () => {
      fetchBooks();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  console.log("^props", books, term, loading, error);
  const filterBook = (e) => {
    setSearchTerm(e.target.value);
    fetchBooks(e.target.value);
  };

  return (
    <div>
      <SearchBox term={term} onChange={filterBook} />
      <BookList books={books ? books : []} loading={loading} error={error} />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    loading: state.list.loading,
    books: state.list.books,
    error: state.list.error,
    term: state.list.term,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setSearchTerm,
      fetchBooks,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BookListContainer);
