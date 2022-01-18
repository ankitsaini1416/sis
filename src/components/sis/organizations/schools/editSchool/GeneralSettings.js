import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
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

import { CoreSchema } from '../../../../../../clientFiles/validations'
import { isEmpty } from '../../../../../helpers/utils'
import useStyles from '../../Organizations.Style'
import { themes } from './../../../../../helpers/stub'

const CheckboxWithGreenCheck = withStyles({})(Checkbox)
function GeneralSettings({ addUpdateGeneralSetting, generalSetting }) {
  const { t } = useTranslation()
  const classes = useStyles()
  const history = useHistory()
  const options = []
  for (let i = 10; i < 31; i += 1) options.push(i)

  const onSubmit = function (values, { setErrors }) {
    addUpdateGeneralSetting(values, { setErrors })
  }

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={generalSetting}
      enableReinitialize={true}
      validationSchema={CoreSchema.schoolGeneralSetting}
    >
      {({ values, setFieldValue, dirty, errors }) => (
        <Form className={classes.form} noValidate autoComplete="off">
          <Grid container justify="space-between" alignItems="flex-start">
            <Grid item xs={12} lg={9} xl={9}>
              <Box mt={{ lg: 1.5, xs: 0 }} className="custom-checkbox">
                <Typography
                  tabIndex={0}
                  component="p"
                  align="left"
                  variant="body2"
                  color="textPrimary"
                >
                  <Box component="span" fontWeight="600" fontSize="16px">
                    {t('applicationSettings')}
                  </Box>
                </Typography>
              </Box>
              <Box mt={3} className="custom-checkbox">
                <FormControlLabel
                  control={
                    <CheckboxWithGreenCheck
                      checked={values.student_approval_required}
                      onChange={(e) => {
                        setFieldValue('student_approval_required', e.target.checked)
                      }}
                      value="checkedA"
                      checkedIcon={<Check aria-label={t('newApplicationEnable')} />}
                      color="primary"
                    />
                  }
                  label={t('fields:newApplicationEnable')}
                />
              </Box>

              <Box mt={3}>
                <Typography component="p" align="left" variant="body2" color="textPrimary">
                  <Box component="span" fontWeight="500" fontSize="16px">
                    {t('ageCriteria')}
                  </Box>
                </Typography>
                <Box mt={3} display="flex" alignItems="center">
                  <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="600">
                      {t('fields:selectAge')}
                    </Box>
                  </Typography>
                  <Box width="80px" ml={2}>
                    <Field
                      className="custom-input-field"
                      name="student_age_for_parent_info"
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      size="small"
                      id="student_age_for_parent_info"
                      select
                      label={
                        <span style={visuallyHidden}>
                          ({t('ageCriteria')}) ({t('fields:selectAge')})
                        </span>
                      }
                    >
                      {options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Field>
                  </Box>
                </Box>
              </Box>

              <Box mt={3} className="custom-checkbox">
                <FormControlLabel
                  control={
                    <CheckboxWithGreenCheck
                      checked={values.enable_essay}
                      onChange={(e) => {
                        setFieldValue('enable_essay', e.target.checked)
                      }}
                      value="checkedA"
                      checkedIcon={<Check aria-label={t('fields:enableEssay')} />}
                      color="primary"
                      name="enable_essay"
                    />
                  }
                  label={t('fields:enableEssay')}
                />
              </Box>
              {values.enable_essay && (
                <Box mt={3}>
                  <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="600">
                      {t('fields:essayQuestion')}
                    </Box>
                  </Typography>
                  <Box width={{ xs: '100%', md: '500px' }} mt={1}>
                    <Field
                      className="custom-input-field"
                      name="essay_question"
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      size="small"
                      id="essay_question"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title={t('fields:essayQuestionHelp')} placement="top">
                              <HelpCircle className="help-icon" />
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      label={<span style={visuallyHidden}>({t('fields:essayQuestion')})</span>}
                    />
                  </Box>
                </Box>
              )}
              <Box mt={3}>
                <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                  <Box component="span" fontWeight="600">
                    {t('fields:paymentEnrollment')}
                  </Box>
                </Typography>
                <Box width={{ xs: '100%', md: '500px' }}>
                  <Field
                    className="custom-input-field"
                    name="payment_days"
                    as={TextField}
                    type="number"
                    variant="outlined"
                    fullWidth
                    size="small"
                    id="payment_days"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={t('fields:paymentEnrollmentHelp')} placement="top">
                            <HelpCircle className="help-icon" />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    label={
                      <span style={visuallyHidden}>
                        ({t('fields:paymentEnrollment')}) ({t('fields:paymentEnrollmentHelp')})
                      </span>
                    }
                  />
                  <ErrorMessage name="payment_days">
                    {(msg) => (
                      <span tabIndex={0} className="error">
                        {t(msg, { field: t('fields:paymentEnrollmentDays') })}
                      </span>
                    )}
                  </ErrorMessage>
                </Box>
              </Box>

              <Box mt={3} className="custom-checkbox">
                <Box mt={3} display="flex" alignItems="center">
                  <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="600">
                      {t('fields:theme')}
                    </Box>
                  </Typography>
                  <Box width="120px" ml={2}>
                    <Field
                      className="custom-input-field"
                      name="school_theme"
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      size="small"
                      id="school_theme"
                      select
                      label={<span style={visuallyHidden}>({t('fields:themeSelect')})</span>}
                    >
                      {themes.map((theme) => (
                        <MenuItem value={theme.id} key={theme.id}>
                          {theme.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </Box>
                </Box>
              </Box>
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
                    type="submit"
                    variant="contained"
                    disableElevation
                    color="primary"
                    disabled={!dirty || !isEmpty(errors)}
                  >
                    {t('save')}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

GeneralSettings.propTypes = {
  addUpdateGeneralSetting: PropTypes.func,
  generalSetting: PropTypes.object,
}

GeneralSettings.defaultProps = {
  addUpdateGeneralSetting: () => {},
  generalSetting: {},
}
export default GeneralSettings
