import moment from 'moment'

import { API } from '../api/api'
import { fetch, post, put } from '../api/httpClient'
import {
  DATEFORMATWITHTIME,
  MESSAGE_SEVERITIES,
  ROLE_KINDS,
  SUCCESSCOACH,
  WALLETTRANSACTIONACTION,
} from '../helpers/constants'
import { get, isEmpty } from './../helpers/utils'
import { callRolesApi, fetchUsersCall } from './agm2.action'
import { messageAction } from './app.action'
import toggleLoaderAction from './loader.action'

export const fetchEnrollmentCall =
  (pageDetails, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    let apiPath = `${API.CORE.ENROLLMENT}?page=${pageDetails.current_page}&perPage=${
      pageDetails.per_page
    }&sortOrder=${pageDetails.sort_order || ''}&sortBy=${pageDetails.sort_by || ''}&search=${
      pageDetails.q || ''
    }&schoolId=${pageDetails.schoolId}&enrStatus=${pageDetails.status}&gender=${
      pageDetails.gender || ''
    }&successCoachStatus=${pageDetails.successCoach || ''}`
    if (pageDetails.ageFrom) {
      apiPath += `&ageFrom=${moment(pageDetails.ageFrom).format('YYYY-MM-DD')}T00:00:00`
    }
    if (pageDetails.ageTo) {
      apiPath += `&ageTo=${moment(pageDetails.ageTo).format('YYYY-MM-DD')}T23:59:59`
    }
    if (pageDetails.fromDate) {
      apiPath += `&enrollmentDateFrom=${moment(pageDetails.fromDate).format('YYYY-MM-DD')}T00:00:00`
    }
    if (pageDetails.toDate) {
      apiPath += `&enrollmentDateTo=${moment(pageDetails.toDate).format('YYYY-MM-DD')}T23:59:59`
    }
    try {
      if (!pageDetails.schoolId) {
        return
      }
      const { data } = await fetch(apiPath, {})
      get(data, 'content', []).forEach((item) => modifyEnrollment(item))
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

export const fetchEnrollmentDetailById =
  (id, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const url = `${API.CORE.ENROLLMENT}/${id}`
      const { data } = await fetch(url)
      modifyEnrollmentDetails(data)
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

export const fetchTransactionCall =
  (enrollmentId, pageDetails, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      let apiPath = `${API.CORE.ENROLLMENTPAYMENT}?page=${pageDetails.current_page}&perPage=${
        pageDetails.per_page
      }&sortBy=${pageDetails.sort_by || ''}&sortOrder=${pageDetails.sort_order || ''}&q=${
        pageDetails.q || ''
      }&enrollmentId=${enrollmentId}`
      if (pageDetails.fromDate) {
        apiPath += `&fromDate=${moment(pageDetails.fromDate).format('YYYY-MM-DD')}T00:00:00`
      }
      if (pageDetails.toDate) {
        apiPath += `&toDate=${moment(pageDetails.toDate).format('YYYY-MM-DD')}T23:59:59`
      }
      if (pageDetails.status) {
        apiPath += `&status=${pageDetails.status || ''}`
      }
      const { data } = await fetch(apiPath, {})
      get(data, 'content', []).forEach((item) => modifyTransaction(item))
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

export const fetchTransactionDetailById =
  (id, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const url = `${API.CORE.ENROLLMENTPAYMENT}/${id}`
      const { data } = await fetch(url)
      modifyTransaction(data)
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

export const fetchStudentNotesList =
  (enrollmentId, pageDetails, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      let apiPath = `${API.CORE.ENROLLMENTNOTE}?enrollmentId=${enrollmentId}&page=${
        pageDetails.current_page
      }&perPage=${pageDetails.per_page}&sortBy=${pageDetails.sort_by || ''}&sortOrder=${
        pageDetails.sort_order || ''
      }&q=${pageDetails.q || ''}&type=${pageDetails.type || ''}`
      if (pageDetails.fromDate) {
        apiPath += `&fromDate=${moment(pageDetails.fromDate).format('YYYY-MM-DD')}T00:00:00`
      }
      if (pageDetails.toDate) {
        apiPath += `&toDate=${moment(pageDetails.toDate).format('YYYY-MM-DD')}T23:59:59`
      }
      const { data } = await fetch(apiPath, {})
      get(data, 'content', []).forEach((item) => modifyStudentNote(item))
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

export const fetchStudentNoteDetailById =
  (id, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const url = `${API.CORE.ENROLLMENTNOTE}/${id}`
      const { data } = await fetch(url)
      modifyStudentNote(data)
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

export const editStudentNote =
  (enrId, id, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const {
        sn_enrollment_id = enrId,
        sn_note,
        sn_note_type,
        sn_description,
        snf_file,
        removedItems,
      } = payload

      const updatedPayload = new FormData()
      updatedPayload.append('sn_enrollment_id', sn_enrollment_id)
      updatedPayload.append('sn_note', sn_note)
      updatedPayload.append('sn_note_type', sn_note_type)
      updatedPayload.append('sn_description', sn_description)
      const file = [...snf_file.filter((item) => !item.snf_id), ...removedItems]
      file.forEach((item) => {
        updatedPayload.append('snf_file', item)
      })

      await put(`${API.CORE.ENROLLMENTNOTE}/${id}`, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:studentNoteUpdated',
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

export const addStudentNote =
  (enrId, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    const apiPath = API.CORE.ENROLLMENTNOTE
    try {
      const {
        sn_enrollment_id = enrId,
        sn_note,
        sn_note_type,
        sn_description,
        snf_file,
        removedItems,
      } = payload

      const updatedPayload = new FormData()
      updatedPayload.append('sn_enrollment_id', sn_enrollment_id)
      updatedPayload.append('sn_note', sn_note)
      updatedPayload.append('sn_note_type', sn_note_type)
      updatedPayload.append('sn_description', sn_description)
      const file = [...snf_file.filter((item) => !item.snf_id), ...removedItems]
      file.forEach((item) => {
        updatedPayload.append('snf_file', item)
      })

      let { data } = await post(apiPath, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:studentNoteAdded',
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

export const fetchSuccessCoachUsers =
  ({ districtId, schoolId }, successCallback, failureCallback) =>
  async (dispatch) => {
    if (!districtId || !schoolId) {
      return
    }
    dispatch(toggleLoaderAction(true))
    try {
      const rolesPayload = {
        kind: ROLE_KINDS.CUSTOM,
        current_page: 1,
        per_page: 1000,
        districtId,
        schoolId,
      }
      dispatch(
        callRolesApi(rolesPayload, ({ content = [] }) => {
          const coach = content.find((role) => role.name.toLowerCase().includes(SUCCESSCOACH))
          if (!coach) {
            return successCallback([])
          }
          const userPayload = {
            current_page: 1,
            per_page: 1000,
            districtId,
            schoolId,
            sort_by: 'first_name',
            sort_order: 'desc',
            roleId: coach.id,
          }
          dispatch(
            fetchUsersCall(userPayload, ({ content = [] }) => {
              successCallback(content)
            })
          )
        })
      )
    } catch (error) {
      if (typeof failureCallback === 'function') {
        failureCallback(error)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }

export const fetchSuccessCoachCall =
  (enrId, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const url = `${API.CORE.SUCCESSCOACH}?enrollmentId=${enrId}`
      const { data } = await fetch(url)
      modifySuccessCoach(data)
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

export const assignSuccessCoachCall =
  (enrId, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const updatedPayload = {
        ...payload,
        sc_enrollment_id: parseInt(enrId),
        sc_status: true,
      }
      const apiPath = API.CORE.ENROLLMENTSUCCESSCOACH
      let { data } = await post(apiPath, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:successCoachAssigned',
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

export const removeSuccessCoachCall =
  (payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      await put(`${API.CORE.ENROLLMENTSUCCESSCOACH}`, payload)
      dispatch(
        messageAction({
          subTitle: 'message:successCoachRemoved',
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

export const fetchEnrollmentCourse =
  (enrollmentId, pageDetails, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      let apiPath = `${API.CORE.ENROLLMENTCOURSE}?page=${pageDetails.page || ''}&perPage=${
        pageDetails.perPage || ''
      }&sortBy=${pageDetails.sort_by || ''}&sortOrder=${pageDetails.sort_order || ''}&q=${
        pageDetails.q || ''
      }&enrollmentId=${enrollmentId}`
      if (pageDetails.status) {
        apiPath += `&status=${pageDetails.status || ''}`
      }
      const { data } = await fetch(apiPath)
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
export const addhWalletPointsCall =
  (userId, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const updatedPayload = {
        ...payload,
        user_id: userId,
        action: WALLETTRANSACTIONACTION,
      }
      const { data } = await post(API.PAYMENT.WALLET, updatedPayload)
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
export const fetchEnrollmentCourseById =
  (encId, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const apiPath = `${API.CORE.ENROLLMENTCOURSE}/${encId}`
      const { data } = await fetch(apiPath)
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
export const editAssignCourseCall =
  (payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    const url = `${API.CORE.ASSIGNCOURSE}`
    try {
      await post(url, payload)
      dispatch(
        messageAction({
          subTitle: 'message:assignCourseUpdated',
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
export const fetchWalletPoints = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const { data } = await fetch(`${API.PAYMENT.WALLET}/${id}`)
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

export const fetchWalletTransaction =
  (pageDetails, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const { data } = await fetch(
        `${API.PAYMENT.WALLETTRANSACTION}/${pageDetails.id}?per_page=${pageDetails.per_page}&page=${pageDetails.current_page}&sort_by=created_at&sort_order=desc`
      )
      if (isEmpty(data)) {
        return
      }
      get(data, 'records.data', []).forEach((data) => modifyTransactionDetail(data))
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
export const editEnrollmentStatusCall =
  (id, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const updatedPayload = {
        enr_status: payload,
      }
      await put(`${API.CORE.ENROLLMENTSTATUS}/${id}`, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:enrollmentStatusUpdated',
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
export const editCourseDetailsCall =
  (id, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      await put(`${API.CORE.ENROLLMENTCOURSE}/${id}`, payload)
      dispatch(
        messageAction({
          subTitle: 'message:enrollmentCourseUpdated',
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

export const fetchDownloadTranscript =
  (enrollmentId, transcriptId, successCallback, failureCallback) => async (dispatch, getState) => {
    dispatch(toggleLoaderAction(true))
    try {
      const { app, auth } = getState()
      const url = `${app.baseURL}${API.CORE.DOWNLOADTRANSCRIPT}?enrollmentId=${enrollmentId}&transcriptId=${transcriptId}&token=${auth.accessToken}`
      window.open(url)
    } catch (error) {
      if (typeof failureCallback === 'function') {
        failureCallback(error)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }

const modifyEnrollment = function (item) {
  if (isEmpty(item)) {
    return
  }
  item.id = item.enrId
  item.enrEnrolledOn = moment(item.enrEnrolledOn).format(DATEFORMATWITHTIME)
}
const modifyEnrollmentDetails = function (item) {
  if (isEmpty(item)) {
    return
  }
  item.id = item.enr_id.toString()
  item.enr_enrolled_on = moment(item.enr_enrolled_on).format(DATEFORMATWITHTIME)
  item.pgm_end_date = moment(item.pgm_end_date).format(DATEFORMATWITHTIME)
  item.expiry_date = moment(item.expiry_date).format(DATEFORMATWITHTIME)
  item.enr_program.pgm_end_date = moment(item.enr_program?.pgm_end_date).format(DATEFORMATWITHTIME)
  item.updated_at = moment(item.updated_at).format(DATEFORMATWITHTIME)
  item.created_at = moment(item.created_at).format(DATEFORMATWITHTIME)
  item.updated_at = moment(item.updated_at).format(DATEFORMATWITHTIME)
}
const modifyTransactionDetail = function (item) {
  if (isEmpty(item)) {
    return
  }
  item.created_at = moment(item.created_at).format(DATEFORMATWITHTIME)
  item.updated_at = moment(item.updated_at).format(DATEFORMATWITHTIME)
}

const modifySuccessCoach = function (item) {
  if (isEmpty(item)) {
    return
  }
  item.sc_assigned_date = moment(item.sc_assigned_date).format(DATEFORMATWITHTIME)
}
const modifyTransaction = function (item) {
  if (isEmpty(item)) {
    return
  }
  item.created_at = moment(item.created_at).format(DATEFORMATWITHTIME)
  item.updated_at = moment(item.updated_at).format(DATEFORMATWITHTIME)
}
const modifyStudentNote = function (item) {
  if (isEmpty(item)) {
    return
  }
  item.id = item.sn_id
  item.created_at = moment(item.created_at).format(DATEFORMATWITHTIME)
  item.updated_at = moment(item.updated_at).format(DATEFORMATWITHTIME)
}
