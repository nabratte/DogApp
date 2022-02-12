import React, {useState,useEffect} from "react";
import {Link,useHistory} from "react-router-dom";
import { postDog } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import ChecBox from "./CheckBox";

export default function CharacterCreate(){
    const dispatch = useDispatch()
    const temperaments = useSelector((state)=>state.temperaments)

    const [input,setinput] = useState({
        name:"",
        weight:"",
        height:"",
        life_span:"",
        temperament:""
    })

    function handleChange (e){
        
    }

    return(
        <div>
            <Link to="/home">
                <button>Home</button>
            </Link>
            <h2>Create your own Dog</h2>
            <form >
                <div>
                    <label>Name:</label>
                    <div>
                        <input type="text" value={input.dogName}/>
                    </div>
                </div>
                <div>
                    <label>Weight:</label>
                    <div>
                        <p>Min weight</p>
                        <input type="text" value={input.minWeight}/>
                    </div>
                    <div>
                        <p>Max weight</p>
                        <input type="text" value={input.maxWeight}/>
                    </div>
                </div>
                <div>
                <label>Height:</label>
                    <div>
                        <p>Min height</p>
                        <input type="text" value={input.minHeight}/>
                    </div>
                    <div>
                        <p>Max height</p>
                        <input type="text" value={input.maxHeight}/>
                    </div>
                </div>
                <div>
                <label>Life span:</label>
                    <div>
                        <p>Min life span</p>
                        <input type="text" value={input.minLifeSpan}/>
                    </div>
                    <div>
                        <p>Max life span</p>
                        <input type="text" value={input.maxLifeSpan}/>
                    </div>
                    <div>
                        <label>Temperaments</label>
                        <ChecBox/>
                    </div>
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}