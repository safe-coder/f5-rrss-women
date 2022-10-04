import React from "react";
import Status from "../Status";
import { useSelector } from "react-redux";
import PostAll from "./PostAll";

const PostMid = () => {
  const { postAll } = useSelector((state) => state);

  return (
    <div className="homemid">
      <Status />
      {postAll && postAll.loading ? (
        <p> Loading .... </p>
      ) : postAll.result === 0 ? (
        <h4> No Post Available </h4>
      ) : (
        <PostAll />
      )}
    </div>
  );
};

export default PostMid;
