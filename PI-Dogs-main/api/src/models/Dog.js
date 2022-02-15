const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    
    id:{
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true,
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    height:{
      type:DataTypes.STRING,
      allowNull: false
    },
    
    weight:{
      type:DataTypes.STRING,
      allowNull: false
    },
    life_span:{
      type:DataTypes.STRING,
      allowNull: false
    },
    fromDataBase:{
      type:DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    image:{
      type:DataTypes.STRING,
      allowNull:true,
      defaultValue:"https://i.pinimg.com/474x/17/8d/6d/178d6d0a9d198205f7c03d47c2567010.jpg"
    },
  });
};
