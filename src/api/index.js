import axios from 'axios'

const error = 'http://demo1733049.mockable.io/unauthorized'
const correct = 'http://demo1733049.mockable.io/login'
const logup = 'http://demo1733049.mockable.io/logup'
const passRecovery = 'http://demo1733049.mockable.io/recovery'
const baseUrl = 'http://127.0.0.1:9998'
const expressUrl = 'http://localhost:5000'

export const getToken = (payload) => axios.post(`${expressUrl}/oauth/token`, { params: { grant_type: 'password', ...payload }})
export const getLoggedIn = (payload) => axios.post(`${expressUrl}/auth/user?access_token=${payload.token}`, { username: payload.username })


export const getLogin = (payload) => {
    let url = error
    const { password } = payload
    if (password === '12345678') {
        url = correct
    }
    axios.defaults.headers.common['Authorization'] = '4879f3489fy4ygfewfuiwefy237823623r786';
    return axios.get(url, { params: payload })
}

export const postSignUp = (payload) => {
    axios.defaults.headers.common['Authorization'] = '4879f3489fy4ygfewfuiwefy237823623r786';
    return axios.post(logup, payload)
}

export const postPasswordRecovery = (payload) => {
    axios.defaults.headers.common['Authorization'] = '4879f3489fy4ygfewfuiwefy237823623r786';
    return axios.post(passRecovery, payload)
}