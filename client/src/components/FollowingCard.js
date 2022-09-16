import React from 'react' ;
import  GlobalCard  from './GlobalCard';


const FollowingCard = ({user}) =>{
    
    return (
       
        <>
        <div style={{width:'300px', fontSize: '1.4rem', maxWidth:'100%',minHeight:'20px',padding:"1rem",margin:'1rem auto',background:'#240046', color:'#FF9E00', borderRadius: '50px'}}>
            <h4 style={{textAlign:'center' }}>
            {user.length} <span> Siguiendo </span> 
            </h4>
        </div>
        <div style={{width:'1100px', maxWidth:'100%', margin:'1rem auto',display:'grid', gridTemplateColumns:'repeat(4,1fr)'}}>
            
            {user.length > 0 && user.map(fol=> (
            <GlobalCard user={fol} key={fol._id}/>
            ))}
        </div>
        </>
        
    )
}

export default FollowingCard