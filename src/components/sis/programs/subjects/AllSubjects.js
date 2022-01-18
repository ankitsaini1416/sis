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
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Pagination from '@material-ui/lab/Pagination'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import {
  Archive,
  ArrowRight,
  Download,
  Edit2,
  Plus,
  Search,
  Settings,
  Sliders,
} from 'react-feather'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '../../../../helpers/constants'
import { exportToCSV, isEmpty } from '../../../../helpers/utils'
import withRedirect from '../../../../hocs/RedirectHOC'
import ConfirmBox from '../../../common/ConfirmBox'
import CustomTable from '../../../table/CustomTable'
import ProgramSetting from '../../../table/TableSetting'
import Breadcrumb from './../../../breadcrumbs/Breadcrumbs'
import DateRangeFilter from './../../../filters/DateRange'
import SelectFilter from './../../../filters/Select'
import useStyles from './../Programs.Style'
import AddSubject from './AddSubject'

function AllSubject({
  subjects,
  districts,
  schools,
  getSchools,
  createSubject,
  archiveSubject,
  initialHeadcells,
  allHeadCells,
  setHeadcells,
  onChangePage,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  pageDetails,
  setFilterValue,
  onApplyFilter,
  filter,
  onFilterReset,
  onSearchEnter,
  fetchSchool,
}) {
  const classes = useStyles()
  const { t } = useTranslation()

  const [checkState, setCheckState] = useState([])
  const [settingModal, setSettingModal] = useState(false)
  const [addSubject, setAddSubject] = useState(false)
  const [deleteItem, setdeleteItem] = React.useState('')

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
      title: t('breadcrumbAllSubjects'),
      href: '',
    },
  ]

  const dataParameter = 'id'

  const onCheck = (event) => {
    if (Array.isArray(event)) {
      return setCheckState(event.map((item) => item))
    }
    const id = parseInt(event.target.name)
    if (checkState.includes(id)) {
      setCheckState(checkState.filter((item) => item !== id))
    } else {
      setCheckState((oldState) => [...oldState, id])
    }
  }

  const exportExcel = () => {
    const mappedRequests = subjects
      .filter((item) => checkState.includes(item.sub_id))
      .map((row) => ({
        [t('subjectName')]: row.sub_name,
        [t('subjectCode')]: row.sub_code,
        [t('createdDate')]: row.createdTimeLabel,
        [t('lastUpdated')]: row.updatedTimeLabel,
      }))
    exportToCSV(mappedRequests, 'Subjects')
  }

  const toggleSettingModal = function () {
    setSettingModal(!settingModal)
  }

  const toggleDeletePopup = function (event) {
    if (!deleteItem) {
      const id = event.currentTarget.attributes['data-id'].value
      setdeleteItem(id)
    } else {
      setdeleteItem('')
    }
  }

  const onArchiveConfirm = function () {
    archiveSubject(deleteItem, { callback: toggleDeletePopup })
  }

  const viewDetail = (row) => {
    const IconButtonEnhanced = withRedirect(IconButton)
    return (
      <Box whiteSpace="nowrap">
        <IconButtonEnhanced
          aria-label={t('editSubject')}
          edge="start"
          to={`${ROUTES.EDITSUBJECT}/${row.sub_id}`}
          data-id={row.id}
          color="primary"
        >
          <Tooltip title={t('editSubject')}>
            <Edit2 width="16px" height="16px" />
          </Tooltip>
        </IconButtonEnhanced>

        <Tooltip title={t('archive')}>
          <IconButton
            aria-label={t('archive')}
            edge="end"
            data-id={row.sub_id}
            color="secondary"
            onClick={toggleDeletePopup}
          >
            <Archive width="16px" height="16px" />
          </IconButton>
        </Tooltip>
      </Box>
    )
  }

  const toggleAddSubject = () => {
    setAddSubject(!addSubject)
    onApplyFilter()
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
                {t('allSubjects')}
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
                onClick={toggleAddSubject}
              >
                {t('addSubject')}
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
                  value={filter.q}
                  onChange={setFilterValue}
                  onKeyDown={onSearchEnter}
                  placeholder={t('fields:searchSubject')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="press enter to search" onClick={onApplyFilter}>
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
                  <Grid item xs={12} sm={6} md="auto">
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
                  <Grid item xs={12} sm={6} md="auto">
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
                          onClick={onApplyFilter}
                          disabled={!filter.schoolId}
                          variant="contained"
                        >
                          {t('filter')}
                        </Button>
                      </Box>
                      <Button
                        className="text-transform-none"
                        disableElevation
                        variant="text"
                        color="primary"
                        disabled={
                          !(
                            filter.schoolId ||
                            filter.districtId ||
                            filter.fromDate ||
                            filter.toDate ||
                            filter.q
                          )
                        }
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
          data={subjects}
          headCells={allHeadCells.filter((cell) => initialHeadcells.includes(cell.id))}
          dataParameter={dataParameter}
          selected={checkState}
          setSelected={onCheck}
          isSelection={subjects.length > 0}
        >
          {subjects.map((subject) => {
            return (
              <TableRow hover data-id={subject.id} key={subject.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    name={subject.id}
                    onChange={onCheck}
                    checked={checkState.includes(subject.id)}
                    color="primary"
                  />
                </TableCell>
                {initialHeadcells.includes('subject_code') && (
                  <TableCell tabIndex={0}>{subject.sub_code}</TableCell>
                )}
                {initialHeadcells.includes('subject_name') && (
                  <TableCell tabIndex={0}>{subject.sub_name}</TableCell>
                )}
                {initialHeadcells.includes('created_at') && (
                  <TableCell tabIndex={0}>{subject.createdTimeLabel}</TableCell>
                )}
                {initialHeadcells.includes('updated_at') && (
                  <TableCell tabIndex={0}>{subject.updatedTimeLabel}</TableCell>
                )}
                {initialHeadcells.includes('actions') && (
                  <TableCell className={classes.verticalSpaceRemove}>
                    {viewDetail(subject)}
                  </TableCell>
                )}
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
                Showing {subjects.length} rows out of {pageDetails.total}
              </Typography>
            </Box>
          </Box>
        ) : null}
      </Paper>
      <AddSubject
        districts={districts}
        schools={schools}
        getSchools={getSchools}
        open={addSubject}
        onClose={toggleAddSubject}
        createSubject={createSubject}
        fetchSchool={fetchSchool}
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
        onConfirm={onArchiveConfirm}
        defaultProps={{ message: 'archiveConfirmation', buttonText: 'archive' }}
      />
    </>
  )
}
AllSubject.propTypes = {
  initialHeadcells: PropTypes.array,
  allHeadCells: PropTypes.array,
  setHeadcells: PropTypes.func,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  initializeData: PropTypes.array,
  pageDetails: PropTypes.object,
  createSubject: PropTypes.func,
  districts: PropTypes.array,
  schools: PropTypes.array,
  getSchools: PropTypes.func,
  subjects: PropTypes.array,
  setFilterValue: PropTypes.func,
  onApplyFilter: PropTypes.func,
  filter: PropTypes.object,
  onFilterReset: PropTypes.func,
  archiveSubject: PropTypes.func,
  onSearchEnter: PropTypes.func,
  fetchSchool: PropTypes.func,
}

AllSubject.defaultProps = {
  initialHeadcells: [],
  allHeadCells: [],
  setHeadcells: () => {},
  onChangePage: () => {},
  onChangeRowsPerPage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  initializeData: [],
  pageDetails: {},
  createSubject: () => {},
  districts: [],
  schools: [],
  getSchools: () => {},
  subjects: [],
  setFilterValue: () => {},
  onApplyFilter: () => {},
  filter: {},
  onFilterReset: () => {},
  archiveSubject: () => {},
  onSearchEnter: () => {},
  fetchSchool: () => {},
}

export default AllSubject
