import { combineReducers } from 'redux'

import { adminType, app, message, org, theme, uiState } from './app.reducer'
import auth from './auth.reducer'
import dashboard from './dashboard.reducer'
import device from './device.reducer'
import header from './header.reducer'
import loader from './loader.reducer'
import masterData from './masterData.reducer'
import metadata from './metadata.reducer'
import user from './user.reducer'

export default combineReducers({
  device,
  auth,
  header,
  app,
  message,
  masterData,
  uiState,
  adminType,
  loader,
  metadata,
  org,
  theme,
  user,
  dashboard,
})
