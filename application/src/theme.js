import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0891b2', // cyan-600
    },
    secondary: {
      main: '#d97706', // amber-600
    },
    neutral: {
      main: '#262626', // neutral-800
      contrastText: '#f5f5f5', // neutral-100
    },
    contrastThreshold: 4.5,
    tonalOffset: 0.2,
  },
  typography: {
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});
