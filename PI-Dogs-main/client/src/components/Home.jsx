import React, {useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import { getDogs, filterDogsByOrigin, orderDirection, getTemperaments, filterByTemperament } from "../actions";
import { Link } from "react-router-dom";
import DogCard from "./DogCards";
import Pagination from "./Pagination";
import Select from "react-select";
import SearchBar from "./SearchBar";

export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector((state)=>state.dogs);
    const [currentPage,setCurrentPage] = useState(1);
    const [dogsPerPage,] = useState(8);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog,indexOfLastDog);
    const [,setOrder] = useState("");
    const allTemperaments = useSelector((state)=>state.allTemperaments);
    const arrTemperaments = allTemperaments?.map((e)=>{
        return({value:e.name,label:e.name})
    })

    const pagination = (pageNumber) =>{
        setCurrentPage(pageNumber);
    };

    useEffect(()=>{
        dispatch(getDogs())
        dispatch(getTemperaments())
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

    function handleFilterTemperament(e){
        const newarr=[]
        e.forEach(el => {newarr.push(el.value)     
        });
        console.log(newarr)
        dispatch(filterByTemperament(newarr));
        setCurrentPage(1);
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderDirection(e.target.value));
        setCurrentPage(1);
        setOrder(`In Order ${e.target.value}`)
    }

    return (
        <div>
            <Link to ='/dog'>
                Create a Dog            
            </Link>
            <SearchBar/>
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
                <Select options={arrTemperaments} isMulti onChange={e=>handleFilterTemperament(e)}/>
            </div>
            <div>
                <h3>Order by</h3>
                <select >
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