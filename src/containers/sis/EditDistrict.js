import '../../assets/styles/CountryCode.scss'

import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { headerAction } from '../../actions/header.action'
import EditDistrict from '../../components/sis/organizations/districts/EditDistrict'
import { messageAction } from './../../actions/app.action'
import {
  editDistrictCall,
  fetchDistrictByIdCall,
  uploadDistrictLogoCall,
} from './../../actions/district.action'
import { MESSAGE_SEVERITIES } from './../../helpers/constants'
import { selectMasterData } from './../../helpers/selectors'
import { get, isEmpty, mapWithState } from './../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from './../../helpers/validator'

const usPhoneCode = '1'
const initialState = {
  dst_category: '',
  dst_is_active: true,
  dst_name: '',
  dst_organization: '',
  dst_contact_person: '',
  dst_contact_email: '',
  dst_phone_prefix: usPhoneCode,
  dst_phone: '',
  dst_type: '',
  dst_description: '',
  dst_slug: '',
  dst_website: '',
  dst_school_count: 1,
}

function EditDistrictContainer({
  headerAction,
  masterData,
  editDistrictCall,
  messageAction,
  fetchDistrictByIdCall,
  uploadDistrictLogoCall,
}) {
  const { districtId } = useParams()
  const history = useHistory()
  const [district, setDistrict] = useState({})
  const [formState, setFormState] = useState({ ...initialState })
  const editDistrict = (id, values, { setErrors }) => {
    editDistrictCall(
      id,
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
            subTitle: mapGeneralErrors(error, 'error:errorEditDistrictGeneral'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorEditDistrictGeneral',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }
  const editLogo = (file) => {
    uploadDistrictLogoCall(
      district.id,
      file,
      () => {},
      (err) => {
        const error = get(err, 'response.data.field_errors', {})
        const splitted = error?.dst_logo[0].split(':')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(splitted[0], 'error:editLogo'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:editLogo',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }
  useEffect(() => {
    const headerData = {
      activeMenuItem: 'districts',
      activeParent: 'organizations',
    }
    headerAction(headerData)
  }, [])

  useEffect(() => {
    fetchDistrictByIdCall(districtId, (data) => {
      setFormState(mapWithState(initialState, data))
      setDistrict(data)
    })
  }, [])
  /**
   * renders JSX of Edit User container component
   * @param user
   */
  return (
    <EditDistrict
      formState={formState}
      masterData={masterData}
      district={district}
      editDistrict={editDistrict}
      editLogo={editLogo}
    />
  )
}

EditDistrictContainer.propTypes = {
  headerAction: PropTypes.func,
  masterData: PropTypes.object,
  editDistrictCall: PropTypes.func,
  messageAction: PropTypes.func,
  fetchDistrictByIdCall: PropTypes.func,
  uploadDistrictLogoCall: PropTypes.func,
}

EditDistrictContainer.defaultProps = {
  headerAction: () => {},
  masterData: {},
  editDistrictCall: () => {},
  messageAction: () => {},
  fetchDistrictByIdCall: () => {},
  uploadDistrictLogoCall: () => {},
}

const mapStateToProps = (state) => ({
  masterData: selectMasterData(state),
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  editDistrictCall,
  messageAction,
  fetchDistrictByIdCall,
  uploadDistrictLogoCall,
})(EditDistrictContainer)
