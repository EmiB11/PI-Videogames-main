import React from 'react'

function Paginado({paginado , allVideogames , videogame}) {
 const numbersPage = [];
 for(let i = 0 ; i < Math.ceil(allVideogames/videogame); i++){
     numbersPage.push(i+1)
 }

    return (
        <div>
        <ul>
          {
              numbersPage?.map(number => (
                <li key ={number}>
                 <button onClick={()=>paginado(number)}>{number}</button>
                </li>
              ))
          }
        </ul>
        </div>
    )
}

export default Paginado
