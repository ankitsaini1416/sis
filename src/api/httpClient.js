import axios from 'axios'

import { messageAction } from '../actions/app.action'
import { setBasics } from '../actions/token.action'
import { MESSAGE_SEVERITIES, ROUTES } from './../helpers/constants'
import { getSchoolUrl, isEmpty, trimmer } from './../helpers/utils'
import { API } from './api'
import localStorageService from './localStorageService'

let axiosInstance = null
const configurationSetting = (store) => {
  //   axios.defaults.baseURL = baseRoute
  //   axios.defaults.timeout = timeout
  axiosInstance = axios.create()
  setupInterceptors(store)
}

const setAxiosBase = (config) => {
  if (axiosInstance === null) {
    axiosInstance = axios.create()
  }
  if (config.baseURL) {
    axiosInstance.defaults.baseURL = config.baseURL
  }
  if (config['X-CW-Tenant-Id']) {
    axiosInstance.defaults.headers.common['X-CW-Tenant-Id'] = config['X-CW-Tenant-Id']
  }
  if (config.Authorization) {
    axiosInstance.defaults.headers.common['Authorization'] = config.Authorization
  }
}

const updateTimeout = (timeout) => {
  axios.defaults.timeout = timeout
}

async function fetch(url, tokencConfig = {}) {
  const { headers, ...rest } = tokencConfig
  const baseConfig = {
    headers: {
      ...headers,
    },
    ...rest,
  }
  const response = await axiosInstance.get(url, baseConfig)
  if (response.status >= 200 && response.status < 300) {
    return { data: response.data, status: response.status }
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}
async function patch(url, data, tokencConfig = {}) {
  const { headers, ...rest } = tokencConfig
  const baseConfig = {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...rest,
  }
  const response = await axiosInstance.patch(url, trimmer(data), baseConfig)
  if (response.status >= 200 && response.status < 300) {
    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
    }
  }
  const error = new Error(response.statusText)
  error.response = response
}
async function post(url, data, tokencConfig = {}) {
  const { headers, ...rest } = tokencConfig
  const baseConfig = {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...rest,
  }
  const response = await axiosInstance.post(url, trimmer(data), baseConfig)
  if (response.status >= 200 && response.status < 300) {
    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
    }
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

async function put(url, data, tokencConfig = {}) {
  const { headers, ...rest } = tokencConfig
  const baseConfig = {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...rest,
  }
  const response = await axiosInstance.put(url, trimmer(data), baseConfig)
  if (response.status >= 200 && response.status < 300) {
    return { data: response.data, status: response.status }
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

async function remove(url, tokencConfig = {}, data = {}) {
  const { headers, ...rest } = tokencConfig
  const baseConfig = {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...rest,
  }
  if (!isEmpty(data)) {
    baseConfig.data = trimmer(data)
  }
  const response = await axiosInstance.delete(url, baseConfig)
  if (response.status >= 200 && response.status < 300) {
    return { status: response.status }
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

const setupInterceptors = (store) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    function (error) {
      const originalRequest = error.config
      // const tenantId = originalRequest.headers['X-CW-Tenant-Id']
      // if (tenantId === 'master') {
      //   console.log('Master tenant ID Detected, forwarding handling.')
      //   handleAdminError(error, axiosInstance, store)
      // }
      if (error.response && error.response.status) {
        if (originalRequest.url === API.AGM2.REFRESH) {
          const params = localStorageService.getDistrictSchool()
          window.location = getSchoolUrl({ ...params, to: ROUTES.LOGIN })
          return Promise.reject(error)
        }
        if (
          error.response.status === 403 &&
          !originalRequest._retry &&
          error?.response?.data?.code === 'AR51_SYS:ERR_INVALID_CREDS'
        ) {
          originalRequest._retry = true
          const { refreshToken, accountId } = localStorageService.getAccessToken()
          if (!(refreshToken && accountId)) {
            const params = localStorageService.getDistrictSchool()
            window.location = getSchoolUrl({ ...params, to: ROUTES.LOGIN })
            return Promise.reject(error)
          }
          const refreshUrl = `${API.AGM2.REFRESH}?grant_type=refresh_token&client_id=${accountId}&refresh_token=${refreshToken}`
          return axiosInstance.post(refreshUrl, {}).then(({ data, status }) => {
            if (status === 200) {
              setBasics({
                accessToken: data.access_token,
                accountId: accountId,
                refreshToken: data.refresh_token,
                expiresIn: data.expiresIn,
              })
              originalRequest.headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.access_token}`,
                'X-CW-Tenant-Id': accountId,
              }
              return axiosInstance(originalRequest)
            } else {
              const params = localStorageService.getDistrictSchool()
              window.location = getSchoolUrl({
                ...params,
                to: ROUTES.LOGIN,
              })
              return Promise.reject(error)
            }
          })
        } else if (
          error.response.status === 403 &&
          error?.response?.data?.code === 'AR51_SYS:RESOURCE_ACCESS_DENIED'
        ) {
          store.dispatch(
            messageAction({
              subTitle: 'error:errorPermission',
              severity: MESSAGE_SEVERITIES.ERROR,
            })
          )
          return Promise.reject(error)
        } else {
          return Promise.reject(error)
        }
      } else {
        return Promise.reject(error)
      }
    }
  )
}

export { axiosInstance, fetch, patch, post, put, remove, setAxiosBase, updateTimeout }

export default configurationSetting
