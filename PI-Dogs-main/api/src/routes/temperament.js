const { Router } = require('express');
const axios = require ('axios');
const {Temperament} = require('../db');
const temperamentRouter= Router();

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

const getAllTemps = async()=>{
    const  apiInfo = await getApiInfo();
    
    let apiTemps = "";
    apiInfo.forEach(d =>{
        if(!d.temperament){
            d.temperament="";
        }
        apiTemps = d.temperament+ ", "+apiTemps;
    });
    const temperamentsArr = new Set(apiTemps.split(", ").sort());
    const result = [...temperamentsArr];
    result.shift();
    return result;
}

const setDbTemperaments = async ()=>{
    const allTemperaments = await getAllTemps();
    allTemperaments.forEach((t) => {
        Temperament.findOrCreate({
          where: { name: t },
        });
    })
}

const getDbTemperaments = async () => {
    return await Temperament.findAll();
  };

temperamentRouter.get("/", async (req, res) => {
    await setDbTemperaments();
    var allTemperaments = await getDbTemperaments();
    res.status(200).json(allTemperaments);
  });

module.exports=temperamentRouter;