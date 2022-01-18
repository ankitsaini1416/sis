import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import { headerAction } from '../../actions/header.action'
import AddEditLMS from '../../components/sis/organizations/schools/editSchool/AddEditLMS'

function AddEditLMSContainer({ headerAction }) {
  React.useEffect(() => {
    const headerData = {
      activeMenuItem: 'schools',
      activeParent: 'organizations',
    }
    headerAction(headerData)
  }, [])

  /**
   * renders JSX of Add Edit LMS Configuration container component
   * @param user
   */
  return <AddEditLMS />
}

AddEditLMSContainer.propTypes = {
  headerAction: PropTypes.func,
}

AddEditLMSContainer.defaultProps = {
  headerAction: () => {},
}
const mapStateToProps = () => ({})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
})(AddEditLMSContainer)
