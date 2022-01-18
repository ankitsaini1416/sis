import moment from 'moment'

import { API } from './../api/api'
import { fetch, post, put } from './../api/httpClient'
import { DATEFORMATWITHTIME, MESSAGE_SEVERITIES } from './../helpers/constants'
import { get, getDateInUserTimezone, isEmpty, isNullOrEmpty } from './../helpers/utils'
import { messageAction } from './app.action'
import toggleLoaderAction from './loader.action'

export const fetchInstituteDistrictsCall =
  (pageDetails, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      let url = `${API.CORE.DISTRICT}?page=${pageDetails.current_page || ''}&perPage=${
        pageDetails.per_page || ''
      }&sortBy=${pageDetails.sort_by || 'dst_name'}&sortOrder=${pageDetails.sort_order || ''}&q=${
        pageDetails.q || ''
      }&type=${pageDetails.type || ''}`
      if (pageDetails.fromDate) {
        url += `&fromDate=${moment(pageDetails.fromDate).format('YYYY-MM-DD')}T00:00:00`
      }
      if (pageDetails.toDate) {
        url += `&toDate=${moment(pageDetails.toDate).format('YYYY-MM-DD')}T23:59:59`
      }
      if (pageDetails.isActive) {
        url += `&isActive=${pageDetails.isActive === 'active' ? 'true' : 'false'}`
      }
      const { data } = await fetch(url)
      get(data, 'content', []).forEach((item) => modifyInstituteDistrictItem(item))
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

export const fetchInstituteDistrictsByPublicIdsCall =
  (ids, successCallback, failureCallback, showLoader = true) =>
  async (dispatch) => {
    if (showLoader) {
      dispatch(toggleLoaderAction(true))
    }
    try {
      const payload = {
        district_public_id: ids,
      }
      let url = `${API.CORE.DISTRICT}/district-public-id`
      const { data } = await post(url, payload)
      data.forEach((item) => modifyInstituteDistrictItem(item))
      if (typeof successCallback === 'function') {
        successCallback(data)
      }
    } catch (error) {
      if (typeof failureCallback === 'function') {
        failureCallback(error)
      }
    } finally {
      if (showLoader) {
        dispatch(toggleLoaderAction(false))
      }
    }
  }

export const fetchInstituteDistrictByIdCall =
  (id, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const url = `${API.CORE.DISTRICT}/${id}`
      const { data } = await fetch(url)
      modifyInstituteDistrictItem(data)
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

export const addInstituteDistrictCall =
  (payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const updatedPayload = new FormData()
      Object.keys(payload).forEach((key) => {
        updatedPayload.append(key, payload[key])
      })
      await post(API.CORE.DISTRICT, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:districtAdded',
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

export const editInstituteDistrictCall =
  (id, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const updatedPayload = new FormData()
      Object.keys(payload).forEach((key) => {
        updatedPayload.append(key, payload[key])
      })
      await put(`${API.CORE.DISTRICT}/${id}`, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:districtUpdated',
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

export const uploadInstituteDistrictLogoCall =
  (id, file, successCallback, failureCallback) => async (dispatch) => {
    // dispatch(toggleLoaderAction(true))
    try {
      const payload = new FormData()
      payload.append('dst_logo', file)
      await put(`${API.CORE.DISTRICT}/update-file/${id}`, payload)

      if (isNullOrEmpty(file)) {
        dispatch(
          messageAction({
            subTitle: 'message:logoDeleted',
            severity: MESSAGE_SEVERITIES.SUCCESS,
          })
        )
      } else {
        dispatch(
          messageAction({
            subTitle: 'message:logoUpdated',
            severity: MESSAGE_SEVERITIES.SUCCESS,
          })
        )
      }
      if (typeof successCallback === 'function') {
        successCallback()
      }
    } catch (error) {
      if (typeof failureCallback === 'function') {
        failureCallback(error)
      }
    } finally {
      // dispatch(toggleLoaderAction(false))
    }
  }

const modifyInstituteDistrictItem = function (item) {
  if (isEmpty(item)) {
    return
  }
  item.id = item.dst_id
  item.createdTimeLabel = getDateInUserTimezone(item.created_at, 'GMT', DATEFORMATWITHTIME)
  item.updatedTimeLabel = getDateInUserTimezone(item.updated_at, 'GMT', DATEFORMATWITHTIME)
}
