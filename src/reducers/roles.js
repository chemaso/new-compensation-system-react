import { GET_ROLES, GET_ROLE } from '../actionTypes'

const initialState = {
    roles: {},
    role: {}
}
const roles = (state = initialState, action) => {
    switch (action.type) {
      case GET_ROLES:
        return {
          ...initialState,
          roles: action.roles
        }
      case GET_ROLE:
        return {
          ...initialState,
          role: action.role
        }
      default:
        return state
    }
  }

export default roles;
