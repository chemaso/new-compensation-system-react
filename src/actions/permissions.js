import { getPermissions as get } from "../api/user";
import { GET_PERMISSIONS, SET_NOTIFICATIONS } from "../actionTypes";

export const getPermissions = (payload) => {
  return (dispatch) =>
    get(payload)
      .then(({ data: response }) => {
        const action = {
          type: GET_PERMISSIONS,
          account: response,
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
