import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

import { headerAction } from '../../actions/header.action'
import EditEmail from '../../components/sis/settings/emails/EditEmail'
import { serviceCode } from '../../helpers/stub'
import { messageAction } from './../../actions/app.action'
import { editEmailCall } from './../../actions/email.action'
import { fetchEmailByIdCall } from './../../actions/email.action'
import { callGetTemplatesApi } from './../../actions/template.action'
import { MESSAGE_SEVERITIES } from './../../helpers/constants'
import { get, isEmpty, mapWithState } from './../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from './../../helpers/validator'

const initialState = {
  eml_name: '',
  eml_subject: '',
  eml_from_address: '',
  eml_default_to_address: '',
  eml_template_urn: '',
  eml_is_enabled: false,
}

function EditEmailContainer({
  headerAction,
  editEmailCall,
  fetchEmailByIdCall,
  callGetTemplatesApi,
}) {
  const history = useHistory()
  const { emailId, schPublicId } = useParams()
  const [email, setEmail] = useState({})
  const [formState, setFormState] = useState({ ...initialState })
  const [template, setTemplate] = useState([])

  const editEmail = (id, values, { setErrors }) => {
    editEmailCall(
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
            subTitle: mapGeneralErrors(error, 'error:errorEditSchoolGeneral'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorEditSchoolGeneral',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }
  function fetchEmailDetail() {
    fetchEmailByIdCall(emailId, (data) => {
      setFormState(mapWithState(initialState, data))
      setEmail(data)
    })
  }
  function fetchTemplateList() {
    const filterData = {
      q: '',
      f_collection: schPublicId,
      f_content: '',
      f_filename: '',
      f_nickname: '',
      sort_by: '',
      sort_order: '',
    }
    callGetTemplatesApi({ ...filterData }, serviceCode[0].value, (records) => {
      const { content } = records || {}
      setTemplate(content)
    })
  }

  useEffect(() => {
    const headerData = { activeMenuItem: 'emails', activeParent: 'settings' }
    headerAction(headerData)
    fetchTemplateList()
    fetchEmailDetail()
  }, [])

  /**
   * renders JSX of Edit User container component
   * @param user
   */
  return <EditEmail editEmail={editEmail} email={email} formState={formState} template={template} />
}

EditEmailContainer.propTypes = {
  headerAction: PropTypes.func,
  editEmailCall: PropTypes.func,
  fetchEmailByIdCall: PropTypes.func,
  callGetTemplatesApi: PropTypes.func,
}

EditEmailContainer.defaultProps = {
  headerAction: () => {},
  editEmailCall: () => {},
  fetchEmailByIdCall: () => {},
  callGetTemplatesApi: () => {},
}
const mapStateToProps = () => ({})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  editEmailCall,
  fetchEmailByIdCall,
  callGetTemplatesApi,
})(EditEmailContainer)
