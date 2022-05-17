import React, { useCallback, useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import * as Yup from 'yup';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { UIContext } from '../../Unknown/UIContext';
import useStyles from './styles';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email('Email field does not match requirements'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});

const initialValues = {
  email: '',
  password: '',
};

const SignInForm: React.FC = () => {
  const classes = useStyles();
  const { setAlert } = useContext(UIContext);

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleSignIn = useCallback(async () => {
    setAlert({
      show: true,
      severity: 'info',
      message: 'Sign in button was clicked.',
    });
  }, [setAlert]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSignIn}
    >
      <Form className={classes.form}>
        <Field name="email">
          {({ field }: FieldProps) => (
            <>
              <TextField
                fullWidth
                className={classes.filed}
                variant="filled"
                label="Email"
                {...field}
              />
              <ErrorMessage name={field.name} />
            </>
          )}
        </Field>

        <Field name="password">
          {({ field }: FieldProps) => (
            <>
              <TextField
                fullWidth
                className={classes.filed}
                variant="filled"
                label="Password"
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
                {...field}
              />
              <ErrorMessage name={field.name} />
            </>
          )}
        </Field>
        <Button fullWidth variant="contained" type="submit">
          Log in
        </Button>
      </Form>
    </Formik>
  );
};

export default SignInForm;
