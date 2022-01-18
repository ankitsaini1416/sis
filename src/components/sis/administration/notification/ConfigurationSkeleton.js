import { Box, Grid, Paper } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

function ConfigurationSkeleton() {
  return (
    <>
      <Box py={2}>
        <Skeleton animation="wave" variant="text" height="40px" width="250px" />
      </Box>

      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={12} sm="auto">
          <Skeleton animation="wave" variant="text" height="40px" width="150px" />
        </Grid>
        <Grid item xs={12} sm="auto">
          <Box display="flex" alignItems="center" justifyContent="flex-start" mt={{ xs: 2, sm: 0 }}>
            <Skeleton animation="wave" variant="text" height="40px" width="100px" />
          </Box>
        </Grid>
      </Grid>

      <Paper rounded={true} elevation={1} className="paper-round">
        <Box px={{ xs: 2, lg: 2 }} py={{ xs: 2, lg: 4 }}>
          <Box pb={3}>
            <Skeleton animation="wave" variant="text" height="40px" width="100%" />
          </Box>
          {/* personal */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Skeleton animation="wave" variant="text" height="40px" width="100%" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Skeleton animation="wave" variant="text" height="40px" width="100%" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Skeleton animation="wave" variant="text" height="40px" width="100%" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Skeleton animation="wave" variant="text" height="40px" width="100px" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} className="custom-checkbox">
              <Skeleton animation="wave" variant="text" height="40px" width="100px" />
            </Grid>
          </Grid>
          {/* personal */}
          <Box py={3}>
            <Skeleton animation="wave" variant="text" height="40px" width="100%" />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Skeleton animation="wave" variant="text" height="40px" width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton animation="wave" variant="text" height="40px" width="100%" />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              className="custom-checkbox"
              display={{ xs: 'block', sm: 'block', md: 'flex' }}
            >
              <Skeleton animation="wave" variant="text" height="40px" width="100px" />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              className="custom-checkbox"
              display={{ xs: 'block', sm: 'block', md: 'flex' }}
            >
              <Skeleton animation="wave" variant="text" height="40px" width="100px" />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              className="custom-checkbox"
              display={{ xs: 'block', sm: 'block', md: 'flex' }}
            >
              <Skeleton animation="wave" variant="text" height="40px" width="100px" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Skeleton animation="wave" variant="text" height="40px" width="100%" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Skeleton animation="wave" variant="text" height="40px" width="100%" />
            </Grid>
          </Grid>
          <Box
            mt={{ xs: 3, sm: 3, md: 4 }}
            display="flex"
            alignItems="center"
            justifyContent={{ xs: 'flex-start', sm: 'flex-start', md: 'flex-end' }}
          >
            <Skeleton animation="wave" variant="text" height="40px" width="100px" />
            <Box ml={2}>
              <Skeleton animation="wave" variant="text" height="40px" width="100px" />
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  )
}

export default ConfigurationSkeleton
