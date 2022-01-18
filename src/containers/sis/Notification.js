import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { messageAction, uiStateAction } from '../../actions/app.action'
import { headerAction } from '../../actions/header.action'
import {
  deleteTopicAction,
  fetchTopicsDetail,
  makeDefaultAction,
} from '../../actions/notification.action'
import Notification from '../../components/sis/administration/notification/Notification'
import { TablePageData } from '../../data/TablePageData'
import { MESSAGE_SEVERITIES } from '../../helpers/constants'
import { selectUiState } from '../../helpers/selectors'
import { get, handleChangePage, isEmpty, isEnter } from '../../helpers/utils'
import { mapGeneralErrors } from '../../helpers/validator'

function NotificationContainer({
  headerAction,
  fetchTopicsDetail,
  deleteTopicAction,
  uiStateAction,
  uiState,
  makeDefaultAction,
}) {
  const { t } = useTranslation()

  const allHeadCells = [
    { id: 'name', label: t('topicName'), isSort: true, sortProperty: 'name' },
    {
      id: 'description',
      label: t('description'),
      isSort: true,
      sortProperty: 'description',
      width: '300px',
    },
    {
      id: 'status',
      label: t('status'),
      isSort: true,
      sortProperty: 'status',
    },
    {
      id: 'last_updated',
      label: t('lastUpdated'),
      isSort: true,
      sortProperty: 'last_updated',
    },
    { id: 'default_topic', label: t('defaultTopic'), isSort: true, sortProperty: 'default_topic' },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
      width: '150px',
    },
  ]

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('')
  const deleteIds = useRef([])
  const [renderer, setRenderer] = React.useState(uuid())

  const [topic, setTopic] = React.useState([])
  const [searchText, setSearchText] = React.useState('')
  const [openDeletePopup, setOpenDeletePopup] = React.useState(false)
  let [paginationMidState] = React.useState({
    ...TablePageData,
    current_page: TablePageData.current_page,
    per_page: TablePageData.per_page,
  })
  const [pageDetails, setPageDetails] = React.useState({
    ...paginationMidState,
  })
  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, getTopicDetails)
  }
  const setSearchValue = function (e) {
    setSearchText(e.target.value)
  }
  const handleClickListView = () => {
    uiStateAction({ spaceListType: 'list' })
  }
  const handleClickGridView = () => {
    uiStateAction({ spaceListType: 'grid' })
  }
  const onSearchEnter = function (event) {
    if (isEnter(event)) {
      event.preventDefault()
      getTopicDetails()
    }
  }

  const onReset = function () {
    setSearchText('')
    setRenderer(uuid())
  }

  const getTopicDetails = function () {
    const filterData = {
      sort_by: orderBy,
      sort_order: order,
      q: searchText,
    }
    fetchTopicsDetail({ ...pageDetails, ...paginationMidState, ...filterData }, (records) => {
      const { content, ...paginationDetail } = get(records, 'data', {})
      if (isEmpty(content) && pageDetails.current_page !== 1) {
        paginationMidState.current_page = 1
        getTopicDetails()
      }
      setTopic(content)
      setPageDetails((previousPageData) => {
        return {
          ...previousPageData,
          lastPage: Math.ceil(paginationDetail.total / paginationDetail.per_page),
          current_page: paginationDetail.current_page,
          from: paginationDetail.from,
          per_page: paginationDetail.per_page,
          to: paginationDetail.to,
          total: paginationDetail.total,
        }
      })
    })
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

  const deleteItems = () => {
    deleteTopicAction(
      deleteIds.current,
      () => {
        toggleDeletePopup()
        getTopicDetails()
      },
      (err) => {
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:deleteTopic'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:deleteTopic',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }
  const makeDefault = function (event) {
    const id = event.currentTarget.attributes['data-id'].value
    makeDefaultAction(
      id,
      () => {
        getTopicDetails()
      },
      (err) => {
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:defaultTopic'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:defaultTopic',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  React.useEffect(() => {
    const headerData = {
      activeMenuItem: 'notification',
      activeParent: 'administration',
    }
    headerAction(headerData)
  }, [])

  React.useEffect(() => {
    getTopicDetails()
  }, [orderBy, order, renderer])

  /**
   * renders JSX of Role container component
   * @param user
   */
  return (
    <Notification
      topic={topic}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      deleteItems={deleteItems}
      pageDetails={pageDetails}
      allHeadCells={allHeadCells}
      onChangePage={onChangePage}
      setSearchValue={setSearchValue}
      onSearchEnter={onSearchEnter}
      searchText={searchText}
      handleClickListView={handleClickListView}
      handleClickGridView={handleClickGridView}
      uiState={uiState}
      toggleDeletePopup={toggleDeletePopup}
      openDeletePopup={openDeletePopup}
      getTopicDetails={getTopicDetails}
      onReset={onReset}
      makeDefault={makeDefault}
    />
  )
}

NotificationContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchTopicsDetail: PropTypes.func,
  deleteTopicAction: PropTypes.func,
  uiStateAction: PropTypes.func,
  uiState: PropTypes.object,
  makeDefaultAction: PropTypes.func,
}

NotificationContainer.defaultProps = {
  headerAction: () => {},
  fetchTopicsDetail: () => {},
  deleteTopicAction: () => {},
  uiStateAction: () => {},
  makeDefaultAction: () => {},
  uiState: {},
}
const mapStateToProps = (state) => ({
  uiState: selectUiState(state),
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  fetchTopicsDetail,
  deleteTopicAction,
  uiStateAction,
  makeDefaultAction,
})(NotificationContainer)
