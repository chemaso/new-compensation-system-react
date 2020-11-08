import axios from 'axios'

const error = 'http://demo1733049.mockable.io/unauthorized'
const correct = 'http://demo1733049.mockable.io/login'
const logup = 'http://demo1733049.mockable.io/logup'
const baseUrl = 'http://3.15.202.237:9998/visor'

const defaultHeaders  = {
    "Authorization": "Basic bW9iaWxlOjEyMw==",
}

export const getToken = (payload) => axios.post(`${baseUrl}/oauth/token`, payload, { headers: defaultHeaders })

export const postRefreshToken = (payload) => axios.post(`${baseUrl}/oauth/token`, payload, { headers: defaultHeaders })
export const postPasswordRecovery = (payload, token) => axios.post(`${baseUrl}/data/users/update-password`, payload, { headers: {
    "Authorization": `Bearer ${token}`
} })
export const generatePassword = (id, token) => axios.get(`${baseUrl}/data/users/generate-password/${id}`, { headers: {
    "Authorization": `Bearer ${token}`
} })

export const expireToken = (token) => axios.get(`${baseUrl}/oauth/revoke-token`, { headers: {
    "Authorization": `Bearer ${token}`
} })

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
