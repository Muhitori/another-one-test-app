import { Box } from '@mui/system';
import React from 'react';
import useStyles from './styles';

interface Props {
  text: string;
}

const Filler: React.FC<Props> = ({ text }) => {
  const classes = useStyles();
  return <Box className={classes.filler}>{text}</Box>;
};

export default Filler;
