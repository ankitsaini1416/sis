import moment from 'moment'

import { API } from '../api/api'
import { DATEFORMATWITHTIME, MESSAGE_SEVERITIES } from '../helpers/constants'
import { get, isEmpty } from '../helpers/utils'
import { fetch, patch, post, remove } from './../api/httpClient'
import { messageAction } from './app.action'
import toggleLoaderAction from './loader.action'

export const callGetTemplatesApi =
  (pageFilter, serviceCode, successCallback, errorCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    const filter = `q=${pageFilter ? pageFilter.q : ''}&f_collection=${encodeURIComponent(
      pageFilter ? pageFilter.f_collection : ''
    )}&f_content=${pageFilter ? pageFilter.f_content : ''}&f_filename=${
      pageFilter ? pageFilter.f_filename : ''
    }&f_nickname=${pageFilter ? pageFilter.f_nickname : ''}&per_page=${
      pageFilter.per_page || ''
    }&page=${pageFilter.current_page || ''}`
    const apiPath = `${API.TEMPLATE}templates/svc-${serviceCode}/search?${filter}`
    try {
      if (!serviceCode) {
        return
      }
      const response = await fetch(apiPath)
      get(response, 'data.content', []).forEach((template) => modifyTemplateDeatils(template))
      if (typeof successCallback === 'function') {
        successCallback(response.data)
      }
    } catch (err) {
      if (typeof errorCallback === 'function') {
        errorCallback(err)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }
export const callCreateTemplateApi =
  (payload, successCallback, errorCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    const apiPath = `${API.TEMPLATE}templates`
    try {
      const { content, name, nickname, group, service_code, collection } = payload
      const updatedPayload = {
        content,
        name,
        nickname,
        group,
        service_code,
        collection,
      }
      await post(apiPath, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:templateAdded',
          severity: MESSAGE_SEVERITIES.SUCCESS,
        })
      )
      if (typeof successCallback === 'function') {
        successCallback()
      }
    } catch (err) {
      if (typeof errorCallback === 'function') {
        errorCallback(err)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }
export const callGetGroupsApi = (successCallback, errorCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  const apiPath = `${API.TEMPLATE}groups`
  try {
    const response = await fetch(apiPath)
    get(response, 'data.content', []).forEach((template) => modifyTemplateDeatils(template))
    if (typeof successCallback === 'function') {
      successCallback(response.data)
    }
  } catch (err) {
    if (typeof errorCallback === 'function') {
      errorCallback(err)
    }
  } finally {
    dispatch(toggleLoaderAction(false))
  }
}
export const callTemplateDetailApi = (id, successCallback, errorCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  const apiPath = `${API.TEMPLATE}templates/${id}`
  try {
    const response = await fetch(apiPath)
    modifyTemplateDeatils(response.data)
    if (typeof successCallback === 'function') {
      successCallback(response.data)
    }
  } catch (err) {
    if (typeof errorCallback === 'function') {
      errorCallback(err)
    }
  } finally {
    dispatch(toggleLoaderAction(false))
  }
}
export const callRenameTemplateApi =
  (id, data, successCallback, errorCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    const apiPath = `${API.TEMPLATE}templates/${id}/rename`
    try {
      await post(apiPath, data)
      dispatch(
        messageAction({
          subTitle: 'message:templateUpdated',
          severity: MESSAGE_SEVERITIES.SUCCESS,
        })
      )
      if (typeof successCallback === 'function') {
        successCallback()
      }
    } catch (err) {
      if (typeof errorCallback === 'function') {
        errorCallback(err)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }
export const callCopyTemplateApi =
  (id, data, successCallback, errorCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    const apiPath = `${API.TEMPLATE}templates/${id}/copy`
    try {
      await post(apiPath, data)
      dispatch(
        messageAction({
          subTitle: 'message:templateCopid',
          severity: MESSAGE_SEVERITIES.SUCCESS,
        })
      )
      if (typeof successCallback === 'function') {
        successCallback()
      }
    } catch (err) {
      if (typeof errorCallback === 'function') {
        errorCallback(err)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }

export const callUpdateTemplateApi =
  (id, data, successCallback, errorCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    const apiPath = `${API.TEMPLATE}templates/${id}`
    try {
      const response = await patch(apiPath, data)
      dispatch(
        messageAction({
          subTitle: 'message:templateUpdated',
          severity: MESSAGE_SEVERITIES.SUCCESS,
        })
      )
      if (typeof successCallback === 'function') {
        successCallback(response.data)
      }
    } catch (err) {
      if (typeof errorCallback === 'function') {
        errorCallback(err)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }
export const callDeleteTemplateApi =
  (ids = [], successCallback, errorCallback) =>
  async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    if (isEmpty(ids)) {
      return
    }
    try {
      await Promise.all(ids.map((id) => remove(`${API.TEMPLATE}templates/${id}`)))
      dispatch(
        messageAction({
          subTitle: 'message:deleteTemplate',
          severity: MESSAGE_SEVERITIES.SUCCESS,
        })
      )
      if (typeof successCallback === 'function') {
        successCallback()
      }
    } catch (err) {
      if (typeof errorCallback === 'function') {
        errorCallback(err)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }

const modifyTemplateDeatils = function (template) {
  if (isEmpty(template)) {
    return
  }
  template.modified_at = moment(template.modified_at).format(DATEFORMATWITHTIME)
  template.created_at = moment(template.created_at).format(DATEFORMATWITHTIME)
}
