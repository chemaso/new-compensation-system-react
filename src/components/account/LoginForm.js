import React from 'react';
import isNil from 'lodash/isNil'
import CButton from '../common/ButtonWithLoading';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
        error={!isNil(errors['email'])}
        helperText={errors['email']}
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        error={!isNil(errors['password'])}
        helperText={errors['password']}
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <CButton
        onClick={onSubmit}
        loading={loading}
        fullWidth
        variant="contained"
        color="myBtn"
        className={classes.submit}
      >
        Sign In
            </CButton>
      <Grid container>
        <Grid item xs>
          <Link to="forgot-password" className={classes.link}>
            Forgot password?
                </Link>
        </Grid>
        <Grid item>
          <Link to="sign-up" className={classes.link}>
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
      <Box mt={5}>
        <Copyright />
      </Box>
    </form>

  );
}


export default LoginForm