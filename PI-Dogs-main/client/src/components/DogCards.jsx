import React from "react";
import { Link } from "react-router-dom";

export default function DogCard({name,weight,temperament,image,id}){
    return(
        <div>
            <h2>{name}</h2>
            <h4>{weight}</h4>
            <h4>{temperament}</h4>
            <div className="imageContainer" key={image}>
            <img src={image} alt="Not found" width="200px" height="200px" />
            <Link to={`/dogs/${id}`} >
                <button>See more</button>
            </Link>
            </div>
        </div>
    )
}
