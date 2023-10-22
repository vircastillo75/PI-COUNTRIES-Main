const { Activity } = require("../db"); // importamos modelo
//const { Op } = require('sequelize');

//! Crear Actividad
const createActivity = async (name, difficulty, duration, season, countries) => {
    const newActivity = await Activity.create({ name, difficulty, duration, season });
    const countryActivity = await newActivity.addCountry(countries);
    return countryActivity;
};

//! Obtener todos las Actividades
const getAllActivities = async () => {
    const allActivities = await Activity.findAll();
    return allActivities;
};

//! Obtener Actividades por Nombre
const getActivityByName = async (name) => {
    const dbCountry = await Activity.findAll({ where: { name: name } });
    return dbCountry;
};

module.exports = {
    createActivity,
    getAllActivities,
    getActivityByName,
};
