import { GET_USERS, GET_USER, PUT_USER, POST_USER, DELETE_USER } from '../actionTypes'

const initialState = {
    users: [],
    user: {}
}
const users = (state = initialState, action) => {
    switch (action.type) {
      case GET_USERS:
        return {
          ...initialState,
          users: action.users
        }
      case GET_USER:
        return {
          ...initialState,
          user: action.user
        }
      case PUT_USER:
        return {
          ...initialState,
          user: action.user
        }
      case POST_USER:
        return {
          ...initialState,
          user: action.user
        }
      case DELETE_USER:
        return {
          ...initialState,
          user: action.user
        }
      default:
        return state
    }
  }

export default users;
