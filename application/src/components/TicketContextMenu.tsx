import React from 'react';
import { Menu, MenuItem } from '@mui/material';

type Props = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: any;
  onEditClick: any;
  onCancelClick: any;
};

const TicketContextMenu = ({
  anchorEl,
  open,
  onClose,
  onEditClick,
  onCancelClick,
}: Props) => {
  return (
    <Menu
      id='basic-menu'
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      MenuListProps={{ 'aria-labelledby': 'basic-button' }}
    >
      <MenuItem onClick={onEditClick}>Edit</MenuItem>
      <MenuItem onClick={onCancelClick}>Cancel</MenuItem>
    </Menu>
  );
};

export default TicketContextMenu;
