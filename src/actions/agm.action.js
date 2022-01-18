import { API } from '../api/api'
import { fetch } from '../api/httpClient'
import { convertTimestampToDate, get } from '../helpers/utils'
import { isEmpty } from '../helpers/utils'
import toggleLoaderAction from './loader.action'

// export const fetchAGMUsersCall =
//   (pageDetails, successCallback, failureCallback) => async (dispatch) => {
//     dispatch(toggleLoaderAction(true))
//     let apiPath = `${API.AGM.USERS}/search?pageSize=${pageDetails.per_page}&page=${pageDetails.current_page}`
//     try {
//       const { data } = await fetch(apiPath, {})
//       get(data, 'content', []).forEach((item) => modifyUserItem(item))
//       if (typeof successCallback === 'function') {
//         successCallback(data)
//       }
//     } catch (err) {
//       if (typeof failureCallback === 'function') {
//         failureCallback(err)
//       }
//     } finally {
//       dispatch(toggleLoaderAction(false))
//     }
//   }

export const fetchUsersCall =
  (pageDetails, successCallback, failureCallback) => async (dispatch) => {
    dispatch(toggleLoaderAction(true))
    let apiPath = `${API.AGM.ENTITIES}/sis-core/list-users?perPage=${pageDetails.per_page}&page=${
      pageDetails.current_page
    }&sortBy=${pageDetails.sort_by || ''}&sortOrder=${pageDetails.sort_order || ''}`
    if (pageDetails.districtId) {
      apiPath += `&entities=${encodeURIComponent(pageDetails.districtId)}`
    }
    if (pageDetails.schoolId) {
      apiPath += `&entities=${encodeURIComponent(pageDetails.schoolId)}`
    }
    try {
      const { data } = await fetch(apiPath, {})
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

// export const addUserCall = (payload, successCallback, failureCallback) => async (dispatch) => {
//   dispatch(toggleLoaderAction(true))
//   const apiPath = API.AGM.USERS
//   try {
//     const { data } = await post(apiPath, payload)
//     if (typeof successCallback === 'function') {
//       successCallback(data)
//     }
//   } catch (err) {
//     if (typeof failureCallback === 'function') {
//       failureCallback(err)
//     }
//   } finally {
//     dispatch(toggleLoaderAction(false))
//   }
// }

// export const fetchAGMUserCall = (id, successCallback, failureCallback) => async (dispatch) => {
//   dispatch(toggleLoaderAction(true))
//   try {
//     const apiPath = `${API.AGM.USERS}/${id}`
//     const { data } = await fetch(apiPath)
//     modifyUserItem(data)
//     if (typeof successCallback === 'function') {
//       successCallback(data)
//     }
//   } catch (err) {
//     if (typeof failureCallback === 'function') {
//       failureCallback(err)
//     }
//   } finally {
//     dispatch(toggleLoaderAction(false))
//   }
// }

// export const fetchEntitiesByUserCall =
//   (id, pageDetails, successCallback, failureCallback) => async (dispatch) => {
//     dispatch(toggleLoaderAction(true))
//     let apiPath = `${API.AGM.USERS}/${id}/entities?pageSize=${pageDetails.per_page}&q=${
//       pageDetails.q
//     }&page=${pageDetails.current_page}&sortBy=${pageDetails.sort_by || ''}&sortOrder=${
//       pageDetails.sort_order || ''
//     }`
//     try {
//       const { data } = await fetch(apiPath)
//       if (typeof successCallback === 'function') {
//         successCallback(data)
//       }
//     } catch (err) {
//       if (typeof failureCallback === 'function') {
//         failureCallback(err)
//       }
//     } finally {
//       dispatch(toggleLoaderAction(false))
//     }
//   }

// export const attachEntitiesCall =
//   (payload, successCallback, failureCallback) => async (dispatch) => {
//     dispatch(toggleLoaderAction(true))
//     let apiPath = `${API.AGM.ENTITIES}/sis-core/attach`
//     if (payload.districtId) {
//       apiPath += `?entities=${encodeURIComponent(payload.districtId)}`
//     }
//     if (payload.schoolId) {
//       apiPath +=
//         apiPath[apiPath.length - 1] === '?'
//           ? `entities=${encodeURIComponent(payload.schoolId)}`
//           : `&entities=${encodeURIComponent(payload.schoolId)}`
//     }
//     const updatedPayload = {
//       user_ids: [payload.userId],
//     }
//     try {
//       const data = await post(apiPath, updatedPayload)
//       dispatch(
//         messageAction({
//           subTitle: 'message:organizationAdded',
//           severity: MESSAGE_SEVERITIES.SUCCESS,
//         })
//       )
//       if (typeof successCallback === 'function') {
//         successCallback(data)
//       }
//     } catch (err) {
//       if (typeof failureCallback === 'function') {
//         failureCallback(err)
//       }
//     } finally {
//       dispatch(toggleLoaderAction(false))
//     }
//   }

// export const detachEntitiesCall =
//   (payload, successCallback, failureCallback) => async (dispatch) => {
//     dispatch(toggleLoaderAction(true))
//     let apiPath = `${API.AGM.ENTITIES}/sis-core/detach`
//     if (payload.districtId) {
//       apiPath += `?entities=${encodeURIComponent(payload.districtId)}`
//     }
//     if (payload.schoolId) {
//       apiPath +=
//         apiPath[apiPath.length - 1] === '?'
//           ? `entities=${encodeURIComponent(payload.schoolId)}`
//           : `&entities=${encodeURIComponent(payload.schoolId)}`
//     }
//     const updatedPayload = {
//       user_ids: [payload.userId],
//     }
//     try {
//       const data = await post(apiPath, updatedPayload)
//       if (typeof successCallback === 'function') {
//         successCallback(data)
//       }
//     } catch (err) {
//       if (typeof failureCallback === 'function') {
//         failureCallback(err)
//       }
//     } finally {
//       dispatch(toggleLoaderAction(false))
//     }
//   }

// export const fetchUserRolesCall = (id, successCallback, failureCallback) => async (dispatch) => {
//   dispatch(toggleLoaderAction(true))
//   let apiPath = `${API.AGM.USERS}/${id}/roles`
//   try {
//     const { data } = await fetch(apiPath)
//     if (typeof successCallback === 'function') {
//       successCallback(data)
//     }
//   } catch (err) {
//     if (typeof failureCallback === 'function') {
//       failureCallback(err)
//     }
//   } finally {
//     dispatch(toggleLoaderAction(false))
//   }
// }

// export const attachUserRoleCall =
//   (payload, successCallback, failureCallback) => async (dispatch) => {
//     dispatch(toggleLoaderAction(true))
//     try {
//       const urnRegex = /urn:([a-zA-Z0-9/_-]+):([a-zA-Z0-9/_-]+)::(.*)/
//       const promises = []
//       payload.role.forEach((role) => {
//         const service = role?.service ? role.service : role.urn.match(urnRegex)[1]
//         if (service === 'sys') {
//           promises.push({
//             url: `${API.AGM.PLATFORMROLES}/${role.name}/users`,
//             method: put,
//             payload: [payload.userId],
//           })
//         } else if (service === 'svc_adm') {
//           promises.push({
//             url: `${API.AGM.SERVICEADMINROLES}/${role.name}/attach`,
//             method: post,
//             payload: [payload.userId],
//           })
//         } else if (service === 'etc') {
//           promises.push({
//             url: `${API.AGM.CUSTOMROLES}/${role.name}/users`,
//             method: put,
//             payload: [payload.userId],
//           })
//         } else {
//           promises.push({
//             url: `${API.AGM.SERVICEROLES}/${service.toUpperCase()}/attach`,
//             method: post,
//             payload: {
//               role_name: role.name,
//               user_ids: [payload.userId],
//             },
//           })
//         }
//       })
//       await Promise.all(promises.map((promise) => promise.method(promise.url, promise.payload)))
//       if (typeof successCallback === 'function') {
//         successCallback()
//       }
//     } catch (err) {
//       if (typeof failureCallback === 'function') {
//         failureCallback(err)
//       }
//     } finally {
//       dispatch(toggleLoaderAction(false))
//     }
//   }

// export const detachUserRoleCall =
//   (payload, successCallback, failureCallback) => async (dispatch) => {
//     dispatch(toggleLoaderAction(true))
//     try {
//       const urnRegex = /urn:([a-zA-Z0-9/_-]+):([a-zA-Z0-9/_-]+)::(.*)/
//       const promises = []
//       payload.role.forEach((role) => {
//         const service = role?.service ? role.service : role.urn.match(urnRegex)[1]
//         if (service === 'sys') {
//           promises.push({
//             url: `${API.AGM.PLATFORMROLES}/${role.name}/users/detach`,
//             method: post,
//             payload: [payload.userId],
//           })
//         } else if (service === 'svc_adm') {
//           promises.push({
//             url: `${API.AGM.SERVICEADMINROLES}/${role.name}/detach`,
//             method: post,
//             payload: [payload.userId],
//           })
//         } else if (service === 'etc') {
//           promises.push({
//             url: `${API.AGM.CUSTOMROLES}/${role.name}/users/detach`,
//             method: post,
//             payload: [payload.userId],
//           })
//         } else {
//           promises.push({
//             url: `${API.AGM.SERVICEROLES}/${service.toUpperCase()}/detach`,
//             method: post,
//             payload: {
//               role_name: role.name,
//               user_ids: [payload.userId],
//             },
//           })
//         }
//       })
//       await Promise.all(promises.map((promise) => promise.method(promise.url, promise.payload)))
//       if (typeof successCallback === 'function') {
//         successCallback()
//       }
//     } catch (err) {
//       if (typeof failureCallback === 'function') {
//         failureCallback(err)
//       }
//     } finally {
//       dispatch(toggleLoaderAction(false))
//     }
//   }

// export const callPlatformRolesApi = (successCallback, failureCallback) => async (dispatch) => {
//   dispatch(toggleLoaderAction(true))
//   const apiPath = API.AGM.PLATFORMROLES
//   try {
//     const { data } = await fetch(apiPath, {})
//     if (typeof successCallback === 'function') {
//       successCallback(data)
//     }
//   } catch (err) {
//     if (typeof failureCallback === 'function') {
//       failureCallback(err)
//     }
//   } finally {
//     dispatch(toggleLoaderAction(false))
//   }
// }

// export const callCustomRolesApi = (successCallback, failureCallback) => async (dispatch) => {
//   dispatch(toggleLoaderAction(true))
//   const apiPath = API.AGM.CUSTOMROLES
//   try {
//     const { data } = await fetch(apiPath, {})
//     if (typeof successCallback === 'function') {
//       successCallback(data)
//     }
//   } catch (err) {
//     if (typeof failureCallback === 'function') {
//       failureCallback(err)
//     }
//   } finally {
//     dispatch(toggleLoaderAction(false))
//   }
// }

// export const callDeleteRoleApi = (id, successCallback, failureCallback) => async (dispatch) => {
//   dispatch(toggleLoaderAction(true))
//   const apiPath = API.AGM.CUSTOMROLES + '/' + id
//   try {
//     const { data } = await remove(apiPath, {})
//     dispatch(
//       messageAction({
//         subTitle: 'message:roleDeleted',
//         severity: MESSAGE_SEVERITIES.SUCCESS,
//       })
//     )
//     if (typeof successCallback === 'function') {
//       successCallback(data)
//     }
//   } catch (err) {
//     if (typeof failureCallback === 'function') {
//       failureCallback(err)
//     }
//   } finally {
//     dispatch(toggleLoaderAction(false))
//   }
// }

// export const createCustomRoleApi =
//   (payload, successCallback, failureCallback) => async (dispatch) => {
//     dispatch(toggleLoaderAction(true))
//     const apiPath = API.AGM.CUSTOMROLES
//     try {
//       let { data } = await post(apiPath, payload)
//       if (typeof successCallback === 'function') {
//         successCallback(data)
//       }
//     } catch (err) {
//       if (typeof failureCallback === 'function') {
//         failureCallback(err)
//       }
//     } finally {
//       dispatch(toggleLoaderAction(false))
//     }
//   }

// export const customRoleResourcesCall =
//   (roleName, successCallback, failureCallback) => async (dispatch) => {
//     dispatch(toggleLoaderAction(true))
//     try {
//       let [resourcesResponse, permissionsResponse] = await Promise.all([
//         fetch(`${API.AGM.CUSTOMROLES}/${roleName}/resources`, {}),
//         fetch(API.AGM.RESOURCES, {}),
//       ])
//       if (typeof successCallback === 'function') {
//         successCallback(get(permissionsResponse, 'data', {}), get(resourcesResponse, 'data', []))
//       }
//     } catch (err) {
//       if (typeof failureCallback === 'function') {
//         failureCallback(err)
//       }
//     } finally {
//       dispatch(toggleLoaderAction(false))
//     }
//   }

// export const customRoleDetailCall =
//   (name, successCallback, failureCallback) => async (dispatch) => {
//     dispatch(toggleLoaderAction(true))
//     const apiPath = `${API.AGM.CUSTOMROLES}/${name}`
//     try {
//       const { data } = await fetch(apiPath, {})
//       if (typeof successCallback === 'function') {
//         successCallback(data)
//       }
//     } catch (err) {
//       if (typeof failureCallback === 'function') {
//         failureCallback(err)
//       }
//     } finally {
//       dispatch(toggleLoaderAction(false))
//     }
//   }

// export const attachDettachRolesCall =
//   (roleName, resources, successCallback, failureCallback) => async (dispatch) => {
//     dispatch(toggleLoaderAction(true))
//     const { data } = await fetch(`${API.AGM.CUSTOMROLES}/${roleName}/resources`, {})
//     const dettached = data.filter(
//       (item) =>
//         resources.findIndex(
//           (resItem) =>
//             resItem.service_code.toLowerCase() === item.service_code.toLowerCase() &&
//             resItem.resource_name.toLowerCase() === item.resource_name.toLowerCase() &&
//             resItem.action === item.action
//         ) === -1
//     )
//     const attached = resources.filter(
//       (item) =>
//         data.findIndex(
//           (resItem) =>
//             resItem.service_code.toLowerCase() === item.service_code.toLowerCase() &&
//             resItem.resource_name.toLowerCase() === item.resource_name.toLowerCase() &&
//             resItem.action === item.action
//         ) === -1
//     )
//     let permissionsArrayAttach = {
//       resources: attached,
//     }
//     let permissionsArrayDetach = {
//       resources: dettached,
//     }
//     try {
//       if (attached.length && dettached.length) {
//         await Promise.all([
//           put(`${API.AGM.CUSTOMROLES}/${roleName}/resources`, permissionsArrayAttach, {}),
//           post(`${API.AGM.CUSTOMROLES}/${roleName}/resources/detach`, permissionsArrayDetach, {}),
//         ])
//       } else if (attached.length) {
//         await put(`${API.AGM.CUSTOMROLES}/${roleName}/resources`, permissionsArrayAttach, {})
//       } else if (dettached.length) {
//         await post(
//           `${API.AGM.CUSTOMROLES}/${roleName}/resources/detach`,
//           permissionsArrayDetach,
//           {}
//         )
//       }
//       if (typeof successCallback === 'function') {
//         successCallback()
//       }
//     } catch (err) {
//       if (typeof failureCallback === 'function') {
//         failureCallback(err)
//       }
//     } finally {
//       dispatch(toggleLoaderAction(false))
//     }
//   }

const modifyUserItem = function (item) {
  if (isEmpty(item)) {
    return
  }
  item.full_name = `${item.first_name} ${item.last_name}`
  item.createdTimeLabel = convertTimestampToDate(item.created_timestamp)
}
