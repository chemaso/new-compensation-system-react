import React from "react";
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useAccount } from './hooks/user'
import LoginPage from './containers/LoginPage'
import PasswordRecoveryPage from './containers/PasswordRecoveryPage'
import SignUpPage from './containers/SignUpPage'
import DashboardPage from './containers/DashboardPage'
import Notifications from './components/common/Notifications'

const PrivateRoute = ({ children, ...rest }) => {
  const { decrypt } = useAccount()
  let user = useSelector(state => get(state, 'account.user', '{}'))
  const isAuth = !isEmpty(user)
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
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/forgot-password" component={PasswordRecoveryPage} />
        <PrivateRoute path="/">
          <DashboardPage />
        </PrivateRoute>
      </Switch>
      <Notifications
        open={!isEmpty(notifications.values)}
        onClose={() => dispatch({
          type: 'SET_NOTIFICATIONS',
          notifications: ''
        })}
        message={notifications.values}
      />
    </Router>
  );
}


