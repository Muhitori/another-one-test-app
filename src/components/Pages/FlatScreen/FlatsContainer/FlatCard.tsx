import {
  Button,
  Card,
  Box,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';
import { Flat } from '../../../../types';
import FlatImage from './images/flat.jpg';

interface Props {
  flat: Flat;
  handleDetailsClicked: (id: string) => void;
}

const FlatCard: React.FC<Props> = ({
  flat: { id, price, address, description },
  handleDetailsClicked,
}) => {
  return (
    <Card
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: 4,
      }}
    >
      <CardMedia
        component="img"
        sx={{ height: 240, width: 240 }}
        image={FlatImage}
        alt="flat image"
      />
      <Box display="flex" flexDirection="column">
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography mb={2} variant="h5">{`$${price} / night`}</Typography>
          <Typography mb={1} variant="body1" color="text.secondary">
            {address}
          </Typography>
          <Typography
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
            }}
            variant="body2"
            color="text.secondary"
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ flexGrow: 1 }}>
          <Button
            size="small"
            color="primary"
            onClick={() => handleDetailsClicked(id)}
          >
            Details
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default FlatCard;
