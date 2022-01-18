import '../../../assets/styles/EnrollmentStatus.scss'

import {
  Box,
  Button,
  Checkbox,
  Grid,
  Hidden,
  IconButton,
  InputAdornment,
  Paper,
  Popover,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Pagination from '@material-ui/lab/Pagination'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowRight, Download, Eye, FilePlus, Info, Search, Settings, Sliders } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '../../../helpers/constants'
import { gender, successCoachOption } from '../../../helpers/stub'
import { enrolledMap, exportToCSV, getFullName, isEmpty } from '../../../helpers/utils'
import withRedirect from '../../../hocs/RedirectHOC'
import DateRangeFilter from '../../filters/DateRange'
import SelectFilter from '../../filters/Select'
import CustomTable from '../../table/CustomTable'
import TranScriptSetting from '../../table/TableSetting'
import Breadcrumb from './../../breadcrumbs/Breadcrumbs'
import useStyles from './Enrollment.Style'
function ProgramIdDetail({ data }) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handlePopoverClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)

  return (
    <>
      <Info
        width={16}
        height={16}
        className="text-info cursor-pointer"
        aria-owns={open ? 'program-id-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      />
      <Popover
        id="program-id-popover"
        className="program-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            width: '50ch',
          },
        }}
        onClose={handlePopoverClose}
      >
        {/* <Typography tabIndex={0} component="h5" variant="body2" gutterBottom>
          <Box fontWeight={600} tabIndex={0}>
            {t('programName')}
          </Box>
        </Typography> */}
        <Typography tabIndex={0} component="h5" variant="body2" gutterBottom>
          <Box fontWeight={600} tabIndex={0}>
            {data.enrProgram?.pgm_name}
          </Box>
        </Typography>
        {/* <Typography tabIndex={0} component="p" variant="body2" gutterBottom>
          <Box fontWeight={500} tabIndex={0}>
            {data.enrProgram?.pgm_name}
          </Box>
        </Typography> */}

        {/* <Typography tabIndex={0} component="h5" variant="body2" gutterBottom>
          <Box fontWeight={600} tabIndex={0}>
            {t('programDescription')}
          </Box>
        </Typography> */}
        <Box
          width="100%"
          mt={1}
          fontWeight={400}
          fontSize="12px"
          className="block-ellipsis"
          tabIndex={0}
        >
          {data.enrProgram?.pgm_description}
        </Box>
      </Popover>
    </>
  )
}
ProgramIdDetail.propTypes = {
  data: PropTypes.object,
}

ProgramIdDetail.defaultProps = {
  data: {},
}

function AllEnrollments({
  initialHeadcells,
  allHeadCells,
  setHeadcells,
  onChangePage,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  pageDetails,
  filter,
  districts,
  setFilterValue,
  onFilterReset,
  onApplyFilter,
  schools,
  enrollmentList,
  onSearchEnter,
  changeStep,
  masterData,
}) {
  const classes = useStyles()
  const { t } = useTranslation()

  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbEnrollment'),
      href: ROUTES.ALLENROLLMENTS,
    },
    {
      title: t('breadcrumbAllEnrollments'),
      href: '',
    },
  ]
  const dataParameter = 'id'
  const [settingModal, setSettingModal] = React.useState(false)
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

  const exportExcel = () => {
    const mappedRequests = enrollmentList
      .filter((item) => checkState.includes(item.id))
      .map((row) => ({
        [t('enrollmentId')]: row.enrSystemEnrollmentId,
        [t('studentId')]: row.publicId,
        [t('studentName')]: getFullName({
          first_name: row.firstName,
          last_name: row.lastName,
        }),
        [t('studentAge')]: row.age,
        [t('studentGender')]: row.gender,
        [t('programID')]: row.enrProgram?.pgm_program_public_id,
        [t('programName')]: row.enrProgram?.pgm_name,
        [t('dateEnrollment')]: row.enrEnrolledOn,
        [t('successCoachStatus')]: row.success_Coach_Status || t('unAssigned'),
        [t('enrollmentStatus')]: t(enrolledMap[row?.enrStatus]?.resource),
      }))
    exportToCSV(mappedRequests, t('allEnrollments'))
  }

  const viewDetail = (row) => {
    const IconButtonEnhanced = withRedirect(IconButton)
    return (
      <Box whiteSpace="nowrap">
        <IconButtonEnhanced
          edge="start"
          to={`${ROUTES.ENROLLMENTDETAIL}/${row.id}`}
          data-id={row.id}
          color="primary"
          aria-label={t('viewDetail')}
        >
          <Tooltip title={t('viewDetail')}>
            <Eye width="16px" height="16px" />
          </Tooltip>
        </IconButtonEnhanced>
        <IconButtonEnhanced
          to={`${ROUTES.ENROLLMENTDETAIL}/${row.id}`}
          state={{ showAddNote: true }}
          data-id={row.id}
          color="primary"
          aria-label={t('addNote')}
          preCallHandler={() => {
            changeStep(5)
          }}
        >
          <Tooltip title={t('addNote')}>
            <FilePlus width="16px" height="16px" />
          </Tooltip>
        </IconButtonEnhanced>
      </Box>
    )
  }

  const status = (row) => {
    if (isEmpty(row)) {
      return null
    }
    return (
      <Box component="span" className={enrolledMap[row?.enrStatus]?.style} id={row.enrId}>
        {t(enrolledMap[row?.enrStatus]?.resource)}
      </Box>
    )
  }
  const breakpoint = useMediaQuery('(max-width:599px)')

  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography tabIndex={0} component="h4" align="left" variant="h5" color="textPrimary">
              <Box component="span" fontWeight="700">
                {t('allEnrollments')}
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Paper rounded={true} elevation={1} className="paper-round">
        <Box px={2} py={2} width="100%">
          <Accordion defaultExpanded elevation={0} className="custom-accordion">
            <Grid container spacing={2} justify="space-between">
              <Grid item xs={12} sm={6} lg={4} xl={3}>
                <TextField
                  className="custom-input-field input-search"
                  variant="outlined"
                  fullWidth
                  size="small"
                  id="q"
                  name="q"
                  onKeyDown={onSearchEnter}
                  onChange={setFilterValue}
                  value={filter.q}
                  autoComplete="search"
                  placeholder={t('fields:enrollmentSearch')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="Click here to Search" onClick={onApplyFilter}>
                          <Search className="icon-color-light rotate90" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm="auto">
                <Grid
                  container
                  spacing={2}
                  alignItems={breakpoint ? '' : 'center'}
                  direction={breakpoint ? 'column-reverse' : ''}
                >
                  <Grid item xs={12} sm="auto">
                    <AccordionSummary
                      aria-controls="user-filter-content"
                      id="user-filter-header"
                      className="custom-filter-button"
                      aria-label={t('filters')}
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
                  <Grid item xs="auto">
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
                  </Grid>
                  <Grid item xs="auto">
                    <Tooltip title={t('tableSetting')}>
                      <IconButton
                        edge="end"
                        onClick={toggleSettingModal}
                        color="primary"
                        aria-label="click here to set the table columns"
                      >
                        <Settings />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
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
                      name="districtId"
                      filter={filter}
                      setFilterValue={setFilterValue}
                      options={districts}
                      optionId="dst_id"
                      optionName="dst_name"
                      label={t('fields:district') + ':'}
                      labelFallback={t('fields:selectDistrict')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md="auto">
                    <SelectFilter
                      name="schoolId"
                      filter={filter}
                      setFilterValue={setFilterValue}
                      label={t('fields:school') + ':'}
                      labelFallback={t('fields:selectSchool')}
                      optionId="sch_school_public_id"
                      optionName="sch_name"
                      options={schools}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md="auto">
                    <SelectFilter
                      name="status"
                      filter={filter}
                      setFilterValue={setFilterValue}
                      label={t('fields:enrollmentStatus') + ':'}
                      labelFallback={t('fields:enrollmentStatus')}
                      optionId="key"
                      optionName="type"
                      options={masterData.enrollment_status.map((item) => ({
                        type: t(`reference:${item}`),
                        key: `${item}`,
                      }))}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md="auto">
                    <SelectFilter
                      name="gender"
                      filter={filter}
                      setFilterValue={setFilterValue}
                      label={t('fields:gender') + ':'}
                      labelFallback={t('fields:gender')}
                      optionId="value"
                      optionName="name"
                      options={gender}
                    />
                  </Grid>
                  <Grid item xs={12} sm="auto">
                    <DateRangeFilter
                      fromDateName="ageFrom"
                      toDateName="ageTo"
                      filter={filter}
                      setFilterValue={setFilterValue}
                      primaryLabel={t('fields:dateOfBirth')}
                      fromLabel={t('fields:from') + ':'}
                      fromLabelFallback={t('fields:from')}
                      toLabel={t('fields:to') + ':'}
                      toLabelFallback={t('fields:to')}
                      primaryLabelSize="90px"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md="auto">
                    <SelectFilter
                      name="successCoach"
                      filter={filter}
                      setFilterValue={setFilterValue}
                      label={t('fields:successCoach') + ':'}
                      labelFallback={t('fields:successCoach')}
                      options={successCoachOption}
                      optionId="value"
                      optionName="name"
                    />
                  </Grid>
                  <Grid item xs={12} sm="auto">
                    <DateRangeFilter
                      fromDateName="fromDate"
                      toDateName="toDate"
                      filter={filter}
                      setFilterValue={setFilterValue}
                      primaryLabel={t('fields:enrollmentDate') + ':'}
                      fromLabel={t('fields:from') + ':'}
                      fromLabelFallback={t('fields:from')}
                      toLabel={t('fields:to') + ':'}
                      toLabelFallback={t('fields:to')}
                      primaryLabelSize="125px"
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
                          disabled={!filter.schoolId}
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
                        disabled={
                          !(
                            filter.schoolId ||
                            filter.districtId ||
                            filter.gender ||
                            filter.successCoach ||
                            filter.toDate ||
                            filter.fromDate ||
                            filter.q
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
        </Box>

        <CustomTable
          noDataMessage={t('tableNoRecordFoundMessage')}
          order={order}
          orderBy={orderBy}
          setOrder={setOrder}
          setOrderBy={setOrderBy}
          data={enrollmentList}
          headCells={allHeadCells.filter((cell) => initialHeadcells.includes(cell.id))}
          dataParameter={dataParameter}
          selected={checkState}
          setSelected={onCheck}
          isSelection={enrollmentList.length > 0 ? true : false}
        >
          {enrollmentList.map((row) => {
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
                <TableCell tabIndex={0}>{row.enrSystemEnrollmentId}</TableCell>
                <TableCell tabIndex={0}>{row.publicId}</TableCell>
                {initialHeadcells.includes('student_Name') && (
                  <TableCell tabIndex={0}>
                    {getFullName({
                      first_name: row.firstName,
                      last_name: row.lastName,
                    })}
                  </TableCell>
                )}
                {initialHeadcells.includes('student_Age') && (
                  <TableCell tabIndex={0}>{row.age}</TableCell>
                )}
                {initialHeadcells.includes('student_Gender') && (
                  <TableCell tabIndex={0}>{row.gender}</TableCell>
                )}
                {initialHeadcells.includes('program_ID') && (
                  <TableCell>
                    <Box whiteSpace="nowrap" display="flex" alignItems="center">
                      <Box tabIndex={0} component="span" mr={1}>
                        {row.enrProgram?.pgm_program_public_id}
                      </Box>
                      <ProgramIdDetail data={row} />
                    </Box>
                  </TableCell>
                )}
                {initialHeadcells.includes('program_Name') && (
                  <TableCell tabIndex={0}>{row.enrProgram?.pgm_name}</TableCell>
                )}
                {initialHeadcells.includes('date_Enrollment') && (
                  <TableCell tabIndex={0}>{row.enrEnrolledOn}</TableCell>
                )}
                {initialHeadcells.includes('success_Coach_Status') && (
                  <TableCell tabIndex={0}>{row.success_Coach_Status || t('unAssigned')} </TableCell>
                )}
                {initialHeadcells.includes('enrollment_status') && (
                  <TableCell className={classes.verticalSpaceRemove}>{status(row)}</TableCell>
                )}
                <TableCell className={classes.verticalSpaceRemove}>{viewDetail(row)}</TableCell>
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
                Showing {enrollmentList.length} rows out of {pageDetails.total}
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>

      <TranScriptSetting
        allHeadCells={allHeadCells}
        initialHeadcells={initialHeadcells}
        setHeadcells={setHeadcells}
        open={settingModal}
        onClose={toggleSettingModal}
      />
    </>
  )
}
AllEnrollments.propTypes = {
  initialHeadcells: PropTypes.array,
  allHeadCells: PropTypes.array,
  setHeadcells: PropTypes.func,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  pageDetails: PropTypes.object,
  filter: PropTypes.object,
  schools: PropTypes.array,
  setFilterValue: PropTypes.func,
  onFilterReset: PropTypes.func,
  onApplyFilter: PropTypes.func,
  districts: PropTypes.array,
  enrollmentList: PropTypes.array,
  onSearchEnter: PropTypes.func,
  changeStep: PropTypes.func,
  masterData: PropTypes.object,
}

AllEnrollments.defaultProps = {
  initialHeadcells: [],
  allHeadCells: [],
  setHeadcells: () => {},
  onChangePage: () => {},
  onChangeRowsPerPage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  pageDetails: {},
  filter: {},
  schools: [],
  setFilterValue: () => {},
  onFilterReset: () => {},
  onApplyFilter: () => {},
  districts: [],
  enrollmentList: [],
  onSearchEnter: () => {},
  changeStep: () => {},
  masterData: {},
}

export default AllEnrollments
