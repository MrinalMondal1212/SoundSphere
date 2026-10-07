const express = require("express");
const songController = require("../controller/songController");
const authMiddleware = require("../middleware/authMiddleware");

const route = express.Router();

route.get("/songs", songController.getAllSongs);
route.post("/songs/:songId/like", authMiddleware.verifyToken, songController.toggleLike);
route.get("/songs/liked", authMiddleware.verifyToken, songController.getLikedSongs);

module.exports = route;
