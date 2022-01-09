import React , {useEffect,useState} from 'react';
import {useDispatch , useSelector} from 'react-redux';
import {getAllVideogames} from '../actions';
import SearchBar from './SearchBar';
import Cards from './Cards';
import Paginado from './Paginado';
import Nav from './Nav';

function Home() {
 const dispatch = useDispatch();
 const allVideogames= useSelector(state => state.videogames)
 
 const [videogame ,] = useState(15)
 const [page , setPage] = useState(1)
 let lastVideogame = videogame * page
 let firstVideogame = lastVideogame - videogame
 let actualVideogame;
 
 const paginado = (number)=>{
     setPage(number)
 }
 useEffect(()=>{
     dispatch(getAllVideogames())
 },[dispatch])

 const nextPage = ()=>{
     if(lastVideogame <= 100  ){
         setPage(prev => prev + 1)
     }
 }
 const lastPage = ()=>{
     if(firstVideogame > 0 ){
        setPage(prev => prev - 1)
     }
 }
  
if(typeof allVideogames === 'string'){
    actualVideogame = allVideogames
}else{
    actualVideogame = allVideogames.slice(firstVideogame , lastVideogame)
}


 const handleGoBack = () =>{
     dispatch(getAllVideogames())
 }
 console.log(actualVideogame)

 
    return (
         <div>
             { page < 2 ? (
                 <SearchBar />
             )
            : ''}
           <div>
            { typeof actualVideogame === 'string' ? (
               
            <div>
            <h1>Videojuego no encontrado</h1>
           
            <button type = 'submit' onClick={handleGoBack}>volver</button>
            
          </div>
                      
           )
           : actualVideogame.length > 0 ? (
            <div>
            <Nav />
            <button onClick={lastPage}>anterior</button>
            <Paginado paginado = {paginado} videogame = {videogame} allVideogames = {allVideogames.length} />
            <button onClick={nextPage}>siguiente</button>
            {
               actualVideogame?.map(game => (
            <Cards key= {game.id} id={game.id} image = {game.image} name = {game.name} genres = {game.genres} />
                  ))
            }
            </div>
           ): (
               <div>
             <h1>Loading...</h1>
             <img src='https://acegif.com/wp-content/uploads/loading-25.gif' alt ='iamgen loading'/>
              </div>
           )
        }
           </div>
                  
         </div>
          )
         
    }

export default Home
