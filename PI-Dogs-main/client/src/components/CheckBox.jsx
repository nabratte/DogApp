
import React, {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {getTemperaments } from "../actions";
import Select from "react-select";

export default function ChecBox({onChange}){

    const dispatch = useDispatch();
    const allTemperaments = useSelector((state)=>state.allTemperaments);
    const arrTemperaments = allTemperaments?.map((e)=>{
        return({value:e.name,label:e.name})
    })

    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch])

    return(
        <Select options={arrTemperaments} isMulti onChange={onChange}/>
    )
}