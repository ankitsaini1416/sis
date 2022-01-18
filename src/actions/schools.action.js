import moment from 'moment'

import { API } from './../api/api'
import { fetch, post, put } from './../api/httpClient'
import { DATEFORMATWITHTIME, MESSAGE_SEVERITIES } from './../helpers/constants'
import { get, getDateInUserTimezone, isEmpty, isNullOrEmpty } from './../helpers/utils'
import { messageAction } from './app.action'
import toggleLoaderAction from './loader.action'

export const fetchSchoolsCall =
  (pageDetails, successCallback, failureCallback, showLoader = true) =>
  async (dispatch) => {
    if (showLoader) {
      dispatch(toggleLoaderAction(true))
    }
    try {
      let url = `${API.CORE.SCHOOL}?page=${pageDetails.current_page || ''}&perPage=${
        pageDetails.per_page || ''
      }&sortBy=${pageDetails.sort_by || ''}&sortOrder=${pageDetails.sort_order || ''}&districtId=${
        pageDetails.districtId || ''
      }&q=${pageDetails.q || ''}&type=${pageDetails.type || ''}`
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
      get(data, 'content', []).forEach((item) => modifySchoolItem(item))
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

export const fetchSchoolsByPublicIdsCall =
  (ids, successCallback, failureCallback, showLoader = true) =>
  async (dispatch) => {
    if (showLoader) {
      dispatch(toggleLoaderAction(true))
    }
    try {
      const payload = {
        school_public_id: ids,
      }
      let url = `${API.CORE.SCHOOL}/school-public-id`
      const { data } = await post(url, payload)
      data.forEach((item) => modifySchoolItem(item))
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

export const fetchSchoolByIdCall = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const url = `${API.CORE.SCHOOL}/${id}`
    const { data } = await fetch(url)
    modifySchoolItem(data)
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

export const addSchoolCall = (payload, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const {
      sch_dst_id,
      sch_name,
      sch_school_short_name,
      sch_is_active,
      sch_school_type,
      sch_contact_person,
      sch_contact_email,
      sch_phone_prefix,
      sch_phone,
      sch_description,
      sch_website,
      sch_slug,
      sch_logo,
      ...sch_address
    } = payload

    const updatedPayload = new FormData()
    updatedPayload.append('sch_dst_id', sch_dst_id)
    updatedPayload.append('sch_name', sch_name)
    updatedPayload.append('sch_school_short_name', sch_school_short_name)
    updatedPayload.append('sch_is_active', sch_is_active)
    updatedPayload.append('sch_school_type', sch_school_type)
    updatedPayload.append('sch_contact_person', sch_contact_person)
    updatedPayload.append('sch_contact_email', sch_contact_email)
    updatedPayload.append('sch_phone_prefix', sch_phone_prefix)
    updatedPayload.append('sch_phone', sch_phone)
    updatedPayload.append('sch_description', sch_description)
    updatedPayload.append('sch_website', sch_website)
    updatedPayload.append('sch_slug', sch_slug)
    updatedPayload.append('sch_logo', sch_logo)
    Object.keys(sch_address).forEach((key) => {
      updatedPayload.append(`sch_address[${key}]`, sch_address[key])
    })
    await post(API.CORE.SCHOOL, updatedPayload)
    dispatch(
      messageAction({
        subTitle: 'message:schoolAdded',
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

export const editSchoolCall =
  (id, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const {
        sch_dst_id,
        sch_name,
        sch_school_short_name,
        sch_is_active,
        sch_school_type,
        sch_contact_person,
        sch_contact_email,
        sch_phone_prefix,
        sch_phone,
        sch_description,
        sch_website,
        sch_slug,
        ...sch_address
      } = payload

      const updatedPayload = new FormData()
      updatedPayload.append('sch_dst_id', sch_dst_id)
      updatedPayload.append('sch_name', sch_name)
      updatedPayload.append('sch_school_short_name', sch_school_short_name)
      updatedPayload.append('sch_is_active', sch_is_active)
      updatedPayload.append('sch_school_type', sch_school_type)
      updatedPayload.append('sch_contact_person', sch_contact_person)
      updatedPayload.append('sch_contact_email', sch_contact_email)
      updatedPayload.append('sch_phone_prefix', sch_phone_prefix)
      updatedPayload.append('sch_phone', sch_phone)
      updatedPayload.append('sch_description', sch_description)
      updatedPayload.append('sch_website', sch_website)
      updatedPayload.append('sch_slug', sch_slug)
      Object.keys(sch_address).forEach((key) => {
        updatedPayload.append(`sch_address[${key}]`, sch_address[key])
      })
      await put(`${API.CORE.SCHOOL}/${id}`, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:schoolUpdated',
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

export const uploadSchoolLogoCall =
  (id, file, successCallback, failureCallback) => async (dispatch) => {
    // dispatch(toggleLoaderAction(true))
    try {
      const payload = new FormData()
      payload.append('sch_logo', file)
      await put(`${API.CORE.SCHOOL}/update-file/${id}`, payload)
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

export const addGradeScaleCall =
  (schoolId, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    const apiPath = `${API.CORE.GRADESCALE}`
    try {
      const updatedPayload = [
        ...payload.map((item) => ({
          ...item,
          gr_school_id: schoolId,
        })),
      ]
      let { data } = await post(apiPath, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:addedGradeScale',
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
export const fetchGradeScale = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    if (isEmpty(id)) {
      return
    }
    const url = `${API.CORE.GRADESCALE}?schoolId=${id}`
    const { data } = await fetch(url)
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

const modifySchoolItem = function (item) {
  if (isEmpty(item)) {
    return
  }
  item.id = item.sch_id
  item.createdTimeLabel = getDateInUserTimezone(item.created_at, 'GMT', DATEFORMATWITHTIME)
  item.updatedTimeLabel = getDateInUserTimezone(item.updated_at, 'GMT', DATEFORMATWITHTIME)
}
