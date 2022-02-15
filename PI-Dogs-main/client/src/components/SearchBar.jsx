import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../actions";
import "./Styles/Home.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchByName(name));
  }
  return (
    <div className="SearchBar">
      <input
        className="PlaceHolder"
        type="text"
        placeholder="Insert a breed"
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className="Button2"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
