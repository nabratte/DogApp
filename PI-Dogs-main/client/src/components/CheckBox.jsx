import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../actions";
import "./Styles/CheckBox.css";

let arr = [];

export default function CheckBox({ onChange }) {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.allTemperaments);
  const arrTemperaments = allTemperaments?.map((e) => {
    return { value: e.name, label: e.name, key: e.name };
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function showChanges(e) {
    console.log(e);
    e.target.checked
      ? arr.push(e.target)
      : (arr = arr.filter((t) => t !== e.target));
  }

  return (
    <div className="dropdown">
      <button className="dropbtn">Select Temperaments</button>
      <div className="dropdown-content">
        <form onChange={(e) => onChange(arr)}>
          <fieldset onChange={(e) => showChanges(e)}>
            {allTemperaments?.map((e) => {
              return (
                <div>
                  <label className="label">
                    <input
                      className="input"
                      type="checkbox"
                      name={e.name}
                      value={e.name}
                      key={e.name}
                    />
                    {e.name}
                  </label>
                </div>
              );
            })}
          </fieldset>
        </form>
      </div>
    </div>
  );
}
