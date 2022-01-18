import {
  Box,
  Button,
  Grid,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { Edit2, Plus, Trash } from 'react-feather'
import { useTranslation } from 'react-i18next'

import ConfirmBox from '../../../../common/ConfirmBox'
import CustomTable from '../../../../table/CustomTable'
import useStyles from '../../Organizations.Style'
import { get, isEmpty } from './../../../../../helpers/utils'
import AddEditPaymentMethod from './AddPaymentMethod'
import UpdateApplicationID from './UpdateApplicationId'

let editRow = {}
let deleteRow = {}
function PaymentSettings({
  appInfo,
  addPaymentAppId,
  updatePaymentAppId,
  paymentGateways,
  paymentMaster,
  addPaymentGateway,
  editPaymentGateway,
  removePaymentGateway,
}) {
  const dataParameter = 'id'
  const { t } = useTranslation()
  const classes = useStyles()
  const [generateAppIdModal, setGenerateAppIdModal] = React.useState(false)
  const isAppIdGenereted = !isEmpty(get(appInfo, 'app_id', ''))
  const toggleGenerateAppId = () => {
    setGenerateAppIdModal(!generateAppIdModal)
  }
  const [addIntegrationModal, setAddIntegrationModal] = React.useState(false)
  const toggleAddIntegration = () => {
    setAddIntegrationModal(!addIntegrationModal)
  }
  const [editIntegrationModal, setEditIntegrationModal] = React.useState(false)
  const toggleEditIntegration = (event) => {
    if (editIntegrationModal) {
      editRow = {}
      setEditIntegrationModal(false)
    } else {
      const dataId = event.currentTarget.id
      editRow = paymentGateways.find((item) => item.id.toString() === dataId.toString())
      setEditIntegrationModal(true)
    }
  }
  const [deleteIntegrationModal, setDeleteIntegrationModal] = React.useState(false)
  const toggleDeleteIntegration = (event) => {
    if (deleteIntegrationModal) {
      deleteRow = {}
      setDeleteIntegrationModal(false)
    } else {
      const dataId = event.currentTarget.id
      deleteRow = paymentGateways.find((item) => item.id.toString() === dataId.toString())
      setDeleteIntegrationModal(true)
    }
  }
  const onDeleteConfirm = function () {
    removePaymentGateway(deleteRow.id, { callback: toggleDeleteIntegration })
  }
  const addAppIdContent = {
    type: 'ADD',
    title: t('addApplicationID'),
    button_text: t('add'),
  }

  const editAppIdContent = {
    type: 'EDIT',
    title: t('updateApplicationID'),
    button_text: t('update'),
  }

  const actionButton = (row) => {
    return (
      <>
        <Tooltip title={t('editPaymentMethod')}>
          <IconButton
            onClick={toggleEditIntegration}
            aria-label={t('editPaymentMethod')}
            id={row.id}
            edge="start"
            color="primary"
          >
            <Edit2 width="16px" height="16px" />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('removePaymentMethod')}>
          <IconButton
            aria-label={t('removePaymentMethod')}
            onClick={toggleDeleteIntegration}
            id={row.id}
            edge="end"
            color="secondary"
          >
            <Trash width="16px" height="16px" />
          </IconButton>
        </Tooltip>
      </>
    )
  }

  const status = (row) => {
    if (row.active) {
      return (
        <Box tabIndex={0} component="span" className="label-green" id={row.id}>
          {t('active')}
        </Box>
      )
    } else {
      return (
        <Box tabIndex={0} component="span" className="label-red" id={row.id}>
          {t('inActive')}
        </Box>
      )
    }
  }

  const allHeadCells = [
    { id: 'name', label: t('name'), isSort: true, sortProperty: 'name' },
    {
      id: 'alias',
      label: t('alias'),
      isSort: true,
      sortProperty: 'alias',
    },
    {
      id: 'gateway_status',
      label: t('status'),
      isSort: true,
      sortProperty: 'gateway_status',
    },
    {
      id: 'action',
      label: t('actions'),
      isSort: false,
      sortProperty: 'action',
      width: '150px',
    },
  ]
  return (
    <>
      <Box px={2} py={2} width="100%">
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography tabIndex={0} component="p" align="left" variant="body2" color="textPrimary">
              <Box component="span" fontWeight="600" fontSize="16px">
                {t('paymentSetup')}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Box
              className={classes.buttonAction}
              mt={{ xs: 1, sm: 0 }}
              display="flex"
              alignItems="center"
              justifyContent={{
                xs: 'flex-start',
                sm: 'flex-start',
                md: 'space-between',
              }}
              flexDirection={{ xs: 'column-reverse', sm: 'row' }}
            >
              <Button
                className="text-transform-none"
                size="large"
                fullWidth
                variant="contained"
                disableElevation
                color="primary"
                onClick={toggleGenerateAppId}
              >
                {isAppIdGenereted ? t('updateAppId') : t('addAppId')}
              </Button>
              <Button
                fullWidth
                className="text-transform-none"
                size="large"
                variant="contained"
                disableElevation
                disabled={!appInfo.app_id}
                color="primary"
                startIcon={<Plus />}
                onClick={toggleAddIntegration}
              >
                {t('addPaymentMethod')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <CustomTable
        noDataMessage={t('dataNotFound')}
        data={paymentGateways}
        headCells={allHeadCells}
        dataParameter={dataParameter}
        isSelection={false}
      >
        {paymentGateways.map((row) => {
          return (
            <TableRow hover data-id={row.id} key={row.id}>
              <TableCell tabIndex={0}>{row.name}</TableCell>
              <TableCell tabIndex={0}>{row.alias}</TableCell>
              <TableCell className={classes.verticalSpaceRemove}>{status(row)}</TableCell>
              <TableCell className={classes.verticalSpaceRemove}>{actionButton(row)}</TableCell>
            </TableRow>
          )
        })}
      </CustomTable>
      {addIntegrationModal && (
        <AddEditPaymentMethod
          open={addIntegrationModal}
          onClose={toggleAddIntegration}
          callback={addPaymentGateway}
          paymentMaster={paymentMaster}
        />
      )}
      {editIntegrationModal && (
        <AddEditPaymentMethod
          open={editIntegrationModal}
          onClose={toggleEditIntegration}
          callback={editPaymentGateway}
          paymentMaster={paymentMaster}
          siteObject={editRow}
        />
      )}

      {!isAppIdGenereted ? (
        <UpdateApplicationID
          open={generateAppIdModal}
          onClose={toggleGenerateAppId}
          content={addAppIdContent}
          callback={addPaymentAppId}
        />
      ) : (
        <UpdateApplicationID
          open={generateAppIdModal}
          onClose={toggleGenerateAppId}
          content={editAppIdContent}
          callback={updatePaymentAppId}
          paymentIdSetting={appInfo}
        />
      )}
      <ConfirmBox
        maxWidth="xs"
        open={deleteIntegrationModal}
        close={toggleDeleteIntegration}
        onConfirm={onDeleteConfirm}
        defaultProps={{ message: 'deleteConfirmation', buttonText: 'delete' }}
      />
    </>
  )
}
PaymentSettings.propTypes = {
  appInfo: PropTypes.object,
  addPaymentAppId: PropTypes.func,
  updatePaymentAppId: PropTypes.func,
  addPaymentGateway: PropTypes.func,
  editPaymentGateway: PropTypes.func,
  removePaymentGateway: PropTypes.func,
  paymentMaster: PropTypes.array,
  paymentGateways: PropTypes.array,
}
PaymentSettings.defaultProps = {
  appInfo: {},
  addPaymentAppId: () => {},
  updatePaymentAppId: () => {},
  addPaymentGateway: () => {},
  editPaymentGateway: () => {},
  removePaymentGateway: () => {},
  paymentMaster: [],
  paymentGateways: [],
}

export default PaymentSettings
