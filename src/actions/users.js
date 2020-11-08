import {
  getUsers as get,
  getAllUsers as getAll,
  getUserById as getById,
  putUser as put,
  postUser as post,
  deleteUser as delet,
} from "../api/user";
import {
  generatePassword as generate
} from '../api/index'
import {
  GET_USERS,
  GET_USER,
  PUT_USER,
  POST_USER,
  SET_NOTIFICATIONS,
  DELETE_USER,
} from "../actionTypes";
import { useAccount } from '../hooks/user'
import { t } from '../i18n'

export const getUsers = (token, page, size, filter, all) => {
  const endpoint = all ? getAll : get;
  return (dispatch) =>
    endpoint(token, page, size, filter)
      .then(({ data: response }) => {
        const action = {
          type: GET_USERS,
          users: response,
        };
        dispatch(action);
        return response;
      })
      .catch((e) => {
        const { unauthorized } = useAccount()
        unauthorized(e, dispatch)
        if (e.message.indexOf("401") !== -1) {
          dispatch({
            type: SET_NOTIFICATIONS,
            notifications: t("common.unauthorized", "Unauthorized"),
            severity: "error",
          });
          return;
        }
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: t("common.error", "Something went wrong, please try again later."),
          severity: "error",
        });
        return e.message;
      });
};

export const getUserById = (token, id) => {
  return (dispatch) =>
    getById(token, id)
      .then(({ data: response }) => {
        const action = {
          type: GET_USER,
          user: response,
        };
        dispatch(action);
        return response;
      })
      .catch((e) => {
        const { unauthorized } = useAccount()
        unauthorized(e, dispatch)
        if (e.message.indexOf("401") !== -1) {
          dispatch({
            type: SET_NOTIFICATIONS,
            notifications: t("common.unauthorized", "Unauthorized"),
            severity: "error",
          });
          return;
        }
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: t("common.error", "Something went wrong, please try again later."),
          severity: "error",
        });
        return e.message;
      });
};

export const putUser = (token, id, payload) => {
  return (dispatch) =>
    put(token, id, payload)
      .then(({ data: response }) => {
        const action = {
          type: PUT_USER,
          user: response,
        };
        dispatch(action);
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: t('action.users.update', "The User was successfully updated."),
          severity: "success",
        });
        return response;
      })
      .catch((e) => {
        const { unauthorized } = useAccount()
        unauthorized(e, dispatch)
        if (e.message.indexOf("401") !== -1) {
          dispatch({
            type: SET_NOTIFICATIONS,
            notifications: t("common.unauthorized", "Unauthorized"),
            severity: "error",
          });
          return;
        }
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: t("common.error", "Something went wrong, please try again later."),
          severity: "error",
        });
        return e.message;
      });
};

export const deleteUser = (token, id) => {
  return (dispatch) =>
    delet(token, id)
      .then(({ data: response }) => {
        const action = {
          type: DELETE_USER,
          user: {},
        };
        dispatch(action);
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: t('action.users.delete',"The User was successfully deleted."),
          severity: "success",
        });
        return response;
      })
      .catch((e) => {
        const { unauthorized } = useAccount()
        unauthorized(e, dispatch)
        if (e.message.indexOf("401") !== -1) {
          dispatch({
            type: SET_NOTIFICATIONS,
            notifications: t("common.unauthorized", "Unauthorized"),
            severity: "error",
          });
          return;
        }
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: t("common.error", "Something went wrong, please try again later."),
          severity: "error",
        });
        return e.message;
      });
};

export const postUser = (token, payload) => {
  return (dispatch) =>
    post(token, payload)
      .then(({ data: response }) => {
        const action = {
          type: POST_USER,
          user: response,
        };
        dispatch(action);
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: t('action.users.delete',"The User was successfully created."),
          severity: "success",
        });
        return response;
      })
      .catch((e) => {
        const { unauthorized } = useAccount()
        unauthorized(e, dispatch)
        if (e.message.indexOf("401") !== -1) {
          dispatch({
            type: SET_NOTIFICATIONS,
            notifications: t("common.unauthorized", "Unauthorized"),
            severity: "error",
          });
          return;
        }
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: t("common.error", "Something went wrong, please try again later."),
          severity: "error",
        });
        return e.message;
      });
};

export const generatePassword = (payload, token) => {
  return (dispatch) =>
    generate(payload, token)
      .then(({ data: response }) => {
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: t('action.users.reset',"Password successfully sended to user's email."),
          severity: "success",
        });
        return response;
      })
      .catch((e) => {
        const { unauthorized } = useAccount()
        unauthorized(e, dispatch)
        if (e.message.indexOf("401") !== -1) {
          dispatch({
            type: SET_NOTIFICATIONS,
            notifications: t("common.unauthorized", "Unauthorized"),
            severity: "error",
          });
          return;
        }
        dispatch({
          type: SET_NOTIFICATIONS,
          notifications: t("common.error", "Something went wrong, please try again later."),
          severity: "error",
        });
        return e.message;
      });
};
