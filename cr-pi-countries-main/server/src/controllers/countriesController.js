const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

const getCountryById = async (id) => {
    try {
        // Limpia el ID proporcionado, eliminando espacios antes y después
        const cleanedId = id.trim();

        const dbCountry = await Country.findOne({
            where: {
                id: {
                    [Op.iLike]: cleanedId // Utiliza Op.iLike para una búsqueda insensible a mayúsculas y minúsculas
                }
            },
            include: {
                model: Activity,
                attributes: ["name", "difficulty", "duration", "season"],
                through: { attributes: ["CountryId", "ActivityId"] }
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });

        if (dbCountry) {
            return dbCountry;
        } else {
            throw new Error("País no encontrado");
        }
    } catch (error) {
        throw  Error("Error al obtener el país: " + error.message);
    }
};



// Obtener todos los Países
const getAllCountries = async () => {
    const dbCountry = await Country.findAll();
    return dbCountry;
};

// Obtener un País por Nombre (insensible a mayúsculas/minúsculas)
const getCountryByName = async (name) => {
    const dbCountry = await Country.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%` // Búsqueda insensible a mayúsculas/minúsculas
            }
        }
    });
    return dbCountry;
};

//! Obtener Países con al menos una Actividad
const getAllCountriesWithActivities = async () => {
    const countriesWithActivities = await Country.findAll({
        include: [
            {
                model: Activity,
                attributes: ["name", "difficulty", "duration", "season"],
                through: { attributes: [] }
            }
        ],
        where: {
            "$Activities.id$": {
                [Op.not]: null
            }
        }
    });

    return countriesWithActivities;
};

//! Obtener Países con una Actividad especifica
const getCountriesWithActivityByName = async (activityName) => {
    const countriesWithSpecificActivity = await Country.findAll({
        include: [
            {
                model: Activity,
                attributes: ["name", "difficulty", "duration", "season"],
                through: { attributes: ["CountryId", "ActivityId"] },
                where: {
                    name: activityName
                }
            }
        ]
    });

    return countriesWithSpecificActivity;
};


module.exports = {
    getCountryById,
    getAllCountries,
    getCountryByName,
    getAllCountriesWithActivities,
    getCountriesWithActivityByName,



};
