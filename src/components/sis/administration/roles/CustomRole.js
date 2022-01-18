import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Hidden,
  IconButton,
  InputAdornment,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Pagination from '@material-ui/lab/Pagination'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowRight, Eye, PlusCircle, Search, Sliders, Trash } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '../../../../helpers/constants'
import withRedirect from '../../../../hocs/RedirectHOC'
import ConfirmBox from '../../../common/ConfirmBox'
import SelectFilter from '../../../filters/Select'
import CustomTable from '../../../table/CustomTable'
import CreateRole from './CreateRole'
import useStyles from './Roles.Style'
function CustomRole({
  customRoles,
  addCustomRole,
  deleteRole,
  openDeletePopup,
  toggleDeletePopup,
  pageDetails,
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
  onSearchEnter,
  addRoleSchools,
  fetchSchool,
  orgType,
  setOrgType,
  authUser,
}) {
  const { t } = useTranslation()
  const classes = useStyles()
  const [uploadCreateRole, setUploadCreateRole] = React.useState(false)
  const toggleCreateRole = () => {
    setUploadCreateRole(!uploadCreateRole)
  }
  const dataParameter = 'id'

  const allHeadCells = [
    {
      id: 'name',
      label: t('roleName'),
      isSort: true,
      sortProperty: 'name',
    },
    {
      id: 'description',
      label: t('roleDescription'),
      isSort: false,
      sortProperty: 'description',
    },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
      width: '180px',
    },
  ]

  const deleteCustomRole = function () {
    // const name = event.currentTarget.attributes['data-id'].value
    deleteRole()
  }

  const viewRole = (row) => {
    const IconButtonEnhanced = withRedirect(IconButton)
    return (
      <>
        <Tooltip title={t('viewDetail')}>
          <IconButtonEnhanced
            edge="start"
            data-id={row.name}
            color="primary"
            to={`${ROUTES.EDITROLE}/${row.id}`}
            aria-label={t('viewDetail')}
          >
            <Eye width="16px" height="16px" />
          </IconButtonEnhanced>
        </Tooltip>
        <Tooltip title={t('delete')}>
          <IconButton
            edge="end"
            onClick={toggleDeletePopup}
            data-id={row.id}
            color="secondary"
            aria-label={t('delete')}
          >
            <Trash width="16px" height="16px" />
          </IconButton>
        </Tooltip>
      </>
    )
  }
  return (
    <>
      <Box px={2} py={2} pb={2} width="100%">
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="600" fontSize="16px">
                {t('customRoles')}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Box
              my={{ xs: 1, lg: 0 }}
              display="flex"
              justifyContent={{
                xs: 'flex-start',
                sm: 'flex-end',
                lg: 'flex-end',
              }}
              alignItems="center"
            >
              <Box>
                <Button
                  onClick={toggleCreateRole}
                  className="text-transform-none"
                  size="large"
                  variant="contained"
                  disableElevation
                  startIcon={<PlusCircle />}
                  color="primary"
                >
                  {t('createCustomRoles')}
                </Button>
              </Box>
              {/* <Button
                className="text-transform-none"
                size="large"
                variant="outlined"
                disableElevation
                color="secondary"
              >
                {t('delete')}
              </Button> */}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <>
        <Box px={2} py={2} width="100%">
          <Accordion defaultExpanded elevation={0} className="custom-accordion">
            <Grid container spacing={2} justify="space-between" alignItems="center">
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
                  placeholder={t('fields:searchByNameDescription')}
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
                      optionId="sch_school_public_id"
                      optionName="sch_name"
                      options={schools}
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
          noDataMessage={t('dataNotFound')}
          data={customRoles}
          headCells={allHeadCells}
          dataParameter={dataParameter}
          isSelection={false}
          order={order}
          orderBy={orderBy}
          setOrder={setOrder}
          setOrderBy={setOrderBy}
        >
          {customRoles.map((row) => {
            return (
              <TableRow hover data-id={row.id} key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell className={classes.verticalSpaceRemove}>{viewRole(row)}</TableCell>
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
              <Typography component="p" variant="body2">
                Showing {customRoles.length} rows out of {pageDetails.total}
              </Typography>
            </Box>
          </Box>
        )}
      </>
      <ConfirmBox
        maxWidth="xs"
        open={openDeletePopup}
        close={toggleDeletePopup}
        onConfirm={deleteCustomRole}
        defaultProps={{ message: 'deleteConfirmation', buttonText: 'delete' }}
      />
      <CreateRole
        open={uploadCreateRole}
        addCustomRole={addCustomRole}
        onClose={toggleCreateRole}
        districts={districts}
        addRoleSchools={addRoleSchools}
        fetchSchool={fetchSchool}
        orgType={orgType}
        setOrgType={setOrgType}
        authUser={authUser}
      />
    </>
  )
}

CustomRole.defaultProps = {
  customRoles: [],
  addCustomRole: () => {},
  deleteRole: () => {},
  openDeletePopup: false,
  toggleDeletePopup: () => {},
  pageDetails: {},
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
  addRoleSchools: [],
  fetchSchool: () => {},
  orgType: '',
  setOrgType: () => {},
  authUser: {},
}

CustomRole.propTypes = {
  customRoles: PropTypes.array,
  addCustomRole: PropTypes.func,
  deleteRole: PropTypes.func,
  openDeletePopup: PropTypes.bool,
  toggleDeletePopup: PropTypes.func,
  pageDetails: PropTypes.object,
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
  addRoleSchools: PropTypes.array,
  fetchSchool: PropTypes.func,
  orgType: PropTypes.string,
  setOrgType: PropTypes.func,
  authUser: PropTypes.object,
}

export default CustomRole
