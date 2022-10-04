import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      maxlength: 25,
      require: true,
    },
    fullname: {
      type: String,
      trim: true,
      required: true,
      maxlength: 25,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "user",
    },
    avatar: {
      type: String,
      default: "https://i.ibb.co/HXmTg6n/user-avatar.png",
    },
    banner: {
      type: String,
      default: "https://i.ibb.co/ZVH0kb7/user-banner.png",
    },
    story: {
      type: String,
      default: "",
      maxlength: 200,
    },
    friends: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    following: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

export const Users = mongoose.model("user", userSchema);
