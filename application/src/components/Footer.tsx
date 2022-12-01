import { Link, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useAppContext } from '../context';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ConfirmationDialog from './ConfirmationDialog';
import useConfirmationDialog from '../hooks/useConfirmationDialog';

const Footer = () => {
  const { logoutUser } = useAppContext();

  // Pathname is used to determine which bottom nav icon to highlight
  const { pathname } = useLocation();
  // useState hook lets bottom bar component set which icon is highlighted
  const [value, setValue] = React.useState(pathname);

  // Get dialog values from hook. Cancel dialog behavior resets bottom navigation to never highlight 'Logout' if cancelled
  const { dialogOpen, setDialogOpen, handleDialogOpen, handleDialogClose } =
    useConfirmationDialog(logoutUser, () => setValue(pathname));

  // Ensure icon highlighting in bottom bar changes when user navigates another way
  useEffect(() => {
    setValue(pathname);
  }, [pathname]);

  const onDrawerClick = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
  };

  return (
    <footer className='w-full md:h-14 fixed bottom-0 left-0 md:bg-neutral-300'>
      <nav className='md:hidden'>
        <BottomNavigation showLabels value={value} onChange={onDrawerClick}>
          <BottomNavigationAction
            label='Profile'
            value='/profile'
            component={Link}
            to='profile'
            icon={<AccountBoxIcon />}
          />
          <BottomNavigationAction
            label='Dashboard'
            value='/'
            component={Link}
            to='/'
            icon={<DashboardIcon />}
          />
          <BottomNavigationAction
            label='New Ticket'
            value='/new-ticket'
            component={Link}
            to='new-ticket'
            icon={<AddBoxIcon />}
          />
          <BottomNavigationAction
            label='Logout'
            value='/logout'
            onClick={handleDialogOpen}
            icon={<LogoutIcon />}
          />
        </BottomNavigation>
        <ConfirmationDialog
          open={dialogOpen}
          onClose={() => handleDialogClose(false)}
          dialogTitle='Logout'
          dialogText='Are you sure you want to logout?'
          onConfirmClick={() => handleDialogClose(true)}
          onCancelClick={() => handleDialogClose(false)}
        />
      </nav>
    </footer>
  );
};

export default Footer;
