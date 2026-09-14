const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const statusCode = require("../utils/statusCode");
const artistController = require("../controller/artistController");

const route = express.Router();


// ARTIST DASHBOARD
route.get(
    "/artist_dashboard",
    authMiddleware.verifyToken,
    authMiddleware.roleCheck("artist"),
    (req, res) => {

        return res.status(statusCode.OK).json({
            success: true,
            message: "Welcome to the Artist Dashboard !!"
        });
    }
);


// CREATE SONG
route.post(
    "/artist/createSong",
    authMiddleware.verifyToken,
    authMiddleware.roleCheck("artist"),
    artistController.createSong
);


// GET ALL MY SONGS
route.get(
    "/artist/getAllSong",
    authMiddleware.verifyToken,
    authMiddleware.roleCheck("artist"),
    artistController.getMySongs
);


// GET SONG BY ID
route.get(
    "/artist/getSong/:id",
    authMiddleware.verifyToken,
    authMiddleware.roleCheck("artist"),
    artistController.getSongById
);


// DELETE SONG
route.delete(
    "/artist/deleteSong/:id",
    authMiddleware.verifyToken,
    authMiddleware.roleCheck("artist"),
    artistController.deleteSong
);


module.exports = route;