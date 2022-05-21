import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    width: '100%',
    position: 'sticky',
    height: '3rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: theme.spacing(20),
    paddingRight: theme.spacing(20),
  },
}));

export default useStyles;
