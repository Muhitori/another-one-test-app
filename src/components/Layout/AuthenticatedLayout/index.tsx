import { Box } from '@mui/material';
import React from 'react';
import AppBar from './AppBar';

interface AuthenticatedLayoutProps {
  children: React.ReactElement;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}) => {
  return (
    <Box display="flex" height="100%" flexDirection="column">
      <AppBar />
      <Box flexGrow={1}>{children}</Box>
    </Box>
  );
};

export default AuthenticatedLayout;
