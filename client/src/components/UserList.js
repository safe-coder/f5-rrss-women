import * as React from 'react';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import {useSelector} from "react-redux"

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export default function UserList() {
  const [data, setData] = useState([]);
  const {auth} = useSelector(state => state)
  console.log(data);
  console.log(auth)
  

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/", {
        headers: { 'Authorization': + 'Bearer' + auth.token }
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }, []);
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 500 }}>
       {/* {
                usersList && usersList. > 0 && homePost.post.map((pos)=>(
                    <div className="postCards" key={pos._id}style={{backgroundColor:'white',padding:'1rem', marginTop:'1rem', borderRadius:'10px', boxShadow:'3px 3px 5px gray',width:'500px'}} >
                        
                    </div>
                ))
            } */}
        <Grid item xs={12} md={6}>
            <List>
              {generate(
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
<p>Nombre de usuaria</p>
                </ListItem>,
              )}
            </List>
        </Grid>
    </Box>
  );
}
