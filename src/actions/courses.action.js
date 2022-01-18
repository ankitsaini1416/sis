import moment from 'moment'

import { API } from './../api/api'
import { fetch, post, put, remove } from './../api/httpClient'
import {
  DATEFORMATWITHTIME,
  INSTRUCTOR,
  MESSAGE_SEVERITIES,
  ROLE_KINDS,
} from './../helpers/constants'
import { get, getDateInUserTimezone, isEmpty, isNullOrEmpty } from './../helpers/utils'
import { callRolesApi, fetchUsersCall } from './agm2.action'
import { messageAction } from './app.action'
import toggleLoaderAction from './loader.action'

export const fetchCoursesCall =
  (pageDetails, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      let url = `${API.CORE.COURSES}?page=${pageDetails.current_page || ''}&perPage=${
        pageDetails.per_page || ''
      }&sortBy=${pageDetails.sort_by || ''}&sortOrder=${pageDetails.sort_order || ''}&q=${
        pageDetails.q || ''
      }&schoolId=${pageDetails.schoolId || ''}&subjectId=${pageDetails.subjectId || ''}`
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
      get(data, 'content', []).forEach((item) => modifyCourseItem(item))
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

export const fetchCourseByIdCall = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const url = `${API.CORE.COURSES}/${id}`
    const { data } = await fetch(url)
    modifyCourseItem(data)
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

export const addCourseCall = (payload, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const {
      cr_school_id,
      cr_subject_id,
      cr_number,
      cr_name,
      cr_default_amount,
      cr_default_credits,
      cr_default_passing_grade,
      cr_instructor,
      cr_is_active,
      cr_description,
      cr_logo,
    } = payload
    const updatedPayload = new FormData()
    updatedPayload.append('cr_school_id', cr_school_id)
    updatedPayload.append('cr_subject_id', cr_subject_id)
    updatedPayload.append('cr_number', cr_number)
    updatedPayload.append('cr_name', cr_name)
    updatedPayload.append('cr_default_amount', cr_default_amount)
    updatedPayload.append('cr_default_credits', cr_default_credits)
    updatedPayload.append('cr_default_passing_grade', cr_default_passing_grade)
    updatedPayload.append('cr_instructor', cr_instructor)
    updatedPayload.append('cr_is_active', cr_is_active)
    updatedPayload.append('cr_description', cr_description)
    updatedPayload.append('cr_logo', cr_logo)

    await post(API.CORE.COURSES, updatedPayload)
    dispatch(
      messageAction({
        subTitle: 'message:courseAdded',
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

export const editCourseCall =
  (id, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const {
        cr_school_id,
        cr_subject_id,
        cr_number,
        cr_name,
        cr_default_amount,
        cr_default_credits,
        cr_default_passing_grade,
        cr_instructor,
        cr_is_active,
        cr_description,
      } = payload
      const updatedPayload = new FormData()
      updatedPayload.append('cr_school_id', cr_school_id)
      updatedPayload.append('cr_subject_id', cr_subject_id)
      updatedPayload.append('cr_number', cr_number)
      updatedPayload.append('cr_name', cr_name)
      updatedPayload.append('cr_default_amount', cr_default_amount)
      updatedPayload.append('cr_default_credits', cr_default_credits)
      updatedPayload.append('cr_default_passing_grade', cr_default_passing_grade)
      updatedPayload.append('cr_instructor', cr_instructor)
      updatedPayload.append('cr_is_active', cr_is_active)
      updatedPayload.append('cr_description', cr_description)

      await put(`${API.CORE.COURSES}/${id}`, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:courseUpdated',
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

export const removeCourseCall = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    await remove(`${API.CORE.COURSES}/${id}`)
    dispatch(
      messageAction({
        subTitle: 'message:courseDeleted',
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

export const uploadCourseLogoCall =
  (id, file, successCallback, failureCallback) => async (dispatch) => {
    // dispatch(toggleLoaderAction(true))
    try {
      const payload = new FormData()
      payload.append('cr_logo', file)
      await put(`${API.CORE.COURSES}/update-file/${id}`, payload)
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

export const fetchCourseGroupCall =
  (programId, pageDetails, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      let url = `${API.COURSE}?programId=${programId}&q=${pageDetails.q || ''}`
      const { data } = await fetch(url)
      data.forEach((item) => modifyCourseGroupItem(item))
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

export const fetchCourseGroupById = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const apiPath = `${API.COURSE}/${id}`
    const { data } = await fetch(apiPath)
    modifyCourseGroupItem(data)
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

export const addCourseGroupCall =
  (programId, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const {
        cg_program_id = programId,
        cg_course_group_name,
        cg_rule_type,
        cg_rule_value,
        cg_is_active,
      } = payload
      const updatedPayload = {
        cg_program_id,
        cg_course_group_name,
        cg_rule_type,
        cg_rule_value,
        cg_is_active,
      }
      await post(API.COURSE, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:courseGroupAdded',
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

export const editCourseGroupCall =
  (programId, id, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const {
        cg_program_id = programId,
        cg_course_group_name,
        cg_rule_type,
        cg_rule_value,
        cg_is_active,
      } = payload
      const updatedPayload = {
        cg_program_id,
        cg_course_group_name,
        cg_rule_type,
        cg_rule_value,
        cg_is_active,
      }
      await put(`${API.COURSE}/${id}`, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:courseGroupUpdated',
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

export const removeCourseGroupCall = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    await remove(`${API.COURSE}/${id}`)
    dispatch(
      messageAction({
        subTitle: 'message:courseGroupDeleted',
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

export const fetchCourseGroupItemCall =
  (courseGroupId, successCallback, failureCallback, showLoader = false) =>
  async (dispatch) => {
    showLoader && dispatch(toggleLoaderAction(true))
    try {
      let url = `${API.CORE.COURSEGROUPITEM}?courseGroupId=${courseGroupId}`
      const { data } = await fetch(url)
      data.forEach((item) => modifyCourseGroupItemItem(item))
      if (typeof successCallback === 'function') {
        successCallback(data)
      }
    } catch (error) {
      if (typeof failureCallback === 'function') {
        failureCallback(error)
      }
    } finally {
      showLoader && dispatch(toggleLoaderAction(false))
    }
  }

export const fetchCourseGroupItemById =
  (id, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const apiPath = `${API.CORE.COURSEGROUPITEM}/${id}`
      const { data } = await fetch(apiPath)
      modifyCourseGroupItemItem(data)
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

export const addCourseGroupItemCall =
  (payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const updatedPayload = {
        ...payload,
      }
      await post(API.CORE.COURSEGROUPITEM, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:courseGroupItemAdded',
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

export const editCourseGroupItemCall =
  (id, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const updatedPayload = {
        ...payload,
      }
      await put(`${API.CORE.COURSEGROUPITEM}/${id}`, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:courseGroupItemUpdated',
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

export const removeCourseGroupItemCall =
  (id, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      await remove(`${API.CORE.COURSEGROUPITEM}/${id}`)
      dispatch(
        messageAction({
          subTitle: 'message:courseGroupItemDeleted',
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

export const fetchCourseProgramsCall =
  (id, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const url = `${API.CORE.COURSE_PROGRAM}/${id}`
      const { data } = await fetch(url)
      data.forEach((item) => modifyProgramItem(item))
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

export const fetchInstructors =
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
          const coach = content.find((role) => role.name.toLowerCase().includes(INSTRUCTOR))
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

const modifyProgramItem = function (item) {
  if (isEmpty(item)) {
    return
  }
  item.id = item.pgm_id
  item.createdTimeLabel = getDateInUserTimezone(item.created_at, 'GMT', DATEFORMATWITHTIME)
  item.updatedTimeLabel = getDateInUserTimezone(item.updated_at, 'GMT', DATEFORMATWITHTIME)
  item.createdPgmTimeLabel = getDateInUserTimezone(item.pgm_start_date, 'GMT', DATEFORMATWITHTIME)
  item.updatedPgmTimeLabel = getDateInUserTimezone(item.pgm_end_date, 'GMT', DATEFORMATWITHTIME)
  item.pgm_course_group_item.assignedDate = getDateInUserTimezone(
    item.pgm_course_group_item.created_at,
    'GMT',
    DATEFORMATWITHTIME
  )
}

const modifyCourseItem = function (item) {
  if (isEmpty(item)) {
    return
  }
  item.id = item.cr_id.toString()
  item.createdTimeLabel = getDateInUserTimezone(item.created_at, 'GMT', DATEFORMATWITHTIME)
  item.updatedTimeLabel = getDateInUserTimezone(item.updated_at, 'GMT', DATEFORMATWITHTIME)
}

const modifyCourseGroupItem = function (item) {
  if (isEmpty(item)) {
    return
  }
  item.id = item.cg_id.toString()
  item.createdTimeLabel = getDateInUserTimezone(item.created_at, 'GMT', DATEFORMATWITHTIME)
  item.updatedTimeLabel = getDateInUserTimezone(item.updated_at, 'GMT', DATEFORMATWITHTIME)
}

const modifyCourseGroupItemItem = function (item) {
  if (isEmpty(item)) {
    return
  }
  item.id = item.cgi_id.toString()
  item.createdTimeLabel = getDateInUserTimezone(item.created_at, 'GMT', DATEFORMATWITHTIME)
  item.updatedTimeLabel = getDateInUserTimezone(item.updated_at, 'GMT', DATEFORMATWITHTIME)
}
