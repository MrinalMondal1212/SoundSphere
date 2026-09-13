const express = require("express")
const authMiddleware = require("../middleware/authMiddleware") 
const statusCode = require("../utils/statusCode")



const route = express.Router()



route.get("/artist_dashboard", authMiddleware.verifyToken , authMiddleware.roleCheck("artist"), (req,res)=>{
    return res.status(statusCode.OK).json({
        success : true,
        message : "Welcome to the  Artist Dashboard !!"
    })
})

// create , update , delte , admin ()

module.exports = route