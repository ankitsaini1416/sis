import { Box, Grid, Paper } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

function EditDistrictSkeleton() {
  return (
    <>
      <Box py={2}>
        <Box>
          <Skeleton animation="wave" variant="text" height="40px" width="250px" />
        </Box>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Skeleton animation="wave" variant="text" height="40px" width="150px" />
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
        </Grid>
      </Box>
      <Paper rounded={true} elevation={1} className="paper-round">
        <Box px={2} py={2} width="100%">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Box
                mr={{ xs: 0, lg: 0, xl: 3 }}
                px={{ xs: 1, md: 2, lg: 3 }}
                py={{ xs: 3, sm: 3 }}
                align="center"
                mb={{ xs: 3, sm: 3, lg: 0 }}
              >
                <Box mx="auto" width="150px" borderRadius={8} mb={2}>
                  <Skeleton variant="circle" animation="wave" width="150px" height="150px" />
                </Box>

                <Box mt={2} width="100%">
                  <Box
                    mt={2}
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box mr={1}>
                      <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                    </Box>
                    <Box ml={1}>
                      <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={8} lg={8} xl={8}>
              <Box pb={{ xs: 0, sm: 3, lg: 4 }}>
                <Box mb={5} mt={4}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  )
}

export default EditDistrictSkeleton
