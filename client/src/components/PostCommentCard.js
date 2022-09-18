import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector } from "react-redux";
import CommentMenuItem from "./CommentMenuItem";
import LikePost from "./LikePost";

const PostCommentCard = ({ comment, pos }) => {
  const {auth}= useSelector(state => state)
  const [content, setContent] = useState('')
  const [readMore, setreadMore] = useState(false);

  const [isLike, setIsLike] = useState(false)
  
  const handleLike = () => {
    setIsLike(true)
  }

  const handleUnLike = () => {
    setIsLike(false)
  }
  useEffect(() => {
    setContent(comment.content)
    
},[comment.content])

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

            <h4 className="postCommentCardfullname">{comment.user.fullname}</h4>
            <h6 className="postCommentCardtime">
              {moment(comment.createdAt).fromNow()}
              </h6>
              </div>
          </div>
          </Link>
          <div className="postCommentCarduserdropdown">
          <CommentMenuItem auth={ auth} comment={comment} pos={pos} />
          </div>
        </div>
     
      <div className="postCommentCardcommentcontent">
        <div className="postCommentCardcommentcontent-content">
          <span>
            {content.length < 100 ? content : readMore ? content + '..' : content.slice(0, 100) + '..'}
            </span>
          <span>
              {
                        content?.length > 100 &&
                        <span style={{color:'black', cursor:'pointer'}} onClick={()=>setreadMore(!readMore)}>
                        {
                        readMore ? 'Hide ' : "Show "
                        }
                        </span>
                    }
          </span>
        </div>
        <div className="postCommentCardavatarcommentcontent-likes">
         <p className="postCommentCardavatarcommentcontent-likescount">{comment.likes.length}</p> 
          <FavoriteBorderIcon style={{color:'red'}}/><p className="postCommentCardavatarcommentcontent-reply">Respuesta</p>
        </div>
      </div>
      <div className="postCmmentCardLikeButton">
        <LikePost isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike}/>
      </div>
    </div>
  );
};

export default PostCommentCard;
