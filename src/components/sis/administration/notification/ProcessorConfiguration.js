import { Box, Checkbox, FormControlLabel, IconButton, Radio } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { Check, Eye, EyeOff, HelpCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'

import FormikRadioGroup from '../../../common/formikComponents/FormikRadioGroup'

function ProcessorConfiguration({ processorConfig, setFieldValue, values }) {
  const { t } = useTranslation()
  const CheckboxWithGreenCheck = withStyles({})(Checkbox)
  const [passwordView, setPasswordView] = React.useState(false)
  const handleClickShowPassword = () => {
    setPasswordView(!passwordView)
  }

  return (
    <Box width="100%">
      <Typography component="h1" align="left" variant="h4" color="textPrimary">
        <Box component="span" fontWeight="fontWeightMedium" fontSize="24px">
          {t('processorConfiguration')}
        </Box>
      </Typography>
      <Typography component="h6" align="left" variant="subtitle2" color="Primary" gutterBottom>
        <Box component="span" fontWeight="600">
          {t('enterProcessorConfigurationOfUser')}
        </Box>
      </Typography>

      <Box mt={3} width="100%">
        {processorConfig.map((row, index) => {
          return (
            <>
              {row.type === 'TEXT' && (
                <Box mt={2} mb={2}>
                  <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="600">
                      {t(`${row.key}`)}
                    </Box>
                  </Typography>
                  <Field
                    className="custom-input-field"
                    id={row.key}
                    type={row.key !== 'password' ? 'text' : passwordView ? 'text' : 'password'}
                    name={row.key}
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    size="small"
                    autoFocus={index === 0}
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
                        ({t(`${row.key}`)}) {t(`help${row.key}`)}
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
                          <Typography component="span" color="secondary">
                            *
                          </Typography>
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
                            control={<CheckboxWithGreenCheck color="primary" component={Radio} />}
                            label={
                              <Box
                                style={{
                                  textTransform: 'capitalize',
                                }}
                                fontWeight="fontWeightMedium"
                              >
                                {t(opt)}
                                {row.key === 'level' && (
                                  <Tooltip title={t(`ne_helpOption${opt}`)} placement="top">
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
                  mb={2}
                  className="custom-checkbox"
                  display={{ xs: 'block', sm: 'block', md: 'flex' }}
                >
                  <Box display="flex" alignItems="center" height="100%">
                    <FormControlLabel
                      control={
                        <CheckboxWithGreenCheck
                          checked={values[row.key]}
                          onChange={(e) => {
                            setFieldValue(`${row.key}`, e.target.checked)
                          }}
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
      </Box>
    </Box>
  )
}
ProcessorConfiguration.propTypes = {
  processorConfig: PropTypes.array,
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
}

ProcessorConfiguration.defaultProps = {
  processorConfig: [],
  setFieldValue: () => {},
  values: {},
}
export default ProcessorConfiguration
