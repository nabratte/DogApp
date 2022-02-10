import React from "react";

export default function DogCard({image,name,temperament,weight}){
    return(
        <div>
            <h2>{name}</h2>
            <h4>{weight}</h4>
            <h4>{temperament}</h4>
            <div className="imageContainer" key={image}>
            <img src={image} alt="Not found" width="200px" height="200px" />
            </div>
        </div>
    )
}
