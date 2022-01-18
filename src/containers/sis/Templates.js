import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { uiStateAction } from '../../actions/app.action'
import { fetchDistrictsCall } from '../../actions/district.action'
import { headerAction } from '../../actions/header.action'
import { fetchSchoolsCall } from '../../actions/schools.action'
import { callDeleteTemplateApi, callGetTemplatesApi } from '../../actions/template.action'
import Templates from '../../components/sis/settings/templates/Templates'
import { selectUiState } from '../../helpers/selectors'
import { get, handleChangePage, isEmpty, isEnter } from '../../helpers/utils'

const StepPageData = {
  current_page: 1,
  per_page: 10,
  last_page: 1,
}

function TemplatesContainer({
  headerAction,
  callGetTemplatesApi,
  callDeleteTemplateApi,
  fetchDistrictsCall,
  fetchSchoolsCall,
  uiState,
  uiStateAction,
}) {
  const { t } = useTranslation()
  const allHeadCells = [
    {
      id: 'name',
      label: t('templateName'),
      isSort: false,
      sortProperty: 'name',
    },
    {
      id: 'nickname',
      label: t('templateFileName'),
      isSort: false,
      sortProperty: 'nickname',
    },
    {
      id: 'modified_at',
      label: t('lastUpdated'),
      isSort: false,
      sortProperty: 'modified_at',
    },
    {
      id: 'edit_template',
      label: t('editTemplate'),
      isSort: false,
      sortProperty: 'edit_template',
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
    f_collection: '',
    serviceCode: '',
    f_content: '',
    f_filename: '',
    f_nickname: '',
    districtId: '',
    renderer: uuid(),
  })

  const [checkState, setCheckState] = React.useState([])
  const [pageData, setPageData] = React.useState([])
  const [districts, setDistricts] = React.useState([])
  const [schools, setSchools] = React.useState([])
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('name')
  const [openDeletePopup, setOpenDeletePopup] = React.useState(false)
  const districtCode = useRef('')

  let paginationMidState = {
    ...StepPageData,
    current_page: StepPageData.current_page,
    per_page: StepPageData.per_page,
  }

  const [pageDetails, setPageDetails] = React.useState({
    ...paginationMidState,
  })

  const setFilterValue = function (e) {
    const templateFilter = {
      ...uiState.templateFilter,
      [e.target.name]: e.target.value,
    }
    if (e.target.name === 'districtId' && !e.target.value) {
      templateFilter.schoolId = ''
    }
    uiStateAction({ templateFilter })
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

  const onApplyFilter = function () {
    paginationMidState.current_page = 1
    fetchTemplateList()
  }

  const onFilterReset = function () {
    setPageData([])
    setSchools([])
    setPageDetails({ ...paginationMidState })
    districtCode.current = ''
    uiStateAction({
      templateFilter: filterState.current,
    })
  }

  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchTemplateList)
  }

  const onSearchEnter = function (event) {
    if (isEnter(event)) {
      event.preventDefault()
      fetchTemplateList()
    }
  }

  const onCheck = (event) => {
    if (Array.isArray(event)) {
      return setCheckState(event.map((item) => item.toString()))
    }
    const id = event.target.name
    if (checkState.includes(id)) {
      setCheckState(checkState.filter((item) => item !== id))
    } else {
      setCheckState((oldState) => [...oldState, id])
    }
  }

  function fetchTemplateList() {
    const filterData = {
      ...uiState.templateFilter,
      sort_by: orderBy,
      sort_order: order,
    }
    callGetTemplatesApi(
      {
        ...pageDetails,
        ...paginationMidState,
        ...filterData,
      },
      uiState.templateFilter.serviceCode,
      (records) => {
        const { content, ...paginationDetail } = records || {}
        if (isEmpty(content) && pageDetails.current_page !== 1) {
          paginationMidState.current_page = 1
          fetchTemplateList()
          return
        }
        setPageDetails((previousPageData) => {
          return {
            ...previousPageData,
            last_page: paginationDetail.lastPage,
            current_page: paginationDetail.currentPage,
            from: paginationDetail.from,
            per_page: paginationDetail.perPage,
            to: paginationDetail.to,
            total: paginationDetail.total,
          }
        })
        setPageData(content)
      }
    )
  }

  const toggleDeletePopup = function () {
    if (!openDeletePopup) {
      setOpenDeletePopup(true)
    } else {
      setOpenDeletePopup(false)
    }
  }

  const deleteForms = () => {
    callDeleteTemplateApi(checkState, () => {
      setCheckState([])
      toggleDeletePopup()
      fetchTemplateList()
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

  React.useEffect(() => {
    const headerData = {
      activeMenuItem: 'templates',
      activeParent: 'settings',
    }
    headerAction(headerData)
  }, [])

  React.useEffect(() => {
    if (isEmpty(uiState.templateFilter)) {
      uiStateAction({ templateFilter: filterState.current })
    }
  }, [])

  React.useEffect(() => {
    fetchDistricts()
  }, [])

  React.useEffect(() => {
    if (
      uiState.templateFilter.districtId &&
      uiState.templateFilter.districtId !== districtCode.current
    ) {
      fetchSchool(uiState.templateFilter.districtId)
      districtCode.current = uiState.templateFilter.districtId
    }
  }, [uiState.templateFilter.districtId])

  React.useEffect(() => {
    onApplyFilter()
  }, [orderBy, order, uiState.templateFilter.renderer])

  /**
   * renders JSX of Templates container
   * @param Templates
   */
  return (
    <Templates
      allHeadCells={allHeadCells}
      pageDetails={pageDetails}
      onChangePage={onChangePage}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      pageData={pageData}
      onCheck={onCheck}
      checkState={checkState}
      onFilterReset={onFilterReset}
      filter={uiState.templateFilter}
      onApplyFilter={onApplyFilter}
      deleteForms={deleteForms}
      setFilterValue={setFilterValue}
      toggleDeletePopup={toggleDeletePopup}
      openDeletePopup={openDeletePopup}
      onSearchEnter={onSearchEnter}
      districts={districts}
      schools={schools}
    />
  )
}

TemplatesContainer.propTypes = {
  headerAction: PropTypes.func,
  callGetTemplatesApi: PropTypes.func,
  callDeleteTemplateApi: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  uiState: PropTypes.object,
  uiStateAction: PropTypes.func,
}

TemplatesContainer.defaultProps = {
  headerAction: () => {},
  callGetTemplatesApi: () => {},
  callDeleteTemplateApi: () => {},
  fetchDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
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
  callGetTemplatesApi,
  callDeleteTemplateApi,
  fetchDistrictsCall,
  fetchSchoolsCall,
  uiStateAction,
})(TemplatesContainer)
