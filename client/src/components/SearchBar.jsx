import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {getVideogameByName , getAllVideogames ,resetVideogames} from '../actions';
import style from '../styles/Search.module.css';
import {Link} from 'react-router-dom';

function SearchBar({ setPage}) {
    
    const dispatch = useDispatch();
    const [name , setName] = useState('')
    
    const handleFindName = (e)=>{
       setName(e.target.value)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(name.length){
            setPage(1)
            dispatch(getVideogameByName(name))
            setName('')
        }else{
            alert('No se ingreso ningun nombre')
        }

    }
    const handleOnClickAll = (e) => {
        e.preventDefault()
        dispatch(resetVideogames([]))
        dispatch(getAllVideogames())
       }
      console.log(name)
      
     

    return (
         <div className={style.containerSearch}>
             <button id={style.btnAll} className={style.Sbuton}  onClick={e => handleOnClickAll(e) }>Cargar todos los juegos</button>
             <form className={style.containerInput} onSubmit={ handleSubmit}>
             <input className={style.search} type= 'text' placeholder = 'Buscar juego...' value={name} onChange={e => handleFindName(e)}/>
             <button className={style.Sbuton} onClick={e => handleSubmit(e)}>Buscar</button>
             
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
