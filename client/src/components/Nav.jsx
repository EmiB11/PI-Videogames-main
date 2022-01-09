import React , {useEffect} from 'react'
import {useDispatch , useSelector} from 'react-redux';
import {getGenres , orderBy ,orderRating , filterBy , orderGenres} from '../actions';
import {Link} from 'react-router-dom'
function Nav() {
 const dispatch = useDispatch()
 const allGenres = useSelector(state => state.genres)
  
 useEffect(()=>{
     dispatch(getGenres())
 },[dispatch])

 const handleOrderBy = (e) =>{
     dispatch(orderBy(e.target.value))
 }

 const handleOrderRating = e => {
     dispatch(orderRating(e.target.value))
 }

 const handleFilterBy  = e => {
     dispatch(filterBy(e.target.value))
 }

 const handleOrderGenres = e => {
     dispatch(orderGenres(e.target.value))
 }

    return (
        <div>
           <select onChange={e => handleFilterBy(e)}> 
           <option value = 'default'>Todos</option> 
           <option value= 'created'>Creados</option> 
           <option value= 'api'>Existentes</option>    
          </select> 
          <select onChange={e => handleOrderGenres(e)}>
           <option value= 'todos'>Generos</option>
           <option value='todos '>Todos</option>
           {allGenres.map((e) => (
            <option key={e.id}  value={e.name}>
              {e.name}
            </option>
          ))}
          </select>
          <select onChange={e => handleOrderRating(e)}>
            <option value='asc'>Menor a Mayor</option>
            <option value= 'desc'>Mayor a Menor</option> 
            </select>
            <select onChange={e => handleOrderBy(e)}>
            <option value= 'A-Z'>A-Z</option> 
            <option value= 'Z-A'>Z-A</option> 
          </select>
        </div>
    )
}

export default Nav
