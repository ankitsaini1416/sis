import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import { messageAction } from '../../actions/app.action'
import { fetchDistrictsCall } from '../../actions/district.action'
import { headerAction } from '../../actions/header.action'
import { fetchInstituteDistrictsCall } from '../../actions/InstituteDistrict.action'
import {
  addProgramFee,
  createProgram,
  createTranscripts,
  fetchProgramCategory,
  fetchProgramTemplate,
  fetchTranscript,
} from '../../actions/program.action'
import { fetchSchoolsCall } from '../../actions/schools.action'
import AddProgram from '../../components/sis/programs/addProgram/AddProgram'
import { MESSAGE_SEVERITIES } from '../../helpers/constants'
import { isEmpty } from '../../helpers/utils'
import { get } from '../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from '../../helpers/validator'

function AddProgramContainer({
  headerAction,
  createProgram,
  fetchDistrictsCall,
  fetchInstituteDistrictsCall,
  fetchSchoolsCall,
  fetchProgramCategory,
  createTranscripts,
  fetchTranscript,
  fetchProgramTemplate,
  addProgramFee,
}) {
  const [activeStep, setActiveStep] = React.useState(0)
  const [districts, setDistricts] = React.useState([])
  const [schools, setSchools] = React.useState([])
  const [programsCategory, setProgramsCategory] = React.useState([])
  const [programsTemplate, setProgramsTemplate] = React.useState([])
  const [program, setProgram] = React.useState({})
  const [transcripts, setTranscripts] = React.useState([])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleReset = () => {
    setActiveStep(0)
  }

  const addProgram = (values, { setErrors }) => {
    createProgram(
      values,
      (data) => {
        setProgram(data)
        fetchTranscript(data.pgm_school_id, (records) => {
          setTranscripts(records)
        })
        handleNext()
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          const splitted = error.split(':')
          messageAction({
            subTitle: mapGeneralErrors(splitted[0], 'error:errorRegisterUserGeneral'),
            severity: MESSAGE_SEVERITIES.ERROR,
            subTitleProps: {
              count: splitted[1],
            },
          })
        } else {
          messageAction({
            subTitle: 'error:errorRegisterUserGeneral',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }
  const fetchSchool = function (districtId) {
    if (!districtId) {
      return
    }
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
  const fetchDistricts = function (q) {
    fetchDistrictsCall(
      {
        q,
        per_page: 1000,
        is_active: '',
        current_page: 1,
      },
      (records) => {
        setDistricts(get(records, 'content', []))
      },
      null,
      false
    )
  }
  const fetchInstituteDistricts = function (q) {
    fetchInstituteDistrictsCall(
      {
        q,
        per_page: 1000,
        is_active: '',
        current_page: 1,
      },
      (records) => {
        setDistricts(get(records, 'content', []))
      },
      null,
      false
    )
  }

  const getProgramsCategory = function (schoolId) {
    const pageDetails = {
      q: '',
      per_page: '',
      page: '',
    }
    fetchProgramCategory(
      get(
        schools.find((sch) => sch.sch_id === schoolId),
        'sch_id',
        ''
      ),
      { ...pageDetails },
      (records) => {
        setProgramsCategory(records)
      }
    )
  }
  const getProgramTemplate = function (schoolId) {
    fetchProgramTemplate(
      get(
        schools.find((sch) => sch.sch_id === schoolId),
        'sch_id',
        ''
      ),
      (records) => {
        setProgramsTemplate(records)
      }
    )
  }
  const addTranscripts = (values, { setErrors }) => {
    createTranscripts(
      program.pgm_id,
      values,
      () => {
        handleNext()
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorAddTranscripts'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorAddTranscripts',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }
  const addProgramFees = (values, { setErrors }) => {
    addProgramFee(
      program.pgm_id,
      values,
      () => {
        handleNext()
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorAddProgramFee'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorAddProgramFee',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }
  React.useEffect(() => {
    const headerData = {
      activeMenuItem: 'allPrograms',
      activeParent: 'programs',
    }
    headerAction(headerData)
  }, [])
  React.useEffect(() => {
    fetchDistricts()
  }, [])
  React.useEffect(() => {
    const headerData = {
      activeMenuItem: 'allPrograms',
      activeParent: 'programs',
    }
    headerAction(headerData)
  }, [])
  React.useEffect(() => {
    fetchInstituteDistricts()
  }, [])

  /**
   * renders JSX of Add Programs container
   * @param AddPrograms
   */
  return (
    <AddProgram
      addProgram={addProgram}
      activeStep={activeStep}
      handleNext={handleNext}
      handleBack={handleBack}
      handleReset={handleReset}
      districts={districts}
      fetchSchool={fetchSchool}
      getProgramsCategory={getProgramsCategory}
      schools={schools}
      programsCategory={programsCategory}
      addTranscripts={addTranscripts}
      transcripts={transcripts}
      getProgramTemplate={getProgramTemplate}
      programsTemplate={programsTemplate}
      addProgramFees={addProgramFees}
      program={program}
    />
  )
}

AddProgramContainer.propTypes = {
  headerAction: PropTypes.func,
  createProgram: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchInstituteDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  fetchProgramCategory: PropTypes.func,
  createTranscripts: PropTypes.func,
  fetchTranscript: PropTypes.func,
  fetchProgramTemplate: PropTypes.func,
  addProgramFee: PropTypes.func,
}

AddProgramContainer.defaultProps = {
  headerAction: () => {},
  createProgram: () => {},
  fetchDistrictsCall: () => {},
  fetchInstituteDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
  fetchProgramCategory: () => {},
  createTranscripts: () => {},
  fetchTranscript: () => {},
  fetchProgramTemplate: () => {},
  addProgramFee: () => {},
}
const mapStateToProps = () => ({})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  createProgram,
  fetchDistrictsCall,
  fetchInstituteDistrictsCall,
  fetchSchoolsCall,
  fetchProgramCategory,
  createTranscripts,
  fetchTranscript,
  fetchProgramTemplate,
  addProgramFee,
})(AddProgramContainer)
