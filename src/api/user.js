import axios from 'axios'

const baseUrl = 'http://3.15.202.237:9998/visor'

const defaultHeaders  = {
    "Authorization": "Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0",
}

export const getPermissions = (token) => axios.get(`${baseUrl}/data/permission/list?access_token=${token}`)
