import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { useParams, useRouteMatch } from 'react-router-dom'

import localStorageService from '../api/localStorageService'
import { accountAction } from './../actions/auth.action'
// import Loader from './../components/loader/Loader'
import RouterContext from './../contexts/route.context'

/**
 * Defines a component EditTemplate
 * @returns {*}
 * @constructor
 */
function withRouteContext(WrappedComponent) {
  function WrappedEnhanced({ accountAction }) {
    const { district = '', school = '' } = useParams()
    const match = useRouteMatch()
    React.useEffect(() => {
      accountAction({ district, school })
      localStorageService.setDistrictSchool({ district, school }) // just for accessing school/district out of context places.
    }, [])
    return (
      <RouterContext.Provider value={{ params: { district, school }, match }}>
        <WrappedComponent />
      </RouterContext.Provider>
    )
  }
  WrappedEnhanced.propTypes = {
    accountAction: PropTypes.func,
  }

  const mapStateToProps = () => ({})

  return connect(mapStateToProps, { accountAction })(WrappedEnhanced)
}

export default withRouteContext
