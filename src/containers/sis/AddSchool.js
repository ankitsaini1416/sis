import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { headerAction } from '../../actions/header.action'
import AddSchool from '../../components/sis/organizations/schools/AddSchool'
import { messageAction } from './../../actions/app.action'
import { fetchDistrictsCall } from './../../actions/district.action'
import { fetchInstituteDistrictsCall } from './../../actions/InstituteDistrict.action'
import { statesCall } from './../../actions/masterData.action'
import { addSchoolCall } from './../../actions/schools.action'
import { MESSAGE_SEVERITIES } from './../../helpers/constants'
import { selectMasterData } from './../../helpers/selectors'
import { get, isEmpty } from './../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from './../../helpers/validator'

let districtListTimer = null

function AddSchoolContainer({
  headerAction,
  masterData,
  addSchoolCall,
  messageAction,
  fetchDistrictsCall,
  fetchInstituteDistrictsCall,
  statesCall,
}) {
  const [districts, setDistricts] = useState([])
  const [states, setStates] = useState([])
  const history = useHistory()
  React.useEffect(() => {
    const headerData = {
      activeMenuItem: 'schools',
      activeParent: 'organizations',
    }
    headerAction(headerData)
  }, [])
  const addSchool = (values, { setErrors }) => {
    addSchoolCall(
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
          const splitted = error.split(':')
          messageAction({
            subTitle: mapGeneralErrors(splitted[0], 'error:errorAddSchoolGeneral'),
            severity: MESSAGE_SEVERITIES.ERROR,
            subTitleProps: {
              count: splitted[1],
            },
          })
        } else {
          messageAction({
            subTitle: 'error:errorAddSchoolGeneral',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const getDistricts = () => {
    fetchDistrictsCall(
      {
        q: '',
        per_page: 1000,
        is_active: '',
      },
      (records) => {
        setDistricts(get(records, 'content', []))
      },
      null,
      false
    )
  }
  const getInstituteDistricts = () => {
    fetchInstituteDistrictsCall(
      {
        q: '',
        per_page: 1000,
        is_active: '',
      },
      (records) => {
        setDistricts(get(records, 'content', []))
      },
      null,
      false
    )
  }

  const searchStates = (countryCode) => {
    statesCall(
      countryCode,
      {
        q: '',
        sort_by: '',
        sort_order: '',
        page: 1,
        per_page: 1000,
        is_active: '',
      },
      (records) => {
        setStates(get(records, 'content', []))
      },
      null
    )
  }

  useEffect(() => {
    return () => {
      clearTimeout(districtListTimer)
    }
  })

  useEffect(() => {
    getDistricts()
  }, [])
  useEffect(() => {
    return () => {
      clearTimeout(districtListTimer)
    }
  })

  useEffect(() => {
    getInstituteDistricts()
  }, [])

  /**
   * renders JSX of Add District container component
   * @param user
   */
  return (
    <AddSchool
      masterData={masterData}
      addSchool={addSchool}
      districts={districts}
      states={states}
      searchStates={searchStates}
    />
  )
}

AddSchoolContainer.propTypes = {
  headerAction: PropTypes.func,
  masterData: PropTypes.object,
  addSchoolCall: PropTypes.func,
  messageAction: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchInstituteDistrictsCall: PropTypes.func,
  statesCall: PropTypes.func,
}

AddSchoolContainer.defaultProps = {
  headerAction: () => {},
  masterData: {},
  addSchoolCall: () => {},
  messageAction: () => {},
  fetchDistrictsCall: () => {},
  fetchInstituteDistrictsCall: () => {},
  statesCall: () => {},
}

const mapStateToProps = (state) => ({
  masterData: selectMasterData(state),
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  addSchoolCall,
  messageAction,
  fetchDistrictsCall,
  fetchInstituteDistrictsCall,
  statesCall,
})(AddSchoolContainer)
