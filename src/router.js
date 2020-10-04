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
import AddUser from './containers/security/AddUser'
import EditUser from './containers/security/EditUser'
import User from './containers/security/User'
import Security from './containers/security/Security'
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


