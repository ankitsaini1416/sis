import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { callRolesApi, fetchUsersCall } from '../../actions/agm2.action'
import { uiStateAction } from '../../actions/app.action'
import { headerAction } from '../../actions/header.action'
import localStorageService from '../../api/localStorageService'
import User from '../../components/sis/users/User'
import { TablePageData } from '../../data/TablePageData'
import { ROLE_KINDS } from '../../helpers/constants'
import { selectAuth, selectUiState } from '../../helpers/selectors'
import { get, handleChangePage, isEmpty, isEnter } from '../../helpers/utils'
import { fetchDistrictByIdCall, fetchDistrictsCall } from './../../actions/district.action'
import { fetchSchoolsCall } from './../../actions/schools.action'

const defaultHeadCells = [
  'username',
  'first_name',
  'email',
  'active',
  'created_timestamp',
  'actions',
]
function UserContainer({
  headerAction,
  fetchDistrictsCall,
  fetchSchoolsCall,
  fetchUsersCall,
  auth,
  uiState,
  uiStateAction,
  fetchDistrictByIdCall,
  callRolesApi,
}) {
  const { t } = useTranslation()
  const districtCode = useRef('')
  const schoolCode = useRef('')
  const allHeadCells = [
    {
      id: 'username',
      label: t('userName'),
      isSort: true,
      sortProperty: 'username',
    },
    {
      id: 'first_name',
      label: t('fullName'),
      isSort: true,
      sortProperty: 'first_name',
    },
    {
      id: 'email',
      label: t('userEmailID'),
      isSort: true,
      sortProperty: 'email',
    },
    { id: 'active', label: t('status'), isSort: true, sortProperty: 'active' },
    {
      id: 'created_timestamp',
      label: t('userCreated'),
      isSort: true,
      sortProperty: 'created_timestamp',
    },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
      width: '100px',
    },
  ]

  const [initialHeadcells, setInitialHeadcells] = useState(
    !isEmpty(localStorageService.getHeadCellsUsers())
      ? localStorageService.getHeadCellsUsers()
      : defaultHeadCells
  )

  const setHeadcells = function (headcells) {
    setInitialHeadcells(headcells)
    localStorageService.setHeadCellsUsers(headcells)
  }

  let [paginationMidState] = useState({
    ...TablePageData,
    current_page: TablePageData.current_page,
    per_page: TablePageData.per_page,
  })

  const filterState = useRef({
    q: '',
    districtId: '',
    schoolId: '',
    roleId: '',
    renderer: uuid(),
  })

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('first_name')
  const [users, setUsers] = useState([])
  const [districts, setDistricts] = React.useState([])
  const [schools, setSchools] = React.useState([])
  const [roles, setRoles] = React.useState([])

  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchUsers)
  }

  const [pageDetails, setPageDetails] = React.useState({
    ...paginationMidState,
  })

  const onSearchEnter = function (event) {
    if (isEnter(event)) {
      event.preventDefault()
      fetchUsers()
    }
  }

  const setFilterValue = function (e) {
    const userFilter = {
      ...uiState.userFilter,
      [e.target.name]: e.target.value,
    }
    if (e.target.name === 'districtId' && !e.target.value) {
      setSchools([])
      setRoles([])
      userFilter.schoolId = ''
      userFilter.roleId = ''
    }
    if (e.target.name === 'schoolId' && !e.target.value) {
      setRoles([])
      userFilter.roleId = ''
    }
    uiStateAction({ userFilter })
  }

  const onFilterReset = function () {
    setSchools([])
    setRoles([])
    uiStateAction({
      userFilter: { ...filterState.current, renderer: uuid() },
    })
  }

  const fetchSchool = function (districtId) {
    if (!districtId) {
      return
    }
    fetchSchoolsCall(
      {
        q: '',
        current_page: 1,
        per_page: 1000,
        is_active: '',
        districtId,
      },
      (data) => {
        const { content } = data
        setSchools(content)
      },
      null,
      false
    )
  }

  const fetchRoles = function ({ districtId = '', schoolId = '' }) {
    if (!districtId && !schoolId) {
      return
    }
    callRolesApi(
      {
        q: '',
        kind: ROLE_KINDS.CUSTOM,
        current_page: 1,
        per_page: 1000,
        districtId: districts.find((item) => item.dst_id === districtId)?.dst_district_public_id,
        schoolId,
      },
      (data) => {
        const { content } = data
        setRoles(content)
      },
      null,
      false
    )
  }

  const onApplyFilter = function () {
    paginationMidState.current_page = 1
    fetchUsers()
  }

  const fetchUsers = function () {
    const filterData = {
      ...uiState.userFilter,
      sort_by: orderBy,
      sort_order: order,
      districtId: districts.find((item) => item.dst_id === uiState.userFilter?.districtId)
        ?.dst_district_public_id,
    }
    fetchUsersCall({ ...pageDetails, ...paginationMidState, ...filterData }, (data) => {
      const { content, ...paginationDetail } = data
      if (isEmpty(content) && pageDetails.current_page !== 1) {
        paginationMidState.current_page = 1
        fetchUsers()
        return
      }
      setUsers(content)
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

  const fetchDistrictById = () => {
    fetchDistrictByIdCall(uiState.userFilter.dst_id, (data) => {
      setDistricts([data])
    })
  }

  useEffect(() => {
    const headerData = {
      activeMenuItem: 'users',
      activeParent: 'agm',
    }
    headerAction(headerData)
  }, [])

  useEffect(() => {
    if (isEmpty(uiState.userFilter)) {
      uiStateAction({ userFilter: filterState.current })
    }
  }, [])

  useEffect(() => {
    if (!isEmpty(uiState.userFilter.districtId)) {
      fetchDistrictById(uiState.userFilter.districtId)
    } else {
      fetchDistricts()
    }
  }, [])

  useEffect(() => {
    if (uiState.userFilter.districtId && uiState.userFilter.districtId !== districtCode.current) {
      fetchSchool(uiState.userFilter.districtId)
      districtCode.current = uiState.userFilter.districtId
    }
  }, [uiState.userFilter.districtId])

  useEffect(() => {
    onApplyFilter()
  }, [orderBy, order, uiState.userFilter.renderer, auth])

  if (uiState.userFilter.districtId !== districtCode.current) {
    fetchSchool(uiState.userFilter.districtId)
    fetchRoles({ districtId: uiState.userFilter.districtId })
    districtCode.current = uiState.userFilter.districtId || ''
  }

  if (uiState.userFilter.schoolId !== schoolCode.current) {
    fetchRoles({ districtId: uiState.userFilter.districtId, schoolId: uiState.userFilter.schoolId })
    schoolCode.current = uiState.userFilter.schoolId || ''
  }

  /**
   * renders JSX of User container
   * @param user
   */
  return (
    <User
      allHeadCells={allHeadCells}
      initialHeadcells={initialHeadcells}
      setHeadcells={setHeadcells}
      pageDetails={pageDetails}
      users={users}
      onChangePage={onChangePage}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      filter={uiState.userFilter}
      setFilterValue={setFilterValue}
      onFilterReset={onFilterReset}
      onApplyFilter={onApplyFilter}
      districts={districts}
      schools={schools}
      fetchSchool={fetchSchool}
      roles={roles}
      onSearchEnter={onSearchEnter}
    />
  )
}

UserContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchUsersCall: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  auth: PropTypes.object,
  uiState: PropTypes.object,
  uiStateAction: PropTypes.func,
  fetchDistrictByIdCall: PropTypes.func,
  callRolesApi: PropTypes.func,
}

UserContainer.defaultProps = {
  headerAction: () => {},
  fetchUsersCall: () => {},
  fetchDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
  auth: {},
  uiState: {},
  uiStateAction: () => {},
  fetchDistrictByIdCall: () => {},
  callRolesApi: () => {},
}
const mapStateToProps = (state) => ({
  auth: selectAuth(state),
  uiState: selectUiState(state),
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  fetchUsersCall,
  fetchDistrictsCall,
  fetchSchoolsCall,
  uiStateAction,
  fetchDistrictByIdCall,
  callRolesApi,
})(UserContainer)
