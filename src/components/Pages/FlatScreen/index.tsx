import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FlatService } from '../../../services';
import { Flat } from '../../../types';

const FlatScreen: React.FC = () => {
  const [flats, setFlats] = useState<Flat[] | null>(null);

  useEffect(() => {
    const log = async () => {
      setFlats(await FlatService.getAll());
    };
    log();
  }, []);

  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h1">Flat Page</Typography>
    </Box>
  );
};

export default FlatScreen;
