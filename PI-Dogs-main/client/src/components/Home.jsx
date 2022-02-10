import React, {useEffect, useState } from "react";
import {useDispatch,useSelector} from "react-redux";
import { getDogs, filterDogsByOrigin, orderDirection, filterType } from "../actions";
import { Link } from "react-router-dom";
import DogCard from "./DogCards";
import Pagination from "./Pagination";
import TempéramentCheckBox from "./CheckBox";

export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector((state)=>state.dogs);
    const [currentPage,setCurrentPage] = useState(1);
    const [dogsPerPage,] = useState(8);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog,indexOfLastDog);
    const [order,setOrder] = useState("");

    const pagination = (pageNumber) =>{
        setCurrentPage(pageNumber);
    };

    useEffect(()=>{
        dispatch(getDogs())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
    }

    function handleFilterOrigin(e){
        e.preventDefault();
        dispatch(filterDogsByOrigin(e.target.value));
        setCurrentPage(1);
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderDirection(e.target.value));
        setCurrentPage(1);
        setOrder(`In Order ${e.target.value}`)
    }

    function handleFilterType(e){//ta roto, no funca
        e.preventDefault();
        dispatch(filterType(e.target.value));
        setCurrentPage(1);
        setOrder(`In Order ${e.target.value}`)
    }

    return (
        <div>
            <Link to ='/dog'>
                Create Dog            
            </Link>
            <h1>Dogs are fun!</h1>
            <button onClick={e=>{handleClick(e)}}>Reload all dogs</button>
            <div>
                <h3>Filter by origin</h3>
                <select onChange={e=>handleFilterOrigin(e)} >
                    <option value ="all">All</option>
                    <option value = "api" >Api</option>
                    <option value = "db" >DataBase</option>
                </select>
            </div>
            <div>
                <h3>Filter by temperament</h3>
                <select >
                    <option value="temp1">temp1</option>
                    <option value="temp2">temp2</option>
                </select>
            </div>
            <div>
                <h3>Order by</h3>
                <select onChange={e=>handleFilterType(e)}>
                    <option value="alpha">Alphabetic</option>
                    <option value="weight">Weight</option>
                </select>
            </div>
            <div>
                <h3>Order direction</h3>
                <select onChange={e=>handleSort(e)} >
                    <option value="asc">Ascendant</option>
                    <option value="des">Descendant</option>
                </select>
            </div>
            {/* <div>
                <form>
                    <h3>Temperaments</h3>
                    <input type="checkbox" value="tem1"/>temp1
                    <input type="checkbox" value="temp2"/>temp2
                    <input type="checkbox" value="temp3"/>temp3
                </form>    
            </div>
            <TempéramentCheckBox/> */}
            <Pagination
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            pagination = {pagination}
            />
            {currentDogs?.map((e)=>{
                return (
                    <div>
                        <Link to={"/home"}>
                            <DogCard name={e.name} image={e.image} weight={e.weight} temperament={e.temperament}/>
                        </Link>
                    </div>   
                )
            })}
        </div>
    )
}