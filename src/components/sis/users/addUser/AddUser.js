import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Step from '@material-ui/core/Step'
import StepConnector from '@material-ui/core/StepConnector'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import InfoIcon from '@material-ui/icons/Info'
import PeopleIcon from '@material-ui/icons/People'
import SchoolIcon from '@material-ui/icons/School'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowLeft } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ROUTES } from '../../../../helpers/constants'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import GeneralInfo from '../../users/addUser/GeneralInfo'
import SchoolDistrict from '../../users/addUser/SchoolDistrict'
import SelectRole from '../../users/addUser/SelectRole'
import useStyles from '../User.Style'
import UserAdded from './UserAdded'

function ColorlibStepIcon(props) {
  const useColorlibStepIconStyles = makeStyles({})
  const classes = useColorlibStepIconStyles()
  const { active, completed } = props

  const icons = {
    1: <InfoIcon />,
    2: <PeopleIcon />,
    3: <SchoolIcon />,
  }

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  )
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
}

function getStepContent(stepIndex, props) {
  switch (stepIndex) {
    case 0:
      return <SchoolDistrict {...props} />
    case 1:
      return <GeneralInfo {...props} />
    case 2:
      return <SelectRole {...props} />
    default:
      return <SchoolDistrict {...props} />
  }
}

function AddUser({
  toggleUserPayload,
  steps,
  activeStep,
  handleNext,
  handleBack,
  systemRoles,
  customRoles,
  toggleRolePayload,
  districts,
  schools,
  searchSchools,
  toggleOrgPayload,
  process,
  userPayload,
  rolePayload,
  orgPayload,
  authUser,
  orgType,
  setOrgType,
}) {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation()

  const ColorlibConnector = withStyles({})(StepConnector)
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
      title: t('breadcrumbAddUser'),
      href: '',
    },
  ]
  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={6} sm="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="fontWeightBold" fontSize="24px">
                {t('addAUser')}
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
      <Box width="100%">
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="center"
          px={{ xs: 0, sm: 1, lg: 5 }}
          flexGrow={8}
          className="custom-stepper"
        >
          <Box width="100%" className={classes.stepperTop} px={{ xs: 0, sm: 0, lg: 8 }} pb={4}>
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<ColorlibConnector />}
              style={{ backgroundColor: 'transparent', padding: '0' }}
            >
              {steps.map((label) => (
                <Step className={classes.labelBreak} key={label} tabIndex={0}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>
      </Box>

      <Box mb={2} display="flex" width="100%" alignItems="center" justifyContent="center">
        <Paper rounded={true} elevation={1} className={classes.stepperTop + ' paper-round'}>
          {activeStep === steps.length ? (
            <UserAdded process={process} />
          ) : (
            <Box width="100%" py={2} px={{ xs: 2, sm: 3, lg: 5 }}>
              {getStepContent(activeStep, {
                toggleUserPayload,
                handleNext,
                handleBack,
                systemRoles,
                customRoles,
                toggleRolePayload,
                districts,
                schools,
                searchSchools,
                toggleOrgPayload,
                userPayload,
                orgPayload,
                rolePayload,
                authUser,
                orgType,
                setOrgType,
              })}
            </Box>
          )}
        </Paper>
      </Box>
    </>
  )
}

AddUser.propTypes = {
  toggleUserPayload: PropTypes.func,
  steps: PropTypes.array,
  activeStep: PropTypes.number,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
  systemRoles: PropTypes.array,
  customRoles: PropTypes.array,
  toggleRolePayload: PropTypes.func,
  districts: PropTypes.array,
  schools: PropTypes.array,
  searchSchools: PropTypes.func,
  toggleOrgPayload: PropTypes.func,
  process: PropTypes.object,
  userPayload: PropTypes.object,
  rolePayload: PropTypes.object,
  orgPayload: PropTypes.object,
  authUser: PropTypes.object,
  orgType: PropTypes.string,
  setOrgType: PropTypes.func,
}

AddUser.defaultProps = {
  toggleUserPayload: () => {},
  steps: [],
  activeStep: 0,
  handleNext: () => {},
  handleBack: () => {},
  systemRoles: [],
  customRoles: [],
  toggleRolePayload: () => {},
  districts: [],
  schools: [],
  searchSchools: () => {},
  toggleOrgPayload: () => {},
  process: {},
  userPayload: {},
  rolePayload: {},
  orgPayload: {},
  authUser: {},
  orgType: '',
  setOrgType: () => {},
}

export default AddUser
