import { Box, Grid, Hidden, Paper } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

function InactivityReportsSkeleton() {
  return (
    <>
      <Box py={2}>
        <Skeleton animation="wave" variant="text" height="40px" width="250px" />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Skeleton animation="wave" variant="text" height="40px" width="100px" />
          </Grid>
        </Grid>
      </Box>
      <Paper rounded={true} elevation={1} className="paper-round">
        <Box px={2} py={2} width="100%">
          <Hidden smUp>
            <Skeleton animation="wave" variant="text" height="40px" width="100px" />
          </Hidden>
          <Hidden smDown>
            <Skeleton animation="wave" variant="text" height="40px" width="100px" />
          </Hidden>
          <Box pt={2} display="flex" width="100%" alignItems="flex-start" flexDirection="column">
            <Grid spacing={2} container className="filter-search-section">
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                <Skeleton animation="wave" variant="text" height="40px" width="100%" />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                <Skeleton animation="wave" variant="text" height="40px" width="100%" />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                <Skeleton animation="wave" variant="text" height="40px" width="100%" />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                <Skeleton animation="wave" variant="text" height="40px" width="100%" />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                <Skeleton animation="wave" variant="text" height="40px" width="100%" />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                <Skeleton animation="wave" variant="text" height="40px" width="100%" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <Skeleton animation="wave" variant="text" height="40px" width="100%" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <Skeleton animation="wave" variant="text" height="40px" width="100%" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <Skeleton animation="wave" variant="text" height="40px" width="100%" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <Skeleton animation="wave" variant="text" height="40px" width="100%" />
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box px={2} py={2} width="100%">
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs={12} sm="auto">
              <Skeleton animation="wave" variant="text" height="40px" width="100px" />
            </Grid>
            <Grid item xs={12} sm="auto">
              <Box display="flex" alignItems="center" ml={1}>
                <Skeleton animation="wave" variant="text" height="40px" width="100px" />
                <Box ml={1}>
                  <Skeleton animation="wave" variant="text" height="40px" width="100px" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box display="flex" flexWrap="wrap">
                <Box mr={2}>
                  <Skeleton animation="wave" variant="text" height="40px" width="100px" />
                </Box>
                <Box mr={2}>
                  <Skeleton animation="wave" variant="text" height="40px" width="100px" />
                </Box>
                <Box mr={2}>
                  <Skeleton animation="wave" variant="text" height="40px" width="100px" />
                </Box>
                <Box mr={2}>
                  <Skeleton animation="wave" variant="text" height="40px" width="100px" />
                </Box>
                <Box mr={2}>
                  <Skeleton animation="wave" variant="text" height="40px" width="100px" />
                </Box>
                <Box mr={2}>
                  <Skeleton animation="wave" variant="text" height="40px" width="100px" />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  )
}

export default InactivityReportsSkeleton
