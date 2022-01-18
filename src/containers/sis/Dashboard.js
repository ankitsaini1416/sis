import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router'

import { messageAction } from '../../actions/app.action'
import {
  createDashboardWidgetCall,
  deleteDashboardWidgetCall,
  fetchDashboardMatersWidgets,
  fetchDashboardWidgetsById,
} from '../../actions/dashboard.action'
import { fetchDistrictsCall } from '../../actions/district.action'
import { headerAction } from '../../actions/header.action'
import { fetchSchoolsCall } from '../../actions/schools.action'
import DashboardView from '../../components/sis/dashboard/DashboardView'
import { MESSAGE_SEVERITIES } from '../../helpers/constants'
import { selectDashboards } from '../../helpers/selectors'
import { get, isEmpty } from '../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from '../../helpers/validator'

function DashboardViewContainer({
  headerAction,
  fetchDashboardMatersWidgets,
  createDashboardWidgetCall,
  fetchDashboardWidgetsById,
  fetchDistrictsCall,
  fetchSchoolsCall,
  deleteDashboardWidgetCall,
  dashboards,
}) {
  const [dashboardMasterWidgets, setDashboardMasterWidgets] = React.useState([])
  const { dashboardId } = useParams()
  const [dashboardWidgetsList, setDashboardWidgetsList] = React.useState([])
  const [openArchivePopup, setOpenArchivePopup] = React.useState(false)
  const [dashboard, setDashboard] = React.useState({})
  const archiveIds = React.useRef([])
  function getDashboardWidgetList() {
    fetchDashboardWidgetsById(dashboardId, (records) => {
      const { content = [] } = records || {}
      // Get maximum postion for any item.
      const maxPosition = content.length
        ? Math.max.apply(
            Math,
            content.map(function (o) {
              return o.position
            })
          ) + 1
        : 0
      // Create holders according items. Making divisable by 3 rows.
      const holders = Array(maxPosition + (3 - (maxPosition % 3)))
        .fill(null)
        .map((_, index) => {
          const widgetWithSameIndex = content.find((widget) => widget.position === index)
          return widgetWithSameIndex ? { ...widgetWithSameIndex, filled: true } : { filled: false }
        })
      setDashboardWidgetsList(holders)
    })
  }

  function getDashboardMasterWidget() {
    fetchDashboardMatersWidgets((records) => {
      const { content } = records || {}
      setDashboardMasterWidgets(content)
    })
  }

  const addDashboardWidget = (payload, { setErrors, callback }) => {
    createDashboardWidgetCall(
      dashboardId,
      {
        ...payload,
      },
      () => {
        getDashboardWidgetList()
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
    deleteDashboardWidgetCall(
      archiveIds.current,
      () => {
        toggleArchivePopup()
        getDashboardWidgetList()
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
      activeMenuItem: dashboardId,
      activeParent: 'dashboard',
    }
    headerAction(headerData)
  }, [dashboardId])

  React.useEffect(() => {
    getDashboardMasterWidget()
  }, [])

  React.useEffect(() => {
    getDashboardWidgetList()
  }, [dashboardId])

  React.useEffect(() => {
    if (!isEmpty(dashboards)) {
      setDashboard(dashboards.find((item) => item._id === dashboardId) || {})
    }
  }, [dashboards, dashboardId])
  /**
   * renders JSX of Add Edit LMS Configuration container component
   * @param DashboardView
   */
  return (
    <DashboardView
      dashboardMasterWidgets={dashboardMasterWidgets}
      addDashboardWidget={addDashboardWidget}
      dashboardWidgetsList={dashboardWidgetsList}
      fetchDistrictsCall={fetchDistrictsCall}
      fetchSchoolsCall={fetchSchoolsCall}
      archiveDetail={archiveDetail}
      openArchivePopup={openArchivePopup}
      toggleArchivePopup={toggleArchivePopup}
      dashboard={dashboard}
    />
  )
}

DashboardViewContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchDashboardMatersWidgets: PropTypes.func,
  createDashboardWidgetCall: PropTypes.func,
  fetchDashboardWidgetsById: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  deleteDashboardWidgetCall: PropTypes.func,
  dashboards: PropTypes.array,
}

DashboardViewContainer.defaultProps = {
  headerAction: () => {},
  fetchDashboardMatersWidgets: () => {},
  createDashboardWidgetCall: () => {},
  fetchDashboardWidgetsById: () => {},
  fetchDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
  deleteDashboardWidgetCall: () => {},
  dashboards: [],
}

const mapStateToProps = (state) => ({
  dashboards: selectDashboards(state)?.dashboards || [],
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  fetchDashboardMatersWidgets,
  createDashboardWidgetCall,
  fetchDashboardWidgetsById,
  fetchDistrictsCall,
  fetchSchoolsCall,
  deleteDashboardWidgetCall,
})(DashboardViewContainer)
