import { Box, Button, Divider, Grid, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { ArrowLeft } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ROUTES } from '../../../../helpers/constants'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
// import useStyles from '../Settings.Style'

function ViewEmail() {
  //   const classes = useStyles()
  const { t } = useTranslation()
  const history = useHistory()
  const breadcrumbData = [
    {
      title: 'SIS',
      href: '/',
    },
    {
      title: 'Settings',
      href: ROUTES.EMAIL,
    },
    {
      title: 'Emails',
      href: ROUTES.EMAIL,
    },
    {
      title: 'View Email',
      href: '/settings/emails/viewemail',
    },
  ]

  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary">
              <Box component="span" fontWeight="700">
                {t('viewEmail')}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Box
              mt={{ xs: 1, sm: 0 }}
              display="flex"
              alignItems="center"
              justifyContent={{
                xs: 'flex-start',
                sm: 'flex-start',
                md: 'space-between',
              }}
            >
              <Button
                className="custom-default-button text-transform-none"
                size="large"
                variant="contained"
                disableElevation
                startIcon={<ArrowLeft />}
                onClick={history.goBack}
              >
                {t('back')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Paper rounded={true} elevation={1} className="paper-round">
        <Box px={2} py={2}>
          <Typography
            component=""
            align="left"
            variant="body2"
            color="Primary"
            className="bg-color-surface"
          >
            <Box component="span" fontWeight="600" fontSize="16px">
              {t('generalInformation')}
            </Box>
          </Typography>
          <Box mt={3}>
            <Grid container>
              <Grid item xs={12} md={12} lg={12}>
                <Box mb={{ xs: 3, lg: 3 }}>
                  <Typography
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('subject')}
                    </Box>
                  </Typography>
                  <Typography
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      Successful registration of user
                    </Box>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Box mb={{ xs: 3, lg: 3 }}>
                  <Typography
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('senderEmail')}
                    </Box>
                  </Typography>
                  <Typography
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {t('Sourabh <sourabh.tejawat@sarvika.com>')}
                    </Box>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Box mb={{ xs: 3, lg: 3 }}>
                  <Typography
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('recipientEmail')}
                    </Box>
                  </Typography>
                  <Typography
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      kishan.saini@sarvika.com
                    </Box>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Box mb={{ xs: 3, lg: 3 }}>
                  <Typography
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('ccEmail')}
                    </Box>
                  </Typography>
                  <Typography
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      kishan.saini@sarvika.com
                    </Box>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Box mb={{ xs: 3, lg: 3 }}>
                  <Typography
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('bccEmail')}
                    </Box>
                  </Typography>
                  <Typography
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      kishan.saini@sarvika.com
                    </Box>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Box mb={{ xs: 3, lg: 3 }}>
                  <Typography
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textPrimary"
                    tabIndex={0}
                  >
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
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      14/09/2021 10:00 AM
                    </Box>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Box mb={{ xs: 3, lg: 3 }}>
                  <Typography
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('id')}
                    </Box>
                  </Typography>
                  <Typography
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      6c22c6f7-48fb-4206-8ed9-0fff503415dd
                    </Box>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box px={2} py={2}>
          <Typography
            component=""
            align="left"
            variant="body2"
            color="Primary"
            className="bg-color-surface"
            tabIndex={0}
          >
            <Box component="span" fontWeight="600" fontSize="16px">
              {t('events')}
            </Box>
          </Typography>
          <Box mt={2} width="100%" px={0} py={1}>
            <Typography component="h4" variant="h6" color="primary" tabIndex={0}>
              <Box component="span" fontSize="16px">
                {t('initialState')}
              </Box>
            </Typography>
          </Box>
          <Divider />
          <Box px={0} py={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Typography component="h6" variant="body1" tabIndex={0}>
                  <b> {t('status') + ':'}</b>
                </Typography>
                <Typography component="p" variant="body1" color="secondary" tabIndex={0}>
                  <Box component="span">Initial State</Box>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Typography component="h6" variant="body1" tabIndex={0}>
                  <b>{t('note') + ':'}</b>
                </Typography>
                <Typography component="p" variant="body1" tabIndex={0}>
                  N/A
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Typography component="h6" variant="body1" tabIndex={0}>
                  <b> {t('time') + ':'}</b>
                </Typography>
                <Typography component="p" variant="body1" tabIndex={0}>
                  07/06/2021 10:00:00 AM
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box mt={2} width="100%" px={0} py={1}>
            <Typography component="h4" variant="h6" color="primary" tabIndex={0}>
              <Box component="span" fontSize="16px">
                {t('SENT')}
              </Box>
            </Typography>
          </Box>
          <Divider />
          <Box px={0} py={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Typography component="h6" variant="body1" tabIndex={0}>
                  <b> {t('status') + ':'}</b>
                </Typography>
                <Typography component="p" variant="body1" color="secondary" tabIndex={0}>
                  <Box component="span">Sent</Box>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Typography component="h6" variant="body1" tabIndex={0}>
                  <b>{t('note') + ':'}</b>
                </Typography>
                <Typography component="p" variant="body1" tabIndex={0}>
                  N/A
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Typography component="h6" variant="body1" tabIndex={0}>
                  <b> {t('time') + ':'}</b>
                </Typography>
                <Typography component="p" variant="body1" tabIndex={0}>
                  07/06/2021 10:00:00 AM
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </>
  )
}
export default ViewEmail
