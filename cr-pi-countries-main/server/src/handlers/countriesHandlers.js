const { getCountryById, getAllCountries, getCountryByName, getAllCountriesWithActivities, getCountriesWithActivityByName, relateActivityToCountry } = require("../controllers/countriesController");

//! Obtener detalle de un País por Nombre / todos los Países
const getCountriesHandler = async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const countryByName = await getCountryByName(name);
            res.status(200).json(countryByName);
        } else {
            const response = await getAllCountries();
            res.status(200).json(response);
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//! Obtener detalles de un País por ID
const detailCountriesHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await getCountryById(id);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//! Relacionar una actividad con un país
const relateActivityToCountryHandler = async (req, res) => {
    const { countryId, activityId } = req.body;
    try {
        const response = await relateActivityToCountry(countryId, activityId);
        res.status(200).json({message: response});
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//! Obtener todos los países con actividades
const getCountriesWithActivitiesHandler = async (req, res) => {
    const { activityName } = req.query;
    try {
        if (activityName) {
            const countryActivityByName = await getCountriesWithActivityByName(activityName);
            res.status(200).json(countryActivityByName);
        } else {
            const response = await getAllCountriesWithActivities();
            res.status(200).json(response);
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getCountriesHandler,
    detailCountriesHandler,
    relateActivityToCountryHandler, 
    getCountriesWithActivitiesHandler,
};
