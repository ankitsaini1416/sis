/* eslint-disable no-unused-vars */
import './App.css'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import { appAction } from './actions/app.action'
import { setAuthTokenFromLocalStorage } from './actions/auth.action'
import { fetchDashboardListCall } from './actions/dashboard.action'
import { countriesCall, masterDataCall } from './actions/masterData.action'
import { fetchTenantMetadata } from './actions/metadata.action'
import { environmentBaseUrls } from './api/api'
import configurationSetting, { setAxiosBase } from './api/httpClient'
import defaultTheme from './assets/eden/theme'
import Loader from './components/loader/Loader'
import Message from './components/message/Message'
import { selectAuth, selectLoader, selectTheme } from './helpers/selectors'
import { themes } from './helpers/stub'
import { get, isEmpty } from './helpers/utils'
import Routes from './Routes'
import STORE from './store'

function App({
  appAction,
  setAuthTokenFromLocalStorage,
  masterDataCall,
  countriesCall,
  loader,
  fetchTenantMetadata,
  auth,
  theme,
  fetchDashboardListCall,
}) {
  const { i18n } = useTranslation()
  const [currentTheme, setCurrentTheme] = React.useState({})
  window.setLanguage = (lang) => i18n.changeLanguage(lang)
  useEffect(() => {
    configurationSetting(STORE)
    const baseURL = !isEmpty(get(window, 'rootConfig.SERVICE_URL_SECURED', ''))
      ? window.rootConfig.SERVICE_URL_SECURED
      : environmentBaseUrls.development
    const redirectBase = !isEmpty(get(window, 'rootConfig.REDIRECT_BASE_SECURED', ''))
      ? window.rootConfig.REDIRECT_BASE_SECURED
      : environmentBaseUrls.redirectBase
    appAction({
      baseURL,
      redirectBase,
    })
    setAxiosBase({ baseURL })
  }, [])
  useEffect(() => {
    setAuthTokenFromLocalStorage() // Do not change calling index
  }, [])
  useEffect(() => {
    import(`./assets/${theme}/theme`).then((theme) => {
      setCurrentTheme(theme)
    })
  }, [theme])
  useEffect(() => {
    if (auth.isLoggedIn) {
      fetchDashboardListCall()
      masterDataCall()
      countriesCall({
        q: '',
        sort_by: 'name',
        sort_order: 'asc',
        per_page: 500,
        page: 1,
      })
      fetchTenantMetadata()
    }
  }, [auth.isLoggedIn])
  return (
    <ThemeProvider theme={!isEmpty(currentTheme) ? currentTheme.default : defaultTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <React.StrictMode>
        <div className="app">
          <Routes />
          <Message />
          {loader && <Loader />}
        </div>
      </React.StrictMode>
    </ThemeProvider>
  )
}

App.propTypes = {
  appAction: PropTypes.func,
  setAuthTokenFromLocalStorage: PropTypes.func,
  masterDataCall: PropTypes.func,
  countriesCall: PropTypes.func,
  loader: PropTypes.bool,
  fetchTenantMetadata: PropTypes.func,
  auth: PropTypes.bool,
  theme: PropTypes.string,
  fetchDashboardListCall: PropTypes.func,
}

App.defaultProps = {
  appAction: () => {},
  setAuthTokenFromLocalStorage: () => {},
  masterDataCall: () => {},
  countriesCall: () => {},
  loader: false,
  fetchTenantMetadata: () => {},
  auth: {},
  theme: themes[0].id,
  fetchDashboardListCall: () => {},
}

const mapStateToProps = (state) => ({
  loader: selectLoader(state),
  auth: selectAuth(state),
  theme: selectTheme(state),
})

export default connect(mapStateToProps, {
  appAction,
  setAuthTokenFromLocalStorage,
  masterDataCall,
  countriesCall,
  fetchTenantMetadata,
  fetchDashboardListCall,
})(App)
