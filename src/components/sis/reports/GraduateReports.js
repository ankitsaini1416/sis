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
import { REGISTERATION_STATUS, ROUTES } from '../../../helpers/constants'
import { ragistrationStatus, studentGender } from '../../../helpers/stub'
import {
  enrolledMap,
  exportToCSV,
  getFullName,
  isEmpty,
  makeFakeEvent,
} from '../../../helpers/utils'
import Breadcrumb from '../../breadcrumbs/Breadcrumbs'
import CustomTable from '../../table/CustomTable'
import UserSetting from '../../table/TableSetting'
import useStyles from './Reports.Style'
function GraduateReport({
  allHeadCells,
  initialHeadcells,
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
  graduateReportsList,
  masterData,
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
      href: ROUTES.GRADUATEREPORTS,
    },
    {
      title: t('graduateReport'),
      href: '',
    },
  ]

  const [settingModal, setSettingModal] = React.useState(false)
  const [alignment, setAlignment] = React.useState('All')
  const [checkState, setCheckState] = React.useState([])

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
  const exportExcel = () => {
    const mappedRequests = graduateReportsList
      .filter((item) => checkState.includes(item.id.toString()))
      .map((row) => ({
        [t('studentId')]: row.publicId,
        [t('enrollmentId')]: row.enrSystemEnrollmentId,
        [t('studentName')]: getFullName({
          first_name: row.firstName,
          last_name: row.lastName,
        }),
        [t('emailAddress')]: row.primaryEmail,
        [t('primaryPhone')]: row.mobile,
        [t('registeredDate')]: row.registeredDate,
        [t('enrolledDate')]: row.enrEnrolledOn,
        [t('dateOfBirth')]: row.birth_date,
        [t('studentGender')]: row.gender,
        [t('programName')]: row.enrProgram?.pgm_name,
        [t('registrationStatus')]: registrationStatus(),
        [t('enrollmentStatus')]: enrolledMap[row?.enrStatus].resource,
      }))
    exportToCSV(mappedRequests, t('graduateReport'))
  }

  const registrationStatus = (row) => {
    if (row.approvalStatus === REGISTERATION_STATUS.APPROVED) {
      return (
        <Box component="span" className="label-green" tabIndex={0}>
          {t('approved')}
        </Box>
      )
    } else if (row.approvalStatus === REGISTERATION_STATUS.INPROCESS) {
      return (
        <Box component="span" className="label-info" tabIndex={0}>
          {t('inProcess')}
        </Box>
      )
    } else {
      return (
        <Box component="span" className="label-red" tabIndex={0}>
          {t('denied')}
        </Box>
      )
    }
  }

  const enrollmentStatus = (row) => {
    if (isEmpty(row)) {
      return null
    }
    return (
      <Box component="span" className={enrolledMap[row?.enrStatus].style} id={row.enrId}>
        {t(enrolledMap[row?.enrStatus].resource)}
      </Box>
    )
  }

  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="700">
                {t('graduateReport')}
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
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
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
                          ({t('fields:studentDetails')}) ({t('fields:studentDetailsHelp')})
                        </span>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                    <TextField
                      className={
                        clsx(classes.filterNew, classes.selectIcon) + ' custom-input-field'
                      }
                      name="districtId"
                      id="districtId"
                      value={filter.districtId || ''}
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
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                    <TextField
                      className={
                        clsx(classes.filterNew, classes.selectIcon) + ' custom-input-field'
                      }
                      name="schoolId"
                      id="schoolId"
                      value={filter.schoolId || ''}
                      onChange={setFilterValue}
                      variant="outlined"
                      fullWidth
                      size="small"
                      pr={0}
                      select
                      InputProps={{
                        readOnly: !filter.districtId && true,
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
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                    <TextField
                      className={
                        clsx(classes.filterNew, classes.selectIcon) + ' custom-input-field'
                      }
                      name="registrationStatus"
                      id="registrationStatus"
                      value={filter.registrationStatus || ''}
                      onChange={setFilterValue}
                      variant="outlined"
                      fullWidth
                      size="small"
                      pr={0}
                      select
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip
                              title={t('fields:registrationStatusFilterHelp')}
                              placement="top"
                            >
                              <HelpCircle className="help-icon" />
                            </Tooltip>
                          </InputAdornment>
                        ),
                        startAdornment: (
                          <InputAdornment className="filter-title" position="start">
                            <Box fontWeight={600} fontSize={14} component="span">
                              {t('fields:registrationStatus')}
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                      label={
                        <span style={visuallyHidden}>
                          ({t('fields:registrationStatus')}) (
                          {t('fields:registrationStatusFilterHelp')})
                        </span>
                      }
                    >
                      {ragistrationStatus.map((status) => (
                        <MenuItem key={status.value} value={status.value}>
                          {status.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                    <TextField
                      className={
                        clsx(classes.filterNew, classes.selectIcon) + ' custom-input-field'
                      }
                      name="enrollmentStatus"
                      id="enrollmentStatus"
                      value={filter.enrollmentStatus || ''}
                      onChange={setFilterValue}
                      variant="outlined"
                      fullWidth
                      size="small"
                      pr={0}
                      select
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title={t('fields:enrollmentStatusFilterHelp')} placement="top">
                              <HelpCircle className="help-icon" />
                            </Tooltip>
                          </InputAdornment>
                        ),
                        startAdornment: (
                          <InputAdornment className="filter-title" position="start">
                            <Box fontWeight={600} fontSize={14} component="span">
                              {t('fields:enrollmentStatus')}
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                      label={
                        <span style={visuallyHidden}>
                          ({t('fields:enrollmentStatus')}) ({t('fields:enrollmentStatusFilterHelp')}
                          )
                        </span>
                      }
                    >
                      {masterData.enrollment_status?.map((options) => (
                        <MenuItem key={options} value={options}>
                          {t(`reference:${options}`)}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
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
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
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
                        {t('fields:dateOfBirth')}
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
                                  className={classes.datePickerStandard}
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
                                    setFilterValue({
                                      target: {
                                        name: ['ageFrom'],
                                        value,
                                      },
                                    })
                                  }
                                  disableFuture
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  label={<span style={visuallyHidden}>({t('fields:from')}) )</span>}
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
                                  className={classes.datePickerStandard}
                                  autoOk
                                  variant="inline"
                                  inputVariant="standard"
                                  keyboardIcon={<Calendar />}
                                  size="small"
                                  format="dd/MM/yyyy"
                                  id="ageTo"
                                  name="ageTo"
                                  minDate={filter.ageFrom}
                                  value={filter['ageTo'] || null}
                                  onChange={(value) =>
                                    setFilterValue({
                                      target: {
                                        name: ['ageTo'],
                                        value,
                                      },
                                    })
                                  }
                                  disableFuture
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  label={<span style={visuallyHidden}>({t('fields:to')}) )</span>}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
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
                        width="152px"
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
                                  className={classes.datePickerStandard}
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
                                    setFilterValue({
                                      target: {
                                        name: ['registeredDateFrom'],
                                        value,
                                      },
                                    })
                                  }
                                  disableFuture
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  label={<span style={visuallyHidden}>({t('fields:from')}) )</span>}
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
                                  className={classes.datePickerStandard}
                                  autoOk
                                  variant="inline"
                                  inputVariant="standard"
                                  keyboardIcon={<Calendar />}
                                  size="small"
                                  format="dd/MM/yyyy"
                                  id="registeredDateTo"
                                  name="registeredDateTo"
                                  minDate={filter.registeredDateFrom}
                                  value={filter['registeredDateTo'] || null}
                                  onChange={(value) =>
                                    setFilterValue({
                                      target: {
                                        name: ['registeredDateTo'],
                                        value,
                                      },
                                    })
                                  }
                                  disableFuture
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  label={<span style={visuallyHidden}>({t('fields:to')}) )</span>}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
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
                        width="152px"
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
                                  className={classes.datePickerStandard}
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
                                    setFilterValue({
                                      target: {
                                        name: ['enrollmentDateFrom'],
                                        value,
                                      },
                                    })
                                  }
                                  disableFuture
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  label={<span style={visuallyHidden}>({t('fields:from')}) )</span>}
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
                                  className={classes.datePickerStandard}
                                  autoOk
                                  variant="inline"
                                  inputVariant="standard"
                                  keyboardIcon={<Calendar />}
                                  size="small"
                                  format="dd/MM/yyyy"
                                  id="enrollmentDateTo"
                                  name="enrollmentDateTo"
                                  minDate={filter.enrollmentDateFrom}
                                  value={filter['enrollmentDateTo'] || null}
                                  onChange={(value) =>
                                    setFilterValue({
                                      target: {
                                        name: ['enrollmentDateTo'],
                                        value,
                                      },
                                    })
                                  }
                                  disableFuture
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  label={<span style={visuallyHidden}>({t('fields:to')}) )</span>}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
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
                        width="152px"
                      >
                        {t('fields:graduatedDate')}
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
                                  className={classes.datePickerStandard}
                                  autoOk
                                  variant="inline"
                                  inputVariant="standard"
                                  keyboardIcon={<Calendar />}
                                  size="small"
                                  format="dd/MM/yyyy"
                                  id="graduationDateFrom"
                                  name="graduationDateFrom"
                                  value={filter['graduationDateFrom'] || null}
                                  onChange={(value) =>
                                    setFilterValue({
                                      target: {
                                        name: ['graduationDateFrom'],
                                        value,
                                      },
                                    })
                                  }
                                  disableFuture
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  label={<span style={visuallyHidden}>({t('fields:from')}) )</span>}
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
                                  className={classes.datePickerStandard}
                                  autoOk
                                  variant="inline"
                                  inputVariant="standard"
                                  keyboardIcon={<Calendar />}
                                  size="small"
                                  format="dd/MM/yyyy"
                                  id="graduateDateTo"
                                  name="graduateDateTo"
                                  minDate={filter.graduationDateFrom}
                                  value={filter['graduateDateTo'] || null}
                                  onChange={(value) =>
                                    setFilterValue({
                                      target: {
                                        name: ['graduateDateTo'],
                                        value,
                                      },
                                    })
                                  }
                                  disableFuture
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  label={<span style={visuallyHidden}>({t('fields:to')}) )</span>}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={4} xl={12}>
                    <Box
                      display="flex"
                      justifyContent={{
                        xs: 'flex-end',
                        sm: 'flex-end',
                        md: 'flex-end',
                        lg: 'flex-start',
                        xl: 'flex-start',
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
          data={graduateReportsList}
          headCells={allHeadCells.filter((cell) => initialHeadcells.includes(cell.id))}
          dataParameter={dataParameter}
          selected={checkState}
          setSelected={onCheck}
          isSelection={graduateReportsList.length > 0 ? true : false}
        >
          {graduateReportsList.map((row) => {
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
                  <TableCell tabIndex={0}>{row.publicId}</TableCell>
                )}
                {initialHeadcells.includes('enrollment_Id') && (
                  <TableCell tabIndex={0}>{row.enrSystemEnrollmentId}</TableCell>
                )}
                {initialHeadcells.includes('student_Name') && (
                  <TableCell tabIndex={0}>
                    {getFullName({
                      first_name: row.firstName,
                      last_name: row.lastName,
                    })}
                  </TableCell>
                )}
                {initialHeadcells.includes('email_Address') && (
                  <TableCell tabIndex={0}>
                    <Tooltip placement="top" title={row.primaryEmail}>
                      <Box width="200px" className="text-ellipsis">
                        {row.primaryEmail}
                      </Box>
                    </Tooltip>
                  </TableCell>
                )}
                {initialHeadcells.includes('primary_Phone') && (
                  <TableCell tabIndex={0}>
                    {`${row.mobilePhonePrefix || ''}`} {`${row.mobilePhone || ''}`}
                  </TableCell>
                )}
                {initialHeadcells.includes('registered_Date') && (
                  <TableCell tabIndex={0}>{row.registeredDate}</TableCell>
                )}
                {initialHeadcells.includes('date_Enrollment') && (
                  <TableCell tabIndex={0}>{row.enrEnrolledOn}</TableCell>
                )}
                {initialHeadcells.includes('date_of_birth') && (
                  <TableCell tabIndex={0}>{row.birth_date}</TableCell>
                )}
                {initialHeadcells.includes('student_Gender') && <TableCell>{row.gender}</TableCell>}
                {initialHeadcells.includes('program_name') && (
                  <TableCell tabIndex={0}>{row.enrProgram?.pgm_name}</TableCell>
                )}
                {initialHeadcells.includes('gpa') && <TableCell tabIndex={0}>{row.gpa}</TableCell>}
                {initialHeadcells.includes('registration_status') && (
                  <TableCell className={classes.verticalSpaceRemove}>
                    <Box
                      tabIndex={0}
                      component="span"
                      className={clsx({
                        'label-warning': row?.approvalStatus === REGISTERATION_STATUS.DENIED,
                        'label-green': row?.approvalStatus === REGISTERATION_STATUS.APPROVED,
                        'label-red': row?.approvalStatus === REGISTERATION_STATUS.INPROCESS,
                      })}
                      id={row.id}
                    >
                      {registrationStatus(row)}
                    </Box>
                  </TableCell>
                )}
                {initialHeadcells.includes('enrollment_status') && (
                  <TableCell className={classes.verticalSpaceRemove}>
                    {enrollmentStatus(row)}
                  </TableCell>
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
              <Typography component="p" variant="body2">
                Showing {graduateReportsList.length} rows out of {pageDetails.total}
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

GraduateReport.propTypes = {
  initialHeadcells: PropTypes.array,
  allHeadCells: PropTypes.array,
  setHeadcells: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  filter: PropTypes.object,
  setFilterValue: PropTypes.func,
  onApplyFilter: PropTypes.func,
  onFilterReset: PropTypes.func,
  pageDetails: PropTypes.object,
  onChangePage: PropTypes.func,
  schools: PropTypes.array,
  districts: PropTypes.array,
  graduateReportsList: PropTypes.array,
  masterData: PropTypes.object,
}

GraduateReport.defaultProps = {
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
  pageDetails: {},
  onChangePage: () => {},
  districts: [],
  school: [],
  graduateReportsList: [],
  masterData: {},
}

export default GraduateReport
