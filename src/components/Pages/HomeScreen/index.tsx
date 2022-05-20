import { Box, Button } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';

const HomeScreen: React.FC = () => {
  const history = useHistory();

  const handleFlatClick = () => {
    history.push('/flat');
  };

  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Button variant="contained" onClick={handleFlatClick}>
        Flat
      </Button>
    </Box>
  );
};

export default HomeScreen;
