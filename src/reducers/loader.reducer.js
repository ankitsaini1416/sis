import ActionTypes from './../actions/actionTypes'

export default (state = false, action = {}) => {
  if (action.type === ActionTypes.LOADER) {
    return action.data
  }
  return state
}
