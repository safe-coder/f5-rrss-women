import React, { useState } from 'react'

const CommentMenuItem = ({ comment, pos, auth }) => {

  const [menuitem, setMenuitem] = useState(false)
  
  const MenuItem = () => {
   
    return (
      <>
      <div className="commentMenuitemlist">
          <h6 className="commentMenuitemedit"  style={{cursor:'pointer'}}>Edit</h6>
          <h6 className="commentMenuitemdelete" style={{cursor:'pointer'}} >Remove</h6>
      </div>
      </>
    )
  }

  return (
    <div className='CommentMenuItem'>
    
      {
        (pos.user._id === auth.user._id || comment.user._id === auth.user._id) && <div className='CommentMenuItem' style={{cursor:"pointer"}} onClick={()=>setMenuitem(!menuitem)}> ooo </div>
      }
      {
       menuitem ? ( pos.user._id === auth.user._id ? comment.user._id === auth.user._id ? MenuItem() : <h6 className='commentMenuitemdelete'>Remove</h6> :comment.user._id === auth.user._id && MenuItem()) : ""
      }
    </div>
  )
}

export default CommentMenuItem
