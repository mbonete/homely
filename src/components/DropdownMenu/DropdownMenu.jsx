import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAPI } from '../../hooks/useAPI';
import { useNavigate } from 'react-router-dom';
import AlertDialog from '../AlertDialog/AlertDialog';


function DropdownMenu({children, userId, adId, onDelete}) {
  const { currentUser, deleteAd } = useAPI();
  const [isMyAd, setIsMyAd] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    setIsMyAd(currentUser?.id === userId);
  }, [currentUser?.id, userId]);



  const isOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const ownerMenu = [
    <MenuItem key="edit" onClick={() => navigate(`/ads/${adId}/edit`)}>Edit</MenuItem>,
    <MenuItem key="delete">
      <AlertDialog 
        title={'Delete'}
        question={'Are you sure you want to delete this ad?'}
        description={'Once you delete this ad it will disappear permanently'} 
        callback={() => deleteAd(adId)} 
      />
    </MenuItem>
  ];

  const genericMenu = [
    <MenuItem key="report" onClick={() => navigate(`/ads`)}>Report</MenuItem>,
    <MenuItem key="view-profile" onClick={() => navigate(`/ads`)}>View profile</MenuItem>
  ];

  return (
    <div>
      <IconButton aria-label="settings"
        id="basic-button"
        aria-controls={isOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleClick}
      >
        {children}
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {isMyAd ? ownerMenu : genericMenu }
      </Menu>
    </div>
  );
}


export default DropdownMenu;
