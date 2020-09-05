import { combineReducers } from "redux";
import account from "./reducers/account";
import notifications from "./reducers/notifications";

export default combineReducers({ account, notifications });
