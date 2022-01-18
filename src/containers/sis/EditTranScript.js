import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

import { headerAction } from '../../actions/header.action'
import { editTranscriptCall, fetchTranscriptByIdCall } from '../../actions/transcript.action'
import EditTranScript from '../../components/sis/tranScript/EditTranScript'
import { messageAction } from './../../actions/app.action'
import { MESSAGE_SEVERITIES } from './../../helpers/constants'
import { selectApp, selectMasterData } from './../../helpers/selectors'
import { get, isEmpty } from './../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from './../../helpers/validator'

function EditTranScriptContainer({
  headerAction,
  fetchTranscriptByIdCall,
  editTranscriptCall,
  masterData,
  app,
}) {
  const initialState = {
    tt_district_id: null,
    tt_school_id: null,
    tt_template_name: '',
    tt_content: '',
    tt_layout: '',
    tt_is_active: true,
  }
  const { transcriptId } = useParams()
  const history = useHistory()

  const [transcript, setTranscript] = useState({})
  const [formState, setFormState] = useState({ ...initialState })

  useEffect(() => {
    const headerData = {
      activeMenuItem: 'tranScript',
      activeParent: 'tranScript',
    }
    headerAction(headerData)
    fetchTranscriptDetail()
  }, [])

  function fetchTranscriptDetail() {
    fetchTranscriptByIdCall(transcriptId, (data) => {
      setFormState({
        tt_template_name: data.tt_template_name,
        tt_content: data.tt_content,
        tt_layout: data.tt_layout,
        tt_is_active: data.tt_is_active,
        tt_district_name: data?.tt_school?.sch_district?.dst_name,
        tt_district_id: data?.tt_school?.sch_district?.dst_id,
        tt_school_id: data?.tt_school?.sch_id,
        tt_school_name: data?.tt_school?.sch_name,
      })
      setTranscript(data)
    })
  }

  const editTranscript = (id, values, { setErrors }) => {
    editTranscriptCall(
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
            subTitle: mapGeneralErrors(error, 'error:errorEditTranscriptGeneral'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorEditTranscriptGeneral',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  /**
   * renders JSX of Edit Transcript container component
   * @param EditTranScript
   */
  return (
    <EditTranScript
      transcript={transcript}
      editTranscript={editTranscript}
      formState={formState}
      masterData={masterData}
      app={app}
    />
  )
}

EditTranScriptContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchTranscriptByIdCall: PropTypes.func,
  editTranscriptCall: PropTypes.func,
  masterData: PropTypes.object,
  app: PropTypes.object,
}

EditTranScriptContainer.defaultProps = {
  headerAction: () => {},
  fetchTranscriptByIdCall: () => {},
  editTranscriptCall: () => {},
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
  fetchTranscriptByIdCall,
  editTranscriptCall,
})(EditTranScriptContainer)
