import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { uiStateAction } from '../../actions/app.action'
import {
  fetchApplicationsCall,
  updateUserCall,
  userByEmailCall,
} from '../../actions/application.action'
import { fetchDistrictsCall } from '../../actions/district.action'
import { headerAction } from '../../actions/header.action'
import { fetchInstituteDistrictsCall } from '../../actions/InstituteDistrict.action'
import { fetchSchoolsCall } from '../../actions/schools.action'
import localStorageService from '../../api/localStorageService'
import AllApplication from '../../components/sis/application/AllApplication'
import { TablePageData } from '../../data/TablePageData'
import { selectUiState } from '../../helpers/selectors'
import { get, handleChangePage, isEmpty, isEnter } from '../../helpers/utils'

const defaultHeadCells = [
  'email',
  'first_name',
  'last_name',
  'age',
  'address',
  'primary_phone',
  'home_phone',
  'date_of_application',
  'status',
  'actions',
]

function AllApplicationContainer({
  headerAction,
  fetchApplicationsCall,
  fetchSchoolsCall,
  fetchDistrictsCall,
  fetchInstituteDistrictsCall,
  userByEmailCall,
  updateUserCall,
  uiState,
  uiStateAction,
}) {
  const { t } = useTranslation()
  const allHeadCells = [
    {
      id: 'email',
      label: t('email'),
      isSort: true,
      sortProperty: 'email',
    },
    {
      id: 'first_name',
      label: t('firstName'),
      isSort: true,
      sortProperty: 'first_name',
    },
    {
      id: 'last_name',
      label: t('lastName'),
      isSort: true,
      sortProperty: 'last_name',
    },
    {
      id: 'birthday',
      label: t('age'),
      isSort: true,
      sortProperty: 'birthday',
    },
    // {
    //   id: 'addresses',
    //   label: t('address'),
    //   isSort: true,
    //   sortProperty: 'addresses',
    // },
    // {
    //   id: 'mobile_phone',
    //   label: t('primaryPhone'),
    //   isSort: true,
    //   sortProperty: 'mobile_phone',
    // },
    // {
    //   id: 'home_phone',
    //   label: t('homePhone'),
    //   isSort: true,
    //   sortProperty: 'home_phone',
    // },
    {
      id: 'date_of_application',
      label: t('dateOfApplication'),
      isSort: true,
      sortProperty: 'date_of_application',
    },
    {
      id: 'status',
      label: t('approval_status'),
      isSort: true,
      sortProperty: 'status',
    },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
      width: '180px',
    },
  ]
  const [order, setOrder] = React.useState('desc')
  const [orderBy, setOrderBy] = React.useState('date_of_application')
  const [registerList, setRegisterList] = React.useState([])
  const [districts, setDistricts] = React.useState([])
  const [schools, setSchools] = React.useState([])
  const districtCode = useRef('')

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
    fromDate: '',
    toDate: '',
    approvalStatus: '',
    districtId: '',
    schoolId: '',
    renderer: uuid(),
  })
  const [initialHeadcells, setInitialHeadcells] = React.useState(
    !isEmpty(localStorageService.getHeadCellsApplication())
      ? localStorageService.getHeadCellsApplication()
      : defaultHeadCells
  )

  const setHeadcells = function (headcells) {
    setInitialHeadcells(headcells)
    localStorageService.setHeadCellsApplication(headcells)
  }
  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchRegisterList)
  }

  const onSearchEnter = function (event) {
    if (isEnter(event)) {
      event.preventDefault()
      fetchRegisterList()
    }
  }

  const onFilterReset = function () {
    setRegisterList([])
    setSchools([])
    setPageDetails({ ...paginationMidState })
    districtCode.current = ''
    uiStateAction({
      applicationFilter: filterState.current,
    })
  }

  const onApplyFilter = function () {
    paginationMidState.current_page = 1
    fetchRegisterList()
  }

  const setFilterValue = function (e) {
    const applicationFilter = {
      ...uiState.applicationFilter,
      [e.target.name]: e.target.value,
    }
    if (e.target.name === 'districtId' && !e.target.value) {
      applicationFilter.schoolId = ''
    }
    uiStateAction({ applicationFilter })
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
  const fetchRegisterList = function () {
    let filterData = {
      ...uiState.applicationFilter,
      sort_by: orderBy,
      sort_order: order,
    }
    fetchApplicationsCall({ ...pageDetails, ...paginationMidState, ...filterData }, (data) => {
      const { content, ...paginationDetail } = data
      if (isEmpty(content) && pageDetails.current_page !== 1) {
        paginationMidState.current_page = 1
        fetchRegisterList()
        return
      }
      setRegisterList(content)
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

  const editAction = (event) => {
    const dataId = event.currentTarget.attributes['data-id'].value
    const action = event.currentTarget.attributes['data-action'].value
    const currentRegisteration = registerList.find((item) => item.id === dataId)
    const school = registerList.find((item) => item.id === dataId)
    userByEmailCall(currentRegisteration.email, school.attributes?.school_public_id, (data) => {
      updateUserCall(
        currentRegisteration.email,
        school.attributes?.school_public_id,
        {
          ...data,
          approval_status: action,
        },
        () => {
          fetchRegisterList()
        }
      )
    })
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

  React.useEffect(() => {
    const headerData = {
      activeMenuItem: 'allApplications',
      activeParent: 'allApplications',
    }
    headerAction(headerData)
  }, [])

  React.useEffect(() => {
    if (isEmpty(uiState.applicationFilter)) {
      uiStateAction({ applicationFilter: filterState.current })
    }
  }, [])

  React.useEffect(() => {
    fetchDistricts()
  }, [])
  React.useEffect(() => {
    fetchInstituteDistricts()
  }, [])

  React.useEffect(() => {
    if (
      uiState.applicationFilter.districtId &&
      uiState.applicationFilter.districtId !== districtCode.current
    ) {
      fetchSchool(uiState.applicationFilter.districtId)
      districtCode.current = uiState.applicationFilter.districtId
    }
  }, [uiState.applicationFilter.districtId])

  React.useEffect(() => {
    onApplyFilter()
  }, [order, orderBy, uiState.applicationFilter.renderer])

  function getDate(timeStamp) {
    let d = new Date(timeStamp)
    return d.toLocaleString()
  }

  /**
   * renders JSX of AllApplication container
   * @param AllApplication
   */
  return (
    <AllApplication
      allHeadCells={allHeadCells}
      initialHeadcells={initialHeadcells}
      setHeadcells={setHeadcells}
      pageDetails={pageDetails}
      registerList={registerList}
      onChangePage={onChangePage}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      filter={uiState.applicationFilter}
      districts={districts}
      schools={schools}
      setFilterValue={setFilterValue}
      onFilterReset={onFilterReset}
      onApplyFilter={onApplyFilter}
      getDate={getDate}
      editAction={editAction}
      onSearchEnter={onSearchEnter}
    />
  )
}

AllApplicationContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchApplicationsCall: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchInstituteDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  userByEmailCall: PropTypes.func,
  updateUserCall: PropTypes.func,
  uiStateAction: PropTypes.func,
  uiState: PropTypes.object,
}

AllApplicationContainer.defaultProps = {
  headerAction: () => {},
  fetchApplicationsCall: () => {},
  fetchDistrictsCall: () => {},
  fetchInstituteDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
  userByEmailCall: () => {},
  updateUserCall: () => {},
  uiState: {},
  uiStateAction: () => {},
}

const mapStateToProps = (state) => ({
  uiState: selectUiState(state),
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  fetchApplicationsCall,
  fetchDistrictsCall,
  fetchInstituteDistrictsCall,
  fetchSchoolsCall,
  userByEmailCall,
  updateUserCall,
  uiStateAction,
})(AllApplicationContainer)
