const { Router } = require('express');
//require ('dontenv').config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const {Temperament,Dog} = require('../db');
const dogsRouter = require('./dogs');
const dogRouter = require('./dog-id');
const addDogRouter = require('./add-dog');
const temperamentRouter = require('./temperament');

const router = Router();

router.use("/dogs",dogsRouter);
router.use("/dogs",dogRouter);
router.use("/dog",addDogRouter)
router.use("/temperament",temperamentRouter)

module.exports = router;
