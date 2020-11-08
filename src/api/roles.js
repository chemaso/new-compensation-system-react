import axios from "axios";

const baseUrl = "http://3.15.202.237:9998/visor";

export const getRoles = (token, page, size, filter) =>
  axios.get(
    `${baseUrl}/data/roles/list/${page}/${size}/${filter}?access_token=${token}`
  );

export const getAllRoles = (token) =>
  axios.get(
    `${baseUrl}/data/roles/list?access_token=${token}`
  );
export const getRoleById = (token, id) =>
  axios.get(`${baseUrl}/data/roles/${id}?access_token=${token}`);
export const putRole = (token, id, payload) =>
  axios.put(`${baseUrl}/data/roles/${id}?access_token=${token}`, payload);
export const postRole = (token, payload) =>
  axios.post(`${baseUrl}/data/roles/?access_token=${token}`, payload);
export const deleteRole = (token, id) =>
  axios.delete(`${baseUrl}/data/roles/${id}?access_token=${token}`);
