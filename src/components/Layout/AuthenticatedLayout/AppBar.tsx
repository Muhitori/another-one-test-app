import { Box, Button, Menu, MenuItem } from '@mui/material';
import MiuAppBar from '@mui/material/AppBar';
import React, { useCallback, useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useFirebaseApp, useUser } from 'reactfire';
import clearFirestoreCache from '../../../common/clearFirestoreCache';
import useStyles from './styles';

const AppBar: React.FC = () => {
  const classes = useStyles();

  const firebase = useFirebaseApp();
  const { data: user, hasEmitted } = useUser();
  const [avatar, setAvatar] = useState<string | undefined>(undefined);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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

  useEffect(() => {
    const getAvatar = async () => {
      const username = user.displayName;

      if (username) {
        const [firstName, lastName] = username.split(' ');
        setAvatar(`https://ui-avatars.com/api/?name=${firstName}+${lastName}`);
        return;
      }

      setAvatar('https://ui-avatars.com/api/?name=U');
    };
    setTimeout(() => getAvatar(), 1000);
  }, [hasEmitted, user.displayName]);

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
