import axios from 'axios'

const baseUrl = 'http://3.15.202.237:9998/visor'

const defaultHeaders  = {
    "Authorization": "Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0",
}

export const getDepartments = (token, page, size) => axios.get(`${baseUrl}/data/department/list/${page}/${size}/Pr?access_token=${token}`)
export const getDepartmentById = (token, id) => axios.get(`${baseUrl}/data/department/${id}?access_token=${token}`)
export const putDepartment = (token, id, payload) => axios.put(`${baseUrl}/data/department/${id}?access_token=${token}`, payload)
export const postDepartment = (token, payload) => axios.post(`${baseUrl}/data/department/?access_token=${token}`, payload)
export const deleteDepartment = (token, id) => axios.delete(`${baseUrl}/data/department/${id}?access_token=${token}`)
