import ActionTypes from '../actions/actionTypes'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER:
      return action.data
    default:
      return state
  }
}
