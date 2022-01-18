import DateFnsUtils from '@date-io/date-fns'
import {
  Box,
  Chip,
  Hidden,
  IconButton,
  Paper,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Pagination from '@material-ui/lab/Pagination'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { visuallyHidden } from '@mui/utils'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { ArrowLeft, ArrowRight, Calendar, ChevronDown, Eye, Sliders } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ROUTES } from '../../../../helpers/constants'
import withRedirect from '../../../../hocs/RedirectHOC'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import CustomTable from '../../../table/CustomTable'
import useStyles from '../Administration.Style'

function TopicLogs({
  allHeadCells,
  onChangePage,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  pageDetails,
  topicLog,
  topicId,
  // setSearchValue,
  // onSearchEnter,
  // searchText,
  onFilterReset,
  pageFilter,
  setPageFilter,
  onApplyFilter,
}) {
  const { t } = useTranslation()
  const history = useHistory()
  const classes = useStyles()
  const [checkState, setCheckState] = React.useState([])
  const onCheck = (event) => {
    if (Array.isArray(event)) {
      return setCheckState(event.map((item) => item))
    }
    const id = event.target.name
    if (checkState.includes(id)) {
      setCheckState(checkState.filter((item) => item !== id))
    } else {
      setCheckState((oldState) => [...oldState, id])
    }
  }
  const dataParameter = 'id'
  const viewTopicDetails = (row) => {
    const IconButtonEnhanced = withRedirect(IconButton)
    return (
      <>
        <Tooltip title={t('viewDetail')}>
          <IconButtonEnhanced
            data-id={row.id}
            color="primary"
            to={`${ROUTES.TOPICLOGSDETAIL}/${topicId}/${row.id}`}
          >
            <Eye width="16px" height="16px" />
          </IconButtonEnhanced>
        </Tooltip>
      </>
    )
  }
  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbAdministration'),
      href: ROUTES.NOTIFICATION,
    },
    {
      title: t('breadcrumbNotification'),
      href: ROUTES.NOTIFICATION,
    },
    {
      title: t('breadcrumbTopicLogs'),
      href: '',
    },
  ]
  const [isToOpen, setIsToOpen] = useState(false)
  const [isFromOpen, setIsFromOpen] = useState(false)
  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="700">
                {t('topicLogs')}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs="auto">
            <Box
              mt={{ xs: 1, sm: 0 }}
              display="flex"
              alignItems="center"
              justifyContent={{ xs: 'flex-start', sm: 'flex-end', md: 'space-between' }}
            >
              <Button
                className="custom-default-button text-transform-none"
                size="large"
                variant="contained"
                disableElevation
                startIcon={<ArrowLeft />}
                onClick={history.goBack}
              >
                {t('back')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Paper rounded={true} elevation={1} className="paper-round">
        <Box px={2} py={2} pb={2} width="100%">
          <Accordion defaultExpanded elevation={0} className="custom-accordion">
            <Grid container spacing={2} justify="space-between">
              {/* Todo */}
              {/* <Grid item xs={12} sm={6} lg={5} xl={3}>
                <Grid spacing={1} container alignItems="center">

                  <Grid item xs={10}>
                    <TextField
                      className="custom-input-field input-search"
                      name="search"
                      variant="outlined"
                      fullWidth
                      size="small"
                      id="search"
                      autoComplete="search"
                      value={searchText}
                      onChange={setSearchValue}
                      onKeyDown={onSearchEnter}
                      placeholder={t('fields:search')}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <Search className="icon-color-light rotate90" />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      className="text-transform-none"
                      disableElevation
                      variant="text"
                      color="primary"
                    >
                      {t('reset')}
                    </Button>
                  </Grid>
                </Grid>
              </Grid> */}
              <Grid item xs={12} sm="auto">
                <AccordionSummary
                  aria-controls="user-filter-content"
                  id="user-filter-header"
                  className="custom-filter-button"
                  aria-expanded={true}
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
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="fontWeightMedium" fontSize="16px">
                      {t('filters')}
                    </Box>
                  </Typography>
                </Hidden>

                <Grid spacing={1} container className="filter-search-section">
                  <Grid item xs={12} sm={8} md="auto">
                    <Box
                      display="flex"
                      alignItems={{ xs: 'flex-start', sm: 'center' }}
                      flexDirection={{ xs: 'column', sm: 'row' }}
                    >
                      <Box mb={{ xs: 1, sm: 0 }} width="105px" fontSize="14px" fontWeight={500}>
                        {t('fields:createdDate') + ':'}
                      </Box>

                      <Box width={{ xs: '100%', sm: 'auto' }} className="filter-date">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm="auto">
                              <Button
                                className="filter-select-button"
                                aria-controls="created-date"
                                aria-haspopup="true"
                                endIcon={<ChevronDown className="color-blue-grey" />}
                                variant="text"
                                fullWidth
                                onClick={() => setIsFromOpen(true)}
                              >
                                {pageFilter.f_startdate ? (
                                  <Box
                                    display="flex"
                                    flexDirection="row"
                                    alignItems="center"
                                    justifyContent="flex-start"
                                  >
                                    <Box mr={1}>{t('fields:from') + ':'}</Box>
                                    <Chip
                                      size="small"
                                      onDelete={''}
                                      label={moment(pageFilter.f_startdate).format('DD MM YYYY')}
                                      variant="outlined"
                                      className="custom-chip"
                                    />
                                  </Box>
                                ) : (
                                  <>{t('fields:from')}</>
                                )}
                              </Button>
                              <KeyboardDatePicker
                                className="custom-picker"
                                open={isFromOpen}
                                onOpen={() => setIsFromOpen(true)}
                                onClose={() => setIsFromOpen(false)}
                                autoOk
                                disableFuture
                                variant="inline"
                                inputVariant="outlined"
                                keyboardIcon={<Calendar />}
                                size="small"
                                format="MM/dd/yyyy"
                                id="f_startdate"
                                name="f_startdate"
                                value={pageFilter.f_startdate || null}
                                onChange={(date) =>
                                  setPageFilter({ ...pageFilter, f_startdate: date })
                                }
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                                label={<span style={visuallyHidden}>{t('fields:from')}</span>}
                              />
                            </Grid>
                            <Grid item xs={12} sm="auto">
                              <Button
                                className="filter-select-button"
                                aria-controls="created-date"
                                aria-haspopup="true"
                                endIcon={<ChevronDown className="color-blue-grey" />}
                                variant="text"
                                fullWidth
                                onClick={() => setIsToOpen(true)}
                              >
                                {pageFilter.f_enddate ? (
                                  <Box
                                    display="flex"
                                    flexDirection="row"
                                    alignItems="center"
                                    justifyContent="flex-start"
                                  >
                                    <Box mr={1}>{t('fields:to') + ':'}</Box>
                                    <Chip
                                      size="small"
                                      onDelete={''}
                                      label={moment(pageFilter.f_enddate).format('DD MM YYYY')}
                                      variant="outlined"
                                      className="custom-chip"
                                    />
                                  </Box>
                                ) : (
                                  <>{t('fields:to')}</>
                                )}
                              </Button>

                              <KeyboardDatePicker
                                className="custom-picker"
                                open={isToOpen}
                                onOpen={() => setIsToOpen(true)}
                                onClose={() => setIsToOpen(false)}
                                autoOk
                                disableFuture
                                variant="inline"
                                inputVariant="outlined"
                                keyboardIcon={<Calendar />}
                                id="f_enddate"
                                format="dd/MM/yyyy"
                                name="f_enddate"
                                minDate={pageFilter.f_startdate}
                                value={
                                  pageFilter.f_startdate > pageFilter.f_enddate
                                    ? pageFilter.f_startdate
                                    : pageFilter.f_enddate || null
                                }
                                onChange={(date) =>
                                  setPageFilter({ ...pageFilter, f_enddate: date })
                                }
                                size="small"
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                                label={<span style={visuallyHidden}>{t('fields:to')}</span>}
                              />
                            </Grid>
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm="auto">
                    <Box
                      display="flex"
                      justifyContent={{ xs: 'flex-start', sm: 'flex-start', lg: 'flex-end' }}
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
                        color="primary"
                        onClick={onFilterReset}
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

        <CustomTable
          noDataMessage={t('dataNotFound')}
          order={order}
          orderBy={orderBy}
          setOrder={setOrder}
          setOrderBy={setOrderBy}
          data={topicLog}
          headCells={allHeadCells}
          dataParameter={dataParameter}
          selected={checkState}
          setSelected={onCheck}
        >
          {topicLog.map((row) => {
            return (
              <TableRow hover data-id={row.id} key={row.id}>
                <TableCell tabIndex={0}>{row.source}</TableCell>
                <TableCell tabIndex={0}>{row.logged_at}</TableCell>
                <TableCell tabIndex={0}>{row.receivers}</TableCell>
                <TableCell className={classes.verticalSpaceRemove}>
                  {viewTopicDetails(row)}
                </TableCell>
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
              page={pageDetails.current_page}
              variant="text"
            />
            <Box mt={{ xs: 1, sm: 0 }}>
              <Typography component="p" variant="body2" tabIndex={0}>
                Showing {topicLog.length} rows out of {pageDetails.total}
              </Typography>
            </Box>
          </Box>
        ) : null}
      </Paper>
    </>
  )
}

TopicLogs.propTypes = {
  allHeadCells: PropTypes.array,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  topicLog: PropTypes.array,
  pageDetails: PropTypes.object,
  setSearchValue: PropTypes.func,
  onSearchEnter: PropTypes.func,
  topicId: PropTypes.any,
  searchText: PropTypes.string,
  pageFilter: PropTypes.object,
  setPageFilter: PropTypes.object,
  onApplyFilter: PropTypes.func,
  onFilterReset: PropTypes.func,
}
TopicLogs.defaultProps = {
  allHeadCells: [],
  pageFilter: {},
  setPageFilter: {},
  onChangePage: () => {},
  onChangeRowsPerPage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  setSearchValue: () => {},
  onSearchEnter: () => {},
  topicLog: [],
  pageDetails: {},
  topicId: '',
  searchText: '',
  onApplyFilter: () => {},
  onFilterReset: () => {},
}

export default TopicLogs
