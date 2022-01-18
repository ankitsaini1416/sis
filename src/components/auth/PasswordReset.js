import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { ArrowRight } from 'react-feather'
import { useTranslation } from 'react-i18next'

import ExcelLogo from '../../assets/images/excell-education-logo.png'
import AppLogo from '../../assets/images/learnstage-logo.png'
import useStyles from './Auth.Style'

const initialState = { accountId: '', username: '', password: '' }

function PasswordReset() {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={{ xs: 'flex-start', sm: 'flex-start', md: 'center' }}
      minHeight="100%"
      className="app-surface"
      flexDirection="column"
    >
      <Box
        width="100%"
        flexGrow={0}
        display="flex"
        alignItems="center"
        justifyContent={{ xs: 'center', md: 'flex-start' }}
        flexDirection="row"
        px={3}
        py={2}
      >
        <Box>
          <img src={ExcelLogo} alt={t('schoolLogo')} />
        </Box>
      </Box>
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        justifyContent="center"
        px={{ xs: 2, sm: 3, lg: 5 }}
        flexGrow={2}
      >
        <Box p={4} className={classes.authForm + ' login-form-panel'}>
          <Typography
            tabIndex={0}
            component="h1"
            align="center"
            variant="h4"
            color="textPrimary"
            gutterBottom
          >
            <Box component="span" fontWeight="fontWeightBold" fontSize="36px">
              {t('passwordReset')}
            </Box>
          </Typography>
          <Typography
            tabIndex={0}
            component="h4"
            align="center"
            variant="h5"
            color="textPrimary"
            gutterBottom
          >
            <Box component="span" fontWeight="fontWeightMedium" fontSize="18px">
              {t('createPassword')}
            </Box>
          </Typography>
          <Formik initialValues={initialState} onSubmit="">
            {() => (
              <Form className={classes.form} noValidate autoComplete="off">
                <Box mb={2} mt={2}>
                  <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="fontWeightMedium">
                      {t('newPassword')}
                    </Box>
                    <Box component="span" className="mandatory">
                      {t('mandatory')}
                    </Box>
                  </Typography>
                  <Field
                    className="custom-input-field"
                    name="new-password"
                    as={TextField}
                    fullWidth
                    size="small"
                    id="new-password"
                    autoComplete="off"
                    variant="outlined"
                    type="password"
                    label={
                      <span style={visuallyHidden}>
                        ({t('fields:newPassword')}) ({t('fields:required')}) (
                      </span>
                    }
                  />
                  <ErrorMessage name="new-password">
                    {(msg) => (
                      <span tabIndex={0} className="error">
                        {t(msg, { field: t('field:newPassword') })}
                      </span>
                    )}
                  </ErrorMessage>
                </Box>
                <Box mb={2} mt={2}>
                  <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="fontWeightMedium">
                      {t('confirmPassword')}
                    </Box>
                    <Box component="span" className="mandatory">
                      {t('mandatory')}
                    </Box>
                  </Typography>
                  <Field
                    className="custom-input-field"
                    name="confirm-password"
                    as={TextField}
                    fullWidth
                    size="small"
                    id="confirm-password"
                    autoComplete="off"
                    variant="outlined"
                    type="password"
                    label={
                      <span style={visuallyHidden}>
                        ({t('fields:confirmPassword')}) ({t('fields:required')}) (
                      </span>
                    }
                  />
                  <ErrorMessage name="confirm-password">
                    {(msg) => (
                      <span tabIndex={0} className="error">
                        {t(msg, { field: t('field:confirmPassword') })}
                      </span>
                    )}
                  </ErrorMessage>
                </Box>
                <Box mb={6}>
                  <Button
                    size="large"
                    fullWidth
                    variant="contained"
                    disableElevation
                    color="primary"
                    endIcon={<ArrowRight />}
                    aria-label={t('submit')}
                  >
                    {t('submit')}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          <Typography
            tabIndex={0}
            align="center"
            component="p"
            variant="body2"
            color="textSecondary"
          >
            {t('copyright', {
              year: t(new Date().getFullYear()),
            })}
          </Typography>
        </Box>
      </Box>
      <Box
        px={3}
        py={2}
        width="100%"
        flexGrow={0}
        display="flex"
        alignItems="center"
        justifyContent={{ xs: 'center', md: 'flex-end' }}
      >
        <img src={AppLogo} alt={t('appName')} />
      </Box>
    </Box>
  )
}

export default PasswordReset
