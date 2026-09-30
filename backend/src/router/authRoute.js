const express = require("express")
const AuthController = require("../controller/authController")
const authMiddleware = require("../middleware/authMiddleware")
const route = express.Router()

route.post("/register", AuthController.register)
route.post("/login", AuthController.login)
route.put("/updateProfile", authMiddleware.verifyToken, AuthController.updateProfile)

module.exports = route