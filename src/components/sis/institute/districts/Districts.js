import {
  Box,
  Button,
  Collapse,
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
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Pagination from '@material-ui/lab/Pagination'
// import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
// import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowRight, Edit2, Eye, Plus, Search, Settings, Sliders } from 'react-feather'
import { useTranslation } from 'react-i18next'

// import localStorageService from '../../../../api/localStorageService'
import { ROUTES } from '../../../../helpers/constants'
import withRedirect from '../../../../hocs/RedirectHOC'
import CustomTable from '../../../table/CustomTable'
import UserSetting from '../../../table/TableSetting'
import useStyles from '../Institute.Style'
import { statuses } from './../../../../helpers/stub'
import { get } from './../../../../helpers/utils'
import Breadcrumb from './../../../breadcrumbs/Breadcrumbs'
import DateRangeFilter from './../../../filters/DateRange'
import SelectFilter from './../../../filters/Select'

function Row({
  row,
  initialHeadcells,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  allSchoolsHeadCells,
  initialSChoolHeadcells,
  dataParameter,
  fetchSchools,
}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const [expand, setExpand] = React.useState({ id: '', open: false })
  const handleRowClick = function (e, row) {
    console.log(expand)
    if (!expand.open) {
      fetchSchools(row.dst_id)
    }
    setExpand({
      id: e.currentTarget.attributes['data-id'].value,
      open: !expand.open,
    })
  }
  const viewDetail = (row) => {
    const IconButtonEnhanced = withRedirect(IconButton)
    return (
      <Box whiteSpace="nowrap">
        <IconButtonEnhanced
          edge="start"
          data-id={row.id}
          color="primary"
          to={`${ROUTES.DISTRICTDETAILSINSTITUTE}/${row.id}`}
          aria-label={t('viewDetails')}
        >
          <Tooltip title={t('viewDetail')}>
            <Eye width="16px" height="16px" />
          </Tooltip>
        </IconButtonEnhanced>

        <IconButtonEnhanced
          edge="end"
          data-id={row.id}
          color="primary"
          to={`${ROUTES.EDITDISTRICTINSTITUTE}/${row.id}`}
          aria-label={t('editDetail')}
        >
          <Tooltip title={t('editDetail')}>
            <Edit2 width="16px" height="16px" />
          </Tooltip>
        </IconButtonEnhanced>
      </Box>
    )
  }
  const status = (row) => {
    if (row.sch_is_active) {
      return (
        <Box tabIndex={0} whiteSpace="nowrap" component="span" className="label-green" id={row.id}>
          {t('active')}
        </Box>
      )
    } else {
      return (
        <Box tabIndex={0} whiteSpace="nowrap" component="span" className="label-red" id={row.id}>
          {t('inActive')}
        </Box>
      )
    }
  }
  return (
    <>
      <TableRow hover data-id={row.id} key={row.id}>
        {initialHeadcells.includes('dst_district_public_id') && (
          <TableCell tabIndex={0}>{row.dst_district_public_id}</TableCell>
        )}
        {initialHeadcells.includes('dst_name') && (
          <TableCell tabIndex={0}>
            <IconButton
              data-id={row.id}
              aria-label={t('viewDetails')}
              onClick={(e) => handleRowClick(e, row)}
            >
              {expand.open && parseInt(expand.id) === row.id ? (
                <Tooltip title={t('Hide Schools')}>
                  <ExpandLessIcon />
                </Tooltip>
              ) : (
                <Tooltip title={t('Show Schools')}>
                  <ExpandMoreIcon />
                </Tooltip>
              )}
            </IconButton>
            {row.dst_name}
          </TableCell>
        )}
        {initialHeadcells.includes('dst_organization') && (
          <TableCell tabIndex={0}>{row.dst_organization}</TableCell>
        )}
        {initialHeadcells.includes('dst_contact_person') && (
          <TableCell tabIndex={0}>{row.dst_contact_person}</TableCell>
        )}
        {initialHeadcells.includes('dst_type') && (
          <TableCell tabIndex={0}>{t(`reference:${row.dst_type}`)}</TableCell>
        )}
        {initialHeadcells.includes('dst_slug') && (
          <TableCell tabIndex={0}>{t(`reference:${row.dst_slug}`)}</TableCell>
        )}
        {initialHeadcells.includes('created_at') && (
          <TableCell tabIndex={0}>{row.createdTimeLabel}</TableCell>
        )}
        {initialHeadcells.includes('updated_at') && (
          <TableCell tabIndex={0}>{row.updatedTimeLabel}</TableCell>
        )}
        {initialHeadcells.includes('dst_is_active') && (
          <TableCell className={classes.verticalSpaceRemove}>
            {row.dst_is_active ? (
              <Box
                tabIndex={0}
                whiteSpace="nowrap"
                component="span"
                className="label-green"
                id={row.id}
              >
                {t('active')}
              </Box>
            ) : (
              <Box
                tabIndex={0}
                whiteSpace="nowrap"
                component="span"
                className="label-red"
                id={row.id}
              >
                {t('inActive')}
              </Box>
            )}
          </TableCell>
        )}
        {initialHeadcells.includes('actions') && (
          <TableCell className={classes.verticalSpaceRemove}>{viewDetail(row)}</TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={expand.open && parseInt(expand.id) === row.id} timeout="auto" unmountOnExit>
            <CustomTable
              noDataMessage={t('tableNoRecordFoundMessage')}
              order={order}
              orderBy={orderBy}
              setOrder={setOrder}
              setOrderBy={setOrderBy}
              data={row?.schools ? row?.schools : []}
              headCells={allSchoolsHeadCells.filter((cell) =>
                initialSChoolHeadcells.includes(cell.id)
              )}
              dataParameter={dataParameter}
              isSelection={false}
            >
              {row?.schools
                ? row?.schools.map((row) => {
                    return (
                      <TableRow hover data-id={row.id} key={row.id}>
                        {initialSChoolHeadcells.includes('sch_school_public_id') && (
                          <TableCell tabIndex={0}>{row.sch_school_public_id}</TableCell>
                        )}
                        {initialSChoolHeadcells.includes('sch_name') && (
                          <TableCell tabIndex={0}>{row.sch_name}</TableCell>
                        )}
                        {initialSChoolHeadcells.includes('sch_dst_id') && (
                          <TableCell tabIndex={0}>
                            {get(row, 'sch_district.dst_name', '')}
                          </TableCell>
                        )}
                        {initialSChoolHeadcells.includes('sch_school_type') && (
                          <TableCell tabIndex={0}>
                            {t(`reference:${row.sch_school_type}`)}
                          </TableCell>
                        )}
                        {initialSChoolHeadcells.includes('sch_slug') && (
                          <TableCell tabIndex={0}>{row.sch_slug}</TableCell>
                        )}
                        {initialSChoolHeadcells.includes('created_at') && (
                          <TableCell tabIndex={0}>{row.createdTimeLabel}</TableCell>
                        )}
                        {initialSChoolHeadcells.includes('updated_at') && (
                          <TableCell tabIndex={0}>{row.updatedTimeLabel}</TableCell>
                        )}
                        {initialSChoolHeadcells.includes('sch_is_active') && (
                          <TableCell className={classes.verticalSpaceRemove}>
                            {status(row)}
                          </TableCell>
                        )}
                        {initialSChoolHeadcells.includes('actions') && (
                          <TableCell className={classes.verticalSpaceRemove}>
                            {viewDetail(row)}
                          </TableCell>
                        )}
                      </TableRow>
                    )
                  })
                : null}
            </CustomTable>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
Row.propTypes = {
  allHeadCells: PropTypes.array,
  initialHeadcells: PropTypes.array,
  initialSChoolHeadcells: PropTypes.array,
  setHeadcells: PropTypes.func,
  onChangePage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  districts: PropTypes.array,
  pageDetails: PropTypes.object,
  filter: PropTypes.object,
  setFilterValue: PropTypes.func,
  onFilterReset: PropTypes.func,
  masterData: PropTypes.object,
  onApplyFilter: PropTypes.func,
  onSearchEnter: PropTypes.func,
  fetchDistricts: PropTypes.func,
  fetchSchools: PropTypes.func,
  schools: PropTypes.array,
  setSchools: PropTypes.func,
  allSchoolsHeadCells: PropTypes.array,
  row: PropTypes.array,
  dataParameter: PropTypes.array,
}

Row.defaultProps = {
  allHeadCells: [],
  allSchoolsHeadCells: [],
  initialHeadcells: [],
  setHeadcells: () => {},
  onChangePage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  districts: [],
  pageDetails: {},
  filter: {},
  setFilterValue: () => {},
  onFilterReset: () => {},
  masterData: {},
  onApplyFilter: () => {},
  onSearchEnter: () => {},
  fetchDistricts: () => {},
  fetchSchools: () => {},
  schools: [],
  setSchools: () => {},
  initialSChoolHeadcells: [],
  dataParameter: [],
  row: [],
}
function Districts({
  allHeadCells,
  initialHeadcells,
  setHeadcells,
  onChangePage,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  districts,
  pageDetails,
  filter,
  setFilterValue,
  onFilterReset,
  masterData,
  onApplyFilter,
  onSearchEnter,
  fetchDistricts,
  schools,
  fetchSchools,
  setSchools,
  allSchoolsHeadCells,
  initialSChoolHeadcells,
}) {
  const { t } = useTranslation()
  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbInstitute'),
      href: ROUTES.DISTRICTINSTITUTE,
    },
    {
      title: t('breadcrumbInstituteDistricts'),
      href: '',
    },
  ]
  const dataParameter = 'id'
  const [settingModal, setSettingModal] = React.useState(false)

  const toggleSettingModal = function () {
    setSettingModal(!settingModal)
  }

  const ButtonEnhanced = withRedirect(Button)
  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs="auto">
            <Typography tabIndex={0} component="h4" align="left" variant="h5" color="textPrimary">
              <Box component="span" fontWeight="700">
                {t('allDistricts')}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs="auto">
            <ButtonEnhanced
              className="text-transform-none"
              size="large"
              variant="contained"
              disableElevation
              color="primary"
              startIcon={<Plus />}
              to={ROUTES.ADDDISTRICTINSTITUTE}
            >
              {t('addDistrict')}
            </ButtonEnhanced>
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
                  name="q"
                  variant="outlined"
                  fullWidth
                  size="small"
                  id="q"
                  autoComplete="search"
                  placeholder={t('fields:districtSearch')}
                  value={filter.q}
                  onChange={setFilterValue}
                  onKeyDown={onSearchEnter}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" tabIndex={1}>
                        <IconButton
                          aria-label="Press enter to search"
                          onClick={() => fetchDistricts()}
                        >
                          <Search className="icon-color-light rotate90" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm="auto">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={9} sm="auto">
                    <AccordionSummary
                      aria-controls="user-filter-content"
                      id="user-filter-header"
                      className="custom-filter-button"
                      aria-expanded={true}
                      aria-label={t('filters')}
                      tabIndex={1}
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
                  <Grid item xs={3} sm="auto">
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
                  <Grid item xs={12} sm={6} md="auto">
                    <SelectFilter
                      name="type"
                      filter={filter}
                      setFilterValue={setFilterValue}
                      label={t('fields:districtType') + ':'}
                      labelFallback={t('fields:districtType')}
                      optionId="key"
                      optionName="type"
                      options={masterData.district_type.map((item) => ({
                        type: t(`reference:${item}`),
                        key: `${item}`,
                      }))}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md="auto">
                    <SelectFilter
                      name="isActive"
                      filter={filter}
                      setFilterValue={setFilterValue}
                      label={t('fields:status') + ':'}
                      labelFallback={t('fields:status')}
                      optionId="name"
                      optionName="name"
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
                  <Grid item xs={12} sm={6} md="auto">
                    <Box
                      display="flex"
                      justifyContent={{
                        xs: 'flex-start',
                        sm: 'flex-start',
                        md: 'flex-end',
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
                            filter.type ||
                            filter.isActive ||
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
        </Box>

        <CustomTable
          noDataMessage={t('tableNoRecordFoundMessage')}
          order={order}
          orderBy={orderBy}
          setOrder={setOrder}
          setOrderBy={setOrderBy}
          data={districts}
          headCells={allHeadCells.filter((cell) => initialHeadcells.includes(cell.id))}
          dataParameter={dataParameter}
          isSelection={false}
        >
          {districts.map((row) => {
            return (
              <Row
                key={row.id}
                row={row}
                initialHeadcells={initialHeadcells}
                orderBy={orderBy}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
                schools={schools}
                allSchoolsHeadCells={allSchoolsHeadCells}
                initialSChoolHeadcells={initialSChoolHeadcells}
                dataParameter={dataParameter}
                setSchools={setSchools}
                fetchSchools={fetchSchools}
                order={order}
              />
            )
          })}
        </CustomTable>

        <Box
          py={2}
          justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
          flexDirection={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          display="flex"
          px={2}
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
              Showing {districts.length} rows out of {pageDetails.total}
            </Typography>
          </Box>
        </Box>
      </Paper>
      <UserSetting
        allHeadCells={allHeadCells}
        allSchoolsHeadCells={allSchoolsHeadCells}
        initialHeadcells={initialHeadcells}
        setHeadcells={setHeadcells}
        open={settingModal}
        onClose={toggleSettingModal}
      />
    </>
  )
}
Districts.propTypes = {
  allHeadCells: PropTypes.array,
  initialHeadcells: PropTypes.array,
  initialSChoolHeadcells: PropTypes.array,
  setHeadcells: PropTypes.func,
  onChangePage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  districts: PropTypes.array,
  pageDetails: PropTypes.object,
  filter: PropTypes.object,
  setFilterValue: PropTypes.func,
  onFilterReset: PropTypes.func,
  masterData: PropTypes.object,
  onApplyFilter: PropTypes.func,
  onSearchEnter: PropTypes.func,
  fetchDistricts: PropTypes.func,
  fetchSchools: PropTypes.func,
  schools: PropTypes.array,
  setSchools: PropTypes.func,
  allSchoolsHeadCells: PropTypes.array,
}

Districts.defaultProps = {
  allHeadCells: [],
  allSchoolsHeadCells: [],
  initialHeadcells: [],
  setHeadcells: () => {},
  onChangePage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  districts: [],
  pageDetails: {},
  filter: {},
  setFilterValue: () => {},
  onFilterReset: () => {},
  masterData: {},
  onApplyFilter: () => {},
  onSearchEnter: () => {},
  fetchDistricts: () => {},
  fetchSchools: () => {},
  schools: [],
  setSchools: () => {},
  initialSChoolHeadcells: [],
}

export default Districts
