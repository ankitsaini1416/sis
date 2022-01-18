import moment from 'moment'

import { API } from '../api/api'
import { fetch, put } from '../api/httpClient'
import { DATEFORMATWITHTIME, MESSAGE_SEVERITIES } from './../helpers/constants'
import { get, isEmpty } from './../helpers/utils'
import { messageAction } from './app.action'
import toggleLoaderAction from './loader.action'

export const fetchEmailCall =
  (schoolId, pageDetails, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      if (!schoolId) {
        return
      }
      let apiPath = `${API.EMAIL}?perPage=${pageDetails.per_page}&page=${
        pageDetails.current_page
      }&sortBy=${pageDetails.sort_by || ''}&sortOrder=${
        pageDetails.sort_order || ''
      }&schoolId=${schoolId}`
      const { data } = await fetch(apiPath, {})
      get(data, 'content', []).forEach((email) => modifyEmailDetails(email))
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

export const fetchEmailByIdCall = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const url = `${API.EMAIL}/${id}`
    const { data } = await fetch(url)
    modifyEmailDetails(data)
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

export const editEmailCall =
  (id, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      await put(`${API.EMAIL}/${id}`, payload)
      dispatch(
        messageAction({
          subTitle: 'message:emailUpdated',
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

const modifyEmailDetails = function (email) {
  if (isEmpty(email)) {
    return
  }
  email.created_at = moment(email.created_at).format(DATEFORMATWITHTIME)
  email.updated_at = moment(email.updated_at).format(DATEFORMATWITHTIME)
}
