import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { connect } from 'react-redux'

import { messageAction } from '../../actions/app.action'
import {
  createDashboardCall,
  deleteDashboardCall,
  fetchDashboardListCall,
  updateDashboardCall,
} from '../../actions/dashboard.action'
import { headerAction } from '../../actions/header.action'
import DashboardList from '../../components/sis/dashboard/DashboardList'
import { MESSAGE_SEVERITIES } from '../../helpers/constants'
import { selectDashboards } from '../../helpers/selectors'
import { get, isEmpty } from '../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from '../../helpers/validator'

function DashboardListContainer({
  headerAction,
  createDashboardCall,
  fetchDashboardListCall,
  deleteDashboardCall,
  dashboards,
  updateDashboardCall,
}) {
  const [openDeletePopup, setOpenDeletePopup] = React.useState(false)
  const deleteIds = useRef([])

  const addDashboard = (values, { setErrors, callback }) => {
    createDashboardCall(
      values,
      () => {
        fetchDashboardListCall()
        callback()
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')

        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorAddDashboard'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorAddDashboard',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
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

  const deleteDashboard = () => {
    deleteDashboardCall(
      deleteIds.current,
      () => {
        toggleDeletePopup()
        fetchDashboardListCall()
      },
      (err) => {
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorDeleteDashboard'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorDeleteDashboard',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const updateDashboard = (id, payload, successCallback, failureCallback) => {
    updateDashboardCall(
      id,
      payload,
      () => {
        fetchDashboardListCall()
        if (typeof successCallback === 'function') {
          successCallback()
        }
      },
      (err) => {
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorDeleteDashboard'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorDeleteDashboard',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
        if (typeof failureCallback === 'function') {
          failureCallback()
        }
      }
    )
  }

  React.useEffect(() => {
    const headerData = {
      activeMenuItem: 'dashboardlist',
      activeParent: 'dashboard',
    }
    headerAction(headerData)
  }, [])

  /**
   * renders JSX of Add Edit LMS Configuration container component
   * @param DashboardList
   */
  return (
    <DashboardList
      addDashboard={addDashboard}
      dashboards={dashboards}
      deleteDashboard={deleteDashboard}
      openDeletePopup={openDeletePopup}
      toggleDeletePopup={toggleDeletePopup}
      updateDashboard={updateDashboard}
    />
  )
}

DashboardListContainer.propTypes = {
  headerAction: PropTypes.func,
  createDashboardCall: PropTypes.func,
  fetchDashboardListCall: PropTypes.func,
  deleteDashboardCall: PropTypes.func,
  dashboards: PropTypes.array,
  updateDashboardCall: PropTypes.func,
}
DashboardListContainer.defaultProps = {
  headerAction: () => {},
  createDashboardCall: () => {},
  fetchDashboardListCall: () => {},
  deleteDashboardCall: () => {},
  dashboards: [],
  updateDashboardCall: () => {},
}
const mapStateToProps = (state) => ({
  dashboards: selectDashboards(state)?.dashboards || [],
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  createDashboardCall,
  fetchDashboardListCall,
  deleteDashboardCall,
  updateDashboardCall,
})(DashboardListContainer)
