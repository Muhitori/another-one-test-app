import { Box } from '@mui/material';
import React from 'react';
import { Flat } from '../../../../types';
import FlatCard from './FlatCard';

interface Props {
  flats: Flat[] | null;
  handleDetailsClicked: (id: string) => void;
}

const FlatList: React.FC<Props> = ({ flats, handleDetailsClicked }) => {
  return (
    <Box>
      {flats &&
        flats.map((flat) => (
          <FlatCard
            key={flat.id}
            flat={flat}
            handleDetailsClicked={handleDetailsClicked}
          />
        ))}
    </Box>
  );
};

export default FlatList;
