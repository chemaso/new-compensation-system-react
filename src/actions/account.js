import moment from 'moment'
import { getLogin, postSignUp, postPasswordRecovery, getToken, getLoggedIn } from '../api'
import { SET_NOTIFICATIONS, SET_LOGGED_IN, SET_EXPIRED_SESSION } from '../actionTypes'
import { useAccount } from '../hooks/user'

export const setLoggedIn = (account, history) => {
    let data = new FormData();
    data.append('grant_type', 'password');
    data.append('username', account.userName);
    data.append('password', account.password);
    return (dispatch) =>
    getToken(data)
    .then(({ data: response }) => {
        getLoggedIn({ token: response.access_token, username: account.userName })
            .then(({ data: user }) => {
                const { encrypt } = useAccount()
                const payload = {
                    ...user,
                    token: response.access_token,
                    expires_in: response.expires_in,
                    expires: moment().add(response.expires_in, 'seconds').format()
                }
                const encrypted = encrypt(payload)
                const action = {
                    type: SET_LOGGED_IN,
                    account: encrypted
                }
                dispatch(action)
                history.push('/')
            })
            .catch((e) => {
                const action = {
                    type: SET_LOGGED_IN,
                    account: {
                        error: e.message
                    }
                }
                if (e.message.indexOf('401') !== -1) {
                    dispatch({
                        type: SET_NOTIFICATIONS,
                        notifications: 'Wrong name/email or password',
                        severity: 'error'
                    })
                    return
                }
                dispatch({
                    type: SET_NOTIFICATIONS,
                    notifications: 'Something went wrong, please try again later.',
                    severity: 'error'
                })
                dispatch(action)
                return e.message
            })
    })
    .catch((e) => {
        if (e.message.indexOf('401') !== -1) {
            dispatch({
                type: SET_NOTIFICATIONS,
                notifications: 'Wrong name/email or password',
                severity: 'error'
            })
            return
        }
        dispatch({
            type: SET_NOTIFICATIONS,
            notifications: 'Something went wrong, please try again later.',
            severity: 'error'
        })
        return e.message
    })

}


export const setLoggedUp = (form, history) => {
    return (dispatch) =>
        postSignUp(form)
            .then(({ data }) => {
                const action = {
                    type: SET_NOTIFICATIONS,
                    notifications: data.success,
                    severity: 'success'
                }
                dispatch(action)
                setTimeout(() => {
                    history.replace('/login')
                    return 'success'
                }, 1000)
            })
            .catch((e) => {
                const action = {
                    type: SET_NOTIFICATIONS,
                    notifications: e.message,
                    severity: 'error'

                }

                dispatch(action)
                return e.message
            })

}

export const setLogOut = (purge, history) => {
    return dispatch => {
        purge()
        const action = {
            type: SET_NOTIFICATIONS,
            notifications: 'You have been successfully logged out.',
            severity: 'info'
        }
        const loginAction = {
            type: SET_LOGGED_IN,
            account: {}
        }
        dispatch(loginAction)
        dispatch(action)
    }
}

export const setExpiredSession = (setOpen) => {
  return (dispatch) => {
    return new Promise((resolve) => {
      const action = {
        type: SET_EXPIRED_SESSION,
        account: {},
      };
      dispatch(action);
      resolve();
    }).then(() => {
      const action = {
        type: SET_NOTIFICATIONS,
        notifications:
          "You session have been expired, please log in again to continue.",
        severity: 'info'
      };
      dispatch(action);
      setOpen(false)
    });
  };
};

export const setPasswordRecovery = (form, history) => {
    return (dispatch) =>
        postPasswordRecovery(form)
            .then(({ data }) => {
                const action = {
                    type: SET_NOTIFICATIONS,
                    notifications: data.success,
                    severity: 'success'
                }
                dispatch(action)
                setTimeout(() => {
                    history.replace('/login')
                    return 'success'
                }, 1000)
            })
            .catch((e) => {
                const action = {
                    type: SET_NOTIFICATIONS,
                    notifications: e.message,
                    severity: 'error'

                }

                dispatch(action)
                return e.message
            })

}