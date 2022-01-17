import React from 'react';
import style from '../styles/Paginado.module.css'

function Paginado({paginado , allVideogames , videogame}) {
 const numbersPage = [];
 for(let i = 0 ; i < Math.ceil(allVideogames/videogame); i++){
     numbersPage.push(i+1)
 }

    return (
        <nav className={style.pagNav}>
        <ul >
          {
              numbersPage?.map(number => (
                <li  key ={number}>
                 <button className={style.pagBoton} onClick={()=>paginado(number)}>{number}</button>
                </li>
              ))
          }
        </ul>
        </nav>
    )
}

export default Paginado
