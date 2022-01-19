require('dotenv').config();
const { Router} = require('express');
const { Videogame , Genre} = require('../db')
const { MY_API_KEY} = process.env
const axios = require('axios');

const router = Router();

router.post('/' ,async (req, res)=>{
const {name , description ,  released , rating , platforms , genres , createdInDb}= req.body
  try{
    const createVideogame = await Videogame.create({
        name,
        description,
        released , 
        rating , 
        platforms ,
       createdInDb
    })

    const genresDb = await Genre.findAll({
        where:{name: genres}
    })
    createVideogame.addGenre(genresDb)
    res.send('Videojuego creado con exito')
    
  }catch(e){
    res.status(404).send('No se pudo crear el videojuego')
  }

})

router.get('/:id' , (req , res)=>{
    const {id}= req.params
    if(id.length >= 36){
        Videogame.findOne({
            where:{id},
            include:{model: Genre}
        })
        .then(data => res.json(data))
        .catch(() => res.status(404).send('Videojuego no encontrado'))
    }else{
        axios.get(`https://api.rawg.io/api/games/${id}?key=${MY_API_KEY}`)
        .then(res => res.data)
        .then(data => {
          return {
          name: data.name,
          id: data.id,
          image: data.background_image,
          description: data.description_raw,
          released: data.released,
          rating: data.rating,
          platforms: data.platforms,
          genres: data.genres
          }
        })
        .then(response => res.json(response))
        .catch(()=> res.status(404).send('Videojuego no encontrado'))
    }   

})

router.delete('/:id' , (req , res)=>{
    const {id} = req.params;

    Videogame.destroy({
        where: {id}
    })
    .then(() => res.send('Videojuego eliminado'))
    .catch((e)=> res.send(e))
})

router.put('/:id' , (req , res)=> {
    const {id} = req.params;
    const {name ,released, rating ,description, platforms } = req.body;

    Videogame.findByPk(id).then(game => {
        game.update({
          name,
          description,
          released,
          rating,
          platforms
        }).then((gameUpdate) => {
          res.json(gameUpdate);
        });
      });
})

module.exports = router;