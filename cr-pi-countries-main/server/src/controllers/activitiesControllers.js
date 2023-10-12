const { Activity } = require("../db");
const { Op } = require('sequelize');

//! Crear Actividad
const createActivity = async (name, difficulty, duration, season, countries) => {
    // Cambiamos 'name' en el where a ser insensible a mayúsculas/minúsculas
    const newActivity = await Activity.create({ name, difficulty, duration, season });
    const countryActivity = await newActivity.addCountry(countries);
    return countryActivity;
};

//! Obtener todas las Actividades
const getAllActivities = async () => {
    const allActivities = await Activity.findAll();
    return allActivities;
};

//! Obtener Actividades por Nombre (insensible a mayúsculas/minúsculas)
const getActivityByName = async (name) => {
    const dbCountry = await Activity.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    });
    return dbCountry;
};

module.exports = {
    createActivity,
    getAllActivities,
    getActivityByName,
};
