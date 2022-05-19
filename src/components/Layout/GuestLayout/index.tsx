import { Box, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import MiuLink from '@mui/material/Link';
import BuildingImage from './images/building.png';
import VoypostLogo from './images/voypost.png';

interface GuestLayoutProps {
  children: React.ReactElement;
}

const GuestLayout: React.FC<GuestLayoutProps> = ({ children }) => {
  const location = useLocation();

  const headerMessage = useMemo(
    () => (location.pathname === '/register' ? 'Register' : 'Login'),
    [location.pathname],
  );

  const questionMessage = useMemo(
    () =>
      location.pathname === '/register'
        ? 'Already have account?'
        : 'Don`t have an account?',
    [location.pathname],
  );

  const linkMessage = useMemo(
    () => (location.pathname === '/register' ? 'login' : 'register'),
    [location.pathname],
  );

  const linkUrl = useMemo(
    () => (location.pathname === '/register' ? '/login' : '/register'),
    [location.pathname],
  );

  return (
    <Box display="flex">
      <Box
        maxHeight="100vh"
        component="img"
        src={BuildingImage}
        alt="building"
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        <Box
          height="30px"
          width="150px"
          component="img"
          src={VoypostLogo}
          alt="voypost logo"
          margin="3rem 0"
        />
        <Typography variant="h1" mb={5}>
          {headerMessage}
        </Typography>

        {children}

        <Typography variant="h6" mb={5}>
          {questionMessage}
        </Typography>

        <MiuLink component={Link} to={linkUrl} underline="none">
          {linkMessage.toUpperCase()}
        </MiuLink>
      </Box>
    </Box>
  );
};

export default GuestLayout;
