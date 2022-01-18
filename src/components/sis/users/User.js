import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Pagination from '@material-ui/lab/Pagination'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowRight, Eye, Plus, Search, Settings, Sliders } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '../../../helpers/constants'
import withRedirect from '../../../hocs/RedirectHOC'
import SelectFilter from '../../filters/Select'
import CustomTable from '../../table/CustomTable'
import UserSetting from '../../table/TableSetting'
import Breadcrumb from './../../breadcrumbs/Breadcrumbs'
import useStyles from './User.Style'

function User({
  allHeadCells,
  initialHeadcells,
  setHeadcells,
  pageDetails,
  users,
  onChangePage,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  filter,
  setFilterValue,
  onFilterReset,
  onApplyFilter,
  districts,
  schools,
  roles,
  onSearchEnter,
}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const dataParameter = 'id'

  const [settingModal, setSettingModal] = React.useState(false)
  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbUserManagement'),
      href: ROUTES.ALLUSERS,
    },
    {
      title: t('breadcrumbUser'),
      href: '',
    },
  ]

  const toggleSettingModal = function () {
    setSettingModal(!settingModal)
  }

  const viewDetail = (row) => {
    const IconButtonEnhanced = withRedirect(IconButton)
    return (
      <Tooltip title={t('viewDetail')}>
        <IconButtonEnhanced data-id={row.id} color="primary" to={`${ROUTES.USERDETAILS}/${row.id}`}>
          <Eye width="16px" height="16px" />
        </IconButtonEnhanced>
      </Tooltip>
    )
  }
  const status = (row) => {
    if (row.active) {
      return (
        <Box component="span" className="label-green" id={row.id}>
          {t('active')}
        </Box>
      )
    } else {
      return (
        <Box component="span" className="label-red" id={row.id}>
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
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="700">
                {t('users')}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs="auto">
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
                startIcon={<Plus />}
                to={ROUTES.ADDUSER}
              >
                {t('addUser')}
              </ButtonEnhanced>

              <Box ml={1}>
                <Tooltip title={t('tableSetting')}>
                  <IconButton
                    edge="end"
                    onClick={toggleSettingModal}
                    aria-label={t('tableSetting')}
                    color="primary"
                  >
                    <Settings />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
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
                  placeholder={t('fields:searchByIdNameUser')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => onApplyFilter()}>
                          <Search className="icon-color-light rotate90" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md="auto">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm="auto">
                    <AccordionSummary
                      aria-controls="AllApplication-filter-content"
                      id="AllApplication-filter-header"
                      className="custom-filter-button"
                      aria-expanded={true}
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
                      options={schools}
                      optionId="sch_school_public_id"
                      optionName="sch_name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md="auto">
                    <SelectFilter
                      name="roleId"
                      filter={filter}
                      setFilterValue={setFilterValue}
                      label={t('fields:selectRole') + ':'}
                      labelFallback={t('fields:selectRole')}
                      options={roles}
                      optionId="id"
                      optionName="name"
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
                          disabled={!filter.districtId}
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
                        disabled={!(filter.q || filter.schoolId || filter.districtId)}
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
          data={users}
          headCells={allHeadCells.filter((cell) => initialHeadcells.includes(cell.id))}
          dataParameter={dataParameter}
        >
          {users.map((row) => {
            return (
              <TableRow hover data-id={row.id} key={row.id}>
                {initialHeadcells.includes('username') && (
                  <TableCell tabIndex={0}>{row.username}</TableCell>
                )}
                {initialHeadcells.includes('first_name') && (
                  <TableCell tabIndex={0}>{row.full_name}</TableCell>
                )}
                {initialHeadcells.includes('email') && (
                  <TableCell tabIndex={0}>
                    <Box className="word-break">{row.email}</Box>
                  </TableCell>
                )}
                {initialHeadcells.includes('active') && (
                  <TableCell tabIndex={0}>{status(row)}</TableCell>
                )}
                {initialHeadcells.includes('created_timestamp') && (
                  <TableCell tabIndex={0}>{row.createdTimeLabel}</TableCell>
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
            <Typography component="p" variant="body2" tabIndex={0}>
              Showing {users.length} rows out of {pageDetails.total}
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
User.propTypes = {
  allHeadCells: PropTypes.array,
  initialHeadcells: PropTypes.array,
  setHeadcells: PropTypes.func,
  pageDetails: PropTypes.object,
  users: PropTypes.array,
  onChangePage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  filter: PropTypes.object,
  setFilterValue: PropTypes.object,
  onFilterReset: PropTypes.object,
  onApplyFilter: PropTypes.object,
  districts: PropTypes.array,
  schools: PropTypes.array,
  fetchSchool: PropTypes.func,
  roles: PropTypes.array,
  onSearchEnter: PropTypes.func,
}

User.defaultProps = {
  allHeadCells: [],
  initialHeadcells: [],
  setHeadcells: () => {},
  pageDetails: {},
  users: [],
  onChangePage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  filter: {},
  setFilterValue: () => {},
  onFilterReset: () => {},
  onApplyFilter: () => {},
  districts: [],
  schools: [],
  fetchSchool: () => {},
  roles: [],
  onSearchEnter: () => {},
}

export default User
