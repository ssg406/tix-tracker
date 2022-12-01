import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type Props = {
  open: boolean;
  onClose: any;
  dialogTitle: string;
  dialogText: string;
  onConfirmClick: any;
  onCancelClick: any;
};

const ConfirmationDialog = ({
  open,
  onClose,
  dialogTitle,
  dialogText,
  onConfirmClick,
  onCancelClick,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {dialogText}
        </DialogContentText>
        <DialogActions>
          <Button onClick={onCancelClick}>No</Button>
          <Button onClick={onConfirmClick} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
