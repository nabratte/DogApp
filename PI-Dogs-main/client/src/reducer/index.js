const initialState = {
    dogs:[],
    allDogs:[],
    dogsTemp:[],
    temperaments:[],
    allTemperaments:[],
}


function rootReducer(state = initialState,action){
    switch(action.type){
        case "GET_DOGS":
            return{
                ...state,
                dogs:action.payload,
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
        case "ORDER_DIRECTION":
            let sortedArr = action.payload === "asc"?
                state.dogs.sort(function(a,b){
                    if (a.name>b.name) {
                        return 1;
                    }
                    if (b.name>a.name){
                        return -1;
                    }
                    return 0;
                }) :
                state.dogs.sort(function(a,b){
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

        default : return state;
    }
}


export default rootReducer;
