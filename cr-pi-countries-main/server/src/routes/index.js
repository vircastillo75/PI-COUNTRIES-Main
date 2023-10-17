const { Router } = require("express");
const countriesRouters = require("./countriesRouter");
const activitiesRouters = require("./activitiesRouter");

const router = Router(); // Creamos una instancia de Router

// Creamos la redirección al router correspondiente
router.use("/countries", countriesRouters);
router.use("/activities", activitiesRouters);

module.exports = router; // Exportamos el router configurado