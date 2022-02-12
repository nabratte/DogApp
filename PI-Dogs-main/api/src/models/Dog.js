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
      defaultValue: "https://i.pinimg.com/564x/39/2c/cb/392ccbe168b3a810bc4a961c9634ca4d.jpg",
    },
  });
};
