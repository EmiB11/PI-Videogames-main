import React from 'react'
import {Link} from 'react-router-dom';

function Cards({id ,image , name , genres}) {


    return (
        <div>
       
        <h3>{name}</h3>
        
        {image ? (
            <img src={image} alt="Videogame" width='200px' height='250px'/>
          ) : (
            <img src='https://previews.123rf.com/images/stockgiu/stockgiu1803/stockgiu180305664/97316128-videojuegos-retro-consolas-port%C3%A1tiles-ilustraci%C3%B3n-vectorial-dise%C3%B1o-gr%C3%A1fico.jpg' alt="Videogame" width='200px' height='250px' />
          )}
        {
            genres?.map((g, i) => {
              return ( 
                <div key={i}>  
               { 
               typeof g === 'string'
                ? g
                : g.name
              }
                </div>
            )})
        }
        <div>

        </div>
         <Link to={`/home/${id}`}>
         <button>Detalles</button>
         </Link>
        </div>
    )
}

export default Cards
