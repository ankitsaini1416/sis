import moment from 'moment'

import { API } from '../api/api'
import { fetch, post, put, remove } from '../api/httpClient'
import { DATEFORMATWITHTIME, MESSAGE_SEVERITIES } from '../helpers/constants'
import { get, getDateInUserTimezone, isEmpty } from '../helpers/utils'
import { messageAction } from './app.action'
import toggleLoaderAction from './loader.action'

export const fetchTranscriptsCall =
  (pageDetails, successCallback, failureCallback) => async (dispatch) => {
    try {
      if (!pageDetails.schoolId) {
        return
      }
      dispatch(toggleLoaderAction(true))
      let url = `${API.CORE.TRANSCRIPT}?page=${pageDetails.current_page || ''}&perPage=${
        pageDetails.per_page || ''
      }&sortBy=${pageDetails.sort_by || ''}&sortOrder=${pageDetails.sort_order || ''}&q=${
        pageDetails.q || ''
      }&type=${pageDetails.type || ''}&schoolId=${pageDetails.schoolId}`
      if (pageDetails.fromDate) {
        url += `&fromDate=${moment(pageDetails.fromDate).format('YYYY-MM-DD')}T00:00:00`
      }
      if (pageDetails.toDate) {
        url += `&toDate=${moment(pageDetails.toDate).format('YYYY-MM-DD')}T23:59:59`
      }
      if (pageDetails.isActive) {
        url += `&isActive=${pageDetails.isActive === 'Active' ? 'true' : 'false'}`
      }
      const { data } = await fetch(url)
      get(data, 'content', []).forEach((item) => modifyTranscriptItem(item))
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

export const fetchTranscriptByIdCall =
  (id, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const url = `${API.CORE.TRANSCRIPT}/${id}`
      const { data } = await fetch(url)
      modifyTranscriptItem(data)
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

export const addTranscriptCall =
  (payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const { tt_school_id, tt_template_name, tt_content, tt_layout, tt_is_active } = payload
      const updatedPayload = {
        tt_school_id,
        tt_template_name,
        tt_content,
        tt_layout,
        tt_is_active,
      }
      await post(API.CORE.TRANSCRIPT, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:TranscriptAdded',
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

export const editTranscriptCall =
  (id, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const { tt_template_name, tt_is_active, tt_content, tt_layout, tt_school_id } = payload
      const updatedPayload = {
        tt_template_name,
        tt_is_active,
        tt_content,
        tt_layout,
        tt_school_id,
      }
      await put(`${API.CORE.TRANSCRIPT}/${id}`, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:TranscriptUpdated',
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

export const deleteTranscriptCall = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const apiPath = `${API.CORE.TRANSCRIPT}/${id}`
    const response = await remove(apiPath, {})
    dispatch(
      messageAction({
        subTitle: 'message:TranscriptDeleted',
        severity: MESSAGE_SEVERITIES.SUCCESS,
      })
    )
    successCallback(response.data)
  } catch (err) {
    if (typeof failureCallback === 'function') {
      failureCallback(err)
    }
  } finally {
    dispatch(toggleLoaderAction(false))
  }
}

const modifyTranscriptItem = function (item) {
  if (isEmpty(item)) {
    return
  }
  item.id = item.tt_id
  item.createdTimeLabel = getDateInUserTimezone(item.created_at, 'GMT', DATEFORMATWITHTIME)
  item.updatedTimeLabel = getDateInUserTimezone(item.updated_at, 'GMT', DATEFORMATWITHTIME)
}
