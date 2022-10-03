import React from "react";
import { useSelector } from "react-redux";
import InputPostComment from "../posts/InputPostComment";
import "../../styles/Posts.css";
import PostCardBody from "../posts/PostCardBody";
import PostCardFooter from "../posts/PostCardFooter";
import PostCardHeader from "../posts/PostCardHeader";
import PostComments from "../posts/PostComments";

const Posts = () => {
  const { homePost } = useSelector((state) => state);
  return (
    <div className="posts">
      {homePost &&
        homePost.post.length > 0 &&
        homePost.post.map((pos, index) => (
          <div className="postCards" key={index}>
            <div className="post-head">
              <PostCardHeader pos={pos} />
            </div>
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
