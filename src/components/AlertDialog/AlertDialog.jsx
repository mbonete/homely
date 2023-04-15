import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({question, description, onResponse}) {
  return (
    <Dialog
      open={true}
      onClose={onResponse}
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
        <Button onClick={() => onResponse(true)}>Yes</Button>
        <Button onClick={() => onResponse(false)} autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}