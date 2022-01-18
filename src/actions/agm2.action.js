import moment from 'moment'

import { API } from '../api/api'
import { fetch, post, put, remove } from '../api/httpClient'
import { convertTimestampToDate, get, isEmpty } from '../helpers/utils'
import { DATEFORMAT, DEFAULTURL, MESSAGE_SEVERITIES, ROLE_KINDS } from './../helpers/constants'
import { messageAction } from './app.action'
import toggleLoaderAction from './loader.action'

//---------------------------------------------ROLES--------------------------------------------//

export const callRolesApi = (pageDetails, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    let url =
      pageDetails.kind === ROLE_KINDS.CUSTOM
        ? `${API.AGM2.ROLES}?kind=${pageDetails.kind}&page=${
            pageDetails.current_page || ''
          }&perPage=${pageDetails.per_page || ''}&sortBy=${
            pageDetails.sort_by || 'name'
          }&sortOrder=${pageDetails.sort_order || 'desc'}&q=${pageDetails.q || ''}`
        : `${API.AGM2.ROLES}?kind=${pageDetails.kind}&include_children=false`
    if (pageDetails.schoolId) {
      url += `&path=/${pageDetails.districtId}/${pageDetails.schoolId}/`
    } else if (pageDetails.districtId) {
      url += `&path=/${pageDetails.districtId}/`
    } else {
      url += `&path=/`
    }
    const { data } = await fetch(url, {})
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

export const callRolesByIdApi = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    let url = `${API.AGM2.ROLES}/${id}`
    const { data } = await fetch(url, {})
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

export const createCustomRole = (payload, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  const apiPath = API.AGM2.ROLES
  const updatedPayload = {
    name: payload.name,
    description: payload.description,
    path: payload.schoolId
      ? `/${payload.districtId}/${payload.schoolId}/`
      : payload.districtId
      ? `/${payload.districtId}/`
      : '/',
  }
  try {
    let { data } = await post(apiPath, updatedPayload)
    dispatch(
      messageAction({
        subTitle: 'message:roleAdded',
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

export const callDeleteRole = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  const apiPath = `${API.AGM2.ROLES}/${id}`
  try {
    const { data } = await remove(apiPath, {})
    dispatch(
      messageAction({
        subTitle: 'message:roleDeleted',
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

export const callActionsApi = (successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    let url = API.AGM2.ACTIONS
    let { data } = await fetch(url, {})
    const actions = await Promise.all(
      data.sort().map((group) => fetch(`${API.AGM2.ACTIONS}/${group}`))
    )
    data = data.map((group, i) => ({
      group,
      actions: actions[i].data.map((item) => ({
        action: item,
        isSelected: false,
        name: item.replace(/([A-Z])/g, ' $1').trim(),
      })),
    }))
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

export const callRolePoliciesApi = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  try {
    let url = `${API.AGM2.ROLES}/${id}/policies`
    let { data } = await fetch(url)
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

export const callUpdateRolePoliciesApi =
  (id, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    try {
      dispatch(
        callRolePoliciesApi(id, async (rolePolicies) => {
          if (isEmpty(rolePolicies)) {
            const url = `${API.AGM2.ROLES}/${id}/policies`
            await post(url, payload)
          } else {
            const policyId = rolePolicies[0].id
            const url = `${API.AGM2.ROLES}/${id}/policies/${policyId}/set-grants`
            await put(url, payload)
          }
          dispatch(
            messageAction({
              subTitle: 'message:roleUpdated',
              severity: MESSAGE_SEVERITIES.SUCCESS,
            })
          )
          if (typeof successCallback === 'function') {
            successCallback()
          }
        })
      )
    } catch (err) {
      if (typeof failureCallback === 'function') {
        failureCallback(err)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }

//---------------------------------------------ROLES--------------------------------------------//

//---------------------------------------------USERS--------------------------------------------//

export const fetchUserByIdCall =
  (id, successCallback, failureCallback) => async (dispatch, getState) => {
    if (isEmpty(id)) {
      return
    }
    dispatch(toggleLoaderAction(true))
    const apiPath = `${API.AGM2.USERS}/${id}`
    const { app, user } = getState()
    try {
      const { data } = await fetch(apiPath)
      data.attributes.avatar_full = [
        `${app.baseURL}${API.MEDIAMANAGER.MEDIA}/api/access/${user?.user_principal?.realm}/${DEFAULTURL.DEFAULT}${data.attributes.avatar}`,
      ]
      modifyUserItem(data)
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

export const fetchUsersCall =
  (pageDetails, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    let url = `${API.AGM2.USERS}?perPage=${pageDetails.per_page}&page=${
      pageDetails.current_page
    }&sortBy=${pageDetails.sort_by || ''}&sortOrder=${pageDetails.sort_order || ''}&role_id=${
      pageDetails.roleId || ''
    }&q=${pageDetails.q || ''}`
    if (pageDetails.schoolId) {
      url += `&path=/${pageDetails.districtId}/${pageDetails.schoolId}/`
    } else if (pageDetails.districtId) {
      url += `&path=/${pageDetails.districtId}/`
    } else {
      url += `&path=/`
    }
    try {
      const { data } = await fetch(url, {})
      get(data, 'content', []).forEach((item) => modifyUserItem(item))
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

export const addUserCall = (payload, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  const apiPath = API.AGM2.USERS
  try {
    const { data } = await post(apiPath, payload)
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

export const updateUserCall =
  (id, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    const apiPath = `${API.AGM2.USERS}/${id}`

    // const { app, user } = getState()
    try {
      const avatar = get(payload, 'attributes.avatar[0]', '')
      if (typeof avatar !== 'string') {
        const data = await dispatch(uploadUserlogoCall(id, avatar))
        // payload.attributes.avatar = [
        //   `${app.baseURL}${API.MEDIAMANAGER.MEDIA}/api/access/${user?.user_principal?.realm}/${DEFAULTURL.DEFAULT}${data[0]}`,
        // ]
        payload.attributes.avatar = [data[0]]
      }
      await put(apiPath, payload)
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
export const uploadUserlogoCall =
  (id, file, successCallback, failureCallback) => async (dispatch) => {
    try {
      const payload = new FormData()
      payload.append('file', file)
      const { data } = await post(
        `${API.MEDIAMANAGER.MEDIA}/-/spaces/${DEFAULTURL.DEFAULT}/files/-/${id}/avatar`,
        payload
      )

      if (typeof successCallback === 'function') {
        successCallback()
      }
      return data
    } catch (err) {
      if (typeof failureCallback === 'function') {
        failureCallback(err)
      }
    } finally {
      dispatch(toggleLoaderAction(false))
    }
  }
export const fetchUsersGroupsCall = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  let url = `${API.AGM2.USERS}/${id}/groups`
  try {
    const { data } = await fetch(url)
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

export const attachGroupCall = (id, path, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  let url = `${API.AGM2.USERS}/${id}/groups/join?path=${path}`
  try {
    await post(url)
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

export const detachGroupCall = (id, path, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  let url = `${API.AGM2.USERS}/${id}/groups/leave?path=${path}`
  try {
    await post(url)
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

export const fetchUserRolesCall = (id, successCallback, failureCallback) => async (dispatch) => {
  dispatch(toggleLoaderAction(true))
  let url = `${API.AGM2.USERS}/${id}/roles`
  try {
    const { data } = await fetch(url)
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

export const updateUserRoleCall =
  (id, payload, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    const apiPath = `${API.AGM2.USERS}/${id}/set-roles`
    try {
      await put(apiPath, payload)
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

export const setUserPasswordCall =
  (id, password, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    const apiPath = `${API.AGM2.USERS}/${id}/set-password`
    const payload = {
      new_password: password,
    }
    try {
      await put(apiPath, payload)
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

const modifyUserItem = function (item) {
  if (isEmpty(item)) {
    return
  }
  if (!isEmpty(item.attributes)) {
    item.attributes = Object.keys(item.attributes).reduce((curr, val) => {
      curr[val] = item.attributes[val][0]
      return curr
    }, {})
  } else {
    item.attributes = {}
  }
  item.attributes.first_name = item.first_name
  item.attributes.email = item.email
  item.attributes.last_name = item.last_name
  item.attributes.dob = moment(item.attributes.dob).format(DATEFORMAT)
  item.full_name = `${item.first_name} ${item.last_name}`
  item.createdTimeLabel = convertTimestampToDate(item.created_at)
}

//---------------------------------------------USERS--------------------------------------------//
