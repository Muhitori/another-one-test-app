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
    h2: {
      fontSize: 30,
      fontWeight: 700,
    },
    h5: {
      fontSize: 20,
      fontWeight: 500,
    },
    h6: {
      fontSize: 15,
      fontWeight: 700,
    },
    body1: {
      fontSize: 12,
      fontWeight: 500,
    },
    body2: {
      fontSize: 8,
      fontWeight: 400,
    },
  },
});

export default defaultTheme;
