const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: null,
    },

    audioUrl: {
      type: String,
      required: true,
    },

    coverImageUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model("Song", songSchema);

module.exports = Song;