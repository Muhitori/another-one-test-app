import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import SignInForm from './SignInForm';
import BuildingImage from '../images/building.png';
import VoypostLogo from '../images/voypost.png';

const SignInScreen: React.FC = () => {
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
            margin="5rem 0"
          />
          <Typography variant="h1" mb={5}>
            Login
          </Typography>
          <SignInForm />
        </Box>
      </Box>
    </>
  );
};

export default SignInScreen;
