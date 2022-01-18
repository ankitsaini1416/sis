import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { getSchoolUrl } from '../helpers/utils'
import RouterContext from './../contexts/route.context'

/**
 * Defines a component EditTemplate
 * @returns {*}
 * @constructor
 */
function withRedirect(WrappedComponent) {
  function WrappedEnhanced(props) {
    const { params } = useContext(RouterContext)
    const history = useHistory()
    const url = getSchoolUrl({ ...params, to: props.to })
    return (
      <WrappedComponent
        {...props}
        onClick={() => {
          props.preCallHandler()
          history.push({
            pathname: url,
            state: props.state,
          })
        }}
      />
    )
  }
  WrappedEnhanced.propTypes = {
    to: PropTypes.string,
    state: PropTypes.object,
    preCallHandler: PropTypes.func,
  }
  WrappedEnhanced.defaultProps = {
    to: '',
    state: {},
    preCallHandler: () => {},
  }
  return WrappedEnhanced
}

export default withRedirect
