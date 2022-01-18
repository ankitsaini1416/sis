import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
// import { useSnackbar } from 'notistack'
// import toNumber from 'lodash/toNumber'
import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { headerAction } from '../../actions/header.action'
import AuditDetails from '../../components/sis/settings/audit/AuditDetails'
import { fetchAuditDetail } from './../../actions/audit.action'

function AuditDetailsContainer({ headerAction, fetchAuditDetail }) {
  const { auditLogId } = useParams()
  const { t } = useTranslation()
  // const { enqueueSnackbar } = useSnackbar()
  const headCells = [
    {
      id: 'action',
      label: t('action'),
      isSort: true,
      sortProperty: 'action',
      width: '150px',
    },
    {
      id: 'resource',
      label: t('resource'),
      isSort: true,
      sortProperty: 'resource',
      width: '250px',
    },
    {
      id: 'beforeValue',
      label: t('beforeValue'),
      isSort: true,
      sortProperty: 'beforeValue',
      width: '250px',
    },
    {
      id: 'currentValue',
      label: t('currentValue'),
      isSort: false,
      sortProperty: 'currentValue',
      width: '250px',
    },
    { id: 'time', label: t('time'), isSort: false, sortProperty: 'time', width: '100px' },
  ]

  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('common_name')
  const [pageContent, setPageContent] = React.useState({})
  const [pageData, setPageData] = React.useState([])

  function getActionString(value, success) {
    if (value == '1' && success) {
      return (
        <div>
          <IconButton style={{ color: 'green' }} aria-label={'CREATE_COMPLETE'}>
            <CheckCircleOutlineIcon />
          </IconButton>
          CREATE_COMPLETE
        </div>
      )
    } else if (value == '1' && !success) {
      return (
        <div>
          <IconButton color="secondary" aria-label={'CREATE_FAILED'}>
            <CancelIcon />
          </IconButton>
          CREATE_FAILED
        </div>
      )
    }
    if (value == '2' && success) {
      return (
        <div>
          <IconButton style={{ color: 'green' }} aria-label={'READ_COMPLETE'}>
            <CheckCircleOutlineIcon />
          </IconButton>
          READ_COMPLETE
        </div>
      )
    }
    if (value == '2' && !success) {
      return (
        <div>
          <IconButton color="secondary" aria-label={'READ_FAILED'}>
            <CancelIcon />
          </IconButton>
          READ_FAILED
        </div>
      )
    }
    if (value == '3' && success) {
      return (
        <div>
          <IconButton style={{ color: 'green' }} aria-label={'UPDATE_COMPLETE'}>
            <CheckCircleOutlineIcon />
          </IconButton>
          UPDATE_COMPLETE
        </div>
      )
    }
    if (value == '3' && !success) {
      return (
        <div>
          <IconButton color="secondary" aria-label={'UPDATE_FAILED'}>
            <CancelIcon />
          </IconButton>
          UPDATE_FAILED
        </div>
      )
    }
    if (value == '4' && success) {
      return (
        <div>
          <IconButton style={{ color: 'green' }} aria-label={'DELETE_COMPLETE'}>
            <CheckCircleOutlineIcon />
          </IconButton>
          DELETE_COMPLETE
        </div>
      )
    }
    if (value == '4' && !success) {
      return (
        <div>
          <IconButton color="secondary" aria-label={'DELETE_FAILED'}>
            <CancelIcon />
          </IconButton>
          DELETE_FAILED
        </div>
      )
    }
  }
  function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }
  function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
  }

  function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
  }

  const fetchAuditLogDetail = function () {
    fetchAuditDetail(auditLogId, (records) => {
      setPageData(records.changes)
      setPageContent(records)
    })
  }
  React.useEffect(() => {
    // callAuditLogDetailApi(auditLogId);
    fetchAuditLogDetail()
  }, [])

  React.useEffect(() => {
    const headerData = { activeMenuItem: 'audit', activeParent: 'settings' }
    headerAction(headerData)
  }, [])

  /**
   * renders JSX of User container
   * @param user
   */
  return (
    <AuditDetails
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      pageContent={pageContent}
      pageData={pageData}
      headCells={headCells}
      stableSort={stableSort}
      getActionString={getActionString}
      getSorting={getSorting}
    />
  )
}

AuditDetailsContainer.propTypes = {
  headerAction: PropTypes.any,
  fetchAuditDetail: PropTypes.any,
}

AuditDetailsContainer.defaultProps = {
  headerAction: () => {},
  fetchAuditDetail: () => {},
}
const mapStateToProps = () => ({})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  fetchAuditDetail,
})(AuditDetailsContainer)
