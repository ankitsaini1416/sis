import {
  Box,
  Button,
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
// import { withStyles } from '@material-ui/core/styles'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Pagination from '@material-ui/lab/Pagination'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowRight, Eye, Plus, Search, Settings, Sliders, Tool } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '../../../../helpers/constants'
import withRedirect from '../../../../hocs/RedirectHOC'
import CustomTable from '../../../table/CustomTable'
import UserSetting from '../../../table/TableSetting'
import useStyles from '../Organizations.Style'
import { statuses } from './../../../../helpers/stub'
import { get } from './../../../../helpers/utils'
import Breadcrumb from './../../../breadcrumbs/Breadcrumbs'
import DateRangeFilter from './../../../filters/DateRange'
import SelectFilter from './../../../filters/Select'

// const CheckboxWithGreenCheck = withStyles({})(Checkbox)
function Schools({
  allHeadCells,
  initialHeadcells,
  setHeadcells,
  onChangePage,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  districts,
  schools,
  pageDetails,
  filter,
  setFilterValue,
  onFilterReset,
  masterData,
  onApplyFilter,
  onSearchEnter,
  fetchSchools,
}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbOrganizations'),
      href: ROUTES.SCHOOLS,
    },
    {
      title: t('breadcrumbSchool'),
      href: '',
    },
  ]
  const dataParameter = 'id'
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
          to={`${ROUTES.SCHOOLDETAILS}/${row.id}`}
          aria-label={t('viewDetail')}
        >
          <Tooltip title={t('viewDetail')}>
            <Eye width="16px" height="16px" />
          </Tooltip>
        </IconButtonEnhanced>

        <IconButtonEnhanced
          edge="end"
          data-id={row.id}
          color="primary"
          to={`${ROUTES.EDITSCHOOL}/${row.id}`}
          aria-label={t('configureSchool')}
        >
          <Tooltip title={t('configureSchool')}>
            <Tool width="16px" height="16px" />
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
  const ButtonEnhanced = withRedirect(Button)

  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs="auto">
            <Typography tabIndex={0} component="h4" align="left" variant="h5" color="textPrimary">
              <Box component="span" fontWeight="700">
                {t('allSchools')}
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
              to={ROUTES.ADDSCHOOL}
            >
              {t('addSchool')}
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
                  variant="outlined"
                  fullWidth
                  size="small"
                  id="q"
                  name="q"
                  autoComplete="search"
                  placeholder={t('fields:schoolSearch')}
                  value={filter.q}
                  onKeyDown={onSearchEnter}
                  onChange={setFilterValue}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Press enter to search"
                          onClick={() => fetchSchools()}
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
                      name="type"
                      filter={filter}
                      setFilterValue={setFilterValue}
                      label={t('fields:schoolType') + ':'}
                      labelFallback={t('fields:schoolType')}
                      optionId="key"
                      optionName="type"
                      options={masterData.school_type.map((item) => ({
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
                            filter.districtId ||
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
          data={schools}
          headCells={allHeadCells.filter((cell) => initialHeadcells.includes(cell.id))}
          dataParameter={dataParameter}
          isSelection={false}
        >
          {schools.map((row) => {
            return (
              <TableRow hover data-id={row.id} key={row.id}>
                {initialHeadcells.includes('sch_school_public_id') && (
                  <TableCell tabIndex={0}>{row.sch_school_public_id}</TableCell>
                )}
                {initialHeadcells.includes('sch_name') && (
                  <TableCell tabIndex={0}>{row.sch_name}</TableCell>
                )}
                {initialHeadcells.includes('sch_dst_id') && (
                  <TableCell tabIndex={0}>{get(row, 'sch_district.dst_name', '')}</TableCell>
                )}
                {initialHeadcells.includes('sch_school_type') && (
                  <TableCell tabIndex={0}>{t(`reference:${row.sch_school_type}`)}</TableCell>
                )}
                {initialHeadcells.includes('sch_slug') && (
                  <TableCell tabIndex={0}>{row.sch_slug}</TableCell>
                )}
                {initialHeadcells.includes('created_at') && (
                  <TableCell tabIndex={0}>{row.createdTimeLabel}</TableCell>
                )}
                {initialHeadcells.includes('updated_at') && (
                  <TableCell tabIndex={0}>{row.updatedTimeLabel}</TableCell>
                )}
                {initialHeadcells.includes('sch_is_active') && (
                  <TableCell className={classes.verticalSpaceRemove}>{status(row)}</TableCell>
                )}
                {initialHeadcells.includes('actions') && (
                  <TableCell className={classes.verticalSpaceRemove}>{viewDetail(row)}</TableCell>
                )}
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
              Showing {schools.length} rows out of {pageDetails.total}
            </Typography>
          </Box>
        </Box>
      </Paper>
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
Schools.propTypes = {
  allHeadCells: PropTypes.array,
  initialHeadcells: PropTypes.array,
  setHeadcells: PropTypes.func,
  onChangePage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  schools: PropTypes.array,
  pageDetails: PropTypes.object,
  filter: PropTypes.object,
  setFilterValue: PropTypes.func,
  onFilterReset: PropTypes.func,
  masterData: PropTypes.object,
  onApplyFilter: PropTypes.func,
  districts: PropTypes.array,
  onSearchEnter: PropTypes.func,
  fetchSchools: PropTypes.func,
}

Schools.defaultProps = {
  allHeadCells: [],
  initialHeadcells: [],
  setHeadcells: () => {},
  onChangePage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  schools: [],
  pageDetails: {},
  filter: {},
  setFilterValue: () => {},
  onFilterReset: () => {},
  masterData: {},
  onApplyFilter: () => {},
  districts: [],
  onSearchEnter: () => {},
  fetchSchools: () => {},
}

export default Schools
