import toNumber from 'lodash/toNumber'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { uiStateAction } from '../../actions/app.action'
import { headerAction } from '../../actions/header.action'
import SchoolDetails from '../../components/sis/organizations/schools/SchoolDetail'
import { TablePageData } from '../../data/TablePageData'
import { USEQUERY } from '../../helpers/constants'
import { getQueryData, handleChangePage } from '../../helpers/utils'
import { fetchSchoolByIdCall } from './../../actions/schools.action'

function SchoolDetailsContainer({ headerAction, fetchSchoolByIdCall, uiStateAction }) {
  const { schoolId } = useParams()
  const history = useHistory()
  const [queryData] = React.useState(USEQUERY ? getQueryData() : {})
  let [paginationMidState] = React.useState({
    ...TablePageData,
    current_page: toNumber(queryData.current_page) || TablePageData.current_page,
    per_page: toNumber(queryData.per_page) || TablePageData.per_page,
  })
  const [school, setSchool] = useState({})
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('name')

  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState)
  }

  const viewAdmin = function () {
    history.push(`/sis/users`)
    uiStateAction({
      userFilter: {
        districtId: school.sch_district?.dst_urn ? school.sch_district?.dst_urn : '',
        dst_id: school.sch_district?.dst_id ? school.sch_district?.dst_id : '',
        dst_name: school.sch_district?.dst_name ? school.sch_district?.dst_name : '',
        sch_name: school.sch_name ? school.sch_name : '',
        schoolId: school.sch_urn ? school.sch_urn : '',
      },
    })
  }

  React.useEffect(() => {
    const headerData = {
      activeMenuItem: 'schools',
      activeParent: 'organizations',
    }
    headerAction(headerData)
  }, [])
  useEffect(() => {
    fetchSchoolByIdCall(schoolId, (data) => {
      setSchool(data)
    })
  }, [])

  /**
   * renders JSX of User container
   * @param user
   */
  return (
    <SchoolDetails
      school={school}
      onChangePage={onChangePage}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      viewAdmin={viewAdmin}
    />
  )
}

SchoolDetailsContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchSchoolByIdCall: PropTypes.func,
  uiStateAction: PropTypes.func,
}

SchoolDetailsContainer.defaultProps = {
  headerAction: () => {},
  fetchSchoolByIdCall: () => {},
  uiStateAction: () => {},
}
const mapStateToProps = () => ({})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  fetchSchoolByIdCall,
  uiStateAction,
})(SchoolDetailsContainer)
