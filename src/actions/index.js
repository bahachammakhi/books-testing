import Axios from "axios";
import * as types from "../types";

export const setSearchTerm = (term) => {
  return { type: "SET_SEARCH_TERM", term };
};
export const fetchBooks = () => {
  return (dispatch, getState) => {
    dispatch({ type: types.FETCH_BOOKS_PENDING });
    const state = getState();
    const { term } = state.list;
    return Axios.get(
      term
        ? `http://localhost:8080/books?q=${term}`
        : "http://localhost:8080/books"
    )
      .then((res) => {
        dispatch({ type: types.FETCH_BOOKS_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: types.FETCH_BOOKS_FAILED, err: err.message });
      });
  };
};

export const fetchABook = (id) => {
  console.log(id);
  return (dispatch, getState) => {
    dispatch({ type: types.FETCH_BOOK_PENDING });

    return Axios.get(`http://localhost:8080/books/${id}`)
      .then((res) => {
        dispatch({ type: types.FETCH_BOOK_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: types.FETCH_BOOK_FAILED, err: err.message });
      });
  };
};
