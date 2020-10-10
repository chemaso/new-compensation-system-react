import axios from 'axios'

const error = 'http://demo1733049.mockable.io/unauthorized'
const correct = 'http://demo1733049.mockable.io/login'
const logup = 'http://demo1733049.mockable.io/logup'
const passRecovery = 'http://demo1733049.mockable.io/recovery'
const baseUrl = 'http://3.15.202.237:9998/visor'

const defaultHeaders  = {

    "Authorization": "Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0",

}

export const getToken = (payload) => axios.post(`${baseUrl}/oauth/token`, payload, { headers: defaultHeaders })

export const getLoggedIn = (payload) => axios.post(`${baseUrl}/auth/user?access_token=${payload.token}`, { username: payload.username })

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