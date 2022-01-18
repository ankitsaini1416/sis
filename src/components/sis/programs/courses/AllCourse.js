import {
  Box,
  Button,
  Checkbox,
  Grid,
  Hidden,
  IconButton,
  InputAdornment,
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
import useMediaQuery from '@material-ui/core/useMediaQuery'
// import { withStyles } from '@material-ui/core/styles'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Pagination from '@material-ui/lab/Pagination'
import PropTypes from 'prop-types'
import React from 'react'
import {
  Archive,
  ArrowRight,
  Download,
  Edit2,
  Eye,
  Plus,
  Search,
  Settings,
  Sliders,
} from 'react-feather'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '../../../../helpers/constants'
import withRedirect from '../../../../hocs/RedirectHOC'
import ConfirmBox from '../../../common/ConfirmBox'
import CustomTable from '../../../table/CustomTable'
import ProgramSetting from '../../../table/TableSetting'
import { statuses } from './../../../../helpers/stub'
import { exportToCSV, get, isEmpty } from './../../../../helpers/utils'
import Breadcrumb from './../../../breadcrumbs/Breadcrumbs'
import DateRangeFilter from './../../../filters/DateRange'
import SelectFilter from './../../../filters/Select'
import useStyles from './../Programs.Style'
import AddCourse from './AddCourse'

// const CheckboxWithGreenCheck = withStyles({})(Checkbox)
function AllCourse({
  allHeadCells,
  initialHeadcells,
  setHeadcells,
  onChangePage,
  pageDetails,
  courses,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  filter,
  setFilterValue,
  onFilterReset,
  onApplyFilter,
  onSearchEnter,
  districts,
  fetchSchools,
  schools,
  addCourse,
  fetchSubjects,
  getInstructors,
  subjects,
  removeCourse,
  instructors,
}) {
  const classes = useStyles()
  const dataParameter = 'id'
  const { t } = useTranslation()

  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbPrograms'),
      href: ROUTES.PROGRAMS,
    },
    {
      title: t('breadcrumbAllCourses'),
      href: '',
    },
  ]
  const [deleteItem, setdeleteItem] = React.useState('')
  const toggleDeletePopup = function (event) {
    if (!deleteItem) {
      const id = event.currentTarget.attributes['data-id'].value
      setdeleteItem(id)
    } else {
      setdeleteItem('')
    }
  }
  const onDeleteConfirm = function () {
    removeCourse(deleteItem, { callback: toggleDeletePopup })
  }
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
  const [settingModal, setSettingModal] = React.useState(false)

  const toggleSettingModal = function () {
    setSettingModal(!settingModal)
  }
  const viewDetail = (row) => {
    const IconButtonEnhanced = withRedirect(IconButton)
    return (
      <Box whiteSpace="nowrap">
        <IconButtonEnhanced
          edge="start"
          data-id={row.id}
          color="primary"
          to={`${ROUTES.COURSESDETAILS}/${row.id}`}
          aria-label={t('viewDetail')}
        >
          <Tooltip title={t('viewDetail')}>
            <Eye width="16px" height="16px" />
          </Tooltip>
        </IconButtonEnhanced>

        <IconButtonEnhanced
          to={`${ROUTES.EDITCOURSES}/${row.id}`}
          data-id={row.id}
          color="primary"
          aria-label={t('editCourse')}
        >
          <Tooltip title={t('editCourse')}>
            <Edit2 width="16px" height="16px" />
          </Tooltip>
        </IconButtonEnhanced>

        <Tooltip title={t('archive')}>
          <IconButton
            onClick={toggleDeletePopup}
            edge="end"
            data-id={row.id}
            color="secondary"
            aria-label={t('archive')}
          >
            <Archive width="16px" height="16px" />
          </IconButton>
        </Tooltip>
      </Box>
    )
  }
  const status = (row) => {
    if (row.cr_is_active) {
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

  const [addCourseModal, setAddCourseModal] = React.useState(false)
  const toggleAddCourse = () => {
    setAddCourseModal(!addCourseModal)
  }

  const exportExcel = () => {
    const mappedRequests = courses
      .filter((item) => checkState.includes(item.id))
      .map((row) => ({
        [t('courseCode')]: row.cr_number,
        [t('courseName')]: row.cr_name,
        [t('school')]: get(row, 'cr_school.sch_name', ''),
        [t('subject')]: get(row, 'cr_subject.sub_name', ''),
        [t('createdDate')]: row.createdTimeLabel,
        [t('lastUpdated')]: row.updatedTimeLabel,
        [t('status')]: row.cr_is_active ? t('active') : t('inActive'),
      }))
    exportToCSV(mappedRequests, 'Applications')
  }
  const breakpoint = useMediaQuery('(max-width:599px)')
  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary">
              <Box component="span" fontWeight="700" tabIndex={0}>
                {t('allCourses')}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs="auto">
            <Box
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
                startIcon={<Plus />}
                onClick={toggleAddCourse}
              >
                {t('addCourse')}
              </Button>
            </Box>
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
                  autoComplete="search"
                  placeholder={t('fields:searchCourse')}
                  value={filter.q}
                  onKeyDown={onSearchEnter}
                  onChange={setFilterValue}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="press enter to search">
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
                        aria-label="click here to set the table columns"
                        color="primary"
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
                  >
                    <Box
                      component="span"
                      fontWeight="fontWeightMedium"
                      fontSize="16px"
                      tabIndex={0}
                    >
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
                      optionId="sch_id"
                      optionName="sch_name"
                      options={schools}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md="auto">
                    <SelectFilter
                      name="subjectId"
                      filter={filter}
                      setFilterValue={setFilterValue}
                      label={t('fields:subject') + ':'}
                      labelFallback={t('fields:selectSubject')}
                      optionId="sub_id"
                      optionName="sub_name"
                      options={subjects}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md="auto">
                    <SelectFilter
                      name="isActive"
                      filter={filter}
                      setFilterValue={setFilterValue}
                      label={t('fields:status') + ':'}
                      labelFallback={t('fields:status')}
                      optionId="name"
                      optionName="value"
                      options={statuses}
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
                          onClick={onApplyFilter}
                          disabled={!filter.schoolId}
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
          noDataMessage={t('tableNoRecordFoundMessage')}
          order={order}
          orderBy={orderBy}
          setOrder={setOrder}
          setOrderBy={setOrderBy}
          data={courses}
          headCells={allHeadCells.filter((cell) => initialHeadcells.includes(cell.id))}
          dataParameter={dataParameter}
          selected={checkState}
          setSelected={onCheck}
          isSelection={courses.length > 0 && true}
        >
          {courses.map((row) => {
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

                {initialHeadcells.includes('cr_number') && (
                  <TableCell tabIndex={0}>{row.cr_number}</TableCell>
                )}
                {initialHeadcells.includes('cr_name') && (
                  <TableCell tabIndex={0}>{row.cr_name}</TableCell>
                )}
                {initialHeadcells.includes('cr_school_id') && (
                  <TableCell tabIndex={0}>{get(row, 'cr_school.sch_name', '')}</TableCell>
                )}
                {initialHeadcells.includes('cr_subject_id') && (
                  <TableCell tabIndex={0}>{get(row, 'cr_subject.sub_name', '')}</TableCell>
                )}
                {initialHeadcells.includes('created_at') && (
                  <TableCell tabIndex={0}>{row.createdTimeLabel}</TableCell>
                )}
                {initialHeadcells.includes('updated_at') && (
                  <TableCell tabIndex={0}>{row.updatedTimeLabel}</TableCell>
                )}
                {initialHeadcells.includes('cr_is_active') && (
                  <TableCell className={classes.verticalSpaceRemove}>{status(row)}</TableCell>
                )}
                {initialHeadcells.includes('actions') && (
                  <TableCell className={classes.verticalSpaceRemove}>{viewDetail(row)}</TableCell>
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
              <Typography tabIndex={0} component="p" variant="body2">
                Showing {courses.length} rows out of {pageDetails.total}
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>
      <AddCourse
        open={addCourseModal}
        onClose={toggleAddCourse}
        districts={districts}
        fetchSchools={fetchSchools}
        schools={schools}
        addCourse={addCourse}
        fetchSubjects={fetchSubjects}
        getInstructors={getInstructors}
        subjects={subjects}
        instructors={instructors}
      />
      <ProgramSetting
        allHeadCells={allHeadCells}
        initialHeadcells={initialHeadcells}
        setHeadcells={setHeadcells}
        open={settingModal}
        onClose={toggleSettingModal}
      />
      <ConfirmBox
        maxWidth="xs"
        open={!isEmpty(deleteItem)}
        close={toggleDeletePopup}
        onConfirm={onDeleteConfirm}
        defaultProps={{ message: 'archiveConfirmation', buttonText: 'archive' }}
      />
    </>
  )
}
AllCourse.propTypes = {
  allHeadCells: PropTypes.array,
  initialHeadcells: PropTypes.array,
  setHeadcells: PropTypes.func,
  onChangePage: PropTypes.func,
  pageDetails: PropTypes.object,
  courses: PropTypes.array,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  filter: PropTypes.object,
  setFilterValue: PropTypes.func,
  onFilterReset: PropTypes.func,
  onApplyFilter: PropTypes.func,
  onSearchEnter: PropTypes.func,
  districts: PropTypes.array,
  fetchSchools: PropTypes.func,
  schools: PropTypes.array,
  addCourse: PropTypes.func,
  fetchSubjects: PropTypes.func,
  getInstructors: PropTypes.func,
  subjects: PropTypes.array,
  removeCourse: PropTypes.func,
  instructors: PropTypes.array,
}

AllCourse.defaultProps = {
  allHeadCells: [],
  initialHeadcells: [],
  setHeadcells: () => {},
  onChangePage: () => {},
  pageDetails: {},
  courses: [],
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  filter: {},
  setFilterValue: () => {},
  onFilterReset: () => {},
  onApplyFilter: () => {},
  onSearchEnter: () => {},
  districts: [],
  fetchSchools: () => {},
  schools: [],
  addCourse: () => {},
  fetchSubjects: () => {},
  getInstructors: () => {},
  subjects: [],
  removeCourse: () => {},
  instructors: [],
}

export default AllCourse
