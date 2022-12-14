import { Users } from "../model/userModel.js";
import { Comment } from "../model/commentModel.js";
import { Posts } from "../model/postModel.js";
import bcrypt from "bcrypt";

const userCtrl = {
  searchUser: async (req, res) => {
    try {
      const users = await Users.find({
        username: { $regex: req.query.username },
      })
        .limit(10)
        .select("fullname username avatar");

      res.status(200).json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findOne({ _id: req.params.id })
        .select("-password")
        .populate("friends following", "-password");
      if (!user) return res.status(400).json({ msg: "El usuario no existe" });
      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await Users.deleteOne({ _id: req.params.id });
      await Comment.deleteMany({ user: req.params.id });
      await Posts.deleteMany({ user: req.params.id });
      if (!user) return res.status(400).json({ msg: "El usuario no existe" });

      res.json({ msg: "Borrado correctamente" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await Users.find();

      res.status(200).json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { website, fullname, story, address, avatar, banner, password } =
        req.body;
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "La contraseña debe tener 6 caracteres como mínimo" });
      const passwordHash = await bcrypt.hash(password, 13);
      if (!fullname) return res.status(500).json({ msg: "Nombre requerido" });

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          website,
          fullname,
          story,
          address,
          avatar,
          banner,
          password: passwordHash,
        }
      );

      res.json({ msg: "Actualización realizada" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  friend: async (req, res) => {
    try {
      const user = await Users.find({
        _id: req.params.id,
        friends: req.user._id,
      });
      if (user.length > 0)
        return res.status(400).json({ msg: "Usuario seguido" });

      const newUser = await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { friends: req.user._id },
        },
        { new: true }
      ).populate("friends following", "-password");

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: { following: req.params.id },
        },
        { new: true }
      );

      res.json({ newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unfriend: async (req, res) => {
    try {
      const newUser = await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { friends: req.user._id },
        },
        { new: true }
      ).populate("friends following", "-password");

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { following: req.params.id },
        },
        { new: true }
      );

      res.json({ newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default userCtrl;
