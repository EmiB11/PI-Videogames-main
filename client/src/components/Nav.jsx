import React , {useEffect} from 'react'
import {useDispatch , useSelector} from 'react-redux';
import {getGenres , orderBy ,orderRating , filterBy , orderGenres} from '../actions';
import style from '../styles/Nav.module.css';

function Nav({setPage}) {
 const dispatch = useDispatch()
 const allGenres = useSelector(state => state.genres)
  
 useEffect(()=>{
     dispatch(getGenres())
 },[dispatch])

 const handleOrderBy = (e) =>{
     setPage(1)
     dispatch(orderBy(e.target.value))
 }

 const handleOrderRating = e => {
     setPage(1)
     dispatch(orderRating(e.target.value))
 }

 const handleFilterBy  = e => {
     setPage(1)
     dispatch(filterBy(e.target.value))
 }

 const handleOrderGenres = e => {
     
     setPage(1)
     dispatch(orderGenres(e.target.value))
 }

    return (
        <div className={style.barra}>
          
           <select className={style.selectors} onChange={e => handleFilterBy(e)}> 
           <option hiddendefaultvalue="true">Videojuegos</option>
           <option value = 'default'>Todos</option> 
           <option value= 'created'>Creados</option> 
           <option value= 'api'>Existentes</option>    
          </select> 
          <select className={style.selectors} onChange={e => handleOrderGenres(e)}>
           <option value='todos'>Generos</option>
           {allGenres?.map((e) => (
            <option key={e.id}  value={e.name}>
              {e.name}
            </option>
          ))}
          </select>
          <select className={style.selectors} onChange={e => handleOrderRating(e)}>
            <option hiddendefaultvalue="true">Orden por Rating</option>
            <option value='asc'>Mayor rating</option>
            <option value= 'desc'>Menor rating</option> 
            </select>
            <select className={style.selectors} onChange={e => handleOrderBy(e)}>
            <option hiddendefaultvalue="true">Orden asc y desc</option>
            <option value= 'A-Z'>A-Z</option> 
            <option value= 'Z-A'>Z-A</option> 
          </select>
         
        </div>
    )
}

export default Nav
