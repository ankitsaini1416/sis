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
  Typography,
} from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Pagination from '@material-ui/lab/Pagination'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { ArrowRight, Search, Sliders } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { getSorting, stableSort } from '../../../../helpers/utils'
import DateRangeFilter from '../../../filters/DateRange'
import CustomTable from '../../../table/CustomTable'

// import useStyles from './../Application.Style'

function LoginEvents({
  pageDetails,
  registerList,
  onChangePage,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  filter,
  setFilterValue,
  onFilterReset,
  onApplyFilter,
  onSearchEnter,
  fetchSchool,
}) {
  // const classes = useStyles()
  const { t } = useTranslation()
  const dataParameter = 'id'
  const districtCode = useRef('')

  // const [state] = React.useState({
  //   checkedA: false,
  //   checkedB: false,
  // })
  // const CheckboxWithGreenCheck = withStyles({})(Checkbox)

  const allHeadCells = [
    { id: 'event_code', label: t('eventCode'), isSort: true, sortProperty: 'event_code' },
    {
      id: 'ip_address',
      label: t('ipAddress'),
      isSort: true,
      sortProperty: 'ip_address',
    },
    {
      id: 'triggered_at',
      label: t('triggeredAt'),
      isSort: true,
      sortProperty: 'triggered_at',
    },
  ]

  const FilesDocumentsData = [
    {
      event_code: 'Login001',
      ip_address: '192.168.254.255',
      triggered_at: '7/30/2021 10:00 AM',
    },
    {
      event_code: 'Login001',
      ip_address: '192.168.254.255',
      triggered_at: '7/30/2021 10:00 AM',
    },
    {
      event_code: 'Login001',
      ip_address: '192.168.254.255',
      triggered_at: '7/30/2021 10:00 AM',
    },
  ]

  return (
    <>
      <Box px={{ xs: 2, md: 0 }} pt={{ xs: 2, md: 0 }}>
        <Typography tabIndex={0} component="div" variant="body2" color="textPrimary" gutterBottom>
          <Box fontWeight="600" fontSize="16px">
            {t('loginEvents')}
          </Box>
        </Typography>
        <Box width="100%" mt={2} mb={2}>
          <Formik>
            {() => {
              if (filter.districtId !== districtCode.current) {
                fetchSchool(filter.districtId)
                districtCode.current = filter.districtId
              }
              return (
                <Accordion defaultExpanded elevation={0} className="custom-accordion">
                  <Grid container spacing={2} justify="space-between">
                    <Grid item xs={12} md={6} lg={6} xl={4}>
                      <TextField
                        className="custom-input-field input-search"
                        name="q"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="q"
                        autoComplete="q"
                        value={filter.q}
                        onKeyDown={onSearchEnter}
                        onChange={setFilterValue}
                        placeholder={t('fields:searchByEventCode')}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="Press enter to search"
                                onClick={() => onApplyFilter()}
                              >
                                <Search className="icon-color-light rotate90" />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md="auto">
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm="auto">
                          <AccordionSummary
                            aria-controls="AllApplication-filter-content"
                            id="AllApplication-filter-header"
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
                                >
                                  {t('filters')}
                                </Box>
                              </Hidden>
                            </Box>
                            <ArrowDropDownIcon className="arrow-black" />
                          </AccordionSummary>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <AccordionDetails>
                    <Box
                      display="flex"
                      pt={2}
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
                        >
                          <Box component="span" fontWeight="fontWeightMedium" fontSize="16px">
                            {t('filters')}
                          </Box>
                        </Typography>
                      </Hidden>

                      <Grid spacing={1} container className="filter-search-section">
                        <Grid item xs={12} sm="auto">
                          <DateRangeFilter
                            fromDateName="fromDate"
                            toDateName="toDate"
                            filter={filter}
                            setFilterValue={setFilterValue}
                            primaryLabel={t('fields:triggeredAt') + ':'}
                            fromLabel={t('fields:from') + ':'}
                            fromLabelFallback={t('fields:from')}
                            toLabel={t('fields:to') + ':'}
                            toLabelFallback={t('fields:to')}
                            primaryLabelSize="90px"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4} md="auto">
                          <Box
                            display="flex"
                            justifyContent={{
                              xs: 'flex-start',
                              sm: 'flex-start',
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
                                disabled={!filter.schoolId}
                                onClick={onApplyFilter}
                                fullWidth
                              >
                                {t('filter')}
                              </Button>
                            </Box>
                            <Button
                              className="text-transform-none"
                              disableElevation
                              variant="text"
                              color="primary"
                              onClick={onFilterReset}
                              disabled={
                                !(
                                  filter.q ||
                                  filter.schoolId ||
                                  filter.districtId ||
                                  filter.approvalStatus ||
                                  filter.toDate ||
                                  filter.fromDate
                                )
                              }
                            >
                              {t('reset')}
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              )
            }}
          </Formik>
        </Box>
      </Box>
      <CustomTable
        order={order}
        orderBy={orderBy}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
        data={FilesDocumentsData}
        headCells={allHeadCells}
        dataParameter={dataParameter}
        isSelection={false}
      >
        {stableSort(FilesDocumentsData, getSorting(order, orderBy)).map((row) => {
          return (
            <TableRow hover data-id={row.id} key={row.id}>
              <TableCell tabIndex={0}>{row.event_code}</TableCell>
              <TableCell tabIndex={0}>{row.ip_address}</TableCell>
              <TableCell tabIndex={0}>{row.triggered_at}</TableCell>
            </TableRow>
          )
        })}
      </CustomTable>
      {pageDetails.total > 0 ? (
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
            <Typography tabIndex={0} component="p" variant="body2">
              Showing {registerList.length} rows out of {pageDetails.total}
            </Typography>
          </Box>
        </Box>
      ) : null}
    </>
  )
}
LoginEvents.propTypes = {
  allHeadCells: PropTypes.array,
  initialHeadcells: PropTypes.array,
  setHeadcells: PropTypes.func,
  pageDetails: PropTypes.object,
  registerList: PropTypes.array,
  onChangePage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  filter: PropTypes.object,
  schools: PropTypes.array,
  setFilterValue: PropTypes.func,
  onFilterReset: PropTypes.func,
  onApplyFilter: PropTypes.func,
  districts: PropTypes.array,
  getDate: PropTypes.any,
  editAction: PropTypes.func,
  onSearchEnter: PropTypes.func,
  fetchSchool: PropTypes.func,
}

LoginEvents.defaultProps = {
  allHeadCells: [],
  initialHeadcells: [],
  setHeadcells: () => {},
  pageDetails: {},
  registerList: [],
  onChangePage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  filter: {},
  schools: [],
  setFilterValue: () => {},
  onFilterReset: () => {},
  onApplyFilter: () => {},
  editAction: () => {},
  districts: [],
  onSearchEnter: () => {},
  fetchSchool: () => {},
}

export default LoginEvents
