import {GET_ALL_VIDEOGAMES ,
     GET_BY_NAME , GET_DETAILS , 
     DELETE_GAME , FILTER_BY,ORDER_BY,
     ORDER_GENRES,
     ORDER_RATING,GET_GENRES} from '../actions/types';

const initialState = {
    videogames : [],
    copyVideogames: [],
    genres: [],
    details: {}
}

export default function rootReducer(state = initialState , action){

    switch(action.type){
        case GET_ALL_VIDEOGAMES: return {
            ...state ,
            videogames: action.payload,
            copyVideogames: action.payload,
            
        }
        case GET_BY_NAME:
             return {
            ...state,
           videogames: action.payload,
          
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
        const allGames = [...state.copyVideogames]
        const filterGames = action.payload === 'default' ? state.copyVideogames : action.payload === 'created' ?
                            allGames.filter(game => game.createdInDb) : allGames.filter(game => !game.createdInDb)
          return {
              ...state,
              videogames: filterGames
          }
        case ORDER_GENRES:
         const games = state.copyVideogames
         const filterGenres = games.filter(g => g.genres.includes(action.payload))
         return {
             ...state,
             videogames: action.payload === 'todos' ? state.copyVideogames : filterGenres 
         }
         case ORDER_BY:
             const sortGame = action.payload === 'A-Z' ? 
             state.copyVideogames.sort((a,b)=>{
                 if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                 if(b.name.toLowerCase() > a.name.toLowerCase()) return -1
                 return 0
             }) 
             :  state.copyVideogames.sort((a,b)=>{
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                if(b.name.toLowerCase() > a.name.toLowerCase()) return -1
                return 0
             })
             return {
                 ...state,
                 videogames: sortGame
             } 
          case ORDER_RATING:
              const sortRating = action.payload === 'asc' ?
              state.videogames.sort((a,b)=> {
                 
                if(a.rating > b.rating) return 1
                if(b.rating > a.rating) return -1
                return 0
              })
              : state.videogames.sort((a,b)=>{
                if(a.rating > b.rating) return 1
                if(b.rating > a.rating) return -1
                return 0
              })
              return {
                  ...state,
                  videogames: sortRating
              }

        default: return state;
    }
}