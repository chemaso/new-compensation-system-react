import axios from 'axios'

const baseUrl = 'http://3.15.202.237:9998/visor'

const defaultHeaders  = {
    "Authorization": "Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0",
}

export const getPermissions = (token) => axios.get(`${baseUrl}/data/permission/list?access_token=${token}`)

export const getUsers = (token, page, size, filter) =>
  axios.post(
    `${baseUrl}/data/users/list/${page}/${size}/?access_token=${token}`, filter
  );

export const getAllUsers = (token) =>
  axios.post(
    `${baseUrl}/data/users/list?access_token=${token}`
  );

  export const enableUser = (token, id) =>
  axios.put(`${baseUrl}/data/users/activate/${id}?access_token=${token}`);

  export const disableUser = (token, id) =>
  axios.put(`${baseUrl}/data/users/suspend/${id}?access_token=${token}`);

  export const getUserById = (token, id) =>
  axios.get(`${baseUrl}/data/users/${id}?access_token=${token}`);
export const putUser = (token, id, payload) =>
  axios.put(`${baseUrl}/data/users/${id}?access_token=${token}`, payload);
export const postUser = (token, payload) =>
  axios.post(`${baseUrl}/data/users/?access_token=${token}`, payload);
export const deleteUser = (token, id) =>
  axios.delete(`${baseUrl}/data/users/${id}?access_token=${token}`);
