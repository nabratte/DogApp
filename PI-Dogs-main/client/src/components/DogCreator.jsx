import React, { useState} from "react";
import {Link , Navigate} from "react-router-dom";
import {postDog  } from "../actions";
import {useDispatch} from "react-redux";
import CheckBox from "./CheckBox";

export default function CharacterCreate(){
    const dispatch = useDispatch()

    function navigate(rute){
        return <Navigate to = {rute} />;
    }

    const [minMax,setMinMax] = useState({
        heightMin:"",
        heightMax:"",
        weightMin:"",
        weightMax:"",
        lifeSpanMin:"",
        lifeSpanMax:"",
    })
    const [input,setInput] = useState({
        name:"",
        weight:"",
        height:"",
        life_span:"",
        temperament:[]
    })

    function handleSelect (e){
        console.log(e)
        setMinMax({
            ...minMax,
            [e.target.name]:e.target.value
        })
        setInput({
            ...input,
            height:minMax.minHeight+" - "+minMax.maxHeight,
            weight:minMax.weightMin+" - "+minMax.weightMax,
            life_span:minMax.lifeSpanMin+" - "+minMax.lifeSpanMax+ "years",
        })
    }

    function handleChange (e){
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]:e.target.value
        });
    }

    function handleSubmit (e){
        e.preventDefault();
        dispatch(postDog(input))
        setMinMax({
            heightMin:"",
            heightMax:"",
            weightMin:"",
            weightMax:"",
            lifeSpanMin:"",
            lifeSpanMax:"",
        });
        setInput({
            name:"",
            weight:"",
            height:"",
            life_span:"",
            temperament:[]
        });
        navigate('/home');
    }

    function handleFilterTemperament(e){
        console.log(e)
        const newarr=e.map(e=>e.value)
        console.log(newarr)
        setInput({
            ...input,
            temperament:newarr
        }) 
    }


    return(
        <div>
            <Link to="/home">
                <button>Home</button>
            </Link>
            <h2>Create your own Dog</h2>
            <form onSubmit={e=>handleSubmit(e)}>
                <div>
                    <label>Dog:</label>
                    <div>
                        <p>Dog breed</p>
                        <input type="text"  value={input.name} name="name" onChange={e=>handleChange(e)}/>
                    </div>
                </div>
                <div>
                    <label>Weight:</label>
                    <div>
                        <p>Min weight</p>
                        <input type="text" value={minMax.weightMin} name="weightMin" onChange={e=>handleSelect(e)}/>
                    </div>
                    <div>
                        <p>Max weight</p>
                        <input type="text" value={minMax.weightMax} name="weightMax" onChange={e=>handleSelect(e)}/>
                    </div>
                </div>
                <div>
                <label>Height:</label>
                    <div>
                        <p>Min height</p>
                        <input type="text" value={minMax.heightMin} name="heightMin" onChange={e=>handleSelect(e)}/>
                    </div>
                    <div>
                        <p>Max height</p>
                        <input type="text" value={minMax.heightMax} name="heightMax" onChange={e=>handleSelect(e)}/>
                    </div>
                </div>
                <div>
                <label>Life span:</label>
                    <div>
                        <p>Min life span</p>
                        <input type="text" value={minMax.lifeSpanMin} name="lifeSpanMin" onChange={e=>handleSelect(e)}/>
                    </div>
                    <div>
                        <p>Max life span</p>
                        <input type="text" value={minMax.lifeSpanMax} name="lifeSpanMax" onChange={e=>handleSelect(e)}/>
                    </div>
                    <div>
                        <label>Temperaments</label>
                        <CheckBox value={minMax.tempArr} name="tempArr" onChange={e=>handleFilterTemperament(e)}/>
                    </div>
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}