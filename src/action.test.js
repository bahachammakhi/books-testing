import configureMockStore from "redux-mock-store";
import { setSearchTerm, fetchBooks, fetchABook } from "./actions";
import * as types from "./types";
import thunk from "redux-thunk";
import Axios from "axios";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("BookListContainer related actions ", () => {
  it("Set search keyword", () => {
    const term = "";
    const expected = {
      type: types.SET_SEARCH_TERM,
      term,
    };
    const action = setSearchTerm(term);
    expect(action).toEqual(expected);
  });

  it("Fetch data successfully", () => {
    const books = [
      { id: 1, name: "Refactoring" },
      { id: 2, name: "Domain-driven design" },
    ];
    Axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }));

    const expectedActions = [
      { type: types.FETCH_BOOKS_PENDING },
      { type: types.FETCH_BOOKS_SUCCESS, payload: books },
    ];
    const store = mockStore({ list: { books: [], term: "" } });
    return store.dispatch(fetchBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("Fetch data with error", () => {
    Axios.get = jest
      .fn()
      .mockImplementation(() =>
        Promise.reject({ message: "Something went wrong" })
      );
    const expectedActions = [
      { type: types.FETCH_BOOKS_PENDING },
      { type: types.FETCH_BOOKS_FAILED, err: "Something went wrong" },
    ];
    const store = mockStore({ list: { books: [], term: "" } });
    return store.dispatch(fetchBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("Search data with term in state", () => {
    const books = [
      { id: 1, name: "Refactoring" },
      { id: 2, name: "Domain-driven design" },
    ];
    Axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }));
    const expectedActions = [
      { type: types.FETCH_BOOKS_PENDING },
      { type: types.FETCH_BOOKS_SUCCESS, payload: books },
    ];
    const store = mockStore({ list: { books: [], term: "domain" } });
    return store.dispatch(fetchBooks("")).then(() => {
      expect(Axios.get).toHaveBeenCalledWith(
        "http://localhost:8080/books?q=domain"
      );
    });
  });
  it("Fetch book by id", () => {
    const book = { id: 1, name: "Refactoring" };
    Axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: book }));
    const store = mockStore({ list: { books: [], term: "" } });
    return store.dispatch(fetchABook(1)).then(() => {
      expect(Axios.get).toHaveBeenCalledWith("http://localhost:8080/books/1");
    });
  });

  // it("Fetcha book from remote", () => {
  //   const books = [
  //     { id: 1, name: "Refactoring" },
  //     { id: 2, name: "Domain-driven design" },
  //   ];
  //   Axios.get = jest
  //     .fn()
  //     .mockImplementation(() => Promise.resolve({ data: books[0] }));
  //   const store = mockStore({ list: { books: [], term: "", current: {} } });

  //   return store.dispatch(fetchABook(1)).then(() => {
  //     const state = store.getState();
  //     expect(state.list.current).toEqual(books[0]);
  //   });
  // });
});
