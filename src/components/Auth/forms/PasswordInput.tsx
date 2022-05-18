import React, { useCallback, useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Field, FieldProps, ErrorMessage } from 'formik';
import useStyles from '../styles';

interface Props {
  name: string;
  label?: string;
  onFocus?: () => void;
}

const PasswordInput: React.FC<Props> = ({ name, label, onFocus }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <>
          <TextField
            fullWidth
            className={classes.filed}
            variant="filled"
            label={label}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onFocus={onFocus}
            {...field}
          />
          <ErrorMessage name={field.name} />
        </>
      )}
    </Field>
  );
};

export default PasswordInput;
