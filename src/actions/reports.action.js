import moment from 'moment'

import { API } from '../api/api'
import { fetch } from '../api/httpClient'
import { DATEFORMAT, DATEFORMATWITHTIME } from '../helpers/constants'
import { get, isEmpty, isNullOrEmpty } from '../helpers/utils'
import toggleLoaderAction from './loader.action'

export const fetchAllStudentReportsCall =
  (pageDetails, successCallback, failureCallback) => async (dispatch) => {
    try {
      dispatch(toggleLoaderAction(true))
      let url = `${API.CORE.REPORTS}/all-students?page=${pageDetails.current_page || ''}&perPage=${
        pageDetails.per_page || ''
      }&sortOrder=${pageDetails.sort_order || ''}&sortBy=${pageDetails.sort_by || ''}&search=${
        pageDetails.student || ''
      }&schoolId=${pageDetails.schoolId}&gender=${pageDetails.gender}&status=${
        pageDetails.status || ''
      }`
      if (pageDetails.registeredDateFrom) {
        url += `&registeredDateFrom=${moment(pageDetails.registeredDateFrom).format(
          'YYYY-MM-DD'
        )}T00:00:00`
      }
      if (pageDetails.registeredDateTo) {
        url += `&registeredDateTo=${moment(pageDetails.registeredDateTo).format(
          'YYYY-MM-DD'
        )}T00:00:00`
      }
      if (pageDetails.enrollmentDateFrom) {
        url += `&enrollmentDateFrom=${moment(pageDetails.enrollmentDateFrom).format(
          'YYYY-MM-DD'
        )}T00:00:00`
      }
      if (pageDetails.enrollmentDateTo) {
        url += `&enrollmentDateTo=${moment(pageDetails.enrollmentDateTo).format(
          'YYYY-MM-DD'
        )}T23:59:59`
      }
      if (pageDetails.ageFrom) {
        url += `&ageFrom=${moment(pageDetails.ageFrom).format('YYYY-MM-DD')}T00:00:00`
      }
      if (pageDetails.ageTo) {
        url += `&ageTo=${moment(pageDetails.ageTo).format('YYYY-MM-DD')}T23:59:59`
      }
      if (!pageDetails.schoolId) {
        return
      }
      const { data } = await fetch(url)
      get(data, 'content', []).forEach((item) => modifyStudentsReports(item))
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

export const fetchDailyReportsCall =
  (pageDetails, successCallback, failureCallback) => async (dispatch) => {
    try {
      dispatch(toggleLoaderAction(true))
      let url = `${API.CORE.REPORTS}/all-students?page=${pageDetails.current_page || ''}&perPage=${
        pageDetails.per_page || ''
      }&sortBy=${pageDetails.sort_by || ''}&sortOrder=${pageDetails.sort_order || ''}&search=${
        pageDetails.student || ''
      }&approvalStatus=${pageDetails.registrationStatus || ''}&enrStatus=${
        pageDetails.enrollmentStatus || ''
      }&schoolId=${pageDetails.schoolId}&gender=${pageDetails.gender}`
      if (pageDetails.registeredDateFrom) {
        url += `&registeredDateFrom=${moment(pageDetails.registeredDateFrom).format(
          'YYYY-MM-DD'
        )}T00:00:00`
      }
      if (pageDetails.registeredDateTo) {
        url += `&registeredDateTo=${moment(pageDetails.registeredDateTo).format(
          'YYYY-MM-DD'
        )}T00:00:00`
      }
      if (pageDetails.enrollmentDateFrom) {
        url += `&enrollmentDateFrom=${moment(pageDetails.enrollmentDateFrom).format(
          'YYYY-MM-DD'
        )}T00:00:00`
      }
      if (pageDetails.enrollmentDateTo) {
        url += `&enrollmentDateTo=${moment(pageDetails.enrollmentDateTo).format(
          'YYYY-MM-DD'
        )}T23:59:59`
      }
      if (pageDetails.ageFrom) {
        url += `&ageFrom=${moment(pageDetails.ageFrom).format('YYYY-MM-DD')}T00:00:00`
      }
      if (pageDetails.ageTo) {
        url += `&ageTo=${moment(pageDetails.ageTo).format('YYYY-MM-DD')}T23:59:59`
      }
      if (!pageDetails.schoolId) {
        return
      }
      const { data } = await fetch(url)
      get(data, 'content', []).forEach((item) => modifyStudentsReports(item))
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
export const fetchInactivityReportsCall =
  (pageDetails, successCallback, failureCallback) => async (dispatch) => {
    try {
      dispatch(toggleLoaderAction(true))
      let url = `${API.CORE.REPORTS}/all-students?page=${pageDetails.current_page || ''}&perPage=${
        pageDetails.per_page || ''
      }&sortBy=${pageDetails.sort_by || ''}&sortOrder=${pageDetails.sort_order || ''}&search=${
        pageDetails.student || ''
      }&approvalStatus=${pageDetails.registrationStatus || ''}&enrStatus=${
        pageDetails.enrollmentStatus || ''
      }&schoolId=${pageDetails.schoolId}&gender=${pageDetails.gender}&inactivityDuration=${
        pageDetails.inactivityDuration || ''
      }`
      if (pageDetails.registeredDateFrom) {
        url += `&registeredDateFrom=${moment(pageDetails.registeredDateFrom).format(
          'YYYY-MM-DD'
        )}T00:00:00`
      }
      if (pageDetails.registeredDateTo) {
        url += `&registeredDateTo=${moment(pageDetails.registeredDateTo).format(
          'YYYY-MM-DD'
        )}T00:00:00`
      }
      if (pageDetails.enrollmentDateFrom) {
        url += `&enrollmentDateFrom=${moment(pageDetails.enrollmentDateFrom).format(
          'YYYY-MM-DD'
        )}T00:00:00`
      }
      if (pageDetails.enrollmentDateTo) {
        url += `&enrollmentDateTo=${moment(pageDetails.enrollmentDateTo).format(
          'YYYY-MM-DD'
        )}T23:59:59`
      }
      if (pageDetails.ageFrom) {
        url += `&ageFrom=${moment(pageDetails.ageFrom).format('YYYY-MM-DD')}T00:00:00`
      }
      if (pageDetails.ageTo) {
        url += `&ageTo=${moment(pageDetails.ageTo).format('YYYY-MM-DD')}T23:59:59`
      }
      if (!pageDetails.schoolId) {
        return
      }
      const { data } = await fetch(url)
      get(data, 'content', []).forEach((item) => modifyStudentsReports(item))
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

export const fetchGraduateReportsCall =
  (pageDetails, successCallback, failureCallback) => async (dispatch) => {
    try {
      dispatch(toggleLoaderAction(true))
      let url = `${API.CORE.REPORTS}/all-students?page=${pageDetails.current_page || ''}&perPage=${
        pageDetails.per_page || ''
      }&sortBy=${pageDetails.sort_by || ''}&sortOrder=${pageDetails.sort_order || ''}&search=${
        pageDetails.student || ''
      }&approvalStatus=${pageDetails.registrationStatus || ''}&enrStatus=${
        pageDetails.enrollmentStatus || ''
      }&schoolId=${pageDetails.schoolId}&gender=${pageDetails.gender}`
      if (pageDetails.registeredDateFrom) {
        url += `&registeredDateFrom=${moment(pageDetails.registeredDateFrom).format(
          'YYYY-MM-DD'
        )}T00:00:00`
      }
      if (pageDetails.registeredDateTo) {
        url += `&registeredDateTo=${moment(pageDetails.registeredDateTo).format(
          'YYYY-MM-DD'
        )}T00:00:00`
      }
      if (pageDetails.enrollmentDateFrom) {
        url += `&enrollmentDateFrom=${moment(pageDetails.enrollmentDateFrom).format(
          'YYYY-MM-DD'
        )}T00:00:00`
      }
      if (pageDetails.enrollmentDateTo) {
        url += `&enrollmentDateTo=${moment(pageDetails.enrollmentDateTo).format(
          'YYYY-MM-DD'
        )}T23:59:59`
      }
      if (pageDetails.graduationDateFrom) {
        url += `&graduationDateFrom=${moment(pageDetails.graduationDateFrom).format(
          'YYYY-MM-DD'
        )}T00:00:00`
      }
      if (pageDetails.graduationDateTo) {
        url += `&graduationDateTo=${moment(pageDetails.graduationDateTo).format(
          'YYYY-MM-DD'
        )}T23:59:59`
      }
      if (pageDetails.ageFrom) {
        url += `&ageFrom=${moment(pageDetails.ageFrom).format('YYYY-MM-DD')}T00:00:00`
      }
      if (pageDetails.ageTo) {
        url += `&ageTo=${moment(pageDetails.ageTo).format('YYYY-MM-DD')}T23:59:59`
      }
      if (!pageDetails.schoolId) {
        return
      }
      const { data } = await fetch(url)
      get(data, 'content', []).forEach((item) => modifyStudentsReports(item))
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

export const fetchStudentGenericReportsCall =
  (pageDetails, successCallback, failureCallback) => async (dispatch) => {
    try {
      dispatch(toggleLoaderAction(true))
      let url = `${API.CORE.REPORTS}?page=${pageDetails.current_page || ''}&perPage=${
        pageDetails.per_page || ''
      }&sortBy=${pageDetails.sort_by || ''}&sortOrder=${pageDetails.sort_order || ''}&search=${
        pageDetails.student || ''
      }&status=${pageDetails.status || ''}&schoolId=${pageDetails.schoolId}&successCoachStatus=${
        pageDetails.successCoach || ''
      }&gender=${pageDetails.gender || ''}&inactivityDuration=${
        pageDetails.inactivityDuration || ''
      }&balanceDue=${pageDetails.balanceDue}&enrIsIep=${pageDetails.enrIsIep}`
      if (pageDetails.programId) {
        url += `&programId=${pageDetails.programId}`
      }
      if (pageDetails.registeredDateFrom) {
        url += `&registeredDateFrom=${moment(pageDetails.registeredDateFrom).format(
          'YYYY-MM-DD'
        )}T00:00:00`
      }
      if (pageDetails.registeredDateTo) {
        url += `&registeredDateTo=${moment(pageDetails.registeredDateTo).format(
          'YYYY-MM-DD'
        )}T00:00:00`
      }
      if (pageDetails.enrollmentDateFrom) {
        url += `&enrollmentDateFrom=${moment(pageDetails.enrollmentDateFrom).format(
          'YYYY-MM-DD'
        )}T00:00:00`
      }
      if (pageDetails.enrollmentDateTo) {
        url += `&enrollmentDateTo=${moment(pageDetails.enrollmentDateTo).format(
          'YYYY-MM-DD'
        )}T00:00:00`
      }
      if (pageDetails.graduationDateFrom) {
        url += `&graduationDateFrom=${moment(pageDetails.graduationDateFrom).format(
          'YYYY-MM-DD'
        )}T00:00:00`
      }
      if (pageDetails.graduationDateTo) {
        url += `&graduationDateTo=${moment(pageDetails.graduationDateTo).format(
          'YYYY-MM-DD'
        )}T23:59:59`
      }
      if (pageDetails.ageFromDate) {
        url += `&ageFromDate=${moment(pageDetails.ageFromDate).format('YYYY-MM-DD')}T00:00:00`
      }
      if (pageDetails.ageToDate) {
        url += `&ageToDate=${moment(pageDetails.ageToDate).format('YYYY-MM-DD')}T23:59:59`
      }
      if (!pageDetails.schoolId) {
        return
      }
      const { data } = await fetch(url)
      get(data, 'content', []).forEach((item) => modifyStudentsReports(item))
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

export const fetchSuccessCoachReportsCall =
  (pageDetails, successCallback, failureCallback) => async (dispatch) => {
    try {
      dispatch(toggleLoaderAction(true))
      let url = `${API.CORE.REPORTS}?page=${pageDetails.current_page || ''}&perPage=${
        pageDetails.per_page || ''
      }&sortBy=${pageDetails.sort_by || ''}&sortOrder=${pageDetails.sort_order || ''}&search=${
        pageDetails.successCoach || ''
      }&schoolId=${pageDetails.schoolId}&status=${pageDetails.status || ''}&availability=${
        pageDetails.availability || ''
      }&gender=${pageDetails.gender || ''}`
      if (pageDetails.joinedFromDate) {
        url += `&joinedFromDate=${moment(pageDetails.joinedFromDate).format('YYYY-MM-DD')}T00:00:00`
      }
      if (pageDetails.joinedToDate) {
        url += `&joinedToDate=${moment(pageDetails.joinedToDate).format('YYYY-MM-DD')}T00:00:00`
      }
      if (!pageDetails.schoolId) {
        return
      }
      const { data } = await fetch(url)
      get(data, 'content', []).forEach((item) => modifyStudentsReports(item))
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

export const fetchInstructerReportsCall =
  (pageDetails, successCallback, failureCallback) => async (dispatch) => {
    try {
      dispatch(toggleLoaderAction(true))
      let url = `${API.CORE.REPORTS}?page=${pageDetails.current_page || ''}&perPage=${
        pageDetails.per_page || ''
      }&sortBy=${pageDetails.sort_by || ''}&sortOrder=${pageDetails.sort_order || ''}&search=${
        pageDetails.instructer || ''
      }&status=${pageDetails.status || ''}&schoolId=${pageDetails.schoolId}&programId=${
        pageDetails.programId || ''
      }&gender=${pageDetails.gender || ''}&availability=${pageDetails.availability}`
      if (pageDetails.joinedFromDate) {
        url += `&joinedFromDate=${moment(pageDetails.joinedFromDate).format('YYYY-MM-DD')}T00:00:00`
      }
      if (pageDetails.joinedToDate) {
        url += `&joinedToDate=${moment(pageDetails.joinedToDate).format('YYYY-MM-DD')}T00:00:00`
      }
      if (!pageDetails.schoolId) {
        return
      }
      const { data } = await fetch(url)
      get(data, 'content', []).forEach((item) => modifyStudentsReports(item))
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

const modifyStudentsReports = function (item) {
  if (isEmpty(item)) {
    return
  }
  item.id = item.enrId.toString()
  item.birth_date = moment(item.birth_date).format(DATEFORMAT)
  item.enrEnrolledOn = moment(item.enrEnrolledOn).format(DATEFORMATWITHTIME)
  item.registeredDate = moment(item.registeredDate).format(DATEFORMATWITHTIME)
  item.createdTimeLabel = moment(item.created_at).format(DATEFORMATWITHTIME)
  item.updatedTimeLabel = moment(item.updated_at).format(DATEFORMATWITHTIME)
  item.lastLoginTime =
    !isNullOrEmpty(item.lastLoginTime) && moment(item.lastLoginTime).format(DATEFORMATWITHTIME)
}
