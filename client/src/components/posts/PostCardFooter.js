import React, { useEffect, useState } from 'react';

import {useSelector, useDispatch} from 'react-redux';
import CommentIcon from '@mui/icons-material/Comment';
import "../../styles/PostCard.css"
import {likepost, unlikepost} from '../../redux/actions/postActions.js';
import LikePost from './LikePost';


const PostCardFooter = ({pos}) =>{
    const [isLike, setIsLike] = useState(false)
    const[load, setLoad] = useState(false)
    const { auth, socket } = useSelector(state => state)
    
    const dispatch = useDispatch()

    useEffect(() => {
        if (pos.likes.find(like => like._id === auth.user._id)) {
        setIsLike(true)
    }
},[pos.likes, auth.user._id])

    const handleLike = async() => {
        if (load) return;
        setIsLike(true)
        setLoad(true)
        dispatch(likepost({ pos, auth, socket }))
        setLoad(false)
    }

    const handleUnLike =async () => {
        if (load) return;
        setIsLike(false)
        setLoad(true)
        dispatch(unlikepost({ pos, auth, socket }))
        setLoad(false)
    }
    return (
        <div className="postcardfooter">
            <div className="postcardfooterbottom">
                <div className="postcardfooterbottomitems">
                    <LikePost isLike={isLike} handleLike={ handleLike} handleUnLike={handleUnLike} />
                <p> {pos.likes?.length} Likes </p>
                </div>
                <div className="postcardfooterbottomitems">
                <CommentIcon style={{color:'#FF9E00'}}/>
                <p style={{color:'#FF9E00'}}>  {pos.commentss?.length}  Respuestas </p>
                </div>
            </div>
        </div>
    )
}

export default PostCardFooter;