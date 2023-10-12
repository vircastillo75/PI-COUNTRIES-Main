const { Router } = require("express");
const { detailCountriesHandler, getCountriesHandler } = require("../handlers/countriesHandlers");

const countriesRouter = Router(); // Creamos una instancia de Router

// Definir rutas
countriesRouter.get("/:idPais", detailCountriesHandler); // Ruta para obtener detalles de un país por ID
countriesRouter.get("/", getCountriesHandler); // Ruta para obtener detalles de un país por nombre o todos los países

module.exports = countriesRouter;
// Exportamos el router configurado