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
import Button from '@mui/material/Button'

// function generate(element) {
//   return [0, 1, 2].map((value) =>
//     React.cloneElement(element, {
//       key: value,
//     }),
//   );
// }

export default function UserList() {
  const [data, setData] = useState([]);
  const {auth} = useSelector(state => state)
  console.log(data);
  console.log(auth)
  

  useEffect( () => {
    axios
      .get("http://localhost:5000/api/users/", {
        headers: { Authorization:  auth.token }
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data.users);
      });
  }, [auth.token]);

  const handleClick = (userId) => {
    axios
    .delete(`http://localhost:5000/api/user/${userId}`, {
      headers: { Authorization:  auth.token }
    })
}

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 500 }}>
     
        <Grid item xs={12} md={6}>
            <List>
            {data.map((user) => (
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <Button variant="text"  onClick={() => handleClick(user._id)}>
                        
                      <DeleteIcon /></Button>
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
<p>{user.username} </p>
                </ListItem>
              ))}
          
            </List>
        </Grid>
    </Box>
  );
}
