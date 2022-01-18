import { API } from '../api/api'
import { ROUTES } from '../helpers/constants'
import { getSchoolUrl } from '../helpers/utils'
import { post, setAxiosBase } from './../api/httpClient'
import localStorageService from './../api/localStorageService'
import store from './../store'
import { authAction, introspectCall, logout } from './auth.action'

let tokenLoop = null

export const refreshTokenHandler = async (onlyLoop = false, expiresInDuration = 600) => {
  try {
    if (!onlyLoop) {
      const { refreshToken, accountId } = localStorageService.getAccessToken()
      if (!refreshToken) {
        throw new Error()
      }
      const refreshUrl = `${API.AGM2.REFRESH}?grant_type=refresh_token&client_id=${accountId}&refresh_token=${refreshToken}`
      const { data } = await post(refreshUrl, {})
      setBasics({
        accessToken: data.access_token,
        accountId: accountId,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
      })
      tokenLoop = setTimeout(refreshTokenHandler, parseInt(data.expires_in) * 1000 - 20000)
    } else {
      tokenLoop = setTimeout(refreshTokenHandler, parseInt(expiresInDuration) * 1000 - 20000)
    }
  } catch (err) {
    logout()
    const params = localStorageService.getDistrictSchool()
    clearTimeout(tokenLoop)
    if (!window.location.pathname.includes('login')) {
      window.location = getSchoolUrl({ ...params, to: ROUTES.LOGIN })
    }
    console.log(err)
  }
}

export const setBasics = (data) => {
  setAxiosBase({
    Authorization: `Bearer ${data.accessToken}`,
    'X-CW-Tenant-Id': data.accountId,
  })
  localStorageService.setToken({
    refreshToken: data.refreshToken,
    accountId: data.accountId,
  })
  store.dispatch(
    authAction({ isLoggedIn: true, accessToken: data.accessToken, expiresIn: data.expiresIn })
  )
  store.dispatch(introspectCall())
}
