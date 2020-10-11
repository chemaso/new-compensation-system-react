import { getRoles as get, getRoleById as getById } from "../api/roles";
import { GET_ROLES, GET_ROLE, SET_NOTIFICATIONS } from "../actionTypes";

export const getRoles = (token, page, size) => {
  return (dispatch) =>
    get(token, page, size)
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
