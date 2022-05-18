import { Box, Button, Menu, MenuItem } from '@mui/material';
import MiuAppBar from '@mui/material/AppBar';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFirebaseApp } from 'reactfire';
import MenuIcon from '@mui/icons-material/Menu';
import clearFirestoreCache from '../../../common/clearFirestoreCache';
import useStyles from './styles';

const AppBar: React.FC = () => {
  const classes = useStyles();

  const firebase = useFirebaseApp();
  const [username, setUsername] = useState<string | null | undefined>(null);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    // check if username has been updated
    setTimeout(() => {
      firebase
        .auth()
        .currentUser?.reload()
        .then(() => {
          const refreshedUser = firebase.auth().currentUser;
          setUsername(refreshedUser?.displayName);
        });
    }, 100);
  }, [firebase]);

  const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = useCallback(async () => {
    await firebase.auth().signOut();
    clearFirestoreCache();
  }, [firebase]);

  const avatar = useMemo(() => {
    if (username) {
      const [firstName, lastName] = username.split(' ');
      return `https://ui-avatars.com/api/?name=${firstName}+${lastName}`;
    }

    return 'https://ui-avatars.com/api/?name=U';
  }, [username]);

  return (
    <MiuAppBar className={classes.appBar}>
      <MenuIcon />
      <Box>
        <Button onClick={handleAvatarClick}>
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
          <MenuItem onClick={handleLogOut}>Log out</MenuItem>
        </Menu>
      </Box>
    </MiuAppBar>
  );
};

export default AppBar;
