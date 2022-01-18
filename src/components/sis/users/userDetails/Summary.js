import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Summary({ user }) {
  const { t } = useTranslation()
  return (
    <Box pb={{ xs: 0, sm: 3, lg: 4 }}>
      <Typography
        component=""
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
      <Box mb={5} mt={5}>
        <Grid container>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Box mb={{ xs: 3, lg: 3 }}>
              <Typography component="h6" align="left" variant="h6" color="textDefault" tabIndex={0}>
                <Box component="span" fontWeight="600" fontSize="14px">
                  {t('prefix')}
                </Box>
              </Typography>
              <Typography
                component="h6"
                align="left"
                variant="subtitle2"
                color="textPrimary"
                gutterBottom
                tabIndex={user.prefix ? 0 : null}
              >
                <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                  {user?.attributes?.prefix}
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Box mb={{ xs: 3, lg: 3 }}>
              <Typography component="h6" align="left" variant="h6" color="textDefault" tabIndex={0}>
                <Box component="span" fontWeight="600" fontSize="14px">
                  {t('firstName')}
                </Box>
              </Typography>
              <Typography
                component="h6"
                align="left"
                variant="subtitle2"
                color="textPrimary"
                tabIndex={user.first_name ? 0 : null}
              >
                <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                  {user.first_name}
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Box mb={{ xs: 3, lg: 3 }}>
              <Typography component="h6" align="left" variant="h6" color="textDefault" tabIndex={0}>
                <Box component="span" fontWeight="600" fontSize="14px">
                  {t('middleName')}
                </Box>
              </Typography>
              <Typography
                component="h6"
                align="left"
                variant="subtitle2"
                color="textPrimary"
                gutterBottom
                tabIndex={user.middle_name ? 0 : null}
              >
                <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                  {user?.attributes?.middle_name}
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Box mb={{ xs: 3, lg: 3 }}>
              <Typography component="h6" align="left" variant="h6" color="textDefault" tabIndex={0}>
                <Box component="span" fontWeight="600" fontSize="14px">
                  {t('lastName')}
                </Box>
              </Typography>
              <Typography
                component="h6"
                align="left"
                variant="subtitle2"
                color="textPrimary"
                gutterBottom
                tabIndex={user.last_name ? 0 : null}
              >
                <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                  {user.last_name}
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Box mb={{ xs: 3, lg: 3 }}>
              <Typography component="h6" align="left" variant="h6" color="textDefault" tabIndex={0}>
                <Box component="span" fontWeight="600" fontSize="14px">
                  {t('suffix')}
                </Box>
              </Typography>
              <Typography
                component="h6"
                align="left"
                variant="subtitle2"
                color="textPrimary"
                gutterBottom
                tabIndex={user.suffix ? 0 : null}
              >
                <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                  {user?.attributes?.suffix}
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Box mb={{ xs: 3, lg: 3 }}>
              <Typography component="h6" align="left" variant="h6" color="textDefault" tabIndex={0}>
                <Box component="span" fontWeight="600" fontSize="14px">
                  {t('emailAddress')}
                </Box>
              </Typography>
              <Typography
                component="h6"
                align="left"
                variant="subtitle2"
                color="textPrimary"
                gutterBottom
                className="text-ellipsis"
                tabIndex={user.email ? 0 : null}
              >
                <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                  {user.email}
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Box mb={{ xs: 3, lg: 3 }}>
              <Typography component="h6" align="left" variant="h6" color="textDefault" tabIndex={0}>
                <Box component="span" fontWeight="600" fontSize="14px">
                  {t('dateOfBirth')}
                </Box>
              </Typography>
              <Typography
                component="h6"
                align="left"
                variant="subtitle2"
                color="textPrimary"
                gutterBottom
                tabIndex={user.dob ? 0 : null}
              >
                <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                  {user?.attributes?.dob}
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Box mb={{ xs: 3, lg: 3 }}>
              <Typography component="h6" align="left" variant="h6" color="textDefault" tabIndex={0}>
                <Box component="span" fontWeight="600" fontSize="14px">
                  {t('gender')}
                </Box>
              </Typography>
              <Typography
                component="h6"
                align="left"
                variant="subtitle2"
                color="textPrimary"
                gutterBottom
                tabIndex={user.gender ? 0 : null}
              >
                <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                  {user?.attributes?.gender}
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Box mb={{ xs: 3, lg: 0 }}>
              <Typography component="h6" align="left" variant="h6" color="textDefault" tabIndex={0}>
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
                tabIndex={user.address ? 0 : null}
              >
                <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                  {`${user?.attributes?.adr_mobile_prefix || ''}`} {` `}{' '}
                  {`${user?.attributes?.adr_mobile || ''}`}
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Box mb={{ xs: 3, lg: 0 }}>
              <Typography component="h6" align="left" variant="h6" color="textDefault" tabIndex={0}>
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
                tabIndex={user.address ? 0 : null}
              >
                <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                  {`${user?.attributes?.adr_phone_prefix || ''}`} {` `}{' '}
                  {`${user?.attributes?.adr_phone || ''}`}
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Box mb={{ xs: 3, lg: 0 }}>
              <Typography component="h6" align="left" variant="h6" color="textDefault" tabIndex={0}>
                <Box component="span" fontWeight="600" fontSize="14px">
                  {t('createdDate')}
                </Box>
              </Typography>
              <Typography
                component="h6"
                align="left"
                variant="subtitle2"
                color="textPrimary"
                gutterBottom
                tabIndex={user.createdTimeLabel ? 0 : null}
              >
                <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                  {user.createdTimeLabel}
                </Box>
              </Typography>
            </Box>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box mb={{ xs: 3, lg: 0 }}>
              <Typography component="h6" align="left" variant="h6" color="textDefault">
                <Box component="span" fontWeight="600" fontSize="14px">
                  {t('lastModifiedDate')}
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
                  {t('04/05/2021 12:00:00 AM')}
                </Box>
              </Typography>
            </Box>
          </Grid> */}
        </Grid>
      </Box>
      <Box mt={5}>
        <Typography
          component=""
          align="left"
          variant="body2"
          color="Primary"
          className="bg-color-surface"
          tabIndex={0}
        >
          <Box component="span" fontWeight="600" fontSize="16px">
            {t('addressInformation')}
          </Box>
        </Typography>

        <Box mt={5}>
          <Grid container>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Box mb={{ xs: 3, lg: 3 }}>
                <Typography
                  component="h6"
                  align="left"
                  variant="h6"
                  color="textDefault"
                  tabIndex={0}
                >
                  <Box component="span" fontWeight="600" fontSize="14px">
                    {t('addressLine1')}
                  </Box>
                </Typography>
                <Typography
                  component="h6"
                  align="left"
                  variant="subtitle2"
                  color="textPrimary"
                  gutterBottom
                  tabIndex={user?.attributes?.adr_address1 ? 0 : null}
                >
                  <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                    {user?.attributes?.adr_address1}
                  </Box>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Box mb={{ xs: 3, lg: 3 }}>
                <Typography
                  component="h6"
                  align="left"
                  variant="h6"
                  color="textDefault"
                  tabIndex={0}
                >
                  <Box component="span" fontWeight="600" fontSize="14px">
                    {t('addressLine2')}
                  </Box>
                </Typography>
                <Typography
                  component="h6"
                  align="left"
                  variant="subtitle2"
                  color="textPrimary"
                  gutterBottom
                  tabIndex={user?.attributes?.adr_address2 ? 0 : null}
                >
                  <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                    {user?.attributes?.adr_address2}
                  </Box>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Box mb={{ xs: 3, lg: 3 }}>
                <Typography
                  component="h6"
                  align="left"
                  variant="h6"
                  color="textDefault"
                  tabIndex={0}
                >
                  <Box component="span" fontWeight="600" fontSize="14px">
                    {t('Country')}
                  </Box>
                </Typography>
                <Typography
                  component="h6"
                  align="left"
                  variant="subtitle2"
                  color="textPrimary"
                  gutterBottom
                  tabIndex={user?.attributes?.adr_country_name ? 0 : null}
                >
                  <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                    {user?.attributes?.adr_country_name}
                  </Box>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Box mb={{ xs: 3, lg: 3 }}>
                <Typography
                  component="h6"
                  align="left"
                  variant="h6"
                  color="textDefault"
                  tabIndex={0}
                >
                  <Box component="span" fontWeight="600" fontSize="14px">
                    {t('state')}
                  </Box>
                </Typography>
                <Typography
                  component="h6"
                  align="left"
                  variant="subtitle2"
                  color="textPrimary"
                  gutterBottom
                  tabIndex={user?.attributes?.adr_state_name ? 0 : null}
                >
                  <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                    {user?.attributes?.adr_state_name}
                  </Box>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Box mb={{ xs: 3, lg: 0 }}>
                <Typography
                  component="h6"
                  align="left"
                  variant="h6"
                  color="textDefault"
                  tabIndex={0}
                >
                  <Box component="span" fontWeight="600" fontSize="14px">
                    {t('city')}
                  </Box>
                </Typography>
                <Typography
                  component="h6"
                  align="left"
                  variant="subtitle2"
                  color="textPrimary"
                  gutterBottom
                  tabIndex={user?.attributes?.adr_city ? 0 : null}
                >
                  <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                    {user?.attributes?.adr_city}
                  </Box>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Box mb={{ xs: 3, lg: 0 }}>
                <Typography
                  component="h6"
                  align="left"
                  variant="h6"
                  color="textDefault"
                  tabIndex={0}
                >
                  <Box component="span" fontWeight="600" fontSize="14px">
                    {t('postalCodeZip')}
                  </Box>
                </Typography>
                <Typography
                  component="h6"
                  align="left"
                  variant="subtitle2"
                  color="textPrimary"
                  gutterBottom
                  tabIndex={user?.attributes?.adr_zipcode ? 0 : null}
                >
                  <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                    {user?.attributes?.adr_zipcode}
                  </Box>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

Summary.propTypes = {
  user: PropTypes.object,
}

Summary.defaultProps = {
  user: {},
}

export default Summary
