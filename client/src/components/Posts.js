import React from "react";
import { useSelector } from "react-redux";
import InputPostComment from "./InputPostComment";
import  "../styles/Posts.css";
import PostCardBody from "./PostCardBody";
import PostCardFooter from "./PostCardFooter";
import PostCardHeader from "./PostCardHeader";
import PostComments from "./PostComments";

const Posts = () => {
  const { homePost } = useSelector((state) => state);
// console.log(homePost);
  return (
    <div
      className="posts"
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "center",
      //   gap: "1rem",
      // }}
    >
      {homePost &&
        homePost.post.length > 0 &&
        homePost.post.map((pos, index) => (
          <div
            className="postCards"
            key={index}
            // style={{
            //   backgroundColor: "#EEDAFF",
            //   padding: "1rem",
            //   border: "2px solid #240046",
            //   borderRadius: "20px",
            //   boxShadow: "#240046 5px 5px",
            //   width: "100%",
            // }}
          >
            <div className="post-head"><PostCardHeader pos={pos}/></div>
<div className="post-body">
            <PostCardBody pos={pos} />
            <PostCardFooter pos={pos} />
            <PostComments pos={pos} />
            <InputPostComment pos={pos} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Posts;
