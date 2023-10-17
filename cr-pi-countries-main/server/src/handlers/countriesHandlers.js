const { getCountryById, getAllCountries, getCountryByName } = require("../controllers/countriesController");

// Obtener detalles de un País por ID
const detailCountriesHandler = async (req, res) => {
    const { idPais } = req.params; // Asegúrate de que el parámetro coincida con el ID de tres letras del país
    try {
        const response = await getCountryById(idPais);
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ error: error.message }); // Cambia el código de estado a 404 en caso de país no encontrado
    }
};

// Obtener detalle de un País por Nombre / todos los Países
const getCountriesHandler = async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const countryByName = await getCountryByName(name);
            if (countryByName.length === 0) {
                res.status(404).json({ message: "País no encontrado" });
            } else {
                res.status(200).json(countryByName);
            }
        } else {
            const response = await getAllCountries();
            res.status(200).json(response);
        }
    } catch (error) {
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
    };
};

module.exports = {
    getCountriesHandler,
    detailCountriesHandler,
    getCountriesWithActivitiesHandler,
}
