const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "artist", "user"],
      default: "user",
    },

    // Singer profile fields (after creation of profile they can update their info)
    genre: {
      type: String,
      default: null,
    },

    bio: {
      type: String,
      default: null,
    },

    profileImage: {
      type: String,
      default: null,
    },

    // Mainly used for singer approval
    isApproved: {
      type: Boolean,
      default: false,
    },

    // Admin can block user/singer
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;