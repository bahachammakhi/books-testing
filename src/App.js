import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import BookListContainer from "./containers/BookListContainer";
import BookDetailContainer from "./containers/BookDetailContainer";

// page 128
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <h1>Bookish</h1>
          <Route exact path="/" component={BookListContainer} />
          <Route path="/books/:id" component={BookDetailContainer} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
