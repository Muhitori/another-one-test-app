import { Box, Button, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { useFirebaseApp } from 'reactfire';
import clearFirestoreCache from '../../../common/clearFirestoreCache';

const HomeScreen: React.FC = () => {
  const firebase = useFirebaseApp();

  const logout = useCallback(async () => {
    await firebase.auth().signOut();
    clearFirestoreCache();
  }, [firebase]);

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h1">Home page</Typography>
      <Button variant="contained" onClick={logout}>
        Log out
      </Button>
    </Box>
  );
};

export default HomeScreen;
