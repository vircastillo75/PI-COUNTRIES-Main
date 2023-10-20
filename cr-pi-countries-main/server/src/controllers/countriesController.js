const { Country, Activity, Country_Activities } = require("../db");
const { Op, Sequelize } = require("sequelize");

// Función para eliminar espacios y convertir a minúsculas
const formatIdentifier = (identifier) => identifier.toLowerCase().replace(/\s/g, "");


//! Obtener un País por ID
const getCountryById = async (id) => {
    try {
        const dbCountry = await Country.findOne({
            where: { id },
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
            throw  Error("País no encontrado");
        }
    } catch (error) {
        throw  Error("Error al obtener el país: " + error.message);
    }
};

//! Obtener todos los Países
const getAllCountries = async () => {
    const dbCountry = await Country.findAll();
    return dbCountry;
};

//! Obtener un País por Nombre
const getCountryByName = async (name) => {
    const formattedName = name.trim(); // Eliminar espacios antes y después del nombre
    console.log("Nombre formateado:", formattedName); // Agregado para depuración
    const dbCountry = await Country.findAll({
        where: {
            name: {
                [Op.iLike]: `%${formattedName}%`, // Búsqueda insensible a mayúsculas y minúsculas
            }
        }
    });
    console.log("Resultados de la búsqueda:", dbCountry); // Agregado para depuración
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

//! Obtener Países con una Actividad específica
const getCountriesWithActivityByName = async (activityName) => {
    const countriesWithSpecificActivity = await Country.findAll({
        include: [
            {
                model: Activity,
                attributes: ["name", "difficulty", "duration", "season"],
                through: { attributes: ["CountryId", "ActivityId"] },
                where: {
                    name: {
                        [Op.iLike]: formatIdentifier(activityName) // "iLike" para consulta insensible a mayúsculas y minúsculas
                    }
                }
            }
        ]
    });
    return countriesWithSpecificActivity;
};

//! Relacionar una actividad con un país
const relateActivityToCountry = async (countryId, activityId) => {
    try {
        // Convertir y formatear los identificadores a minúsculas y sin espacios
        const formattedCountryId = formatIdentifier(countryId);
        const formattedActivityId = formatIdentifier(activityId);

        // Verificar si el país y la actividad existen (ignorando mayúsculas y espacios)
        const country = await Country.findOne({
            where: {
                [Op.and]: [
                    Sequelize.fn("lower", Sequelize.col("id")),
                    { [Op.eq]: formattedCountryId }
                ]
            }
        });
        const activity = await Activity.findOne({
            where: {
                [Op.and]: [
                    Sequelize.fn("lower", Sequelize.col("id")),
                    { [Op.eq]: formattedActivityId }
                ]
            }
        });

        if (!country || !activity) {
            throw  Error("País o actividad no encontrada");
        }

        // Relacionar la actividad con el país en la tabla intermedia
        await Country_Activities.create({
            CountryId: country.id,
            ActivityId: activity.id
        });

        return "Actividad relacionada exitosamente con el país.";
    } catch (error) {
        throw  Error("Error al relacionar actividad con país: " + error.message);
    }
};



module.exports = {
  
    getCountryById,
    getAllCountries,
    getCountryByName,
    getAllCountriesWithActivities,
    getCountriesWithActivityByName,
    relateActivityToCountry 
};
