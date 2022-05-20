import { Box } from '@mui/material';
import React from 'react';
import { Flat } from '../../../types';
import FlatCard from './FlatCard';

interface Props {
  flats: Flat[] | null;
}

const FlatList: React.FC<Props> = ({ flats }) => {
  return (
    <Box>
      {flats && flats.map((flat) => <FlatCard key={flat.id} flat={flat} />)}
    </Box>
  );
};

export default FlatList;
