import { Box, Grid, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import PropTypes from 'prop-types'
import React from 'react'
import { Info } from 'react-feather'
import { useTranslation } from 'react-i18next'

// import useStyles from '../roles/Roles.Style'

function Permission({ detail }) {
  //   const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Box className="details-tab">
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={12} md={9} lg={8} xl={6}>
          <Alert className="info-grey" icon={<Info fontSize="inherit" />} tabIndex={0}>
            {t('permissionInfo')}
          </Alert>
        </Grid>
      </Grid>
      <Grid container justify="flex-start" alignItems="center">
        <Grid item xs={12} sm={12} lg={3}>
          <Typography component="h6" align="left" variant="h6" tabIndex={0}>
            <Box component="h6" fontWeight="600" fontSize="16px" mb={1} mt={2}>
              {t('roleName')}
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} lg={9}>
          <Typography component="p" align="left" variant="h6" tabIndex={detail.name ? 0 : null}>
            <Box component="p" fontWeight="500" fontSize="16px" mb={1} mt={2}>
              {detail.name}
            </Box>
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="flex-start" alignItems="center">
        <Grid item xs={12} sm={12} lg={3}>
          <Typography component="h6" align="left" variant="h6" tabIndex={0}>
            <Box component="h6" fontWeight="600" fontSize="16px" mb={1} mt={2}>
              {t('roleDescription')}
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <Typography component="p" align="left" variant="h6" tabIndex={detail.description}>
            <Box component="p" fontWeight="500" fontSize="16px" mb={1} mt={2}>
              {detail.description}
            </Box>
          </Typography>
        </Grid>
      </Grid>
      {/* <Grid container justify="flex-start" alignItems="center">
        <Grid item xs={12} sm={12} lg={3}>
          <Typography component="h6" align="left" variant="h6">
            <Box component="h6" fontWeight="600" fontSize="16px" mb={1} mt={2}>
              {t('createdDate')}
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} lg={9}>
          <Typography component="p" align="left" variant="h6">
            <Box component="p" fontWeight="500" fontSize="16px" mb={1} mt={2}>
              {t('06/07/2021 12:00:41 AM')}
            </Box>
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="flex-start" alignItems="center">
        <Grid item xs={12} sm={12} lg={3}>
          <Typography component="h6" align="left" variant="h6">
            <Box component="h6" fontWeight="600" fontSize="16px" mb={1} mt={2}>
              {t('lastModifiedDate')}
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} lg={9}>
          <Typography component="p" align="left" variant="h6">
            <Box component="p" fontWeight="500" fontSize="16px" mb={1} mt={2}>
              {t('06/07/2021 12:00:41 AM')}
            </Box>
          </Typography>
        </Grid>
      </Grid> */}
    </Box>
  )
}

Permission.propTypes = {
  detail: PropTypes.object,
}

Permission.defaultProps = {
  detail: {},
}

export default Permission
