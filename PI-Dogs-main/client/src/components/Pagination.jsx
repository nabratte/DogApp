import React from "react";
import "./Styles/Home.css";

export default function Pagination({ dogsPerPage, allDogs, pagination }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="Pagination">
        {pageNumbers &&
          pageNumbers.map((number) => {
            return (
              <li className="PageNumber" key={number}>
                <h5 onClick={() => pagination(number)}>{number}</h5>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
