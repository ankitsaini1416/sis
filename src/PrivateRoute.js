import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

import RouterContext from './contexts/route.context'
import { ROUTES } from './helpers/constants'
import { selectAuth } from './helpers/selectors'
import { getSchoolUrl } from './helpers/utils'

//import Loader from './components/loader/Loader'

const PrivateRoute = (props) => {
  //const [dataLoaded, setDataLoaded] = React.useState(false)
  const { children, path, render, exact, auth } = props
  const { params } = useContext(RouterContext)

  /*useEffect(() => {
    setDataLoaded(true)
  }, [props])

  if (!dataLoaded) {
    return <Loader />
  }
*/
  if (!auth.isLoggedIn) {
    return <Redirect to={getSchoolUrl({ ...params, to: ROUTES.LOGIN })} />
  }

  return (
    <Route exact={exact} path={path} render={render}>
      {children}
    </Route>
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.element,
  path: PropTypes.string,
  render: PropTypes.func,
  exact: PropTypes.bool,
  auth: PropTypes.object,
}

PrivateRoute.defaultProps = {
  children: null,
  path: '',
  render: () => {},
  exact: false,
  auth: {},
}

const mapStateToPros = (state) => ({
  auth: selectAuth(state),
})

export default connect(mapStateToPros)(PrivateRoute)
