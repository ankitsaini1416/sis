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
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Pagination from '@material-ui/lab/Pagination'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import {
  ArrowRight,
  Check,
  Download,
  Edit2,
  Eye,
  Search,
  Settings,
  Sliders,
  X,
} from 'react-feather'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '../../../helpers/constants'
import { REGISTERATION_STATUS } from '../../../helpers/constants'
import { approval_status } from '../../../helpers/stub'
import { exportToCSV, get, isEmpty } from '../../../helpers/utils'
import withRedirect from '../../../hocs/RedirectHOC'
import Breadcrumb from '../../breadcrumbs/Breadcrumbs'
import DateRangeFilter from '../../filters/DateRange'
import SelectFilter from '../../filters/Select'
import CustomTable from '../../table/CustomTable'
import UserSetting from '../../table/TableSetting'
import useStyles from './Application.Style'

function AllApplication({
  allHeadCells,
  initialHeadcells,
  setHeadcells,
  pageDetails,
  registerList,
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
  editAction,
  onSearchEnter,
}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const dataParameter = 'id'

  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbApplications'),
      href: ROUTES.REGISTERATIONS,
    },
  ]

  const [checkState, setCheckState] = React.useState([])
  const [settingModal, setSettingModal] = React.useState(false)

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
    const mappedRequests = registerList
      .filter((item) => checkState.includes(item.id.toString()))
      .map((row) => ({
        [t('email')]: row.email,
        [t('firstName')]: row.first_name,
        [t('lastName')]: row.last_name,
        [t('dateOfApplication')]: row.createdDate,
        [t('age')]: row.age,
        [t('status')]: status(row),
      }))
    exportToCSV(mappedRequests, t('allApplications'))
  }

  const toggleSettingModal = function () {
    setSettingModal(!settingModal)
  }

  const actionButtons = (row) => {
    const IconButtonEnhanced = withRedirect(IconButton)
    const approval_status = get(row, 'attributes.approval_status[0]', '')
    return (
      <Box whiteSpace="nowrap">
        {/*Accept reject button will show in case of pending status*/}
        <Tooltip title={t('accept')}>
          <IconButton
            aria-label={t('accept')}
            edge="start"
            data-id={row.id}
            data-action={REGISTERATION_STATUS.APPROVED}
            className={clsx({
              'icon-button-gray': approval_status === REGISTERATION_STATUS.APPROVED,
              'icon-button-green':
                approval_status === REGISTERATION_STATUS.PENDING ||
                approval_status === REGISTERATION_STATUS.DENIED,
              // disabled: approval_status === REGISTERATION_STATUS.APPROVED,
            })}
            onClick={editAction}
            disabled={
              approval_status === REGISTERATION_STATUS.PENDING
                ? false
                : approval_status === REGISTERATION_STATUS.APPROVED
                ? true
                : false
            }
          >
            <Check width="16px" height="16px" />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('reject')}>
          <IconButton
            aria-label={t('reject')}
            data-id={row.id}
            data-action={REGISTERATION_STATUS.DENIED}
            onClick={editAction}
            disabled={
              approval_status === REGISTERATION_STATUS.PENDING
                ? false
                : approval_status === REGISTERATION_STATUS.DENIED
                ? true
                : false
            }
            className={clsx({
              'icon-button-red':
                approval_status === REGISTERATION_STATUS.PENDING ||
                approval_status === REGISTERATION_STATUS.APPROVED,
              'icon-button-gray': approval_status === REGISTERATION_STATUS.DENIED,
            })}
          >
            <X width="16px" height="16px" />
          </IconButton>
        </Tooltip>

        <IconButtonEnhanced
          aria-label={t('viewDetail')}
          data-id={row.id}
          color="primary"
          to={`${ROUTES.VIEWAPPLICATIONDETAILS}/${row.attributes?.school_id}/${row.id}`}
        >
          <Tooltip title={t('viewDetail')}>
            <Eye width="16px" height="16px" />
          </Tooltip>
        </IconButtonEnhanced>

        <IconButtonEnhanced
          aria-label={t('editDetail')}
          edge="end"
          data-id={row.id}
          color="primary"
          to={`${ROUTES.VIEWAPPLICATIONDETAILS}/${row.attributes?.school_id}/${row.id}`}
          state={{ showEditDetail: true }}
        >
          <Tooltip title={t('editDetail')}>
            <Edit2 width="16px" height="16px" />
          </Tooltip>
        </IconButtonEnhanced>
      </Box>
    )
  }

  const status = (row) => {
    const approval_status = get(row, 'attributes.approval_status[0]', '')
    if (approval_status === REGISTERATION_STATUS.DENIED) {
      return t('denied')
    } else if (approval_status === REGISTERATION_STATUS.APPROVED || approval_status === '1') {
      return t('approved')
    } else {
      return (
        <Box className="label-info" component="span">
          {t('inProcess')}
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
            <Typography tabIndex={0} component="h4" align="left" variant="h5" color="textPrimary">
              <Box component="span" fontWeight="700">
                {t('allApplications')}
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Paper rounded={true} elevation={1} className="paper-round">
        <Box px={2} py={2} width="100%">
          <Accordion defaultExpanded elevation={0} className="custom-accordion">
            <Grid container spacing={2} justify="space-between">
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <TextField
                  className="custom-input-field input-search"
                  name="q"
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  size="small"
                  id="q"
                  autoComplete="q"
                  value={filter.q}
                  onKeyDown={onSearchEnter}
                  onChange={setFilterValue}
                  placeholder={t('fields:searchByEmailName')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Press enter to search"
                          onClick={() => onApplyFilter()}
                        >
                          <Search className="icon-color-light rotate90" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md="auto">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm="auto">
                    <AccordionSummary
                      aria-controls="AllApplication-filter-content"
                      id="AllApplication-filter-header"
                      className="custom-filter-button"
                      aria-expanded={true}
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
                      label={t('fields:selectSchool') + ':'}
                      labelFallback={t('fields:selectSchool')}
                      optionId="sch_realm_id"
                      optionName="sch_name"
                      options={schools}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md="auto">
                    <SelectFilter
                      name="approvalStatus"
                      filter={filter}
                      setFilterValue={setFilterValue}
                      label={t('fields:approval_status') + ':'}
                      labelFallback={t('fields:approval_status')}
                      optionId="name"
                      optionName="value"
                      options={approval_status}
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
                          fullWidth
                        >
                          {t('filter')}
                        </Button>
                      </Box>
                      <Button
                        className="text-transform-none"
                        disableElevation
                        variant="text"
                        color="primary"
                        onClick={() => {
                          onFilterReset()
                        }}
                        disabled={
                          !(
                            filter.q ||
                            filter.schoolId ||
                            filter.districtId ||
                            filter.approvalStatus ||
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
          data={registerList}
          headCells={allHeadCells.filter((cell) => initialHeadcells.includes(cell.id))}
          dataParameter={dataParameter}
          selected={checkState}
          setSelected={onCheck}
          isSelection={registerList.length > 0 ? true : false}
        >
          {registerList.map((row) => {
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
                {initialHeadcells.includes('email') && (
                  <TableCell tabIndex={0}>
                    <Tooltip placement="top" title={row.email}>
                      <Box width="200px" className="text-ellipsis">
                        {row.email}
                      </Box>
                    </Tooltip>
                  </TableCell>
                )}
                {initialHeadcells.includes('first_name') && (
                  <TableCell tabIndex={0}>{row.first_name}</TableCell>
                )}
                {initialHeadcells.includes('last_name') && (
                  <TableCell tabIndex={0}>{row.last_name}</TableCell>
                )}
                {initialHeadcells.includes('birthday') && (
                  <TableCell tabIndex={0}>{row.age}</TableCell>
                )}
                {initialHeadcells.includes('school_name') && (
                  <TableCell tabIndex={0}>{row.school_name}</TableCell>
                )}
                {/* Todo */}
                {/* {initialHeadcells.includes('addresses') && (
                  <TableCell tabIndex={0}>{row.addresses}</TableCell>
                )} */}
                {/* {initialHeadcells.includes('mobile_phone') && (
                  <TableCell tabIndex={0}>
                    {`${row.mobile_phone_prefix}`} {` `} {`${row.mobile_phone}`}
                  </TableCell>
                )} */}
                {/* {initialHeadcells.includes('home_phone') && (
                  <TableCell tabIndex={0}>
                    {`${row.home_phone_prefix}`} {` `} {`${row.home_phone}`}
                  </TableCell>
                )} */}
                {initialHeadcells.includes('date_of_application') && (
                  <TableCell tabIndex={0}>{row.createdDate}</TableCell>
                )}
                {initialHeadcells.includes('status') && (
                  <TableCell>
                    <Box
                      tabIndex={0}
                      component="span"
                      className={clsx({
                        'label-red':
                          row?.attributes?.approval_status[0] === REGISTERATION_STATUS.DENIED,
                        'label-green':
                          row?.attributes?.approval_status[0] === REGISTERATION_STATUS.APPROVED ||
                          row?.attributes?.approval_status[0] === '1',
                        'label-warning':
                          row?.attributes?.approval_status[0] === REGISTERATION_STATUS.INPROCESS,
                      })}
                      id={row.id}
                    >
                      {status(row)}
                    </Box>
                  </TableCell>
                )}
                {initialHeadcells.includes('actions') && (
                  <TableCell className={classes.verticalSpaceRemove}>
                    {actionButtons(row)}
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
                Showing {registerList.length} rows out of {pageDetails.total}
              </Typography>
            </Box>
          </Box>
        ) : null}
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
AllApplication.propTypes = {
  allHeadCells: PropTypes.array,
  initialHeadcells: PropTypes.array,
  setHeadcells: PropTypes.func,
  pageDetails: PropTypes.object,
  registerList: PropTypes.array,
  onChangePage: PropTypes.func,
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
  editAction: PropTypes.func,
  onSearchEnter: PropTypes.func,
}

AllApplication.defaultProps = {
  allHeadCells: [],
  initialHeadcells: [],
  setHeadcells: () => {},
  pageDetails: {},
  registerList: [],
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
  editAction: () => {},
  districts: [],
  onSearchEnter: () => {},
}

export default AllApplication
