import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  sticky: {
    position: 'sticky',
    top: theme.spacing(8),
  },
}));

export default useStyles;
