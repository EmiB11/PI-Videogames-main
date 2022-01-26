import React, {useEffect} from 'react'
import{Link , useNavigate ,useParams} from 'react-router-dom'
import {getDetails , deleteVideogame ,resetState} from '../actions';
import {useDispatch , useSelector} from 'react-redux';
import img from '../imgs/fondoCard.jpg'
import imgLoad from '../imgs/imagenloading.gif'
import style from '../styles/Details.module.css';

function Details() {
    const dispatch = useDispatch();
    const gameDetail = useSelector(state => state.details)
    const {id} = useParams()
    const history = useNavigate()

    useEffect(()=>{
    dispatch(getDetails(id))
     
    return ()=>{
     dispatch(resetState({}))
    }
    
    }, [dispatch , id])

    let generos;
    let plataformas;

    if(Object.keys(gameDetail).length){

      if(gameDetail.createdInDb){
        
        if(gameDetail.platforms){

          plataformas = gameDetail.platforms?.map(el => {return [ el  + ' | ']})
        }
       
  } if(gameDetail.platforms[0].platform){

        plataformas = gameDetail.platforms?.map( el => {return [ el.platform.name , ' ' , ' | ']})
      
      } if(gameDetail.genres){
        generos = gameDetail.genres?.map(el =>  {return [el.name, ' ' , ' | ']})

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
        <div style={{backgroundImage:`url(${gameDetail.image ? gameDetail.image : img})`  , boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.6)', backgroundSize:'cover' , backgroundRepeat: 'no-repeat' , width:'100%'}}>
           
         {
          gameDetail.id  ? (
          <div >
            <div className={style.containerBtn}>
             <Link to='/home'>
              <button className={style.btnHome}>volver</button>
             </Link>
            </div>
            
            <div className={style.containerInfo}>
            <div className={style.imagen}>
            <img src= {gameDetail.image ? gameDetail.image : img} alt = 'imagen videojuego' />
            </div>
            <h1>{gameDetail.name}</h1>
            <h2>Descripción</h2>
            <p>{gameDetail.description ? gameDetail.description : 'Sin descripción'}</p>
            <h4>Generos: <strong style={{backgroundColor:'#ff6d00' , color:'#023e8a'}}>{generos}</strong></h4>
            <h4> Clasificación: <strong style={{backgroundColor:'#ff6d00' , color:'#023e8a'}}>{gameDetail.rating}</strong></h4>
            <h4> Fecha de lanzamiento: <strong style={{backgroundColor:'#ff6d00' , color:'#023e8a'}}>{gameDetail.released}</strong></h4>
            <h4>Plataformas : <strong style={{backgroundColor:'#ff6d00' , color:'#023e8a'}}> {plataformas}</strong></h4>
              <div className={style.containerBoton}>
               <button className={gameDetail.createdInDb ? style.btnDb : style.btnHidden} 
               onClick={e => handleDelete(e)}>Eliminar Videojuego
               </button>
              
              <Link to={`/home/edit/${gameDetail.id}`}>
              <button className={gameDetail.createdInDb ? style.btnEdit : style.btnHidden}>Editar</button>
             </Link>
             </div >
            </div>
            
          </div>
             ): (
               <div className={style.loading}>
              <img src={imgLoad} alt='imagen loading' />
              </div>
             )
            }
           </div>
       )
   }
             
          

export default Details
               
               
                                   
              
