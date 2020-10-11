import { combineReducers } from 'redux'

import account from "./reducers/account";
import notifications from "./reducers/notifications";
import permissions from "./reducers/permissions";
import roles from "./reducers/roles";

export default combineReducers({
    account,
    permissions,
    roles,
    notifications
  })
