import React from "react";

export default function Pagination({dogsPerPage,allDogs,pagination}){
    const pageNumbers = [];
    
    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul className="pagination">
                {pageNumbers && 
                pageNumbers.map(number=>{
                    return(
                        <li className="pageNumber" key={number}>                    
                            <h5 onClick={()=>pagination(number)}>{number}</h5>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}