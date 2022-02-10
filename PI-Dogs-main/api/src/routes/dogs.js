const { Router } = require('express');
const axios = require ('axios');
const {Temperament,Dog} = require('../db');
const dogsRouter = Router();

const getApiInfo = async () =>{
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');
    const apiInfo = await apiUrl.data.map(d=>{
        return{
            id:d.id,
            name: d.name,
            weight: d.weight.metric,
            height:d.height,
            temperament: d.temperament,
            life_span:d.life_span,
            image: d.image.url,
        };
    });
    return apiInfo;
}

const getDbInfo = async ()=>{
    return await Dog.findAll({
        include:{
            model:Temperament,
            attributes: ['name'],
            through:{
                attributes:[],
            },
        },
    })
}

const getAllDogs = async ()=>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const generalInfo = apiInfo.concat(dbInfo);
    return generalInfo; 
}

dogsRouter.get('/', async(req,res)=>{
    const name = req.query.name;
    let dogList = await getAllDogs();
    if (name){
        let dogName = await dogList.filter(d=>d.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ?
        res.status(200).send(dogName.map((dog) => {
            return {
                name: dog.name,
                weight: dog.weight,
                image: dog.image,
                temperament: dog.temperament,
                fromDataBase: dog.fromDataBase,
            };
        })
        ):
        res.status(404).send('Dog Not Found')
    }else{
        try{
        var allDogs = dogList.map((dog) => {
            return {
              name: dog.name,
              weight: dog.weight,
              image: dog.image,
              temperament: dog.temperament,
              fromDataBase: dog.fromDataBase,
            };
        })
        res.status(200).send(allDogs)
        }
        catch(error){return error}        
    }
})

module.exports = dogsRouter;