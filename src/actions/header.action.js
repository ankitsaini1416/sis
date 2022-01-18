import ActionTypes from './actionTypes'

export const headerAction = (payload) => (dispatch) =>
  dispatch({
    type: ActionTypes.HEADER,
    payload,
  })
