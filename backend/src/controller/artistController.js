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

            const { title, description } = req.body;
            
            const cloudinary = require("../config/cloudinary");
            const streamifier = require("streamifier");
            
            const uploadToCloudinary = (buffer, resourceType) => {
                return new Promise((resolve, reject) => {
                    const cld_upload_stream = cloudinary.uploader.upload_stream(
                        { resource_type: resourceType, folder: "SoundSphere" },
                        (error, result) => {
                            if (result) {
                                resolve(result.secure_url);
                            } else {
                                reject(error);
                            }
                        }
                    );
                    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
                });
            };

            if (!req.files || !req.files.audio || !req.files.coverImage) {
                return res.status(400).json({ success: false, message: "Audio and cover image files are required" });
            }

            const audioUrl = await uploadToCloudinary(req.files.audio[0].buffer, "video");
            const coverImageUrl = await uploadToCloudinary(req.files.coverImage[0].buffer, "image");

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

    // UPDATE SONG
    async updateSong(req, res) {
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

            const { title, description } = req.body;
            
            const song = await Song.findOneAndUpdate(
                { _id: req.params.id, artistId: req.user.id },
                { title, description },
                { new: true }
            );

            if (!song) {
                return res.status(404).json({
                    success: false,
                    message: "Song not found or you don't have permission"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Song updated successfully",
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