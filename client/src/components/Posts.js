import React from "react";
import { useSelector } from "react-redux";
import InputPostComment from "./InputPostComment";

import PostCardBody from "./PostCardBody";
import PostCardFooter from "./PostCardFooter";
import PostCardHeader from "./PostCardHeader";
import PostComments from "./PostComments";

const Posts = () => {
  const { homePost } = useSelector((state) => state);

  return (
    <div
      className="posts"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "80%",
      }}
    >
      {homePost &&
        homePost.post.length > 0 &&
        homePost.post.map((pos) => (
          <div
            className="postCards"
            key={pos._id}
            style={{
                display: "flex",
                flexDirection:"column",
                justifyContent: "center",
                alignContent: "center",
              backgroundColor: "#EEDAFF",
              padding: "1rem",
              border: "2px solid #240046",
              borderRadius: "20px",
              boxShadow: "#240046 5px 5px",
              width: "100%",
              maxWidth: "800px",
              minWidth:"326px",
            }}
          >
            <PostCardHeader pos={pos} />
            <PostCardBody pos={pos} />
            <PostCardFooter pos={pos} />
            <PostComments pos={pos} />
            <InputPostComment pos={pos} />
          </div>
        ))}
    </div>
  );
};

export default Posts;
