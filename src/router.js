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
import SignUpPage from './containers/SignUpPage'
import DashboardPage from './containers/DashboardPage'
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
        return (isAuth) ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
      }
    />
  );
}

export default function RoutesGenerator() {
  const notifications = useSelector(state => get(state, 'notifications', {}))
  const dispatch = useDispatch()
  console.log(notifications)
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
       {/* <Route path="/sign-up" component={SignUpPage} />
           <Route path="/forgot-password" component={PasswordRecoveryPage} /> */}
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


