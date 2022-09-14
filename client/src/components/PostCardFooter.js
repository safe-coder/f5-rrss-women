import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import CommentIcon from '@mui/icons-material/Comment';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {Link} from "react-router-dom"
import "../styles/PostCard.css"


const PostCardFooter = ({pos}) =>{
   

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
                <p> Favorite </p>
                </div>
                <Link to={`/post/${pos._id}`}>
                <div className="postcardfooterbottomitems">
                <CommentIcon/>
                <p> Opinion </p>
                </div>
                </Link>
                <div className="postcardfooterbottomitems">
                <SaveAltIcon/>
                <p> Save </p>
                </div>
            </div>
        </div>
    )
}

export default PostCardFooter;