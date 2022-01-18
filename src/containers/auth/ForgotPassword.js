import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import ForgotPassword from '../../components/auth/ForgotPassword'
import { messageAction } from './../../actions/app.action'
import { forgotPasswordCall } from './../../actions/auth.action'
import { MESSAGE_SEVERITIES } from './../../helpers/constants'
import { get, isEmpty } from './../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from './../../helpers/validator'
import withRouteContext from './../../hocs/RouterContextHOC'

function ForgotPasswordContainer({ forgotPasswordCall, messageAction }) {
  /**
   * renders JSX of Forgot Password component
   * @param user
   */
  const forgotPassword = function (values, { setErrors }) {
    forgotPasswordCall(values, null, (err) => {
      const errors = get(err, 'response.data.field_errors', {})
      const error = get(err, 'response.data.code', '')
      if (!isEmpty(errors)) {
        setErrors(mapFieldErrors(errors))
      } else if (!isEmpty(error)) {
        messageAction({
          subTitle: mapGeneralErrors(error, 'error:errorLoginGeneral'),
          severity: MESSAGE_SEVERITIES.ERROR,
        })
      } else {
        messageAction({
          subTitle: 'error:errorLoginGeneral',
          severity: MESSAGE_SEVERITIES.ERROR,
        })
      }
    })
  }
  return <ForgotPassword forgotPassword={forgotPassword} />
}

ForgotPasswordContainer.propTypes = {
  forgotPasswordCall: PropTypes.func,
  messageAction: PropTypes.func,
}

ForgotPasswordContainer.defaultProps = {
  forgotPasswordCall: () => {},
  messageAction: () => {},
}
const mapStateToProps = () => ({})
/**
 *  @exports connect function of redux
 */
export default withRouteContext(
  connect(mapStateToProps, { forgotPasswordCall, messageAction })(ForgotPasswordContainer)
)
