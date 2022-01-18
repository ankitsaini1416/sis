import { Box, Grid, Paper } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

function EditRoleSkeleton() {
  return (
    <>
      <Box py={2}>
        <Skeleton animation="wave" variant="text" height="40px" width="250px" />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Skeleton animation="wave" variant="text" height="40px" width="150px" />
          </Grid>

          <Grid item xs={12} sm="auto">
            <Skeleton animation="wave" variant="text" height="40px" width="50px" />
          </Grid>
        </Grid>
      </Box>

      <Paper rounded={true} elevation={1} className="paper-round">
        <Box p={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Box display="flex" mb={2}>
                <Box mr={1}>
                  <Skeleton animation="wave" variant="text" height="40px" width="50px" />
                </Box>
                <Box mr={1}>
                  <Skeleton animation="wave" variant="text" height="40px" width="50px" />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={12} sm="auto">
              <Skeleton animation="wave" variant="text" height="40px" width="250px" />
            </Grid>

            <Grid item xs={12} sm="auto">
              <Box display="flex">
                <Box mt={{ xs: 1, sm: 0 }} mr={2}>
                  <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                </Box>
                <Box mt={{ xs: 1, sm: 0 }}>
                  <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Skeleton animation="wave" variant="text" height="40px" width="150px" />
            </Grid>
          </Grid>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={12} sm={6}>
              <Skeleton animation="wave" variant="text" height="40px" width="150px" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton animation="wave" variant="text" height="40px" width="100px" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton animation="wave" variant="text" height="40px" width="150px" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton animation="wave" variant="text" height="40px" width="100px" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton animation="wave" variant="text" height="40px" width="150px" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton animation="wave" variant="text" height="40px" width="100px" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton animation="wave" variant="text" height="40px" width="150px" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton animation="wave" variant="text" height="40px" width="100px" />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  )
}

export default EditRoleSkeleton
