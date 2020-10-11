import { GET_DEPARTMENTS, GET_DEPARTMENT, PUT_DEPARTMENT, POST_DEPARTMENT, DELETE_DEPARTMENT } from '../actionTypes'

const initialState = {
    departments: {},
    department: {}
}
const departments = (state = initialState, action) => {
    switch (action.type) {
      case GET_DEPARTMENTS:
        return {
          ...initialState,
          departments: action.departments
        }
      case GET_DEPARTMENT:
        return {
          ...initialState,
          department: action.department
        }
      case PUT_DEPARTMENT:
        return {
          ...initialState,
          department: action.department
        }
      case DELETE_DEPARTMENT:
        return {
          ...initialState,
          department: action.department
        }
      case POST_DEPARTMENT:
        return {
          ...initialState,
          department: action.department
        }
      default:
        return state
    }
  }

export default departments;
