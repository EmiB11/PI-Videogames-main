import React from 'react'
import {Link} from 'react-router-dom';

function LandingPage() {
    return (
        <div>
        <h1>Bienvenidos  </h1> 
        <h2>Proyecto web de videojuegos | Realizado por Emiliano Barberis</h2>
        <Link to = '/home'>
            <button>Press Start</button>
        </Link>
        </div>
    )
}

export default LandingPage
