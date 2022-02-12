import React, {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {filterByTemperament,getTemperaments } from "../actions";
import Select from "react-select";

export default function ChecBox(){

    const dispatch = useDispatch();
    const allTemperaments = useSelector((state)=>state.allTemperaments);
    const arrTemperaments = allTemperaments?.map((e)=>{
        return({value:e.name,label:e.name})
    })

    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch])

    function handleFilterTemperament(e){
        const newarr=[]
        e.forEach(el => {newarr.push(el.value)     
        });
        dispatch(filterByTemperament(newarr));
    }

    return(
        <Select options={arrTemperaments} isMulti onChange={e=>handleFilterTemperament(e)}/>
    )
}
