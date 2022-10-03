import React, { useState, useEffect } from "react";
import PostCommentDisplay from "./PostCommentDisplay";

const PostComments = ({ pos }) => {
  const [comments, setComments] = useState([]);
 
 

  useEffect(() => {
    const ncm = pos.commentss
    setComments(ncm);
   
  }, [pos.commentss]);

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <PostCommentDisplay
            comment={comment}
            pos={pos}
            key={comment._id}
           
           
          />
        ))}
      {/* {comments.length - next > 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "5px 0",
            margin: "0 auto",
            fontSize: "13px",
            backgroundColor: "transparent",
            color: "rgb(26, 21, 54)",
            cursor: "pointer",
            fontWeight: "500",
            borderRadius: "50px",
            border: "2px solid #240046",
            width: "50%",
          }}
          onClick={() => setNext((prev) => prev + 10)}
        >
          Leer más
        </div>
      ) : (
        comments.length > 2 && (
          <div
            style={{
              textAlign: "center",
              padding: "5px 0",
              fontSize: "13px",
              margin: "0 auto",
              backgroundColor: "transparent",
              color: "rgb(26, 21, 54)",
              cursor: "pointer",
              fontWeight: "500",
              borderRadius: "50px",
              border: "2px solid #240046",
              width: "50%",
            }}
            onClick={() => setNext(2)}
          >
            Ocultar
          </div>
        )
      )} */}
    </div>
  );
};

export default PostComments;
