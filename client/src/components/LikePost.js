import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';;

const LikePost = ({isLike, handleLike,handleUnLike}) =>{
    return (
        <div>
           {
               isLike 
               ? <FavoriteBorderIcon onClick={handleUnLike} style={{color:'purple'}}/>
               : <FavoriteBorderIcon onClick={handleLike} style={{color:'black'}}/>

           }
        </div>
    )
}

export default LikePost;