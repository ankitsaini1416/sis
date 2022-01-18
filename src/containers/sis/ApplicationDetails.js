import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { messageAction } from '../../actions/app.action'
import { headerAction } from '../../actions/header.action'
import {
  countriesByOrgCall,
  ethnicityCall,
  securityQuestionsCall,
  statesCall,
} from '../../actions/masterData.action'
import { fetchMetadata } from '../../actions/metadata.action'
import { fetchSchoolByIdCall } from '../../actions/schools.action'
import ApplicationDetails from '../../components/sis/application/applicationDetails/ApplicationDetails'
import { MESSAGE_SEVERITIES } from '../../helpers/constants'
import { selectMasterData } from '../../helpers/selectors'
import { get, isEmpty } from '../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from '../../helpers/validator'
import {
  fetchApplicationDetailCall,
  updateUserCall,
  userByEmailCall,
} from './../../actions/application.action'

function ApplicationDetailsContainer({
  headerAction,
  fetchApplicationDetailCall,
  fetchSchoolByIdCall,
  userByEmailCall,
  updateUserCall,
  messageAction,
  masterData,
  ethnicityCall,
  securityQuestionsCall,
  statesCall,
  countriesByOrgCall,
  fetchMetadata,
}) {
  const { userId, schoolId } = useParams()
  const [details, setDetails] = React.useState({})
  const [school, setSchool] = React.useState([])
  const [ethnicities, setEthnicities] = React.useState([])
  const [securityQuestions, setSecurityQuestions] = React.useState([])
  const [states, setStates] = React.useState([])
  const [schooolCountries, setSchooolCountries] = React.useState([])
  const [schoolMetadata, setSchoolMetadata] = React.useState({})

  const fetchSchool = () => {
    fetchSchoolByIdCall(schoolId, (data) => {
      setSchool(data)
    })
  }

  const fetchRegisterLogDetail = function () {
    fetchApplicationDetailCall(school.sch_realm_id, userId, (registerDetails) => {
      userByEmailCall(registerDetails.email, school.sch_school_public_id, (data) => {
        setDetails({
          ...data,
          createdDate: registerDetails.createdDate,
          updatedDate: registerDetails.updatedDate,
          attributes: registerDetails.attributes,
        })
      })
    })
  }

  const editDetailAction = function (event) {
    const action = event.currentTarget.attributes['data-action'].value
    updateUserCall(
      details.email,
      school.sch_school_public_id,
      {
        ...details,
        approval_status: action,
      },
      () => {
        fetchRegisterLogDetail()
      }
    )
  }

  const fetchEthnicity = function () {
    ethnicityCall((data) => {
      setEthnicities(data)
    })
  }

  const fetchSecurityQuestions = function () {
    securityQuestionsCall((data) => {
      setSecurityQuestions(data)
    })
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
      null,
      false
    )
  }

  const searchCountries = () => {
    countriesByOrgCall(school.sch_urn, (data) => {
      setSchooolCountries(data)
    })
  }

  const searchSchoolMetadata = () => {
    fetchMetadata({ metaType: 'school', metaTypeId: school.sch_id }, (data) => {
      setSchoolMetadata(data)
    })
  }

  const editUser = (values, { setErrors, callback }) => {
    updateUserCall(
      details.email,
      school.sch_school_public_id,
      { ...details, ...values },
      () => {
        fetchRegisterLogDetail(details.email)
        callback && callback()
        messageAction({
          subTitle: 'message:editUserGeneral',
          severity: MESSAGE_SEVERITIES.SUCCESS,
        })
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')

        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorEditUserGeneral'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorEditUserGeneral',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  React.useEffect(() => {
    fetchSchool()
    fetchEthnicity()
    fetchSecurityQuestions()
  }, [])

  React.useEffect(() => {
    if (!isEmpty(school)) {
      fetchRegisterLogDetail()
      searchCountries()
      searchSchoolMetadata()
    }
  }, [school])

  React.useEffect(() => {
    const headerData = {
      activeMenuItem: 'allApplications',
      activeParent: 'allApplications',
    }
    headerAction(headerData)
  }, [])

  /**
   * renders JSX of Role container component
   * @param user
   */

  return (
    <ApplicationDetails
      details={details}
      school={school}
      editDetailAction={editDetailAction}
      editUser={editUser}
      masterData={masterData}
      ethnicities={ethnicities}
      securityQuestions={securityQuestions}
      searchStates={searchStates}
      states={states}
      schooolCountries={schooolCountries}
      schoolMetadata={schoolMetadata}
    />
  )
}

ApplicationDetailsContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchApplicationDetailCall: PropTypes.func,
  fetchSchoolByIdCall: PropTypes.func,
  userByEmailCall: PropTypes.func,
  updateUserCall: PropTypes.func,
  messageAction: PropTypes.func,
  masterData: PropTypes.object,
  ethnicityCall: PropTypes.func,
  securityQuestionsCall: PropTypes.func,
  statesCall: PropTypes.func,
  countriesByOrgCall: PropTypes.func,
  fetchMetadata: PropTypes.func,
}

ApplicationDetailsContainer.defaultProps = {
  headerAction: () => {},
  fetchApplicationDetailCall: () => {},
  fetchSchoolByIdCall: () => {},
  userByEmailCall: () => {},
  updateUserCall: () => {},
  messageAction: () => {},
  masterData: {},
  ethnicityCall: () => {},
  securityQuestionsCall: {},
  statesCall: () => {},
  countriesByOrgCall: () => {},
  fetchMetadata: () => {},
}

const mapStateToProps = (state) => ({
  masterData: selectMasterData(state),
})

/**
 *  @exports connect function of redux
 */

export default connect(mapStateToProps, {
  headerAction,
  fetchApplicationDetailCall,
  fetchSchoolByIdCall,
  userByEmailCall,
  updateUserCall,
  messageAction,
  ethnicityCall,
  securityQuestionsCall,
  statesCall,
  countriesByOrgCall,
  fetchMetadata,
})(ApplicationDetailsContainer)
