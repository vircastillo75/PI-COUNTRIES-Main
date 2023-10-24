const { Router } = require("express");

const countriesRouter = Router();

const {
    getCountriesHandler,
    detailCountriesHandler,
    getCountriesWithActivitiesHandler,
    relateActivityToCountryHandler,
  
} = require("../handlers/countriesHandlers");

// Ruta para obtener todos los países o buscar un país por nombre
countriesRouter.get("/", getCountriesHandler);

// Ruta para obtener todos los países con actividades o buscar un país por ID
countriesRouter.get("/activities", getCountriesWithActivitiesHandler);

// Ruta para obtener detalles de un país por ID
countriesRouter.get("/:id", detailCountriesHandler);

// Ruta para relacionar una actividad con un país
countriesRouter.post("/relateActivityToCountry", relateActivityToCountryHandler);



module.exports = countriesRouter;
