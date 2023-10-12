const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

// Obtener un País por ID
const getCountryById = async (id) => {
    try {
        const dbCountry = await Country.findByPk(id, {
            include: {
                model: Activity,
                attributes: ["name", "difficulty", "duration", "season"],
                through: { attributes: [] } // Elimina atributos innecesarios
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
        throw new Error("Error al obtener el país: " + error.message);
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

module.exports = {
    getCountryById,
    getAllCountries,
    getCountryByName,
};
