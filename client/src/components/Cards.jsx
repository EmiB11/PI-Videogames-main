import React from 'react'
import {Link} from 'react-router-dom';
import style from '../styles/Cards.module.css';
import imgCard from '../imgs/fondoCard.jpg'
function Cards({id ,image , name , genres , rating}) {


    return (
        <div className={style.cardContainer}>
       
        <h3 className={style.containerName}>{name}</h3>
        <div className={style.gameImg}>
        {image ? (
            <img className={style.img} src={image} alt="Videogame" />
          ) : (
            <img className={style.img} src={imgCard} alt='imagen juego creado' />
          )}
         </div>
          <div className={style.containerRating}>

            <span >Clasificación:  {rating}</span>

          </div>
         <div className={style.containerGenres}>
        {
            genres?.map((g, i) => {
              return ( 
                <div  key={i}> {g} </div>
            )})
        }
          </div>
        <div>

        </div>
         <Link to={`/home/${id}`}>
         <button className={style.boton}>Más info</button>
         </Link>
        </div>
    )
}

export default Cards
