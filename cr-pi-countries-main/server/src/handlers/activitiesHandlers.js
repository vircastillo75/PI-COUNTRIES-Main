const { createActivity, getAllActivities, getActivityByName } = require("../controllers/activitiesController");
const { Country } = require("../db"); // Agrega esta línea para importar el modelo Country

//! Crear Actividad
const createActivitiesHandler = async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;

    try {
        // Crea la actividad
        const newActivity = await createActivity(name, difficulty, duration, season);

        // Busca los países por nombre en la base de datos
        const foundCountries = await Country.findAll({
            where: {
                name: countries
            }
        });

        // Asocia la actividad con los países encontrados
        await newActivity.setCountries(foundCountries);

        res.status(200).json({ success: true, data: newActivity });
    } catch (error) {
        res.status(400).json({ success: false, message: "Error al crear nueva Actividad. " + error.message });
    }
};

// Resto del código...



//! Obtener todas las Actividades
const getAllActivitiesHandler = async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const activityByName = await getActivityByName(name);
            res.status(200).json(activityByName);
        } else {
            const response = await getAllActivities();
            res.status(200).json(response);
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    };

};

module.exports = {
    createActivitiesHandler,
    getAllActivitiesHandler,
};