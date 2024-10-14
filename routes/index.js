const controllers = require("../controllers/index")
const express = require("express")
const routes = express.Router();

routes.post("/add", controllers.addCommand)
routes.get("/commands/:index", controllers.getCommand)
routes.get("/commands", controllers.getCommands)

routes.post("/send/:index", controllers.sendCommand)
routes.post("/send", controllers.sendCommands)

module.exports = routes