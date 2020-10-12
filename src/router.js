import React from "react";
import isEmpty from 'lodash/isEmpty'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import get from 'lodash/get'
import { useDispatch, useSelector } from 'react-redux'
import { useAccount } from './hooks/user'
import LoginPage from './containers/LoginPage'
import PasswordRecoveryPage from './containers/PasswordRecoveryPage'
import DashboardPage from './containers/DashboardPage'
import AddUser from './containers/security/users/AddUser'
import EditUser from './containers/security/users/EditUser'
import User from './containers/security/users/User'
import AddRole from './containers/security/roles/AddRole'
import EditRole from './containers/security/roles/EditRole'
import Roles from './containers/security/roles/Roles'
import Departments from './containers/maintanence/departments/Departments'
import AddDepartment from './containers/maintanence/departments/AddDepartment'
import EditDepartment from './containers/maintanence/departments/EditDepartment'
import Maintanence from './containers/maintanence/Maintanence'
import Security from './containers/security/Security'
import Query from './containers/query/Query'
import Notifications from './components/common/Notifications'
import { SessionWrapper } from './components/layout/SessionWrapper'

const PrivateRoute = ({ children, ...rest }) => {
  let user = useSelector(state => get(state, 'account.user', '{}'))
  const isAuth = !isEmpty(user)
  const { decrypt } = useAccount()
  if (isAuth) {
    user = decrypt(user)
  }

  return (
    <Route
      {...rest}
      render={({ location }) => {
          switch (true) {
            case (isAuth && !user?.changePassword):
              return children
            case (isAuth && user?.changePassword):
              return (
                <Redirect
                to={{
                  pathname: "/reset-password",
                  state: { from: location }
                }}
              />
              )
            case !isAuth:
              return (
                <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location }
                }}
              />
              )
            default:
              break;
          }
      }
      }
    />
  );
}

export default function RoutesGenerator() {
  const notifications = useSelector(state => get(state, 'notifications', {}))
  const dispatch = useDispatch()
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/reset-password" component={PasswordRecoveryPage} />
        <PrivateRoute path="/maintanence/department/index/add">
          <AddDepartment />
        </PrivateRoute>
        <PrivateRoute path="/maintanence/department/index/:id">
          <EditDepartment />
        </PrivateRoute>
        <PrivateRoute path="/maintanence/department/index">
          <Departments />
        </PrivateRoute>
        <PrivateRoute path="/security/role/index/add">
          <AddRole />
        </PrivateRoute>
        <PrivateRoute path="/security/role/index/:id">
          <EditRole />
        </PrivateRoute>
        <PrivateRoute path="/security/role/index">
          <Roles />
        </PrivateRoute>
        <PrivateRoute path="/security/user/index/add">
          <AddUser />
        </PrivateRoute>
        <PrivateRoute path="/security/user/index/:id">
          <EditUser />
        </PrivateRoute>
        <PrivateRoute path="/security/user/index">
          <User />
        </PrivateRoute>
        <PrivateRoute path="/security">
          <Security />
        </PrivateRoute>
        <PrivateRoute path="/maintanence">
          <Maintanence />
        </PrivateRoute>
        <PrivateRoute path="/query">
          <Query />
        </PrivateRoute>
        <PrivateRoute path="/">
          <DashboardPage />
        </PrivateRoute>
      </Switch>
      <Notifications
        open={!isEmpty(notifications.values)}
        onClose={() => dispatch({
          type: 'SET_NOTIFICATIONS',
          notifications: '',
          severity: 'info'
        })}
        severity={notifications.severity}
        message={notifications.values}
      />
      <SessionWrapper />
    </Router>
  );
}


