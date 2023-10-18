const { DataTypes } = require('sequelize');

// Función para capitalizar palabras del Atributo Nombre
function capitalizeWords(str) {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

// Exportamos una función que define el modelo y luego le inyectamos la conexión a Sequelize.
module.exports = (sequelize) => {
  // Defino el modelo
  const Country = sequelize.define("Country", {
    id: {
      type: DataTypes.STRING, // Define el tipo de dato como una cadena de longitud 3
      primaryKey: true,
      allowNull: false, // No permite valores nulos
      /*validate: {
        is: /^[A-Za-z]{3}$/ // Expresión regular para tres letras (mayúsculas o minúsculas)
      }*/
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    area: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  
};
