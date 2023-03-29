import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import AddHomeIcon from '@mui/icons-material/AddHome';
import EditIcon from '@mui/icons-material/Edit';


function MenuProfile() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AddHomeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Add a new advertisement" secondary="Jan 7, 2014" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <EditIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Edit existing advertisement" secondary="July 20, 2014" />
      </ListItem>
    </List>
  );
}

export default MenuProfile;
