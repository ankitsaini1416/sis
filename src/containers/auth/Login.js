import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import localStorageService from '../../api/localStorageService'
import Login from '../../components/auth/Login'
import Loader from '../../components/loader/Loader'
import { messageAction } from './../../actions/app.action'
import { redirectToLogin } from './../../actions/auth.action'
import RouterContext from './../../contexts/route.context'
import { ADMIN_TYPES, ROUTES } from './../../helpers/constants'
import { selectAdminType, selectAuth, selectDashboards } from './../../helpers/selectors'
import { getQueryData, getSchoolUrl } from './../../helpers/utils'
import withRouteContext from './../../hocs/RouterContextHOC'

function LoginContainer({ auth, adminType, redirectToLogin, dashboards }) {
  const { params } = useContext(RouterContext)
  const [showAccountIdPage, setShowAccountIdPage] = React.useState(false)
  const { code } = getQueryData()
  /**
   * renders JSX of login component
   * @param user
   */

  const redirect = (accountId) => {
    redirectToLogin(params, accountId)
  }

  const login = function (accountId) {
    redirect(accountId)
  }
  React.useEffect(() => {
    if (auth.isLoggedIn) {
      return
    }
    if (adminType && adminType === ADMIN_TYPES.MASTER_ADMIN) {
      setShowAccountIdPage(true)
    } else if (adminType && adminType !== ADMIN_TYPES.MASTER_ADMIN) {
      const authData = localStorageService.getAccessToken() || {}
      redirect(authData.accountId)
    }
  }, [auth.isLoggedIn, adminType])
  // TODO: remove this redirection from here to App.js coz login route will not hit in case direct internal routes are used.
  if (auth.isLoggedIn && dashboards.isLoaded) {
    const { lms_sync_school_id, step, lmsId } = localStorageService.getLmsObject('lmsObject')
    if (lms_sync_school_id) {
      if (!code) {
        localStorageService.clearLmsObject('lmsObject')
      }
      const orgInfo = localStorageService.getDistrictSchool()
      return (
        <Redirect
          to={`${getSchoolUrl({
            ...orgInfo,
            to: `${ROUTES.EDITSCHOOL}/${lms_sync_school_id}`,
          })}?step=${step}&lmsId=${lmsId}&code=${code}`}
        />
      )
    }
    if (dashboards?.dashboards?.length) {
      return (
        <Redirect
          to={getSchoolUrl({
            ...params,
            to: `${ROUTES.DASHBOARD}/${dashboards?.dashboards[0].id}`,
          })}
        />
      )
    }
    return <Redirect to={getSchoolUrl({ ...params, to: ROUTES.DASHBOARDLIST })} />
  }
  return showAccountIdPage ? <Login login={login} adminType={adminType} /> : <Loader />
}

LoginContainer.propTypes = {
  auth: PropTypes.object,
  messageAction: PropTypes.func,
  adminType: PropTypes.string,
  redirectToLogin: PropTypes.func,
  dashboards: [],
}

LoginContainer.defaultProps = {
  auth: {},
  messageAction: () => {},
  adminType: {},
  redirectToLogin: () => {},
  dashboards: [],
}

const mapStateToProps = (state) => ({
  auth: selectAuth(state),
  adminType: selectAdminType(state),
  dashboards: selectDashboards(state),
})

/**
 *  @exports connect function of redux
 */
export default withRouteContext(
  connect(mapStateToProps, { messageAction, redirectToLogin })(LoginContainer)
)
