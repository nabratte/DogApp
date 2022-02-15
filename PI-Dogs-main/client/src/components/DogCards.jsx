import React from "react";
import { Link } from "react-router-dom";
import "./Styles/DogCard.css";

export default function DogCard({ name, weight, temperament, image, id }) {
  return (
    <div className="Card">
      <div className="imageContainer" key={image}>
        <img
          className="principalImage"
          src={image}
          alt="Not found"
          width="200px"
          height="200px"
        />
      </div>
      <div className="ButtonContainer">
        <Link to={`/details/${id}`}>
          <button className="button">See more</button>
        </Link>
      </div>
      <div className="InfoContainer">
        <h2>{name}</h2>
        <h5>Average weight</h5>
        <h5>{weight}</h5>
        <h5>Temperament:</h5>
        <h5>{temperament}</h5>
      </div>
    </div>
  );
}
