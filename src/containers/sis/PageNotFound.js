import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import { headerAction } from '../../actions/header.action'
import PageNotFound from '../../components/sis/PageNotFound'

function PageNotFoundContainer({ headerAction }) {
  React.useEffect(() => {
    const headerData = { activeMenuItem: '', activeParent: '' }
    headerAction(headerData)
  }, [])
  /**
   * renders JSX of Page Not Found container component
   * @param user
   */
  return <PageNotFound />
}

PageNotFoundContainer.propTypes = {
  headerAction: PropTypes.func,
}

PageNotFoundContainer.defaultProps = {
  headerAction: () => {},
}
const mapStateToProps = () => ({})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
})(PageNotFoundContainer)
