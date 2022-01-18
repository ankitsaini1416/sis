import { Box, Grid, Paper } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

function ProgramSkeleton() {
  return (
    <>
      <Box py={2}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Skeleton animation="wave" variant="text" width="100px" />
          </Grid>
          <Grid item xs={12} sm="auto">
            <Box mt={{ xs: 1, sm: 0 }}>
              <Skeleton animation="wave" variant="text" height="50px" width="100px" />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Paper rounded={true} elevation={1} className="paper-round">
        <Box px={2} py={2} width="100%">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Skeleton animation="wave" variant="text" height="48px" width="100%" />
            </Grid>
            <Grid item xs="auto">
              <Skeleton animation="wave" variant="text" height="48px" width="100px" />
            </Grid>
          </Grid>

          <Box pt={2} display="flex" width="100%" alignItems="flex-start" flexDirection="column">
            <Grid spacing={3} container className="filter-search-section">
              <Grid item xs={12} sm={4} md="auto">
                <Skeleton animation="wave" variant="text" height="40px" width="120px" />
              </Grid>
              <Grid item xs={12} sm={4} md="auto">
                <Skeleton animation="wave" variant="text" height="40px" width="120px" />
              </Grid>
              <Grid item xs={12} sm={4} md="auto">
                <Skeleton animation="wave" variant="text" height="40px" width="120px" />
              </Grid>
              <Grid item xs={12} sm={4} md="auto">
                <Skeleton animation="wave" variant="text" height="40px" width="120px" />
              </Grid>
              <Grid item xs={12} sm={4} md="auto">
                <Skeleton animation="wave" variant="text" height="40px" width="120px" />
              </Grid>
              <Grid item xs={12} sm={4} md="auto">
                <Skeleton animation="wave" variant="text" height="40px" width="80px" />
              </Grid>
              <Grid item xs={12} sm={4} md="auto">
                <Skeleton animation="wave" variant="text" height="40px" width="80px" />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box px={2} py={2} width="100%">
          <Skeleton
            className="skeleton-radius"
            animation="wave"
            variant="rect"
            width="100%"
            height={300}
          />
        </Box>
      </Paper>
    </>
  )
}

export default ProgramSkeleton
