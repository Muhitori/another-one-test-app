import React, { createContext, useState } from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';

export const UIContext = createContext<UIContextProps>({} as UIContextProps);

interface UIContextProps {
  setAlert: React.Dispatch<React.SetStateAction<AlertProps>>;
}

interface AlertProps {
  show: boolean;
  severity?: AlertColor;
  message?: string;
  style?: React.CSSProperties;
}

export const UIContextProvider: React.FC = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps>({
    show: false,
    severity: 'info',
    message: '',
    style: {},
  });
  const handleClose = () =>
    setAlert({
      show: false,
    });

  return (
    <UIContext.Provider value={{ setAlert }}>
      {children}
      <Snackbar
        style={alert.style}
        open={alert.show}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert elevation={6} variant="filled" severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </UIContext.Provider>
  );
};
