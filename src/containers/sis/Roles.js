import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { callDeleteRole, callRolesApi, createCustomRole } from '../../actions/agm2.action'
import { uiStateAction } from '../../actions/app.action'
import { fetchDistrictsCall } from '../../actions/district.action'
import { headerAction } from '../../actions/header.action'
import { fetchSchoolsCall } from '../../actions/schools.action'
import Roles from '../../components/sis/administration/roles/Roles'
import { TablePageData } from '../../data/TablePageData'
import { selectUiState, selectUser } from '../../helpers/selectors'
import { get, handleChangePage, isEmpty, isEnter } from '../../helpers/utils'
import { messageAction } from './../../actions/app.action'
import { MESSAGE_SEVERITIES, ROLE_KINDS } from './../../helpers/constants'
import { mapFieldErrors, mapGeneralErrors } from './../../helpers/validator'
function RolesContainer({
  headerAction,
  messageAction,
  createCustomRole,
  callDeleteRole,
  callRolesApi,
  uiState,
  uiStateAction,
  fetchDistrictsCall,
  fetchSchoolsCall,
  authUser,
}) {
  const deleteIds = useRef([])
  const [systemRoles, setSystemRoles] = useState([])
  const [customRoles, setCustomRoles] = useState([])
  const [order, setOrder] = React.useState('desc')
  const [orderBy, setOrderBy] = React.useState('name')
  const [schools, setSchools] = React.useState([])
  const [districts, setDistricts] = React.useState([])
  const [openDeletePopup, setOpenDeletePopup] = React.useState(false)
  const [addRoleSchools, setAddRoleSchools] = React.useState([])
  const [orgType, setOrgType] = React.useState('')

  let [paginationMidState] = React.useState({
    ...TablePageData,
    current_page: TablePageData.current_page,
    per_page: TablePageData.per_page,
  })

  const [pageDetails, setPageDetails] = React.useState({
    ...paginationMidState,
  })

  const filterState = React.useRef({
    q: '',
    districtId: '',
    schoolId: '',
    renderer: uuid(),
  })

  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchCustomRoles)
  }

  const onSearchEnter = function (event) {
    if (isEnter(event)) {
      event.preventDefault()
      fetchCustomRoles()
    }
  }

  const onFilterReset = function () {
    setSchools([])
    uiStateAction({
      rolesFilter: { ...filterState.current },
      renderer: uuid(),
    })
  }

  const onApplyFilter = function () {
    paginationMidState.current_page = 1
    fetchCustomRoles()
  }

  const setFilterValue = function (e) {
    const rolesFilter = {
      ...uiState.rolesFilter,
      [e.target.name]: e.target.value,
    }
    if (e.target.name === 'districtId' && !e.target.value) {
      rolesFilter.schoolId = ''
    }
    uiStateAction({ rolesFilter })
  }

  const fetchSchool = function (districtId, callback) {
    if (!districtId) {
      return
    }
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
        callback(content)
      },
      null,
      false
    )
  }

  const fetchSchoolsForAddRole = function (districtId) {
    fetchSchool(districtId, (content) => {
      setAddRoleSchools(content)
    })
  }

  const fetchDistricts = function () {
    fetchDistrictsCall(
      {
        q: '',
        per_page: '1000',
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

  const fetchCustomRoles = function () {
    const filterData = {
      ...uiState.rolesFilter,
      districtId: districts.find((item) => item.dst_id === uiState.rolesFilter?.districtId)
        ?.dst_district_public_id,
      sort_by: orderBy,
      sort_order: order,
      kind: ROLE_KINDS.CUSTOM,
    }
    callRolesApi(
      { ...pageDetails, ...paginationMidState, ...filterData },
      (data) => {
        const { content, ...paginationDetail } = data
        if (isEmpty(content) && pageDetails.current_page !== 1) {
          paginationMidState.current_page = 1
          fetchCustomRoles()
        }
        setCustomRoles(content)
        setPageDetails((previousPageData) => {
          return {
            ...previousPageData,
            last_page: paginationDetail.last_page,
            current_page: paginationDetail.current_page,
            from: paginationDetail.from,
            per_page: paginationDetail.per_page,
            to: paginationDetail.to,
            total: paginationDetail.total,
          }
        })
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

  const addCustomRole = function (values, { setErrors, callback }) {
    createCustomRole(
      {
        ...values,
        districtId: districts.find((item) => item.dst_id === values?.districtId)
          ?.dst_district_public_id,
      },
      () => {
        callback()
        fetchCustomRoles()
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')

        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorRoleCreateGeneral'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorRoleCreateGeneral',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }
  const toggleDeletePopup = function (event) {
    if (!openDeletePopup) {
      const dataIds = Array.isArray(event)
        ? [...event]
        : [event.currentTarget.attributes['data-id'].value]
      deleteIds.current = dataIds
      setOpenDeletePopup(true)
    } else {
      setOpenDeletePopup(false)
    }
  }

  function deleteRole() {
    callDeleteRole(
      deleteIds.current,
      () => {
        toggleDeletePopup()
        fetchCustomRoles()
      },
      (err) => {
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorRoleDeleteGeneral'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorRoleDeleteGeneral',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  useEffect(() => {
    const headerData = {
      activeMenuItem: 'roles',
      activeParent: 'agm',
    }
    headerAction(headerData)
  }, [])

  useEffect(() => {
    fetchDistricts()
    fetchSystemRoles()
  }, [])

  React.useEffect(() => {
    if (isEmpty(uiState.rolesFilter)) {
      uiStateAction({ rolesFilter: filterState.current })
    }
  }, [])

  React.useEffect(() => {
    if (uiState.rolesFilter.districtId) {
      fetchSchool(uiState.rolesFilter.districtId, (content) => {
        setSchools(content)
      })
    }
  }, [uiState.rolesFilter.districtId])

  React.useEffect(() => {
    onApplyFilter()
  }, [order, orderBy, uiState.rolesFilter.renderer])

  /**
   * renders JSX of Role container component
   * @param user
   */
  return (
    <Roles
      systemRoles={systemRoles}
      customRoles={customRoles}
      addCustomRole={addCustomRole}
      openDeletePopup={openDeletePopup}
      toggleDeletePopup={toggleDeletePopup}
      deleteRole={deleteRole}
      pageDetails={pageDetails}
      onChangePage={onChangePage}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      filter={uiState.rolesFilter}
      districts={districts}
      schools={schools}
      setFilterValue={setFilterValue}
      onFilterReset={onFilterReset}
      onApplyFilter={onApplyFilter}
      onSearchEnter={onSearchEnter}
      addRoleSchools={addRoleSchools}
      fetchSchool={fetchSchoolsForAddRole}
      orgType={orgType}
      setOrgType={setOrgType}
      authUser={authUser}
    />
  )
}

RolesContainer.propTypes = {
  headerAction: PropTypes.func,
  createCustomRole: PropTypes.func,
  callDeleteRole: PropTypes.func,
  messageAction: PropTypes.func,
  callRolesApi: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  uiStateAction: PropTypes.func,
  uiState: PropTypes.object,
  authUser: PropTypes.object,
}

RolesContainer.defaultProps = {
  headerAction: () => {},
  createCustomRole: () => {},
  callDeleteRole: () => {},
  messageAction: () => {},
  callRolesApi: () => {},
  fetchDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
  uiState: {},
  uiStateAction: () => {},
  authUser: {},
}

const mapStateToProps = (state) => ({
  uiState: selectUiState(state),
  authUser: selectUser(state),
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  messageAction,
  createCustomRole,
  callDeleteRole,
  callRolesApi,
  fetchDistrictsCall,
  fetchSchoolsCall,
  uiStateAction,
})(RolesContainer)
