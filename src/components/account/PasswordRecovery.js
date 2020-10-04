import React from 'react';
import CButton from '../common/ButtonWithLoading';
import isNil from 'lodash/isNil'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import InputPassword from '../common/InputPassword';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {
    Link,
} from "react-router-dom";
import Copyright from '../common/Copyright'
import { Typography } from '@material-ui/core';

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
        <>
        <Typography variant='h6'>To continue please reset your password:</Typography>
        <form onChange={onChange} className={classes.form} noValidate>
            <InputPassword
                error={!isNil(errors['password'])}
                helperText={errors['password']}
                margin="normal"
                required
                fullWidth  
                id="password"
                label="New Password"
                name="password"
                autoComplete="password"
                autoFocus
            />
            <InputPassword
                error={!isNil(errors['repeat-password'])}
                helperText={errors['repeat-password']}
                margin="normal"
                required
                fullWidth
                id="repeat-password"
                label="Repeat Password"
                name="repeat-password"
                autoComplete="repeat-password"
    
            />
            <Grid container>
            <CButton
                onClick={onSubmit}
                style={{ background: 'grey'}}
                loading={loading}
                variant="contained"
                color="myBtn"
                className={classes.submit}
            >
                Cancel
            </CButton>
            <CButton
                onClick={onSubmit}
                loading={loading}
                variant="contained"
                color="myBtn"
                className={classes.submit}
            >
                Reset Password
            </CButton>
            </Grid>
            <Box mt={5}>
                <Copyright />
            </Box>
        </form>
        </>

    );
}


export default PasswordRecovery