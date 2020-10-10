import { GET_PERMISSIONS } from '../actionTypes'

const initialState = {
    data: {},
}
const permissions = (state = initialState, action) => {
    switch (action.type) {
      case GET_PERMISSIONS:
        return {
          ...initialState,
          data: action.account
        }
      default:
        return state
    }
  }

export default permissions;
