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

export function filterByTemperament(payload){
    return{
        type:'FILTER_BY_TEMPERAMENT',
        payload
    }
}

export function searchByName(payload){
    return async function (dispatch){
        try{
            var json= await axios.get("http://localhost:3001/dogs?name="+payload);
            return dispatch({
                type:"SEARCH_BY_NAME",
                payload:json.data
            })
        }catch(err){
            console.log(err)
        }
    }
}

export function postDog(payload){
    return async function (dispatch){
        const response = await axios.post('http://localhost:3001/dog',payload)
        return response;
    }
}

export function changeOrderStatus(payload){
    return {
        type:"ORDER_CHANGER",
        payload               
    }
}

export function getDetail(payload){
    return async function (dispatch){
        try{
            var json = await axios.get("http://localhost:3001/dogs/"+payload);
            return dispatch({
                type: "GET_DETAIL",
                payload:json.data
            })
        }catch(err){
            console.log(err)
        }
    }
}