import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useFirebaseApp } from 'reactfire';
import useStyles from '../styles';
import PasswordInput from './PasswordInput';
import TextInput from './TextInput';
import { UIContext } from '../../../UIContext';

const isCapitalized = (name: string | undefined) => {
  if (!name) return false;
  const firstLetter = name.split('')[0];
  return firstLetter === firstLetter.toUpperCase();
};

const validateFullName = (fullName: string | undefined) => {
  const nameArray = fullName?.split(' ');
  if (!nameArray) return false;

  const isOnlyFirstAndLastName = nameArray?.length !== 2;

  if (isOnlyFirstAndLastName) {
    return false;
  }

  const [firstName, lastName] = nameArray;

  if (isCapitalized(firstName) && isCapitalized(lastName)) {
    return true;
  }
  return false;
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter email.')
    .email('Email field does not match requirements'),
  username: Yup.string()
    .required('Please enter your name.')
    .test('test-username', 'Please enter your full name.', validateFullName),
  password: Yup.string()
    .required('No password provided.')
    .min(12, 'Password is too short - should be 12 chars minimum.'),
  confirmPassword: Yup.string()
    .required('No password provided.')
    .min(12, 'Password is too short - should be 12 chars minimum.'),
});

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm: React.FC = () => {
  const classes = useStyles();
  const firebase = useFirebaseApp();
  const { setAlert } = useContext(UIContext);

  const [isDisabled, setDisabled] = useState(false);

  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    return () => {
      setDisabled(false);
      setError(null);
    };
  }, []);

  const handleSignUp = useCallback(
    async (formData) => {
      try {
        setDisabled(true);
        const { email, username, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          return;
        }

        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await response.user?.updateProfile({
          displayName: username,
        });
        setAlert({
          show: true,
          severity: 'info',
          message: 'Welcome on board 🚀',
        });
      } catch ({ message }) {
        const errorMessage = message as string;
        setAlert({
          show: true,
          severity: 'error',
          message: errorMessage,
        });
      } finally {
        setDisabled(false);
      }
    },
    [firebase, setAlert],
  );

  const handleFocus = () => {
    setError(null);
  };

  return (
    <Box display="flex" justifyContent="center" mb={5}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
      >
        <Form className={classes.form}>
          <TextInput name="email" label="Email" />
          <TextInput name="username" label="Full name" />
          <PasswordInput
            name="password"
            label="Password"
            onFocus={handleFocus}
          />
          <PasswordInput
            name="confirmPassword"
            label="Repeat password"
            onFocus={handleFocus}
          />
          {!!error && <Typography>{error}</Typography>}
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={isDisabled}
          >
            Register
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default SignUpForm;
