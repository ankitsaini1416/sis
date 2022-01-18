import { API } from './../api/api'
import { fetch, post } from './../api/httpClient'
import localStorageService from './../api/localStorageService'
import { MESSAGE_SEVERITIES } from './../helpers/constants'
import { selectOrg } from './../helpers/selectors'
import ActionTypes from './actionTypes'
import { messageAction, themeAction } from './app.action'
import toggleLoaderAction from './loader.action'

export const metadataAction = (data) => (dispatch) => {
  dispatch({
    type: ActionTypes.METADATA,
    data,
  })
}

export const fetchTenantMetadata = (successCallback, failureCallback) => async (dispatch) => {
  const { accountId } = localStorageService.getAccessToken()
  dispatch(toggleLoaderAction(true))
  try {
    const url = `${API.CORE.METADATA}?metaType=tenant&metaTypeId=${accountId}`
    let { data } = await fetch(url)
    data = data.reduce((value, currentItem) => {
      value[currentItem.md_meta_key] = currentItem.md_meta_value
      return value
    }, {})
    dispatch(metadataAction(data))
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

export const addUpdateTenantMetadata =
  (payload, successCallback, failureCallback) => async (dispatch) => {
    const { accountId } = localStorageService.getAccessToken()
    const updatedPayload = Object.keys(payload).map((meta) => ({
      md_meta_type: 'tenant',
      md_meta_type_id: accountId,
      md_meta_key: meta,
      md_meta_value: payload[meta],
    }))
    dispatch(toggleLoaderAction(true))
    try {
      await post(API.CORE.METADATA, updatedPayload)
      dispatch(fetchTenantMetadata())
      dispatch(
        messageAction({
          subTitle: 'message:appSettingUpdated',
          severity: MESSAGE_SEVERITIES.SUCCESS,
        })
      )
      if (typeof successCallback === 'function') {
        successCallback()
      }
    } catch (error) {
      if (typeof failureCallback === 'function') {
        failureCallback(error)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }

export const fetchMetadata =
  (metaInfo, successCallback, failureCallback) => async (dispatch, getState) => {
    dispatch(toggleLoaderAction(true))
    try {
      const url = `${API.CORE.METADATA}?metaType=${metaInfo.metaType}&metaTypeId=${metaInfo.metaTypeId}`
      let { data } = await fetch(url)
      const org = selectOrg(getState())
      data = data.reduce((value, currentItem) => {
        value[currentItem.md_meta_key] = checkForBoolean(currentItem.md_meta_value)
        return value
      }, {})
      if (metaInfo.metaTypeId == org.sch_id) {
        dispatch(themeAction(data.school_theme))
      }
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

export const addUpdateMetadata =
  (payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      await post(API.CORE.METADATA, payload)
      dispatch(
        messageAction({
          subTitle: 'message:generalSettingUpdated',
          severity: MESSAGE_SEVERITIES.SUCCESS,
        })
      )
      if (typeof successCallback === 'function') {
        successCallback()
      }
    } catch (error) {
      if (typeof failureCallback === 'function') {
        failureCallback(error)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }

const checkForBoolean = (value) => {
  return value === '1' ? true : value === '0' ? false : value
}
