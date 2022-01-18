import { applySchoolTheme } from '../helpers/utils'
import ActionTypes from './actionTypes'

export const appAction = (data) => (dispatch) =>
  dispatch({
    type: ActionTypes.APP,
    data,
  })

export const adminTypeAction = (data) => (dispatch) =>
  dispatch({
    type: ActionTypes.ADMIN_TYPE,
    data,
  })

export const messageAction = (data) => (dispatch) => {
  dispatch({
    type: ActionTypes.MESSAGE,
    data,
  })
}

export const uiStateAction = (data) => (dispatch) => {
  dispatch({
    type: ActionTypes.UI_STATE,
    data,
  })
}

export const orgAction = (data) => (dispatch) => {
  dispatch({
    type: ActionTypes.ORG,
    data,
  })
}

export const themeAction = (data) => (dispatch) => {
  applySchoolTheme(data)
  dispatch({
    type: ActionTypes.THEME,
    data,
  })
}
