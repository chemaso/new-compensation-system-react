import { SET_LOGGED_IN, SET_EXPIRED_SESSION } from '../actionTypes'

const initialState = {
    user: {},
}
const account = (state = initialState, action) => {
    switch (action.type) {
      case SET_LOGGED_IN:
        return {
          ...initialState,
          user: action.account
        }
      case SET_EXPIRED_SESSION:
        return {
          ...initialState,
          user: action.account
        }
      default:
        return state
    }
  }

export default account;
