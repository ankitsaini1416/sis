import moment from 'moment'

import { API } from '../api/api'
import { fetch, post, put, remove } from '../api/httpClient'
import { DATEFORMATWITHTIME, MESSAGE_SEVERITIES } from '../helpers/constants'
import { get, getDateInUserTimezone, isEmpty, isNullOrEmpty } from './../helpers/utils'
import { messageAction } from './app.action'
import toggleLoaderAction from './loader.action'

export const fetchProgramCategory =
  (schoolId, pageDetails, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const apiPath = `${API.CORE.PROGRAM}?schoolId=${schoolId}&q=${pageDetails.q || ''}&per_page=${
        pageDetails.per_page || ''
      }&page=${pageDetails.page || ''}`
      const { data } = await fetch(apiPath)
      get(data, 'content', []).forEach((item) => modifyProgramCategory(item))
      if (typeof successCallback === 'function') {
        successCallback(data.content)
      }
    } catch (error) {
      if (typeof failureCallback === 'function') {
        failureCallback(error)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }

export const createProgramCategory =
  (schoolId, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    const apiPath = API.CORE.PROGRAM
    try {
      const updatedPayload = {
        ...payload,
        pct_school_id: schoolId,
      }
      let { data } = await post(apiPath, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:programCategoryAdded',
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

export const updateProgramCategory =
  (progId, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const apiPath = `${API.CORE.PROGRAM}/${progId}`
      const response = await put(apiPath, payload)
      dispatch(
        messageAction({
          subTitle: 'message:programCategoryUpdated',
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

export const deleteProgramCategory = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const apiPath = `${API.CORE.PROGRAM}/${id}`
    const response = await remove(apiPath, {})
    dispatch(
      messageAction({
        subTitle: 'message:programCategoryDeleted',
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

export const fetchProgramsCall = (pageDetails, successCallback, failureCallback) => async () => {
  try {
    if (!pageDetails.schoolId) {
      return
    }
    let url = `${API.PROGRAMS}program?page=${pageDetails.current_page || ''}&perPage=${
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
    if (pageDetails.requireTranscript) {
      url += `&requireTranscript=${pageDetails.requireTranscript === 'yes' ? 'true' : 'false'}`
    }
    if (pageDetails.isActive) {
      url += `&isActive=${pageDetails.isActive === 'Active' ? 'true' : 'false'}`
    }
    const { data } = await fetch(url)
    get(data, 'content', []).forEach((item) => modifyProgramItem(item))
    if (typeof successCallback === 'function') {
      successCallback(data)
    }
  } catch (error) {
    if (typeof failureCallback === 'function') {
      failureCallback(error)
    }
  }
}

export const fetchProgramsDetail = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const url = `${API.PROGRAMS}program/${id}`
    let { data } = await fetch(url)
    modifyProgramItem(data)
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

export const archiveProgramCall = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  if (isEmpty(id)) {
    return
  }
  try {
    const apiPath = `${API.PROGRAMS}program/${id}`
    const response = await remove(apiPath, {})
    dispatch(
      messageAction({
        subTitle: 'message:programDeleted',
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

export const editProgramCall =
  (id, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const updatedPayload = new FormData()
      Object.keys(payload).forEach((key) => {
        updatedPayload.append(key, payload[key])
      })
      await put(`${API.PROGRAMS}program/${id}`, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:programUpdated',
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

export const createProgram = (payload, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  const apiPath = `${API.PROGRAM}program`
  try {
    const {
      pgm_logo,
      pgm_canvas_access,
      pgm_ttb_access,
      pgm_require_transcript,
      pgm_show_results,
      pgm_file_access,
      pgm_is_template_program,
      pgm_is_active,
      pgm_school_id,
      pgm_name,
      pgm_program_category_id,
      pgm_transcript_grade,
      pgm_minimum_age,
      pgm_start_date,
      pgm_end_date,
      pgm_expiration,
      pgm_description,
      pgm_prerequisites,
    } = payload

    const updatedPayload = new FormData()
    updatedPayload.append('pgm_logo', pgm_logo)
    updatedPayload.append('pgm_canvas_access', pgm_canvas_access)
    updatedPayload.append('pgm_ttb_access', pgm_ttb_access)
    updatedPayload.append('pgm_require_transcript', pgm_require_transcript)
    updatedPayload.append('pgm_show_results', pgm_show_results)
    updatedPayload.append('pgm_file_access', pgm_file_access)
    updatedPayload.append('pgm_is_template_program', pgm_is_template_program)
    updatedPayload.append('pgm_is_active', pgm_is_active)
    updatedPayload.append('pgm_school_id', pgm_school_id)
    updatedPayload.append('pgm_name', pgm_name)
    updatedPayload.append('pgm_program_category_id', pgm_program_category_id)
    updatedPayload.append('pgm_transcript_grade', pgm_transcript_grade)
    updatedPayload.append('pgm_minimum_age', pgm_minimum_age)
    updatedPayload.append(
      'pgm_start_date',
      (payload.pgm_start_date = `${moment(pgm_start_date).format('YYYY-MM-DD')}T23:59:59`)
    )
    updatedPayload.append(
      'pgm_end_date',
      (payload.pgm_end_date = `${moment(pgm_end_date).format('YYYY-MM-DD')}T23:59:59`)
    )
    updatedPayload.append('pgm_expiration', pgm_expiration)
    updatedPayload.append('pgm_description', pgm_description)
    updatedPayload.append('pgm_prerequisites', pgm_prerequisites)

    let { data } = await post(apiPath, updatedPayload)

    dispatch(
      messageAction({
        subTitle: 'message:programAdded',
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

export const fetchTranscript = (schoolId, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const apiPath = `${API.PROGRAM}transcript?schoolId=${schoolId}`
    const { data } = await fetch(apiPath)
    if (typeof successCallback === 'function') {
      successCallback(data.content)
    }
  } catch (error) {
    if (typeof failureCallback === 'function') {
      failureCallback(error)
    }
  } finally {
    dispatch(toggleLoaderAction(false))
  }
}
export const fetchProgramTemplate =
  (schoolId, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const apiPath = `${API.PROGRAM}program?schoolId=${schoolId}&isTemplateProgram=true`
      const { data } = await fetch(apiPath)
      if (typeof successCallback === 'function') {
        successCallback(data.content)
      }
    } catch (error) {
      if (typeof failureCallback === 'function') {
        failureCallback(error)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }
export const createTranscripts =
  (id, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    const apiPath = `${API.PROGRAM}program-transcript/${id}`
    try {
      let { data } = await post(apiPath, payload)
      dispatch(
        messageAction({
          subTitle: 'message:updatedProgram',
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
export const createLinksLibrary =
  (id, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    const apiPath = `${API.PROGRAM}program-library/${id}`
    try {
      let { data } = await post(apiPath, payload)
      dispatch(
        messageAction({
          subTitle: 'message:updatedProgram',
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
export const addProgramFee =
  (id, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    const apiPath = `${API.PROGRAM}fee`
    try {
      const {
        fee_payable_entity = 'program',
        fee_payable_id = id,
        fee_name,
        fee_payment_full,
        fee_installment_count,
        fee_installment_duration,
        fee_line_items,
        fee_shipping_fee,
        fee_hide_fee,
        fee_discount_note,
      } = payload
      const updatedPayload = {
        fee_payable_entity,
        fee_payable_id,
        fee_name,
        fee_payment_full,
        fee_installment_count,
        fee_installment_duration,
        fee_line_items,
        fee_shipping_fee,
        fee_hide_fee,
        fee_discount_note,
      }
      let { data } = await post(apiPath, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:feeAdded',
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

export const fetchProgramFeeById =
  (feeId, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const apiPath = `${API.PROGRAM}fee/${feeId}`
      const { data } = await fetch(apiPath)
      data.fee_payment_full =
        data.fee_installment_count === 1 && data.fee_installment_duration === 0
      data.fee_line_items = data.fee_line_items.filter((item) => !item.fli_is_shipping)
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

export const deleteProgramFee = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    const apiPath = `${API.PROGRAM}fee/${id}`
    const response = await remove(apiPath, {})
    dispatch(
      messageAction({
        subTitle: 'message:feeDeleted',
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
export const uploadProgramLogoCall =
  (id, file, successCallback, failureCallback) => async (dispatch) => {
    // dispatch(toggleLoaderAction(true))
    try {
      const payload = new FormData()
      payload.append('pgm_logo', file)
      await put(`${API.PROGRAM}program/update-file/${id}`, payload)

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

export const editProgramFee =
  (programId, id, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      const {
        fee_payable_entity = 'program',
        fee_payable_id = programId,
        fee_name,
        // fee_payment_full,
        fee_installment_count,
        fee_installment_duration,
        fee_line_items,
        fee_shipping_fee,
        fee_hide_fee,
        fee_discount_note,
      } = payload
      const updatedPayload = {
        fee_payable_entity,
        fee_payable_id,
        fee_name,
        // fee_payment_full,
        fee_installment_count,
        fee_installment_duration,
        fee_line_items,
        fee_shipping_fee,
        fee_hide_fee,
        fee_discount_note,
      }
      await put(`${API.PROGRAMS}fee/${id}`, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:feeUpdated',
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

const modifyProgramItem = function (item) {
  if (isEmpty(item)) {
    return
  }
  item.pgm_id = item.pgm_id.toString()
  item.id = item.pgm_id.toString()
  item.createdTimeLabel = getDateInUserTimezone(item.created_at, 'GMT', DATEFORMATWITHTIME)
  item.updatedTimeLabel = getDateInUserTimezone(item.updated_at, 'GMT', DATEFORMATWITHTIME)
  item.createdPgmTimeLabel = getDateInUserTimezone(item.pgm_start_date, 'GMT', DATEFORMATWITHTIME)
  item.updatedPgmTimeLabel = getDateInUserTimezone(item.pgm_end_date, 'GMT', DATEFORMATWITHTIME)
}

const modifyProgramCategory = function (item) {
  item.createdTimeLabel = getDateInUserTimezone(item.created_at, 'GMT', DATEFORMATWITHTIME)
}
