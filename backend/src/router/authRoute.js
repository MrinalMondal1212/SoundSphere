const express = require("express")
const AuthController = require("../controller/authController")
const route = express.Router()


route.post("/register", AuthController.register)
route.post("/login", AuthController.login)




module.exports = route