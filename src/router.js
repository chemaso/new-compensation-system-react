import React from "react";
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import get from 'lodash/get'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import LoginPage from './containers/LoginPage'
import PasswordRecoveryPage from './containers/PasswordRecoveryPage'
import SignUpPage from './containers/SignUpPage'
import Notifications from './components/common/Notifications'

const Users = () => { return (<div>Users</div>) }
const Home = () => { return (<div>Home</div>) }

const PrivateRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch()
  const userName = sessionStorage.getItem('name')
  const userId = sessionStorage.getItem('id')
  return (
    <Route
      {...rest}
      render={({ location }) => {
        const isAuth = !isNil(userName) && !isNil(userId)
        if (isAuth) {
          dispatch({
            type: 'SET_LOGGED_IN',
            account: {
              id: userId,
              name: userName
            }
          })
        }
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
  const notifications = useSelector(state => get(state, 'notifications.values', {}))
  const dispatch = useDispatch()
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/forgot-password" component={PasswordRecoveryPage} />
        <PrivateRoute path="/users">
          <Users />
        </PrivateRoute>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
      <Notifications
        open={!isEmpty(notifications)}
        onClose={() => dispatch({
          type: 'SET_NOTIFICATIONS',
          notifications: ''
        })}
        message={notifications}
      />
    </Router>
  );
}


