import DateFnsUtils from '@date-io/date-fns'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  Hidden,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
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
import ToggleButton from '@material-ui/lab/ToggleButton'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { visuallyHidden } from '@mui/utils'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowRight, Calendar, Download, HelpCircle, Settings, Sliders } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { CustomToggleGroup } from '../../../assets/js/common.Style'
import { ROUTES } from '../../../helpers/constants'
import { statuses, studentGender } from '../../../helpers/stub'
import { exportToCSV, get, isEmpty, makeFakeEvent } from '../../../helpers/utils'
import Breadcrumb from '../../breadcrumbs/Breadcrumbs'
import CustomTable from '../../table/CustomTable'
import UserSetting from '../../table/TableSetting'
import useStyles from './Reports.Style'

const REPORT_STATUS = {
  ENROLLED: 'Enrolled',
  PENDING: 'Pending',
  GRADUATED: 'Graduated',
  DROPPED: 'Dropped by the system',
}

// let beforeChange = null

function AllStudentReports({
  initialHeadcells,
  allHeadCells,
  setHeadcells,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  filter,
  setFilterValue,
  onApplyFilter,
  onFilterReset,
  pageDetails,
  onChangePage,
  districts,
  schools,
  allStudentsReportList,
}) {
  const { t } = useTranslation()
  const classes = useStyles()
  const dataParameter = 'id'

  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('reports'),
      href: ROUTES.ALLSTUDENTREPORTS,
    },
    {
      title: t('allStudentReports'),
      href: '',
    },
  ]

  const [settingModal, setSettingModal] = React.useState(false)
  const [alignment, setAlignment] = React.useState('Female')
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

  const toggleSettingModal = function () {
    setSettingModal(!settingModal)
  }

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment)
    setFilterValue(
      makeFakeEvent({
        name: 'gender',
        value: event.currentTarget.value,
      })
    )
  }

  const exportExcel = () => {
    const mappedRequests = allStudentsReportList
      .filter((item) => checkState.includes(item.id.toString()))
      .map((row) => ({
        'Student Id ': row.id,
        'Enrollment Id': row.enr_id,
        'Student Name': row.st_name,
        'Register Date': row.registered_Date,
        'Enrolled Date': row.enr_Date,
        'Age ': row.pgm_minimum_age,
        'Gender ': row.gender,
        'Program Name': row.pgm_name,
        'Last Login': row.last_login,
        'Status ': row.status,
      }))
    exportToCSV(mappedRequests, 'Student Reports List')
  }

  const status = (row) => {
    const report_status = get(row, 'attributes.report_status[0]', REPORT_STATUS.ENROLLED)
    if (report_status === REPORT_STATUS.GRADUATED) {
      return (
        <Box component="span" className="label-green" id={row.id} tabIndex={0}>
          {t('graduated')}
        </Box>
      )
    } else if (report_status === REPORT_STATUS.ENROLLED) {
      return (
        <Box component="span" className="label-info" id={row.id} tabIndex={0}>
          {t('enrolled')}
        </Box>
      )
    } else if (report_status === REPORT_STATUS.PENDING) {
      return (
        <Box component="span" className="label-warning" id={row.id} tabIndex={0}>
          {t('pending')}
        </Box>
      )
    } else {
      return (
        <Box component="span" className="label-red" id={row.id} tabIndex={0}>
          {t('droppedBySystem')}
        </Box>
      )
    }
  }

  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="700">
                {t('allStudentReport')}
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Paper rounded={true} elevation={1} className="paper-round">
        <Box px={2} py={2} width="100%">
          <Accordion defaultExpanded elevation={0} className="custom-accordion">
            <Hidden smUp>
              <AccordionSummary
                aria-controls="user-filter-content"
                id="user-filter-header"
                className="custom-filter-button"
                aria-expanded={true}
              >
                <Box display="flex" alignItems="center">
                  <Sliders className="rotate90" />

                  <Box ml={1} component="span" fontWeight="600" fontSize="16px" tabIndex={0}>
                    {t('filters')}
                  </Box>
                </Box>
                <ArrowDropDownIcon className="arrow-black" />
              </AccordionSummary>
            </Hidden>
            <Hidden smDown>
              <Typography
                component="h4"
                align="left"
                variant="subtitle1"
                color="textPrimary"
                gutterBottom
                tabIndex={0}
              >
                <Box component="span" fontWeight="600">
                  {t('filters')}
                </Box>
              </Typography>
            </Hidden>

            <AccordionDetails>
              <Box
                pt={2}
                display="flex"
                width="100%"
                alignItems="flex-start"
                flexDirection="column"
              >
                <Grid spacing={2} container className="filter-search-section">
                  <Grid item xs={12} sm={6} xl={4}>
                    <TextField
                      className={classes.filterNew + ' custom-input-field'}
                      id="student"
                      name="student"
                      onChange={setFilterValue}
                      value={filter.student}
                      variant="outlined"
                      fullWidth
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title={t('fields:studentDetailsHelp')} placement="top">
                              <HelpCircle className="help-icon" />
                            </Tooltip>
                          </InputAdornment>
                        ),
                        startAdornment: (
                          <InputAdornment className="filter-title" position="start">
                            <Box fontWeight={600} fontSize={14} component="span">
                              {t('fields:studentDetails')}
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                      label={
                        <span style={visuallyHidden}>
                          ({t('fields:studentDetail')}) ({t('fields:studentDetailsHelp')})
                        </span>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} xl={4}>
                    <TextField
                      className={
                        clsx(classes.filterNew, classes.selectIcon) + ' custom-input-field'
                      }
                      name="districtId"
                      id="districtId"
                      value={filter.districtId}
                      onChange={setFilterValue}
                      variant="outlined"
                      fullWidth
                      size="small"
                      pr={0}
                      select
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title={t('fields:districtFilterHelp')} placement="top">
                              <HelpCircle className="help-icon" />
                            </Tooltip>
                          </InputAdornment>
                        ),
                        startAdornment: (
                          <InputAdornment className="filter-title" position="start">
                            <Box fontWeight={600} fontSize={14} component="span">
                              {t('fields:district')}
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                      label={
                        <span style={visuallyHidden}>
                          ({t('fields:district')}) ({t('fields:districtFilterHelp')})
                        </span>
                      }
                    >
                      {districts.map((district) => (
                        <MenuItem key={district.dst_id} value={district.dst_id}>
                          {district.dst_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} xl={4}>
                    <TextField
                      className={
                        clsx(classes.filterNew, classes.selectIcon) + ' custom-input-field'
                      }
                      name="schoolId"
                      id="schoolId"
                      value={filter.schoolId}
                      onChange={setFilterValue}
                      variant="outlined"
                      fullWidth
                      size="small"
                      pr={0}
                      select
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title={t('fields:schoolFilterHelp')} placement="top">
                              <HelpCircle className="help-icon" />
                            </Tooltip>
                          </InputAdornment>
                        ),
                        startAdornment: (
                          <InputAdornment className="filter-title" position="start">
                            <Box fontWeight={600} fontSize={14} component="span">
                              {t('fields:school')}
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                      label={
                        <span style={visuallyHidden}>
                          ({t('fields:school')}) ({t('fields:schoolFilterHelp')})
                        </span>
                      }
                    >
                      {schools.map((school) => (
                        <MenuItem
                          key={school.sch_school_public_id}
                          value={school.sch_school_public_id}
                        >
                          {school.sch_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} xl={4}>
                    <TextField
                      className={
                        clsx(classes.filterNew, classes.selectIcon) + ' custom-input-field'
                      }
                      name="status"
                      id="status"
                      value={filter.status}
                      onChange={setFilterValue}
                      variant="outlined"
                      fullWidth
                      size="small"
                      pr={0}
                      select
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title={t('fields:statusFilterHelp')} placement="top">
                              <HelpCircle className="help-icon" />
                            </Tooltip>
                          </InputAdornment>
                        ),
                        startAdornment: (
                          <InputAdornment className="filter-title" position="start">
                            <Box fontWeight={600} fontSize={14} component="span">
                              {t('fields:status')}
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                      label={
                        <span style={visuallyHidden}>
                          ({t('fields:status')}) ({t('fields:statusFilterHelp')})
                        </span>
                      }
                    >
                      {statuses.map((status) => (
                        <MenuItem key={status.value} value={status.value}>
                          {status.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} xl={4}>
                    <Box
                      id="date_parent"
                      className={classes.dateFilterBox + ' filter-surface-field'}
                      height="100%"
                    >
                      <Box
                        component="div"
                        className={classes.dateFilterLabel + ' filter-title'}
                        mr={2}
                        fontWeight={600}
                        fontSize={14}
                        width="142px"
                      >
                        {t('fields:registeredDate')}
                      </Box>
                      <Box
                        className="date-picker-box"
                        display="flex"
                        height="100%"
                        alignItems="center"
                        pl={{ xs: 2, sm: 0 }}
                        py={{ xs: 2, sm: 0 }}
                      >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container spacing={2} justify="space-between">
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                              <Box display="flex" alignItems="center">
                                <Hidden smUp>
                                  <Box width="70px" component="span" fontWeight={600} fontSize={14}>
                                    {t('fields:from') + ':'}
                                  </Box>
                                </Hidden>
                                <KeyboardDatePicker
                                  fullWidth
                                  className="custom-input-field"
                                  autoOk
                                  variant="inline"
                                  inputVariant="standard"
                                  keyboardIcon={<Calendar />}
                                  size="small"
                                  format="dd/MM/yyyy"
                                  id="registeredDateFrom"
                                  name="registeredDateFrom"
                                  value={filter['registeredDateFrom'] || null}
                                  onChange={(value) =>
                                    setFilterValue(
                                      makeFakeEvent({
                                        name: 'registeredDateFrom',
                                        value: value,
                                      })
                                    )
                                  }
                                  disableFuture
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  label={<span style={visuallyHidden}>({t('fields:from')})</span>}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                              <Box display="flex" alignItems="center">
                                <Hidden smUp>
                                  <Box component="span" width="70px" fontWeight={600} fontSize={14}>
                                    {t('fields:to') + ':'}
                                  </Box>
                                </Hidden>
                                <KeyboardDatePicker
                                  fullWidth
                                  className="custom-picker custom-input-field"
                                  autoOk
                                  variant="inline"
                                  inputVariant="standard"
                                  keyboardIcon={<Calendar />}
                                  size="small"
                                  format="dd/MM/yyyy"
                                  id="registeredDateTo"
                                  name="registeredDateTo"
                                  value={filter['registeredDateTo'] || null}
                                  onChange={(value) =>
                                    setFilterValue(
                                      makeFakeEvent({
                                        name: 'registeredDateTo',
                                        value: value,
                                      })
                                    )
                                  }
                                  disableFuture
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  label={<span style={visuallyHidden}>({t('fields:to')})</span>}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} xl={4}>
                    <Box
                      id="date_parent"
                      className={classes.dateFilterBox + ' filter-surface-field'}
                      height="100%"
                    >
                      <Box
                        component="div"
                        mr={2}
                        className={classes.dateFilterLabel + ' filter-title'}
                        fontWeight={600}
                        fontSize={14}
                        width="122px"
                      >
                        {t('fields:enrolledDate')}
                      </Box>
                      <Box
                        className="date-picker-box"
                        display="flex"
                        height="100%"
                        alignItems="center"
                        pl={{ xs: 2, sm: 0 }}
                        py={{ xs: 2, sm: 0 }}
                      >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container spacing={2} justify="space-between">
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                              <Box display="flex" alignItems="center">
                                <Hidden smUp>
                                  <Box component="span" width="70px" fontWeight={600} fontSize={14}>
                                    {t('fields:from') + ':'}
                                  </Box>
                                </Hidden>
                                <KeyboardDatePicker
                                  fullWidth
                                  autoOk
                                  variant="inline"
                                  inputVariant="standard"
                                  keyboardIcon={<Calendar />}
                                  size="small"
                                  format="dd/MM/yyyy"
                                  id="enrollmentDateFrom"
                                  name="enrollmentDateFrom"
                                  value={filter['enrollmentDateFrom'] || null}
                                  onChange={(value) =>
                                    setFilterValue(
                                      makeFakeEvent({
                                        name: 'enrollmentDateFrom',
                                        value: value,
                                      })
                                    )
                                  }
                                  disableFuture
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  label={<span style={visuallyHidden}>({t('fields:from')})</span>}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                              <Box display="flex" alignItems="center">
                                <Hidden smUp>
                                  <Box component="span" width="70px" fontWeight={600} fontSize={14}>
                                    {t('fields:to') + ':'}
                                  </Box>
                                </Hidden>
                                <KeyboardDatePicker
                                  fullWidth
                                  className="custom-picker custom-input-field"
                                  autoOk
                                  variant="inline"
                                  inputVariant="standard"
                                  keyboardIcon={<Calendar />}
                                  size="small"
                                  format="dd/MM/yyyy"
                                  id="enrollmentDateTo"
                                  name="enrollmentDateTo"
                                  value={filter['enrollmentDateTo'] || null}
                                  onChange={(value) =>
                                    setFilterValue(
                                      makeFakeEvent({
                                        name: 'enrollmentDateTo',
                                        value: value,
                                      })
                                    )
                                  }
                                  disableFuture
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  label={<span style={visuallyHidden}>({t('fields:to')})</span>}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} xl={4}>
                    <Box className="filter-surface-field">
                      <Box component="div" className="filter-title" fontWeight={600} fontSize={14}>
                        {t('fields:gender')}
                      </Box>
                      <CustomToggleGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        className="custom-toggle"
                        name="gender"
                        id="gender"
                        label={<span style={visuallyHidden}>({t('fields:gender')})</span>}
                      >
                        {studentGender.map((option) => (
                          <ToggleButton key={option.value} value={option.value}>
                            {option.name}
                          </ToggleButton>
                        ))}
                      </CustomToggleGroup>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} xl={4}>
                    <Box
                      id="date_parent"
                      className={classes.dateFilterBox + ' filter-surface-field'}
                      height="100%"
                    >
                      <Box
                        component="div"
                        mr={2}
                        className={classes.dateFilterLabel + ' filter-title'}
                        fontWeight={600}
                        fontSize={14}
                        width="122px"
                      >
                        {t('fields:dob')}
                      </Box>
                      <Box
                        className="date-picker-box"
                        display="flex"
                        height="100%"
                        alignItems="center"
                        pl={{ xs: 2, sm: 0 }}
                        py={{ xs: 2, sm: 0 }}
                      >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container spacing={2} justify="space-between">
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                              <Box display="flex" alignItems="center">
                                <Hidden smUp>
                                  <Box component="span" width="70px" fontWeight={600} fontSize={14}>
                                    {t('fields:from') + ':'}
                                  </Box>
                                </Hidden>
                                <KeyboardDatePicker
                                  fullWidth
                                  autoOk
                                  variant="inline"
                                  inputVariant="standard"
                                  keyboardIcon={<Calendar />}
                                  size="small"
                                  format="dd/MM/yyyy"
                                  id="ageFrom"
                                  name="ageFrom"
                                  value={filter['ageFrom'] || null}
                                  onChange={(value) =>
                                    setFilterValue(
                                      makeFakeEvent({
                                        name: 'ageFrom',
                                        value: value,
                                      })
                                    )
                                  }
                                  disableFuture
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  label={<span style={visuallyHidden}>({t('fields:from')})</span>}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                              <Box display="flex" alignItems="center">
                                <Hidden smUp>
                                  <Box component="span" width="70px" fontWeight={600} fontSize={14}>
                                    {t('fields:to') + ':'}
                                  </Box>
                                </Hidden>
                                <KeyboardDatePicker
                                  fullWidth
                                  className="custom-picker custom-input-field"
                                  autoOk
                                  variant="inline"
                                  inputVariant="standard"
                                  keyboardIcon={<Calendar />}
                                  size="small"
                                  format="dd/MM/yyyy"
                                  id="ageTo"
                                  name="ageTo"
                                  value={filter['ageTo'] || null}
                                  onChange={(value) =>
                                    setFilterValue(
                                      makeFakeEvent({
                                        name: 'ageTo',
                                        value: value,
                                      })
                                    )
                                  }
                                  disableFuture
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  label={<span style={visuallyHidden}>({t('fields:to')})</span>}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} xl="auto">
                    <Box
                      display="flex"
                      justifyContent={{
                        xs: 'flex-start',
                        sm: 'flex-end',
                      }}
                      alignItems="center"
                    >
                      <Box mr={1}>
                        <Button
                          className="text-transform-none"
                          disableElevation
                          endIcon={<ArrowRight />}
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={onApplyFilter}
                          disabled={!(filter.districtId && filter.schoolId)}
                        >
                          {t('generateReport')}
                        </Button>
                      </Box>
                      <Button
                        className="text-transform-none"
                        disableElevation
                        variant="text"
                        color="primary"
                        size="large"
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

        <Divider />
        <Box px={2} py={2} width="100%">
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs={12} sm="auto">
              <Typography
                component="h4"
                align="left"
                variant="subtitle1"
                color="textPrimary"
                gutterBottom
                tabIndex={0}
              >
                <Box component="span" fontWeight="600">
                  {t('students')}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm="auto">
              <Box display="flex" alignItems="center" ml={1}>
                <Button
                  className="custom-default-button text-transform-none"
                  size="large"
                  variant="contained"
                  disableElevation
                  startIcon={<Download />}
                  onClick={!isEmpty(checkState) ? exportExcel : () => {}}
                  disabled={isEmpty(checkState)}
                >
                  {t('exportCSV')}
                </Button>
                <Box ml={1}>
                  <Tooltip title={t('tableSetting')}>
                    <IconButton
                      edge="end"
                      onClick={toggleSettingModal}
                      aria-label={t('tableSetting')}
                      color="primary"
                    >
                      <Settings />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <CustomTable
          noDataMessage={t('tableNoRecordFoundMessage')}
          order={order}
          orderBy={orderBy}
          setOrder={setOrder}
          setOrderBy={setOrderBy}
          data={allStudentsReportList}
          headCells={allHeadCells.filter((cell) => initialHeadcells.includes(cell.id))}
          dataParameter={dataParameter}
          selected={checkState}
          setSelected={onCheck}
          isSelection={allStudentsReportList.length > 0 ? true : false}
        >
          {allStudentsReportList.map((row) => {
            return (
              <TableRow hover data-id={row.id} key={row.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    name={row.id}
                    onChange={onCheck}
                    checked={checkState.includes(row.id)}
                    color="primary"
                  />
                </TableCell>
                {initialHeadcells.includes('student_Id') && (
                  <TableCell tabIndex={0}>{row.student_Id}</TableCell>
                )}
                {initialHeadcells.includes('enrollment_Id') && (
                  <TableCell tabIndex={0}>{row.enrollment_Id}</TableCell>
                )}
                {initialHeadcells.includes('student_Name') && (
                  <TableCell tabIndex={0}>{row.student_Name}</TableCell>
                )}
                {initialHeadcells.includes('registered_Date') && (
                  <TableCell tabIndex={0}>{row.registered_Date}</TableCell>
                )}
                {initialHeadcells.includes('date_Enrollment') && (
                  <TableCell tabIndex={0}>{row.date_Enrollment}</TableCell>
                )}
                {initialHeadcells.includes('student_Age') && (
                  <TableCell tabIndex={0}>{row.student_Age}</TableCell>
                )}
                {initialHeadcells.includes('student_Gender') && (
                  <TableCell tabIndex={0}>{row.student_Gender}</TableCell>
                )}
                {initialHeadcells.includes('program_name') && (
                  <TableCell tabIndex={0}>{row.program_name}</TableCell>
                )}
                {initialHeadcells.includes('last_login') && (
                  <TableCell tabIndex={0}>{row.last_login}</TableCell>
                )}
                {initialHeadcells.includes('status') && (
                  <TableCell className={classes.verticalSpaceRemove}>{status(row)}</TableCell>
                )}
              </TableRow>
            )
          })}
        </CustomTable>
        {pageDetails.total > 0 && (
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
                Showing {allStudentsReportList.length} rows out of {pageDetails.total}
              </Typography>
            </Box>
          </Box>
        )}
        <UserSetting
          allHeadCells={allHeadCells}
          initialHeadcells={initialHeadcells}
          setHeadcells={setHeadcells}
          open={settingModal}
          onClose={toggleSettingModal}
        />
      </Paper>
    </>
  )
}

AllStudentReports.propTypes = {
  allHeadCells: PropTypes.array,
  initialHeadcells: PropTypes.array,
  setHeadcells: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  filter: PropTypes.object,
  setFilterValue: PropTypes.func,
  onApplyFilter: PropTypes.func,
  onFilterReset: PropTypes.func,
  onChangePage: PropTypes.func,
  pageDetails: PropTypes.object,
  schools: PropTypes.array,
  districts: PropTypes.array,
  allStudentsReportList: PropTypes.array,
}

AllStudentReports.defaultProps = {
  initialHeadcells: [],
  allHeadCells: [],
  setHeadcells: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  filter: {},
  setFilterValue: () => {},
  onApplyFilter: () => {},
  onFilterReset: () => {},
  onChangePage: () => {},
  pageDetails: {},
  districts: [],
  school: [],
  allStudentsReportList: [],
}

export default AllStudentReports
