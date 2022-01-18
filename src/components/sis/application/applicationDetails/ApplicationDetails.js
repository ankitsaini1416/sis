import { Box, Button, Grid, Paper, Tab, Tabs, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowLeft } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ROUTES } from '../../../../helpers/constants'
import { get } from '../../../../helpers/utils'
import { isEmpty } from '../../../../helpers/utils'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import AboutStudentApplication from './AboutStudent'
import ApplicationDetailsSkeleton from './ApplicationDetailsSkeleton'
import EditParentDetails from './EditParentDetails'
import EditStudentDetails from './EditStudentDetails'
import FilesDocuments from './FilesDocuments'
import LoginEvents from './LoginEvents'
import ParentDetails from './ParentDetails'
import StudentDetails from './StudentDetails'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box pl={{ xs: 0, md: 3, lg: 1, xl: 3 }}>{children}</Box>}
    </div>
  )
}

function ApplicationDetails({
  details,
  school,
  editDetailAction,
  masterData,
  ethnicities,
  securityQuestions,
  searchStates,
  schooolCountries,
  states,
  editUser,
}) {
  const { t } = useTranslation()
  const history = useHistory()

  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const { showEditDetail } = get(history, 'location.state', {})

  const [showEditStudentDetails, setShowEditStudentDetails] = React.useState(
    showEditDetail ? true : false
  )
  const toggleEditGeneralInfo = () => setShowEditStudentDetails(!showEditStudentDetails)

  const [showEditParentDetails, setShowEditParentDetails] = React.useState(false)
  const toggleEditParentInfo = () => setShowEditParentDetails(!showEditParentDetails)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const breadcrumbData = [
    {
      title: 'SIS',
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbApplications'),
      href: ROUTES.REGISTERATIONS,
    },
    {
      title: t('breadcrumbApplicationsDetail'),
      href: '',
    },
  ]
  const breakpoint = useMediaQuery('(max-width:959px)')
  if (isEmpty(details)) {
    return <ApplicationDetailsSkeleton />
  }
  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="fontWeightBold" fontSize="24px">
                {t('applicationsDetails')}
              </Box>
              {/* <Box ml={1} component="span" fontWeight="500" fontSize="20px" className="user-name">
                ({getFullName(details) ? getFullName(details) : ''})
              </Box> */}
            </Typography>
          </Grid>

          <Grid item xs={12} sm="auto">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              mt={{ xs: 2, sm: 0 }}
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
      <AboutStudentApplication
        details={details}
        school={school}
        editDetailAction={editDetailAction}
      />

      <Box mt={2}>
        <Paper rounded={true} elevation={1} className="paper-round">
          <Box p={{ xs: 0, sm: 0, md: 3 }}>
            <Grid container spacing={breakpoint ? 0 : 3}>
              <Grid item xs={12} md={4} lg={3} xl={2} className="vertical-sidebar">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  aria-label="tabs"
                  variant="scrollable"
                  className="custom-tabs"
                  orientation={breakpoint ? 'horizontal' : 'vertical'}
                  selectionFollowsFocus
                >
                  <Tab label={t('studentDetails')} id="ApplicationDetailsTab-0" />
                  <Tab label={t('parentsDetails')} id="ApplicationDetailsTab-1" />
                  <Tab label={t('filesDocuments')} id="ApplicationDetailsTab-2" disabled />
                  <Tab label={t('loginEvents')} id="ApplicationDetailsTab-3" disabled />
                </Tabs>
              </Grid>
              <Grid item xs={12} md={8} lg={9} xl={10}>
                <TabPanel value={value} index={0} dir={theme.direction}>
                  {!showEditStudentDetails ? (
                    <StudentDetails
                      details={details}
                      toggleEditGeneralInfo={toggleEditGeneralInfo}
                    />
                  ) : (
                    <EditStudentDetails
                      toggleEditGeneralInfo={toggleEditGeneralInfo}
                      details={details}
                      masterData={masterData}
                      ethnicities={ethnicities}
                      securityQuestions={securityQuestions}
                      searchStates={searchStates}
                      schooolCountries={schooolCountries}
                      states={states}
                      editUser={editUser}
                    />
                  )}
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  {!showEditParentDetails ? (
                    <ParentDetails details={details} toggleEditParentInfo={toggleEditParentInfo} />
                  ) : (
                    <EditParentDetails
                      toggleEditParentInfo={toggleEditParentInfo}
                      details={details}
                      masterData={masterData}
                      editUser={editUser}
                      schooolCountries={schooolCountries}
                      states={states}
                      searchStates={searchStates}
                      ethnicities={ethnicities}
                    />
                  )}
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <FilesDocuments details={details} />
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                  <LoginEvents details={details} />
                </TabPanel>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </>
  )
}
ApplicationDetails.propTypes = {
  details: PropTypes.object,
  school: PropTypes.array,
  editDetailAction: PropTypes.func,
  masterData: {},
  ethnicities: PropTypes.array,
  securityQuestions: PropTypes.array,
  searchStates: PropTypes.func,
  schooolCountries: PropTypes.array,
  states: PropTypes.array,
  editUser: PropTypes.func,
}

ApplicationDetails.defaultProps = {
  details: {},
  school: [],
  editDetailAction: () => {},
  masterData: {},
  ethnicities: [],
  securityQuestions: [],
  searchStates: () => {},
  schooolCountries: [],
  states: [],
  editUser: () => {},
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}
export default ApplicationDetails
