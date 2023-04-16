import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAPI } from '../../hooks/useAPI';
import { useNavigate } from 'react-router-dom';
import AlertDialog from '../AlertDialog/AlertDialog';



function DropdownMenu({children, userId, adId}) {
  const { currentUser, deleteAd } = useAPI();
  const [isMyAd, setIsMyAd] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const queryClient = useQueryClient();

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
    <MenuItem style={{position: 'relative'}} key="delete" onClick={() => setIsDeleteConfirmationOpen(true)}>Delete</MenuItem>
    
  ];

  const genericMenu = [
    <MenuItem key="report" onClick={() => navigate(`/ads`)}>Report</MenuItem>,
    <MenuItem key="view-profile" onClick={() => navigate(`/ads`)}>View profile</MenuItem>
  ];

  const onConfirmationResponse = async (response) => {
    setIsDeleteConfirmationOpen(false);

    if (response === true) {
      await deleteAd(adId);
      queryClient.invalidateQueries('ads');
      queryClient.refetchQueries({ queryKey: ['ads'] });
      navigate('/ads');
    }    
  }

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
      {isDeleteConfirmationOpen && (
        <AlertDialog
          question={'Are you sure?'}
          description={'This ad will be deleted permanently'}
          onResponse={onConfirmationResponse}
        />
      )}
    </div>
  );
}


export default DropdownMenu;
