import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

const LikePost = ({isLike, handleLike,handleUnLike}) =>{
    return (
        <div>
           {
               isLike 
               ? <FavoriteIcon onClick={handleUnLike}  style={{color:'#FF9E00'}}/>
               : <FavoriteIcon onClick={handleLike}  style={{color:'#FF6D00'}}/>

           }
        </div>
    )
}

export default LikePost;