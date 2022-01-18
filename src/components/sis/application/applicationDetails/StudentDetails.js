import { Box, Button, CircularProgress, Grid, Switch, Tooltip, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import { Edit2, LogIn, MessageCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'

import UploadImg from '../../../../assets/images/upload.png'
import { getFullName, isNullOrEmpty } from '../../../../helpers/utils'

function CircularProgressWithLabel(props) {
  return (
    <Box top={0} left={0} position="absolute" display="inline-flex" className="profile-circle">
      <CircularProgress
        variant="determinate"
        thickness={1.5}
        {...props}
        style={{ height: '140px', width: '140px', transform: 'rotate(90deg)' }}
      />
      <Box
        top={0}
        left={0}
        bottom={-5}
        right={0}
        position="absolute"
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
}

function Permission({ details, toggleEditGeneralInfo }) {
  const EnhanchedSwitch = withStyles({})(Switch)
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }
  const { t } = useTranslation()
  return (
    <Box px={{ xs: 2, md: 0 }} pt={{ xs: 2, md: 0 }} pb={{ xs: 2, sm: 3, lg: 4 }}>
      <Box mb={2}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs="auto">
            <Typography tabIndex={0} component="h4" align="left" variant="h5" color="textPrimary">
              <Box fontWeight="600" fontSize="16px">
                {t('generalInformation')}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs="auto">
            <Button
              className="text-transform-none"
              size="large"
              variant="contained"
              disableElevation
              startIcon={<Edit2 width={16} height={16} />}
              onClick={toggleEditGeneralInfo}
              color="primary"
            >
              {t('edit')}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Grid container>
        <Grid item xs={12} xl={4}>
          <Box
            p={3}
            mr={{ xs: 0, xl: 5 }}
            className="profileSection"
            mb={{ xs: 3, xl: 0 }}
            display="flex"
            alignItems="center"
            justifyContent={{ xs: 'center', sm: 'flex-start', xl: 'center' }}
            flexDirection={{ xs: 'column', sm: 'row', xl: 'column' }}
          >
            <Box align="center" position="relative" className="user-profile-progress">
              <CircularProgressWithLabel value={details.profileCompletePercentage || 0} />
              <img
                src={details.avatar || UploadImg}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = UploadImg
                }}
                alt="Filter"
              />
            </Box>

            <Box
              display="flex"
              alignItems={{ xs: 'center', sm: 'flex-start', xl: 'center' }}
              justifyContent={{ xs: 'center', sm: 'flex-start', xl: 'center' }}
              flexDirection={{ xs: 'column', sm: 'column', xl: 'column' }}
              ml={{ xs: 0, sm: 3, xl: 0 }}
              mt={{ xs: 3, sm: 0, xl: 3 }}
              width={{ xs: '100%', sm: 'auto' }}
            >
              <Typography tabIndex={0} component="h1" variant="h5" color="textPrimary">
                <Box component="span" fontWeight="500">
                  ({getFullName(details) ? getFullName(details) : ''})
                </Box>
              </Typography>
              <Box
                mt={2}
                flexDirection={{ xs: 'column', sm: 'row' }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
              >
                <Button
                  className="text-transform-none custom-default-button"
                  variant="contained"
                  color="primary"
                  disableElevation
                  startIcon={<LogIn width="18px" />}
                  disabled
                >
                  {t('loginAsStudent')}
                </Button>

                <Box mt={{ xs: 1, sm: 0, xl: 0 }} ml={{ xs: 0, sm: 2, xl: 2 }}>
                  <Button
                    className="text-transform-none custom-default-button"
                    variant="contained"
                    color="primary"
                    disableElevation
                    startIcon={<MessageCircle width="18px" />}
                    disabled
                  >
                    {t('chat')}
                  </Button>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent={{ xs: 'flex-start', xl: 'space-between' }}
                alignItems="center"
                mt={2}
              >
                <Box
                  tabIndex={0}
                  mr={{ xs: 2, xl: 0 }}
                  component="span"
                  fontWeight="600"
                  fontSize="14px"
                >
                  {t('lockProfile')}
                </Box>
                <EnhanchedSwitch
                  color="primary"
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  className="custom-switch"
                  disabled
                />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} xl={8}>
          <Box mb={4} width="100%">
            <Typography
              tabIndex={0}
              component=""
              align="left"
              variant="body2"
              color="primary"
              className="bg-color-surface"
              gutterBottom
            >
              <Box component="span" fontWeight="600" fontSize="16px">
                {t('personalDetails')}
              </Box>
            </Typography>
            <Box mb={4} mt={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('prefix')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details.prefix ? (
                        details.prefix
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('firstName')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details.first_name ? (
                        details.first_name
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('middleName')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details.middle_name ? (
                        details.middle_name
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('lastName')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details.last_name ? (
                        details.last_name
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('suffix')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details.suffix ? (
                        details.suffix
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('preferredName')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details.nick_name ? (
                        details.nick_name
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('dateOfBirth')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details.dobLabel ? (
                        details.dobLabel
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('gender')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details.gender ? (
                        details.gender
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('ethnicity')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details.ethnicity ? (
                        details.ethnicity
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box mb={4} width="100%">
              <Typography
                tabIndex={0}
                component=""
                align="left"
                variant="body2"
                color="primary"
                className="bg-color-surface"
                gutterBottom
              >
                <Box component="span" fontWeight="600" fontSize="16px">
                  {t('contactDetails')}
                </Box>
              </Typography>
              <Box mt={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('addressLine1')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.address?.adr_address1 ? (
                          details.address?.adr_address1
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('addressLine2')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.address?.adr_address2 ? (
                          details.address?.adr_address2
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('Country')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.address?.adr_country_name ? (
                          details.address?.adr_country_name
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('state')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.address?.adr_state_name || details.address?.adr_state_iso ? (
                          isNullOrEmpty(details.address?.adr_state_name) ? (
                            details.address?.adr_state_iso
                          ) : (
                            details.address?.adr_state_name
                          )
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('city')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.address?.adr_city ? (
                          details.address?.adr_city
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('postalCodeZip')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.address?.adr_zipcode ? (
                          details.address?.adr_zipcode
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('email')}
                      </Box>
                    </Typography>
                    <Typography
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.address?.adr_email ? (
                          <Tooltip title={details.address?.adr_email}>
                            <a
                              className="link-color-text text-ellipsis"
                              href={`mailto:${details.address?.adr_email}`}
                            >
                              {details.address?.adr_email}
                            </a>
                          </Tooltip>
                        ) : (
                          <Box tabIndex={0} className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('phoneNumber')}
                      </Box>
                    </Typography>
                    <Typography
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.address?.adr_mobile ? (
                          <a
                            className="link-color-text"
                            href={`tel:${details.address?.adr_mobile_prefix}${details.address?.adr_mobile}`}
                          >
                            ({details.address?.adr_mobile_prefix}){details.address?.adr_mobile}
                          </a>
                        ) : (
                          <Box tabIndex={0} className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('homePhoneNumber')}
                      </Box>
                    </Typography>
                    <Typography
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.address?.adr_phone ? (
                          <a
                            className="link-color-text"
                            href={`tel:${details.address?.adr_phone_prefix}${details.address?.adr_phone}`}
                          >
                            ({details.address?.adr_phone_prefix}){details.address?.adr_phone}
                          </a>
                        ) : (
                          <Box tabIndex={0} className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            <Box mb={4} width="100%">
              <Typography
                tabIndex={0}
                component=""
                align="left"
                variant="body2"
                color="primary"
                className="bg-color-surface"
                gutterBottom
              >
                <Box component="span" fontWeight="600" fontSize="16px">
                  {t('otherInfo')}
                </Box>
              </Typography>
              <Box mt={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('ssn/passport')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.ssn ? (
                          details.ssn
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('securityQuestion')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.security_question ? (
                          details.security_question
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('answer')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.security_answer ? (
                          details.security_answer
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('uploadedId')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="primary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        <a
                          className="link-color-text"
                          href={details.avatar || ''}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Box className="word-break" fontSize="14px">
                            {details.uploadIdUrl ? (
                              details.uploadIdUrl
                            ) : (
                              <Box className="icon-color-light" fontSize="15px">
                                {t('notAvailable')}
                              </Box>
                            )}
                          </Box>
                        </a>
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            <Box mb={4} width="100%">
              <Typography
                tabIndex={0}
                component=""
                align="left"
                variant="body2"
                color="primary"
                className="bg-color-surface"
                gutterBottom
              >
                <Box component="span" fontWeight="600" fontSize="16px">
                  {t('submittedEssay')}
                </Box>
              </Typography>
              <Box mt={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {details?.essay_question}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box
                        component="span"
                        fontWeight="fontWeightRegular"
                        fontSize="16px"
                        dangerouslySetInnerHTML={{
                          __html: details.essay || t('notAvailable'),
                        }}
                      >
                        {/* {details.essay ? (
                          details.essay
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )} */}
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
Permission.propTypes = {
  details: PropTypes.object,
  toggleEditGeneralInfo: PropTypes.func,
}

Permission.defaultProps = {
  details: {},
  toggleEditGeneralInfo: () => {},
}
export default Permission
