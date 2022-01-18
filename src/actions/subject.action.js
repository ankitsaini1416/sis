import moment from 'moment'

import { API } from '../api/api'
import { fetch, post, put, remove } from '../api/httpClient'
import { DATEFORMATWITHTIME, MESSAGE_SEVERITIES } from '../helpers/constants'
import { get, getDateInUserTimezone, isEmpty } from '../helpers/utils'
import { messageAction } from './app.action'
import toggleLoaderAction from './loader.action'

export const createSubjectCall = (payload, successCallback, errorCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const { sub_name, sub_code, sub_school_id } = payload
    const updatedPayload = {
      sub_name,
      sub_code,
      sub_school_id,
    }
    await post(API.CORE.SUBJECT, updatedPayload)
    dispatch(
      messageAction({
        subTitle: 'message:subjectAdded',
        severity: MESSAGE_SEVERITIES.SUCCESS,
      })
    )
    if (typeof successCallback === 'function') {
      successCallback()
    }
  } catch (error) {
    if (typeof errorCallback === 'function') {
      errorCallback(error)
    }
  } finally {
    dispatch(toggleLoaderAction(false))
  }
}

export const fetchSubjectsCall =
  (pageDetails, successCallback, failureCallback) => async (dispatch) => {
    try {
      if (!pageDetails.schoolId) {
        return
      }
      dispatch(toggleLoaderAction(true))
      let url = `${API.CORE.SUBJECT}?page=${pageDetails.current_page || ''}&perPage=${
        pageDetails.per_page || ''
      }&sortBy=${pageDetails.sort_by || ''}&sortOrder=${pageDetails.sort_order || ''}&q=${
        pageDetails.q || ''
      }&schoolId=${pageDetails.schoolId || ''}`
      if (pageDetails.fromDate) {
        url += `&fromDate=${moment(pageDetails.fromDate).format('YYYY-MM-DD')}T00:00:00`
      }
      if (pageDetails.toDate) {
        url += `&toDate=${moment(pageDetails.toDate).format('YYYY-MM-DD')}T23:59:59`
      }
      const { data } = await fetch(url)
      get(data, 'content', []).forEach((item) => modifySubjectItem(item))
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

export const fetchSubjectByIdCall = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const url = `${API.CORE.SUBJECT}/${id}`
    const { data } = await fetch(url)
    modifySubjectItem(data)
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

export const editSubjectCall =
  (id, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const { sub_name, sub_code, sub_school_id } = payload
      const updatedPayload = {
        sub_name,
        sub_code,
        sub_school_id,
      }
      await put(`${API.CORE.SUBJECT}/${id}`, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:SubjectUpdated',
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

export const deleteSubjectCall = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const apiPath = `${API.CORE.SUBJECT}/${id}`
    const response = await remove(apiPath, {})
    dispatch(
      messageAction({
        subTitle: 'message:SubjectDeleted',
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

const modifySubjectItem = function (item) {
  if (isEmpty(item)) {
    return
  }
  item.id = item.sub_id
  item.createdTimeLabel = getDateInUserTimezone(item.created_at, 'GMT', DATEFORMATWITHTIME)
  item.updatedTimeLabel = getDateInUserTimezone(item.updated_at, 'GMT', DATEFORMATWITHTIME)
}
