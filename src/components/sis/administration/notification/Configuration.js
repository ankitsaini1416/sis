import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Radio,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowLeft, Check, Eye, EyeOff, HelpCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'

import { createYupSchema } from '../../../../../clientFiles/validations'
import { ROUTES } from '../../../../helpers/constants'
import { isEmpty } from '../../../../helpers/utils'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import FormikRadioGroup from '../../../common/formikComponents/FormikRadioGroup'
import useStyles from '../Administration.Style'
import ConfigurationSkeleton from './ConfigurationSkeleton'
function Configuration({
  createTopicInitialState,
  processorList,
  processorConfig,
  fetchProcessorConfig,
  formValues,
  updateTopic,
}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const processorCode = React.useRef('')
  const CheckboxWithGreenCheck = withStyles({})(Checkbox)
  const [passwordView, setPasswordView] = React.useState(false)
  let schemaState = createYupSchema(processorConfig)
  schemaState = yup.object().shape(schemaState)
  const handleClickShowPassword = () => {
    setPasswordView(!passwordView)
  }
  const history = useHistory()
  const onSubmit = function (values, { setErrors }) {
    updateTopic(values, { setErrors })
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
      title: t('breadcrumbConfigurations'),
      href: '',
    },
  ]
  if (isEmpty(processorList)) {
    return <ConfigurationSkeleton />
  }
  return (
    <Formik
      initialValues={createTopicInitialState.current}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validationSchema={schemaState}
    >
      {({ values, setFieldValue, errors, dirty, resetForm }) => {
        if (values.processor && values.processor !== processorCode.current) {
          fetchProcessorConfig(values.processor)
          processorCode.current = values.processor
          formValues.current = { ...values }
        }
        return (
          <Form className={classes.form} noValidate autoComplete="off">
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
                      {t('configurations')}
                    </Box>
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

            <Paper rounded={true} elevation={1} className="paper-round">
              <Box px={{ xs: 2, lg: 2 }} py={{ xs: 2, lg: 4 }}>
                <Box pb={3}>
                  <Typography
                    component="p"
                    align="left"
                    variant="body2"
                    color="Primary"
                    className="bg-color-surface"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600" fontSize="16px">
                      {t('generalInformation')}
                    </Box>
                  </Typography>
                </Box>
                {/* personal */}
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                      <Box component="span" fontWeight="600">
                        {t('fields:topicName')}
                      </Box>
                      <Box component="span" className="mandatory">
                        {t('fields:mandatory')}
                      </Box>
                    </Typography>
                    <Field
                      className="custom-input-field"
                      name="name"
                      id="name"
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      size="small"
                      autoComplete="name"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title={t('fields:helpIconTopicName')} placement="top">
                              <HelpCircle className="help-icon" />
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      label={
                        <span style={visuallyHidden}>
                          ({t('fields:topicName')}) ({t('fields:mandatory')}) (
                          {t('fields:helpIconTopicName')})
                        </span>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                      <Box component="span" fontWeight="600">
                        {t('fields:processor')}
                      </Box>
                      <Box component="span" className="mandatory">
                        {t('fields:mandatory')}
                      </Box>
                    </Typography>
                    <Field
                      as={TextField}
                      fullWidth
                      id="processor"
                      name="processor"
                      variant="outlined"
                      size="small"
                      className={classes.selectIcon + ' custom-input-field'}
                      select
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title={t('fields:helpIconSelectProcessor')} placement="top">
                              <HelpCircle className="help-icon" />
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      label={
                        <span style={visuallyHidden}>
                          ({t('fields:processor')}) ({t('fields:mandatory')}) (
                          {t('fields:helpIconSelectProcessor')})
                        </span>
                      }
                    >
                      {processorList.map((key) => (
                        <MenuItem value={key} key={key}>
                          {key}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                      <Box component="span" fontWeight="600">
                        {t('fields:description')}
                      </Box>
                      <Box component="span" className="mandatory">
                        {t('fields:mandatory')}
                      </Box>
                    </Typography>
                    <Field
                      className="custom-input-field"
                      name="description"
                      as={TextField}
                      multiline
                      rows={4}
                      autoComplete="description"
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="description"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title={t('fields:helpIconDescription')} placement="top">
                              <HelpCircle className="help-icon" />
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      label={
                        <span style={visuallyHidden}>
                          ({t('fields:description')}) ({t('fields:mandatory')}) (
                          {t('fields:helpIconDescription')})
                        </span>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Box className="custom-checkbox">
                      <Typography component="p" variant="body2" color="textPrimary">
                        <Box component="span" fontWeight="600">
                          {t('fields:status')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Box minWidth={{ xs: 'auto', sm: 'auto', md: '150px' }} align="left">
                        <FormControlLabel
                          control={
                            <CheckboxWithGreenCheck
                              checkedIcon={<Check />}
                              color="Primary"
                              id="is_active"
                              name="is_active"
                              checked={values.is_active}
                              onChange={(e) => {
                                setFieldValue('is_active', e.target.checked)
                              }}
                            />
                          }
                          label={t('fields:active')}
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} className="custom-checkbox">
                    <FormControlLabel
                      control={
                        <CheckboxWithGreenCheck
                          checkedIcon={<Check />}
                          color="Primary"
                          id="keep_logs"
                          name="keep_logs"
                          checked={values.keep_logs}
                          onChange={(e) => {
                            setFieldValue('keep_logs', e.target.checked)
                          }}
                        />
                      }
                      label={t('fields:keepLogs')}
                    />
                  </Grid>
                </Grid>
                {/* personal */}
                {!isEmpty(processorConfig) && (
                  <Box py={3}>
                    <Typography
                      component="p"
                      align="left"
                      variant="body2"
                      color="Primary"
                      className="bg-color-surface"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600" fontSize="16px">
                        {t('processorConfiguration')}
                      </Box>
                    </Typography>
                  </Box>
                )}
                <Grid container spacing={3}>
                  {processorConfig.map((row) => {
                    return (
                      <>
                        {row.type === 'TEXT' && (
                          <Grid item xs={12} sm={6}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box component="span" fontWeight="600">
                                {t(`fields:${row.key}`)}
                              </Box>
                              {row.properties.required && (
                                <Box component="span" className="mandatory">
                                  {t('fields:mandatory')}
                                </Box>
                              )}
                            </Typography>
                            <Field
                              className="custom-input-field"
                              id={row.key}
                              type={
                                row.key !== 'password' ? 'text' : passwordView ? 'text' : 'password'
                              }
                              name={row.key}
                              as={TextField}
                              variant="outlined"
                              fullWidth
                              size="small"
                              autoFocus
                              autoComplete="hostname"
                              InputProps={{
                                endAdornment:
                                  row.key !== 'password' ? (
                                    <Tooltip title={t(`fields:help${row.key}`)} placement="top">
                                      <HelpCircle className="help-icon" />
                                    </Tooltip>
                                  ) : (
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        color="textSecondary"
                                      >
                                        {passwordView ? <Eye /> : <EyeOff />}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                              }}
                              label={
                                <span style={visuallyHidden}>
                                  {t(`fields:${row.key}`)} ({t('fields:mandatory')}) (
                                  {t(`fields:help${row.key}`)}
                                </span>
                              }
                            />
                            <ErrorMessage name={row.key}>
                              {(msg) => (
                                <span className="error" tabIndex={0}>
                                  {t(msg, { field: t(`fields:${row.key}`) })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Grid>
                        )}
                        {row.type === 'RADIO' && (
                          <Grid item xs={12} md={6}>
                            <>
                              <Box display="flex" flexWrap="wrap">
                                <Typography component="p" variant="body1">
                                  <Box component="span" fontWeight="fontWeightMedium">
                                    {t(`fields:${row.key}`)}
                                  </Box>
                                  {row.properties.required && (
                                    <Box component="span" className="mandatory">
                                      {t('fields:mandatory')}
                                    </Box>
                                  )}
                                </Typography>
                                <Tooltip title={t(`fields:help${row.key}`)} placement="top">
                                  <IconButton edge="end" size="small">
                                    <HelpCircle fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                              <FormikRadioGroup
                                row
                                aria-label="position"
                                name={row.key}
                                id={row.key}
                                defaultValue="top"
                              >
                                {row.options.map((opt) => {
                                  return (
                                    <FormControlLabel
                                      key={opt}
                                      value={opt}
                                      control={<Radio />}
                                      label={
                                        <Box
                                          style={{
                                            textTransform: 'capitalize',
                                          }}
                                          fontWeight="fontWeightMedium"
                                        >
                                          {t(opt)}
                                          {row.key === 'level' && (
                                            <Tooltip title={t(`helpOption${opt}`)} placement="top">
                                              <IconButton edge="end" size="small">
                                                <HelpCircle fontSize="small" />
                                              </IconButton>
                                            </Tooltip>
                                          )}
                                        </Box>
                                      }
                                      labelPlacement="end"
                                    />
                                  )
                                })}
                              </FormikRadioGroup>
                              <ErrorMessage name={row.key}>
                                {(msg) => (
                                  <span className="error" tabIndex={0}>
                                    {t(msg, { field: t(`fields:${row.key}`) })}
                                  </span>
                                )}
                              </ErrorMessage>
                            </>
                          </Grid>
                        )}
                        {row.type === 'CHECKBOX' && (
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            className="custom-checkbox"
                            display={{ xs: 'block', sm: 'block', md: 'flex' }}
                          >
                            <Box display="flex" alignItems="center" height="100%">
                              <FormControlLabel
                                control={
                                  <CheckboxWithGreenCheck
                                    onChange={(e) => {
                                      setFieldValue(`${row.key}`, e.target.checked)
                                    }}
                                    checked={values[row.key]}
                                    checkedIcon={<Check />}
                                    color="Primary"
                                    id={row.key}
                                    name={row.key}
                                  />
                                }
                                label={t(`fields:${row.key}`)}
                              />
                              <ErrorMessage name={row.key}>
                                {(msg) => (
                                  <span className="error" tabIndex={0}>
                                    {t(msg, { field: t(`fields:${row.key}`) })}
                                  </span>
                                )}
                              </ErrorMessage>
                            </Box>
                          </Grid>
                        )}
                      </>
                    )
                  })}
                </Grid>
                <Box
                  mt={{ xs: 3, sm: 3, md: 4 }}
                  display="flex"
                  alignItems="center"
                  justifyContent={{ xs: 'flex-start', sm: 'flex-start', md: 'flex-end' }}
                >
                  <Button
                    className="custom-default-button text-transform-none"
                    size="large"
                    variant="contained"
                    disableElevation
                    onClick={() => {
                      resetForm()
                    }}
                  >
                    {t('reset')}
                  </Button>
                  <Box ml={2}>
                    <Button
                      className="text-transform-none"
                      size="large"
                      type="submit"
                      variant="contained"
                      disableElevation
                      color="primary"
                      disabled={!isEmpty(errors) || !dirty}
                    >
                      {t('save')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Form>
        )
      }}
    </Formik>
  )
}
Configuration.propTypes = {
  fetchProcessorConfig: PropTypes.func,
  createTopicInitialState: PropTypes.object,
  formValues: PropTypes.object,
  processorList: PropTypes.array,
  processorInfo: PropTypes.object,
  processorConfig: PropTypes.array,
  updateTopic: PropTypes.func,
}

Configuration.defaultProps = {
  fetchProcessorConfig: () => {},
  createTopicInitialState: {},
  formValues: {},
  processorList: [],
  processorInfo: {},
  processorConfig: [],
  updateTopic: () => {},
}
export default Configuration
