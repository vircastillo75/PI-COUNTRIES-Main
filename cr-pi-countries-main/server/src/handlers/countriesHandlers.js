const { Op } = require("sequelize");
const { Country, Activity } = require("../db");

const getCountriesHandler = async (req, res) => {
  try {
    const countries = await Country.findAll();
    if (countries.length > 0) {
      res.status(200).json(countries);
    } else {
      res.status(404).send("No se encontraron países en la base de datos.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los países.");
  }
};

const getCountriesByIdHandler = async (req, res) => {
  const { idPais } = req.params;

  try {
    const country = await Country.findOne({
      where: { id: idPais },
      include: [{ model: Activity, attributes: ["name", "difficulty", "duration", "season"] }],
    });

    if (country) {
      res.status(200).json(country);
    } else {
      res.status(404).send(`No se encontró el país con ID ${idPais}`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el detalle del país.");
  }
};

const getCountriesByNameHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const countries = await Country.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` }, // Búsqueda insensible a mayúsculas y minúsculas
      },
    });

    if (countries.length > 0) {
      res.status(200).json(countries);
    } else {
      res.status(404).send(`No se encontraron países con el nombre "${name}".`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al buscar países por nombre.");
  }
};

module.exports = {
  getCountriesHandler,
  getCountriesByIdHandler,
  getCountriesByNameHandler,
};
