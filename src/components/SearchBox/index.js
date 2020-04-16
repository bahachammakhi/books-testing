import React from "react";
import "./index.css";

const SearchBox = ({ term, onChange }) => {
  return (
    <input
      type="text"
      className="search"
      value={term}
      onChange={onChange}
      placeholder="Type to search"
    />
  );
};

export default SearchBox;
