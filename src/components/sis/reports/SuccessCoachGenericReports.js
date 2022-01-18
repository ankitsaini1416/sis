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
import React, { useRef } from 'react'
import { ArrowRight, Calendar, Download, HelpCircle, Settings, Sliders } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { CustomToggleGroup } from '../../../assets/js/common.Style'
import { statuses, studentAvailability, studentGender } from '../../../helpers/stub'
import { exportToCSV, get, isEmpty, makeFakeEvent } from '../../../helpers/utils'
import CustomTable from '../../table/CustomTable'
import UserSetting from '../../table/TableSetting'
import useStyles from './Reports.Style'

const defaultHeadCells = [
  'full_Name',
  'email_Id',
  'joined_from',
  'enrollment_id',
  'tutor_Gender',
  'student_Name',
  'program_name',
  'availability',
  'status',
]

const TUTOR_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
}

function SuccessCoachGenericReport({
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
  fetchSchool,
  districts,
  schools,
  successCoachReportList,
}) {
  const { t } = useTranslation()
  const classes = useStyles()
  const dataParameter = 'id'
  const [initialHeadcells, setInitialHeadcells] = React.useState(defaultHeadCells)
  const [settingModal, setSettingModal] = React.useState(false)
  const [alignment, setAlignment] = React.useState('All')
  const [successCoachAlignment, setSuccessCoachAlignment] = React.useState('Available')
  const [checkState, setCheckState] = React.useState([])
  const districtCode = useRef('')

  const setHeadcells = function (headcells) {
    setInitialHeadcells(headcells)
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
  const handleChangeAvailability = (event, newAlignment) => {
    setSuccessCoachAlignment(newAlignment)
    setFilterValue(
      makeFakeEvent({
        name: 'availability',
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
    const mappedRequests = successCoachReportList
      .filter((item) => checkState.includes(item.id.toString()))
      .map((row) => ({
        'Full Name ': row.full_name,
        'Email ': row.email,
        'Joined From ': row.joined,
        'Primary Phone ': row.mobile,
        'Age ': row.pgm_minimum_age,
        'Gender ': row.gender,
        'Student Name ': row.st_name,
        'Program Name': row.pgm_name,
        'Availability ': row.availability,
        'Status ': row.status,
      }))
    exportToCSV(mappedRequests, 'Success Coach Reports')
  }

  const status = (row) => {
    const report_status = get(row, 'attributes.enrollment_status[0]', '')
    if (report_status === TUTOR_STATUS.ACTIVE) {
      return (
        <Box component="span" className="label-green" id={row.id} tabIndex={0}>
          {t('active')}
        </Box>
      )
    } else {
      return (
        <Box component="span" className="label-red" id={row.id} tabIndex={0}>
          {t('inActive')}
        </Box>
      )
    }
  }

  React.useEffect(() => {
    if (filter.districtId && filter.districtId !== districtCode.current) {
      fetchSchool(filter.districtId)
      districtCode.current = filter.districtId
    }
  }, [filter.districtId])

  const allHeadCells = [
    {
      id: 'full_Name',
      label: t('fullName'),
      isSort: true,
      sortProperty: 'full_Name',
      width: '200px',
    },
    {
      id: 'email_Id',
      label: t('emailId'),
      isSort: true,
      sortProperty: 'email_Id',
      width: '200px',
    },
    {
      id: 'joined_from',
      label: t('joinedFrom'),
      isSort: true,
      sortProperty: 'joined_from',
      width: '200px',
    },
    {
      id: 'tutor_Gender',
      label: t('tutorGender'),
      isSort: true,
      sortProperty: 'tutor_Gender',
    },
    {
      id: 'student_Name',
      label: t('studentName'),
      isSort: true,
      sortProperty: 'student_Name',
      width: '200px',
    },
    {
      id: 'enrollment_id',
      label: t('enrollmentId'),
      isSort: true,
      sortProperty: 'program_name',
      width: '200px',
    },
    {
      id: 'program_name',
      label: t('programName'),
      isSort: true,
      sortProperty: 'program_name',
      width: '200px',
    },
    {
      id: 'availability',
      label: t('availability'),
      isSort: true,
      sortProperty: 'availability',
      width: '100px',
    },
    {
      id: 'status',
      label: t('status'),
      isSort: true,
      sortProperty: 'status',
    },
  ]
  return (
    <>
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
            <Box pt={2} display="flex" width="100%" alignItems="flex-start" flexDirection="column">
              <Grid spacing={2} container className="filter-search-section">
                <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                  <TextField
                    className={classes.filterNew + ' custom-input-field'}
                    id="successCoach"
                    name="successCoach"
                    onChange={setFilterValue}
                    value={filter.successCoach}
                    variant="outlined"
                    fullWidth
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={t('fields:searchSuccessCoachHelp')} placement="top">
                            <HelpCircle className="help-icon" />
                          </Tooltip>
                        </InputAdornment>
                      ),
                      startAdornment: (
                        <InputAdornment className="filter-title" position="start">
                          <Box fontWeight={600} fontSize={14} component="span">
                            {t('fields:successCoach')}
                          </Box>
                        </InputAdornment>
                      ),
                    }}
                    label={
                      <span style={visuallyHidden}>
                        ({t('fields:successCoach')}) ({t('fields:searchSuccessCoachHelp')})
                      </span>
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                  <TextField
                    className={clsx(classes.filterNew, classes.selectIcon) + ' custom-input-field'}
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
                <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                  <TextField
                    className={clsx(classes.filterNew, classes.selectIcon) + ' custom-input-field'}
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
                <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                  <TextField
                    className={clsx(classes.filterNew, classes.selectIcon) + ' custom-input-field'}
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
                <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                  <Box className="filter-surface-field">
                    <Box component="div" className="filter-title" fontWeight={600} fontSize={14}>
                      {t('fields:availability')}
                    </Box>
                    <CustomToggleGroup
                      color="primary"
                      value={successCoachAlignment}
                      exclusive
                      onChange={handleChangeAvailability}
                      className="custom-toggle"
                      id="availability"
                      name="availability"
                    >
                      {studentAvailability.map((option) => (
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
                      {t('fields:joiningDate')}
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
                                id="joinedFromDate"
                                name="joinedFromDate"
                                value={filter['joinedFromDate'] || null}
                                onChange={(value) =>
                                  setFilterValue({
                                    target: {
                                      name: ['joinedFromDate'],
                                      value,
                                    },
                                  })
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
                                className={classes.datePickerStandard}
                                autoOk
                                variant="inline"
                                inputVariant="standard"
                                keyboardIcon={<Calendar />}
                                size="small"
                                format="dd/MM/yyyy"
                                id="joinedToDate"
                                name="joinedToDate"
                                value={filter['joinedToDate'] || null}
                                onChange={(value) =>
                                  setFilterValue({
                                    target: {
                                      name: ['joinedToDate'],
                                      value,
                                    },
                                  })
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
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
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
                {t('successCoach')}
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
        data={successCoachReportList}
        headCells={allHeadCells.filter((cell) => initialHeadcells.includes(cell.id))}
        dataParameter={dataParameter}
        selected={checkState}
        setSelected={onCheck}
        isSelection={successCoachReportList.length > 0 ? true : false}
      >
        {successCoachReportList.map((row) => {
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
              {initialHeadcells.includes('full_Name') && (
                <TableCell tabIndex={0}>{row.full_Name}</TableCell>
              )}
              {initialHeadcells.includes('email_Id') && (
                <TableCell tabIndex={0}>
                  <Tooltip placement="top" title={row.email_Id}>
                    <Box width="200px" className="text-ellipsis">
                      {row.email_Id}
                    </Box>
                  </Tooltip>
                </TableCell>
              )}
              {initialHeadcells.includes('joined_from') && (
                <TableCell tabIndex={0}>{row.joined_from}</TableCell>
              )}
              {initialHeadcells.includes('tutor_Gender') && (
                <TableCell tabIndex={0}>{row.tutor_Gender}</TableCell>
              )}
              {initialHeadcells.includes('student_Name') && (
                <TableCell tabIndex={0}>{row.student_Name}</TableCell>
              )}
              {initialHeadcells.includes('enrollment_id') && (
                <TableCell tabIndex={0}>{row.enrollment_id}</TableCell>
              )}
              {initialHeadcells.includes('program_name') && (
                <TableCell tabIndex={0}>{row.program_name}</TableCell>
              )}
              {initialHeadcells.includes('availability') && (
                <TableCell tabIndex={0}>{row.availability}</TableCell>
              )}
              {initialHeadcells.includes('status') && (
                <TableCell className={classes.verticalSpaceRemove}>{status(row)}</TableCell>
              )}
            </TableRow>
          )
        })}
      </CustomTable>
      {successCoachReportList.length > 0 && (
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
              Showing {successCoachReportList.length} rows out of {pageDetails.total}
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
    </>
  )
}
SuccessCoachGenericReport.propTypes = {
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
  fetchSchool: PropTypes.func,
  schools: PropTypes.array,
  districts: PropTypes.array,
  successCoachReportList: PropTypes.array,
}
SuccessCoachGenericReport.defaultProps = {
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
  fetchSchool: () => {},
  districts: [],
  school: [],
  successCoachReportList: [],
}

export default SuccessCoachGenericReport
