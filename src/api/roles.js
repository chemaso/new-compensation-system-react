import axios from 'axios'

const baseUrl = 'http://3.15.202.237:9998/visor'

const defaultHeaders  = {
    "Authorization": "Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0",
}

export const getRoles = (token, page, size) => axios.get(`${baseUrl}/data/roles/list/${page}/${size}/?access_token=${token}`)
export const getRoleById = (token, id) => axios.get(`${baseUrl}/data/roles/${id}?access_token=${token}`)
