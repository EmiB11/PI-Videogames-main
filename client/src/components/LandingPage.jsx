import React from 'react'
import {Link} from 'react-router-dom';
import style from '../styles/LandingPage.module.css'
import video from '../imgs/videoLandingPage.mp4'

function LandingPage() {
    return (
        <div className={style.container}>
        <video className={style.video} src={video} loop autoPlay muted/>
        <h1>Bienvenidos  </h1> 
        <h2>Proyecto web de videojuegos | Realizado por Emiliano Barberis</h2>
        <Link to = '/home' className={style.go}>
            Press Start
        </Link>
         
        </div>
    )
}

export default LandingPage
