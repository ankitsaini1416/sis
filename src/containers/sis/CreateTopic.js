import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { messageAction } from '../../actions/app.action'
import { headerAction } from '../../actions/header.action'
import {
  createTopicApi,
  fetchProcessorAction,
  fetchProcessorConfigApi,
} from '../../actions/notification.action'
import CreateTopic from '../../components/sis/administration/notification/CreateTopic'
import { MESSAGE_SEVERITIES } from '../../helpers/constants'
import { get, isEmpty, isNullOrEmpty } from '../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from '../../helpers/validator'

const initialState = {
  name: '',
  processor: '',
  description: '',
  keep_logs: true,
}

function CreateTopicContainer({
  headerAction,
  createTopicApi,
  fetchProcessorAction,
  fetchProcessorConfigApi,
}) {
  const [processorList, setProcessorList] = React.useState([])
  const formValues = useRef({})
  const history = useHistory()
  const [processorConfig, setProcessorConfig] = React.useState([])
  const createTopicInitialState = useRef({
    ...initialState,
  })

  const createTopic = function (values, { setErrors }) {
    createTopicApi(
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
  const fetchProcessorConfig = function (payload) {
    fetchProcessorConfigApi(payload, (record) => {
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
      setProcessorConfig(record)
    })
  }

  React.useEffect(() => {
    const headerData = {
      activeMenuItem: 'notification',
      activeParent: 'administration',
    }
    headerAction(headerData)
  }, [])

  React.useEffect(() => {
    fetchProcessorList()
  }, [])

  /**
   * renders JSX of Add User container component
   * @param user
   */
  return (
    <CreateTopic
      createTopic={createTopic}
      processorList={processorList}
      fetchProcessorConfig={fetchProcessorConfig}
      formValues={formValues}
      createTopicInitialState={createTopicInitialState.current}
      processorConfig={processorConfig}
    />
  )
}

CreateTopicContainer.propTypes = {
  headerAction: PropTypes.func,
  createTopicApi: PropTypes.func,
  fetchProcessorAction: PropTypes.func,
  fetchProcessorConfigApi: PropTypes.func,
}

CreateTopicContainer.defaultProps = {
  headerAction: () => {},
  createTopicApi: () => {},
  fetchProcessorAction: () => {},
  fetchProcessorConfigApi: () => {},
}
const mapStateToProps = () => ({})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  createTopicApi,
  fetchProcessorAction,
  fetchProcessorConfigApi,
})(CreateTopicContainer)
