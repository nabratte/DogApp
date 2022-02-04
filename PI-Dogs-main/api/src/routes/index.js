const { Router } = require('express');
//require ('dontenv').config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const {Temperament,Dog} = require('../db');


const router = Router();
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


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// [ ] GET /dogs?name="...":
// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado
router.get('/dogs', async(req,res)=>{
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
            };
          })
        ):
        res.status(404).send('Dog Not Found')
    }
})

// [ ] GET /dogs:
// Obtener un listado de las razas de perro
// Debe devolver solo los datos necesarios para la ruta principal
router.get('/dogs', async(req,res)=>{
    let dogList = await getAllDogs();
    res.status(200).send(dogList.map((dog) => {
        return {
          name: dog.name,
          weight: dog.weight,
          image: dog.image,
          temperament: dog.temperament,
        };
      })
    );
})


// [ ] GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados
router.get('/dogs/:id',async(req,res)=>{
    var {id}=req.params;
    let dogList = await getAllDogs();
    let dogId = await dogList.filter(d=>d.id==(id))
    dogId.length ?
    res.status(200).send(dogId):
    res.status(404).send('Dog Not Found')
})
// [ ] GET /temperament:
// Obtener todos los temperamentos posibles
// En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
router.get('/temperament',async(req,res)=>{
    let temperamentList = await Temperament.findAll();
    res.status(200).send(temperamentList)
})
// [ ] POST /dog:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
// Crea una raza de perro en la base de datos

module.exports = router;
