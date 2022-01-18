import moment from 'moment'

import { API } from '../api/api'
import { DATEFORMATWITHTIME, MESSAGE_SEVERITIES } from '../helpers/constants'
import { fetch, post, put, remove } from './../api/httpClient'
import { get, isEmpty } from './../helpers/utils'
import { messageAction } from './app.action'
import toggleLoaderAction from './loader.action'

export const fetchTopicsDetail =
  (pageDetails, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const apiPath = `${API.NOTIFICATION.topics}?page=${pageDetails.current_page || ''}&q=${
        pageDetails.q || ''
      }&perPage=${pageDetails.per_page || ''}&sortBy=${pageDetails.sort_by}&sortOrder=${
        pageDetails.sort_order
      }`
      const response = await fetch(apiPath, {})
      get(response, 'data.content', []).forEach((topic) => modifyTopicDeatils(topic))
      if (typeof successCallback === 'function') {
        successCallback(response)
      }
    } catch (err) {
      if (typeof failureCallback === 'function') {
        failureCallback(err)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }

export const createTopicApi = (payload, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const { name, description, processor, keep_logs, ...Configs } = payload
    const updatedPayload = {
      name,
      description,
      processor,
      keep_logs: keep_logs,
      config: {
        ...Configs,
      },
    }
    const apiPath = API.NOTIFICATION.topics
    const { data } = await post(apiPath, updatedPayload)
    dispatch(
      messageAction({
        subTitle: 'message:topicAdded',
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
export const fetchProcessorAction = (successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const apiPath = API.NOTIFICATION.processor
    const response = await fetch(apiPath, {})
    if (typeof successCallback === 'function') {
      successCallback(response.data)
    }
  } catch (err) {
    if (typeof failureCallback === 'function') {
      failureCallback(err)
    }
  } finally {
    dispatch(toggleLoaderAction(false))
  }
}

export const fetchProcessorConfigApi =
  (payload, successCallback, errorCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    let apiPath = `${API.NOTIFICATION.processor}/${payload}`
    try {
      const { data } = await fetch(apiPath, {})
      if (typeof successCallback === 'function') {
        successCallback(data)
      }
    } catch (err) {
      if (typeof errorCallback === 'function') {
        errorCallback(err)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }

export const updateTopics = (id, payload, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const apiPath = `${API.NOTIFICATION.topics}/${id}`
    const response = await put(apiPath, payload)
    dispatch(
      messageAction({
        subTitle: 'message:topicUpdated',
        severity: MESSAGE_SEVERITIES.SUCCESS,
      })
    )
    if (typeof successCallback === 'function') {
      successCallback(response)
    }
  } catch (err) {
    if (typeof failureCallback === 'function') {
      failureCallback(err)
    }
  } finally {
    dispatch(toggleLoaderAction(false))
  }
}
export const fetchTopicAction = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const apiPath = `${API.NOTIFICATION.topics}/${id}`
    const response = await fetch(apiPath, {})
    if (typeof successCallback === 'function') {
      successCallback(response.data)
    }
  } catch (err) {
    if (typeof failureCallback === 'function') {
      failureCallback(err)
    }
  } finally {
    dispatch(toggleLoaderAction(false))
  }
}

export const fetchTopicsLogs =
  (topicID, pageDetails, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    const apiPath = `${API.NOTIFICATION.topics}/${topicID}/logs?q=${
      pageDetails.q || ''
    }&f_startdate=${pageDetails.f_startdate || ''}&f_enddate=${
      pageDetails.f_enddate || ''
    }&per_page=${pageDetails.per_page || ''}&page=${pageDetails.current_page || ''}&sortBy=${
      pageDetails.sortBy || ''
    }&sortOrder=${pageDetails.sortOrder || ''}`
    try {
      const response = await fetch(apiPath)
      get(response, 'data.content', []).forEach((topic) => modifyTopicDeatils(topic))
      if (typeof successCallback === 'function') {
        successCallback(get(response, 'data'))
      }
    } catch (err) {
      if (typeof failureCallback === 'function') {
        failureCallback(err)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }

export const fetchTopicLogDetail =
  (topicID, logID, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    const apiPath = `${API.NOTIFICATION.topics}/${topicID}/logs/${logID}`
    try {
      const response = await fetch(apiPath, {})
      modifyTopicDeatils(response.data)
      if (typeof successCallback === 'function') {
        successCallback(get(response, 'data'))
      }
    } catch (err) {
      if (typeof failureCallback === 'function') {
        failureCallback(err)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }

export const deleteTopicAction = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const apiPath = `${API.NOTIFICATION.topics}/${id}`
    const response = await remove(apiPath, {})
    dispatch(
      messageAction({
        subTitle: 'message:topicDeleted',
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

export const makeDefaultAction = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const updatedPayload = {
      is_default: true,
    }
    const apiPath = `${API.NOTIFICATION.topics}/${id}/make-default`
    const { data } = await post(apiPath, updatedPayload)
    dispatch(
      messageAction({
        subTitle: 'message:topicDefault',
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

const modifyTopicDeatils = function (topic) {
  if (isEmpty(topic)) {
    return
  }
  topic.logged_at = moment(topic.logged_at).format(DATEFORMATWITHTIME)
  topic.last_updated = moment(topic.last_updated).format(DATEFORMATWITHTIME)
}
