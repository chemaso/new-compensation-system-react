import { SET_NOTIFICATIONS } from '../actionTypes'

const initialState = {
    values: {}
}
const notifications = (state = initialState, action) => {
    switch (action.type) {
      case SET_NOTIFICATIONS:
        return {
          ...initialState,
          values: action.notifications,
          severity: action.severity
        }
      default:
        return state
    }
  }

export default notifications;
