const initialState = {
    dogs:[],
    allDogs:[],
    dogsTemp:[],
    temperaments:[],
    allTemperaments:[],
    detail:[],
    ord:"alpha",
    dir:"asc"
}


function rootReducer(state = initialState,action){
    switch(action.type){
        case "GET_DOGS":
            return{
                ...state,
                dogs:action.payload,
                allDogs:action.payload,
                allDogs:action.payload,
                dogsTemp:action.payload
            }
        case "FILTER_BY_ORIGIN":            
            const allDogs = state.allDogs;
            const originFiltered = action.payload === "db"? allDogs.filter(d=>d.fromDataBase) : allDogs.filter(d=>!d.fromDataBase)
            return{
                ...state,
                dogs: action.payload === "all"? state.allDogs : originFiltered
            }    
        case "ORDER_CHANGER":
            console.log(action.payload) 
            console.log(state)
            state.ord=action.payload          
            return{
                ...state,
                dogs:state.allDogs    
            }
        case "ORDER_DIRECTION":
            let allDogs=state.allDogs;
            console.log(action.payload); 
            console.log(state);
            state.dir=action.payload;
            if(state.ord!==""){
                console.log(state)
                if(state.ord==="alpha"){
                        let sortedArr = allDogs
                        state.dir === "asc"?
                        sortedArr.sort(function(a,b){
                            if (a.name>b.name) {
                                return 1;
                            }
                            if (b.name>a.name){
                                return -1;
                            }
                            return 0;
                        }) :
                        sortedArr.sort(function(a,b){
                            if (a.name>b.name) {
                                return -1;
                            }
                            if (b.name>a.name){
                                return 1;
                            }
                            return 0;
                        })
                    return{
                        ...state,
                        dogs:sortedArr
                    }
                }else if (state.ord==="weight"){
                    let sortedArr=allDogs;
                    state.dir === "asc"?
                        sortedArr.sort(function(a,b){
                            if (parseInt(a.weight.split(" - ").shift())>parseInt(b.weight.split(" - ").shift())) {
                                return 1;
                            }
                            if (parseInt(b.weight.split(" - ").shift())>parseInt(a.weight.split(" - ").shift())){
                                return -1;
                            }
                            return 0;
                        }) :
                        sortedArr.sort(function(a,b){
                            if (parseInt(a.weight.split(" - ").shift())>parseInt(b.weight.split(" - ").shift())) {
                                return -1;
                            }
                            if (parseInt(b.weight.split(" - ").shift())>parseInt(a.weight.split(" - ").shift())){
                                return 1;
                            }
                            return 0;
                        })
                    return{
                        ...state,
                        dogs:sortedArr,
                    }
                }else{
                    return {
                        ...state,
                        dogs:allDogs
                    }
                }
            }else{
                return{
                    ...state,
                    dogs:allDogs
                }
            }    
        case "GET_TEMPERAMENTS":
            return{
                ...state,
                temperaments:action.payload,
                allTemperaments:action.payload,
            }
        case "FILTER_BY_TEMPERAMENT":
            var tempDogs = state.dogsTemp;       
            tempDogs = tempDogs.filter(e=>e.temperament!==undefined)
            const arrayOfTemps = action.payload;
            console.log(tempDogs.map(e=> console.log(e.temperament)))
            const filteredByTemps = tempDogs.filter(e=>arrayOfTemps.every(d=>e.temperament.split(", ").includes(d)))
            console.log(filteredByTemps)
            return{
                ...state,
                dogs:filteredByTemps
            }
        case "SEARCH_BY_NAME":
            return{
                ...state,
                dogs:action.payload
            }
        case "POST_DOG":
            return{
                ...state,
                detail:action.payload
            }
        case "GET_DETAIL":
            return{
                ...state,

            }
        default : return state;
    }
}


export default rootReducer;
