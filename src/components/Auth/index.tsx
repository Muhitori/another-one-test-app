import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import MiuLink from '@mui/material/Link';
import { Typography } from '@mui/material';
import { Switch, Route, Redirect, Link, useLocation } from 'react-router-dom';
import SignInForm from './forms/SignInForm';
import BuildingImage from './images/building.png';
import VoypostLogo from './images/voypost.png';
import SignUpForm from './forms/SignUpForm';

const AuthScreen: React.FC = () => {
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
    <>
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

          <Switch>
            <Route exact path="/login" component={SignInForm} />
            <Route exact path="/register" component={SignUpForm} />
            <Route path="*" component={() => <Redirect to="/login" />} />
          </Switch>

          <Typography variant="h6" mb={5}>
            {questionMessage}
          </Typography>

          <MiuLink component={Link} to={linkUrl} underline="none">
            {linkMessage.toUpperCase()}
          </MiuLink>
        </Box>
      </Box>
    </>
  );
};

export default AuthScreen;
