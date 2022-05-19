import { Box, Button, Menu, MenuItem } from '@mui/material';
import MiuAppBar from '@mui/material/AppBar';
import React, { useCallback, useMemo } from 'react';
import { useFirebaseApp, useUser } from 'reactfire';
import MenuIcon from '@mui/icons-material/Menu';
import clearFirestoreCache from '../../../common/clearFirestoreCache';
import useStyles from './styles';

const AppBar: React.FC = () => {
  const classes = useStyles();

  const firebase = useFirebaseApp();
  const user = useUser();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = useCallback(async () => {
    await firebase.auth().signOut();
    clearFirestoreCache();
  }, [firebase]);

  const avatar = useMemo(() => {
    const { displayName: username } = user.data;

    if (username) {
      const [firstName, lastName] = username.split(' ');
      return `https://ui-avatars.com/api/?name=${firstName}+${lastName}`;
    }

    return 'https://ui-avatars.com/api/?name=U';
  }, [user]);

  return (
    <MiuAppBar className={classes.appBar}>
      <MenuIcon />
      <Box>
        <Button onClick={handleClick}>
          <Box
            component="img"
            src={avatar}
            width="2rem"
            height="2rem"
            borderRadius="50%"
          />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={logout}>Log out</MenuItem>
        </Menu>
      </Box>
    </MiuAppBar>
  );
};

export default AppBar;
