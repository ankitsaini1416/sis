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
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Pagination from '@material-ui/lab/Pagination'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowRight, Edit2, Plus, Search, Settings, Sliders, Trash } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '../../../helpers/constants'
import { statuses } from '../../../helpers/stub'
import withRedirect from '../../../hocs/RedirectHOC'
import ConfirmBox from '../../common/ConfirmBox'
import DateRangeFilter from '../../filters/DateRange'
import SelectFilter from '../../filters/Select'
import CustomTable from '../../table/CustomTable'
import TranScriptSetting from '../../table/TableSetting'
import Breadcrumb from './../../breadcrumbs/Breadcrumbs'
import useStyles from './TranScript.Style'

function TranScript({
  transcripts,
  deleteTranscript,
  onSearchEnter,
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
  toggleDeletePopup,
  openDeletePopup,
}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const ButtonEnhanced = withRedirect(Button)
  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbTranScript'),
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
          aria-label={t('editTranscript')}
          edge="start"
          to={`${ROUTES.EDITTRANSCRIPT}/${row.tt_id}`}
          data-id={row.id}
          color="primary"
        >
          <Tooltip title={t('editTranscript')}>
            <Edit2 width="16px" height="16px" />
          </Tooltip>
        </IconButtonEnhanced>

        <Tooltip title={t('deleteTranscript')}>
          <IconButton
            aria-label={t('deleteTranscript')}
            edge="end"
            data-id={row.id}
            color="secondary"
            onClick={toggleDeletePopup}
          >
            <Trash width="16px" height="16px" />
          </IconButton>
        </Tooltip>
      </Box>
    )
  }

  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography tabIndex={0} component="h4" align="left" variant="h5" color="textPrimary">
              <Box component="span" fontWeight="700">
                {t('tranScript')}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Box
              mt={{ xs: 1, sm: 0 }}
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
                to={ROUTES.ADDTRANSCRIPT}
                startIcon={<Plus />}
              >
                {t('addTranScript')}
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
                  value={filter.q}
                  onChange={setFilterValue}
                  onKeyDown={onSearchEnter}
                  placeholder={t('fields:searchTranscript')}
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
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={9} sm="auto">
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
                      primaryLabel={t('fields:createdDate') + ':'}
                      fromLabel={t('fields:from') + ':'}
                      fromLabelFallback={t('fields:from')}
                      toLabel={t('fields:to') + ':'}
                      toLabelFallback={t('fields:to')}
                      primaryLabelSize="105px"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md="auto">
                    <Box
                      display="flex"
                      justifyContent={{
                        xs: 'flex-start',
                        md: 'flex-end',
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
                        color="primary"
                        disabled={
                          !(
                            filter.schoolId ||
                            filter.isActive ||
                            filter.districtId ||
                            filter.fromDate ||
                            filter.toDate
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
          data={transcripts}
          headCells={allHeadCells.filter((cell) => initialHeadcells.includes(cell.id))}
          dataParameter={dataParameter}
          isSelection={false}
        >
          {transcripts.map((row) => {
            return (
              <TableRow hover data-id={row.id} key={row.id}>
                {initialHeadcells.includes('tt_template_name') && (
                  <TableCell tabIndex={0}>{row.tt_template_name}</TableCell>
                )}
                {initialHeadcells.includes('created_at') && (
                  <TableCell tabIndex={0}>{row.createdTimeLabel}</TableCell>
                )}
                {initialHeadcells.includes('updated_at') && (
                  <TableCell tabIndex={0}>{row.updatedTimeLabel}</TableCell>
                )}
                {initialHeadcells.includes('status') && (
                  <TableCell className={classes.verticalSpaceRemove}>
                    {row.tt_is_active ? (
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
            )
          })}
        </CustomTable>
        <ConfirmBox
          maxWidth="xs"
          open={openDeletePopup}
          close={toggleDeletePopup}
          onConfirm={deleteTranscript}
          defaultProps={{ message: 'deleteConfirmation', buttonText: 'delete' }}
        />
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
                Showing {transcripts.length} rows out of {pageDetails.total}
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
TranScript.propTypes = {
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
  transcripts: PropTypes.array,
  deleteTranscript: PropTypes.func,
  onSearchEnter: PropTypes.func,
  toggleDeletePopup: PropTypes.func,
  openDeletePopup: PropTypes.bool,
}

TranScript.defaultProps = {
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
  transcripts: [],
  deleteTranscript: () => {},
  onSearchEnter: () => {},
  toggleDeletePopup: () => {},
  openDeletePopup: false,
}

export default TranScript
