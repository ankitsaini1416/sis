import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { Check, HelpCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { CoreSchema } from '../../../../../clientFiles/validations'
import { ROUTES } from '../../../../helpers/constants'
import { isEmpty } from '../../../../helpers/utils'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import useStyles from '../Settings.Style'
import EditEmailSkeleton from './EditEmailSkeleton'

const breadcrumbData = [
  {
    title: 'SIS',
    href: '/',
  },
  {
    title: 'Settings',
    href: ROUTES.EMAIL,
  },
  {
    title: 'Emails',
    href: ROUTES.EMAIL,
  },
  {
    title: 'Edit Email',
    href: '/settings/emails/editemail',
  },
]

function EditEmail({ editEmail, email, formState, template }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const history = useHistory()
  const CheckboxWithGreenCheck = withStyles({})(Checkbox)

  const onSubmit = function (values, { setErrors }) {
    editEmail(email.eml_id, values, { setErrors })
  }
  if (isEmpty(email)) {
    return <EditEmailSkeleton />
  }
  return (
    <Formik
      initialValues={formState}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validationSchema={CoreSchema.editEmail}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form className={classes.form} noValidate autoComplete="off">
            <Box mb={2}>
              <Box py={2}>
                <Breadcrumb data={breadcrumbData} />
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={12} sm="auto">
                    <Typography
                      component="h4"
                      align="left"
                      variant="h5"
                      color="textPrimary"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="700">
                        {t('editEmail')}
                      </Box>
                      <Box
                        ml={1}
                        component="span"
                        fontWeight="500"
                        fontSize="20px"
                        className="user-name"
                      >
                        ({email.eml_name})
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
                      >
                        {t('cancel')}
                      </Button>
                      <Box ml={2}>
                        <Button
                          className="text-transform-none"
                          size="large"
                          variant="contained"
                          disableElevation
                          color="primary"
                          type="submit"
                        >
                          {t('save')}
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Paper rounded={true} elevation={1} className="paper-round">
                <Box px={{ xs: 2, lg: 4 }} py={{ xs: 2, lg: 4 }}>
                  {/* edit email */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Box mt={1} mb={1}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:emailName')}
                          </Box>
                          <Box component="span" color="secondary" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="eml_name"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="eml_name"
                          autoComplete="eml_name"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconEmailName')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:emailName')}) ({t('fields:mandatory')}) (
                              {t('fields:helpIconEmailName')})
                            </span>
                          }
                        />
                        <ErrorMessage name="eml_name">
                          {(msg) => (
                            <span className="error" tabIndex={0}>
                              {t(msg, { field: t('fields:emailName') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Box mt={1} mb={1}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:subject')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="eml_subject"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="eml_subject"
                          autoComplete="eml_subject"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconSubject')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:subject')}) ({t('fields:mandatory')}) (
                              {t('fields:helpIconSubject')})
                            </span>
                          }
                        />
                        <ErrorMessage name="eml_subject">
                          {(msg) => (
                            <span className="error" tabIndex={0}>
                              {t(msg, { field: t('fields:emailSubject') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Box mt={1} mb={1}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:defaultSender')}
                          </Box>
                          <Box component="span" className="optional">
                            ({t('fields:optional')})
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="eml_from_address"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="eml_from_address"
                          autoComplete="eml_from_address"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconDefaultSender')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:defaultSender')}) ({t('fields:optional')}) (
                              {t('fields:helpIconDefaultSender')})
                            </span>
                          }
                        />
                        <ErrorMessage name="eml_from_address">
                          {(msg) => (
                            <span className="error" tabIndex={0}>
                              {t(msg, { field: t('fields:emailFromAddress') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Box mb={1}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:defaultReceiver')}
                          </Box>
                          <Box component="span" className="optional">
                            ({t('fields:optional')})
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="eml_default_to_address"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="eml_default_to_address"
                          autoComplete="eml_default_to_address"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title={t('fields:helpIconDefaultReceiver')}
                                  placement="top"
                                >
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:defaultReceiver')}) ({t('fields:optional')}) (
                              {t('fields:helpIconDefaultReceiver')})
                            </span>
                          }
                        />
                        <ErrorMessage name="eml_default_to_address">
                          {(msg) => (
                            <span className="error" tabIndex={0}>
                              {t(msg, { field: t('fields:emaillDefaultToAddress') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Box mt={1} mb={1}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:defaultTemplate')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className={classes.selectIcon + ' custom-input-field'}
                          name="eml_template_urn"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="eml_template_urn"
                          pr={0}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title={t('fields:helpIconDefaultTemplate')}
                                  placement="top"
                                >
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:defaultTemplate')}) ({t('fields:mandatory')}) (
                              {t('fields:helpIconDefaultTemplate')})
                            </span>
                          }
                          select
                        >
                          {template.map((row) => (
                            <MenuItem key={row} value={row.urn}>
                              {row.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} className="custom-checkbox">
                      <Box mt={1} mb={1}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:status')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                      </Box>
                      <Box minWidth={{ xs: 'auto', sm: 'auto', md: '150px' }} align="left">
                        <FormControlLabel
                          control={
                            <CheckboxWithGreenCheck
                              checked={values.eml_is_enabled}
                              onChange={(e) => {
                                setFieldValue('eml_is_enabled', e.target.checked)
                              }}
                              checkedIcon={<Check />}
                              color="Primary"
                            />
                          }
                          label={t('fields:active')}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  {/* edit email */}
                </Box>
              </Paper>
            </Box>
          </Form>
        )
      }}
    </Formik>
  )
}

EditEmail.propTypes = {
  editEmail: PropTypes.func,
  email: PropTypes.object,
  formState: PropTypes.object,
  template: PropTypes.array,
}

EditEmail.defaultProps = {
  editEmail: () => {},
  email: {},
  formState: {},
  template: [],
}

export default EditEmail
