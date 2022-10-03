import { Comment } from "../model/commentModel.js";
import { Posts } from "../model/postModel.js";

const commentCtrl = {
  createComment: async (req, res) => {
    try {
      const { content, postId, tag, reply, postUserId } = req.body;

      const post = await Posts.findById(postId);

      if (!post) return res.status(400).json({ msg: "Post no encontrado" });

      const newComment = await new Comment({
        user: req.user._id,
        content,
        tag,
        reply,
        postUserId,
        postId,
      });

      await Posts.findOneAndUpdate(
        { _id: postId },
        {
          $push: { commentss: newComment._id },
        }
      );

      await newComment.save();
      return res.json({ newComment });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateComment: async (req, res) => {
    try {
      const { content } = req.body;

      await Comment.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        { content }
      );

      return res.json({ msg: "Editado correctamente" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  likeComment: async (req, res) => {
    try {
      const comment = await Comment.find({
        _id: req.params.id,
        likes: req.user._id,
      });

      if (comment.length > 0)
        return res
          .status(400)
          .json({ msg: "Ya has dado like a este comentario" });

      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      return res.json({
        msg: "Comment Likes",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unlikeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

      return res.json({
        msg: "Comment UnLiked",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  /////////
  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.findOneAndDelete({
        _id: req.params.id,
        $or: [{ postUserId: req.user._id }, { user: req.user._id }],
      });

      const post = await Posts.findOneAndUpdate(
        { _id: comment.postId },
        {
          $pull: { commentss: req.params.id },
        }
      );

      res.json({
        msg: "Comentario eliminado",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default commentCtrl;
