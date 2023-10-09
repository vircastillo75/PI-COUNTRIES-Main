const { Router } = require("express");

const {getCountriesHandler, getCountriesByIdHandler} = require("../handlers/countriesHandlers")


const countriesRouter = Router();


countriesRouter.get("/", getCountriesHandler);

countriesRouter.get("/:id", getCountriesByIdHandler);





module.exports = countriesRouter;