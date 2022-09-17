import React from 'react'
import PostCommentDisplay from './PostCommentDisplay'

const PostComments = ({pos}) => {
  return (
    <div>
      {
        pos.commentss && pos.commentss.map(comment => (
          <PostCommentDisplay comment={comment} pos={pos} /> 
        ))
     }
    </div>
  )
}

export default PostComments
