import ActionTypes from './actionTypes'

export default (data) => (dispatch) => {
  dispatch({
    type: ActionTypes.LOADER,
    data,
  })
}
