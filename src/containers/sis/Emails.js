import toNumber from 'lodash/toNumber'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { uiStateAction } from '../../actions/app.action'
import { fetchEmailCall } from '../../actions/email.action'
import { headerAction } from '../../actions/header.action'
import Emails from '../../components/sis/settings/emails/Emails'
import { TablePageData } from '../../data/TablePageData'
import { USEQUERY } from '../../helpers/constants'
import { selectUiState } from '../../helpers/selectors'
import { get, getQueryData, handleChangePage, isEmpty } from '../../helpers/utils'
import { fetchDistrictsCall } from './../../actions/district.action'
import { fetchSchoolsCall } from './../../actions/schools.action'

function EmailsContainer({
  headerAction,
  fetchEmailCall,
  uiState,
  uiStateAction,
  fetchDistrictsCall,
  fetchSchoolsCall,
}) {
  const [queryData] = React.useState(USEQUERY ? getQueryData() : {})
  let [paginationMidState] = React.useState({
    ...TablePageData,
    current_page: toNumber(queryData.current_page) || TablePageData.current_page,
    per_page: toNumber(queryData.per_page) || TablePageData.per_page,
  })
  const [pageDetails, setPageDetails] = React.useState({ ...paginationMidState })
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState()
  const [email, setEmail] = React.useState([])
  const [districts, setDistricts] = React.useState([])
  const [schools, setSchools] = React.useState([])
  const districtCode = useRef('')

  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchEmail)
  }

  const filterState = React.useRef({
    districtId: '',
    schoolId: '',
    renderer: uuid(),
  })

  const setFilterValue = function (e) {
    uiStateAction({
      emailFilter: {
        ...uiState.emailFilter,
        [e.target.name]: e.target.value,
      },
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
    setEmail([])
    setSchools([])
    setPageDetails({ ...paginationMidState })
    districtCode.current = ''
    uiStateAction({
      emailFilter: filterState.current,
    })
  }

  const onApplyFilter = function () {
    paginationMidState.current_page = 1
    fetchEmail()
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
  const fetchEmail = function () {
    let filterData = {
      ...uiState.emailFilter,
      sort_by: orderBy,
      sort_order: order,
    }
    fetchEmailCall(
      uiState.emailFilter.schoolId,
      { ...pageDetails, ...paginationMidState, ...filterData },
      (data) => {
        const { content, ...paginationDetail } = data
        if (isEmpty(content) && pageDetails.current_page !== 1) {
          paginationMidState.current_page = 1
          fetchEmail()
          return
        }
        setEmail(content)
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
      }
    )
  }
  React.useEffect(() => {
    const headerData = { activeMenuItem: 'emails', activeParent: 'settings' }
    headerAction(headerData)
  }, [])

  React.useEffect(() => {
    if (isEmpty(uiState.emailFilter)) {
      uiStateAction({ emailFilter: filterState.current })
    }
  }, [])

  React.useEffect(() => {
    fetchDistricts()
  }, [])

  React.useEffect(() => {
    if (uiState.emailFilter.districtId && uiState.emailFilter.districtId !== districtCode.current) {
      fetchSchool(uiState.emailFilter.districtId)
      districtCode.current = uiState.emailFilter.districtId
    }
  }, [uiState.emailFilter.districtId])

  React.useEffect(() => {
    onApplyFilter()
  }, [orderBy, order, uiState.emailFilter.renderer])

  /**
   * renders JSX of User container
   * @param user
   */
  return (
    <Emails
      pageDetails={pageDetails}
      onChangePage={onChangePage}
      email={email}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      filter={uiState.emailFilter}
      setFilterValue={setFilterValue}
      onFilterReset={onFilterReset}
      onApplyFilter={onApplyFilter}
      districts={districts}
      schools={schools}
      fetchSchool={fetchSchool}
    />
  )
}

EmailsContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchEmailCall: PropTypes.func,
  uiState: PropTypes.object,
  uiStateAction: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
}

EmailsContainer.defaultProps = {
  headerAction: () => {},
  fetchEmailCall: () => {},
  uiState: {},
  uiStateAction: () => {},
  fetchDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
}
const mapStateToProps = (state) => ({
  uiState: selectUiState(state),
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  fetchEmailCall,
  fetchDistrictsCall,
  fetchSchoolsCall,
  uiStateAction,
})(EmailsContainer)
