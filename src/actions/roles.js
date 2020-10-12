import { getRoles as get, getAllRoles as getAll, getRoleById as getById, putRole as put, postRole as post, deleteRole as delet } from "../api/roles";
import { GET_ROLES, GET_ROLE, PUT_ROLE, POST_ROLE, SET_NOTIFICATIONS, DELETE_ROLE } from "../actionTypes";

export const getRoles = (token, page, size, filter, all) => {
  const endpoint = all ? getAll : get
  return (dispatch) =>
    endpoint(token, page, size, filter)
      .then(({ data: response }) => {
        const action = {
          type: GET_ROLES,
          roles: response,
        };
        dispatch(action);
        return response;
      })
      .catch((e) => {
        if (e.message.indexOf("401") !== -1) {
          dispatch({
            type: SET_NOTIFICATIONS,
            notifications: "Unauthorized",
            severity: "error",
          });
          return;
        }
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: "Something went wrong, please try again later.",
          severity: "error",
        });
        return e.message;
      });
};

export const getRoleById = (token, id) => {
  return (dispatch) =>
  getById(token, id)
      .then(({ data: response }) => {
        const action = {
          type: GET_ROLE,
          role: response,
        };
        dispatch(action);
        return response;
      })
      .catch((e) => {
        if (e.message.indexOf("401") !== -1) {
          dispatch({
            type: SET_NOTIFICATIONS,
            notifications: "Unauthorized",
            severity: "error",
          });
          return;
        }
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: "Something went wrong, please try again later.",
          severity: "error",
        });
        return e.message;
      });
};

export const putRole = (token, id, payload) => {
  return (dispatch) =>
    put(token, id, payload)
      .then(({ data: response }) => {
        const action = {
          type: PUT_ROLE,
          role: response,
        };
        dispatch(action);
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: "The Role was successfully updated.",
          severity: "success",
        });
        return response;
      })
      .catch((e) => {
        if (e.message.indexOf("401") !== -1) {
          dispatch({
            type: SET_NOTIFICATIONS,
            notifications: "Unauthorized",
            severity: "error",
          });
          return;
        }
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: "Something went wrong, please try again later.",
          severity: "error",
        });
        return e.message;
      });
};

export const deleteRole = (token, id) => {
  return (dispatch) =>
    delet(token, id)
      .then(({ data: response }) => {
        const action = {
          type: DELETE_ROLE,
          department: {},
        };
        dispatch(action);
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: "The Role was successfully deleted.",
          severity: "success",
        });
        return response;
      })
      .catch((e) => {
        if (e.message.indexOf("401") !== -1) {
          dispatch({
            type: SET_NOTIFICATIONS,
            notifications: "Unauthorized",
            severity: "error",
          });
          return;
        }
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: "Something went wrong, please try again later.",
          severity: "error",
        });
        return e.message;
      });
};

export const postRole = (token, payload) => {
  return (dispatch) =>
    post(token, payload)
      .then(({ data: response }) => {
        const action = {
          type: POST_ROLE,
          role: response,
        };
        dispatch(action);
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: "The Role was successfully created.",
          severity: "success",
        });
        return response;
      })
      .catch((e) => {
        if (e.message.indexOf("401") !== -1) {
          dispatch({
            type: SET_NOTIFICATIONS,
            notifications: "Unauthorized",
            severity: "error",
          });
          return;
        }
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: "Something went wrong, please try again later.",
          severity: "error",
        });
        return e.message;
      });
};