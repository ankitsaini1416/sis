import localStorageService from '../api/localStorageService'
import { get } from './utils'

export const selectedHeaderData = (state) => get(state, 'header.headerData')
export const selectedDeviceData = (state) => get(state, 'device')
export const selectAuth = (state) => get(state, 'auth', {})
export const selectMessage = (state) => get(state, 'message')
export const selectMasterData = (state) => get(state, 'masterData', {})
export const selectDashboards = (state) => get(state, 'dashboard', {})
export const selectAccountId = () => get(localStorageService.getAccessToken(), 'accountId', '')
export const selectUiState = (state) => get(state, 'uiState')
export const selectApp = (state) => state.app
export const selectLoader = (state) => state.loader
export const selectMetadata = (state) => state.metadata
export const selectAdminType = (state) => state.adminType
export const selectTheme = (state) => state.theme
export const selectOrg = (state) => state.org
export const selectUser = (state) => state.user
