import React from 'react';
import { Link }  from 'react-router-dom'
import moment from 'moment'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const PostCommentCard = ({comment}) => {
  return (
    <div>
      {/* <Link to={`profile/${comment.user._id}`}>
        
        <div className=''>
          <img src={comment.user.avatar} alt={comment.user.fullname} />
          <div>
            <h4>{comment.user.fullname}</h4>
            <h6></h6>
          </div>
        </div>
      </Link>
      <div>
        <div>
          {comment.content}
        </div>
        <div>{ comment.likes.length}<FavoriteBorderIcon/></div>
      </div> */}
    </div>
  )
}

export default PostCommentCard
