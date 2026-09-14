const express = require("express")
const authMiddleware = require("../middleware/authMiddleware") 
const statusCode = require("../utils/statusCode")
const AdminController = require("../controller/adminController")



const route = express.Router()



route.get("/admin_dashboard", authMiddleware.verifyToken , authMiddleware.roleCheck("admin"), (req,res)=>{
    return res.status(statusCode.OK).json({
        success : true,
        message : "Welcome to the  Admin Dashboard !!"
    })
})
//approve artist
// APPROVE ARTIST
route.patch(
    "/approve-artist/:id",
    authMiddleware.verifyToken,
    authMiddleware.roleCheck("admin"),
    AdminController.approveArtist
);

// GET ALL USERS
route.get(
    "/users",
    authMiddleware.verifyToken,
    authMiddleware.roleCheck("admin"),
    AdminController.getAllUsers
);


// GET ALL ARTISTS
route.get(
    "/artists",
    authMiddleware.verifyToken,
    authMiddleware.roleCheck("admin"),
    AdminController.getAllArtists
);

// BLOCK / UNBLOCK USER
route.patch(
    "/block-user/:id",
    authMiddleware.verifyToken,
    authMiddleware.roleCheck("admin"),
    AdminController.blockUser
);


// BLOCK / UNBLOCK ARTIST
route.patch(
    "/block-artist/:id",
    authMiddleware.verifyToken,
    authMiddleware.roleCheck("admin"),
    AdminController.blockArtist
);

// create , update , delte , admin ()

module.exports = route