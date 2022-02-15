import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import "./Styles/Details.css";
import claw from "./Images/Claw.png";

export default function Details() {
  let id = useParams();
  console.log(id.id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(id.id));
  }, [dispatch, id.id]);
  const myDog = useSelector((state) => state.detail);

  console.log(myDog[0]);
  return (
    <div className="Container">
      {myDog.length > 0 ? (
        <div className="Cards">
          <div className="TopsBar">
            <img src={claw} alt="Logo" className="ClawLogo" />
            <h3>The Dog App</h3>
          </div>
          <div className="ImageAndData">
            <div className="ImagePlace">
              <img
                className="imageHolder"
                src={myDog[0].img ? myDog[0].img : myDog[0].image}
                alt="Image not found"
              />
            </div>
            <div className="InfosContainer">
              <h1>{myDog[0].name}</h1>
              <h4>Weight: {myDog[0].weight} kg</h4>
              <h4>
                Height:{" "}
                {myDog[0].height.metric
                  ? myDog[0].height.metric
                  : myDog[0].height}{" "}
                cm
              </h4>
              <h4>Life Span: {myDog[0].life_span}</h4>
              {myDog[0].fromDataBase ? (
                <h4>
                  Temperaments:{" "}
                  {myDog[0].temperaments.map((e) => e.name).join(", ")}
                </h4>
              ) : (
                <h4>Temperaments: {myDog[0].temperament}</h4>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      <div className="ButtonContainer">
        <Link to={"/home"}>
          <button className="Buttons">Back to Home</button>
        </Link>
      </div>
    </div>
  );
}
