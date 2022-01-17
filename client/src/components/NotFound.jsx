import React from 'react'
import {useDispatch} from 'react-redux'
import img from '../imgs/crash404.gif'
import {getAllVideogames} from '../actions'
import style from '../styles/NotFound.module.css';

function NotFound() {
 const dispatch = useDispatch()
 const handleGoBack = () =>{
    dispatch(getAllVideogames())
}
    return (
        <div className={style.container404}>
         <button className={style.boton} onClick={e =>handleGoBack(e)}>Volver</button>
         <h1>Error 404 NOT FOUND</h1> 
          <img  src= {img} alt='imagen 404 not found'/>
         
        </div>
    )
}

export default NotFound
