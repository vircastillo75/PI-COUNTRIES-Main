const { Router } = require("express");

const {createActivitiesHandlers, getActivitiesHandlers}= require("../handlers/activitiesHandlers");

const activitiesRouter = Router();

activitiesRouter.post("/", createActivitiesHandlers );

activitiesRouter.get("/", getActivitiesHandlers);


module.exports = activitiesRouter;