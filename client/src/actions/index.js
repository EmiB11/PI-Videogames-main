import {GET_ALL_VIDEOGAMES , 
        GET_BY_NAME , 
        GET_DETAILS ,
        DELETE_GAME ,
       FILTER_BY ,ORDER_BY,
       ORDER_GENRES,
       ORDER_RATING,
       GET_GENRES,
    RESET_DETAILS, RESET_VIDEOGAMES } from './types';

import axios from 'axios';

export const getAllVideogames = () => dispatch => {
    return fetch('http://localhost:3001/videogames')
            .then(res => res.json())
            .then(data => dispatch({type:GET_ALL_VIDEOGAMES , payload: data}))
}

export const getVideogameByName = (name) => dispatch =>{
    return fetch(`http://localhost:3001/videogames?name=${name}`)
           .then(res => res.json())
           .then(data => dispatch({type:GET_BY_NAME , payload: data}))
}

export const getDetails = (id) => dispatch => {
    return fetch(`http://localhost:3001/videogame/${id}`)
           .then(res => res.json())
           .then(data => dispatch({type:GET_DETAILS , payload: data}))
}

export const deleteVideogame = id => dispatch => {
    return axios.delete(`http://localhost:3001/videogame/${id}`)
                .then(res => res.data)
                .then(data => dispatch({type:DELETE_GAME , payload: data}))
                .catch(err => console.log(err))
}

export const filterBy = (payload) => {
    return {
        type: FILTER_BY ,
        payload
    }
}

export const orderBy = payload => {
    return {
        type: ORDER_BY,
        payload
    }
}
export const orderRating = payload =>{
    return {
        type: ORDER_RATING,
        payload
    }
}

export const orderGenres = payload => {
    return {
        type: ORDER_GENRES,
        payload
    }
}

export const getGenres = () => dispatch => {

    return fetch('http://localhost:3001/genres')
           .then(res => res.json())
           .then(data => dispatch({type:GET_GENRES , payload: data}))
}

export const postGame = async (form) => {
     await axios.post('http://localhost:3001/videogame',form)
}

export const updateGame= async (id , form) => {
     await axios.put(`http://localhost:3001/videogame/${id}`, form)
                  
}

export const resetState = payload =>{
    return {
        type: RESET_DETAILS,
        payload
    }
}

export const resetVideogames = payload =>{
    return {
        type: RESET_VIDEOGAMES,
        payload
    }
}