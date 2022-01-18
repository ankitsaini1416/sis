import ActionTypes from './../actions/actionTypes'

const initialState = {
  default_email_topic: '',
  default_inapp_topic: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.METADATA:
      return action.data
    default:
      return state
  }
}
