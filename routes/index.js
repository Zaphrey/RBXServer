const controllers = require("../controllers/index")
const express = require("express")
const routes = express.Router();

routes.get("/", controllers.sendMessage)

module.exports = routes