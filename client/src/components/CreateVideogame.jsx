import React , {useEffect , useState}from 'react'
import {useDispatch , useSelector} from 'react-redux';
import {postGame , getGenres ,getAllVideogames} from '../actions';
import {Link , useNavigate} from 'react-router-dom';
import style from '../styles/CreateGame.module.css';
import image from '../imgs/istockphoto.jpg'

const validate = input => {
 let error = {};
  if(!input.name) error.name = 'Ingrese un nombre';
  else if(input.name.length < 2 || input.name.length > 25 ) error.name = 'El nombre debe tener un minimo de 2 caracteres y un maximo de 15'

  if(!input.rating) error.rating = 'ingrese una clasificación'
  else if(input.rating < 1 || input.rating > 5) error.rating = 'ingrese un numero valido del 1 al 5 '
 
  
  if(!input.description) error.description = 'Ingrese una descripcion del juego'
  else if(input.description.length < 10 ) error.description = 'Debe tener un minimo de 10 caracteres'

  if(!input.released) error.released = 'Ingrese una fecha'
 //else if(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(input.released)) error.released = 'Ingrese una fecha valida en formato DD/MM/YYYY'

  return error
}

function CreateVideogame() {
    const [botonInactivo , setBotonInactivo] = useState(false)
    const dispatch = useDispatch();
    const [input , setInput] = React.useState({
        name: '',
        released: '',
        rating: 0,
        platforms: [],
        genres: [],
        description: '',
        createdInDb: true
    })

   const [error , setError] = useState({})
   const generos = useSelector(state => state.genres)
   const history = useNavigate()
   
   useEffect(()=>{
       dispatch(getGenres())
      
     
   },[dispatch])

   useEffect(()=>{
       if(error.name || error.rating || error.description || error.released || input.genres.length === 0 || input.platforms.length === 0) setBotonInactivo(true)
       else setBotonInactivo(false)
   },[error.name ,error.rating , error.description , error.released , input.genres.length , input.platforms.length])
    
   
    const handleChange = e => {
        
        setInput({
            ...input ,
            [e.target.name] : e.target.value
        })

        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleCheckBox = e => {
        
        if(e.target.checked){
            setInput({
              ...input ,
              platforms:[...input.platforms ,e.target.value]
            })
        }
        else if (!e.target.checked) {
            setInput({
              ...input,
              platforms: input.platforms.filter((p) => p !== e.target.value),
            });
      
       }
   
    }

    const handleSelect = e => {

        if(input.genres.find(el => el === e.target.value) === undefined){
            setInput({
              ...input,
              genres: [...input.genres, e.target.value]
            })
          }else{
             
            setInput({
              ...input,
              genres: input.genres.filter(el => el  !== e.target.value)
            })
          }
     }
    

    const handleSubmit = async  e => {
        e.preventDefault()

        if(error.name || error.rating || error.description || error.released) alert('No se pudo crear el personaje , faltan ingresar datos o algunos datos son incorrectos')
        
        else if(input.platforms.length === 0) alert('No se ingreso una plataforma')

        else if(input.genres.length === 0 )  alert('No se ingreso un genero ')

        else {
            await postGame(input)
           dispatch( getAllVideogames())
            setInput({
                name: '',
                released: '',
                rating: 0,
                platforms: [],
                genres: [],
                description: '',
            })
            alert('Videojuego creado correctamente')
            history('/home')
        }
    }

    const handleDelete = (e) =>{
   
        setInput({
            ...input,
            genres: input.genres.filter(el => el !== e)
        })
    }
     
    let plataformas = [
        "PC",
    "PlayStation",
    "Xbox",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo",
    "PS Vita",
    "PSP",
    "Wii",
    "GameCube",
    "Game Boy",
    "NES",
    "Atari",
    " SEGA",
    
    ]
    
   
   


    return (
        <div className={style.containerCreate}>
          <Link className={style.link} to= '/home'><button className={style.botonHome}>Volver</button></Link>
        <div className={style.containerForm}>
          <img  src={image} alt='imagen game'/>
         <form>
          <div className={style.input}>
          <label>NOMBRE:</label>
          {error.name ? <small>{error.name}</small> : ''}
          <input  type ='text' value= {input.name} name= 'name'  onChange={handleChange }  />
         </div>
         <div className={style.input}>
          <label>CLASIFICACIÓN:</label>
          {error.rating ? <small>{error.rating}</small> : ''}
          <input id={style.inputRating} type ='number' value= {input.rating} name= 'rating' min='1' max='5' placeholder= 'del 1 al 5' onChange={handleChange }  />
         </div>
         <div className={style.input}>
          <label>FECHA DE CREACIÓN:</label>
          {error.released ? <small>{error.released}</small> : ''}
          <input type ='date' value= {input.released} name= 'released'  onChange={handleChange }  />
         </div>
         <div className={style.input} >
          <label>DESCRIPCIÓN:</label>
          {error.description ? <small>{error.description}</small> : ''}
          <textarea rows='6' type ='text' value= {input.description} name= 'description' placeholder= 'informacion del juego' onChange={handleChange} />
         </div>
            <label id={style.labelP}>PLATAFORMAS:</label>
         <div className={style.containerP}>
            {plataformas?.map(el => (
            <label key={el}>
            <input type= 'checkbox' value={el} name='platforms' onChange={handleCheckBox}/>
              {el}
             </label>
            ))}
         </div>
           <label>GENEROS:</label>
           <select className={style.selectorsG} onChange={(e) => handleSelect(e)}>
          <option hiddendefaultvalue="false">Elija uno o mas generos</option>
            {generos.map(g => (<option key= {g.name} value={g.name} >{g.name}</option>))}
          </select>
         <div className={style.generos} >
         
           {input.genres.map(el => 
            <div key={el}>
                <p>{el}</p>
                <button  onClick={() => handleDelete(el)}>x</button>
            </div>
        )}
           
          
         </div>
         </form>
        </div>
       
          <button className={style.boton} disabled={botonInactivo} type= 'submit' onClick={e => handleSubmit(e)}>Crear Videojuego</button>
        </div>
    )
}

export default CreateVideogame
