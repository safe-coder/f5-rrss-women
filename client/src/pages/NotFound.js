import React from 'react'
import "../styles/NotFound.css";
import {Link} from 'react-router-dom'
const NotFound = () => {
  return (
    <div className='notfound'>
      <h3 className='notfound-text'>Not Found</h3>
      <p className='notfound-found'>go to home page
     <Link to="/"className='notfound-link '> Here</Link> </p>
    </div>
  )
}

export default NotFound