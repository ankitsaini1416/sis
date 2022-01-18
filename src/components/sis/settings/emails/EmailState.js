import {
  Box,
  Button,
  ClickAwayListener,
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
import Grid from '@material-ui/core/Grid'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Pagination from '@material-ui/lab/Pagination'
import { Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowRight, ChevronDown, Eye, Search, Sliders } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '../../../../helpers/constants'
import { statuses } from '../../../../helpers/stub'
import { getSorting, stableSort } from '../../../../helpers/utils'
import withRedirect from '../../../../hocs/RedirectHOC'
import DateRangeFilter from '../../../filters/DateRange'
import SelectFilter from '../../../filters/Select'
import CustomTable from '../../../table/CustomTable'
import useStyles from '../Settings.Style'

function EmailState({ onChangePage, order, orderBy, setOrder, setOrderBy, pageDetails }) {
  const { t } = useTranslation()
  const classes = useStyles()

  const [selectStatus, setSelectStatus] = React.useState(null)
  const [selectRecipientEmail, setSelectRecipientEmail] = React.useState(false)
  const [subject, setSubject] = React.useState(false)
  const [createDate, setCreateDate] = React.useState(null)
  const dataParameter = 'id'
  const status = (row) => {
    let status = 'Sent'
    if (status) {
      return (
        <Box component="span" className="label-green" id={row.id}>
          {t('sent')}
        </Box>
      )
    }
  }
  const selectSelectRecipientEmail = () => {
    setSelectRecipientEmail((prev) => !prev)
  }
  const handleRecipientEmail = () => {
    setSelectRecipientEmail(false)
  }
  const selectSubject = () => {
    setSubject((prev) => !prev)
  }
  const handleSelectSubject = () => {
    setSubject(false)
  }

  const allHeadCells = [
    {
      id: 'recipient_email',
      label: t('recipientEmail'),
      isSort: true,
      sortProperty: 'recipient_email',
    },
    {
      id: 'sender_email',
      label: t('senderEmail'),
      isSort: true,
      sortProperty: 'sender_email',
    },
    {
      id: 'subject',
      label: t('subject'),
      isSort: true,
      sortProperty: 'subject',
    },
    {
      id: 'date_time_created',
      label: t('dateTimeCreated'),
      isSort: true,
      sortProperty: 'date_time_created',
    },
    {
      id: 'status',
      label: t('status'),
      isSort: true,
      sortProperty: 'status',
    },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
      width: '100px',
    },
  ]
  const emailStateData = [
    {
      recipient_email: 'test1@abc.com',
      sender_email: 'test2@abc.com',
      subject: 'Password Reset Email',
      date_time_created: '09/09/2021 10:00AM',
      status: 'sent',
    },
    {
      recipient_email: 'test1@abc.com',
      sender_email: 'test2@abc.com',
      subject: 'Password Reset Email',
      date_time_created: '09/09/2021 10:00AM',
      status: 'sent',
    },
    {
      recipient_email: 'test1@abc.com',
      sender_email: 'test2@abc.com',
      subject: 'Password Reset Email',
      date_time_created: '09/09/2021 10:00AM',
      status: 'sent',
    },
    {
      recipient_email: 'test1@abc.com',
      sender_email: 'test2@abc.com',
      subject: 'Password Reset Email',
      date_time_created: '09/09/2021 10:00AM',
      status: 'sent',
    },
  ]
  const viewDetail = (row) => {
    const IconButtonEnhanced = withRedirect(IconButton)
    return (
      <>
        <IconButtonEnhanced
          data-id={row.id}
          color="primary"
          to={`${ROUTES.VIEWEMAIL}?id=${row.id}`}
          aria-label={t('viewDetail')}
        >
          <Tooltip title={t('viewDetail')}>
            <Eye width="16px" height="16px" />
          </Tooltip>
        </IconButtonEnhanced>
      </>
    )
  }
  return (
    <>
      <Formik onSubmit="">
        {() => (
          <Form className={classes.form} noValidate autoComplete="off">
            <Box px={2} py={2} width="100%">
              <Accordion defaultExpanded elevation={0} className="custom-accordion">
                <Grid container spacing={2} justify="space-between">
                  <Grid item xs={12} sm={6} lg={5} xl={4}>
                    <Grid container alignItems="center">
                      <Grid item xs={10}>
                        <Field
                          className="custom-input-field input-search"
                          name="search"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="search"
                          autoComplete="search"
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
                  </Grid>
                  <Grid item xs="auto">
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
                      <Grid item xs={12} sm="auto">
                        <DateRangeFilter
                          fromDateName="fromDate"
                          toDateName="toDate"
                          filter={createDate}
                          setFilterValue={setCreateDate}
                          primaryLabel={t('fields:createdDate') + ':'}
                          fromLabel={t('fields:from') + ':'}
                          fromLabelFallback={t('fields:from')}
                          toLabel={t('fields:to') + ':'}
                          toLabelFallback={t('fields:to')}
                          primaryLabelSize="105px"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md="auto">
                        <ClickAwayListener
                          mouseEvent="onMouseDown"
                          touchEvent="onTouchStart"
                          onClickAway={handleSelectSubject}
                        >
                          <Box position="relative">
                            <Button
                              className="filter-select-button"
                              aria-controls="select-role-menu"
                              aria-haspopup="true"
                              endIcon={<ChevronDown className="color-blue-grey" />}
                              onClick={selectSubject}
                              variant="text"
                              fullWidth
                            >
                              {t('fields:subject')}
                            </Button>

                            <Box
                              display={subject ? 'flex' : 'none'}
                              className="filter-dropdown"
                              minWidth={{ xs: '100%', sm: '200px' }}
                            >
                              <Field
                                className="custom-input-filter input-search"
                                as={TextField}
                                variant="outlined"
                                fullWidth
                                size="small"
                                id="f_urn"
                                name="f_urn"
                                autoComplete="search"
                                placeholder={t('fields:search')}
                                InputProps={{
                                  // <-- This is where the toggle button is added.
                                  endAdornment: (
                                    <InputAdornment position="start">
                                      <IconButton edge="end" aria-label="filter icon">
                                        <Search className="rotate90" />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                  style: {
                                    padding: 0,
                                  },
                                }}
                              />
                            </Box>
                          </Box>
                        </ClickAwayListener>
                      </Grid>
                      <Grid item xs={12} sm={4} md="auto">
                        <ClickAwayListener
                          mouseEvent="onMouseDown"
                          touchEvent="onTouchStart"
                          onClickAway={handleRecipientEmail}
                        >
                          <Box position="relative">
                            <Button
                              className="filter-select-button"
                              aria-controls="select-role-menu"
                              aria-haspopup="true"
                              endIcon={<ChevronDown className="color-blue-grey" />}
                              onClick={selectSelectRecipientEmail}
                              variant="text"
                              fullWidth
                            >
                              {t('fields:recipientEmail')}
                            </Button>

                            <Box
                              display={selectRecipientEmail ? 'flex' : 'none'}
                              className="filter-dropdown"
                              minWidth={{ xs: '100%', sm: '200px' }}
                            >
                              <Field
                                className="custom-input-filter"
                                name="search"
                                as={TextField}
                                variant="outlined"
                                fullWidth
                                size="small"
                                id="search"
                                autoComplete="search"
                                placeholder={t('fields:search')}
                                InputProps={{
                                  // <-- This is where the toggle button is added.
                                  endAdornment: (
                                    <InputAdornment position="start">
                                      <IconButton edge="end" aria-label="filter icon">
                                        <Search className="rotate90" />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                  style: {
                                    padding: 0,
                                  },
                                }}
                              />
                            </Box>
                          </Box>
                        </ClickAwayListener>
                      </Grid>
                      <Grid item xs={12} sm={4} md="auto">
                        <SelectFilter
                          name="isActive"
                          filter={selectStatus}
                          setFilterValue={setSelectStatus}
                          label={t('fields:status') + ':'}
                          labelFallback={t('fields:status')}
                          options={statuses}
                          optionId="name"
                          optionName="value"
                        />
                      </Grid>
                      <Grid item xs={12} sm="auto">
                        <Box
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
          </Form>
        )}
      </Formik>

      <CustomTable
        noDataMessage={t('tableNoRecordFoundMessage')}
        order={order}
        orderBy={orderBy}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
        data={emailStateData}
        headCells={allHeadCells}
        dataParameter={dataParameter}
        isSelection={false}
      >
        {stableSort(emailStateData, getSorting(order, orderBy)).map((row) => {
          return (
            <TableRow hover data-id={row.id} key={row.id}>
              <TableCell>{row.recipient_email}</TableCell>
              <TableCell>{row.sender_email}</TableCell>
              <TableCell>{row.subject}</TableCell>
              <TableCell>{row.date_time_created}</TableCell>
              <TableCell>{status(row)}</TableCell>
              <TableCell className={classes.verticalSpaceRemove}>{viewDetail(row)}</TableCell>
            </TableRow>
          )
        })}
      </CustomTable>
      <Box
        display="flex"
        px={2}
        py={2}
        justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems="center"
      >
        <Pagination
          count={pageDetails.last_page}
          shape="rounded"
          color="primary"
          onChange={onChangePage}
          page={pageDetails.page}
          variant="text"
          className="custom-pagination"
        />
        <Box mt={{ xs: 1, sm: 0 }}>
          <Typography component="p" variant="body2">
            Showing {emailStateData.length} rows out of {pageDetails.total}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

EmailState.propTypes = {
  allHeadCells: PropTypes.array,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  emailStateData: PropTypes.array,
  pageDetails: PropTypes.object,
}
EmailState.defaultProps = {
  allHeadCells: [],
  onChangePage: () => {},
  onChangeRowsPerPage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  emailStateData: [],
  pageDetails: {},
}

export default EmailState
