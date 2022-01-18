import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

import { headerAction } from '../../actions/header.action'
import { editSubjectCall, fetchSubjectByIdCall } from '../../actions/subject.action'
import EditSubject from '../../components/sis/programs/subjects/EditSubject'
import { messageAction } from './../../actions/app.action'
import { MESSAGE_SEVERITIES } from './../../helpers/constants'
import { get, isEmpty } from './../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from './../../helpers/validator'

function EditSubjectContainer({ headerAction, editSubjectCall, fetchSubjectByIdCall }) {
  const initialState = {
    sub_name: '',
    sub_code: '',
    sub_district_id: '',
    sub_school_id: '',
  }

  const history = useHistory()
  const { subjectId } = useParams()
  const [subject, setSubject] = useState({})
  const [formState, setFormState] = useState({ ...initialState })

  useEffect(() => {
    const headerData = {
      activeMenuItem: 'allSubjects',
      activeParent: 'programs',
    }
    headerAction(headerData)
    fetchSubjectDetail()
  }, [])

  function fetchSubjectDetail() {
    fetchSubjectByIdCall(subjectId, (data) => {
      setFormState({
        sub_name: data.sub_name,
        sub_code: data.sub_code,
        sub_district_id: data.sub_school.sch_district.dst_name,
        sub_school_id: data.sub_school.sch_name,
      })
      setSubject(data)
    })
  }

  const editSubject = (id, values, { setErrors }) => {
    editSubjectCall(
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
            subTitle: mapGeneralErrors(error, 'error:errorEditSubjectGeneral'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorEditSubjectGeneral',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  /**
   * renders JSX of Edit Subject container component
   * @param user
   */
  return <EditSubject editSubject={editSubject} subject={subject} formState={formState} />
}

EditSubjectContainer.propTypes = {
  headerAction: PropTypes.func,
  editSubjectCall: PropTypes.func,
  fetchSubjectByIdCall: PropTypes.func,
}

EditSubjectContainer.defaultProps = {
  headerAction: () => {},
  editSubjectCall: () => {},
  fetchSubjectByIdCall: () => {},
}

const mapStateToProps = () => ({})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  editSubjectCall,
  fetchSubjectByIdCall,
})(EditSubjectContainer)
