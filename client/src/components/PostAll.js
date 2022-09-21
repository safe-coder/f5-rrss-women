import React from "react";
import { useSelector } from "react-redux";
import InputPostComment from "./InputPostComment";
import  "../styles/Posts.css";
import PostCardBody from "./PostCardBody";
import PostCardFooter from "./PostCardFooter";
import PostCardHeader from "./PostCardHeader";
import PostComments from "./PostComments";
import Status from "./Status";

const PostAll = () => {
  const { postAll } = useSelector((state) => state);
console.log(postAll);
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
        postAll.post.map((pos) => (
          <div
            className="postCards"
            key={pos._id}
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
