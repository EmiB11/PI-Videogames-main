import React, {useEffect} from 'react'
import{Link , useNavigate ,useParams} from 'react-router-dom'
import {getDetails , deleteVideogame} from '../actions';
import {useDispatch , useSelector} from 'react-redux';
import img from '../imgs/createGameDb.webp'
function Details() {
    const dispatch = useDispatch();
    const gameDetail = useSelector(state => state.details)
    const {id} = useParams()
    const history = useNavigate()

    useEffect(()=>{
    dispatch(getDetails(id))
    }, [dispatch , id])

    let generos;
    let plataformas;

    if(Object.keys(gameDetail).length){

      if(gameDetail.createdAt){
        
        if(gameDetail.platforms){

          plataformas = gameDetail.platforms?.map(el => {return [el + ' ']})

        }if(gameDetail.genres){

          generos = gameDetail.genres?.map(el => {return [el.name , ' ']})
        }

      } if(gameDetail.platforms[0].platform){

        plataformas = gameDetail.platforms?.map( el => {return [el.platform.name , ' ']})
      
      } if(gameDetail.genres){
        generos = gameDetail.genres?.map(el =>  {return [el.name, ' ']})

    }
     
  }
    
  console.log(plataformas )
    
   const handleDelete = (e)=> {
       dispatch(deleteVideogame(id))
   let result=  window.confirm('Esta seguro que quiere eliminar el juego')
     if(result){
       alert('juego eliminado correctamente')
      }
      history('/home')

   }
    
    return (
        <div>
         {
          gameDetail.id ? (
          <div>
            <h2>{gameDetail.name}</h2>
            <img src= {gameDetail.image ? gameDetail.image : img} alt = 'imagen videojuego' />
            <div>
            <h4>Generos: {generos}</h4>
            <h4> Clasificación: {gameDetail.rating}</h4>
            <h4> Fecha de lamzamiento: {gameDetail.released}</h4>
            <h4>Plataformas : {plataformas}</h4>
            <p> Descripción: {gameDetail.description}</p>
            </div>
              <div>
              {
               gameDetail.createdAt ? (<button onClick={e => handleDelete(e)}>Eliminar personaje</button>)
                                    : ''
              }
              </div>
            <div>
             <Link to='/home'>
              <button>volver</button>
             </Link>
            </div>
          </div>
             
          )
          : (
            <h1>cargando...</h1>
          )
         }
        </div>
    )
}

export default Details
