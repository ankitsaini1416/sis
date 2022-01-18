import { API } from '../api/api'
import { fetch, post, put, remove } from '../api/httpClient'
import localStorageService from '../api/localStorageService'
import { MESSAGE_SEVERITIES } from '../helpers/constants'
import { isEmpty } from '../helpers/utils'
import { messageAction } from './app.action'
import toggleLoaderAction from './loader.action'

const modifyLMSDetail = function (item) {
  if (isEmpty(item)) {
    return
  }
  item.lmc_active = Boolean(item.lmc_active)
}

export const fetchLmsList = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const { data } = await fetch(`${API.CORE.GETLMSLIST}/${id}`)
    data.forEach((item) => modifyLMSDetail(item))
    if (typeof successCallback === 'function') {
      successCallback(data)
    }
  } catch (err) {
    if (typeof failureCallback === 'function') {
      failureCallback(err)
    }
  } finally {
    dispatch(toggleLoaderAction(false))
  }
}
export const fetchConfigMasterLmsList = (successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const { data } = await fetch(`${API.CORE.GETCONFIGLMSLIST}`)
    if (typeof successCallback === 'function') {
      successCallback(data)
    }
  } catch (err) {
    if (typeof failureCallback === 'function') {
      failureCallback(err)
    }
  } finally {
    dispatch(toggleLoaderAction(false))
  }
}
export const createLms = (id, payload, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const updatedPayload = {
      ...payload,
      lmc_active: payload.lmc_active ? true : false,
    }
    const apiPath = `${API.CORE.CREATELMS}/${id}/config`
    const { data } = await post(apiPath, updatedPayload)
    dispatch(
      messageAction({
        subTitle: 'message:lmsAdded',
        severity: MESSAGE_SEVERITIES.SUCCESS,
      })
    )
    if (typeof successCallback === 'function') {
      successCallback(data)
    }
  } catch (error) {
    if (typeof failureCallback === 'function') {
      failureCallback(error)
    }
  } finally {
    dispatch(toggleLoaderAction(false))
  }
}
export const updateLms =
  (schoolId, lmsId, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const updatedPayload = {
        ...payload,
        lmc_active: payload.lmc_active ? true : false,
      }
      const apiPath = `${API.CORE.UPDATELMS}/${schoolId}/config/${lmsId}`
      const { data } = await put(apiPath, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:lmsAdded',
          severity: MESSAGE_SEVERITIES.SUCCESS,
        })
      )
      if (typeof successCallback === 'function') {
        successCallback(data)
      }
    } catch (error) {
      if (typeof failureCallback === 'function') {
        failureCallback(error)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }
export const deleteLms =
  (schoolId, removeId, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))

    try {
      await remove(`${API.CORE.DELETELMS}/${schoolId}/config/${removeId}`)
      dispatch(
        messageAction({
          subTitle: 'message:lmsDeleted',
          severity: MESSAGE_SEVERITIES.SUCCESS,
        })
      )
      if (typeof successCallback === 'function') {
        successCallback()
      }
    } catch (err) {
      if (typeof failureCallback === 'function') {
        failureCallback(err)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }

export const fetchAuthlmsUrl =
  (schoolId, authLmsId, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const { data } = await fetch(`${API.CORE.AUTHLMS}/${schoolId}/config/${authLmsId}/link`)
      if (typeof successCallback === 'function') {
        successCallback(data)
      }
    } catch (err) {
      if (typeof failureCallback === 'function') {
        failureCallback(err)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }

export const fetchAuthAccessUrl =
  (schoolId, authLmsId, code, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const { data } = await fetch(
        `${API.CORE.AUTHACCESSCODE}/${schoolId}/config/${authLmsId}/access-code/${code}`
      )
      dispatch(
        messageAction({
          subTitle: 'message:lmsStatusSunc',
          severity: MESSAGE_SEVERITIES.SUCCESS,
        })
      )
      if (typeof successCallback === 'function') {
        localStorageService.clearLmsObject('lmsObject')
        successCallback(data)
      }
    } catch (err) {
      if (typeof failureCallback === 'function') {
        failureCallback(err)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }
