const { Router } = require("express");

const countriesRouter = Router(); // Cambiamos el nombre a countriesRouter para mayor consistencia

const {
    getCountriesHandler,
    detailCountriesHandler,
    createCountryHandler,
    getCountriesWithActivitiesHandler,
    relateActivityToCountryHandler,
} = require("../handlers/countriesHandlers");

// Ruta para obtener todos los países o buscar un país por nombre
countriesRouter.get("/", getCountriesHandler);

// Ruta para obtener todos los países con actividades o buscar un país por ID
countriesRouter.get("/activities", getCountriesWithActivitiesHandler);

// Ruta para crear un nuevo país
countriesRouter.post("/", createCountryHandler);

// Ruta para obtener detalles de un país por ID
countriesRouter.get("/:id", detailCountriesHandler);

// Ruta para relacionar una actividad con un país
countriesRouter.post("/relateActivityToCountry", relateActivityToCountryHandler);


module.exports = countriesRouter; // Exportamos el router configurado
