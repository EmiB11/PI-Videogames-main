import React , {useEffect,useState} from 'react';
import {useDispatch , useSelector} from 'react-redux';
import {getAllVideogames  } from '../actions';
import SearchBar from './SearchBar';
import Cards from './Cards';
import Paginado from './Paginado';
import Nav from './Nav';
import NotFound from './NotFound';
import img from '../imgs/crash-on-the-run-tnt.gif'
import style from '../styles/Home.module.css'
import {IoPlayBackSharp} from 'react-icons/io5';
import {IoPlayForwardSharp} from 'react-icons/io5'

function Home() {
 const dispatch = useDispatch();
 const allVideogames= useSelector(state => state.filtered)
 
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
     if(lastVideogame <= 100 && lastVideogame < allVideogames.length ){
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
} 
else{
    actualVideogame = allVideogames.slice(firstVideogame , lastVideogame)
}


 

 
    return (
         <div className={style.containerHome}>
            
           <div>
            { typeof actualVideogame === 'string' ? (
               
            <div>
             <NotFound />
           </div>
                      
           )
           : actualVideogame.length > 0 ? (
           <div>
             <div >
            
            <SearchBar page= {page} /> 
            
             </div>
             <div className={style.nav}>
            <Nav/>
             </div>
            <div className={style.containerPag}>
            <IoPlayBackSharp className={style.prev} type='button' onClick={lastPage} />
            <Paginado className={style.paginado} paginado = {paginado} videogame = {videogame} allVideogames = {allVideogames.length} />
           
            <IoPlayForwardSharp className={style.next} type='button' onClick={nextPage} />
            </div>
            <div className={style.containerDiv}>
            {
               actualVideogame?.map(game => (
            <Cards key= {game.id} id={game.id} image = {game.image} name = {game.name} genres = {game.genres} rating={game.rating} />
                  ))
            }
            </div>
            </div>
           ): (
               <div className={style.loading}>
             
             <img  src={img} alt ='iamgen loading'/>
              </div>
           )
        }
           </div>
                  
         </div>
          )
         
    }

export default Home
