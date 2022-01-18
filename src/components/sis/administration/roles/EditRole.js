import { Box, Button, Grid, Paper, Tab, Tabs, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowLeft } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ROUTES } from '../../../../helpers/constants'
import { isEmpty } from '../../../../helpers/utils'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import DetailsSection from './Details'
import EditRoleSkeleton from './EditRoleSkeleton'
import PermissionSection from './Permission'
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

function EditRole({ detail, actions, onReset, setActions, updatePoliciesOnRole }) {
  const { t } = useTranslation()
  const history = useHistory()
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
      href: ROUTES.ALLROLES,
    },
    {
      title: t('breadcrumbEditRole'),
      href: '',
    },
  ]
  if (isEmpty(detail)) {
    return <EditRoleSkeleton />
  }
  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="fontWeightBold" fontSize="24px">
                {t('editRole')}
              </Box>
              <Box ml={1} component="span" fontWeight="500" fontSize="20px" className="user-name">
                ({detail.name})
              </Box>
            </Typography>
          </Grid>

          <Grid item xs={12} sm="auto">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              mt={{ xs: 1, sm: 0 }}
            >
              <Button
                className="custom-default-button text-transform-none"
                size="large"
                variant="contained"
                disableElevation
                startIcon={<ArrowLeft />}
                onClick={history.goBack}
              >
                {t('back')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Paper rounded={true} elevation={1} className="paper-round">
        {/*  <Box px={3} pt={2} pb={4}>
          <Grid container>
            <Grid item xs={12} sm={4} lg={3}>
              <Typography component="h6" align="left" variant="h5" color="textPrimary">
                <Box component="span" fontWeight="600" fontSize="14px">
                  {t('roleName')}
                </Box>
              </Typography>
              <Typography component="p" align="left" variant="h5" color="textPrimary">
                <Box component="span" fontWeight="fontWeightRegular" fontSize="18px">
                  {detail.name}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <Typography component="h6" align="left" variant="h5" color="textPrimary">
                <Box component="span" fontWeight="600" fontSize="14px">
                  {t('createdDate')}
                </Box>
              </Typography>
              <Typography component="p" align="left" variant="h5" color="textPrimary">
                <Box component="span" fontWeight="fontWeightRegular" fontSize="18px">
                  {t('06/07/2021 12:00:41 AM')}
                </Box>
              </Typography>
            </Grid>
          <Grid item xs={12} sm={4} lg={3}>
              <Typography component="h6" align="left" variant="h5" color="textPrimary">
                <Box component="span" fontWeight="600" fontSize="14px">
                  {t('lastModifiedDate')}
                </Box>
              </Typography>
              <Typography component="p" align="left" variant="h5" color="textPrimary">
                <Box component="span" fontWeight="fontWeightRegular" fontSize="18px">
                  {t('06/07/2021 12:00:41 AM')}
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </Box>*/}
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="tabs"
          variant="scrollable"
          className="custom-tabs"
        >
          <Tab label="Permissions" id="editRolesTab-0" tabIndex={0} />
          <Tab label="Details" id="editRolesTab-1" tabIndex={0} />
        </Tabs>

        <TabPanel value={value} index={0} dir={theme.direction} id="editRolesTabs-0">
          <PermissionSection
            actions={actions}
            onReset={onReset}
            setActions={setActions}
            updatePoliciesOnRole={updatePoliciesOnRole}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} id="editRolesTabs-1">
          <DetailsSection detail={detail} />
        </TabPanel>
      </Paper>
    </>
  )
}

EditRole.propTypes = {
  detail: PropTypes.object,
  onReset: PropTypes.func,
  actions: PropTypes.array,
  setActions: PropTypes.func,
  updatePoliciesOnRole: PropTypes.func,
}

EditRole.defaultProps = {
  detail: {},
  onReset: () => {},
  actions: () => {},
  setActions: () => {},
  updatePoliciesOnRole: () => {},
}

export default EditRole
