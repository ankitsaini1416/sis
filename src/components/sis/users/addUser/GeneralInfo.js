import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowRight, HelpCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'

import useStyles from '../User.Style'
import { AGMSchema } from './../../../../../clientFiles/validations'
import { mapWithState } from './../../../../helpers/utils'

const initialState = {
  email: '',
  first_name: '',
  last_name: '',
  username: '',
}

function GeneralInfo({ toggleUserPayload, userPayload, handleBack }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const onSubmit = function (values) {
    toggleUserPayload(values)
  }
  return (
    <Formik
      initialValues={mapWithState(initialState, userPayload)}
      onSubmit={onSubmit}
      enableReinitialize={true}
      validationSchema={AGMSchema.createNewUserSchema}
    >
      {() => (
        <Form className={classes.form} noValidate autoComplete="off">
          <Box width="100%">
            <Typography component="h1" align="left" variant="h4" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="fontWeightMedium" fontSize="24px">
                {t('generalInformation')}
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
                {t('enterGeneralInformationOfUser')}
              </Box>
            </Typography>

            <Box mt={3} width="100%">
              <Box mt={2} mb={2}>
                <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                  <Box component="span" fontWeight="600">
                    {t('fields:loginUserName')}
                  </Box>
                  <Box component="span" className="mandatory">
                    {t('fields:mandatory')}
                  </Box>
                </Typography>
                <Field
                  className="custom-input-field"
                  name="username"
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  size="small"
                  id="username"
                  autoFocus
                  autoComplete="username"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title={t('fields:helpIconUserName')} placement="top">
                          <HelpCircle className="help-icon" />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  label={
                    <span style={visuallyHidden}>
                      ({t('fields:loginUserName')}) ({t('fields:mandatory')}) (
                      {t('fields:helpIconUserName')})
                    </span>
                  }
                />
                <ErrorMessage name="username">
                  {(msg) => (
                    <span className="error" tabIndex={0}>
                      {t(msg, { field: t('fields:loginUserName') })}
                    </span>
                  )}
                </ErrorMessage>
              </Box>
              <Box mb={2}>
                <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                  <Box component="span" fontWeight="600">
                    {t('fields:firstName')}
                  </Box>
                  <Box component="span" className="mandatory">
                    {t('fields:mandatory')}
                  </Box>
                </Typography>
                <Field
                  className="custom-input-field"
                  name="first_name"
                  as={TextField}
                  fullWidth
                  size="small"
                  id="first_name"
                  autoComplete="off"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title={t('fields:helpIconFirstName')} placement="top">
                          <HelpCircle className="help-icon" />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  label={
                    <span style={visuallyHidden}>
                      ({t('fields:firstName')}) ({t('fields:mandatory')}) (
                      {t('fields:helpIconFirstName')})
                    </span>
                  }
                />
                <ErrorMessage name="first_name">
                  {(msg) => (
                    <span className="error" tabIndex={0}>
                      {t(msg, { field: t('fields:firstName') })}
                    </span>
                  )}
                </ErrorMessage>
              </Box>
              <Box mb={2}>
                <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                  <Box component="span" fontWeight="600">
                    {t('fields:lastName')}
                  </Box>
                  <Box component="span" className="mandatory">
                    {t('fields:mandatory')}
                  </Box>
                </Typography>

                <Field
                  className="custom-input-field"
                  name="last_name"
                  as={TextField}
                  autoComplete="last_name"
                  fullWidth
                  size="small"
                  variant="outlined"
                  id="last_name"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title={t('fields:helpIconLastName')} placement="top">
                          <HelpCircle className="help-icon" />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  label={
                    <span style={visuallyHidden}>
                      ({t('fields:lastName')}) ({t('fields:mandatory')}) (
                      {t('fields:helpIconLastName')})
                    </span>
                  }
                />
                <ErrorMessage name="last_name">
                  {(msg) => (
                    <span className="error" tabIndex={0}>
                      {t(msg, { field: t('fields:lastName') })}
                    </span>
                  )}
                </ErrorMessage>
              </Box>
              <Box mb={2}>
                <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                  <Box component="span" fontWeight="600">
                    {t('fields:emailAddress')}
                  </Box>
                  <Box component="span" className="mandatory">
                    {t('fields:mandatory')}
                  </Box>
                </Typography>

                <Field
                  className="custom-input-field"
                  name="email"
                  as={TextField}
                  autoComplete="current-password"
                  fullWidth
                  size="small"
                  variant="outlined"
                  id="email"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title={t('fields:helpIconEmailAddress')} placement="top">
                          <HelpCircle className="help-icon" />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  label={
                    <span style={visuallyHidden}>
                      ({t('fields:emailAddress')}) ({t('fields:mandatory')}) (
                      {t('fields:helpIconEmailAddress')})
                    </span>
                  }
                />
                <ErrorMessage name="email">
                  {(msg) => (
                    <span className="error" tabIndex={0}>
                      {t(msg, { field: t('fields:emailAddress') })}
                    </span>
                  )}
                </ErrorMessage>
              </Box>
            </Box>
          </Box>
          <Box pt={{ xs: 3, sm: 4 }} pb={3} display="flex" justifyContent="flex-end">
            <Box mr={2}>
              <Button
                onClick={handleBack}
                className="custom-default-button text-transform-none"
                size="large"
                variant="contained"
                disableElevation
              >
                {t('previous')}
              </Button>
            </Box>
            <Box>
              <Button
                classes="text-transform-none"
                variant="contained"
                color="primary"
                disableElevation
                type="submit"
                className="text-transform-none"
                size="large"
                endIcon={<ArrowRight />}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

GeneralInfo.propTypes = {
  toggleUserPayload: PropTypes.func,
  userPayload: PropTypes.object,
  handleBack: PropTypes.func,
}

GeneralInfo.defaultProps = {
  toggleUserPayload: () => {},
  userPayload: {},
  handleBack: () => {},
}

export default GeneralInfo
