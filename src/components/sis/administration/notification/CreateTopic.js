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
import SettingsIcon from '@material-ui/icons/Settings'
import clsx from 'clsx'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowLeft, ArrowRight, Check } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'

import { createYupSchema } from '../../../../../clientFiles/validations'
import { ROUTES } from '../../../../helpers/constants'
import { isEmpty } from '../../../../helpers/utils'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import useStyles from '../Administration.Style'
import GeneralInfo from './GeneralInfo'
import ProcessorConfiguration from './ProcessorConfiguration'

function getSteps() {
  return ['General Information', 'Processor Configuration']
}

function getStepContent(stepIndex, props) {
  switch (stepIndex) {
    case 0:
      return <GeneralInfo {...props} />
    case 1:
      return <ProcessorConfiguration {...props} />
    default:
      return <GeneralInfo {...props} />
  }
}
getStepContent.propTypes = {
  processorList: PropTypes.array,
  processorConfig: PropTypes.array,
}
getStepContent.defaultProps = {
  processorList: [],
  processorConfig: [],
}

function CreateTopic({
  createTopic,
  processorList,
  createTopicInitialState,
  processorConfig,
  fetchProcessorConfig,
  formValues,
}) {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation()
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()
  const processorCode = React.useRef('')
  let schemaState = createYupSchema(processorConfig)
  schemaState = yup.object().shape(schemaState)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const onSubmit = function (values, { setErrors }) {
    createTopic(values, { setErrors })
  }

  const ColorlibConnector = withStyles({})(StepConnector)

  const useColorlibStepIconStyles = makeStyles({})
  function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles()
    const { active, completed } = props

    const icons = {
      1: <InfoIcon />,
      2: <SettingsIcon />,
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
  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbAdministration'),
      href: ROUTES.NOTIFICATION,
    },
    {
      title: t('breadcrumbNotification'),
      href: ROUTES.NOTIFICATION,
    },
    {
      title: t('breadcrumbAddNewTopic'),
      href: '',
    },
  ]
  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="fontWeightBold" fontSize="24px">
                {t('addANewTopic')}
              </Box>
            </Typography>
          </Grid>

          <Grid item xs="auto">
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
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon} tabIndex={0}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>
      </Box>

      <Box mb={2} display="flex" width="100%" alignItems="center" justifyContent="center">
        <Paper rounded={true} elevation={1} className={classes.stepperTop + ' paper-round'}>
          <Box width="100%" py={2} px={{ xs: 2, sm: 3, lg: 5 }}>
            <Formik
              initialValues={createTopicInitialState}
              onSubmit={onSubmit}
              validationSchema={schemaState}
              enableReinitialize={true}
            >
              {({ values, setFieldValue, errors, dirty, ...props }) => {
                if (values.processor && values.processor !== processorCode.current) {
                  fetchProcessorConfig(values.processor)
                  processorCode.current = values.processor
                  formValues.current = { ...values }
                }
                return (
                  <Form className={classes.form} noValidate autoComplete="off">
                    {getStepContent(activeStep, {
                      processorList,
                      processorConfig,
                      values,
                      setFieldValue,
                      ...props,
                    })}
                    <Box pt={{ xs: 3, sm: 4 }} pb={3} display="flex" justifyContent="flex-end">
                      {activeStep === 0 ? (
                        <>
                          <Box mr={2}>
                            <Button
                              onClick={() => {
                                history.goBack()
                              }}
                              className="custom-default-button text-transform-none"
                              size="large"
                              variant="contained"
                              disableElevation
                            >
                              {t('cancel')}
                            </Button>
                          </Box>
                          <Button
                            classes="text-transform-none"
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={handleNext}
                            className="text-transform-none"
                            size="large"
                            endIcon={<ArrowRight />}
                            disabled={
                              !(
                                values.name &&
                                values.processor &&
                                values.description &&
                                values.description.length <= 250 &&
                                values.name.length <= 50 &&
                                /^[aA-zZ\s]+$/.test(values.name)
                              )
                            }
                          >
                            {t('saveAndContinue')}
                          </Button>
                        </>
                      ) : activeStep === 1 ? (
                        <>
                          <Box mr={2}>
                            <Button
                              classes="text-transform-none"
                              variant="contained"
                              color="primary"
                              disableElevation
                              className="text-transform-none"
                              size="large"
                              onClick={handleBack}
                            >
                              {t('previous')}
                            </Button>
                          </Box>
                          <Button
                            classes="text-transform-none"
                            variant="contained"
                            color="primary"
                            disableElevation
                            type="submit"
                            className="text-transform-none"
                            size="large"
                            endIcon={<Check />}
                            disabled={!isEmpty(errors) || !dirty}
                          >
                            {t('submit')}
                          </Button>
                        </>
                      ) : null}
                    </Box>
                  </Form>
                )
              }}
            </Formik>
          </Box>
          {/* )} */}
        </Paper>
      </Box>
    </>
  )
}
CreateTopic.propTypes = {
  createTopic: PropTypes.func,
  processorList: PropTypes.array,
  createTopicInitialState: PropTypes.object,
  processorConfig: PropTypes.array,
  fetchProcessorConfig: PropTypes.func,
  formValues: PropTypes.object,
}

CreateTopic.defaultProps = {
  createTopic: () => {},
  fetchProcessorConfig: () => {},
  createTopicInitialState: {},
  formValues: {},
  processorList: [],
  processorConfig: [],
}
export default CreateTopic
