/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { addUserCall, callRolesApi, updateUserRoleCall } from '../../actions/agm2.action'
import { messageAction } from '../../actions/app.action'
import { headerAction } from '../../actions/header.action'
import AddUser from '../../components/sis/users/addUser/AddUser'
import { get, isEmpty } from '../../helpers/utils'
import { fetchDistrictsCall } from './../../actions/district.action'
import { fetchInstituteDistrictsCall } from './../../actions/InstituteDistrict.action'
import { fetchSchoolsCall } from './../../actions/schools.action'
import {
  MESSAGE_SEVERITIES,
  PROCESSSTATUSES,
  ROLE_KINDS,
  ROLE_SELECTION_TYPES,
} from './../../helpers/constants'
import PERMISSIONS from './../../helpers/permissions'
import { selectUser } from './../../helpers/selectors'
import { mapFieldErrors, mapGeneralErrors } from './../../helpers/validator'

function getSteps() {
  return ['Districts and Schools', 'General Information', 'Select Roles']
}

function AddUserContainer({
  headerAction,
  addUserCall,
  messageAction,
  updateUserRoleCall,
  fetchDistrictsCall,
  fetchInstituteDistrictsCall,
  fetchSchoolsCall,
  authUser,
  callRolesApi,
}) {
  const [activeStep, setActiveStep] = useState(0)
  const steps = getSteps()
  const [systemRoles, setSystemRoles] = useState([])
  const [user, setUser] = useState({})
  const [customRoles, setCustomRoles] = useState([])
  const [districts, setDistricts] = useState([])
  const [schools, setSchools] = useState([])
  const [userPayload, setUserPayload] = useState({})
  const [rolePayload, setRolePayload] = useState({})
  const [orgPayload, setOrgPayload] = useState({})
  const [orgType, setOrgType] = React.useState('')
  const [process, setProcess] = useState({
    orgInfo: PROCESSSTATUSES.WAITING,
    userInfo: PROCESSSTATUSES.WAITING,
    roleInfo: PROCESSSTATUSES.WAITING,
  })

  const toggleUserPayload = function (values) {
    if (!isEmpty(values)) {
      setUserPayload(values)
      handleNext()
    }
  }

  const toggleRolePayload = function (values) {
    if (!isEmpty(values)) {
      setRolePayload(values)
      handleNext()
    }
  }

  const toggleOrgPayload = function ({ districtId, schoolId }, { setErrors }) {
    const dst_district_public_id =
      districts.find((item) => item.dst_id === districtId)?.dst_district_public_id || ''
    let path = '/'
    if (dst_district_public_id && schoolId) {
      path = `/${dst_district_public_id}/${schoolId}/`
    } else if (dst_district_public_id) {
      path = `/${dst_district_public_id}/`
    } else if (schoolId) {
      path = `/${schoolId}/`
    }
    const allowedActions = authUser?.permissions?.allowedActions?.[path]?.list || []
    if (
      !authUser.isAdmin &&
      !allowedActions.find((item) => PERMISSIONS['AGM/CreateUser'].includes(item))
    ) {
      return messageAction({
        subTitle: 'error:errorPermission',
        severity: MESSAGE_SEVERITIES.ERROR,
      })
    }
    setOrgPayload({ districtId, schoolId })
    handleNext()
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const startProcess = function () {
    setProcess((process) => ({
      ...process,
      orgInfo: PROCESSSTATUSES.ACTIVE,
    }))
  }

  const handleError = function (err) {
    const errors = get(err, 'response.data.field_errors', {})
    const error = get(err, 'response.data.code', '')

    if (!isEmpty(errors)) {
      const errorMap = mapFieldErrors(errors) || {}
      messageAction({
        subTitle: errorMap[Object.keys(errorMap)[0]],
        severity: MESSAGE_SEVERITIES.ERROR,
      })
    } else if (!isEmpty(error)) {
      messageAction({
        subTitle: mapGeneralErrors(error),
        severity: MESSAGE_SEVERITIES.ERROR,
      })
    } else {
      messageAction({
        subTitle: 'error:errorAddUserGeneral',
        severity: MESSAGE_SEVERITIES.ERROR,
      })
    }
  }

  const fetchCustomRoles = function () {
    const filterData = {
      ...orgPayload,
      q: '',
      districtId: districts.find((item) => item.dst_id === orgPayload.districtId)
        ?.dst_district_public_id,
      sort_by: 'name',
      sort_order: 'desc',
      kind: ROLE_KINDS.CUSTOM,
    }
    callRolesApi(
      filterData,
      (data) => {
        const { content } = data
        setCustomRoles(content)
      },
      () => {}
    )
  }

  const fetchSystemRoles = function () {
    callRolesApi(
      { kind: ROLE_KINDS.SYSTEM },
      (data) => {
        setSystemRoles(data.content || [])
      },
      () => {}
    )
  }

  function getAllRoles() {
    fetchCustomRoles()
    if (authUser.isAdmin) {
      fetchSystemRoles()
    }
  }

  const getDistricts = () => {
    fetchDistrictsCall(
      {
        q: '',
        per_page: 1000,
        is_active: '',
      },
      (records) => {
        setDistricts(get(records, 'content', []))
      },
      null,
      false
    )
  }
  const getInstituteDistricts = () => {
    fetchInstituteDistrictsCall(
      {
        q: '',
        per_page: 1000,
        is_active: '',
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

  useEffect(() => {
    const headerData = { activeMenuItem: 'users', activeParent: 'agm' }
    headerAction(headerData)
  }, [])

  useEffect(() => {
    if (activeStep === 2) {
      getAllRoles()
    }
    if (activeStep === 3) {
      startProcess()
    }
  }, [activeStep])

  useEffect(() => {
    if (
      process.orgInfo === PROCESSSTATUSES.ACTIVE &&
      process.userInfo === PROCESSSTATUSES.WAITING &&
      process.roleInfo === PROCESSSTATUSES.WAITING
    ) {
      setProcess((process) => ({
        ...process,
        orgInfo: PROCESSSTATUSES.COMPLETED,
        userInfo: PROCESSSTATUSES.ACTIVE,
      }))
    } else if (
      process.userInfo === PROCESSSTATUSES.ACTIVE &&
      process.roleInfo === PROCESSSTATUSES.WAITING
    ) {
      const districtId = districts.find(
        (item) => item.dst_id === orgPayload.districtId
      )?.dst_district_public_id
      addUserCall(
        {
          ...userPayload,
          path: orgPayload.schoolId
            ? `/${districtId}/${orgPayload.schoolId}/`
            : orgPayload.districtId
            ? `/${districtId}/`
            : '/',
        },
        (data) => {
          setUser(data)
          setProcess((process) => ({
            ...process,
            userInfo: PROCESSSTATUSES.COMPLETED,
            roleInfo: PROCESSSTATUSES.ACTIVE,
          }))
        },
        (err) => {
          setProcess({
            userInfo: PROCESSSTATUSES.WAITING,
            roleInfo: PROCESSSTATUSES.WAITING,
            orgInfo: PROCESSSTATUSES.WAITING,
          })
          setActiveStep(0)
          handleError(err)
        }
      )
    } else if (process.roleInfo === PROCESSSTATUSES.ACTIVE) {
      const { customRole, platformRole } = rolePayload
      let payload = {
        role_ids: [],
      }
      if (customRole !== '0') {
        payload.role_ids.push(customRole)
      }
      if (platformRole !== '0') {
        payload.role_ids.push(platformRole)
      }
      updateUserRoleCall(
        user.id,
        payload,
        () => {
          setProcess((process) => ({
            ...process,
            roleInfo: PROCESSSTATUSES.COMPLETED,
          }))
        },
        (err) => {
          handleError(err)
        }
      )
    }
  }, [process])

  useEffect(() => {
    getDistricts()
  }, [])
  useEffect(() => {
    getInstituteDistricts()
  }, [])

  useEffect(() => {
    if (orgType === ROLE_SELECTION_TYPES.ROOT) {
      toggleOrgPayload({ districtId: '', schoolId: '' }, { setErrors: () => {} })
    }
  }, [orgType])

  /**
   * renders JSX of Add User container component
   * @param user
   */
  return (
    <AddUser
      steps={steps}
      activeStep={activeStep}
      handleNext={handleNext}
      handleBack={handleBack}
      systemRoles={systemRoles}
      customRoles={customRoles}
      districts={districts}
      schools={schools}
      searchSchools={searchSchools}
      userPayload={userPayload}
      rolePayload={rolePayload}
      orgPayload={orgPayload}
      toggleUserPayload={toggleUserPayload}
      toggleRolePayload={toggleRolePayload}
      toggleOrgPayload={toggleOrgPayload}
      process={process}
      authUser={authUser}
      orgType={orgType}
      setOrgType={setOrgType}
    />
  )
}

AddUserContainer.propTypes = {
  headerAction: PropTypes.func,
  addUserCall: PropTypes.func,
  messageAction: PropTypes.func,
  updateUserRoleCall: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchInstituteDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  authUser: PropTypes.object,
  callRolesApi: PropTypes.func,
}

AddUserContainer.defaultProps = {
  headerAction: () => {},
  addUserCall: () => {},
  messageAction: () => {},
  updateUserRoleCall: () => {},
  fetchDistrictsCall: () => {},
  fetchInstituteDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
  authUser: {},
  callRolesApi: () => {},
}
const mapStateToProps = (state) => ({
  authUser: selectUser(state),
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  addUserCall,
  messageAction,
  updateUserRoleCall,
  fetchDistrictsCall,
  fetchInstituteDistrictsCall,
  fetchSchoolsCall,
  callRolesApi,
})(AddUserContainer)
