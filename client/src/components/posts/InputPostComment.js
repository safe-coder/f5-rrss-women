import React, { useState } from "react";
import "../../styles/CommentStyle.css";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/commentActions.js";

const InputPostComment = ({ children, pos, comment }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      return;
    }
    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
    };

    dispatch(createComment({ pos, newComment, auth, socket }));

    SetContent("");
  };
  const [content, SetContent] = useState("");
  return (
    <div className="inputpostcomments">
      <div className="inputpostcomments-left">
        <img src={auth.user.avatar} alt="" />
      </div>
      {children}
      <input
        className="inputpostcomments-input"
        type="text"
        placeholder="Escribe tu respuesta"
        value={content}
        onChange={(e) => {
          SetContent(e.target.value);
        }}
      />

      <button className="inputpostcomments-button" onClick={handleSubmit}>
        {" "}
        Enviar{" "}
      </button>
    </div>
  );
};

export default InputPostComment;
