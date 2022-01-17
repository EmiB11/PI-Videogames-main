import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {getVideogameByName , getAllVideogames} from '../actions';
import style from '../styles/Search.module.css';
import {Link} from 'react-router-dom';

function SearchBar({page}) {
    const dispatch = useDispatch();
    const [name , setName] = useState('')
    
    const handleFindName = (e)=>{
       setName(e.target.value)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(name.length){
            dispatch(getVideogameByName(name))
            setName('')
        }else{
            alert('No se ingreso ningun nombre')
        }

    }
    const handleOnClickAll = (e) => {
        e.preventDefault()
        dispatch(getAllVideogames())
       }
      console.log(name)
      
      let visibilityState = page < 2 ? "visible" : "hidden";

    return (
         <div className={style.containerSearch}>
             <form onSubmit={e => handleSubmit(e)}>
             <button id={style.btnAll} className={style.Sbuton}  onClick={e => handleOnClickAll(e) }>Cargar todos los juegos</button>
             <div className={style.containerInput} style={{visibility: visibilityState}}>
             <input className={style.search} type= 'text' placeholder = 'Buscar juego...' value={name} onChange={e => handleFindName(e)}/>
             <button className={style.Sbuton} onClick={e => handleSubmit(e)}>Buscar</button>
             </div>
             </form>
             <div className={style.containerBtn}>
            <Link to='/videogame' >
                <button className={style.btnCreate}>Crea tu propio juego</button>
            </Link>
          </div>
         </div>
         )
}

export default SearchBar
