import React from "react";
import { Link } from "react-router-dom";
import "./Styles/Landing.css";
import dogprofile from "./Images/DogLogoVector.png";
import claw from "./Images/Claw.png";

export default function LandingPage() {
  return (
    <div className="GeneralsContainer">
      <div className="TopBars">
        <img src={claw} alt="ClawLogo" className="ClawLogo" />
        <h3>The Dog App</h3>
      </div>
      <div className="ImagenContainer">
        <div className="ProfileContainer">
          <img src={dogprofile} alt="Image not found" className="DogProfile" />
        </div>
        <div className="CentralBar">
          <h1>Wellcome to the DogApp</h1>
          <div className="ButtonHolder">
            <Link to="/home">
              <button className="Button">Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
