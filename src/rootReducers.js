import { combineReducers } from 'redux'

import account from "./reducers/account";
import notifications from "./reducers/notifications";
import permissions from "./reducers/permissions";
import roles from "./reducers/roles";
import departments from "./reducers/departments";

export default combineReducers({
    account,
    permissions,
    roles,
    departments,
    notifications
  })
