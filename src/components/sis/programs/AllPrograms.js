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
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { Archive, ArrowRight, Download, Eye, Plus, Search, Settings, Sliders } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '../../../helpers/constants'
import { statuses, transcripts } from '../../../helpers/stub'
import { exportToCSV, isEmpty } from '../../../helpers/utils'
import withRedirect from '../../../hocs/RedirectHOC'
import ConfirmBox from '../../common/ConfirmBox'
import DateRangeFilter from '../../filters/DateRange'
import SelectFilter from '../../filters/Select'
import CustomTable from '../../table/CustomTable'
import ProgramSetting from '../../table/TableSetting'
import Breadcrumb from './../../breadcrumbs/Breadcrumbs'
import useStyles from './Programs.Style'

function AllPrograms({
  initialHeadcells,
  allHeadCells,
  setHeadcells,
  pageDetails,
  programList,
  onChangePage,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  filter,
  districts,
  schools,
  setFilterValue,
  onFilterReset,
  onApplyFilter,
  archiveDetail,
  openArchivePopup,
  toggleArchivePopup,
  onSearchEnter,
}) {
  const classes = useStyles()
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
      title: t('breadcrumbAllPrograms'),
      href: '',
    },
  ]
  const dataParameter = 'id'
  const [checkState, setCheckState] = React.useState([])
  const [settingModal, setSettingModal] = React.useState(false)

  const toggleSettingModal = function () {
    setSettingModal(!settingModal)
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
    const mappedRequests = programList
      .filter((item) => checkState.includes(item.id.toString()))
      .map((row) => ({
        [t('programId')]: row.pgm_program_public_id,
        [t('programName')]: row.pgm_name,
        [t('minAge')]: row.pgm_minimum_age,
        [t('transcriptRequired')]: row.pgm_require_transcript === true ? 'Yes' : 'No',
        [t('createdDate')]: row.createdTimeLabel,
        [t('lastUpdated')]: row.updatedTimeLabel,
        [t('status')]: row.pgm_is_active ? t('active') : t('inActive'),
      }))
    exportToCSV(mappedRequests, t('allPrograms'))
  }

  const viewDetail = (row) => {
    const IconButtonEnhanced = withRedirect(IconButton)
    return (
      <Box whiteSpace="nowrap">
        <IconButtonEnhanced
          edge="start"
          data-id={row.id}
          color="primary"
          to={`${ROUTES.PROGRAMDETAIL}/${row.id}`}
          aria-label={t('viewDetail')}
        >
          <Tooltip title={t('viewDetail')}>
            <Eye width="16px" height="16px" />
          </Tooltip>
        </IconButtonEnhanced>

        <Tooltip title={t('archive')}>
          <IconButton
            aria-label={t('archive')}
            edge="end"
            data-id={row.id}
            color="secondary"
            onClick={toggleArchivePopup}
          >
            <Archive width="16px" height="16px" />
          </IconButton>
        </Tooltip>
      </Box>
    )
  }

  const breakpoint = useMediaQuery('(max-width:599px)')
  const ButtonEnhanced = withRedirect(Button)

  //const reactBlue = '#ddd'
  /*const props = {
    backgroundColor: '#ddd',
  }

  const MuClasses = useStyles(props)*/
  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="700">
                {t('allPrograms')}
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
              <ButtonEnhanced
                className="text-transform-none"
                size="large"
                variant="contained"
                disableElevation
                color="primary"
                startIcon={<Plus />}
                to={ROUTES.ADDPROGRAM}
              >
                {t('addProgram')}
              </ButtonEnhanced>
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
                  placeholder={t('fields:searchByIdName')}
                  value={filter.q}
                  onChange={setFilterValue}
                  onKeyDown={onSearchEnter}
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
                      label={t('fields:School') + ':'}
                      labelFallback={t('fields:selectSchool')}
                      optionId="sch_id"
                      optionName="sch_name"
                      options={schools}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md="auto">
                    <SelectFilter
                      name="requireTranscript"
                      filter={filter}
                      setFilterValue={setFilterValue}
                      label={t('fields:transcript') + ':'}
                      labelFallback={t('fields:transcript')}
                      optionId="name"
                      optionName="value"
                      options={transcripts}
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
                            filter.schoolId ||
                            filter.districtId ||
                            filter.isActive ||
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
          data={programList}
          headCells={allHeadCells.filter((cell) => initialHeadcells.includes(cell.id))}
          dataParameter={dataParameter}
          selected={checkState}
          setSelected={onCheck}
          isSelection={programList.length > 0 ? true : false}
        >
          {programList.map((row) => {
            const programCategory = row.pgm_program_category?.pct_color_hex || ''
            return (
              <TableRow
                style={{
                  borderColor: programCategory,
                }}
                className={classes.programCategory}
                hover
                data-id={row.id}
                key={row.id}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    name={row.id}
                    onChange={onCheck}
                    checked={checkState.includes(row.id)}
                    color="primary"
                  />
                </TableCell>
                {initialHeadcells.includes('pgm_program_public_id') && (
                  <TableCell tabIndex={0}>{row.pgm_program_public_id}</TableCell>
                )}
                {initialHeadcells.includes('pgm_name') && (
                  <TableCell tabIndex={0}>{row.pgm_name}</TableCell>
                )}
                {initialHeadcells.includes('pgm_minimum_age') && (
                  <TableCell tabIndex={0}>{row.pgm_minimum_age}</TableCell>
                )}
                {initialHeadcells.includes('pgm_require_transcript') && (
                  <TableCell tabIndex={0}>
                    {row.pgm_require_transcript ? t('Yes') : t('No')}
                  </TableCell>
                )}
                {initialHeadcells.includes('created_at') && (
                  <TableCell tabIndex={0}>{row.createdTimeLabel}</TableCell>
                )}
                {initialHeadcells.includes('updated_at') && (
                  <TableCell tabIndex={0}>{row.updatedTimeLabel}</TableCell>
                )}
                {initialHeadcells.includes('pgm_is_active') && (
                  <TableCell className={classes.verticalSpaceRemove}>
                    <Box
                      component="span"
                      className={clsx({
                        'label-green': row.pgm_is_active,
                        'label-red': row.pgm_is_active === false,
                      })}
                      id={row.id}
                      tabIndex={0}
                    >
                      {row.pgm_is_active ? t('active') : t('inActive')}
                    </Box>
                  </TableCell>
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
              <Typography component="p" variant="body2" tabIndex={0}>
                Showing {programList.length} rows out of {pageDetails.total}
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>
      <ConfirmBox
        maxWidth="xs"
        open={openArchivePopup}
        close={toggleArchivePopup}
        onConfirm={archiveDetail}
        defaultProps={{ message: 'archiveConfirmation', buttonText: 'archive' }}
      />
      <ProgramSetting
        allHeadCells={allHeadCells}
        initialHeadcells={initialHeadcells}
        setHeadcells={setHeadcells}
        open={settingModal}
        onClose={toggleSettingModal}
      />
    </>
  )
}
AllPrograms.propTypes = {
  initialHeadcells: PropTypes.array,
  allHeadCells: PropTypes.array,
  setHeadcells: PropTypes.func,
  onChangePage: PropTypes.func,
  pageDetails: PropTypes.object,
  programList: PropTypes.Array,
  onChangeRowsPerPage: PropTypes.func,
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
  archiveDetail: PropTypes.func,
  openArchivePopup: PropTypes.bool,
  toggleArchivePopup: PropTypes.func,
  onSearchEnter: PropTypes.func,
}

AllPrograms.defaultProps = {
  initialHeadcells: [],
  allHeadCells: [],
  setHeadcells: () => {},
  pageDetails: {},
  programList: [],
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
  districts: [],
  archiveDetail: () => {},
  openArchivePopup: false,
  toggleArchivePopup: () => {},
  onSearchEnter: () => {},
}

export default AllPrograms
