import moment from 'moment'

import { API } from '../api/api'
import { fetch } from '../api/httpClient'
import { DATEFORMATWITHTIME } from '../helpers/constants'
import { get, isEmpty } from '../helpers/utils'
import toggleLoaderAction from './loader.action'

export const fetchAuditLogs =
  (pageDetails, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      pageDetails.f_startdate = pageDetails.f_startdate
        ? pageDetails.f_startdate.getTime()
        : pageDetails.f_startdate
      pageDetails.f_enddate = pageDetails.f_enddate
        ? pageDetails.f_enddate.getTime()
        : pageDetails.f_enddate
      const filterQuery = `f_urn=${pageDetails.f_urn}&f_principal=${pageDetails.f_principal}&f_startdate=${pageDetails.f_startdate}&f_enddate=${pageDetails.f_enddate}&f_action=${pageDetails.f_action}&f_service=${pageDetails.f_service}&f_eventcode=${pageDetails.f_eventcode}&districtId=${pageDetails.districtId}`
      const pageQuery = `page=${pageDetails.current_page || ''}&perPage=${
        pageDetails.per_page || ''
      }&sortBy=${pageDetails.sort_by || ''}&sortOrder=${pageDetails.sort_order || ''}&q=${
        pageDetails.q || ''
      }`
      const url = `${API.AUDIT}events?${pageQuery}&${filterQuery}`
      const { data } = await fetch(url)
      get(data, 'content', []).forEach((audit) => modifyAuditDeatils(audit))
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

export const fetchAuditDetail = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const url = `${API.AUDIT}events/${id}`
    const { data } = await fetch(url)
    modifyAuditDeatils(data)
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
const modifyAuditDeatils = function (audit) {
  if (isEmpty(audit)) {
    return
  }
  audit.update_time = moment(audit.update_time).format(DATEFORMATWITHTIME)
}
