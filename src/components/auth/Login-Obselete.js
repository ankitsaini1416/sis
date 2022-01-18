import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { ArrowRight, Eye, EyeOff } from 'react-feather'
import { useTranslation } from 'react-i18next'

import ExcelLogo from '../../assets/images/excell-education-logo.png'
import AppLogo from '../../assets/images/learnstage-logo.png'
import { AGMSchema } from './../../../clientFiles/validations'
import { ADMIN_TYPES, ROUTES } from './../../helpers/constants'
import { isEmpty } from './../../helpers/utils'
import RedirectLink from './../common/RedirectLink'
import useStyles from './Auth.Style'

function Login({ login, adminType }) {
  const classes = useStyles()
  const [initialState, setInitialState] = useState({
    username: '',
    password: '',
  })
  useEffect(() => {
    if (adminType === ADMIN_TYPES.MASTER_ADMIN) {
      setInitialState({
        account_id: '',
        username: '',
        password: '',
      })
    }
  }, [adminType])
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = React.useState(false)
  const onSubmit = (values, { setErrors }) => {
    login(values, { setErrors })
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
              {t('welcome')}
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
            <Box component="span" fontWeight="fontWeightMedium" fontSize="24px">
              {t('loginAccount')}
            </Box>
          </Typography>
          <Formik
            initialValues={initialState}
            validationSchema={
              adminType === ADMIN_TYPES.MASTER_ADMIN ? AGMSchema.loginMaster : AGMSchema.login
            }
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {({ errors, dirty }) => {
              return (
                <Form className={classes.form} noValidate autoComplete="off">
                  {adminType === ADMIN_TYPES.MASTER_ADMIN && (
                    <Box mt={2} mb={2}>
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
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="account_id"
                        autoFocus
                        autoComplete="accountId"
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:accountId')}) ({t('fields:required')}) (
                          </span>
                        }
                      />
                      <ErrorMessage name="account_id">
                        {(msg) => (
                          <span tabIndex={0} className="error">
                            {t(msg, { field: t('fields:accountId') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Box>
                  )}

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
                          {t(msg, { field: t('fields:username') })}
                        </span>
                      )}
                    </ErrorMessage>
                  </Box>
                  <Box mb={2}>
                    <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                      <Box component="span" fontWeight="fontWeightMedium">
                        {t('loginPassword')}
                      </Box>
                      <Box component="span" className="mandatory">
                        {t('mandatory')}
                      </Box>
                    </Typography>

                    <Field
                      className="custom-input-field"
                      name="password"
                      as={TextField}
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="password"
                      InputProps={{
                        // <-- This is where the toggle button is added.
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(true)}
                              onMouseDown={() => setShowPassword(false)}
                            >
                              {showPassword ? <Eye /> : <EyeOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      label={
                        <span style={visuallyHidden}>
                          ({t('fields:loginPassword')}) ({t('fields:required')}) (
                        </span>
                      }
                    />
                    <ErrorMessage name="password">
                      {(msg) => (
                        <span tabIndex={0} className="error">
                          {t(msg, { field: t('fields:password') })}
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
                      endIcon={<ArrowRight />}
                      type="submit"
                      disabled={!dirty || !isEmpty(errors)}
                      aria-label={t('login')}
                    >
                      {t('login')}
                    </Button>
                  </Box>
                </Form>
              )
            }}
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
                <RedirectLink to={ROUTES.FORGOTPASSWORD}>{t('forgotPassword')} </RedirectLink>
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

Login.propTypes = {
  login: PropTypes.func,
  adminType: PropTypes.string,
}

Login.defaultProps = {
  login: () => {},
  adminType: '',
}

export default Login
