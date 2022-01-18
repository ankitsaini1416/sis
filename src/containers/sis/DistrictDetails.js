import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { uiStateAction } from '../../actions/app.action'
import { headerAction } from '../../actions/header.action'
import DistrictDetails from '../../components/sis/organizations/districts/districtDetails/DistrictDetails'
import { TablePageData } from '../../data/TablePageData'
import { handleChangePage, isEmpty } from '../../helpers/utils'
import { fetchDistrictByIdCall } from './../../actions/district.action'
import { fetchSchoolsCall } from './../../actions/schools.action'

function DistrictDetailsContainer({
  headerAction,
  fetchDistrictByIdCall,
  fetchSchoolsCall,
  uiStateAction,
}) {
  const { districtId } = useParams()
  const history = useHistory()
  const { t } = useTranslation()
  const allHeadCells = [
    {
      id: 'sch_school_public_id',
      label: t('schoolID'),
      isSort: true,
      sortProperty: 'sch_school_public_id',
    },
    {
      id: 'sch_name',
      label: t('schoolName'),
      isSort: true,
      sortProperty: 'sch_name',
    },
    {
      id: 'sch_dst_id',
      label: t('district'),
      isSort: true,
      sortProperty: 'sch_dst_id',
    },
    {
      id: 'sch_school_type',
      label: t('type'),
      isSort: true,
      sortProperty: 'sch_school_type',
    },
    {
      id: 'sch_slug',
      label: t('link'),
      isSort: true,
      sortProperty: 'sch_slug',
    },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
      width: '90px',
    },
  ]
  const [schools, setSchools] = useState([])
  let [paginationMidState] = useState({
    ...TablePageData,
    current_page: TablePageData.current_page,
    per_page: TablePageData.per_page,
  })
  const [pageDetails, setPageDetails] = React.useState({
    ...paginationMidState,
  })
  const [district, setDistrict] = useState({})
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('sch_id')

  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchSchools)
  }

  const viewAdmin = function () {
    history.push(`/sis/users`)
    uiStateAction({
      userFilter: {
        districtId: district.dst_urn ? district.dst_urn : '',
        dst_name: district.dst_name ? district.dst_name : '',
        dst_id: district.dst_id ? district.dst_id : '',
      },
    })
  }

  useEffect(() => {
    const headerData = {
      activeMenuItem: 'districts',
      activeParent: 'organizations',
    }
    headerAction(headerData)
  }, [])
  useEffect(() => {
    fetchDistrictByIdCall(districtId, (data) => {
      setDistrict(data)
    })
    fetchSchools()
  }, [])

  const fetchSchools = function () {
    const filterData = {
      sort_by: orderBy,
      sort_order: order,
      districtId: districtId,
    }
    fetchSchoolsCall({ ...pageDetails, ...paginationMidState, ...filterData }, (data) => {
      const { content, ...paginationDetail } = data
      if (isEmpty(content) && pageDetails.current_page !== 1) {
        paginationMidState.current_page = 1
        fetchSchools()
      }
      setSchools(content)
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

  /**
   * renders JSX of User container
   * @param user
   */
  return (
    <DistrictDetails
      district={district}
      onChangePage={onChangePage}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      schools={schools}
      allHeadCells={allHeadCells}
      pageDetails={pageDetails}
      viewAdmin={viewAdmin}
    />
  )
}

DistrictDetailsContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchDistrictByIdCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  uiStateAction: PropTypes.func,
}

DistrictDetailsContainer.defaultProps = {
  headerAction: () => {},
  fetchDistrictByIdCall: () => {},
  fetchSchoolsCall: () => {},
  uiStateAction: () => {},
}
const mapStateToProps = () => ({})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  fetchDistrictByIdCall,
  fetchSchoolsCall,
  uiStateAction,
})(DistrictDetailsContainer)
