import { Link } from 'react-router-dom';
import React from 'react';
import { useAppContext } from '../context';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';

const Footer = () => {
  const { logoutUser } = useAppContext();
  const [value, setValue] = React.useState(0);
  return (
    <footer className='w-full h-13 fixed bottom-0 left-0 md:hidden'>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label='Profile'
          component={Link}
          to='profile'
          icon={<AccountBoxIcon />}
        />
        <BottomNavigationAction
          label='New Ticket'
          component={Link}
          to='new-ticket'
          icon={<AddBoxIcon />}
        />
        <BottomNavigationAction
          label='Logout'
          onClick={logoutUser}
          icon={<LogoutIcon />}
        />
      </BottomNavigation>
    </footer>
  );
};

export default Footer;
