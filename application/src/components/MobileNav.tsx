import { Link } from 'react-router-dom';
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
import useConfirmationDialog from '../hooks/useConfirmationDialog';
import ConfirmationDialog from './ConfirmationDialog';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logoutUser } from '../features/users/userSlice';
import { toggleNavDrawer } from '../features/ui/uiSlice';

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
  // const { showMobileNav, logoutUser, toggleMobileNav } = useAppContext();
  const dispatch = useAppDispatch();
  const showMobileNav = useAppSelector((state) => state.ui.showMobileNav);

  const logout = () => dispatch(logoutUser());
  const toggleMobileNav = () => dispatch(toggleNavDrawer());

  const { dialogOpen, handleDialogOpen, handleDialogClose } =
    useConfirmationDialog(logout, toggleMobileNav);

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
              <ListItemText onClick={handleDialogOpen}>Logout</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <ConfirmationDialog
        open={dialogOpen}
        onClose={() => handleDialogClose(false)}
        dialogTitle='Logout'
        dialogText='Are you sure you want to logout?'
        onConfirmClick={() => handleDialogClose(true)}
        onCancelClick={() => handleDialogClose(false)}
      />
    </nav>
  );
};

export default MobileNav;
