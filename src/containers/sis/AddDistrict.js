import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { headerAction } from '../../actions/header.action'
import AddDistrict from '../../components/sis/organizations/districts/AddDistrict'
import { messageAction } from './../../actions/app.action'
import { addDistrictCall } from './../../actions/district.action'
import { MESSAGE_SEVERITIES } from './../../helpers/constants'
import { selectMasterData } from './../../helpers/selectors'
import { get, isEmpty } from './../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from './../../helpers/validator'

function AddDistrictContainer({ headerAction, masterData, addDistrictCall, messageAction }) {
  const history = useHistory()
  React.useEffect(() => {
    const headerData = {
      activeMenuItem: 'districts',
      activeParent: 'organizations',
    }
    headerAction(headerData)
  }, [])

  const addDistrict = (values, { setErrors }) => {
    addDistrictCall(
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
  return <AddDistrict masterData={masterData} addDistrict={addDistrict} />
}

AddDistrictContainer.propTypes = {
  headerAction: PropTypes.func,
  masterData: PropTypes.object,
  addDistrictCall: PropTypes.func,
  messageAction: PropTypes.func,
}

AddDistrictContainer.defaultProps = {
  headerAction: () => {},
  masterData: {},
  addDistrictCall: () => {},
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
  addDistrictCall,
  messageAction,
})(AddDistrictContainer)
