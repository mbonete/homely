import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useQueryClient } from '@tanstack/react-query';

export default function AlertDialog({title, question, description, callback}) {
  const [open, setOpen] = React.useState(false);
  
  const queryClient = useQueryClient();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCallbackAndClose = () => {
    callback();
    setOpen(false);
  }

  React.useEffect(() => {
    queryClient.invalidateQueries('ads');
  })

  return (
    <div>
      <Button style={{textDecoration: 'none', margin: '0'}} onClick={handleClickOpen}>
        {title}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {question}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description} 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCallbackAndClose}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}