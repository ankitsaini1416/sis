import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { messageAction } from '../../actions/app.action'
import { headerAction } from '../../actions/header.action'
import { callTemplateDetailApi, callUpdateTemplateApi } from '../../actions/template.action'
import EditTemplate from '../../components/sis/settings/templates/EditTemplate'
import { MESSAGE_SEVERITIES } from '../../helpers/constants'
import { get, isEmpty } from '../../helpers/utils'
import { mapGeneralErrors } from '../../helpers/validator'

function EditTemplateContainer({ headerAction, callTemplateDetailApi, callUpdateTemplateApi }) {
  const [templateData, setTemplateData] = React.useState({})
  const templateRef = React.useRef(templateData)
  const { templateID } = useParams()

  function getTemplateDetail() {
    callTemplateDetailApi(templateID, (data) => {
      setTemplateData(data)
      templateRef.current = data
    })
  }

  function updateTemplate() {
    const data = {
      content: templateRef.current.content,
      nickname: templateRef.current.nickname,
    }
    callUpdateTemplateApi(
      templateID,
      data,
      (data) => {
        setTemplateData(data)
        templateRef.current = data
      },
      (err) => {
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorUpdateTemplate'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorUpdateTemplate',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const handleChange = (value) => {
    setTemplateData({ ...templateData, content: value })
    templateRef.current = { ...templateData, content: value }
  }

  const copyTemplateText = () => {
    navigator.clipboard.writeText(templateData.content)
  }

  const downloadTemplateText = () => {
    const element = document.createElement('a')
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(templateData.content)
    )
    element.setAttribute('download', 'template')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  function readFile(file) {
    const reader = new FileReader()
    reader.addEventListener('load', (event) => {
      const result = event.target.result
      setTemplateData({ ...templateData, content: result })
      templateRef.current = { ...templateData, content: result }
    })
    reader.readAsText(file)
  }

  const ctrlSHandler = (e) => {
    if ((window.navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) && e.keyCode == 83) {
      e.preventDefault()
      updateTemplate()
    }
  }
  React.useEffect(() => {
    const headerData = { activeMenuItem: 'templates', activeParent: 'settings' }
    headerAction(headerData)
    document.addEventListener('keydown', ctrlSHandler, false)
    return () => {
      document.removeEventListener('keydown', ctrlSHandler)
    }
  }, [])

  React.useEffect(() => {
    getTemplateDetail()
  }, [])
  /**
   * renders JSX of Add User container component
   * @param EditTemplate
   */
  return (
    <EditTemplate
      updateTemplate={updateTemplate}
      templateData={templateData}
      copyTemplateText={copyTemplateText}
      downloadTemplateText={downloadTemplateText}
      getTemplateDetail={getTemplateDetail}
      handleChange={handleChange}
      readFile={readFile}
    />
  )
}

EditTemplateContainer.propTypes = {
  headerAction: PropTypes.func,
  callTemplateDetailApi: PropTypes.func,
  callUpdateTemplateApi: PropTypes.func,
}

EditTemplateContainer.defaultProps = {
  headerAction: () => {},
  callTemplateDetailApi: () => {},
  callUpdateTemplateApi: () => {},
}
const mapStateToProps = () => ({})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  callTemplateDetailApi,
  callUpdateTemplateApi,
})(EditTemplateContainer)
