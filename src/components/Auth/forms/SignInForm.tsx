import React, { useCallback, useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useFirebaseApp } from 'reactfire';
import { Box } from '@mui/material';
import { UIContext } from '../../../UIContext';
import useStyles from '../styles';
import PasswordInput from './PasswordInput';
import TextInput from './TextInput';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email('Email field does not match requirements'),
  password: Yup.string()
    .required('No password provided.')
    .min(12, 'Password is too short - should be 12 chars minimum.'),
});

const initialValues = {
  email: '',
  password: '',
};

const SignInForm: React.FC = () => {
  const classes = useStyles();
  const firebase = useFirebaseApp();
  const { setAlert } = useContext(UIContext);

  const [isDisabled, setDisabled] = useState(false);

  const handleSignIn = useCallback(
    async (formData) => {
      try {
        setDisabled(true);
        const { email, password } = formData;
        await firebase.auth().signInWithEmailAndPassword(email, password);
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

  return (
    <Box display="flex" justifyContent="center" mb={15}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignIn}
      >
        <Form className={classes.form}>
          <TextInput name="email" label="Email" />
          <PasswordInput name="password" label="Password" />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={isDisabled}
          >
            Log in
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default SignInForm;
