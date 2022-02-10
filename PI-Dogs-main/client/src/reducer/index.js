const initialState = {
    dogs:[],
    allDogs:[],
    var:"name",
}

function rootReducer(state = initialState,action){
    switch(action.type){
        case "GET_DOGS":
            return{
                ...state,
                dogs:action.payload,
                allDogs:action.payload,
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
                    if (a[state.var]>b[state.var]) {
                        return 1;
                    }
                    if (b[state.var]>a[state.var]){
                        return -1;
                    }
                    return 0;
                }) :
                state.dogs.sort(function(a,b){
                    if (a[state.var]>b[state.var]) {
                        return -1;
                    }
                    if (b[state.var]>a[state.var]){
                        return 1;
                    }
                    return 0;
                })
            return{
                ...state,
                dogs:sortedArr
            }
        case "FILTER_TYPE":
            action.payload === "weight" ? state.var = "weigth": state.var="alpha"
        return{
            ...state
        }

        default : return state;
    }
}

export default rootReducer;
