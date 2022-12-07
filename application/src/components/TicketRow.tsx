import StatusTag from './StatusTag';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import TicketContextMenu from './TicketContextMenu';
import ConfirmationDialog from './ConfirmationDialog';
import useConfirmationDialog from '../hooks/useConfirmationDialog';
import { useAppDispatch } from '../hooks';
import { useCancelTicketMutation } from '../features/api/apiSlice';
import { setEditTicket } from '../features/tickets/ticketsSlice';

type Props = {
  status: string;
  description: string;
  ticketId?: number;
  date: string;
};

const TicketRow = ({ status, description, ticketId, date }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const dateObj = new Date(date);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //RTK
  const [cancelTicket] = useCancelTicketMutation();

  const handleCancelTicket = () => {
    cancelTicket(ticketId);
  };

  const handleEditTicket = () => {
    dispatch(setEditTicket({ ticketId, date, description }));
    navigate('new-ticket');
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { dialogOpen, setDialogOpen, handleDialogOpen, handleDialogClose } =
    useConfirmationDialog(handleCancelTicket, handleClose);

  return (
    <div className='grid grid-cols-[1fr_3fr] grid-rows-1 border-b border-neutral-200'>
      <div className=' px-4 py-4'>
        <StatusTag status={status} />
      </div>

      <div className='px-4 py-2'>
        <p className='text-sm font-bold text-neutral-500'>
          {format(dateObj, 'L/d/yyyy HH:mm')}
        </p>
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

          <TicketContextMenu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleClose}
            onEditClick={handleEditTicket}
            onCancelClick={handleDialogOpen}
          />

          <ConfirmationDialog
            open={dialogOpen}
            onClose={handleDialogClose}
            dialogTitle='Cancel Ticket'
            dialogText='Are you sure you want to cancel this ticket?'
            onConfirmClick={() => handleDialogClose(true)}
            onCancelClick={() => handleDialogClose(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketRow;
