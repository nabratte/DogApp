const { Router } = require('express');
const axios = require ('axios');
const {Temperament,Dog} = require('../db');
const dogRouter = Router();

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

dogRouter.get('/:id',async(req,res)=>{
    var {id}=req.params;
    let dogList = await getAllDogs();
    let dogId = await dogList.filter(d=>d.id==(id))
    dogId.length ?
    res.status(200).send(dogId):
    res.status(404).send('Dog Not Found')
})

module.exports = dogRouter;