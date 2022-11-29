import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0891b2',
    },
    secondary: {
      main: '#d97706',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});
