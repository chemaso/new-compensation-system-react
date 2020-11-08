import { getPermissions as get } from "../api/user";
import { GET_PERMISSIONS, SET_NOTIFICATIONS } from "../actionTypes";
import { useAccount } from '../hooks/user'
import { t } from '../i18n'

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
        const { unauthorized } = useAccount()
        unauthorized(e, dispatch)
        if (e.message.indexOf("401") !== -1) {
          dispatch({
            type: SET_NOTIFICATIONS,
            notifications:  t("common.unauthorized", "Unauthorized"),
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
