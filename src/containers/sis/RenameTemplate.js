import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { messageAction } from '../../actions/app.action'
import { headerAction } from '../../actions/header.action'
import { callRenameTemplateApi, callTemplateDetailApi } from '../../actions/template.action'
import RenameTemplate from '../../components/sis/settings/templates/RenameTemplate'
import { MESSAGE_SEVERITIES } from '../../helpers/constants'
import { get, isEmpty } from '../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from '../../helpers/validator'

function RenameTemplateContainer({ headerAction, callTemplateDetailApi, callRenameTemplateApi }) {
  const [templateData, setTemplateData] = React.useState({})
  const { templateID } = useParams()
  const history = useHistory()

  function getTemplateDetailFn() {
    callTemplateDetailApi(templateID, (data) => {
      setTemplateData(data)
    })
  }

  const renameTemplate = (values, { setErrors }) => {
    callRenameTemplateApi(
      templateID,
      values,
      () => {
        {
          history.goBack()
        }
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')

        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorRenameTemplate'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorAddUserGeneral',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  React.useEffect(() => {
    const headerData = {
      activeMenuItem: 'templates',
      activeParent: 'settings',
    }
    headerAction(headerData)
    getTemplateDetailFn()
  }, [])

  /**
   * renders JSX of Add User container component
   * @param RenameTemplate
   */

  return <RenameTemplate templateData={templateData} renameTemplate={renameTemplate} />
}

RenameTemplateContainer.propTypes = {
  headerAction: PropTypes.func,
  callTemplateDetailApi: PropTypes.func,
  callRenameTemplateApi: PropTypes.func,
}

RenameTemplateContainer.defaultProps = {
  headerAction: () => {},
  callTemplateDetailApi: () => {},
  callRenameTemplateApi: () => {},
}
const mapStateToProps = () => ({})

/**
 *  @exports connect function of redux
 */

export default connect(mapStateToProps, {
  headerAction,
  callTemplateDetailApi,
  callRenameTemplateApi,
})(RenameTemplateContainer)
