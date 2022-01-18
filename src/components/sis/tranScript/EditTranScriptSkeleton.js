import { Box, Grid, Paper } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

function EditTranScript() {
  return (
    <Box>
      <Box py={2}>
        <Skeleton animation="wave" variant="text" height="50px" width="250px" />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Skeleton animation="wave" variant="text" height="50px" width="150px" />
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
        <Box px={{ xs: 2, lg: 3 }} pt={{ xs: 2, lg: 2 }} pb={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={8} xl={6}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6}>
                  <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                </Grid>
                <Grid item xs={12} md={12} className="custom-checkbox">
                  <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                </Grid>
                <Grid item xs={12}>
                  <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                </Grid>
              </Grid>
              <Box mt={2} align="right">
                <Skeleton animation="wave" variant="text" height="50px" width="100px" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  )
}

export default EditTranScript
