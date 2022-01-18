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
import { Edit2, Trash } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { isEmpty } from '../../../../helpers/utils'
import ConfirmBox from '../../../common/ConfirmBox'
import CustomTable from '../../../table/CustomTable'
import useStyles from '../Programs.Style'
import AddNewFeeStructure from './AddFeeStructure'

function FeeStructureDetail({
  order,
  orderBy,
  setOrder,
  setOrderBy,
  details,
  deleteItems,
  toggleDeletePopup,
  openDeletePopup,
  addProgramFees,
  actionType,
  setActionType,
  getProgramFeeDetailById,
  programfeeDetail,
  setProgramfeeDetail,
}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const dataParameter = 'id'
  const allHeadCells = [
    {
      id: 'structure_name',
      label: t('structureName'),
      isSort: false,
      sortProperty: 'structure_name',
    },
    {
      id: 'number_installment',
      label: t('numberOfInstallment'),
      isSort: false,
      sortProperty: 'number_installment',
    },
    {
      id: 'installment_duration',
      label: t('installmentDuration'),
      isSort: false,
      sortProperty: 'installment_duration',
    },
    {
      id: 'final_fee',
      label: t('finalFee'),
      isSort: false,
      sortProperty: 'final_fee',
    },
    {
      id: 'fee_installment',
      label: t('feePerInstallment'),
      isSort: false,
      sortProperty: 'fee_installment',
    },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
      width: '100px',
    },
  ]

  const onOpen = () => {
    setActionType('add')
  }

  const onClose = () => {
    setActionType('')
    setProgramfeeDetail({})
  }

  const onEdit = (event) => {
    setActionType('edit')
    let id = event.currentTarget.attributes['data-id'].value
    getProgramFeeDetailById(id)
  }

  const ActionButton = (row) => {
    return (
      <Box whiteSpace="nowrap">
        <Tooltip title={t('edit')}>
          <IconButton
            edge="start"
            data-id={row.fee_id}
            color="primary"
            onClick={onEdit}
            aria-label={t('edit')}
          >
            <Edit2 width="16px" height="16px" />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('delete')}>
          <IconButton
            edge="end"
            color="secondary"
            data-id={row.fee_id}
            onClick={toggleDeletePopup}
            aria-label={t('delete')}
          >
            <Trash width="16px" height="16px" />
          </IconButton>
        </Tooltip>
      </Box>
    )
  }

  return (
    <>
      <Box px={2} py={2}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography component="" align="left" variant="body2" tabIndex={0}>
              <Box component="span" fontWeight="600" fontSize="16px">
                {t('feeStructure')}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Box
              mt={{ xs: 1, sm: 0 }}
              display="flex"
              alignItems="center"
              justifyContent={{
                xs: 'flex-start',
                sm: 'flex-start',
                md: 'space-between',
              }}
            >
              <Button
                className="text-transform-none"
                size="large"
                variant="contained"
                disableElevation
                color="primary"
                onClick={onOpen}
              >
                {t('addFee')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <CustomTable
        noDataMessage={t('dataNotFound')}
        order={order}
        orderBy={orderBy}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
        data={details.pgm_fee}
        headCells={allHeadCells}
        dataParameter={dataParameter}
        isSelection={false}
      >
        {details?.pgm_fee.map((row) => {
          return (
            <TableRow hover data-id={row.fee_id} key={row.fee_id}>
              <TableCell tabIndex={0}>{row.fee_name}</TableCell>
              <TableCell tabIndex={0}>{row.fee_installment_count}</TableCell>
              <TableCell tabIndex={0}>{row.fee_installment_duration}</TableCell>
              <TableCell tabIndex={0}>{t('with$', { amount: row.fee_total })}</TableCell>
              <TableCell tabIndex={0}>{t('with$', { amount: row.fee_per_installment })}</TableCell>
              <TableCell className={classes.verticalSpaceRemove}>{ActionButton(row)}</TableCell>
            </TableRow>
          )
        })}
      </CustomTable>
      <ConfirmBox
        maxWidth="xs"
        open={openDeletePopup}
        close={toggleDeletePopup}
        onConfirm={deleteItems}
        defaultProps={{ message: 'deleteConfirmation', buttonText: 'delete' }}
      />
      <AddNewFeeStructure
        open={!isEmpty(actionType)}
        onClose={onClose}
        addProgramFees={addProgramFees}
        actionType={actionType}
        setActionType={setActionType}
        programfeeDetail={programfeeDetail}
        programDetail={details}
      />
    </>
  )
}
FeeStructureDetail.propTypes = {
  onChangePage: PropTypes.func,
  order: PropTypes.func,
  orderBy: PropTypes.func,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  details: PropTypes.object,
  toggleDeletePopup: PropTypes.func,
  deleteItems: PropTypes.func,
  openDeletePopup: PropTypes.bool,
  addProgramFees: PropTypes.func,
  actionType: PropTypes.func,
  setActionType: PropTypes.func,
  getProgramFeeDetailById: PropTypes.func,
  programfeeDetail: PropTypes.object,
  setProgramfeeDetail: PropTypes.func,
}
FeeStructureDetail.defaultProps = {
  onChangePage: () => {},
  order: () => {},
  orderBy: () => {},
  setOrder: () => {},
  setOrderBy: () => {},
  details: {},
  toggleDeletePopup: () => {},
  deleteItems: () => {},
  openDeletePopup: false,
  addProgramFees: () => {},
  actionType: () => {},
  setActionType: () => {},
  getProgramFeeDetailById: () => {},
  programfeeDetail: {},
  setProgramfeeDetail: () => {},
}

export default FeeStructureDetail
