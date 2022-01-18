import { Box, Grid, Paper, Tab, Tabs, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '../../../../helpers/constants'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import CustomRoleSection from './CustomRole'
import SystemRoleSection from './SystemRole'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function Roles({
  systemRoles,
  customRoles,
  addCustomRole,
  openDeletePopup,
  toggleDeletePopup,
  deleteRole,
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
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbUserManagement'),
      href: ROUTES.ALLROLES,
    },
    {
      title: t('breadcrumbRoles'),
      href: '',
    },
  ]
  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="700">
                {t('roles')}
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Paper rounded={true} elevation={1} className="paper-round">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="tabs"
          variant="scrollable"
          className="custom-tabs"
        >
          <Tab label={t('customRoles')} id="roleTab-0" tabIndex={0} />
          <Tab label={t('systemRoles')} id="roleTab-1" tabIndex={0} />
        </Tabs>

        <TabPanel value={value} index={0} dir={theme.direction} className="horizontal-tabs-2">
          <CustomRoleSection
            customRoles={customRoles}
            addCustomRole={addCustomRole}
            openDeletePopup={openDeletePopup}
            toggleDeletePopup={toggleDeletePopup}
            deleteRole={deleteRole}
            pageDetails={pageDetails}
            onChangePage={onChangePage}
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
            filter={filter}
            districts={districts}
            schools={schools}
            setFilterValue={setFilterValue}
            onFilterReset={onFilterReset}
            onApplyFilter={onApplyFilter}
            onSearchEnter={onSearchEnter}
            addRoleSchools={addRoleSchools}
            fetchSchool={fetchSchool}
            orgType={orgType}
            setOrgType={setOrgType}
            authUser={authUser}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} className="horizontal-tabs-3">
          <SystemRoleSection systemRoles={systemRoles} />
        </TabPanel>
      </Paper>
    </>
  )
}

Roles.defaultProps = {
  systemRoles: [],
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

Roles.propTypes = {
  systemRoles: PropTypes.array,
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

export default Roles
