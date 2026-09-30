const Song = require("../models/songModel");

class SongController {
    async getAllSongs(req, res) {
        try {
            const songs = await Song.find().populate('artistId', 'name email');
            return res.status(200).json({
                success: true,
                message: "Songs fetched successfully",
                data: songs
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: error.message
            });
        }
    }
}

module.exports = new SongController();
