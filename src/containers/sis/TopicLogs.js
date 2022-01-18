import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { headerAction } from '../../actions/header.action'
import { fetchTopicsLogs } from '../../actions/notification.action'
import TopicLogs from '../../components/sis/administration/notification/TopicLogs'
import { TablePageData } from '../../data/TablePageData'
import { handleChangePage, isEmpty, isEnter } from '../../helpers/utils'

function TopicLogsContainer({ headerAction, fetchTopicsLogs }) {
  const { t } = useTranslation()
  const { topicId } = useParams()
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('')
  const [topicLog, setTopicLogs] = React.useState([])
  const [searchText, setSearchText] = React.useState('')
  let [paginationMidState] = React.useState({
    ...TablePageData,
  })
  const [pageDetails, setPageDetails] = React.useState({})
  const [filterState] = React.useState({
    f_startdate: '',
    f_enddate: '',
  })
  const [pageFilter, setPageFilter] = React.useState({ ...filterState })

  const onFilterReset = function () {
    // setSearchText('')
    setPageFilter('')
    getTopicsLog()
  }

  const onApplyFilter = function () {
    paginationMidState.current_page = 1
    getTopicsLog()
  }
  const setSearchValue = function (e) {
    setSearchText(e.target.value)
  }
  const onSearchEnter = function (event) {
    if (isEnter(event)) {
      event.preventDefault()
      onApplyFilter()
    }
  }

  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, getTopicsLog)
  }

  function getTopicsLog() {
    const filterData = {
      q: searchText,
      sortBy: orderBy,
      sortOrder: order,
      ...pageFilter,
      f_startdate:
        pageFilter.f_startdate && pageFilter.f_startdate instanceof Date
          ? pageFilter.f_startdate.setHours(0, 0, 0, 0)
          : '',
      f_enddate:
        pageFilter.f_enddate && pageFilter.f_enddate instanceof Date
          ? pageFilter.f_enddate.setHours(0, 0, 0, 0)
          : '',
    }
    fetchTopicsLogs(
      topicId,
      { ...pageDetails, ...paginationMidState, ...filterData },
      (records) => {
        const { content, ...paginationDetail } = records || {}
        if (isEmpty(content) && pageDetails.current_page !== 1) {
          paginationMidState.current_page = 1
          getTopicsLog()
        }
        setTopicLogs(content)
        setPageDetails((previousPageData) => {
          return {
            ...previousPageData,
            last_page: paginationDetail.last_page,
            page: paginationDetail.current_page,
            from: paginationDetail.from,
            per_page: paginationDetail.per_page,
            to: paginationDetail.to,
            total: paginationDetail.total,
          }
        })
      }
    )
  }

  React.useEffect(() => {
    if (topicId) {
      const headerData = {
        activeMenuItem: 'notification',
        activeParent: 'administration',
        sideBar: true,
      }

      headerAction(headerData)
      getTopicsLog()
    }
  }, [topicId])

  const allHeadCells = [
    { id: 'source', label: t('source'), isSort: true, sortProperty: 'source' },
    {
      id: 'time',
      label: t('time'),
      isSort: true,
      sortProperty: 'time',
    },
    {
      id: 'receivers',
      label: t('receivers'),
      isSort: true,
      sortProperty: 'receivers',
    },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
      width: '80px',
    },
  ]
  /**
   * renders JSX of Topic Logs container component
   * @param user
   */
  return (
    <TopicLogs
      allHeadCells={allHeadCells}
      onFilterReset={onFilterReset}
      topicLog={topicLog}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      pageDetails={pageDetails}
      pageFilter={pageFilter}
      setPageFilter={setPageFilter}
      topicId={topicId}
      setSearchValue={setSearchValue}
      onSearchEnter={onSearchEnter}
      searchText={searchText}
      onApplyFilter={onApplyFilter}
      onChangePage={onChangePage}
    />
  )
}

TopicLogsContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchTopicsLogs: PropTypes.func,
}

TopicLogsContainer.defaultProps = {
  headerAction: () => {},
  fetchTopicsLogs: () => {},
}
const mapStateToProps = () => ({})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  fetchTopicsLogs,
})(TopicLogsContainer)
