import {
  Box,
  Button,
  Chip,
  ClickAwayListener,
  Grid,
  Hidden,
  IconButton,
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
import { Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { ArrowRight, ChevronDown, Eye, Sliders } from 'react-feather'
import { useTranslation } from 'react-i18next'
import Fade from 'react-reveal/Fade'

import { ROUTES } from '../../../../helpers/constants'
import { auditActions } from '../../../../helpers/stub'
import withRedirect from '../../../../hocs/RedirectHOC'
import CustomTable from '../../../table/CustomTable'
import UserSetting from '../../../table/TableSetting'
import useStyles from '../Settings.Style'
import { makeFakeEvent } from './../../../../helpers/utils'
import Breadcrumb from './../../../breadcrumbs/Breadcrumbs'
import DateRangeFilter from './../../../filters/DateRange'
import SelectFilter from './../../../filters/Select'
function Audit({
  allHeadCells,
  initialHeadcells,
  setHeadcells,
  pageDetails,
  auditList,
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
  fetchSchool,
  onApplyFilter,
}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const districtCode = useRef('')
  const [selectService, setSelectService] = React.useState(false)
  const [selectUserName, setSelectUserName] = React.useState(false)
  const [selectURN, setSelectURN] = React.useState(false)
  const [selectEventCode, setSelectEventCode] = React.useState(false)
  const dataParameter = 'id'
  const [settingModal, setSettingModal] = React.useState(false)
  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbSettings'),
      href: ROUTES.AUDIT,
    },
    {
      title: t('breadcrumbAudit'),
      href: '',
    },
  ]

  const toggleSettingModal = function () {
    setSettingModal(!settingModal)
  }
  const viewDetail = (row) => {
    const IconButtonEnhanced = withRedirect(IconButton)
    return (
      <>
        <IconButtonEnhanced
          data-id={row.id}
          color="primary"
          to={`${ROUTES.AUDITDETAILS}/${row.id}`}
          aria-label={t('viewDetail')}
        >
          <Tooltip title={t('viewDetail')}>
            <Eye width="16px" height="16px" />
          </Tooltip>
        </IconButtonEnhanced>
      </>
    )
  }

  const selectSelectService = () => {
    setSelectService((prev) => !prev)
  }

  const handleSelectService = () => {
    setSelectService(false)
  }

  const selectSelectUserName = () => {
    setSelectUserName((prev) => !prev)
  }

  const handleSelectUserName = () => {
    setSelectUserName(false)
  }
  const selectSelectURN = () => {
    setSelectURN((prev) => !prev)
  }

  const handleSelectURN = () => {
    setSelectURN(false)
  }
  const selectSelectEventCode = () => {
    setSelectEventCode((prev) => !prev)
  }
  const handleSelectEventCode = () => {
    setSelectEventCode(false)
  }

  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="700">
                {t('audit')}
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Paper rounded={true} elevation={1} className="paper-round">
        <Formik>
          {() => {
            if (filter.districtId !== districtCode.current) {
              fetchSchool(filter.districtId)
              districtCode.current = filter.districtId
            }
            return (
              <Form className={classes.form} noValidate autoComplete="off">
                <Box px={2} py={2} width="100%">
                  <Accordion defaultExpanded elevation={0} className="custom-accordion">
                    <Hidden smUp>
                      <AccordionSummary
                        aria-controls="Templates-filter-content"
                        id="Templates-filter-header"
                        className="custom-filter-button"
                        aria-expanded={true}
                      >
                        <Box display="flex" alignItems="center">
                          <Sliders className="rotate90" />
                          <Box
                            ml={1}
                            component="span"
                            fontWeight="fontWeightMedium"
                            fontSize="16px"
                            tabIndex={0}
                          >
                            {t('filters')}
                          </Box>
                        </Box>
                        <ArrowDropDownIcon className="arrow-black" />
                      </AccordionSummary>
                    </Hidden>
                    <AccordionDetails>
                      <Box
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
                              name="school_name"
                              filter={filter}
                              setFilterValue={setFilterValue}
                              label={t('fields:school') + ':'}
                              labelFallback={t('fields:selectSchool')}
                              optionId="sch_name"
                              optionName="sch_name"
                              options={schools}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md="auto">
                            <SelectFilter
                              name="f_action"
                              filter={filter}
                              setFilterValue={setFilterValue}
                              label={t('fields:action') + ':'}
                              labelFallback={t('fields:action')}
                              chipLabel={filter.f_action}
                              options={auditActions}
                              optionId="id"
                              optionName="name"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md="auto">
                            <ClickAwayListener
                              mouseEvent="onMouseDown"
                              touchEvent="onTouchStart"
                              onClickAway={handleSelectURN}
                            >
                              <Box position="relative">
                                <Button
                                  className="filter-select-button"
                                  aria-controls="select-role-menu"
                                  aria-haspopup="true"
                                  endIcon={<ChevronDown className="color-blue-grey" />}
                                  onClick={selectSelectURN}
                                  variant="text"
                                  fullWidth
                                >
                                  {filter.f_urn ? (
                                    <Box
                                      display="flex"
                                      flexDirection="row"
                                      alignItems="center"
                                      justifyContent="flex-start"
                                    >
                                      <Box mr={1}>{t('fields:urn') + ':'}</Box>
                                      <Chip
                                        size="small"
                                        onDelete={() => {
                                          setFilterValue(
                                            makeFakeEvent({
                                              name: 'f_urn',
                                              value: '',
                                            })
                                          )
                                        }}
                                        label={filter.f_urn}
                                        variant="outlined"
                                        className="custom-chip"
                                      />
                                    </Box>
                                  ) : (
                                    <>{t('urn')}</>
                                  )}
                                </Button>

                                <Box
                                  display={selectURN ? 'flex' : 'none'}
                                  className="filter-dropdown auto-search"
                                  minWidth={{ xs: '100%', sm: '150px' }}
                                >
                                  <Fade top>
                                    <Field
                                      className="custom-input-filter input-search"
                                      as={TextField}
                                      variant="outlined"
                                      fullWidth
                                      size="small"
                                      id="f_urn"
                                      name="f_urn"
                                      value={filter.f_urn}
                                      onChange={setFilterValue}
                                      autoComplete="search"
                                      placeholder={t('fields:urn')}
                                    />
                                  </Fade>
                                </Box>
                              </Box>
                            </ClickAwayListener>
                          </Grid>
                          <Grid item xs={12} sm={6} md="auto">
                            <ClickAwayListener
                              mouseEvent="onMouseDown"
                              touchEvent="onTouchStart"
                              onClickAway={handleSelectEventCode}
                            >
                              <Box position="relative">
                                <Button
                                  className="filter-select-button"
                                  aria-controls="select-role-menu"
                                  aria-haspopup="true"
                                  endIcon={<ChevronDown className="color-blue-grey" />}
                                  onClick={selectSelectEventCode}
                                  variant="text"
                                  fullWidth
                                >
                                  {filter.f_eventcode ? (
                                    <Box
                                      display="flex"
                                      flexDirection="row"
                                      alignItems="center"
                                      justifyContent="flex-start"
                                    >
                                      <Box mr={1}>{t('fields:eventCode') + ':'}</Box>
                                      <Chip
                                        size="small"
                                        onDelete={() => {
                                          setFilterValue(
                                            makeFakeEvent({
                                              name: 'f_eventcode',
                                              value: '',
                                            })
                                          )
                                        }}
                                        label={filter.f_eventcode}
                                        variant="outlined"
                                        className="custom-chip"
                                      />
                                    </Box>
                                  ) : (
                                    <>{t('fields:eventCode')}</>
                                  )}
                                </Button>

                                <Box
                                  display={selectEventCode ? 'flex' : 'none'}
                                  className="filter-dropdown auto-search"
                                  minWidth={{ xs: '100%', sm: '150px' }}
                                >
                                  <Fade top>
                                    <Field
                                      className="custom-input-filter input-search"
                                      id="f_eventcode"
                                      name="f_eventcode"
                                      as={TextField}
                                      variant="outlined"
                                      fullWidth
                                      size="small"
                                      autoComplete="eventCode"
                                      value={filter.f_eventcode}
                                      onChange={setFilterValue}
                                      placeholder={t('fields:eventCode')}
                                    />
                                  </Fade>
                                </Box>
                              </Box>
                            </ClickAwayListener>
                          </Grid>
                          <Grid item xs={12} sm={6} md="auto">
                            <ClickAwayListener
                              mouseEvent="onMouseDown"
                              touchEvent="onTouchStart"
                              onClickAway={handleSelectUserName}
                            >
                              <Box position="relative">
                                <Button
                                  className="filter-select-button"
                                  aria-controls="select-role-menu"
                                  aria-haspopup="true"
                                  endIcon={<ChevronDown className="color-blue-grey" />}
                                  onClick={selectSelectUserName}
                                  variant="text"
                                  fullWidth
                                >
                                  {filter.f_principal ? (
                                    <Box
                                      display="flex"
                                      flexDirection="row"
                                      alignItems="center"
                                      justifyContent="flex-start"
                                    >
                                      <Box mr={1}>{t('fields:username') + ':'}</Box>
                                      <Chip
                                        size="small"
                                        onDelete={() => {
                                          setFilterValue(
                                            makeFakeEvent({
                                              name: 'f_principal',
                                              value: '',
                                            })
                                          )
                                        }}
                                        label={filter.f_principal}
                                        variant="outlined"
                                        className="custom-chip"
                                      />
                                    </Box>
                                  ) : (
                                    <>{t('userName')}</>
                                  )}
                                </Button>

                                <Box
                                  display={selectUserName ? 'flex' : 'none'}
                                  className="filter-dropdown auto-search"
                                  minWidth={{ xs: '100%', sm: '150px' }}
                                >
                                  <Fade top>
                                    <Field
                                      className="custom-input-filter input-search"
                                      as={TextField}
                                      variant="outlined"
                                      fullWidth
                                      size="small"
                                      id="f_principal"
                                      name="f_principal"
                                      value={filter.f_principal}
                                      onChange={setFilterValue}
                                      autoComplete="userName"
                                      placeholder={t('fields:userName')}
                                    />
                                  </Fade>
                                </Box>
                              </Box>
                            </ClickAwayListener>
                          </Grid>
                          <Grid item xs={12} sm={6} md="auto">
                            <ClickAwayListener
                              mouseEvent="onMouseDown"
                              touchEvent="onTouchStart"
                              onClickAway={handleSelectService}
                            >
                              <Box position="relative">
                                <Button
                                  className="filter-select-button"
                                  aria-controls="select-role-menu"
                                  aria-haspopup="true"
                                  endIcon={<ChevronDown className="color-blue-grey" />}
                                  onClick={selectSelectService}
                                  variant="text"
                                  fullWidth
                                >
                                  {filter.f_service ? (
                                    <Box
                                      display="flex"
                                      flexDirection="row"
                                      alignItems="center"
                                      justifyContent="flex-start"
                                    >
                                      <Box mr={1}>{t('fields:service') + ':'}</Box>
                                      <Chip
                                        size="small"
                                        onDelete={() => {
                                          setFilterValue(
                                            makeFakeEvent({
                                              name: 'f_service',
                                              value: '',
                                            })
                                          )
                                        }}
                                        label={filter.f_service}
                                        variant="outlined"
                                        className="custom-chip"
                                      />
                                    </Box>
                                  ) : (
                                    <>{t('service')}</>
                                  )}
                                </Button>

                                <Box
                                  display={selectService ? 'flex' : 'none'}
                                  className="filter-dropdown auto-search"
                                  minWidth={{ xs: '100%', sm: '150px' }}
                                >
                                  <Fade top>
                                    <Field
                                      className="custom-input-filter input-search"
                                      as={TextField}
                                      variant="outlined"
                                      fullWidth
                                      size="small"
                                      id="f_service"
                                      name="f_service"
                                      value={filter.f_service}
                                      onChange={setFilterValue}
                                      autoComplete="service"
                                      placeholder={t('fields:service')}
                                    />
                                  </Fade>
                                </Box>
                              </Box>
                            </ClickAwayListener>
                          </Grid>
                          <Grid item xs={12} sm="auto">
                            <DateRangeFilter
                              fromDateName="f_startdate"
                              toDateName="f_enddate"
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
              </Form>
            )
          }}
        </Formik>

        <CustomTable
          noDataMessage={t('tableNoRecordFoundMessage')}
          order={order}
          orderBy={orderBy}
          setOrder={setOrder}
          setOrderBy={setOrderBy}
          data={auditList}
          headCells={allHeadCells.filter((cell) => initialHeadcells.includes(cell.id))}
          dataParameter={dataParameter}
          isSelection={false}
        >
          {auditList.map((row) => {
            return (
              <TableRow hover data-id={row.id} key={row.id}>
                {initialHeadcells.includes('event_code') && (
                  <TableCell tabIndex={0}>{row.event_code}</TableCell>
                )}
                {initialHeadcells.includes('triggered_by') && (
                  <TableCell tabIndex={0}>
                    <Tooltip title={row.principal}>
                      <Box className="text-ellipsis">{row.principal}</Box>
                    </Tooltip>
                  </TableCell>
                )}
                {initialHeadcells.includes('time_log') && (
                  <TableCell tabIndex={0}>{row.update_time}</TableCell>
                )}
                {initialHeadcells.includes('service') && (
                  <TableCell tabIndex={0}>{row.service_code}</TableCell>
                )}
                {initialHeadcells.includes('description') && (
                  <TableCell tabIndex={0}>
                    <Tooltip title={row.description}>
                      <Box className="block-ellipsis">{row.description}</Box>
                    </Tooltip>
                  </TableCell>
                )}
                {initialHeadcells.includes('actions') && (
                  <TableCell className={classes.verticalSpaceRemove}>{viewDetail(row)}</TableCell>
                )}
              </TableRow>
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
            <Typography component="p" variant="body2" tabIndex={0}>
              Showing {auditList.length} rows out of {pageDetails.total}
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
Audit.propTypes = {
  allHeadCells: PropTypes.array,
  initialHeadcells: PropTypes.array,
  setHeadcells: PropTypes.func,
  pageDetails: PropTypes.object,
  auditList: PropTypes.array,
  onChangePage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  filter: PropTypes.object,
  districts: PropTypes.array,
  schools: PropTypes.array,
  setFilterValue: PropTypes.func,
  onFilterReset: PropTypes.func,
  onApplyFilter: PropTypes.func,
  onSearchEnter: PropTypes.func,
  fetchSchool: PropTypes.func,
}

Audit.defaultProps = {
  allHeadCells: [],
  initialHeadcells: [],
  setHeadcells: () => {},
  pageDetails: {},
  auditList: [],
  onChangePage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  filter: {},
  districts: [],
  schools: [],
  setFilterValue: () => {},
  onFilterReset: () => {},
  onApplyFilter: () => {},
  onSearchEnter: () => {},
  fetchSchool: () => {},
}

export default Audit
