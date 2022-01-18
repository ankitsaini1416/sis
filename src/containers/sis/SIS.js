import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import PropTypes from 'prop-types'
import React, { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import { headerAction } from '../../actions/header.action'
import Header from '../../components/header/Header'
import { MenuItems } from '../../components/sis/MenuItems'
import { ROUTES } from '../../helpers/constants'
import { getSchoolUrl, isEmpty } from '../../helpers/utils'
import Loader from './../../components/loader/Loader'
import RouterContext from './../../contexts/route.context'
import { selectDashboards, selectUser } from './../../helpers/selectors'
import withRouteContext from './../../hocs/RouterContextHOC'
import Routes from './Routes'
import useStyles from './SIS.Style'

// const filterMenuItems = function (menu, authUser) {
//   let leftMenu = [...menu]
//   if (!authUser.isAdmin) {
//     leftMenu[0].data = leftMenu[0].data.filter((item) => item.id !== 'administration')
//   }
//   return leftMenu
// }

/**
 *  Defines a component SIS
 * @returns {*}
 * @constructor
 */
function SIS({ headerAction, authUser, dashboards }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const routeParams = useContext(RouterContext)

  useEffect(() => {
    const menuitems = MenuItems(routeParams, authUser)
    if (dashboards.length) {
      menuitems.forEach((item) => {
        if (item.id === 'dashboard') {
          item.showRoot = true
          if (dashboards.length) {
            item.data.unshift(
              ...dashboards.map((dashboard) => ({
                url: getSchoolUrl({ ...routeParams, to: `${ROUTES.DASHBOARD}/${dashboard.id}` }),
                name: dashboard.name,
                id: dashboard.id,
                className: 'menuLink1',
                showRoot: true,
              }))
            )
          }
        }
      })
    }
    const headerData = {
      pageTitle: t('SIS'),
      sideBar: true,
      listItems: menuitems,
      isSideBarOpen: true,
      heading: '',
    }
    headerAction(headerData)
  }, [authUser, dashboards])

  if (isEmpty(authUser)) {
    return <Loader />
  }

  /**
   * renders JSX of SIS component
   */
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <Routes authUser={authUser} />
        </Container>
      </main>
    </div>
  )
}

/**
 * @export SIS
 */
SIS.propTypes = {
  headerAction: PropTypes.func,
  authUser: PropTypes.object,
  dashboards: PropTypes.array,
}

SIS.defaultProps = {
  headerAction: () => {},
  authUser: {},
  dashboards: [],
}

/**
 *  Defines state isLoggedIn
 * @param store
 * @returns {{isLoggedIn: boolean}}
 */

const mapStateToProps = (state) => ({
  authUser: selectUser(state),
  dashboards: selectDashboards(state)?.dashboards || [],
})

/**
 *  @exports connect function of redux
 */
export default withRouteContext(
  connect(mapStateToProps, {
    headerAction,
  })(SIS)
)
