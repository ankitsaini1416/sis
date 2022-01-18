// import { API } from '../api/api'
// import { post } from '../api/httpClient'
import actionTypes from './actionTypes'
// import toggleLoaderAction from './loader.action'

export const userAction = (data) => (dispatch) =>
  dispatch({
    type: actionTypes.USER,
    data,
  })

// export const fetchOrganizationsDetailByUrn =
//   (payload, successCallback, failureCallback) => async (dispatch) => {
//     dispatch(toggleLoaderAction(true))
//     let apiPath = `${API.ORGANIZATION}`
//     try {
//       const { data } = await post(apiPath, payload)
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

// export const userByEmailCall =
//   (email, schoolPublicId, successCallback, failureCallback) => async () => {
//     try {
//       const url = `${API.CORE.ADMINUSER}/${email}`
//       const customHeaders = {
//         headers: {
//           ['realm-name']: schoolPublicId,
//         },
//       }
//       const { data } = await fetch(url, customHeaders)
//       modifyUserItem(data)
//       if (typeof successCallback === 'function') {
//         successCallback(data)
//       }
//     } catch (error) {
//       if (typeof failureCallback === 'function') {
//         failureCallback(error)
//       }
//     }
//   }

// export const updateUserCall =
//   (email, schoolPublicId, payload, successCallback, failureCallback) => async (dispatch) => {
//     dispatch(toggleLoaderAction(true))
//     try {
//       const { address, parents, ...rest } = payload
//       const url = `${API.CORE.ADMINUSER}/${email}`
//       const customHeaders = {
//         headers: {
//           ['realm-name']: schoolPublicId,
//         },
//       }
//       const updatedPayload = {
//         ...rest,
//         dob: rest.dob && typeof rest.dob === 'object' ? rest.dob.getTime() : rest.dob,
//       }
//       const formPayload = new FormData()
//       Object.keys(updatedPayload).forEach((key) => {
//         formPayload.append(key, updatedPayload[key])
//       })
//       if (!isEmpty(address)) {
//         Object.keys(address).forEach((key) => {
//           formPayload.append(`address[${key}]`, address[key])
//         })
//       }
//       if (!isEmpty(parents)) {
//         parents.forEach((parent, i) => {
//           Object.keys(parent).forEach((key) => {
//             formPayload.append(`parents[${i}][${key}]`, parent[key])
//           })
//         })
//       }
//       const { data } = await put(url, formPayload, customHeaders)
//       if (typeof successCallback === 'function') {
//         successCallback(data)
//       }
//     } catch (error) {
//       if (typeof failureCallback === 'function') {
//         failureCallback(error)
//       }
//     } finally {
//       dispatch(toggleLoaderAction(false))
//     }
//   }
