const Song = require("../models/songModel");
const User = require("../models/userModel");

class SongController {
    async getAllSongs(req, res) {
        try {
            // Sort by latest first
            const songs = await Song.find().sort({ createdAt: -1 }).populate('artistId', 'name email');
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

    async toggleLike(req, res) {
        try {
            const { songId } = req.params;
            const userId = req.user.id;

            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ success: false, message: "User not found" });

            const isLiked = user.likedSongs.includes(songId);
            if (isLiked) {
                user.likedSongs = user.likedSongs.filter(id => id.toString() !== songId);
            } else {
                user.likedSongs.push(songId);
            }
            await user.save();

            return res.status(200).json({
                success: true,
                message: isLiked ? "Song unliked" : "Song liked",
                likedSongs: user.likedSongs
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    }

    async getLikedSongs(req, res) {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).populate({
                path: 'likedSongs',
                populate: { path: 'artistId', select: 'name email' }
            });
            
            return res.status(200).json({
                success: true,
                data: user.likedSongs
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    }
}

module.exports = new SongController();
