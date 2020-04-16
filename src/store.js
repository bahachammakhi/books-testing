import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import list from "./reducers";

const rootReducers = combineReducers({
  list,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducers,
  {
    list: {
      term: "",
      books: [],
      loading: true,
      current: {},
      error: "",
    },
  },
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
