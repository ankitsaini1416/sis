import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import { headerAction } from '../../actions/header.action'
import UserDetails from '../../components/sis/users/userDetails/UserDetails'
import {
  attachGroupCall,
  callRolesApi,
  detachGroupCall,
  fetchUserByIdCall,
  fetchUserRolesCall,
  fetchUsersGroupsCall,
  setUserPasswordCall,
  updateUserRoleCall,
} from './../../actions/agm2.action'
import { messageAction } from './../../actions/app.action'
import { fetchDistrictsByPublicIdsCall, fetchDistrictsCall } from './../../actions/district.action'
import { fetchSchoolsByPublicIdsCall, fetchSchoolsCall } from './../../actions/schools.action'
import { MESSAGE_SEVERITIES, ROLE_KINDS } from './../../helpers/constants'
import { selectUser } from './../../helpers/selectors'
import { get, isEmpty } from './../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from './../../helpers/validator'

function UserDetailsContainer({
  headerAction,
  detachGroupCall,
  messageAction,
  fetchDistrictsCall,
  fetchSchoolsCall,
  attachGroupCall,
  callRolesApi,
  fetchUserRolesCall,
  updateUserRoleCall,
  fetchUserByIdCall,
  fetchUsersGroupsCall,
  fetchDistrictsByPublicIdsCall,
  fetchSchoolsByPublicIdsCall,
  authUser,
  setUserPasswordCall,
}) {
  const { userId } = useParams()
  const deleteIds = useRef('')
  const [user, setUser] = useState({})
  const [districts, setDistricts] = useState([])
  const [schools, setSchools] = useState([])
  const [organizationList, setOrganizationList] = useState([])
  const [openDeletePopup, setOpenDeletePopup] = React.useState(false)
  const [orgType, setOrgType] = React.useState('')
  const roleFilterState = React.useRef({
    districtId: '',
    schoolId: '',
    renderer: uuid(),
  })
  const [roleFilter, setRoleFilter] = useState({ ...roleFilterState.current })
  const [userRoles, setUserRoles] = useState({
    custom_roles: [],
    system_roles: [],
  })
  const [roles, setRoles] = useState({
    custom_roles: [],
    system_roles: [],
  })
  const onRoleFilterReset = function () {
    setRoleFilter({ ...roleFilterState.current })
    setUserRoles({
      custom_roles: [],
      system_roles: [],
    })
  }
  const setRoleFilterValue = function (e) {
    const filter = {
      ...roleFilter,
      [e.target.name]: e.target.value,
    }
    if (e.target.name === 'districtId' && !e.target.value) {
      filter.schoolId = ''
    }
    setRoleFilter(filter)
  }
  const onApplyRoleFilter = function () {
    fetchCustomRoles()
  }

  function fetchUserDetails() {
    fetchUserByIdCall(
      userId,
      (data) => {
        setUser(data)
      },
      () => {}
    )
  }
  const fetchUserOrganizations = function () {
    fetchUsersGroupsCall(userId, async (data) => {
      const districtsPublicPaths = []
      const schoolPublicPaths = []
      const orgList = []
      let isOnRootGroup = false
      data.forEach((item) => {
        if (item.path === '/') {
          isOnRootGroup = true
        } else {
          const paths = item.path.substr(1, item.path.length - 2).split('/')
          if (paths[1]) {
            schoolPublicPaths.push(item.path)
          } else if (paths[0]) {
            districtsPublicPaths.push(item.path)
          }
        }
      })
      if (districtsPublicPaths.length) {
        const payload = districtsPublicPaths.map(
          (path) => path.substr(1, path.length - 2).split('/')[0]
        )
        await fetchDistrictsByPublicIdsCall(payload, (data) => {
          districtsPublicPaths.forEach((path, i) => {
            data[i].path = path
          })
          orgList.push(...data)
        })
      }
      if (schoolPublicPaths.length) {
        const payload = schoolPublicPaths.map(
          (path) => path.substr(1, path.length - 2).split('/')[1]
        )
        await fetchSchoolsByPublicIdsCall(payload, (data) => {
          schoolPublicPaths.forEach((path, i) => {
            data[i].path = path
          })
          orgList.push(...data)
        })
      }
      if (isOnRootGroup) {
        orgList.unshift({
          id: 'root',
          dst_district_public_id: 'Root',
          dst_name: 'Root',
          sch_school_public_id: 'Root',
          sch_name: 'Root',
          createdTimeLabel: '-',
          updatedTimeLabel: '-',
          path: '/',
        })
      }
      setOrganizationList(orgList)
    })
  }

  const attachOrganization = function ({ districtId, schoolId }, { callback }) {
    const districtPublicId = districts.find(
      (item) => item.dst_id === districtId
    )?.dst_district_public_id
    const path = schoolId
      ? `/${districtPublicId}/${schoolId}/`
      : districtPublicId
      ? `/${districtPublicId}/`
      : '/'
    attachGroupCall(
      userId,
      path,
      () => {
        fetchUserOrganizations()
        callback && callback()
      },
      (err) => {
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorAddEntityGeneral'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorAddEntityGeneral',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }
  const toggleDeletePopup = function (event) {
    if (!openDeletePopup) {
      deleteIds.current = event.currentTarget.attributes['data-id'].value
      setOpenDeletePopup(true)
    } else {
      deleteIds.current = []
      setOpenDeletePopup(false)
    }
  }

  const detachOrganization = function () {
    const { path } = organizationList.find(
      (item) =>
        (item.dst_id || '').toString() === deleteIds.current ||
        (item.sch_id || '').toString() === deleteIds.current ||
        (item.id || '').toString() === 'root'
    )
    detachGroupCall(
      userId,
      path,
      () => {
        toggleDeletePopup()
        fetchUserOrganizations()
      },
      (err) => {
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorAddDistrictGeneral'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorAddDistrictGeneral',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
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

  const searchSchools = (districtId) => {
    fetchSchoolsCall(
      {
        q: '',
        current_page: 1,
        per_page: 1000,
        is_active: '',
        sch_dst_id: districtId,
      },
      (data) => {
        const { content } = data
        setSchools(content)
      }
    )
  }

  function getUserRoles() {
    fetchUserRolesCall(
      userId,
      (data) => {
        setUserRoles({
          custom_roles: data
            .filter((role) => role.kind === ROLE_KINDS.CUSTOM)
            .map((item) => item.id),
          system_roles: data
            .filter((role) => role.kind === ROLE_KINDS.SYSTEM)
            .map((item) => item.id),
        })
      },
      () => {}
    )
  }

  const fetchCustomRoles = function () {
    const filterData = {
      ...roleFilter,
      districtId: roleFilter.schoolId
        ? organizationList.find((item) => item.sch_school_public_id === roleFilter.schoolId)
            ?.sch_district?.dst_district_public_id
        : roleFilter.districtId,
      sort_by: 'name',
      sort_order: 'desc',
      kind: ROLE_KINDS.CUSTOM,
    }
    callRolesApi(
      { ...filterData },
      (data) => {
        const { content } = data
        setRoles({
          ...roles,
          custom_roles: content,
        })
      },
      () => {}
    )
  }

  const fetchSystemRoles = function () {
    callRolesApi(
      { kind: ROLE_KINDS.SYSTEM },
      (data) => {
        const { content } = data
        setRoles({
          ...roles,
          system_roles: content,
        })
      },
      () => {}
    )
  }

  const attachRole = function (role) {
    fetchUserRolesCall(
      userId,
      (data) => {
        const payload = {
          role_ids: [...data.map((item) => item.id), role.id],
        }
        updateUserRoleCall(
          userId,
          payload,
          () => {
            getUserRoles()
            messageAction({
              subTitle: 'message:addRoleGeneral',
              severity: MESSAGE_SEVERITIES.SUCCESS,
            })
          },
          (err) => {
            const error = get(err, 'response.data.code', '')
            if (!isEmpty(error)) {
              messageAction({
                subTitle: mapGeneralErrors(error, 'error:errorAddRoleGeneral'),
                severity: MESSAGE_SEVERITIES.ERROR,
              })
            } else {
              messageAction({
                subTitle: 'error:errorAddRoleGeneral',
                severity: MESSAGE_SEVERITIES.ERROR,
              })
            }
          }
        )
      },
      () => {}
    )
  }

  const detachRole = function (role) {
    fetchUserRolesCall(
      userId,
      (data) => {
        const payload = {
          role_ids: [...data.filter((item) => item.id !== role.id)].map((item) => item.id),
        }
        updateUserRoleCall(
          userId,
          payload,
          () => {
            getUserRoles()
            messageAction({
              subTitle: 'message:addRoleGeneral',
              severity: MESSAGE_SEVERITIES.SUCCESS,
            })
          },
          (err) => {
            const error = get(err, 'response.data.code', '')
            if (!isEmpty(error)) {
              messageAction({
                subTitle: mapGeneralErrors(error, 'error:errorAddRoleGeneral'),
                severity: MESSAGE_SEVERITIES.ERROR,
              })
            } else {
              messageAction({
                subTitle: 'error:errorAddRoleGeneral',
                severity: MESSAGE_SEVERITIES.ERROR,
              })
            }
          }
        )
      },
      () => {}
    )
  }

  const setPassword = function (values, { setErrors, callback }) {
    setUserPasswordCall(userId, values.password, callback, (err) => {
      const errors = get(err, 'response.data.field_errors', {})
      const error = get(err, 'response.data.code', '')

      if (!isEmpty(errors)) {
        setErrors(mapFieldErrors(errors))
      } else if (!isEmpty(error)) {
        messageAction({
          subTitle: mapGeneralErrors(error, 'error:errorEditUserGeneral'),
          severity: MESSAGE_SEVERITIES.ERROR,
        })
      } else {
        messageAction({
          subTitle: 'error:errorEditUserGeneral',
          severity: MESSAGE_SEVERITIES.ERROR,
        })
      }
    })
  }

  useEffect(() => {
    const headerData = { activeMenuItem: 'users', activeParent: 'agm' }
    headerAction(headerData)
  }, [])

  useEffect(() => {
    if (organizationList.find((item) => item.id === 'root')) {
      fetchCustomRoles()
    }
  }, [organizationList])

  useEffect(() => {
    fetchUserDetails()
    fetchSystemRoles()
    getUserRoles()
    getDistricts()
    fetchUserOrganizations()
  }, [])

  /**
   * renders JSX of User container
   * @param user
   */
  return (
    <UserDetails
      organizationList={organizationList}
      districts={districts}
      schools={schools}
      searchSchools={searchSchools}
      attachOrganization={attachOrganization}
      detachOrganization={detachOrganization}
      roles={roles}
      userRoles={userRoles}
      attachRole={attachRole}
      detachRole={detachRole}
      openDeletePopup={openDeletePopup}
      toggleDeletePopup={toggleDeletePopup}
      user={user}
      roleFilter={roleFilter}
      setRoleFilterValue={setRoleFilterValue}
      onRoleFilterReset={onRoleFilterReset}
      onApplyRoleFilter={onApplyRoleFilter}
      authUser={authUser}
      setPassword={setPassword}
      orgType={orgType}
      setOrgType={setOrgType}
    />
  )
}

UserDetailsContainer.propTypes = {
  headerAction: PropTypes.func,
  attachGroupCall: PropTypes.func,
  detachGroupCall: PropTypes.func,
  messageAction: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  fetchUserRolesCall: PropTypes.func,
  updateUserRoleCall: PropTypes.func,
  fetchUserByIdCall: PropTypes.func,
  fetchUsersGroupsCall: PropTypes.func,
  callRolesApi: PropTypes.func,
  fetchDistrictsByPublicIdsCall: PropTypes.func,
  fetchSchoolsByPublicIdsCall: PropTypes.func,
  setUserPasswordCall: PropTypes.func,
  authUser: PropTypes.object,
}

UserDetailsContainer.defaultProps = {
  headerAction: () => {},
  attachGroupCall: () => {},
  detachGroupCall: () => {},
  messageAction: () => {},
  fetchDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
  fetchUserRolesCall: () => {},
  updateUserRoleCall: () => {},
  fetchUserByIdCall: () => {},
  fetchUsersGroupsCall: () => {},
  callRolesApi: () => {},
  fetchDistrictsByPublicIdsCall: () => {},
  fetchSchoolsByPublicIdsCall: () => {},
  setUserPasswordCall: () => {},
  authUser: {},
}
const mapStateToProps = (state) => ({
  authUser: selectUser(state),
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  attachGroupCall,
  detachGroupCall,
  messageAction,
  fetchDistrictsCall,
  fetchSchoolsCall,
  fetchUserRolesCall,
  updateUserRoleCall,
  fetchUserByIdCall,
  fetchUsersGroupsCall,
  callRolesApi,
  fetchDistrictsByPublicIdsCall,
  fetchSchoolsByPublicIdsCall,
  setUserPasswordCall,
})(UserDetailsContainer)
