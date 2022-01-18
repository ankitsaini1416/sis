import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { headerAction } from '../../actions/header.action'
import { addUpdateTenantMetadata } from '../../actions/metadata.action'
import { fetchTopicsDetail } from '../../actions/notification.action'
import AppSettings from '../../components/sis/administration/appSettings/AppSettings'
import { selectMetadata } from '../../helpers/selectors'
import { messageAction } from './../../actions/app.action'
import { MESSAGE_SEVERITIES } from './../../helpers/constants'
import { get, isEmpty } from './../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from './../../helpers/validator'

function AppSettingsContainer({
  headerAction,
  messageAction,
  fetchTopicsDetail,
  addUpdateTenantMetadata,
  metadata,
}) {
  const [topics, setTopics] = useState([])
  React.useEffect(() => {
    const headerData = {
      activeMenuItem: 'appSettings',
      activeParent: 'administration',
    }
    headerAction(headerData)
  }, [])

  const getTopics = function () {
    fetchTopicsDetail(
      {
        sort_by: 'asc',
        sort_order: '',
        q: '',
        current_page: 1,
        per_page: 500,
      },
      (records) => {
        const { content } = get(records, 'data', {})
        setTopics(content)
      }
    )
  }

  const addUpdateGeneralSetting = (values, { setErrors }) => {
    addUpdateTenantMetadata(
      values,
      () => {},
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')

        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorUpdateGeneralSetting'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorUpdateGeneralSetting',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  useEffect(() => {
    getTopics()
  }, [])

  /**
   * renders JSX of App Settings container component
   * @param user
   */
  return (
    <AppSettings
      topics={topics}
      metadata={metadata}
      addUpdateGeneralSetting={addUpdateGeneralSetting}
    />
  )
}

AppSettingsContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchTopicsDetail: PropTypes.func,
  addUpdateTenantMetadata: PropTypes.func,
  metadata: PropTypes.object,
  messageAction: PropTypes.func,
}

AppSettingsContainer.defaultProps = {
  headerAction: () => {},
  fetchTopicsDetail: () => {},
  addUpdateTenantMetadata: () => {},
  metadata: {},
  messageAction: () => {},
}
const mapStateToProps = (state) => ({
  metadata: selectMetadata(state),
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  messageAction,
  fetchTopicsDetail,
  addUpdateTenantMetadata,
})(AppSettingsContainer)
