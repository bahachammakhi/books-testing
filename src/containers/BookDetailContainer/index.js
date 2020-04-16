import React, { useEffect, useState } from "react";
import BookDetail from "../../components/BookDetail";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchABook } from "../../actions";

export const BookDetailContainer = ({ match, fetchABook, book, loading }) => {
  useEffect(
    () => {
      const id = match.params.id;
      fetchABook(id);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return <BookDetail loading={loading} book={book} />;
};

const mapStateToProps = (state) => ({
  book: state.list.current,
  loading: state.list.loading,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchABook,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookDetailContainer);
