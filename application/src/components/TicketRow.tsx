import StatusTag from './StatusTag';
import React, { useState } from 'react';
import { useAppContext } from '../context';
import {
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

type Props = {
  status: string;
  description: string;
  ticketId?: number;
};

const TicketRow = ({ status, description, ticketId }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { cancelTicket } = useAppContext();

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = (cancelConfirmed: Boolean) => {
    if (cancelConfirmed) {
      cancelTicket({ ticketId });
    }
    setDialogOpen(false);
    handleClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='grid grid-cols-[1fr_3fr] grid-rows-1 border-b border-neutral-200'>
      <div className=' px-4 py-4'>
        <StatusTag status={status} />
      </div>

      <div className='px-4 py-2'>
        <p className=''>{description}</p>
        <div className='flex justify-end'>
          <button
            onClick={handleClick}
            id='basic-button'
            aria-controls={menuOpen ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={menuOpen ? 'true' : undefined}
          >
            <MoreHorizIcon />
          </button>

          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
          >
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem onClick={handleDialogOpen}>Cancel</MenuItem>
          </Menu>

          <Dialog
            open={dialogOpen}
            onClose={handleDialogClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>{'Cancel Ticket'}</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Are you sure you want to cancel this ticket?
              </DialogContentText>
              <DialogActions>
                <Button onClick={() => handleDialogClose(false)}>
                  Nevermind
                </Button>
                <Button onClick={() => handleDialogClose(true)} autoFocus>
                  Cancel Ticket
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default TicketRow;
