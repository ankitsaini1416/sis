import {
  Box,
  Button,
  Checkbox,
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
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowRight, ChevronDown, Edit2, Edit3, Plus, Sliders } from 'react-feather'
import { useTranslation } from 'react-i18next'
import Fade from 'react-reveal/Fade'

import { ROUTES } from '../../../../helpers/constants'
import { serviceCode } from '../../../../helpers/stub'
import { isEmpty, makeFakeEvent } from '../../../../helpers/utils'
import withRedirect from '../../../../hocs/RedirectHOC'
import ConfirmBox from '../../../common/ConfirmBox'
import SelectFilter from '../../../filters/Select'
import CustomTable from '../../../table/CustomTable'
import TemplatesSetting from '../../../table/TableSetting'
import useStyles from '../Settings.Style'
import Breadcrumb from './../../../breadcrumbs/Breadcrumbs'

function Templates({
  initialHeadcells,
  allHeadCells,
  setHeadcells,
  onChangePage,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  pageData,
  pageDetails,
  checkState,
  onCheck,
  filter,
  setFilterValue,
  onFilterReset,
  onApplyFilter,
  deleteForms,
  openDeletePopup,
  toggleDeletePopup,
  districts,
  schools,
}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const [templateFileName, setTemplateFileName] = React.useState(false)
  const [templateName, setTemplateName] = React.useState(false)
  const [containsText, setContainsText] = React.useState(false)
  const dataParameter = 'id'
  const [settingModal, setSettingModal] = React.useState(false)
  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbSettings'),
      href: ROUTES.TEMPLATE,
    },
    {
      title: t('breadcrumbTemplates'),
      href: '',
    },
  ]

  const toggleSettingModal = function () {
    setSettingModal(!settingModal)
  }

  const editTemplate = (row) => {
    const IconButtonEnhanced = withRedirect(IconButton)
    return (
      <IconButtonEnhanced
        data-id={row.id}
        color="primary"
        to={`${ROUTES.EDITTEMPLATE}/${row.id}`}
        aria-label={t('editTemplate')}
      >
        <Tooltip title={t('editTemplate')}>
          <Edit2 width="16px" height="16px" />
        </Tooltip>
      </IconButtonEnhanced>
    )
  }

  const editTemplateActions = (row) => {
    const IconButtonEnhanced = withRedirect(IconButton)
    return (
      <Box whiteSpace="nowrap">
        <IconButtonEnhanced
          data-id={row.id}
          color="primary"
          to={`${ROUTES.RENAMETEMPLATE}/${row.id}`}
          aria-label={t('renameTemplate')}
        >
          <Tooltip title={t('renameTemplate')}>
            <Edit3 width="16px" height="16px" />
          </Tooltip>
        </IconButtonEnhanced>
      </Box>
    )
  }
  const selectTemplateName = () => {
    setTemplateName((prev) => !prev)
  }
  const handleTemplateName = () => {
    setTemplateName(false)
  }

  const selectContainsText = () => {
    setContainsText((prev) => !prev)
  }

  const handleContainsText = () => {
    setContainsText(false)
  }

  const selectTemplateFileName = () => {
    setTemplateFileName((prev) => !prev)
  }
  const handleTemplateFileName = () => {
    setTemplateFileName(false)
  }

  const ButtonEnhanced = withRedirect(Button)

  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="700">
                {t('templates')}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Box
              className={classes.buttonAction}
              display="flex"
              alignItems="center"
              justifyContent={{
                xs: 'flex-start',
                sm: 'flex-start',
                md: 'space-between',
              }}
              flexDirection={{ xs: 'column-reverse', sm: 'row' }}
            >
              <ButtonEnhanced
                className="text-transform-none"
                size="large"
                variant="contained"
                disableElevation
                color="primary"
                fullWidth
                startIcon={<Plus />}
                to={ROUTES.ADDTEMPLATE}
              >
                {t('addTemplate')}
              </ButtonEnhanced>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Paper rounded={true} elevation={1} className="paper-round">
        <Box px={2} py={2} width="100%">
          <Grid container spacing={2} alignItems="flex-start" justify="space-between">
            <Grid item xs={12} md={12}>
              <Hidden smDown>
                <Typography
                  component="h4"
                  align="left"
                  variant="h6"
                  color="textPrimary"
                  tabIndex={0}
                >
                  <Box component="span" fontWeight="fontWeightMedium" fontSize="16px">
                    {t('filters')}
                  </Box>
                </Typography>
              </Hidden>
            </Grid>

            <Grid item xs={12} md={10}>
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
                    mt={{ xs: 2, sm: 0 }}
                  >
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
                          name="f_collection"
                          filter={filter}
                          setFilterValue={setFilterValue}
                          label={t('fields:selectSchool') + ':'}
                          labelFallback={t('fields:selectSchool')}
                          options={schools}
                          optionId="sch_school_public_id"
                          optionName="sch_name"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md="auto">
                        <Box mb={{ xs: 2, lg: 0 }}>
                          <SelectFilter
                            name="serviceCode"
                            filter={filter}
                            setFilterValue={setFilterValue}
                            label={t('fields:serviceCode') + ':'}
                            labelFallback={t('fields:serviceCode')}
                            chipLabel={filter.serviceCode}
                            options={serviceCode}
                            optionId="value"
                            optionName="name"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md="auto">
                        <ClickAwayListener
                          mouseEvent="onMouseDown"
                          touchEvent="onTouchStart"
                          onClickAway={handleTemplateFileName}
                        >
                          <Box position="relative">
                            <Button
                              className="filter-select-button"
                              aria-controls="select-role-menu"
                              aria-haspopup="true"
                              endIcon={<ChevronDown className="color-blue-grey" />}
                              onClick={selectTemplateFileName}
                              variant="text"
                              fullWidth
                            >
                              {filter.f_filename ? (
                                <Box
                                  display="flex"
                                  flexDirection="row"
                                  alignItems="center"
                                  justifyContent="flex-start"
                                >
                                  <Box mr={1}>{t('fields:templateFileName') + ':'}</Box>
                                  <Chip
                                    size="small"
                                    onDelete={() => {
                                      setFilterValue(
                                        makeFakeEvent({
                                          name: 'f_filename',
                                          value: '',
                                        })
                                      )
                                    }}
                                    label={filter.f_filename}
                                    variant="outlined"
                                    className="custom-chip"
                                  />
                                </Box>
                              ) : (
                                <>{t('templateFileName')}</>
                              )}
                            </Button>

                            <Box
                              display={templateFileName ? 'flex' : 'none'}
                              className="filter-dropdown auto-search"
                              minWidth={{ xs: '100%', sm: '150px' }}
                            >
                              <Fade top>
                                <TextField
                                  className="custom-input-filter input-search"
                                  variant="outlined"
                                  fullWidth
                                  size="small"
                                  id="f_filename"
                                  name="f_filename"
                                  value={filter.f_filename}
                                  onChange={setFilterValue}
                                  autoComplete="fileName"
                                  placeholder={t('fields:fileName')}
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
                          onClickAway={handleTemplateName}
                        >
                          <Box position="relative">
                            <Button
                              className="filter-select-button"
                              aria-controls="select-role-menu"
                              aria-haspopup="true"
                              endIcon={<ChevronDown className="color-blue-grey" />}
                              onClick={selectTemplateName}
                              variant="text"
                              fullWidth
                            >
                              {filter.f_nickname ? (
                                <Box
                                  display="flex"
                                  flexDirection="row"
                                  alignItems="center"
                                  justifyContent="flex-start"
                                >
                                  <Box mr={1}>{t('fields:templateName') + ':'}</Box>
                                  <Chip
                                    size="small"
                                    onDelete={() => {
                                      setFilterValue(
                                        makeFakeEvent({
                                          name: 'f_nickname',
                                          value: '',
                                        })
                                      )
                                    }}
                                    label={filter.f_nickname}
                                    variant="outlined"
                                    className="custom-chip"
                                  />
                                </Box>
                              ) : (
                                <>{t('templateName')}</>
                              )}
                            </Button>

                            <Box
                              display={templateName ? 'flex' : 'none'}
                              className="filter-dropdown auto-search"
                              minWidth={{ xs: '100%', sm: '150px' }}
                            >
                              <Fade top>
                                <TextField
                                  className="custom-input-filter input-search"
                                  variant="outlined"
                                  fullWidth
                                  size="small"
                                  id="f_nickname"
                                  name="f_nickname"
                                  value={filter.f_nickname}
                                  onChange={setFilterValue}
                                  autoComplete="nickName"
                                  placeholder={t('fields:nickName')}
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
                          onClickAway={handleContainsText}
                        >
                          <Box position="relative">
                            <Button
                              className="filter-select-button"
                              aria-controls="select-role-menu"
                              aria-haspopup="true"
                              endIcon={<ChevronDown className="color-blue-grey" />}
                              onClick={selectContainsText}
                              variant="text"
                              fullWidth
                            >
                              {filter.f_content ? (
                                <Box
                                  display="flex"
                                  flexDirection="row"
                                  alignItems="center"
                                  justifyContent="flex-start"
                                >
                                  <Box mr={1}>{t('fields:containsText') + ':'}</Box>
                                  <Chip
                                    size="small"
                                    onDelete={() => {
                                      setFilterValue(
                                        makeFakeEvent({
                                          name: 'f_content',
                                          value: '',
                                        })
                                      )
                                    }}
                                    label={filter.f_content}
                                    variant="outlined"
                                    className="custom-chip"
                                  />
                                </Box>
                              ) : (
                                <>{t('containsText')}</>
                              )}
                            </Button>

                            <Box
                              display={containsText ? 'flex' : 'none'}
                              className="filter-dropdown auto-search"
                              minWidth={{ xs: '100%', sm: '150px' }}
                            >
                              <Fade top>
                                <TextField
                                  className="custom-input-filter input-search"
                                  variant="outlined"
                                  fullWidth
                                  size="small"
                                  id="f_content"
                                  name="f_content"
                                  value={filter.f_content}
                                  onChange={setFilterValue}
                                  autoComplete="content"
                                  placeholder={t('fields:containsText')}
                                />
                              </Fade>
                            </Box>
                          </Box>
                        </ClickAwayListener>
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
                              onClick={onApplyFilter}
                              variant="contained"
                              fullWidth
                              disabled={!(filter.serviceCode && filter.f_collection)}
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
                                filter.serviceCode ||
                                filter.f_collection ||
                                filter.f_content ||
                                filter.f_filename ||
                                filter.f_nickname ||
                                filter.districtId
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
            </Grid>
            <Grid item xs={12} md="auto">
              <Box
                display="flex"
                justifyContent={{
                  xs: 'flex-start',
                  sm: 'flex-start',
                  lg: 'flex-end',
                }}
                alignItems="center"
              >
                <Button
                  className="text-transform-none"
                  variant="contained"
                  disableElevation
                  color="secondary"
                  onClick={toggleDeletePopup}
                  disabled={isEmpty(checkState)}
                >
                  {t('delete')}
                </Button>
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
          data={pageData}
          headCells={allHeadCells}
          dataParameter={dataParameter}
          selected={checkState}
          setSelected={onCheck}
          isSelection={pageData.length > 0 ? true : false}
        >
          {pageData.map((row) => {
            return (
              <TableRow hover data-id={row.id} key={row.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    onChange={onCheck}
                    checked={checkState.includes(row.id.toString())}
                    name={row.id}
                    color="primary"
                  />
                </TableCell>
                <TableCell tabIndex={0}>{row.nickname}</TableCell>
                <TableCell tabIndex={0}>{row.name}</TableCell>
                <TableCell tabIndex={0} className={classes.verticalSpaceRemove}>
                  {row.modified_by}
                  <br />
                  {row.modified_at}
                </TableCell>
                <TableCell className={classes.verticalSpaceRemove}>{editTemplate(row)}</TableCell>
                <TableCell className={classes.verticalSpaceRemove}>
                  {editTemplateActions(row)}
                </TableCell>
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
                Showing {pageData.length} rows out of {pageDetails.total}
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>
      <ConfirmBox
        maxWidth="xs"
        open={openDeletePopup}
        close={toggleDeletePopup}
        onConfirm={deleteForms}
        defaultProps={{ message: 'deleteConfirmation', buttonText: 'delete' }}
      />
      <TemplatesSetting
        allHeadCells={allHeadCells}
        initialHeadcells={initialHeadcells}
        setHeadcells={setHeadcells}
        open={settingModal}
        onClose={toggleSettingModal}
      />
    </>
  )
}
Templates.propTypes = {
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
  pageData: PropTypes.array,
  checkState: PropTypes.array,
  onCheck: PropTypes.func,
  filter: PropTypes.object,
  onFilterReset: PropTypes.func,
  onApplyFilter: PropTypes.func,
  setFilterValue: PropTypes.func,
  deleteForms: PropTypes.func,
  deleteItems: PropTypes.func,
  openDeletePopup: PropTypes.bool,
  toggleDeletePopup: PropTypes.func,
  districts: PropTypes.array,
  schools: PropTypes.array,
}

Templates.defaultProps = {
  initialHeadcells: [],
  allHeadCells: [],
  pageData: [],
  setHeadcells: () => {},
  onChangePage: () => {},
  onChangeRowsPerPage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  initializeData: [],
  pageDetails: {},
  checkState: [],
  onCheck: () => {},
  filter: {},
  onFilterReset: () => {},
  setFilterValue: () => {},
  onApplyFilter: () => {},
  deleteForms: () => {},
  openDeletePopup: false,
  toggleDeletePopup: () => {},
  districts: [],
  schools: [],
}

export default Templates
