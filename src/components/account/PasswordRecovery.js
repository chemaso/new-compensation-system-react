import React from 'react';
import CButton from '../common/ButtonWithLoading';
import isNil from 'lodash/isNil'
import TextField from '@material-ui/core/TextField';
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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const PasswordRecovery = ({ onChange, onSubmit, errors, loading }) => {
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
            <CButton
                onClick={onSubmit}
                loading={loading}
                fullWidth
                variant="contained"
                color="myBtn"
                className={classes.submit}
            >
                Recover Password
            </CButton>
            <Grid container>
                <Grid item xs>
                    <Link to="sign-up" className={classes.link}>
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="login" className={classes.link}>
                        {"Try with another password"}
                    </Link>
                </Grid>
            </Grid>
            <Box mt={5}>
                <Copyright />
            </Box>
        </form>

    );
}


export default PasswordRecovery