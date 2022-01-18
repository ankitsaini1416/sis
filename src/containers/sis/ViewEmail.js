import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import { headerAction } from '../../actions/header.action'
import ViewEmail from '../../components/sis/settings/emails/ViewEmail'

function ViewEmailContainer({ headerAction }) {
  React.useEffect(() => {
    const headerData = { activeMenuItem: 'emails', activeParent: 'settings' }
    headerAction(headerData)
  }, [])
  /**
   * renders JSX of Edit User container component
   * @param user
   */
  return <ViewEmail />
}

ViewEmailContainer.propTypes = {
  headerAction: PropTypes.func,
}

ViewEmailContainer.defaultProps = {
  headerAction: () => {},
}
const mapStateToProps = () => ({})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
})(ViewEmailContainer)
