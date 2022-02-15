const { Router } = require('express');
const axios = require ('axios');
const {Temperament,Dog} = require('../db');
const addDogRouter = Router();

addDogRouter.post("/",async(req,res)=>{
    let {
        name,
        weight,
        height,
        temperament,
        life_span,
        image,
    }= req.body;
    
    name = name.trim().charAt(0).toUpperCase() + name.trim().slice(1);

    let dogCreated = await Dog.create({
        name,
        weight,
        height,
        life_span,
        image,
    });

    let temperamentDB = await Temperament.findAll({
        where:{name : temperament}
    });

    dogCreated.addTemperament(temperamentDB);
    res.send("Dog successfully created")
})

module.exports= addDogRouter; 