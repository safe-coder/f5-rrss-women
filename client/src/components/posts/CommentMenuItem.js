import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../redux/actions/commentActions";

const CommentMenuItem = ({ comment, pos, auth, setonEdit }) => {
  const [menuitem, setMenuitem] = useState(false);
  const dispatch = useDispatch();

  const handleRemove = () => {
    if (pos.user._id === auth.user._id || comment.user._id === auth.user._id) {
      dispatch(deleteComment({ comment, pos, auth }));
    }
  };
  const handleEditComment = () => {
    setonEdit(true);
    setMenuitem(false);
  };

  const MenuItem = () => {
    return (
      <>
        <div className="commentMenuitemlist">
          <h6
            className="commentMenuitemedit"
            style={{ cursor: "pointer" }}
            onClick={handleEditComment}
          >
            Edit
          </h6>
          <h6
            className="commentMenuitemdelete"
            style={{ cursor: "pointer" }}
            onClick={handleRemove}
          >
            Remove
          </h6>
        </div>
      </>
    );
  };

  return (
    <div className="CommentMenuItem">
      {(pos.user._id === auth.user._id ||
        comment.user._id === auth.user._id) && (
        <div
          className="CommentMenuItem"
          style={{ cursor: "pointer" }}
          onClick={() => setMenuitem(!menuitem)}
        >
          {" "}
          <MoreHorizIcon fontSize="large" style={{ color: "#240046" }} />{" "}
        </div>
      )}
      {menuitem ? (
        pos.user._id === auth.user._id ? (
          comment.user._id === auth.user._id ? (
            MenuItem()
          ) : (
            <h6
              className="commentMenuitemdelete"
              style={{ cursor: "pointer" }}
              onClick={handleRemove}
            >
              Borrar
            </h6>
          )
        ) : (
          comment.user._id === auth.user._id && MenuItem()
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default CommentMenuItem;
