import IconButton from '@material-ui/core/IconButton'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import PropTypes from 'prop-types'
import React from 'react'
import { AlertCircle, AlertTriangle, Check, Info, X } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import { messageAction } from './../../actions/app.action'
import { selectMessage } from './../../helpers/selectors'
import { isEmpty } from './../../helpers/utils'
import useStyles from './Message.style'

let timer = null

Message.defaultProps = {
  messageAction: () => {},
  message: {},
}

Message.propTypes = {
  messageAction: PropTypes.func,
  children: PropTypes.element,
  message: PropTypes.object,
}

/**
 * Defines a component Confirmation
 * @param props
 * @returns {*}
 * @constructor
 */
function Message(props) {
  const classes = useStyles()
  const { t } = useTranslation()
  const { messageAction, message } = props
  const onClose = function () {
    clearTimeout(timer)
    timer = null
    messageAction({})
  }
  React.useEffect(() => {
    if (!isEmpty(message)) {
      timer = setTimeout(() => {
        onClose()
      }, message.timeout || 10000)
    }
  }, [message])
  /**
   * renders JSX of Confirmation component
   */
  return (
    <Alert
      className={classes.customAlert + ' custom-alert'}
      style={{
        visibility: isEmpty(message) ? 'collapse' : 'visible',
      }}
      action={
        <IconButton onClick={onClose} color="inherit" size="small">
          <X />
        </IconButton>
      }
      onClose={onClose}
      severity={message.severity || 'error'}
      iconMapping={{
        error: <AlertCircle fontSize="inherit" />,
        warning: <AlertTriangle fontSize="inherit" />,
        info: <Info fontSize="inherit" />,
        success: <Check fontSize="inherit" />,
      }}
    >
      {!isEmpty(message.title) && (
        <AlertTitle>{t(message.title || '', message.titleProps || {})}</AlertTitle>
      )}
      {t(message.subTitle || '', message.subTitleProps || {})}
    </Alert>
  )
}

const mapStateToProps = (state) => ({
  message: selectMessage(state),
})

/**
 * @exports Message component
 */
export default connect(mapStateToProps, {
  messageAction,
})(Message)
