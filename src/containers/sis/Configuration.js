import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { messageAction } from '../../actions/app.action'
import { headerAction } from '../../actions/header.action'
import {
  fetchProcessorAction,
  fetchProcessorConfigApi,
  fetchTopicAction,
  updateTopics,
} from '../../actions/notification.action'
import Configuration from '../../components/sis/administration/notification/Configuration'
import { MESSAGE_SEVERITIES } from '../../helpers/constants'
import { get, isEmpty, isNullOrEmpty } from '../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from '../../helpers/validator'

const initialState = {
  name: '',
  processor: '',
  description: '',
  keep_logs: '',
  is_active: false,
}

function ConfigurationContainer({
  headerAction,
  fetchProcessorAction,
  fetchProcessorConfigApi,
  fetchTopicAction,
  updateTopics,
}) {
  const formValues = React.useRef({})
  const processorCode = React.useRef('')
  const history = useHistory()
  const [processorInfo, setProcessorInfo] = React.useState({})
  const [processorConfig, setProcessorConfig] = React.useState([])
  const [processorList, setProcessorList] = React.useState([])
  const createTopicInitialState = useRef({ ...initialState })
  const { topicId } = useParams()

  const fetchProcessorConfig = function (code) {
    fetchProcessorConfigApi(code, (record) => {
      setProcessorConfig(record)
      let newKeys = { ...initialState }
      record.forEach((item) => {
        newKeys[item.key] =
          item.type === 'TEXT'
            ? ''
            : item.type === 'CHECKBOX'
            ? false
            : item.type === 'RADIO'
            ? ''
            : ''
      })
      Object.keys(newKeys).forEach(function (key) {
        if (!isNullOrEmpty(formValues.current[key])) {
          newKeys[key] = formValues.current[key]
        }
      })
      createTopicInitialState.current = newKeys
    })
  }

  const fetchTopicsInfo = function () {
    fetchTopicAction(topicId, (records) => {
      createTopicInitialState.current = {
        name: records.name,
        processor: records.processor,
        description: records.description,
        keep_logs: records.keep_logs,
        is_active: records.is_active,
        ...records.config,
      }
      setProcessorInfo(records)
    })
  }
  const updateTopic = function (values, { setErrors }) {
    let { name, description, processor, keep_logs, is_active, ...Configs } = values
    const payload = {
      name,
      description,
      processor,
      keep_logs,
      is_active: is_active,
      config: {
        ...Configs,
      },
    }
    updateTopics(
      processorInfo.id,
      payload,
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
            subTitle: mapGeneralErrors(error, 'error:errorCreateTopic'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorCreateTopic',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }
  const fetchProcessorList = function () {
    fetchProcessorAction((record) => {
      setProcessorList(record)
    })
  }

  React.useEffect(() => {
    if (topicId) {
      const headerData = {
        activeMenuItem: 'notification',
        activeParent: 'administration',
        sideBar: true,
      }

      headerAction(headerData)
      fetchTopicsInfo()
      fetchProcessorList()
    }
  }, [topicId])
  /**
   * renders JSX of configuration container component
   * @param user
   */
  return (
    <Configuration
      createTopicInitialState={createTopicInitialState}
      processorConfig={processorConfig}
      fetchProcessorConfig={fetchProcessorConfig}
      processorList={processorList}
      formValues={formValues}
      processorCode={processorCode}
      updateTopic={updateTopic}
      processorInfo={processorInfo}
    />
  )
}

ConfigurationContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchProcessorConfigApi: PropTypes.func,
  fetchTopicAction: PropTypes.func,
  fetchProcessorAction: PropTypes.func,
  updateTopics: PropTypes.func,
}

ConfigurationContainer.defaultProps = {
  headerAction: () => {},
  fetchProcessorConfigApi: () => {},
  fetchTopicAction: () => {},
  fetchProcessorAction: () => {},
  updateTopics: () => {},
}
const mapStateToProps = () => ({})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  fetchProcessorConfigApi,
  fetchTopicAction,
  fetchProcessorAction,
  updateTopics,
})(ConfigurationContainer)
