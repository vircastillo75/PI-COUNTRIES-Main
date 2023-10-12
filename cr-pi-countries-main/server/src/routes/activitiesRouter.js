const { Router } = require("express");
const { createActivitiesHandler, getAllActivitiesHandler } = require("../handlers/activitiesHandlers");

const activitiesRouter = Router(); // Creamos una instancia de Router

// Definir rutas
activitiesRouter.post("/", createActivitiesHandler); // Ruta para crear una nueva actividad turística
activitiesRouter.get("/", getAllActivitiesHandler); // Ruta para obtener todas las actividades turísticas

module.exports = activitiesRouter;
