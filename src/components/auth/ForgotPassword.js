import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowRight } from 'react-feather'
import { useTranslation } from 'react-i18next'

import ExcelLogo from '../../assets/images/excell-education-logo.png'
import AppLogo from '../../assets/images/learnstage-logo.png'
import { AGMSchema } from './../../../clientFiles/validations'
import { isEmpty } from './../../helpers/utils'
import RedirectLink from './../common/RedirectLink'
import useStyles from './Auth.Style'

const initialState = { username: '' }

function ForgotPassword({ forgotPassword }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const onSubmit = (values, { setErrors }) => {
    forgotPassword(values, { setErrors })
  }
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
              {t('forgotYourPassword')}
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
              {t('forgotPasswordEmail')}
            </Box>
          </Typography>
          <Formik
            initialValues={initialState}
            validationSchema={AGMSchema.forgotPassword}
            onSubmit={onSubmit}
          >
            {({ errors, dirty }) => (
              <Form className={classes.form} noValidate autoComplete="off">
                {/* <Box mb={2} mt={2}>
                  <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="fontWeightMedium">
                      {t('accountId')}
                    </Box>
                    <Box component="span" className="mandatory">
                      {t('mandatory')}
                    </Box>
                  </Typography>
                  <Field
                    className="custom-input-field"
                    name="account_id"
                    as={TextField}
                    fullWidth
                    size="small"
                    id="account_id"
                    autoComplete="off"
                    variant="outlined"
                  />
                  <ErrorMessage name="account_id">
                    {msg => (
                      <span className="error">{t(msg, { field: t('field:accountId') })}</span>
                    )}
                  </ErrorMessage>
                </Box> */}
                <Box mb={2}>
                  <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="fontWeightMedium">
                      {t('fields:loginUserName')}
                    </Box>
                    <Box component="span" className="mandatory">
                      {t('mandatory')}
                    </Box>
                  </Typography>
                  <Field
                    className="custom-input-field"
                    name="username"
                    as={TextField}
                    fullWidth
                    size="small"
                    id="username"
                    autoComplete="off"
                    variant="outlined"
                    label={
                      <span style={visuallyHidden}>
                        ({t('fields:loginUserName')}) ({t('fields:required')}) (
                      </span>
                    }
                  />
                  <ErrorMessage name="username">
                    {(msg) => (
                      <span tabIndex={0} className="error">
                        {t(msg, { field: t('field:username') })}
                      </span>
                    )}
                  </ErrorMessage>
                </Box>
                <Box mb={2}>
                  <Button
                    size="large"
                    fullWidth
                    variant="contained"
                    disableElevation
                    color="primary"
                    type="submit"
                    disabled={!dirty || !isEmpty(errors)}
                    endIcon={<ArrowRight />}
                    aria-label={t('submit')}
                  >
                    {t('submit')}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
          <Box
            mt={2}
            mb={4}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Typography component="h4" variant="body2" color="primary">
              <Box component="span" fontWeight="fontWeightMedium">
                <RedirectLink to="/login">{t('backToLogin')}</RedirectLink>
              </Box>
            </Typography>
          </Box>

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

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func,
}

ForgotPassword.defaultProps = {
  forgotPassword: () => {},
}

export default ForgotPassword
