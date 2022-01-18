import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Hidden,
  MenuItem,
  Paper,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { visuallyHidden } from '@mui/utils'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowRight, Sliders, UserMinus, UserPlus } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { isEmpty } from '../../../../helpers/utils'
import SelectFilter from '../../../filters/Select'
import CustomTable from '../../../table/CustomTable'
import useStyles from '../User.Style'

function AccessSetupAndRoles({
  roles,
  organizationList,
  userRoles,
  attachRole,
  detachRole,
  roleFilter,
  setRoleFilterValue,
  onRoleFilterReset,
  onApplyRoleFilter,
  authUser,
}) {
  const { t } = useTranslation()
  const classes = useStyles()
  const isUserHaveRootGroup = !isEmpty(organizationList.find((item) => item.id === 'root'))
  const isSystemRolesAllowed = authUser.isAdmin && isUserHaveRootGroup
  const districts = organizationList.filter((item) => item.dst_id)
  const schools = organizationList.filter((item) => item.sch_id)
  const roleTypes = [
    { key: '1', name: 'System Role' },
    { key: '2', name: 'Custom Role' },
  ]
  const [roleName, setRoleName] = React.useState(
    isSystemRolesAllowed ? roleTypes[0].key : roleTypes[1].key
  )
  const handleChangeRole = (event) => {
    setRoleName(event.target.value)
  }
  const dataParameter = 'id'
  const allHeadCells = [
    {
      id: 'role_name',
      label: t('roleName'),
      isSort: true,
      sortProperty: 'role_name',
    },
    {
      id: 'role_description',
      label: t('roleDescription'),
      isSort: true,
      sortProperty: 'role_description',
    },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
      width: '200px',
    },
  ]
  const onAttach = (role) => () => {
    attachRole(role)
  }
  const onDetach = (role) => () => {
    detachRole(role)
  }
  const getActionType = (row) => {
    if (roleName === roleTypes[0].key) {
      if (userRoles.system_roles.includes(row.id)) {
        return (
          <Tooltip title={t('revokeRoleHelp')}>
            <Button
              className="text-transform-none"
              data-id={row.urn}
              color="secondary"
              size="small"
              id={row.urn}
              onClick={onDetach(row)}
              endIcon={<UserMinus height="16px" width="16px" />}
            >
              {t('revokeRole')}
            </Button>
          </Tooltip>
        )
      } else {
        return (
          <Tooltip title={t('assignRoleHelp')}>
            <Button
              className="text-transform-none"
              data-id={row.urn}
              color="primary"
              size="small"
              id={row.urn}
              onClick={onAttach(row)}
              endIcon={<UserPlus height="16px" width="16px" />}
            >
              {t('assignRole')}
            </Button>
          </Tooltip>
        )
      }
    } else if (roleName === roleTypes[1].key) {
      if (userRoles.custom_roles.includes(row.id)) {
        return (
          <Tooltip title={t('revokeRoleHelp')}>
            <Button
              className="text-transform-none"
              data-id={row.urn}
              color="secondary"
              size="small"
              id={row.urn}
              onClick={onDetach(row)}
              endIcon={<UserMinus height="16px" width="16px" />}
            >
              {t('revokeRole')}
            </Button>
          </Tooltip>
        )
      } else {
        return (
          <Tooltip title={t('assignRoleHelp')}>
            <Button
              className="text-transform-none"
              data-id={row.urn}
              color="primary"
              size="small"
              id={row.urn}
              onClick={onAttach(row)}
              endIcon={<UserPlus height="16px" width="16px" />}
            >
              {t('assignRole')}
            </Button>
          </Tooltip>
        )
      }
    }
  }

  return (
    <Paper rounded={true} elevation={1} className="paper-round">
      <Box px={3} py={1} width="100%">
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="600" fontSize="16px">
                {t('accessSetupRoles')}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3} xl={2}>
            <Box mt={{ xs: 1, lg: 0 }}>
              <TextField
                className="custom-input-field"
                name="selectRoles"
                variant="outlined"
                fullWidth
                size="small"
                id="selectRoles"
                value={roleName}
                onChange={handleChangeRole}
                disabled={!isSystemRolesAllowed}
                pr={0}
                select
                label={<span style={visuallyHidden}>({t('fields:accessSetupRoles')})</span>}
              >
                {roleTypes.map((role) => (
                  <MenuItem key={role.key} value={role.key}>
                    {role.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {roleName === roleTypes[1].key && (
        <Box px={2} py={2} width="100%">
          <Accordion defaultExpanded elevation={0} className="custom-accordion">
            <Grid container spacing={2} justify="space-between">
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
                      filter={roleFilter}
                      setFilterValue={setRoleFilterValue}
                      options={districts}
                      optionId="dst_district_public_id"
                      optionName="dst_name"
                      label={t('fields:district') + ':'}
                      labelFallback={t('fields:selectDistrict')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md="auto">
                    <SelectFilter
                      name="schoolId"
                      filter={roleFilter}
                      setFilterValue={setRoleFilterValue}
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
                          disabled={
                            !isUserHaveRootGroup && !roleFilter.districtId && !roleFilter.schoolId
                          }
                          onClick={onApplyRoleFilter}
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
                        onClick={onRoleFilterReset}
                        disabled={!(roleFilter.schoolId || roleFilter.districtId)}
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
      )}
      <CustomTable
        noDataMessage={t('dataNotFound')}
        data={roleName === roleTypes[0].key ? roles.system_roles : roles.custom_roles}
        headCells={allHeadCells}
        dataParameter={dataParameter}
        isSelection={false}
      >
        {(roleName === roleTypes[0].key ? roles.system_roles : roles.custom_roles).map((row) => {
          return (
            <TableRow hover data-id={row.id} key={row.id}>
              <TableCell tabIndex={0}>{row.name}</TableCell>
              <TableCell tabIndex={0}>{row.description}</TableCell>
              <TableCell className={classes.verticalSpaceRemove}>{getActionType(row)}</TableCell>
            </TableRow>
          )
        })}
      </CustomTable>
    </Paper>
  )
}

AccessSetupAndRoles.propTypes = {
  roles: PropTypes.object,
  organizationList: PropTypes.array,
  userRoles: PropTypes.object,
  attachRole: PropTypes.func,
  detachRole: PropTypes.func,
  roleFilter: PropTypes.object,
  setRoleFilterValue: PropTypes.func,
  onRoleFilterReset: PropTypes.func,
  onApplyRoleFilter: PropTypes.func,
  authUser: PropTypes.object,
}
AccessSetupAndRoles.defaultProps = {
  roles: {},
  organizationList: [],
  userRoles: {},
  attachRole: () => {},
  detachRole: () => {},
  roleFilter: {},
  setRoleFilterValue: () => {},
  onRoleFilterReset: () => {},
  onApplyRoleFilter: () => {},
  authUser: {},
}

export default AccessSetupAndRoles
