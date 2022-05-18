import { TextField } from '@mui/material';
import { Field, FieldProps, ErrorMessage } from 'formik';
import React from 'react';
import useStyles from '../styles';

interface Props {
  name: string;
  label?: string;
}

const TextInput: React.FC<Props> = ({ name, label }) => {
  const classes = useStyles();
  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <>
          <TextField
            fullWidth
            className={classes.filed}
            variant="filled"
            label={label}
            {...field}
          />
          <ErrorMessage name={field.name} />
        </>
      )}
    </Field>
  );
};

export default TextInput;
