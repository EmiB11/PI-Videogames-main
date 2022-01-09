const { Router} = require('express');
const { Videogame , Genre} = require('../db')
const { MY_API_KEY} = process.env
const axios = require('axios');

const router = Router();

router.get('/' , (req , res)=>{
    axios.get(`https://api.rawg.io/api/genres?key=${MY_API_KEY}`)
    .then(res => res.data)
    .then(data => data.results.map(({id , name})=>(
        Genre.findOrCreate({
            where:{id ,name}
        })
    )))
    .then(()=> Genre.findAll().then(data => res.json(data)))
    .catch((err)=> res.status(404).send(err))
})

module.exports = router;