const Song = require("../models/songModel");
const UserModel = require("../models/userModel");

class SoundSphereController {

    // CREATE SONG
    async createSong(req, res) {
        try {

            const artist = await UserModel.findOne({
                _id: req.user.id,
                role: "artist",
                isApproved: true,
                isBlocked: false
            });

            if (!artist) {
                return res.status(403).json({
                    success: false,
                    message: "Artist is not approved or is blocked"
                });
            }

            const {
                title,
                description,
                audioUrl,
                coverImageUrl
            } = req.body;

            const song = await Song.create({
                artistId: req.user.id,
                title,
                description,
                audioUrl,
                coverImageUrl
            });

            return res.status(201).json({
                success: true,
                message: "Song created successfully",
                data: song
            });

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: error.message
            });
        }
    }


    // GET ALL MY SONGS
    async getMySongs(req, res) {
        try {

            const artist = await UserModel.findOne({
                _id: req.user.id,
                role: "artist",
                isApproved: true,
                isBlocked: false
            });

            if (!artist) {
                return res.status(403).json({
                    success: false,
                    message: "Artist is not approved or is blocked"
                });
            }

            const songs = await Song.find({
                artistId: req.user.id
            });

            return res.status(200).json({
                success: true,
                message: "Songs fetched successfully",
                data: songs
            });

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: error.message
            });
        }
    }


    // GET SONG BY ID
    async getSongById(req, res) {
        try {

            const artist = await UserModel.findOne({
                _id: req.user.id,
                role: "artist",
                isApproved: true,
                isBlocked: false
            });

            if (!artist) {
                return res.status(403).json({
                    success: false,
                    message: "Artist is not approved or is blocked"
                });
            }

            const song = await Song.findOne({
                _id: req.params.id,
                artistId: req.user.id
            });

            if (!song) {
                return res.status(404).json({
                    success: false,
                    message: "Song not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Song fetched successfully",
                data: song
            });

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: error.message
            });
        }
    }


    // DELETE SONG
    async deleteSong(req, res) {
        try {

            const artist = await UserModel.findOne({
                _id: req.user.id,
                role: "artist",
                isApproved: true,
                isBlocked: false
            });

            if (!artist) {
                return res.status(403).json({
                    success: false,
                    message: "Artist is not approved or is blocked"
                });
            }

            const song = await Song.findOneAndDelete({
                _id: req.params.id,
                artistId: req.user.id
            });

            if (!song) {
                return res.status(404).json({
                    success: false,
                    message: "Song not found or you don't have permission"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Song deleted successfully",
                data: song
            });

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: error.message
            });
        }
    }
}

module.exports = new SoundSphereController();