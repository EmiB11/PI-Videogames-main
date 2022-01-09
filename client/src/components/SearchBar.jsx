import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {getVideogameByName , getAllVideogames} from '../actions'

function SearchBar() {
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

    return (
         <div>
             <form onSubmit={handleSubmit}>
             <input type= 'text' placeholder = 'Buscar juego' value={name} onChange={e => handleFindName(e)}/>
             <button type= 'submit' onClick={e => handleSubmit(e)}>Buscar</button>
             <button type= 'submit' onClick={e => handleOnClickAll(e) }>Todos</button>
             </form>
         </div>
         )
}

export default SearchBar
