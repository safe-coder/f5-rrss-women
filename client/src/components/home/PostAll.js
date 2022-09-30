import React from "react";
import { useSelector } from "react-redux";
import InputPostComment from "../posts/InputPostComment";
import  "../../styles/Posts.css";
import PostCardBody from "../posts/PostCardBody";
import PostCardFooter from "../posts/PostCardFooter";
import PostCardHeader from "../posts/PostCardHeader";
import PostComments from "../posts/PostComments";


const PostAll = () => {
  const { postAll } = useSelector((state) => state);
// console.log(postAll);
  return (
    <>
    {/* <Status/> */}
    <div
      className="posts"
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "center",
      //   gap: "1rem",
      // }}
    >
      {postAll &&
        postAll.post.length > 0 &&
        postAll.post.map((pos, index) => (
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
      </>
  );
};

export default PostAll;
