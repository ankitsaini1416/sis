import {
  Box,
  Button,
  Grid,
  InputAdornment,
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
import { useHistory } from 'react-router-dom'

import { ROUTES } from '../../../../helpers/constants'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import useStyles from '../Settings.Style'

const mapWithState = function (init, data) {
  return {
    filename: data.name || init.name,
    nickname: data.nickname || init.nickname,
  }
}

const initialState = {
  filename: '',
  nickname: '',
}

function AddTemplate({ renameTemplate, templateData }) {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation()
  const initialValues = mapWithState(initialState, templateData)

  const onSubmit = function (values, { setErrors }) {
    renameTemplate(values, { setErrors })
  }
  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbSettings'),
      href: ROUTES.TEMPLATE,
    },
    {
      title: t('breadcrumbTemplates'),
      href: ROUTES.TEMPLATE,
    },
    {
      title: t('breadcrumbRenameTemplate'),
      href: '',
    },
  ]
  //   const ButtonEnhanced = withRedirect(Button)
  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="fontWeightBold" fontSize="24px">
                {t('renameTemplate')}
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box mb={2} mt={3} display="flex" width="100%" alignItems="center" justifyContent="center">
        <Paper rounded={true} elevation={1} className={classes.stepperTop + ' paper-round'}>
          <Box width="100%" py={2} px={{ xs: 2, sm: 3, lg: 5 }}>
            <Formik onSubmit={onSubmit} initialValues={initialValues} enableReinitialize={true}>
              {({ dirty }) => (
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
                        {t('renameTemplate')}
                      </Box>
                      <Box
                        ml={1}
                        component="span"
                        fontWeight="500"
                        fontSize="20px"
                        className="user-name"
                      >
                        {initialValues.name}
                      </Box>
                    </Typography>

                    <Box mt={3} width="100%">
                      <Box mt={2} mb={2}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:templateFileName')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="filename"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="filename"
                          autoFocus
                          autoComplete="name"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title={t('fields:helpIconTemplateFileName')}
                                  placement="top"
                                >
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:templateFileName')}) ({t('fields:mandatory')}) (
                              {t('fields:helpIconTemplateFileName')})
                            </span>
                          }
                        />
                        <ErrorMessage name="templateFileName">
                          {(msg) => (
                            <span className="error" tabIndex={0}>
                              {t(msg, { field: t('field:templateFileName') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Box>
                      <Box mb={2}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:templateName')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="nickname"
                          as={TextField}
                          fullWidth
                          size="small"
                          id="nickname"
                          variant="outlined"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconTemplateName')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:templateName')}) ({t('fields:mandatory')}) (
                              {t('fields:helpIconTemplateName')})
                            </span>
                          }
                        />
                        <ErrorMessage name="templateName">
                          {(msg) => (
                            <span className="error" tabIndex={0}>
                              {t(msg, { field: t('field:templateName') })}
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
                            history.goBack()
                          }}
                          className="custom-default-button text-transform-none"
                          size="large"
                          variant="contained"
                          disableElevation
                        >
                          {t('cancel')}
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
                            disabled={!dirty}
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
AddTemplate.propTypes = {
  renameTemplate: PropTypes.func,
  templateData: PropTypes.object,
}
AddTemplate.propTypes = {
  templateData: {},
  renameTemplate: () => {},
}
export default AddTemplate
