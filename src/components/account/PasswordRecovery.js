import React from 'react';
import CButton from '../common/ButtonWithLoading';
import isNil from 'lodash/isNil'

import Box from '@material-ui/core/Box';
import InputPassword from '../common/InputPassword';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Copyright from '../common/Copyright'
import { Typography } from '@material-ui/core';
import { t } from '../../i18n'

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

const PasswordRecovery = ({ onChange, onSubmit, onCancel, errors, loading }) => {
    const classes = useStyles();

    return (
        <>
        <Typography variant='h6'>{t('passwordRecovery.form.title', 'To continue please reset your password:')}</Typography>
        <form onChange={onChange} className={classes.form} noValidate>
            <InputPassword
                error={!isNil(errors['old-password'])}
                helperText={errors['old-password']}
                margin="normal"
                required
                fullWidth  
                id="old-password"
                label={t('passwordRecovery.form.oldPassword', "Old Password")}
                name="old-password"
                autoFocus
                autoComplete="password"
       
            />
            <InputPassword
                error={!isNil(errors['password'])}
                helperText={errors['password']}
                margin="normal"
                required
                fullWidth  
                id="password"
                label={t("passwordRecovery.form.newPassword", "New Password")}
                name="password"
            />
            <InputPassword
                error={!isNil(errors['repeat-password'])}
                helperText={errors['repeat-password']}
                margin="normal"
                required
                fullWidth
                id="repeat-password"
                label={t("passwordRecovery.form.repeatPassword", "Repeat Password")}
                name="repeat-password"
                autoComplete="repeat-password"
    
            />
            <Grid container style={{ justifyContent: 'space-between' }}>
            <CButton
                onClick={onCancel}
                style={{ background: 'grey'}}
                loading={loading}
                variant="contained"
                color="myBtn"
                className={classes.submit}
            >
                {t("passwordRecovery.form.cancel", "Cancel")}
            </CButton>
            <CButton
                onClick={onSubmit}
                loading={loading}
                variant="contained"
                color="myBtn"
                className={classes.submit}
            >
                {t("passwordRecovery.form.submit", "Reset Password")}
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