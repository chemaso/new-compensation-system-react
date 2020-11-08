import moment from "moment";
import {
  postSignUp,
  postPasswordRecovery,
  postRefreshToken,
  getToken,
  getLoggedIn,
  expireToken,
} from "../api";
import {
  SET_NOTIFICATIONS,
  SET_LOGGED_IN,
  SET_EXPIRED_SESSION,
} from "../actionTypes";
import { useAccount } from "../hooks/user";
import { get } from "lodash";
import { t } from '../i18n'
const getError = v => get(v, 'response.data.error_description', t("common.error", "Something went wrong, please try again later."))

export const setLoggedIn = (account, history) => {
  let data = new FormData();
  data.append("grant_type", "password");
  data.append("username", account.userName);
  data.append("password", account.password);
  return (dispatch) =>
    getToken(data)
      .then(({ data: response }) => {
        getLoggedIn({
          token: response.access_token,
          username: account.userName,
        })
          .then(({ data: user }) => {
            const { encrypt } = useAccount();
            const payload = {
              ...user,
              token: response.access_token,
              refresh_token: response.refresh_token,
              expires_in: response.expires_in,
              expires: moment().add(response.expires_in, "seconds").format(),
            };
            const encrypted = encrypt(payload);
            const action = {
              type: SET_LOGGED_IN,
              account: encrypted,
            };
            dispatch(action);
            history.push("/");
          })
          .catch((e) => {
            const action = {
              type: SET_LOGGED_IN,
              account: {
                error: e.message,
              },
            };
            const err = getError(e)
            dispatch({
              type: SET_NOTIFICATIONS,
              notifications: err,
              severity: "error",
            });
            dispatch(action);
            return e.message;
          });
      })
      .catch((e) => {
        const err = getError(e)
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: err,
          severity: "error",
        });
        return e.message;
      });
};

export const setLoggedUp = (form, history) => {
  return (dispatch) =>
    postSignUp(form)
      .then(({ data }) => {
        const action = {
          type: SET_NOTIFICATIONS,
          notifications: data.success,
          severity: "success",
        };
        dispatch(action);
        setTimeout(() => {
          history.replace("/login");
          return "success";
        }, 1000);
      })
      .catch((e) => {
        const action = {
          type: SET_NOTIFICATIONS,
          notifications: e.message,
          severity: "error",
        };

        dispatch(action);
        return e.message;
      });
};

export const setLogOut = (purge, user) => {
  const token = user?.token;
  return (dispatch) => {
    expireToken(token)
      .then(() => {
        purge();
        const action = {
          type: SET_NOTIFICATIONS,
          notifications: t("action.account.loggedOut", "You have been successfully logged out."),
          severity: "info",
        };
        const loginAction = {
          type: SET_LOGGED_IN,
          account: {},
        };
        dispatch(loginAction);
        dispatch(action);
      })
      .catch((e) => {
        const err = getError(e)
        const action = {
          type: SET_NOTIFICATIONS,
          notifications: err,
          severity: "error",
        };
        dispatch(action);
      });
  };
};



export const setAlreadyExpired = (purge, history, setOpen) => {
  return (dispatch) => {
        purge()
        const action = {
          type: SET_NOTIFICATIONS,
          notifications:
            t("action.account.expired", "You session have been expired, please log in again to continue."),
          severity: "info",
        };
        const loginAction = {
          type: SET_EXPIRED_SESSION,
          account: {},
        };
        dispatch(loginAction);
        dispatch(action);
        setOpen(false);
        history.replace('/login')
  };
};

export const setExpiredSession = (purge, user, setOpen) => {
  const token = user?.token;
  return (dispatch) => {
    expireToken(token)
      .then(() => {
        const action = {
          type: SET_NOTIFICATIONS,
          notifications:
            t("action.account.expired", "You session have been expired, please log in again to continue."),
          severity: "info",
        };
        const loginAction = {
          type: SET_EXPIRED_SESSION,
          account: {},
        };
        dispatch(loginAction);
        dispatch(action);
        setOpen(false);
      })
      .catch((e) => {
        const err = getError(e)
        const action = {
          type: SET_NOTIFICATIONS,
          notifications: err,
          severity: "error",
        };
        dispatch(action);
        setOpen(false);
      })
      .finally(() =>  purge())
  };
};

export const setRefreshToken = (currentUser, setOpen) => {
  let data = new FormData();
  data.append("grant_type", "refresh_token");
  data.append("refresh_token", currentUser.refresh_token);
  return (dispatch) =>
    postRefreshToken(data)
      .then(({ data: user }) => {
        const { encrypt } = useAccount();
        const payload = {
          ...currentUser,
          ...user,
          token: user.access_token,
          refresh_token: user.refresh_token,
          expires_in: user.expires_in,
          expires: moment().add(user.expires_in, "seconds").format(),
        };
        const encrypted = encrypt(payload);
        const action = {
          type: SET_LOGGED_IN,
          account: encrypted,
        };
        dispatch(action);
        setOpen(false);
      })
      .catch((e) => {
        const err = getError(e)
        setOpen(false);
        const action = {
          type: SET_LOGGED_IN,
          account: {
            error: e.message,
          },
        };
        if (e.message.indexOf("401") !== -1) {
          dispatch({
            type: SET_NOTIFICATIONS,
            notifications: err,
            severity: "error",
          });
          return;
        }
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: err,
          severity: "error",
        });
        dispatch(action);
        return e.message;
      });
};

export const setPasswordRecovery = (form, token, history) => {
  return (dispatch) =>
    postPasswordRecovery(form, token)
      .then(() => {
        const action = {
          type: SET_NOTIFICATIONS,
          notifications:
            t("action.account.password", "Your password was successfully changed."),
          severity: "info",
        };
        dispatch(action);
        history.push('/')
      })
      .catch((e) => {
        const err = get(e, 'response.data', t("common.error", 'Something wrong happen, please try again.'))
        const action = {
            type: SET_NOTIFICATIONS,
            notifications: err,
            severity: "error",
          };
          dispatch(action);
      });
};
