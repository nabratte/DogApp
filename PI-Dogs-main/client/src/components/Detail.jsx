import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function Details(props){
    console.log(props)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    },[dispatch])

    const myDog = useSelector((state)=>state.detail)

    return( 
        <div>
            {
                myDog.length>0?
                <div>                    
                    <h1>{myDog[0].name}</h1>
                    <img src={myDog[0].img? myDog[0].img:myDog[0].image} alt="Image not found"/>
                    <h3>Weight:{myDog[0].weight}</h3>
                    <h3>Height:{myDog[0].height}</h3>
                    <h3>Life Span:{myDog[0].life_span}</h3>
                    <h3>Temperaments:{myDog[0].temperament}</h3>
                </div>
                :
                <h1>Loading...</h1>
            }
            <Link to={'/home'}>
                <button>
                    Back to Home
                </button>
            </Link>
        </div>
    )
}