import moment from 'moment'
import { getLogin, postSignUp, postPasswordRecovery, getToken } from '../api'
import { SET_NOTIFICATIONS, SET_LOGGED_IN } from '../actionTypes'
import { useAccount } from '../hooks/user'

export const setLoggedIn = (account, history) => {
    return (dispatch) =>
        getLogin(account)
            .then(({ data }) => {
                getToken(data).then(({ data:response }) => console.log(response) ).catch((e) => console.log(e))
                const { encrypt } = useAccount()
                const payload = {
                    ...data,
                    expires: moment().add(data.expires, 'seconds').format()
                }
                const encrypted = encrypt(payload)
                const action = {
                    type: SET_LOGGED_IN,
                    account: encrypted
                }
                dispatch(action)
                window.location.replace('/')
                return
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
                        notifications: 'Wrong name/email or password'
                    })
                    return
                }
                dispatch({
                    type: SET_NOTIFICATIONS,
                    notifications: 'Something went wrong, please try again later.'
                })
                dispatch(action)
                return e.message
            })

}

export const setLoggedUp = (form, history) => {
    return (dispatch) =>
        postSignUp(form)
            .then(({ data }) => {
                const action = {
                    type: SET_NOTIFICATIONS,
                    notifications: data.success
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
                    notifications: e.message

                }

                dispatch(action)
                return e.message
            })

}

export const setLogOut = (purge, history) => {
    return dispatch => {
        purge()
            .then(() => {
                const action = {
                    type: SET_NOTIFICATIONS,
                    notifications: 'You have been successfully logged out.'
                }
                dispatch(action)
                history.replace('/login')
            })

    }
}

export const setExpiredSession = (purge, history) => {
    return dispatch => {
        purge()
            .then(() => {
                const action = {
                    type: SET_NOTIFICATIONS,
                    notifications: 'You session have been expired, please log in again to continue.'
                }
                dispatch(action)
            })

    }
}

export const setPasswordRecovery = (form, history) => {
    return (dispatch) =>
        postPasswordRecovery(form)
            .then(({ data }) => {
                const action = {
                    type: SET_NOTIFICATIONS,
                    notifications: data.success
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
                    notifications: e.message

                }

                dispatch(action)
                return e.message
            })

}