import axios from "axios"

export function getDogs(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/dogs",{});
        return dispatch({
        type: 'GET_DOGS',
        payload: json.data,
        })
    }    
}

export function filterDogsByOrigin(payload){
    console.log(payload);
    return{
        type: "FILTER_BY_ORIGIN",
        payload
    }
}

export function orderDirection(payload){
    return{
        type:"ORDER_DIRECTION",
        payload
    }
}


export function getTemperaments(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/temperament",{});
        return dispatch({
        type: 'GET_TEMPERAMENTS',
        payload: json.data,
        })
    }    
}