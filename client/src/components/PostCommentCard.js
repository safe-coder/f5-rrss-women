import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import 'moment/locale/es';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector, useDispatch } from "react-redux";
import CommentMenuItem from "./CommentMenuItem";
import LikePost from "./LikePost";
import { updateComment } from '../redux/actions/commentActions.js'


const PostCommentCard = ({ comment, pos }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch()
  const [content, setContent] = useState("");
  const [readMore, setreadMore] = useState(false);
  const [onEdit, setonEdit] = useState(false);

  const [isLike, setIsLike] = useState(false);

  const handleLike = () => {
    setIsLike(true);
  };

  const handleUnLike = () => {
    setIsLike(false);
  };

  const handleupdatecomment = () => {
    if (comment.content === content) {
      setonEdit(false)
    } else {
      dispatch(updateComment({ comment, content, pos, auth }))
      setonEdit(false)
    }
  }

  useEffect(() => {
    setContent(comment.content);
  }, [comment.content]);

  return (
    <div className="postCommentCard">
      <div className="postCommentCarduser">
        <Link to={`profile/${comment.user._id}`}>
          <div className="postCommentCarduserinfo">
            <img
              className="postCommentCardavatar"
              src={comment.user.avatar}
              alt={comment.user.fullname}
            />
            <div className="postCommentCardavatarinfo">
              <h4 className="postCommentCardfullname">
                {comment.user.fullname}
              </h4>
              <h6 className="postCommentCardtime">
                {moment(comment.createdAt).fromNow()}
              </h6>
            </div>
          </div>
        </Link>
        <div className="postCommentCarduserdropdown">
          <CommentMenuItem
            auth={auth}
            comment={comment}
            pos={pos}
            setonEdit={setonEdit}
          />
        </div>
      </div>

      <div className="postCommentCardcommentcontent">
        <div className="postCommentCardcommentcontent-content">
          {onEdit ? (
            <textarea value={ content} onChange={(e)=>setContent(e.target.value)} rows="5" placeholder="change your opinion" style={{width:'100%', background:'transparent', resize:'none'}} />
          ) : (
            <>
              <span>
                {content.length < 100
                  ? content
                  : readMore
                  ? content + ".."
                  : content.slice(0, 100) + ".."}
              </span>
              <span>
                {content?.length > 100 && (
                  <span
                    style={{ color: "black", cursor: "pointer" }}
                    onClick={() => setreadMore(!readMore)}
                  >
                    {readMore ? "Hide " : "Show "}
                  </span>
                )}
              </span>
            </>
          )}

        </div>
        <div className="postCommentCardavatarcommentcontent-likes">
          <p className="postCommentCardavatarcommentcontent-likescount">
            {comment.likes.length}
          </p>
          <FavoriteBorderIcon style={{ color: "red" }} />
          {onEdit ? 
            <>
               <p className="postCommentCardavatarcommentcontent-reply" onClick={()=>handleupdatecomment()} style={{cursor:'pointer'}}>update</p>
               <p className="postCommentCardavatarcommentcontent-reply"onClick={()=>setonEdit(false)}>cancel</p>
            </>
            :
            <p className="postCommentCardavatarcommentcontent-reply" onClick={()=> handleupdatecomment()}>Respuesta</p>
          }
        </div>
      </div>
      <div className="postCmmentCardLikeButton">
        <LikePost
          isLike={isLike}
          handleLike={handleLike}
          handleUnLike={handleUnLike}
        />
      </div>
    </div>
  );
};

export default PostCommentCard;
