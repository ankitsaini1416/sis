import ActionTypes from './../actions/actionTypes'

const initialState = {
  isLoggedIn: false,
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        ...action.data,
      }

    default:
      return state
  }
}

export default auth
