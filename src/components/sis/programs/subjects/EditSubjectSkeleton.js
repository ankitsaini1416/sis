import { Box, Grid, Paper } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

function EditSubjectSkeleton() {
  return (
    <>
      <Box py={2}>
        <Skeleton animation="wave" variant="text" height="40px" width="250px" />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Skeleton animation="wave" variant="text" height="40px" width="150px" />
          </Grid>
          <Grid item xs={12} sm="auto">
            <Box
              mt={{ xs: 1, sm: 0 }}
              display="flex"
              alignItems="center"
              justifyContent={{
                xs: 'flex-start',
                sm: 'flex-end',
                md: 'space-between',
              }}
            >
              <Skeleton animation="wave" variant="text" height="40px" width="50px" />
              <Box ml={2}>
                <Skeleton animation="wave" variant="text" height="40px" width="50px" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Paper rounded={true} elevation={1} className="paper-round">
        <Box px={{ xs: 2, lg: 3 }} pt={{ xs: 2, lg: 3 }} pb={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12}>
                  <Skeleton animation="wave" variant="text" height="40px" width="100%" />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Skeleton animation="wave" variant="text" height="40px" width="100%" />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Skeleton animation="wave" variant="text" height="40px" width="100%" />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Skeleton animation="wave" variant="text" height="40px" width="100%" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  )
}
export default EditSubjectSkeleton
