import { combineReducers } from 'redux'

import account from "./reducers/account";
import notifications from "./reducers/notifications";
import permissions from "./reducers/permissions";

export default combineReducers({
    account,
    permissions,
    notifications
  })
