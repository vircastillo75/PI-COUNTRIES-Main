const { Activity, Country } = require("../db");

const createActivitiesHandlers = async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;

    // Crea una nueva actividad en la base de datos
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    // Relaciona la actividad con los países indicados
    if (countries && countries.length > 0) {
      const associatedCountries = await Country.findAll({
        where: { id: countries }, // Supongamos que "countries" es un arreglo de IDs de países
      });

      await newActivity.addCountries(associatedCountries);
    }

    res.status(201).json(newActivity);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear la actividad.");
  }
};

const getActivitiesHandlers = async (req, res) => {
  try {
    // Obtén todas las actividades de la base de datos, incluyendo los países relacionados
    const activities = await Activity.findAll({
      include: Country,
    });

    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener las actividades.");
  }
};

module.exports = {
  createActivitiesHandlers,
  getActivitiesHandlers
};
