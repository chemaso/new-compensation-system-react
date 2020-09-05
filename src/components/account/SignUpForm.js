import React from 'react';
import isNil from 'lodash/isNil'
import CButton from '../common/ButtonWithLoading';
import TextField from '@material-ui/core/TextField';
import {
    Link,
} from "react-router-dom";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../common/Copyright'

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        color: '#ff8241'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUpForm = ({ onChange, onSubmit, errors, loading }) => {
    const classes = useStyles();
    return (
        <form onChange={onChange} className={classes.form} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        error={!isNil(errors['firstName'])}
                        helperText={errors['firstName']}
                        autoComplete="fname"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        error={!isNil(errors['lastName'])}
                        helperText={errors['lastName']}
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={!isNil(errors['email'])}
                        helperText={errors['email']}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={!isNil(errors['password'])}
                        helperText={errors['password']}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                </Grid>
            </Grid>
            <CButton
                loading={loading}
                fullWidth
                onClick={onSubmit}
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign Up
    </CButton>
            <Grid container justify="flex-end">
                <Grid item>
                    <Link to="login" className={classes.link}>
                        Already have an account? Sign in
        </Link>
                </Grid>
            </Grid>
            <Box mt={5}>
                <Copyright />
            </Box>
        </form>

    );
}


export default SignUpForm