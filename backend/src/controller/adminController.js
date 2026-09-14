const userModel = require("../models/userModel");
const statusCode = require("../utils/statusCode");

class AdminController {

    // APPROVE ARTIST
    static async approveArtist(req, res) {
        try {
            const { id } = req.params;

            const artist = await userModel.findOne({
                _id: id,
                role: "artist"
            });

            if (!artist) {
                return res.status(404).json({
                    success: false,
                    message: "Artist not found"
                });
            }

            if (artist.isApproved) {
                return res.status(400).json({
                    success: false,
                    message: "Artist is already approved"
                });
            }

            artist.isApproved = true;

            await artist.save();

            return res.status(statusCode.OK).json({
                success: true,
                message: "Artist approved successfully",
                data: {
                    id: artist._id,
                    name: artist.name,
                    email: artist.email,
                    role: artist.role,
                    isApproved: artist.isApproved
                }
            });

        } catch (error) {
            console.log(error);

            return res.status(statusCode.SERVER_ERROR).json({
                success: false,
                message: "Internal Server Error !!"
            });
        }
    }


    // GET ALL USERS
    static async getAllUsers(req, res) {
        try {

            const users = await userModel.find(
                { role: "user" },
                {
                    password: 0
                }
            );

            return res.status(statusCode.OK).json({
                success: true,
                message: "Users fetched successfully",
                data: users
            });

        } catch (error) {
            console.log(error);

            return res.status(statusCode.SERVER_ERROR).json({
                success: false,
                message: "Internal Server Error !!"
            });
        }
    }


    // GET ALL ARTISTS
    static async getAllArtists(req, res) {
        try {

            const artists = await userModel.find(
                { role: "artist" },
                {
                    password: 0
                }
            );

            return res.status(statusCode.OK).json({
                success: true,
                message: "Artists fetched successfully",
                data: artists
            });

        } catch (error) {
            console.log(error);

            return res.status(statusCode.SERVER_ERROR).json({
                success: false,
                message: "Internal Server Error !!"
            });
        }
    }
    // BLOCK / UNBLOCK USER
    static async blockUser(req, res) {
        try {

            const { id } = req.params;

            const user = await userModel.findOne({
                _id: id,
                role: "user"
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            user.isBlocked = !user.isBlocked;

            await user.save();

            return res.status(statusCode.OK).json({
                success: true,
                message: user.isBlocked
                    ? "User blocked successfully"
                    : "User unblocked successfully",
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isBlocked: user.isBlocked
                }
            });

        } catch (error) {

            console.log(error);

            return res.status(statusCode.SERVER_ERROR).json({
                success: false,
                message: "Internal Server Error !!"
            });
        }
    }


    // BLOCK / UNBLOCK ARTIST
    static async blockArtist(req, res) {
        try {

            const { id } = req.params;

            const artist = await userModel.findOne({
                _id: id,
                role: "artist"
            });

            if (!artist) {
                return res.status(404).json({
                    success: false,
                    message: "Artist not found"
                });
            }

            artist.isBlocked = !artist.isBlocked;

            await artist.save();

            return res.status(statusCode.OK).json({
                success: true,
                message: artist.isBlocked
                    ? "Artist blocked successfully"
                    : "Artist unblocked successfully",
                data: {
                    id: artist._id,
                    name: artist.name,
                    email: artist.email,
                    role: artist.role,
                    isBlocked: artist.isBlocked
                }
            });

        } catch (error) {

            console.log(error);

            return res.status(statusCode.SERVER_ERROR).json({
                success: false,
                message: "Internal Server Error !!"
            });
        }
    }
}

module.exports = AdminController;