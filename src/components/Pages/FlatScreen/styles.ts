import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const SPACING_TOP = 10;

const useStyles = makeStyles((theme: Theme) => ({
  sticky: {
    position: 'sticky',
    top: theme.spacing(SPACING_TOP),
  },
  filler: {
    position: 'sticky',
    top: theme.spacing(SPACING_TOP),
    height: `calc(100vh - ${theme.spacing(SPACING_TOP)})`,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BDBDBD',
    color: '#FFF',
  },
  map: {
    // overriding position from google maps frame
    position: 'sticky!important' as 'sticky',
    top: theme.spacing(SPACING_TOP),
    height: `calc(100vh - ${theme.spacing(SPACING_TOP)})`,
    width: '100%',
  },
}));

export default useStyles;
