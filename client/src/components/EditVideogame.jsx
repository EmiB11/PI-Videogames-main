import React , {useEffect , useState}from 'react'
import {useDispatch ,useSelector } from 'react-redux';
import {updateGame  ,getAllVideogames} from '../actions';
import{Link , useNavigate ,useParams} from 'react-router-dom'
import style from '../styles/CreateGame.module.css';
import image from '../imgs/fondoCard.jpg'

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

function EditVideogame() {
    const gameDetail = useSelector(state => state.details)
    const [botonActivo , setBotonActivo] = useState(false)
    const dispatch = useDispatch();
    const [input , setInput] = React.useState({
        name: gameDetail.name,
        released: gameDetail.released,
        rating: gameDetail.rating,
        platforms: [],
        description: gameDetail.description,
        
    })
   const {id} = useParams()
   const [error , setError] = useState({})
   
   const history = useNavigate()
   
  
   useEffect(()=>{
       if(error.name || error.rating || error.description || error.released || input.platforms.length === 0) setBotonActivo(true)
       else setBotonActivo(false)
   },[error.name ,error.rating , error.description , error.released  , input.platforms.length])
    
   
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

    
    

    const handleSubmit = async  e => {
        e.preventDefault()

        if(error.name || error.rating || error.description || error.released) alert('No se pudo editar el personaje , faltan ingresar datos o algunos datos son incorrectos')
        
        else if(input.platforms.length === 0) alert('No se ingreso una plataforma')

        else {
            await updateGame(id ,input)
           dispatch( getAllVideogames())
            setInput({
                name: '',
                released: '',
                rating: 0,
                platforms: [],
                genres: [],
                description: '',
            })
            alert('El videojuego fue actualizado correctamente')
            history('/home')
        }
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
          <Link className={style.link} to={`/home`}><button className={style.botonHome}>inicio</button></Link>
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
          </form>
        </div>
       
          <button className={style.boton} disabled={botonActivo} type= 'submit' onClick={e => handleSubmit(e)}>Editar Videojuego</button>
        </div>
    )
}

export default EditVideogame
