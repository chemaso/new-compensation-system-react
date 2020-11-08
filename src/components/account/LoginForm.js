import React from "react";
import isNil from "lodash/isNil";
import CButton from "../common/ButtonWithLoading";
import TextField from "@material-ui/core/TextField";
import InputPassword from "../common/InputPassword";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "../common/Copyright";
import { t } from "../../i18n";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "#ff8241",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
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
        error={!isNil(errors["userName"])}
        helperText={errors["userName"]}
        margin="normal"
        required
        fullWidth
        id="userName"
        label={t("login.form.username", "Username")}
        name="userName"
        autoComplete="userName"
        autoFocus
      />
      <InputPassword
        error={!isNil(errors["password"])}
        helperText={errors["password"]}
        margin="normal"
        required
        fullWidth
        name="password"
        label={t("login.form.password", "Password")}
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
        {t("login.form.signIn", "Sign In")}
      </CButton>
      <Box mt={5}>
        <Copyright />
      </Box>
    </form>
  );
};

export default LoginForm;
