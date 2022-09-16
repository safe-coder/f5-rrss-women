import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

const UserList = () => {
    return (
        <ul>
            <li>test</li>
        </ul>
    )
}

export default function UserList() {

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 500 }}>
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
