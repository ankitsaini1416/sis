import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { CoreSchema } from '../../../clientFiles/validations'
import { fetchDistrictsCall } from '../../actions/district.action'
import { headerAction } from '../../actions/header.action'
import { fetchInstituteDistrictsCall } from '../../actions/InstituteDistrict.action'
import { fetchSchoolsCall } from '../../actions/schools.action'
import AddTranScript from '../../components/sis/tranScript/AddTranScript'
import { messageAction } from './../../actions/app.action'
import { addTranscriptCall } from './../../actions/transcript.action'
import { MESSAGE_SEVERITIES } from './../../helpers/constants'
import { selectApp, selectMasterData } from './../../helpers/selectors'
import { get, isEmpty } from './../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from './../../helpers/validator'

function AddTranScriptContainer({
  headerAction,
  addTranscriptCall,
  messageAction,
  fetchDistrictsCall,
  fetchInstituteDistrictsCall,
  fetchSchoolsCall,
  masterData,
  app,
}) {
  const history = useHistory()
  const [districts, setDistricts] = useState([])
  const [schools, setSchools] = useState([])

  const getDitricts = () => {
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
  const getInstituteDitricts = () => {
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

  const getSchools = function (districtId) {
    fetchSchoolsCall(
      {
        q: '',
        current_page: 1,
        per_page: 1000,
        is_active: '',
        districtId: districtId,
      },
      (data) => {
        const { content } = data
        setSchools(content)
      },
      null,
      false
    )
  }

  const addTranscript = (values, { setErrors }) => {
    CoreSchema.addTranscript
      .validate(values, { abortEarly: false })
      .then(() => {
        addTranscriptCall(
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
                subTitle: mapGeneralErrors(error, 'error:errorAddTranscriptGeneral'),
                severity: MESSAGE_SEVERITIES.ERROR,
              })
            } else {
              messageAction({
                subTitle: 'error:errorAddTranscriptGeneral',
                severity: MESSAGE_SEVERITIES.ERROR,
              })
            }
          }
        )
      })
      .catch((err) => {
        const errors = Array.from(err.inner || []).reduce((val, curr) => {
          val[curr.path] = curr.message
          return val
        }, {})
        setErrors(errors)
      })
  }

  useEffect(() => {
    const headerData = {
      activeMenuItem: 'tranScript',
      activeParent: 'tranScript',
    }
    headerAction(headerData)
  }, [])
  useEffect(() => {
    getDitricts()
  }, [])
  useEffect(() => {
    const headerData = {
      activeMenuItem: 'tranScript',
      activeParent: 'tranScript',
    }
    headerAction(headerData)
  }, [])
  useEffect(() => {
    getInstituteDitricts()
  }, [])

  /**
   * renders JSX of Add Transcript container component
   * @param AddTranScript
   */
  return (
    <AddTranScript
      addTranscript={addTranscript}
      getSchools={getSchools}
      districts={districts}
      schools={schools}
      masterData={masterData}
      app={app}
    />
  )
}

AddTranScriptContainer.propTypes = {
  headerAction: PropTypes.func,
  addTranscriptCall: PropTypes.func,
  messageAction: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchInstituteDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  masterData: PropTypes.object,
  app: PropTypes.object,
}

AddTranScriptContainer.defaultProps = {
  headerAction: () => {},
  addTranscriptCall: () => {},
  messageAction: () => {},
  fetchDistrictsCall: () => {},
  fetchInstituteDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
  masterData: {},
  app: {},
}

const mapStateToProps = (state) => ({
  masterData: selectMasterData(state),
  app: selectApp(state),
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  addTranscriptCall,
  messageAction,
  fetchDistrictsCall,
  fetchInstituteDistrictsCall,
  fetchSchoolsCall,
})(AddTranScriptContainer)
