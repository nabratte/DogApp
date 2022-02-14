import React, {useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import { getDogs, filterDogsByOrigin, orderDirection, getTemperaments, filterByTemperament, changeOrderStatus } from "../actions";
import { Link } from "react-router-dom";
import DogCard from "./DogCards";
import Pagination from "./Pagination";
import Select from "react-select";
import SearchBar from "./SearchBar";

export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector((state)=>state.dogs);
    const [currentPage,setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const [order,setOrder]=useState("");
    const [orderType,setOrderType]=useState("");
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog,indexOfLastDog);
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
        e.forEach(el => {newarr.push(el.value)});
        dispatch(filterByTemperament(newarr));
        setCurrentPage(1);
    }

    function handleSort(e){
        e.preventDefault()
        dispatch(orderDirection(e.target.value))
        console.log("estado general")
        console.log(allDogs)
        console.log("perros que se renderizan")
        console.log(currentDogs)
        setCurrentPage(1);
        setOrder(`Ordered by ${e.target.value}`)
    }

    function handleOrderState(e){
        console.log(allDogs)
        dispatch(changeOrderStatus(e.target.value));
        setOrderType(`Order type ${e.target.value}`)
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
                <select onChange={e=>handleOrderState(e)}>
                    <option value="">Select order type</option>
                    <option value="alpha" >Alphabetic</option>
                    <option value="weight" >Weight</option>
                </select>
            </div>
            <div>
                <h3>Order direction</h3>
                <select onChange={e=>handleSort(e)} >
                    <option value="">Select order direction</option>
                    <option value="asc">Ascendant</option>
                    <option value="des">Descendant</option>
                </select>
            </div>
            <div>
                <Pagination
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                pagination = {pagination}
                />
                {currentDogs?.map((e)=>{
                    return (
                        <div>
                            <Link /*to={`/dogs/:${e.id}`}*/>
                                <DogCard name={e.name} image={e.image? e.image:<img src="https://i.pinimg.com/564x/39/2c/cb/392ccbe168b3a810bc4a961c9634ca4d.jpg" alt=""/>} weight={e.weight} temperament={e.temperament}/>
                            </Link>
                        </div>   
                    )
                })}
            </div>
        </div>
    )
}