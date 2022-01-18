import toNumber from 'lodash/toNumber'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { messageAction, uiStateAction } from '../../actions/app.action'
import { fetchDistrictsCall } from '../../actions/district.action'
import { headerAction } from '../../actions/header.action'
import { fetchSchoolsCall } from '../../actions/schools.action'
import { deleteTranscriptCall, fetchTranscriptsCall } from '../../actions/transcript.action'
import TranScript from '../../components/sis/tranScript/TranScript'
import { TablePageData } from '../../data/TablePageData'
import { MESSAGE_SEVERITIES, USEQUERY } from '../../helpers/constants'
import { selectUiState } from '../../helpers/selectors'
import { get, getQueryData, handleChangePage, isEmpty, isEnter } from '../../helpers/utils'
import { mapGeneralErrors } from '../../helpers/validator'
const defaultHeadCells = ['tt_template_name', 'created_at', 'updated_at', 'status', 'actions']

function TranScriptContainer({
  headerAction,
  fetchSchoolsCall,
  fetchDistrictsCall,
  fetchTranscriptsCall,
  deleteTranscriptCall,
  uiState,
  uiStateAction,
  messageAction,
}) {
  const { t } = useTranslation()
  const filterState = useRef({
    q: '',
    fromDate: '',
    toDate: '',
    isActive: '',
    districtId: '',
    schoolId: '',
    renderer: uuid(),
  })
  const [districts, setDistricts] = useState([])
  const [schools, setSchools] = useState([])
  const [transcripts, setTranscript] = useState([])
  const deleteIds = useRef([])
  const districtCode = useRef('')
  const [initialHeadcells, setInitialHeadcells] = useState(defaultHeadCells)
  const setHeadcells = function (headcells) {
    setInitialHeadcells(headcells)
  }
  const [queryData] = useState(USEQUERY ? getQueryData() : {})
  let [paginationMidState] = useState({
    ...TablePageData,
    current_page: toNumber(queryData.current_page) || TablePageData.current_page,
    per_page: toNumber(queryData.per_page) || TablePageData.per_page,
  })
  const [pageDetails, setPageDetails] = React.useState({
    ...paginationMidState,
  })
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('tt_template_name')
  const [openDeletePopup, setOpenDeletePopup] = React.useState(false)

  const fetchTranscripts = function () {
    const filterData = {
      ...uiState.transcriptFilter,
      sort_by: orderBy,
      sort_order: order,
    }
    fetchTranscriptsCall({ ...pageDetails, ...paginationMidState, ...filterData }, (data) => {
      const { content, ...paginationDetail } = data
      if (isEmpty(content) && pageDetails.current_page !== 1) {
        paginationMidState.current_page = 1
        fetchTranscripts()
        return
      }
      setTranscript(content)
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

  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchTranscripts)
  }

  const setFilterValue = function (e) {
    const transcriptFilter = {
      ...uiState.transcriptFilter,
      [e.target.name]: e.target.value,
    }
    if (e.target.name === 'districtId' && !e.target.value) {
      transcriptFilter.schoolId = ''
    }
    uiStateAction({ transcriptFilter })
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

  const onFilterReset = function () {
    setTranscript([])
    setSchools([])
    setPageDetails({ ...paginationMidState })
    districtCode.current = ''
    uiStateAction({
      transcriptFilter: filterState.current,
    })
  }

  const onApplyFilter = function () {
    paginationMidState.current_page = 1
    fetchTranscripts()
  }

  const onSearchEnter = function (event) {
    if (isEnter(event)) {
      event.preventDefault()
      fetchTranscripts()
    }
  }

  const toggleDeletePopup = function (event) {
    if (!openDeletePopup) {
      const dataIds = Array.isArray(event)
        ? [...event]
        : [event.currentTarget.attributes['data-id'].value]
      deleteIds.current = dataIds
      setOpenDeletePopup(true)
    } else {
      deleteIds.current = []
      setOpenDeletePopup(false)
    }
  }

  const deleteTranscript = () => {
    deleteTranscriptCall(
      deleteIds.current,
      () => {
        toggleDeletePopup()
        fetchTranscripts()
      },
      (err) => {
        toggleDeletePopup()
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:deleteTranscript'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:deleteTranscript',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  useEffect(() => {
    const headerData = {
      activeMenuItem: 'tranScript',
      activeParent: 'tranScript',
    }
    headerAction(headerData)
  }, [])

  useEffect(() => {
    if (isEmpty(uiState.transcriptFilter)) {
      uiStateAction({ transcriptFilter: filterState.current })
    }
  }, [])

  useEffect(() => {
    fetchDistricts()
  }, [])

  React.useEffect(() => {
    if (
      uiState.transcriptFilter.districtId &&
      uiState.transcriptFilter.districtId !== districtCode.current
    ) {
      fetchSchool(uiState.transcriptFilter.districtId)
      districtCode.current = uiState.transcriptFilter.districtId
    }
  }, [uiState.transcriptFilter.districtId])

  useEffect(() => {
    onApplyFilter()
  }, [orderBy, order, uiState.transcriptFilter.renderer])

  const allHeadCells = [
    {
      id: 'tt_template_name',
      label: t('transcriptTemplateName'),
      isSort: true,
      sortProperty: 'tt_template_name',
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
    { id: 'status', label: t('status'), isSort: true, sortProperty: 'status' },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
      width: '150px',
    },
  ]

  /**
   * renders JSX of Tran Script container
   * @param TranScript
   */

  return (
    <TranScript
      transcripts={transcripts}
      fetchTranscripts={fetchTranscripts}
      deleteTranscript={deleteTranscript}
      allHeadCells={allHeadCells}
      initialHeadcells={initialHeadcells}
      setHeadcells={setHeadcells}
      pageDetails={pageDetails}
      onChangePage={onChangePage}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      filter={uiState.transcriptFilter}
      districts={districts}
      schools={schools}
      setFilterValue={setFilterValue}
      onFilterReset={onFilterReset}
      onApplyFilter={onApplyFilter}
      onSearchEnter={onSearchEnter}
      toggleDeletePopup={toggleDeletePopup}
      openDeletePopup={openDeletePopup}
    />
  )
}

TranScriptContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  fetchTranscriptsCall: PropTypes.func,
  deleteTranscriptCall: PropTypes.func,
  uiState: PropTypes.object,
  uiStateAction: PropTypes.func,
  messageAction: PropTypes.func,
}

TranScriptContainer.defaultProps = {
  headerAction: () => {},
  fetchDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
  fetchTranscriptsCall: () => {},
  deleteTranscriptCall: () => {},
  uiState: {},
  uiStateAction: () => {},
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
  fetchDistrictsCall,
  fetchSchoolsCall,
  fetchTranscriptsCall,
  deleteTranscriptCall,
  uiStateAction,
  messageAction,
})(TranScriptContainer)
