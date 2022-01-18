import {
  Box,
  Button,
  Grid,
  Hidden,
  IconButton,
  InputAdornment,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Pagination from '@material-ui/lab/Pagination'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { ArrowRight, Eye, Search, Sliders } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { transactionStatusOption } from '../../../../helpers/stub'
import DateRangeFilter from '../../../filters/DateRange'
import SelectFilter from '../../../filters/Select'
import CustomTable from '../../../table/CustomTable'
import useStyles from '../Enrollment.Style'
import TransactionDetail from './TransactionDetail'

function PaymentDetail({
  order,
  orderBy,
  setOrder,
  setOrderBy,
  filter,
  setFilterValue,
  onFilterReset,
  onApplyFilter,
  pageDetails,
  onChangePage,
  onSearchEnter,
  transactionList,
  transactionDetail,
  enrollmentDetail,
  getTransactionDetailById,
}) {
  const classes = useStyles()
  const dataParameter = 'id'
  const { t } = useTranslation()
  const [viewTransactionDetail, setViewTransactionDetail] = useState(false)

  const toggleTransactionDetail = (event) => {
    if (viewTransactionDetail === false) {
      let id = event.currentTarget.attributes['data-id'].value
      getTransactionDetailById(id)
    }
    setViewTransactionDetail(!viewTransactionDetail)
  }

  const allHeadCells = [
    {
      id: 'txn_id',
      label: t('transactionID'),
      isSort: true,
      sortProperty: 'txn_id',
    },

    {
      id: 'txn_amount',
      label: t('totalAmount'),
      isSort: true,
      sortProperty: 'txn_amount',
    },
    {
      id: 'created_at',
      label: t('transactionDate'),
      isSort: true,
      sortProperty: 'created_at',
    },
    {
      id: 'txn_status',
      label: t('status'),
      isSort: true,
      sortProperty: 'txn_status',
    },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
      width: '100px',
    },
  ]

  const viewDetail = (row) => {
    return (
      <IconButton
        onClick={toggleTransactionDetail}
        data-id={row.txn_id}
        color="primary"
        aria-label={t('viewDetail')}
      >
        <Tooltip title={t('viewDetail')}>
          <Eye width="16px" height="16px" />
        </Tooltip>
      </IconButton>
    )
  }

  const status = (row) => {
    if (row.txn_status === 'approved') {
      return (
        <Box component="span" className="label-green" id={row.id} tabIndex={0}>
          {t('success')}{' '}
        </Box>
      )
    } else if (row.txn_status === 'pending') {
      return (
        <Box component="span" className="label-warning" id={row.id} tabIndex={0}>
          {t('pending')}
        </Box>
      )
    } else {
      return (
        <Box component="span" className="label-red" id={row.id} tabIndex={0}>
          {t('failed')}
        </Box>
      )
    }
  }

  return (
    <>
      {/* <Grid container>
        <Grid item xs={12} lg="auto">
          <Box px={3} pt={2}>
            <Typography component="h5" variant="subtitle1" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="600">
                {t('selectedFeeStructure')}
              </Box>
            </Typography>

            <Box mt={1} className="border-box" p={2} width="100%">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4} lg="auto">
                  <Typography
                    component="h6"
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="500">
                      {t('structureName')}
                    </Box>
                  </Typography>
                  <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                    <Box component="span" fontWeight={600}>
                      {enrollmentDetail.enr_fee?.fee_name}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg="auto">
                  <Typography
                    component="h6"
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="500">
                      {t('numberOfInstallment')}
                    </Box>
                  </Typography>
                  <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                    <Box component="span" fontWeight={600}>
                      {enrollmentDetail.enr_fee?.fee_installment_count}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg="auto">
                  <Typography
                    component="h6"
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="500">
                      {t('installmentDuration')}
                    </Box>
                  </Typography>
                  <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                    <Box component="span" fontWeight={600}>
                      {enrollmentDetail.enr_fee?.fee_installment_duration}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg="auto">
                  <Typography
                    component="h6"
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="500">
                      {t('finalFee')}
                    </Box>
                  </Typography>
                  <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                    <Box component="span" fontWeight={600}>
                      {t('with$', { amount: enrollmentDetail.enr_fee?.fee_total })}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg="auto">
                  <Typography
                    component="h6"
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="500">
                      {t('feePerInstallment')}
                    </Box>
                  </Typography>
                  <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                    <Box component="span" fontWeight={600}>
                      {t('with$', { amount: enrollmentDetail.enr_fee?.fee_per_installment })}
                    </Box>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid> */}

      <Box px={3} py={2} width="100%">
        <Typography
          component="h4"
          align="left"
          variant="subtitle1"
          color="textPrimary"
          gutterBottom
          tabIndex={0}
        >
          <Box component="span" fontWeight="600">
            {t('transactions')}
          </Box>
        </Typography>
        <Box width="100%">
          <Accordion defaultExpanded elevation={0} className="custom-accordion">
            <Grid container spacing={2} justify="space-between">
              <Grid item xs={12} sm={6} lg={5} xl={3}>
                <TextField
                  className="custom-input-field input-search"
                  variant="outlined"
                  fullWidth
                  size="small"
                  id="q"
                  name="q"
                  autoComplete="search"
                  value={filter.q}
                  onChange={setFilterValue}
                  onKeyDown={onSearchEnter}
                  placeholder={t('fields:searchPaymentDetail')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="press enter to search"
                          onClick={() => onApplyFilter()}
                        >
                          <Search className="icon-color-light rotate90" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm="auto">
                <AccordionSummary
                  aria-controls="user-filter-content"
                  id="user-filter-header"
                  className="custom-filter-button"
                  aria-expanded={true}
                  tabIndex={-1}
                >
                  <Box display="flex" alignItems="center">
                    <Sliders className="rotate90" />
                    <Hidden smUp>
                      <Box
                        ml={1}
                        component="span"
                        fontWeight="fontWeightMedium"
                        fontSize="16px"
                        tabIndex={0}
                      >
                        {t('filters')}
                      </Box>
                    </Hidden>
                  </Box>
                  <ArrowDropDownIcon className="arrow-black" />
                </AccordionSummary>
              </Grid>
            </Grid>
            <AccordionDetails>
              <Box
                pt={2}
                display="flex"
                width="100%"
                alignItems="flex-start"
                flexDirection="column"
              >
                <Hidden smDown>
                  <Typography
                    component="h4"
                    align="left"
                    variant="h6"
                    color="textPrimary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="fontWeightMedium" fontSize="16px">
                      {t('filters')}
                    </Box>
                  </Typography>
                </Hidden>

                <Grid spacing={1} container className="filter-search-section">
                  <Grid item xs={12} sm={4} md="auto">
                    <SelectFilter
                      name="status"
                      filter={filter}
                      setFilterValue={setFilterValue}
                      label={t('fields:status') + ':'}
                      labelFallback={t('fields:status')}
                      optionId="value"
                      optionName="name"
                      options={transactionStatusOption}
                    />
                  </Grid>
                  <Grid item xs={12} sm="auto">
                    <DateRangeFilter
                      fromDateName="fromDate"
                      toDateName="toDate"
                      filter={filter}
                      setFilterValue={setFilterValue}
                      primaryLabel={t('fields:dateRange') + ':'}
                      fromLabel={t('fields:from') + ':'}
                      fromLabelFallback={t('fields:from')}
                      toLabel={t('fields:to') + ':'}
                      toLabelFallback={t('fields:to')}
                      primaryLabelSize="90px"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md="auto">
                    <Box
                      mt={{ xs: 2, sm: 0, lg: 0 }}
                      display="flex"
                      justifyContent={{
                        xs: 'flex-start',
                        sm: 'flex-end',
                        lg: 'flex-end',
                      }}
                      alignItems="center"
                    >
                      <Box mr={1}>
                        <Button
                          className="custom-default-button text-transform-none"
                          disableElevation
                          endIcon={<ArrowRight />}
                          variant="contained"
                          fullWidth
                          onClick={onApplyFilter}
                        >
                          {t('filter')}
                        </Button>
                      </Box>
                      <Button
                        className="text-transform-none"
                        disableElevation
                        variant="text"
                        fullWidth
                        color="primary"
                        onClick={onFilterReset}
                        disabled={!(filter.q || filter.status || filter.toDate || filter.fromDate)}
                      >
                        {t('reset')}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
      <CustomTable
        noDataMessage={t('tableNoRecordFoundMessage')}
        order={order}
        orderBy={orderBy}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
        data={transactionList}
        headCells={allHeadCells}
        dataParameter={dataParameter}
        isSelection={false}
      >
        {transactionList.map((row) => {
          return (
            <TableRow hover data-id={row.txn_id} key={row.txn_id}>
              <TableCell tabIndex={0}>{row.txn_key}</TableCell>
              <TableCell tabIndex={0}>{t('with$', { amount: row.txn_amount })}</TableCell>
              <TableCell tabIndex={0}>{row.created_at}</TableCell>
              <TableCell className={classes.verticalSpaceRemove}>{status(row)}</TableCell>
              <TableCell className={classes.verticalSpaceRemove}>{viewDetail(row)}</TableCell>
            </TableRow>
          )
        })}
      </CustomTable>
      {transactionList.length > 0 && (
        <Box
          display="flex"
          px={2}
          py={2}
          justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
          flexDirection={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          className="custom-pagination"
        >
          <Pagination
            count={pageDetails.last_page}
            shape="rounded"
            color="primary"
            onChange={onChangePage}
            page={pageDetails.page}
            variant="text"
          />
          <Box mt={{ xs: 1, sm: 0 }}>
            <Typography component="p" variant="body2" tabIndex={0}>
              Showing {transactionList.length} rows out of {pageDetails.total}
            </Typography>
          </Box>
        </Box>
      )}

      <TransactionDetail
        open={viewTransactionDetail}
        onClose={toggleTransactionDetail}
        transactionDetail={transactionDetail}
        enrollmentDetail={enrollmentDetail}
      />
    </>
  )
}
PaymentDetail.propTypes = {
  onChangePage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  setFilterValue: PropTypes.func,
  filter: PropTypes.object,
  onFilterReset: PropTypes.func,
  onApplyFilter: PropTypes.func,
  pageDetails: PropTypes.object,
  onSearchEnter: PropTypes.func,
  transactionList: PropTypes.array,
  getTransactionDetailById: PropTypes.func,
  transactionDetail: PropTypes.object,
  enrollmentDetail: PropTypes.object,
}

PaymentDetail.defaultProps = {
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  setFilterValue: () => {},
  filter: {},
  onFilterReset: () => {},
  onApplyFilter: () => {},
  pageDetails: {},
  onChangePage: () => {},
  onSearchEnter: () => {},
  transactionList: [],
  getTransactionDetailById: () => {},
  transactionDetail: {},
  enrollmentDetail: {},
}

export default PaymentDetail
