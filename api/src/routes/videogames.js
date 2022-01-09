require('dotenv').config();
const { Router } = require('express');
const axios = require('axios')
const { MY_API_KEY} = process.env
const {Videogame , Genre} = require('../db')
const router = Router()

const getVideogamesApi = async () =>{

    let pages = 0;
    let results = []; 
    let response = await axios.get(`https://api.rawg.io/api/games?key=${MY_API_KEY}`)
    while (pages < 5) {
        pages++;
        //filtro solo la DATA que necesito enviar al FRONT
        const videogamesAPi = response.data.results.map(game => {
            return{
                id: game.id,
                name: game.name,
                image: game.background_image,
                rating: game.rating,
                genres: game.genres.map(g => g.name),
                platforms: game.platforms.map(p => p.platform.name),
                released: game.released
            }
        });
        results = [...results, ...videogamesAPi]
        response = await axios.get(response.data.next) //vuelvo a llamar a la API con next
    }

     return results
}

const getVideogamesDb= async()=>{
  const infoDB = await Videogame.findAll({
      include: Genre,
     
  })
  return infoDB
}

 const getAllVideogames = async ()=>{
    const infoDB = await getVideogamesDb()
    const infoApi= await getVideogamesApi()
    const allVideogames = [...infoDB , ...infoApi]
    return allVideogames
}

router.get('/' ,async (req , res)=>{
    try{
    const {name} = req.query;
    const allVideogamesDb = await getVideogamesDb()
    const allVideogames = await getAllVideogames()
    if(name){
      console.log(name)
        const videogamesQuery = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${MY_API_KEY}`)

        if(videogamesQuery.data.count === 0) return res.status(404).json('videojuego no encontrado')

        else{
        const response = videogamesQuery.data.results.map((game , index)=>{
                
                  return {
                    id: game.id,
                    name: game.name,
                    image: game.background_image,
                    rating: game.rating,
                    genres: game.genres.map(g => g.name),
                    platforms: game.platforms.map(p => p.platform.name),
                    released: game.released
                  }
                

            })
            
            const nameVideogameDb = allVideogamesDb.filter(game => game.name.toLowerCase().includes(name.toLowerCase()))
            const results = [...nameVideogameDb , ...response.slice(0,15)]
           
              
           return  res.json(results)

          }
    }else {
       
      return  res.json(allVideogames)
    }
  }catch(e){
      res.status(404).json(e)
  }
})

module.exports = router;