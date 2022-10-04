import { Posts } from "../model/postModel.js";
import { Users } from "../model/userModel.js";
import { Comment } from "../model/commentModel.js";

const postCtrl = {
  createPost: async (req, res) => {
    try {
      const { content, images } = req.body;
      const newPost = new Posts({
        content,
        images,
        user: req.user._id,
      });
      await newPost.save();

      return res.status(200).json({
        msg: "Post guardado",
        newPost: {
          ...newPost._doc,
          user: req.user,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPost: async (req, res) => {
    try {
      const user = await Users.findOne({ _id: req.params.id });
      const posts = await Posts.find({
        user: [...user.following, req.params.id],
      })
        .sort("-createdAt")
        .populate("user likes", "username avatar fullname friends")
        .populate({
          path: "commentss",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });

      return res.status(200).json({
        msg: "Post encontrado",
        result: posts.length,
        posts,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //////////
  getPosts: async (req, res) => {
    try {
      const posts = await Posts.find()
        .sort("-createdAt")
        .populate("user likes", "username avatar fullname friends")
        .populate({
          path: "commentss",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });

      return res.status(200).json({
        msg: "Post encontrado",
        result: posts.length,
        posts,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  ////////
  updatePost: async (req, res) => {
    try {
      const { content, images } = req.body;

      const post = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          content,
          images,
        }
      ).populate("user likes", "username avatar fullname");

      return res.status(200).json({
        msg: "Post update",
        newPost: {
          ...post._doc,
          content,
          images,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  likePost: async (req, res) => {
    try {
      const post = await Posts.find({
        _id: req.params.id,
        likes: req.user._id,
      });

      if (post.length > 0)
        return res.status(400).json({ msg: "Ya le has dado like a este post" });

      const like = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      if (!like) return res.status(400).json({ msg: "Post no encontrado" });
      return res.json({
        msg: "Post Likes",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  unlikePost: async (req, res) => {
    try {
      const unlike = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

      if (!unlike) return res.status(400).json({ msg: "no post found" });
      return res.json({
        msg: "Post UnLikes",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUserPosts: async (req, res) => {
    try {
      const posts = await Posts.find({ user: req.params.id })
        .sort("-createdAt")
        .populate("user likes", "username avatar fullname")
        .populate({
          path: "commentss",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });

      return res.status(200).json({
        msg: "Post encontrado",
        result: posts.length,
        posts,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deletePost: async (req, res) => {
    try {
      const post = await Posts.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });
      await Comment.deleteMany({ _id: { $in: post.commentss } });

      return res.json({
        msg: "Post eliminado",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default postCtrl;
