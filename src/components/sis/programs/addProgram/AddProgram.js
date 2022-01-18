import {
  Box,
  Button,
  Grid,
  Paper,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Assignment from '@material-ui/icons/Assignment'
import CreateIcon from '@material-ui/icons/Create'
import PeopleIcon from '@material-ui/icons/People'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowLeft, CheckCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ROUTES } from '../../../../helpers/constants'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import Certificates from './Certificates'
import FeeStructure from './FeesStructure'
import GeneralInformation from './GeneralInformation'

const breadcrumbData = [
  {
    title: 'SIS',
    href: ROUTES.DASHBOARDLIST,
  },
  {
    title: 'Programs',
    href: ROUTES.PROGRAMS,
  },
  {
    title: 'Add Program',
    href: '',
  },
]
function getSteps() {
  return ['General Information', 'Certificates / Transcripts', 'Fee Structure']
}
function AddProgram({
  activeStep,
  handleBack,
  handleReset,
  districts,
  fetchSchool,
  schools,
  addProgram,
  programsCategory,
  getProgramsCategory,
  addTranscripts,
  transcripts,
  programsTemplate,
  getProgramTemplate,
  addProgramFees,
  program,
}) {
  const { t } = useTranslation()
  const history = useHistory()
  const steps = getSteps()

  const ColorlibConnector = withStyles({})(StepConnector)

  const useColorlibStepIconStyles = makeStyles({})
  function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles()
    const { active, completed } = props

    const icons = {
      1: <CreateIcon />,
      2: <Assignment />,
      3: <PeopleIcon />,
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
  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="700">
                {t('addNewProgram')}
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
                onClick={history.goBack}
                startIcon={<ArrowLeft />}
              >
                {t('back')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Paper rounded={true} elevation={1} className="paper-round custom-stepper with-connector">
        <Box
          px={{ xs: 2, lg: 3 }}
          py={{ xs: 2, lg: 3 }}
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          flexDirection="column"
        >
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
            style={{ backgroundColor: 'transparent', padding: '0' }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon} tabIndex={0}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box width="100%" mt={3}>
            {activeStep === steps.length ? (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} lg={6} xl={3}>
                  <Box mt={5} display="flex" justifyContent="center" alignItems="center">
                    <Typography component="div" color="primary">
                      <CheckCircle width="52px" height="52px" />
                    </Typography>
                  </Box>
                  <Box mt={3} mb={3} px={3}>
                    <Typography
                      component="div"
                      align="center"
                      variant="h5"
                      color="textPrimary"
                      gutterBottom
                      tabIndex={0}
                    >
                      <Box width="100%" component="span" fontWeight="600" fontSize="16px">
                        {t('programThankYou')}
                      </Box>
                    </Typography>
                  </Box>
                  <Box mb={3} display="flex" justifyContent="center" alignItems="center">
                    <Button
                      className="custom-default-button text-transform-none"
                      size="large"
                      variant="contained"
                      disableElevation
                      color="primary"
                      onClick={handleReset}
                    >
                      {t('addAnotherProgram')}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <>
                {activeStep === 0 ? (
                  <GeneralInformation
                    districts={districts}
                    fetchSchool={fetchSchool}
                    schools={schools}
                    addProgram={addProgram}
                    programsCategory={programsCategory}
                    getProgramsCategory={getProgramsCategory}
                    programsTemplate={programsTemplate}
                    getProgramTemplate={getProgramTemplate}
                  />
                ) : activeStep === 1 ? (
                  <Certificates
                    handleBack={handleBack}
                    addTranscripts={addTranscripts}
                    transcripts={transcripts}
                  />
                ) : (
                  <FeeStructure
                    handleBack={handleBack}
                    addProgramFees={addProgramFees}
                    program={program}
                  />
                )}
              </>
            )}
          </Box>
        </Box>
      </Paper>
    </>
  )
}

AddProgram.propTypes = {
  activeStep: PropTypes.func,
  handleBack: PropTypes.func,
  handleReset: PropTypes.func,
  districts: PropTypes.array,
  fetchSchool: PropTypes.func,
  schools: PropTypes.array,
  addProgram: PropTypes.func,
  programsCategory: PropTypes.array,
  getProgramsCategory: PropTypes.func,
  addTranscripts: PropTypes.func,
  transcripts: PropTypes.array,
  programsTemplate: PropTypes.array,
  getProgramTemplate: PropTypes.func,
  addProgramFees: PropTypes.func,
  program: PropTypes.object,
}

AddProgram.defaultProps = {
  activeStep: () => {},
  handleBack: () => {},
  handleReset: () => {},
  districts: [],
  fetchSchool: () => {},
  schools: [],
  addProgram: () => {},
  programsCategory: [],
  getProgramsCategory: () => {},
  addTranscripts: () => {},
  transcripts: [],
  programsTemplate: [],
  getProgramTemplate: () => {},
  addProgramFees: () => {},
  program: {},
}
export default AddProgram
