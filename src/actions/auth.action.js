import { API } from './../api/api'
import { fetch, post, setAxiosBase } from './../api/httpClient'
import localStorageService from './../api/localStorageService'
import { ADMIN_TYPES, MESSAGE_SEVERITIES, ROLE_KINDS, ROUTES } from './../helpers/constants'
import { selectApp } from './../helpers/selectors'
import {
  getAccountDataFromToken,
  getSchoolUrl,
  getTokenFromUrl,
  isEmpty,
  isUnauthRoute,
} from './../helpers/utils'
import ActionTypes from './actionTypes'
import { adminTypeAction, messageAction, orgAction, themeAction } from './app.action'
import { refreshTokenHandler, setBasics } from './token.action'
import { userAction } from './user.action'

export const authAction = (data) => (dispatch) =>
  dispatch({
    type: ActionTypes.LOGIN,
    data,
  })

export const introspectCall = () => async (dispatch) => {
  try {
    const url = API.AGM2.INTROSPECT
    const { data } = await fetch(url)
    const isAdmin = !isEmpty(
      (data.roles || []).find((role) => role.name === 'root' && role.kind === ROLE_KINDS.SYSTEM)
    )
    dispatch(
      userAction({
        ...data,
        isAdmin,
        showDistrict: isAdmin || checkForPermission(data, 'district'),
        showSchool: isAdmin || checkForPermission(data, 'school'),
        showApplication: isAdmin || checkForPermission(data, 'application'),
        showEnrollment: isAdmin || checkForPermission(data, 'enrollment'),
        showProgram: isAdmin || checkForPermission(data, 'program'),
        showCourse: isAdmin || checkForPermission(data, 'course'),
        showSubject: isAdmin || checkForPermission(data, 'subject'),
        showTranscript: isAdmin || checkForPermission(data, 'transcript'),
        showRole: isAdmin || checkForPermission(data, 'role'),
        showUser: true,
        showSetting: isAdmin || checkForPermission(data, 'setting'),
        showReport: isAdmin || checkForPermission(data, 'report'),
      })
    )
  } catch (error) {
    console.log(error)
  }
}

export const accountAction =
  ({ district, school }, successCallback, failureCallback) =>
  async (dispatch) => {
    try {
      let url = API.CORE.SLUG
      if (!school && !district) {
        dispatch(adminTypeAction(ADMIN_TYPES.MASTER_ADMIN))
        return
      }
      if (district) {
        url += `district/${district}`
      }
      if (school) {
        url += `/school/${school}`
      }
      const { data } = await fetch(url)
      const mappedAuth = {
        accountId: school ? data.sch_tenant_id : data.dst_tenant_id,
      }
      data.accountId = mappedAuth.accountId
      setAxiosBase({
        'X-CW-Tenant-Id': mappedAuth.accountId,
      })
      localStorageService.setToken({
        ...localStorageService.getAccessToken(),
        ...mappedAuth,
      })
      if (school) {
        const metadataUrl = `${API.CORE.METADATAOPEN}?metaType=school&metaTypeId=${data.sch_id}&metaKeys=school_theme`
        const response = await fetch(metadataUrl)
        const metadata = response.data.reduce((value, currentItem) => {
          value[currentItem.md_meta_key] = currentItem.md_meta_value
          return value
        }, {})
        dispatch(adminTypeAction(ADMIN_TYPES.SCHOOL_ADMIN))
        dispatch(orgAction({ ...data, metadata }))
        if (metadata.school_theme) {
          dispatch(themeAction(metadata.school_theme))
        }
      } else if (district) {
        dispatch(adminTypeAction(ADMIN_TYPES.DISTRICT_ADMIN))
        dispatch(orgAction(data))
      }
      if (typeof successCallback === 'function') {
        successCallback(mappedAuth.accountId || '')
      }
    } catch (error) {
      dispatch(adminTypeAction(ADMIN_TYPES.MASTER_ADMIN))
      if (typeof failureCallback === 'function') {
        failureCallback(error)
      }
    }
  }

export const forgotPasswordCall =
  (payload, successCallback, failureCallback) => async (dispatch) => {
    try {
      const currentToken = localStorageService.getAccessToken() || {}
      const updatedPayload = {
        ...payload,
        account_id: currentToken.accountId,
        username: payload.username.trim(),
      }
      await post(API.AUTH.FORGOTPASSWORD, updatedPayload)
      dispatch(
        messageAction({
          subTitle: 'message:forgetPasswordDetailSent',
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
    }
  }

export const logout = () => {
  const currentToken = localStorageService.getAccessToken() || {}
  localStorageService.clearToken()
  localStorageService.clearDistrictSchool()
  localStorageService.setToken({
    accountId: currentToken.accountId,
  })
}

export const redirectToLogin = (params, accountId) => (_, getState) => {
  localStorageService.clearDistrictSchool()
  const state = getState()
  const app = selectApp(state)
  const redirectBase =
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV === 'production' ? app.redirectBase : 'http://localhost:4000'
  const relativePath = getSchoolUrl({
    ...params,
    to: `${ROUTES.LOGIN}`,
  })
  const loginUrl = `${app.baseURL}/authgateway/api/authenticate?client_id=${accountId}&redirect_uri=${redirectBase}${relativePath}`
  window.location.href = loginUrl
}

export const setAuthTokenFromLocalStorage = () => async () => {
  if (isUnauthRoute()) {
    return
  }
  const token = getTokenFromUrl()
  if (!isEmpty(token)) {
    const authData = getAccountDataFromToken(token)
    setBasics({
      accessToken: token.accessToken,
      accountId: authData.accountId,
      refreshToken: authData.refreshToken,
      expiresIn: token.expiresIn,
    })
    refreshTokenHandler(true, token.expiresIn)
  } else {
    refreshTokenHandler()
  }
}

const checkForPermission = (data, key) => {
  if (data.isAdmin) {
    return true
  }
  const allowedActions = data?.permissions?.allowedActions || {}
  return Object.keys(allowedActions).some(
    (action) =>
      !isEmpty(
        (allowedActions[action]?.list || []).find((permission) =>
          permission.toLowerCase().includes(key.toLowerCase())
        )
      )
  )
}
