const { Country, Activity, Country_Activities } = require("../db");
const { Op, Sequelize } = require("sequelize");

// Función para eliminar espacios y convertir a minúsculas
const formatIdentifier = (identifier) => identifier.trim().toLowerCase();

// Obtener un país por ID
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
            throw Error("País no encontrado");
        }
    } catch (error) {
        throw Error("Error al obtener el país: " + error.message);
    }
};

// Obtener todos los países
const getAllCountries = async () => {
    const dbCountry = await Country.findAll();
    return dbCountry;
};

// Obtener un país por nombre
const getCountryByName = async (name) => {
    const formattedName = formatIdentifier(name);
    const dbCountry = await Country.findAll({
        where: {
            name: {
                [Op.iLike]: `%${formattedName}%`
            }
        }
    });
    return dbCountry;
};

// Obtener países con al menos una actividad
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

// Obtener países con una actividad específica por nombre
const getCountriesWithActivityByName = async (activityName) => {
    const formattedActivityName = formatIdentifier(activityName);
    const countriesWithSpecificActivity = await Country.findAll({
        include: [
            {
                model: Activity,
                attributes: ["name", "difficulty", "duration", "season"],
                through: { attributes: ["CountryId", "ActivityId"] }
            }
        ],
        where: {
            "$Activities.name$": {
                [Op.iLike]: `%${formattedActivityName}%`
            }
        }
    });
    return countriesWithSpecificActivity;
};


// Relacionar una actividad con un país
const relateActivityToCountry = async (countryId, activityId) => {
    try {
        const formattedCountryId = formatIdentifier(countryId);
        const formattedActivityId = formatIdentifier(activityId);
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
            throw Error("País o actividad no encontrada");
        }

        await Country_Activities.create({
            CountryId: country.id,
            ActivityId: activity.id
        });

        return "Actividad relacionada exitosamente con el país.";
    } catch (error) {
        throw Error("Error al relacionar actividad con país: " + error.message);
    }
};



module.exports = {
    getCountryById,
    getAllCountries,
    getCountryByName,
    getAllCountriesWithActivities,
    getCountriesWithActivityByName,
    relateActivityToCountry,
 
};
