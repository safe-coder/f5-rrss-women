import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import 'moment/locale/es';
import { useSelector, useDispatch } from "react-redux";
import CommentMenuItem from "./CommentMenuItem";
import LikePost from "./LikePost";
import "../../styles/CommentStyle.css"
import { updateComment, likecomment, unlikecomment } from '../../redux/actions/commentActions.js'


const PostCommentCard = ({ comment, pos }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch()
  const [content, setContent] = useState("");
  const [readMore, setreadMore] = useState(false);
  const [onEdit, setonEdit] = useState(false);

  const [isLike, setIsLike] = useState(false);
  const [load, setLoad] = useState(false)

  const handleLike = () => {
    if (load) return
    setIsLike(true);
    setLoad(true)
    dispatch(likecomment({ comment, pos, auth }))
    setLoad(false)
  };

  const handleUnLike = () => {
    if (load) return
    setIsLike(false);
    setLoad(true)
    dispatch(unlikecomment({ comment, pos, auth }))
    setLoad(false)
  }
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
      if (comment.likes.find(like => like._id === auth.user._id)) {
        setIsLike(true)
      }
    }, [comment.content, comment.likes,auth.user._id]);

    return (
      <div className="postCommentCard">
        <div className="postCommentCarduser">
          <Link to={`/profile/${comment.user?._id}`}>
            <div className="postCommentCarduserinfo">
              <img
                className="postCommentCardavatar"
                src={comment.user.avatar}
                alt={comment.user.fullname}
              />
              <div className="postCommentCardavatarinfo">
                <h4 className="postCommentCardfullname">
                 @{comment.user.fullname}
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
              <textarea value={content} onChange={(e) => setContent(e.target.value)} rows="5" placeholder="change your opinion" style={{ width: '100%', background: 'transparent', resize: 'none' }} />
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
            <LikePost
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
            {onEdit ?
              <>
                <button className="postCommentCard-aplicar" onClick={() => handleupdatecomment()} style={{ cursor: 'pointer' }}>Aplicar</button>
                <button className="postCommentCard-cancelar" onClick={() => setonEdit(false)}>Cancelar</button>
              </>
              :
              <p className="postCommentCardavatarcommentcontent-reply" onClick={() => handleupdatecomment()}></p>
            }
          </div>
        </div>
        <div className="postCmmentCardLikeButton">
        </div>
      </div>
    );
  };


export default PostCommentCard
