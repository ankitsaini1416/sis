import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { headerAction } from '../../actions/header.action'
import AddDistrictInstitute from '../../components/sis/institute/districts/AddDistrictInstitute'
import { messageAction } from './../../actions/app.action'
import { addInstituteDistrictCall } from './../../actions/InstituteDistrict.action'
import { MESSAGE_SEVERITIES } from './../../helpers/constants'
import { selectMasterData } from './../../helpers/selectors'
import { get, isEmpty } from './../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from './../../helpers/validator'

function AddDistrictContainer({
  headerAction,
  masterData,
  addInstituteDistrictCall,
  messageAction,
}) {
  const history = useHistory()
  React.useEffect(() => {
    const headerData = {
      activeMenuItem: 'districts',
      activeParent: 'institute',
    }
    headerAction(headerData)
  }, [])

  const addDistrict = (values, { setErrors }) => {
    addInstituteDistrictCall(
      values,
      () => {
        history.goBack()
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')

        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorAddDistrictGeneral'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorAddDistrictGeneral',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }
  /**
   * renders JSX of Add District container component
   * @param user
   */
  return <AddDistrictInstitute masterData={masterData} addDistrict={addDistrict} />
}

AddDistrictContainer.propTypes = {
  headerAction: PropTypes.func,
  masterData: PropTypes.object,
  addInstituteDistrictCall: PropTypes.func,
  messageAction: PropTypes.func,
}

AddDistrictContainer.defaultProps = {
  headerAction: () => {},
  masterData: {},
  addInstituteDistrictCall: () => {},
  messageAction: () => {},
}
const mapStateToProps = (state) => ({
  masterData: selectMasterData(state),
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  addInstituteDistrictCall,
  messageAction,
})(AddDistrictContainer)
