import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#F50057',
    },
  },
  typography: {
    h1: {
      fontSize: 40,
      fontWeight: 700,
    },
    h6: {
      fontSize: 15,
      fontWeight: 700,
    },
  },
});

export default defaultTheme;
