import React from 'react'
import { connect } from 'react-redux'

import PasswordReset from '../../components/auth/PasswordReset'
import withRouteContext from './../../hocs/RouterContextHOC'

function PasswordResetContainer() {
  /**
   * renders JSX of Password Reset component
   * @param user
   */
  return <PasswordReset />
}

PasswordResetContainer.propTypes = {}

PasswordResetContainer.defaultProps = {}

/**
 *  @exports connect function of redux
 */
export default withRouteContext(connect()(PasswordResetContainer))
