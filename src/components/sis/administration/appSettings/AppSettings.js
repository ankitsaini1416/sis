import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { HelpCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '../../../../helpers/constants'
import { mapStateWithData } from '../../../../helpers/utils'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import useStyles from '../Administration.Style'
import { CoreSchema } from './../../../../../clientFiles/validations'

const initialState = {
  default_email_topic: '',
  default_inapp_topic: '',
}

function AppSettings({ topics, metadata, addUpdateGeneralSetting }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const onSubmit = function (values, { setErrors }) {
    addUpdateGeneralSetting(values, { setErrors })
  }
  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbAdministration'),
      href: ROUTES.APPSETTINGS,
    },
    {
      title: t('breadcrumbAppSettings'),
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
                {t('appSettings')}
              </Box>
            </Typography>
          </Grid>
          {/*<Grid item xs={12} sm="auto">
            <Box
              mt={{ xs: 1, sm: 0 }}
              display="flex"
              alignItems="center"
              justifyContent={{ xs: 'flex-start', sm: 'flex-end', md: 'space-between' }}
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
          </Grid>*/}
        </Grid>
      </Box>

      <Box mb={2} mt={3} display="flex" width="100%" alignItems="center" justifyContent="center">
        <Paper rounded={true} elevation={1} className={classes.stepperTop + ' paper-round'}>
          <Box width="100%" py={2} px={{ xs: 2, sm: 3, lg: 5 }}>
            <Formik
              onSubmit={onSubmit}
              initialValues={mapStateWithData(metadata, initialState)}
              validationSchema={CoreSchema.metadata}
              enableReinitialize={true}
            >
              {({ setFormikState }) => (
                <Form className={classes.form} noValidate autoComplete="off">
                  <Box width="100%">
                    <Typography
                      component="h1"
                      align="left"
                      variant="h4"
                      color="textPrimary"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="fontWeightMedium" fontSize="24px">
                        {t('appSettings')}
                      </Box>
                    </Typography>
                    <Typography
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="Primary"
                      gutterBottom
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600">
                        {t('selectVariousNotifications')}
                      </Box>
                    </Typography>

                    <Box mt={3} width="100%">
                      <Box mt={2} mb={2}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:selectEmailNotifications')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className={classes.selectIcon + ' custom-input-field'}
                          name="default_email_topic"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="default_email_topic"
                          select
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title={t('fields:selectEmailNotificationsHelp')}
                                  placement="top"
                                >
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              {t('fields:selectEmailNotifications')} ({t('fields:mandatory')}) (
                              {t('fields:selectEmailNotificationsHelp')}
                            </span>
                          }
                        >
                          {topics.map((topic) => (
                            <MenuItem key={topic.id} value={topic.urn}>
                              {topic.name}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage name="default_email_topic">
                          {(msg) => (
                            <span className="error" tabIndex={0}>
                              {t(msg, {
                                field: t('fields:selectEmailNotifications'),
                              })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Box>
                      <Box mb={2}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:selectAppNotifications')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className={classes.selectIcon + ' custom-input-field'}
                          name="default_inapp_topic"
                          as={TextField}
                          fullWidth
                          size="small"
                          id="default_inapp_topic"
                          autoComplete="off"
                          variant="outlined"
                          select
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title={t('fields:selectAppNotificationsHelp')}
                                  placement="top"
                                >
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              {t('fields:selectAppNotifications')} ({t('fields:mandatory')}) (
                              {t('fields:selectAppNotificationsHelp')}
                            </span>
                          }
                        >
                          {topics.map((topic) => (
                            <MenuItem key={topic.id} value={topic.urn}>
                              {topic.name}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage name="default_inapp_topic">
                          {(msg) => (
                            <span className="error" tabIndex={0}>
                              {t(msg, {
                                field: t('fields:selectAppNotifications'),
                              })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent={{
                          xs: 'flex-start',
                          sm: 'flex-end',
                          md: 'flex-end',
                        }}
                        pt={{ xs: 3, sm: 4 }}
                        pb={3}
                      >
                        <Button
                          onClick={() => {
                            setFormikState(mapStateWithData(metadata, initialState))
                          }}
                          className="custom-default-button text-transform-none"
                          size="large"
                          variant="contained"
                          disableElevation
                        >
                          {t('reset')}
                        </Button>
                        <Box ml={2}>
                          <Button
                            classes="text-transform-none"
                            variant="contained"
                            color="primary"
                            disableElevation
                            className="text-transform-none"
                            size="large"
                            type="submit"
                          >
                            {t('Save')}
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Paper>
      </Box>
    </>
  )
}

AppSettings.propTypes = {
  topics: PropTypes.array,
  addUpdateGeneralSetting: PropTypes.func,
  metadata: PropTypes.object,
}

AppSettings.defaultProps = {
  topics: [],
  addUpdateGeneralSetting: () => {},
  metadata: {},
}

export default AppSettings
