import React, { useState, useEffect } from "react";
import PostCommentDisplay from "./PostCommentDisplay";

const PostComments = ({ pos }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const ncm = pos.commentss;
    setComments(ncm);
  }, [pos.commentss]);

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <PostCommentDisplay comment={comment} pos={pos} key={comment._id} />
        ))}
    </div>
  );
};

export default PostComments;
