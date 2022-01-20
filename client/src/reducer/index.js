import {GET_ALL_VIDEOGAMES ,
     GET_BY_NAME , GET_DETAILS , 
     DELETE_GAME , FILTER_BY,ORDER_BY,
     ORDER_GENRES,
     ORDER_RATING,GET_GENRES, SEARCH_PLATFORM } from '../actions/types';

const initialState = {
    videogames : [],
    filtered: [],
    genres: [],
    details: {},
   
}

export default function rootReducer(state = initialState , action){

    switch(action.type){
        case GET_ALL_VIDEOGAMES: return {
            ...state ,
            videogames: action.payload,
            filtered: action.payload
        }
        case GET_BY_NAME:
             return {
            ...state,
          videogames: action.payload,
          filtered: action.payload
        }
        case GET_DETAILS: 
              return {
                  ...state ,
                  details: action.payload
              }
        case DELETE_GAME: return {
            ...state ,
            videogames: action.payload
        }

        case GET_GENRES: return {
            ...state,
            genres: action.payload

        }
        case FILTER_BY: 
        if (action.payload === 'default'){
            return {...state, filtered: [...state.videogames]}
            }
          
        if(action.payload === 'created'){
            return {...state, filtered: state.videogames.filter((game)=> (typeof game.id) === 'string')}
            }
          
        if(action.payload === 'api'){
            return {...state, filtered: state.videogames.filter((game)=> (typeof game.id) === 'number')}
            }
            break
         
        case ORDER_GENRES:
         const games = state.videogames
        const filterGenres =  games.filter(g => g.genres.includes(action.payload))
         return {
             ...state,
             filtered: action.payload === 'todos' ? state.videogames : filterGenres.length > 0  ? filterGenres  : 'Erro404' 
         }
         case ORDER_BY:
            if(action.payload === 'A-Z'){
                return {...state, filtered: [...state.filtered].sort((a, b) => {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
                    return 0
                })}}
                  
            if(action.payload === 'Z-A'){
                return {...state, filtered: [...state.filtered].sort((a, b) => {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
                    return 0
                })}}
            else {
                  return {...state, filtered: state.videogames}

                };

          case ORDER_RATING:
            if(action.payload === 'desc'){
                return {...state, filtered: [...state.filtered].sort((a,b) => a.rating - b.rating)}
               }
                  
            if(action.payload === 'asc'){
                return {...state, filtered: [...state.filtered].sort((a,b) => b.rating - a.rating)}
                }     
            else {
                return {...state, filtered: state.videogames}
                };
            
          
             default: return state;
    }
}