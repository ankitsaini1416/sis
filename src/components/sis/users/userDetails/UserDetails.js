import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Paper,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowLeft, Edit2, HelpCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import UploadImg from '../../../../assets/images/upload.png'
import { ROUTES } from '../../../../helpers/constants'
import { getFullName } from '../../../../helpers/utils'
import { isEmpty } from '../../../../helpers/utils'
import withRedirect from '../../../../hocs/RedirectHOC'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import AccessSetupAndRoles from '../../users/userDetails/AccessSetupAndRoles'
import FileDocumentsSection from '../../users/userDetails/FilesDocuments'
import OtherInfoSection from '../../users/userDetails/OtherInfo'
import SchoolsDistrictsSection from '../../users/userDetails/SchoolsDistricts'
import SummarySection from '../../users/userDetails/Summary'
import useStyles from '../User.Style'
import UserDetailsSkeleton from '../userDetails/UserDetailSkeleton'
import { AGMSchema } from './../../../../../clientFiles/validations'

function CircularProgressWithLabel(props) {
  return (
    <Box top={0} left={0} position="absolute" display="inline-flex" className="profile-circle">
      <CircularProgress
        variant="determinate"
        thickness={1.5}
        {...props}
        style={{ height: '140px', width: '140px', transform: 'rotate(90deg)' }}
      />
      <Box
        top={0}
        left={0}
        bottom={-5}
        right={0}
        position="absolute"
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
}

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

const initialState = {
  password: '',
  confirmPassword: '',
}

function UserDetails({
  organizationList,
  districts,
  schools,
  searchSchools,
  attachOrganization,
  detachOrganization,
  roles,
  userRoles,
  attachRole,
  detachRole,
  openDeletePopup,
  toggleDeletePopup,
  user,
  roleFilter,
  setRoleFilterValue,
  onRoleFilterReset,
  onApplyRoleFilter,
  authUser,
  setPassword,
  orgType,
  setOrgType,
}) {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation()
  const { userId } = useParams()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [profile, setProfile] = React.useState(0)

  const handleChangeProfile = (event, newProfile) => {
    setProfile(newProfile)
  }
  const [progress, setProgress] = React.useState(60)
  const onSubmit = function (values, { setErrors, resetForm }) {
    setPassword(values, { setErrors, callback: resetForm })
  }
  React.useEffect(() => {
    setProgress((prevProgress) => (prevProgress >= 100 ? 0 : 70))
  }, [])
  const ButtonEnhanced = withRedirect(Button)
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
      href: ROUTES.ALLUSERS,
    },
    {
      title: t('breadcrumbUserDetails'),
      href: '',
    },
  ]
  if (isEmpty(user)) {
    return <UserDetailsSkeleton />
  }
  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="700">
                {t('userDetails')}
              </Box>
              <Box ml={1} component="span" fontWeight="500" fontSize="20px" className="user-name">
                ({getFullName(user)})
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
                sm: 'flex-end',
                md: 'space-between',
              }}
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
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="tabs"
          variant="scrollable"
          className="custom-tabs"
        >
          <Tab label={t('myInformation')} id="userTab-0" tabIndex={0} />
          <Tab label={t('filesDocuments')} id="userTab-1" tabIndex={0} />
          <Tab label={t('schoolsAndDistricts')} id="userTab-2" tabIndex={0} />
          <Tab label={t('accessSetupRoles')} id="userTab-3" tabIndex={0} />
          <Tab label={t('passwordSettings')} id="userTab-4" tabIndex={0} />
        </Tabs>

        <TabPanel value={value} index={0} dir={theme.direction}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4} xl={3}>
              <Box
                mr={{ xs: 0, lg: 3 }}
                p={3}
                className="profileSection"
                align="center"
                mb={{ xs: 3, sm: 3, lg: 0 }}
              >
                <Box align="center" position="relative" className="user-profile-progress">
                  <CircularProgressWithLabel value={progress} tabIndex={0} />
                  <img
                    src={user?.attributes?.avatar_full ? user?.attributes?.avatar_full : UploadImg}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = UploadImg
                    }}
                    alt="Filter"
                  />
                </Box>

                <Typography
                  component="h1"
                  align="center"
                  variant="h4"
                  color="textPrimary"
                  tabIndex={getFullName(user) ? 0 : null}
                >
                  <Box fontWeight="fontWeightMedium" fontSize="24px" mt={2} mb={1}>
                    {getFullName(user)}
                  </Box>
                </Typography>
                <Typography
                  component="h6"
                  align="center"
                  variant="subtitle2"
                  color="default"
                  gutterBottom
                  tabIndex={user.email ? 0 : null}
                >
                  <Box component="span" fontWeight="fontWeightMedium" fontSize="14px">
                    {user.email}
                  </Box>
                </Typography>
                <Box
                  mt={2}
                  flexDirection={{ xs: 'row', md: 'column', lg: 'row' }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {user.active ? (
                    <Box
                      component="div"
                      mb={{ xs: 0, md: 1, lg: 0 }}
                      mr={{ xs: 1, sm: 1, md: 0, lg: 1 }}
                      className="button-label-success"
                      tabIndex={0}
                    >
                      <FiberManualRecordIcon fontSize="small" />
                      {t('active')}
                    </Box>
                  ) : (
                    <Box
                      component="div"
                      mb={{ xs: 0, md: 1, lg: 0 }}
                      mr={{ xs: 1, sm: 1, md: 0, lg: 1 }}
                      className="button-label-error"
                      tabIndex={0}
                    >
                      <FiberManualRecordIcon fontSize="small" />
                      {t('inActive')}
                    </Box>
                  )}

                  <ButtonEnhanced
                    className="text-transform-none"
                    variant="contained"
                    color="primary"
                    disableElevation
                    startIcon={<Edit2 width="18px" />}
                    to={`${ROUTES.EDITUSER}/${userId}`}
                  >
                    {t('editProfile')}
                  </ButtonEnhanced>
                </Box>
                <Box mt={4} pb={4} className={classes.verticalTab}>
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={profile}
                    onChange={handleChangeProfile}
                    aria-label="Vertical tabs"
                    textColor="primary"
                    indicatorColor="primary"
                    TabIndicatorProps={{
                      style: {
                        left: '0',
                        right: 'initial',
                        width: '4px',
                      },
                    }}
                  >
                    {/* <Tab icon={<File />} label={t('summary')} id="profileTab-0" /> */}
                    {/* <Tab icon={<Info />} label={t('otherInfo')} id="profileTab-1" /> */}
                  </Tabs>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={8} lg={8} xl={9} className="vertical-tab">
              <TabPanel value={profile} index={0}>
                <SummarySection user={user} />
              </TabPanel>
              <TabPanel value={profile} index={1}>
                <OtherInfoSection />
              </TabPanel>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} className="horizontal-tabs-2">
          <FileDocumentsSection />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction} className="horizontal-tabs-3">
          <SchoolsDistrictsSection
            detachOrganization={detachOrganization}
            districts={districts}
            schools={schools}
            searchSchools={searchSchools}
            attachOrganization={attachOrganization}
            organizationList={organizationList}
            openDeletePopup={openDeletePopup}
            toggleDeletePopup={toggleDeletePopup}
            authUser={authUser}
            orgType={orgType}
            setOrgType={setOrgType}
          />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction} className="horizontal-tabs-4">
          <AccessSetupAndRoles
            roles={roles}
            organizationList={organizationList}
            userRoles={userRoles}
            attachRole={attachRole}
            detachRole={detachRole}
            roleFilter={roleFilter}
            setRoleFilterValue={setRoleFilterValue}
            onRoleFilterReset={onRoleFilterReset}
            onApplyRoleFilter={onApplyRoleFilter}
            authUser={authUser}
          />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <Box pb={3}>
            <Typography component="p" align="left" variant="body2" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="600" fontSize="16px">
                {t('passwordSettings')}
              </Box>
            </Typography>
          </Box>
          <Formik
            validationSchema={AGMSchema.userPassword}
            onSubmit={onSubmit}
            initialValues={initialState}
          >
            {() => (
              <Form className={classes.form} noValidate autoComplete="off">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Box mt={1} mb={1}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:newPassword')}
                        </Box>
                      </Typography>
                      <Field
                        className="custom-input-field"
                        name="password"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        type="password"
                        size="small"
                        id="password"
                        autoComplete="password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:helpIconNewPassword')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:newPassword')}) ({t('fields:helpIconNewPassword')})
                          </span>
                        }
                      />
                      <ErrorMessage name="password">
                        {(msg) => (
                          <span className="error">
                            {t(msg, { field: t('fields:newPassword') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Box mt={1} mb={1}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:confirmPassword')}
                        </Box>
                      </Typography>
                      <Field
                        className="custom-input-field"
                        name="confirmPassword"
                        as={TextField}
                        variant="outlined"
                        type="password"
                        fullWidth
                        size="small"
                        id="confirmPassword"
                        autoComplete="confirmPassword"
                        InputProps={{
                          // <-- This is where the toggle button is added.
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:helpIconConfirmPassword')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:confirmPassword')}) ({t('fields:helpIconConfirmPassword')})
                          </span>
                        }
                      />
                      <ErrorMessage name="confirmPassword">
                        {(msg) => (
                          <span className="error">
                            {t(msg, { field: t('fields:confirmPassword') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Box mt={4.2} mb={1}>
                      <Button
                        className="text-transform-none"
                        size="large"
                        variant="contained"
                        color="primary"
                        disableElevation
                        type="submit"
                      >
                        {t('update')}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </TabPanel>
      </Paper>
    </>
  )
}

UserDetails.propTypes = {
  organizationList: PropTypes.array,
  districts: PropTypes.array,
  schools: PropTypes.array,
  searchSchools: PropTypes.func,
  attachOrganization: PropTypes.func,
  detachOrganization: PropTypes.func,
  roles: PropTypes.object,
  userRoles: PropTypes.object,
  attachRole: PropTypes.func,
  detachRole: PropTypes.func,
  openDeletePopup: PropTypes.bool,
  toggleDeletePopup: PropTypes.func,
  user: PropTypes.object,
  roleFilter: PropTypes.object,
  setRoleFilterValue: PropTypes.func,
  onRoleFilterReset: PropTypes.func,
  onApplyRoleFilter: PropTypes.func,
  authUser: PropTypes.object,
  setPassword: PropTypes.func,
  orgType: PropTypes.string,
  setOrgType: PropTypes.func,
}

UserDetails.defaultProps = {
  organizationList: [],
  districts: [],
  schools: [],
  searchSchools: () => {},
  attachOrganization: () => {},
  detachOrganization: () => {},
  roles: {},
  userRoles: {},
  attachRole: () => {},
  detachRole: () => {},
  openDeletePopup: false,
  toggleDeletePopup: () => {},
  user: {},
  roleFilter: {},
  setRoleFilterValue: () => {},
  onRoleFilterReset: () => {},
  onApplyRoleFilter: () => {},
  authUser: {},
  setPassword: () => {},
  orgType: () => {},
  setOrgType: () => {},
}

export default UserDetails
