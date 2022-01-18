import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { messageAction } from '../../actions/app.action'
import { fetchDistrictsCall } from '../../actions/district.action'
import { headerAction } from '../../actions/header.action'
import { fetchInstituteDistrictsCall } from '../../actions/InstituteDistrict.action'
import { fetchSchoolsCall } from '../../actions/schools.action'
import { callCreateTemplateApi, callGetGroupsApi } from '../../actions/template.action'
import AddTemplate from '../../components/sis/settings/templates/AddTemplate'
import { MESSAGE_SEVERITIES, ROUTES } from '../../helpers/constants'
import { get, getSchoolUrl, isEmpty } from '../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from '../../helpers/validator'
import RouterContext from './../../contexts/route.context'

function AddTemplateContainer({
  headerAction,
  callCreateTemplateApi,
  callGetGroupsApi,
  fetchDistrictsCall,
  fetchInstituteDistrictsCall,
  fetchSchoolsCall,
}) {
  const [groups, setGroups] = React.useState([])
  const history = useHistory()
  const { params } = useContext(RouterContext)
  const [districts, setDistricts] = React.useState([])
  const [schools, setSchools] = React.useState([])

  function getGroups() {
    callGetGroupsApi((data) => {
      setGroups(data)
    })
  }

  const addTemplate = (values, { setErrors }) => {
    callCreateTemplateApi(
      values,
      () => {
        history.push(getSchoolUrl({ ...params, to: ROUTES.TEMPLATE }))
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')

        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorAddTemplate'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorAddTemplate',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
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

  const searchSchools = (districtId) => {
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

  React.useEffect(() => {
    const headerData = { activeMenuItem: 'templates', activeParent: 'settings' }
    headerAction(headerData)
  }, [])

  React.useEffect(() => {
    fetchDistricts()
    getGroups()
  }, [])
  React.useEffect(() => {
    const headerData = { activeMenuItem: 'templates', activeParent: 'settings' }
    headerAction(headerData)
  }, [])

  React.useEffect(() => {
    fetchInstituteDistricts()
    getGroups()
  }, [])

  /**
   * renders JSX of Add User container component
   * @param addtemplate
   */
  return (
    <AddTemplate
      groups={groups}
      addTemplate={addTemplate}
      districts={districts}
      schools={schools}
      searchSchools={searchSchools}
    />
  )
}

AddTemplateContainer.propTypes = {
  headerAction: PropTypes.func,
  callCreateTemplateApi: PropTypes.func,
  callGetGroupsApi: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchInstituteDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
}

AddTemplateContainer.defaultProps = {
  headerAction: () => {},
  callCreateTemplateApi: () => {},
  callGetGroupsApi: () => {},
  fetchDistrictsCall: () => {},
  fetchInstituteDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
}
const mapStateToProps = () => ({})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  callCreateTemplateApi,
  callGetGroupsApi,
  fetchDistrictsCall,
  fetchInstituteDistrictsCall,
  fetchSchoolsCall,
})(AddTemplateContainer)
