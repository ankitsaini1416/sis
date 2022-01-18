/* eslint-disable no-debugger */
import moment from 'moment'

import { API } from '../api/api'
import { DATEFORMATWITHTIME, MESSAGE_SEVERITIES, WIZARD_TYPES } from '../helpers/constants'
import { get, isEmpty } from '../helpers/utils'
import { fetch, post, put, remove } from './../api/httpClient'
import ActionTypes from './actionTypes'
import { messageAction } from './app.action'
import toggleLoaderAction from './loader.action'

export const dashboardAction = (data) => (dispatch) => {
  dispatch({
    type: ActionTypes.DASHBOARD,
    data,
  })
}

export const fetchDashboardListCall = (successCallback, errorCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const apiPath = `${API.DASHBOARD}/get?page=1&perPage=1000&sortBy=name&sortOrder=desc`
    const response = await fetch(apiPath)
    get(response, 'data.content', []).forEach((item) => modifyDashboardDeatils(item))
    dispatch(
      dashboardAction({
        dashboards: get(response, 'data.content', []),
        isLoaded: true,
      })
    )
    if (typeof successCallback === 'function') {
      successCallback(response.data)
    }
  } catch (err) {
    dispatch(
      dashboardAction({
        isLoaded: true,
      })
    )
    if (typeof errorCallback === 'function') {
      errorCallback(err)
    }
  } finally {
    dispatch(toggleLoaderAction(false))
  }
}

export const createDashboardCall =
  (payload, successCallback, errorCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    const apiPath = `${API.DASHBOARD}/create/`
    try {
      await post(apiPath, payload)
      dispatch(
        messageAction({
          subTitle: 'message:dashboardAdded',
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

export const updateDashboardCall =
  (id, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const apiPath = `${API.DASHBOARD}/${id}`
      const response = await put(apiPath, payload)
      dispatch(
        messageAction({
          subTitle: 'message:dashboardUpdated',
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

export const deleteDashboardCall = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const apiPath = `${API.DASHBOARD}/delete/${id}`
    const response = await remove(apiPath, {})
    dispatch(
      messageAction({
        subTitle: 'message:dashboardDeleted',
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

export const fetchDashboardWidgetsById =
  (dashboardId, successCallback, errorCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const apiPath = `${API.DASHBOARD}/user/widget/get/${dashboardId}`
      const { data } = await fetch(apiPath)
      const actions = await Promise.all(
        data.content.map((dashboard) =>
          fetch(`${API.DASHBOARD}/widget/getData/${dashboard._id}`, {})
        )
      )
      data.content.forEach((action, index) => {
        action.wizardInfo = actions[index]?.data?.widget || {}
      })
      get(data, 'content', [])
        .sort((a, b) => {
          return a.position - b.position
        })
        .forEach((item) => modifyWidgetData(item))
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

export const fetchDashboardMatersWidgets = (successCallback, errorCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const apiPath = `${API.DASHBOARD}/widget/get`
    const response = await fetch(apiPath)
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

export const createDashboardWidgetCall =
  (dashboardId, payload, successCallback, errorCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    const apiPath = `${API.DASHBOARD}/user/widget/create/${dashboardId}`
    try {
      await post(apiPath, payload)
      dispatch(
        messageAction({
          subTitle: 'message:dashboardAdded',
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

export const deleteDashboardWidgetCall =
  (id, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    if (isEmpty(id)) {
      return
    }
    try {
      const apiPath = `${API.DASHBOARD}/user/widget/delete/${id}`
      await remove(apiPath, {})
      dispatch(
        messageAction({
          subTitle: 'message:widgetDeleted',
          severity: MESSAGE_SEVERITIES.SUCCESS,
        })
      )
      successCallback()
    } catch (err) {
      if (typeof failureCallback === 'function') {
        failureCallback(err)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }

const modifyDashboardDeatils = function (item) {
  if (isEmpty(item)) {
    return
  }
  item.id = item._id
  item.createdAtLabel = moment(item.createdAt).format(DATEFORMATWITHTIME)
}

const modifyWidgetData = function (item) {
  switch (item?.widget_info?.type) {
    case WIZARD_TYPES.BAR: {
      const barCollection = []
      const graphData = item.wizardInfo.payload.map((recordItem) => {
        const res = {
          name: recordItem[item?.wizardInfo?.name],
        }
        recordItem.content.forEach((rowItem) => {
          res[rowItem.key] = rowItem.value
          if (!barCollection.find((barItem) => barItem.dataKey === rowItem.key)) {
            barCollection.push({
              dataKey: rowItem.key,
              fill: rowItem.color,
            })
          }
        })
        return res
      })
      item.wizardInfo = {
        barCollection,
        graphData,
      }
      break
    }
    case WIZARD_TYPES.PIE: {
      item.wizardInfo = {
        graphData: item.wizardInfo.map((item) => ({
          name: item.name,
          value: parseInt(item.value),
          fill: item.color,
        })),
      }
      break
    }
  }
}
