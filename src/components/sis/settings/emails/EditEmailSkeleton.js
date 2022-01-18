import { Box, Grid, Paper } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

function EditEmailSkeleton() {
  return (
    <Box mb={2}>
      <Box py={2}>
        <Skeleton animation="wave" variant="text" height="50px" width="100px" />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Skeleton animation="wave" variant="text" height="50px" width="100px" />
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
              <Skeleton animation="wave" variant="text" height="50px" width="100px" />
              <Box ml={2}>
                <Skeleton animation="wave" variant="text" height="50px" width="100px" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Paper rounded={true} elevation={1} className="paper-round">
        <Box px={{ xs: 2, lg: 4 }} py={{ xs: 2, lg: 4 }}>
          {/* edit email */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box mt={1} mb={1}>
                <Skeleton animation="wave" variant="text" height="50px" width="100%" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Skeleton animation="wave" variant="text" height="50px" width="100%" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Skeleton animation="wave" variant="text" height="50px" width="100%" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Skeleton animation="wave" variant="text" height="50px" width="100%" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Skeleton animation="wave" variant="text" height="50px" width="100%" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} className="custom-checkbox">
              <Box mt={1} mb={1}>
                <Skeleton animation="wave" variant="text" height="50px" width="100p%" />
              </Box>
            </Grid>
          </Grid>
          {/* edit email */}
        </Box>
      </Paper>
    </Box>
  )
}

export default EditEmailSkeleton
