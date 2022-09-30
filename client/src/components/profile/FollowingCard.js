import React from 'react' ;
import  GlobalCard  from '../home/GlobalCard';
import { Grid } from '@mui/material';

const FollowingCard = ({user}) =>{
    
    return (
       
        <>
        <div style={{width:'300px', fontSize: '1.4rem', maxWidth:'100%',minHeight:'20px',padding:"1rem",margin:'1rem auto', background:'#240046', color:'#FF9E00', borderRadius: '50px'}}>
            <h4 style={{textAlign:'center' }}>
            {user.length} <span> Siguiendo </span> 
            </h4>
        </div>
        <Grid container style={{display: "flex", justifyContent: "center"}}>            
            {user.length > 0 && user.map(fol=> (
            <GlobalCard user={fol} key={fol._id}/>
            ))}
        </Grid>
        </>
        
    )
}

export default FollowingCard