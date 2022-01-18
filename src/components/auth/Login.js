import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { visuallyHidden } from '@mui/utils'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { ArrowRight } from 'react-feather'
import { useTranslation } from 'react-i18next'

import ExcelLogo from '../../assets/images/excell-education-logo.png'
import AppLogo from '../../assets/images/learnstage-logo.png'
//import { ROUTES } from './../../helpers/constants'
import { isEmpty } from './../../helpers/utils'
//import RedirectLink from './../common/RedirectLink'
import useStyles from './Auth.Style'

function Login({ login }) {
  const classes = useStyles()
  const [initialState, setInitialState] = useState()
  const { t } = useTranslation()
  const onSubmit = () => {
    login(initialState)
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
          <Box mt={2} mb={2} width="100%">
            <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
              <Box component="span" fontWeight="fontWeightMedium">
                {t('accountId')}
              </Box>
              <Box component="span" className="mandatory">
                {t('mandatory')}
              </Box>
            </Typography>
            <TextField
              className="custom-input-field"
              name="account_id"
              value={initialState}
              onChange={(e) => setInitialState(e.target.value)}
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
          </Box>
          <Box mt={1} mb={2} width="100%">
            <Button
              className="text-transform-none"
              size="large"
              fullWidth
              variant="contained"
              disableElevation
              color="primary"
              endIcon={<ArrowRight />}
              onClick={onSubmit}
              disabled={isEmpty(initialState)}
              aria-label={t('proceed')}
            >
              {t('proceed')}
            </Button>
          </Box>
          <Box
            mt={2}
            mb={4}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            {/*<Typography component="h4" variant="body2" color="primary">
              <Box component="span" fontWeight="fontWeightMedium">
                <RedirectLink to={ROUTES.FORGOTPASSWORD}>{t('forgotPassword')} </RedirectLink>
              </Box>
            </Typography>*/}
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
