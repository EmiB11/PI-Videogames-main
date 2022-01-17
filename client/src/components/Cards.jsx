import React from 'react'
import {Link} from 'react-router-dom';
import style from '../styles/Cards.module.css';

function Cards({id ,image , name , genres , rating}) {


    return (
        <div className={style.cardContainer}>
       
        <h3 className={style.containerName}>{name}</h3>
        <div className={style.gameImg}>
        {image ? (
            <img className={style.img} src={image} alt="Videogame" width='200px' height='250px'/>
          ) : (
            <img className={style.img} src='https://media.istockphoto.com/photos/neon-retro-arcade-machines-in-a-games-room-picture-id1300036832?k=20&m=1300036832&s=612x612&w=0&h=VR4Z_hBQ08X5Kvgvm-s8g5LAzKviXF1xDTDimE-_mBI=' alt="Videogame" width='200px' height='250px' />
          )}
         </div>
          <div className={style.containerRating}>

            <span >Clasificación:  {rating}</span>

          </div>
         <div className={style.containerGenres}>
        {
            genres?.map((g, i) => {
              return ( 
                <div  key={i}>  
               { 
               typeof g === 'string'
                ? g
                : g.name
              }
                </div>
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
