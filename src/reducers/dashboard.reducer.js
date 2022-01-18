import ActionTypes from '../actions/actionTypes'

const initialState = {
  dashboards: [],
  isLoaded: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DASHBOARD:
      return {
        ...state,
        ...action.data,
      }
    default:
      return state
  }
}
