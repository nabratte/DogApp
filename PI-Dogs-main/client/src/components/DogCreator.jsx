import React, { useState } from "react";
import { Link } from "react-router-dom";
import { postDog } from "../actions";
import { useDispatch } from "react-redux";
import CheckBox from "./CheckBox";
import "./Styles/Home.css";
import claw from "./Images/Claw.png";

export default function CharacterCreate() {
  const dispatch = useDispatch();

  const [minMax, setMinMax] = useState({
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    lifeSpanMin: "",
    lifeSpanMax: "",
    temperament: [],
  });
  const [input, setInput] = useState({
    name: "",
    weight: "",
    height: "",
    life_span: "",
    temperament: [],
  });

  function handleSelect(e) {
    setMinMax({
      ...minMax,
      [e.target.name]: e.target.value,
    });
    console.log(minMax);

    let lifeSpanMax;
    if (e.target.name === "lifeSpanMax") lifeSpanMax = e.target.value;

    setInput({
      ...input,
      height: minMax.heightMin + " - " + minMax.heightMax,
      weight: minMax.weightMin + " - " + minMax.weightMax,
      life_span: minMax.lifeSpanMin + " - " + lifeSpanMax + " years",
    });
    console.log(input);
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    dispatch(postDog(input));
    setMinMax({
      heightMin: "",
      heightMax: "",
      weightMin: "",
      weightMax: "",
      lifeSpanMin: "",
      lifeSpanMax: "",
    });
    setInput({
      name: "",
      weight: "",
      height: "",
      life_span: "",
      temperament: [],
    });
    alert("Dog succesfully created!!");
  }

  function handleFilterTemperament(e) {
    //console.log(e);
    const newarr = e.map((e) => e.value);
    console.log(newarr);
    setInput({
      ...input,
      temperament: newarr,
    });
  }

  return (
    <div>
      <div className="TopBar">
        <div className="Logo">
          <img src={claw} alt="ClawLogo" className="ClawLogo" />
          <h3>The Dog App</h3>
        </div>
        <div className="Create">
          <Link to="/home">
            <button className="Button3">Home</button>
          </Link>
        </div>
      </div>
      <div className="GeneralsContainers">
        <h2>Create your own Dog</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="FilterContainer">
            <label>Dog:</label>
            <div className="Filter">
              <p>Dog breed</p>
              <input
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
                placeholder="Insert dog breed"
              />
            </div>
          </div>
          <div className="FilterContainer">
            <label>Weight:</label>
            <div className="Filter">
              <p>Min weight</p>
              <input
                type="text"
                value={minMax.weightMin}
                name="weightMin"
                onChange={(e) => handleSelect(e)}
                placeholder="Insert min breed weight"
                required
              />
            </div>
            <div className="Filter">
              <p>Max weight</p>
              <input
                type="text"
                value={minMax.weightMax}
                name="weightMax"
                onChange={(e) => handleSelect(e)}
                placeholder="Insert min breed weight"
              />
            </div>
          </div>
          <div className="FilterContainer">
            <label>Height:</label>
            <div className="Filter">
              <p>Min height</p>
              <input
                type="text"
                value={minMax.heightMin}
                name="heightMin"
                onChange={(e) => handleSelect(e)}
                placeholder="Insert min breed height"
              />
            </div>
            <div className="Filter">
              <p>Max height</p>
              <input
                type="text"
                value={minMax.heightMax}
                name="heightMax"
                onChange={(e) => handleSelect(e)}
                placeholder="Insert max breed height"
              />
            </div>
          </div>
          <div className="FilterContainer">
            <label>Life span:</label>
            <div className="Filter">
              <p>Min life span</p>
              <input
                type="text"
                value={minMax.lifeSpanMin}
                name="lifeSpanMin"
                onChange={(e) => handleSelect(e)}
                placeholder="Insert min breed life span"
              />
            </div>
            <div className="Filter">
              <p>Max life span</p>
              <input
                type="text"
                value={minMax.lifeSpanMax}
                name="lifeSpanMax"
                onChange={(e) => handleSelect(e)}
                placeholder="Insert max breed life span"
              />
            </div>
          </div>
          <div className="FilterContainer">
            <label>Temperaments</label>
            <div className="Filter">
              <CheckBox
                value={minMax.tempArr}
                name="tempArr"
                onChange={(e) => handleFilterTemperament(e)}
              />
            </div>
          </div>
          <div>
            <button className="Button" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
