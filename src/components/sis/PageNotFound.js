import { Box, Button, Typography } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'

import pageNotFound from '../../assets/images/PageNotFound.svg'

function PageNotFound() {
  const { t } = useTranslation()

  return (
    <Box height="100%">
      <Box
        align="center"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <img width="350px" src={pageNotFound} alt="no data" />
        <Typography component="h2" variant="h3" color="textPrimary" gutterBottom>
          <Box component="span" fontWeight="fontWeightMedium">
            {t('oops')}
          </Box>
        </Typography>
        <Typography component="h6" variant="h5" color="textPrimary" gutterBottom>
          <Box component="span" fontWeight="fontWeightMedium">
            {t('looksLikeYouAreLost')}
          </Box>
        </Typography>
        <Typography component="h6" variant="body2" color="textPrimary" gutterBottom>
          <Box component="span" fontWeight="fontWeightMedium">
            {t('thePageYouAreLookingForCouldNotBeFound')}
          </Box>
        </Typography>
        <Box mt={3}>
          <Button
            className="text-transform-none"
            size="large"
            variant="contained"
            disableElevation
            color="primary"
            type="submit"
          >
            {t('backToHome')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default PageNotFound
