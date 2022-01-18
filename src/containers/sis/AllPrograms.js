import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { messageAction, uiStateAction } from '../../actions/app.action'
import { fetchDistrictsCall } from '../../actions/district.action'
import { headerAction } from '../../actions/header.action'
import { archiveProgramCall, fetchProgramsCall } from '../../actions/program.action'
import { fetchSchoolsCall } from '../../actions/schools.action'
import localStorageService from '../../api/localStorageService'
import AllPrograms from '../../components/sis/programs/AllPrograms'
import { TablePageData } from '../../data/TablePageData'
import { MESSAGE_SEVERITIES } from '../../helpers/constants'
import { selectUiState } from '../../helpers/selectors'
import { isEmpty } from '../../helpers/utils'
import { get, handleChangePage, isEnter } from '../../helpers/utils'
import { mapGeneralErrors } from '../../helpers/validator'

const defaultHeadCells = [
  'pgm_program_public_id',
  'pgm_name',
  'pgm_minimum_age',
  'pgm_require_transcript',
  'created_at',
  'updated_at',
  'pgm_is_active',
  'actions',
]
function AllProgramsContainer({
  headerAction,
  fetchProgramsCall,
  fetchDistrictsCall,
  fetchSchoolsCall,
  archiveProgramCall,
  uiState,
  uiStateAction,
  messageAction,
}) {
  const { t } = useTranslation()

  const allHeadCells = [
    {
      id: 'pgm_program_public_id',
      label: t('programId'),
      isSort: true,
      sortProperty: 'pgm_program_public_id',
    },
    {
      id: 'pgm_name',
      label: t('programName'),
      isSort: true,
      sortProperty: 'pgm_name',
    },
    {
      id: 'pgm_minimum_age',
      label: t('minAge'),
      isSort: true,
      sortProperty: 'pgm_minimum_age',
    },
    {
      id: 'pgm_require_transcript',
      label: t('transcriptRequired'),
      isSort: true,
      sortProperty: 'pgm_require_transcript',
    },
    {
      id: 'created_at',
      label: t('createdDate'),
      isSort: true,
      sortProperty: 'created_at',
    },
    {
      id: 'updated_at',
      label: t('lastUpdated'),
      isSort: true,
      sortProperty: 'updated_at',
    },
    {
      id: 'pgm_is_active',
      label: t('status'),
      isSort: true,
      sortProperty: 'pgm_is_active',
    },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
    },
  ]

  const filterState = React.useRef({
    q: '',
    fromDate: '',
    toDate: '',
    requireTranscript: '',
    isActive: '',
    districtId: '',
    schoolId: '',
    renderer: uuid(),
  })

  const [initialHeadcells, setInitialHeadcells] = React.useState(
    !isEmpty(localStorageService.getHeadCellsPrograms())
      ? localStorageService.getHeadCellsPrograms()
      : defaultHeadCells
  )

  const setHeadcells = function (headcells) {
    setInitialHeadcells(headcells)
    localStorageService.setHeadCellsPrograms(headcells)
  }

  const [order, setOrder] = React.useState('desc')
  const [orderBy, setOrderBy] = React.useState('updated_at')
  const [programList, setProgramList] = React.useState([])
  const [districts, setDistricts] = React.useState([])
  const [schools, setSchools] = React.useState([])
  const [openArchivePopup, setOpenArchivePopup] = React.useState(false)
  const archiveIds = React.useRef([])
  const districtCode = useRef('')
  let [paginationMidState] = React.useState({
    ...TablePageData,
    current_page: TablePageData.current_page,
    per_page: TablePageData.per_page,
  })

  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchProgramsList)
  }

  const [pageDetails, setPageDetails] = React.useState({
    ...paginationMidState,
  })

  const setFilterValue = function (e) {
    const programFilter = {
      ...uiState.programFilter,
      [e.target.name]: e.target.value,
    }
    if (e.target.name === 'districtId' && !e.target.value) {
      programFilter.schoolId = ''
    }
    uiStateAction({ programFilter })
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

  const onFilterReset = function () {
    setProgramList([])
    setSchools([])
    setPageDetails({ ...paginationMidState })
    districtCode.current = ''
    uiStateAction({
      programFilter: filterState.current,
    })
  }

  const onApplyFilter = function () {
    paginationMidState.current_page = 1
    fetchProgramsList()
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

  const onSearchEnter = function (event) {
    if (isEnter(event)) {
      event.preventDefault()
      fetchProgramsList()
    }
  }

  const fetchProgramsList = function () {
    let filterData = {
      ...uiState.programFilter,
      sort_by: orderBy,
      sort_order: order,
    }
    fetchProgramsCall({ ...pageDetails, ...paginationMidState, ...filterData }, (data) => {
      const { content, ...paginationDetail } = data
      if (isEmpty(content) && pageDetails.current_page !== 1) {
        paginationMidState.current_page = 1
        fetchProgramsList()
        return
      }
      setProgramList(content)
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

  const toggleArchivePopup = function (event) {
    if (!openArchivePopup) {
      const dataIds = Array.isArray(event)
        ? [...event]
        : event.currentTarget.attributes['data-id'].value
      archiveIds.current = dataIds
      setOpenArchivePopup(true)
    } else {
      archiveIds.current = []
      setOpenArchivePopup(false)
    }
  }

  const archiveDetail = () => {
    archiveProgramCall(
      archiveIds.current,
      () => {
        toggleArchivePopup()
        fetchProgramsList()
      },
      (err) => {
        toggleArchivePopup()
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:archiveProgram'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:archiveProgram',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  React.useEffect(() => {
    const headerData = {
      activeMenuItem: 'allPrograms',
      activeParent: 'programs',
    }
    headerAction(headerData)
  }, [])

  React.useEffect(() => {
    fetchDistricts()
  }, [])

  React.useEffect(() => {
    if (
      uiState.programFilter.districtId &&
      uiState.programFilter.districtId !== districtCode.current
    ) {
      fetchSchool(uiState.programFilter.districtId)
      districtCode.current = uiState.programFilter.districtId
    }
  }, [uiState.programFilter.districtId])

  React.useEffect(() => {
    if (isEmpty(uiState.programFilter)) {
      uiStateAction({ programFilter: filterState.current })
    }
  }, [])

  React.useEffect(() => {
    onApplyFilter()
  }, [orderBy, order, uiState.programFilter.renderer])

  /**
   * renders JSX of All Programs container
   * @param AllPrograms
   */

  return (
    <AllPrograms
      allHeadCells={allHeadCells}
      initialHeadcells={initialHeadcells}
      setHeadcells={setHeadcells}
      pageDetails={pageDetails}
      programList={programList}
      onChangePage={onChangePage}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      filter={uiState.programFilter}
      districts={districts}
      schools={schools}
      setFilterValue={setFilterValue}
      onFilterReset={onFilterReset}
      onApplyFilter={onApplyFilter}
      archiveDetail={archiveDetail}
      openArchivePopup={openArchivePopup}
      toggleArchivePopup={toggleArchivePopup}
      onSearchEnter={onSearchEnter}
      fetchSchool={fetchSchool}
    />
  )
}

AllProgramsContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchProgramsCall: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  archiveProgramCall: PropTypes.func,
  uiState: PropTypes.object,
  uiStateAction: PropTypes.func,
  messageAction: PropTypes.func,
}

AllProgramsContainer.defaultProps = {
  headerAction: () => {},
  fetchProgramsCall: () => {},
  fetchDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
  archiveProgramCall: () => {},
  uiStateAction: () => {},
  uiState: {},
  messageAction: () => {},
}

const mapStateToProps = (state) => ({
  uiState: selectUiState(state),
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  fetchProgramsCall,
  fetchDistrictsCall,
  fetchSchoolsCall,
  archiveProgramCall,
  uiStateAction,
  messageAction,
})(AllProgramsContainer)
