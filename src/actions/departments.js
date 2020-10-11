import {
  getDepartments as get,
  getDepartmentById as getById,
  putDepartment as put,
  postDepartment as post,
  deleteDepartment as delet,
} from "../api/departments";
import {
  GET_DEPARTMENTS,
  GET_DEPARTMENT,
  SET_NOTIFICATIONS,
  PUT_DEPARTMENT,
  POST_DEPARTMENT,
  DELETE_DEPARTMENT,
} from "../actionTypes";

export const getDepartments = (token, page, size) => {
  return (dispatch) =>
    get(token, page, size)
      .then(({ data: response }) => {
        const action = {
          type: GET_DEPARTMENTS,
          departments: response,
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

export const getDepartmentById = (token, id) => {
  return (dispatch) =>
    getById(token, id)
      .then(({ data: response }) => {
        const action = {
          type: GET_DEPARTMENT,
          department: response,
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

export const deleteDepartment = (token, id) => {
  return (dispatch) =>
    delet(token, id)
      .then(({ data: response }) => {
        const action = {
          type: DELETE_DEPARTMENT,
          department: {},
        };
        dispatch(action);
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: "The Department was successfully deleted.",
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

export const putDepartment = (token, id, payload) => {
  return (dispatch) =>
    put(token, id, payload)
      .then(({ data: response }) => {
        const action = {
          type: PUT_DEPARTMENT,
          department: response,
        };
        dispatch(action);
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: "The Department was successfully updated.",
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

export const postDepartment = (token, payload) => {
  return (dispatch) =>
    post(token, payload)
      .then(({ data: response }) => {
        const action = {
          type: POST_DEPARTMENT,
          department: response,
        };
        dispatch(action);
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: "The Department was successfully created.",
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
