import React from 'react';
import isNil from 'lodash/isNil'
import CButton from '../common/ButtonWithLoading';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputPassword from '../common/InputPassword'
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {
  Link,
} from "react-router-dom";
import Copyright from '../common/Copyright'

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: '#ff8241'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = ({ onChange, loading, errors, onSubmit }) => {
  const classes = useStyles();

  return (
    <form onChange={onChange} className={classes.form} noValidate>
      <TextField
        error={!isNil(errors['userName'])}
        helperText={errors['userName']}
        margin="normal"
        required
        fullWidth
        id="userName"
        label="Username"
        name="userName"
        autoComplete="userName"
        autoFocus
      />
      <InputPassword
        error={!isNil(errors['password'])}
        helperText={errors['password']}
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        id="password"
        autoComplete="current-password"
      />
      <CButton
        onClick={onSubmit}
        loading={loading}
        fullWidth
        variant="contained"
        color="myBtn"
        type="submit"
        className={classes.submit}
      >
        Sign In
            </CButton>
      <Box mt={5}>
        <Copyright />
      </Box>
    </form>

  );
}


export default LoginForm