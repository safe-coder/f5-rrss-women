import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useSelector, useDispatch} from 'react-redux';
import CommentIcon from '@mui/icons-material/Comment';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {Link} from "react-router-dom"
import "../styles/PostCard.css"
import {likepost, unlikepost} from '../redux/actions/postActions.js';
import LikePost from './LikePost';


const PostCardFooter = ({pos}) =>{
    const [isLike, setIsLike] = useState(false)
    const[load, setLoad] = useState(false)
    const { auth } = useSelector(state => state)
    
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
        dispatch(likepost({ pos, auth }))
        setLoad(false)
    }

    const handleUnLike =async () => {
        if (load) return;
        setIsLike(false)
        setLoad(true)
        dispatch(unlikepost({ pos, auth }))
        setLoad(false)
    }
    return (
        <div className="postcardfooter">
            <div className="postcardfootertop">
                <div className="postcardfootertopitems">
                   <span> {pos.likes?.length} </span> 
                   <FavoriteBorderIcon style={{color:'red'}}/>
                </div>
                <div className="postcardfootertopitems">
                <span> {pos.commentss?.length} </span> 
                <CommentIcon/>
                </div>
            </div>
            <div className="postcardfooterbottom">
                <div className="postcardfooterbottomitems">
                    <LikePost isLike={isLike} handleLike={ handleLike} handleUnLike={handleUnLike} />
                <p> Like </p>
                </div>
                <Link to={`/post/${pos._id}`}>
                <div className="postcardfooterbottomitems">
                <CommentIcon/>
                <p> Respuesta </p>
                </div>
                </Link>
                <div className="postcardfooterbottomitems">
                <SaveAltIcon/>
                <p> Guardar </p>
                </div>
            </div>
        </div>
    )
}

export default PostCardFooter;