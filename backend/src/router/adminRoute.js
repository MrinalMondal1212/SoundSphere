const express = require("express")
const authMiddleware = require("../middleware/authMiddleware") 
const statusCode = require("../utils/statusCode")



const route = express.Router()



route.get("/admin_dashboard", authMiddleware.verifyToken , authMiddleware.roleCheck("admin"), (req,res)=>{
    return res.status(statusCode.OK).json({
        success : true,
        message : "Welcome to the  Admin Dashboard !!"
    })
})

// create , update , delte , admin ()

module.exports = route