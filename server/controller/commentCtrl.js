import { Comment } from '../model/commentModel.js'
import { Posts } from '../model/postModel.js';

const commentCtrl = {
  createComment: async (req, res) => {
    try {
      const { content, postId, tag, reply, postUserId } = req.body;
  
      const post = await Posts.findById(postId)
  
      if (!post) return res.status(400).json({ msg: "Post no encontrado" })
          
      const newComment = await new Comment({
        user: req.user._id, content, tag, reply, postUserId, postId
      })
  
          
      await Posts.findOneAndUpdate({ _id: postId }, {
        $push: { commentss: newComment._id }
      })
  
      await newComment.save()
      return res.json({ newComment })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },


  updateComment: async (req, res) => {
    try {
      const { content} = req.body;
  
      await Comment.findOneAndUpdate({_id: req.params.id, user:req.user._id},{content})
      
  
      
    
      return res.json({ msg:'update succesfully'})
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
}

  export default commentCtrl;