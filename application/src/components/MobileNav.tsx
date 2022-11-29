import { Link } from 'react-router-dom';
import { useAppContext } from '../context';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
  ListItemIcon,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DashboardIcon from '@mui/icons-material/Dashboard';

const navigationLinks = [
  {
    id: 1,
    text: 'Profile',
    path: 'profile',
    icon: <AccountBoxIcon />,
  },
  {
    id: 2,
    text: 'Dashboard',
    path: '/',
    icon: <DashboardIcon />,
  },
  {
    id: 3,
    text: 'New Ticket',
    path: 'new-ticket',
    icon: <AddBoxIcon />,
  },
];

const MobileNav = () => {
  const { showMobileNav, logoutUser, toggleMobileNav } = useAppContext();

  return (
    <nav>
      <Drawer
        variant='temporary'
        anchor='left'
        open={showMobileNav}
        onClose={toggleMobileNav}
        PaperProps={{ sx: { width: '250px' } }}
      >
        <List>
          {navigationLinks.map(({ id, text, path, icon }) => {
            return (
              <ListItem disablePadding key={id}>
                <ListItemButton
                  component={Link}
                  to={path}
                  onClick={toggleMobileNav}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          })}
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText onClick={logoutUser}>Logout</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </nav>
  );
};

export default MobileNav;
