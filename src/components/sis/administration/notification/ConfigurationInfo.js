import {
  Box,
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
import { Check, Eye, EyeOff, HelpCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { isEmpty } from '../../../../helpers/utils'
import FormikRadioGroup from '../../../common/formikComponents/FormikRadioGroup'
import useStyles from '../Administration.Style'

function ConfigurationInfo({
  processorList,
  createTopicInitialState,
  processorConfig,
  fetchProcessorConfig,
  formValues,
  processorCode,
}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const CheckboxWithGreenCheck = withStyles({})(Checkbox)
  const [passwordView, setPasswordView] = React.useState(false)
  const handleClickShowPassword = () => {
    setPasswordView(!passwordView)
  }

  return (
    <Box mb={2}>
      <Paper rounded={true} elevation={1} className="paper-round">
        <Formik
          onSubmit=""
          initialValues={createTopicInitialState.current}
          enableReinitialize={true}
        >
          {({ values, setFieldValue }) => {
            if (values.processor && values.processor !== processorCode.current) {
              fetchProcessorConfig(values.processor)
              processorCode.current = values.processor
              formValues.current = { ...values }
            }
            return (
              <Form className={classes.form} noValidate autoComplete="off">
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
                      <Box mt={1} mb={1}>
                        <Typography
                          component="p"
                          variant="body2"
                          color="textPrimary"
                          gutterBottom
                          tabIndex={0}
                        >
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
                              {t('fields:topicName')} ({t('fields:mandatory')}) (
                              {t('fields:helpIconTopicName')}
                            </span>
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Box mt={1} mb={1}>
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
                          select
                          className="custom-input-field"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title={t('fields:helpIconSelectProcessor')}
                                  placement="top"
                                >
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              {t('fields:processor')} ({t('fields:mandatory')}) (
                              {t('fields:helpIconSelectProcessor')}
                            </span>
                          }
                        >
                          {processorList.map((key) => (
                            <MenuItem value={key} key={key}>
                              {key}
                            </MenuItem>
                          ))}
                        </Field>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Box mt={1} mb={1}>
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
                              {t('fields:description')} ({t('fields:mandatory')}) (
                              {t('fields:helpIconDescription')}
                            </span>
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Box mb={2} className="custom-checkbox">
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
                                checked={values.is_active}
                                onChange={(e) => {
                                  setFieldValue('is_active', e.target.checked)
                                }}
                                checkedIcon={<Check />}
                                color="Primary"
                              />
                            }
                            label={t('fields:active')}
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} className="custom-checkbox">
                      <Box minWidth={{ xs: 'auto', sm: 'auto', md: '150px' }} align="left">
                        <FormControlLabel
                          control={
                            <CheckboxWithGreenCheck
                              checkedIcon={<Check />}
                              checked={values.keep_logs}
                              onChange={(e) => {
                                setFieldValue('keep_logs', e.target.checked)
                              }}
                              color="Primary"
                              id="keep_logs"
                              name="keep_logs"
                            />
                          }
                          label={t('fields:keepLogs')}
                        />
                      </Box>
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
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    {processorConfig.map((row) => {
                      return (
                        <>
                          {row.type === 'TEXT' && (
                            <Box mt={2} mb={2}>
                              <Typography
                                component="p"
                                variant="body2"
                                color="textPrimary"
                                gutterBottom
                              >
                                <Box component="span" fontWeight="600">
                                  {t(row.key)}
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
                                  row.key !== 'password'
                                    ? 'text'
                                    : passwordView
                                    ? 'text'
                                    : 'password'
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
                                      <Tooltip title={t(`help${row.key}`)} placement="top">
                                        <IconButton edge="end" size="small">
                                          <HelpCircle className="help-icon" />
                                        </IconButton>
                                      </Tooltip>
                                    ) : (
                                      <InputAdornment position="end">
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={handleClickShowPassword}
                                          edge="end"
                                        >
                                          {passwordView ? (
                                            <Eye className="help-icon" />
                                          ) : (
                                            <EyeOff className="help-icon" />
                                          )}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                }}
                                label={
                                  <span style={visuallyHidden}>
                                    {t(row.key)} ({t('fields:mandatory')}) ({t(`help${row.key}`)}
                                  </span>
                                }
                              />
                              <ErrorMessage name={row.key}>
                                {(msg) => (
                                  <span className="error" tabIndex={0}>
                                    {t(msg, { field: t(row.key) })}
                                  </span>
                                )}
                              </ErrorMessage>
                            </Box>
                          )}
                          {row.type === 'RADIO' && (
                            <Box item xs={12} md={6}>
                              <>
                                <Box display="flex" flexWrap="wrap">
                                  <Typography component="p" variant="body1">
                                    <Box component="span" fontWeight="fontWeightMedium">
                                      {t(`ne_${row.key}`)}
                                    </Box>
                                    {row.properties.required && (
                                      <Box component="span" className="mandatory">
                                        {t('fields:mandatory')}
                                      </Box>
                                    )}
                                  </Typography>
                                  <Tooltip title={t(`ne_help${row.key}`)} placement="top">
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
                                        control={
                                          <CheckboxWithGreenCheck
                                            color="primary"
                                            component={Radio}
                                          />
                                        }
                                        label={
                                          <Box
                                            style={{
                                              textTransform: 'capitalize',
                                            }}
                                            fontWeight="fontWeightMedium"
                                          >
                                            {t(opt)}
                                            {row.key === 'level' && (
                                              <Tooltip
                                                title={t(`ne_helpOption${opt}`)}
                                                placement="top"
                                              >
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
                                      {t(msg, { field: t(row.key) })}
                                    </span>
                                  )}
                                </ErrorMessage>
                              </>
                            </Box>
                          )}
                          {row.type === 'CHECKBOX' && (
                            <Box
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
                                  label={t(`${row.key}`)}
                                />
                                <ErrorMessage name={row.key}>
                                  {(msg) => (
                                    <span className="error" tabIndex={0}>
                                      {t(msg, { field: t(row.key) })}
                                    </span>
                                  )}
                                </ErrorMessage>
                              </Box>
                            </Box>
                          )}
                        </>
                      )
                    })}
                  </Grid>
                </Box>
              </Form>
            )
          }}
        </Formik>
      </Paper>
    </Box>
  )
}
ConfigurationInfo.propTypes = {
  fetchProcessorConfig: PropTypes.func,
  createTopicInitialState: PropTypes.object,
  formValues: PropTypes.object,
  processorList: PropTypes.array,
  processorConfig: PropTypes.array,
  processorCode: PropTypes.object,
}

ConfigurationInfo.defaultProps = {
  fetchProcessorConfig: () => {},
  createTopicInitialState: {},
  formValues: {},
  processorList: [],
  processorConfig: [],
  processorCode: {},
}

export default ConfigurationInfo
