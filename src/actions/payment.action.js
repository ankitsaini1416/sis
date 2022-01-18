import { API } from '../api/api'
import { fetch, post, put, remove } from '../api/httpClient'
import { MESSAGE_SEVERITIES } from './../helpers/constants'
import { isEmpty, trim } from './../helpers/utils'
import { messageAction } from './app.action'
import toggleLoaderAction from './loader.action'

export const fetchAppId = (appId, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const { data } = await fetch(`${API.PAYMENT.APPID}/${appId}`)
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

export const addAppId = (payload, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    //---------- Removing White Space -------//
    payload.application_name && (payload.application_name = trim(payload.application_name))
    payload.application_email && (payload.application_email = trim(payload.application_email))
    //------------------ END ----------------//
    const { data } = await post(API.PAYMENT.APPID, payload)
    dispatch(
      messageAction({
        subTitle: 'message:addIdAdded',
        severity: MESSAGE_SEVERITIES.SUCCESS,
      })
    )
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

export const updateAppId = (payload, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    //---------- Removing White Space -------//
    payload.application_name && (payload.application_name = trim(payload.application_name))
    payload.application_email && (payload.application_email = trim(payload.application_email))
    //------------------ END ----------------//
    const { data } = await put(`${API.PAYMENT.APPID}/${payload.program}`, payload)
    dispatch(
      messageAction({
        subTitle: 'message:addIdUpdated',
        severity: MESSAGE_SEVERITIES.SUCCESS,
      })
    )
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

export const fetchPaymentMaster = (successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    let { data } = await fetch(API.PAYMENT.GATEWAYMASTERLIST, {})
    if (isEmpty(data)) {
      data = []
    }
    const mappedData = data.map((item) => ({
      ...item,
      active: Boolean(item.active),
      configurable_fields: JSON.parse(item.configurable_fields),
    }))
    if (typeof successCallback === 'function') {
      successCallback(mappedData)
    }
  } catch (err) {
    if (typeof failureCallback === 'function') {
      failureCallback(err)
    }
  } finally {
    dispatch(toggleLoaderAction(false))
  }
}

export const fetchPaymentGateways =
  (appId, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      if (isEmpty(appId)) {
        return
      }
      const config = {
        headers: {
          'Application-ID': appId,
        },
      }
      let { data } = await fetch(API.PAYMENT.GATEWAYLIST, config)
      if (isEmpty(data)) {
        data = []
      }
      const mappedData = data.map((item) => ({
        ...item,
        active: Boolean(item.active),
        config: JSON.parse(item.config),
      }))
      if (typeof successCallback === 'function') {
        successCallback(mappedData)
      }
    } catch (err) {
      if (typeof failureCallback === 'function') {
        failureCallback(err)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }

export const createPaymentGateway =
  (appId, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      if (isEmpty(appId)) {
        return
      }
      const config = {
        headers: {
          'Application-ID': appId,
        },
      }
      const updatedPayload = {
        ...payload,
        active: payload.active ? 1 : 0,
      }
      await post(API.PAYMENT.GATEWAYLIST, updatedPayload, config)
      dispatch(
        messageAction({
          subTitle: 'message:gatewayAdded',
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

export const updatePaymentGateway =
  (appId, id, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      if (isEmpty(appId)) {
        return
      }
      const config = {
        headers: {
          'Application-ID': appId,
        },
      }
      const updatedPayload = {
        ...payload,
        active: payload.active ? 1 : 0,
      }
      const { data } = await put(`${API.PAYMENT.GATEWAYLIST}/${id}`, updatedPayload, config)
      dispatch(
        messageAction({
          subTitle: 'message:gatewayUpdated',
          severity: MESSAGE_SEVERITIES.SUCCESS,
        })
      )
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

export const deletePaymentGateway =
  (appId, id, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    if (isEmpty(appId)) {
      return
    }
    const config = {
      headers: {
        'Application-ID': appId,
      },
    }
    try {
      await remove(`${API.PAYMENT.GATEWAYLIST}/${id}`, config)
      dispatch(
        messageAction({
          subTitle: 'message:gatewayDeleted',
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
