import { Box, Grid, Paper } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

function Permission() {
  return (
    <>
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
        <Box mb={3} p={3}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Skeleton animation="wave" variant="text" height="50px" width="250px" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Skeleton animation="wave" variant="text" height="50px" width="250px" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Skeleton animation="wave" variant="text" height="50px" width="250px" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Skeleton animation="wave" variant="text" height="50px" width="250px" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Skeleton animation="wave" variant="text" height="50px" width="250px" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Skeleton animation="wave" variant="text" height="50px" width="250px" />
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper rounded={true} elevation={1} className="paper-round">
        <Box p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3} xl={2} className="vertical-sidebar">
              <Box display="flex" flexDirection="column">
                <Box mr={2}>
                  <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                </Box>
                <Box mr={2}>
                  <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                </Box>
                <Box mr={2}>
                  <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                </Box>
                <Box mr={2}>
                  <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={8} lg={9} xl={10}>
              <Box mb={2}>
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
              <Grid container>
                <Grid item xs={12} lg={4} xl={4}>
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
                    <Skeleton animation="wave" variant="text" height="50px" width="100px" />

                    <Box mt={2} mb={2} width="100%">
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
                <Grid item xs={12} lg={8} xl={8}>
                  <Box mb={4} width="100%">
                    <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                    <Box mb={4} mt={2}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <Skeleton animation="wave" variant="text" height="50px" width="50px" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <Skeleton animation="wave" variant="text" height="50px" width="50px" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <Skeleton animation="wave" variant="text" height="50px" width="50px" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <Skeleton animation="wave" variant="text" height="50px" width="50px" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <Skeleton animation="wave" variant="text" height="50px" width="50px" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <Skeleton animation="wave" variant="text" height="50px" width="50px" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <Skeleton animation="wave" variant="text" height="50px" width="50px" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <Skeleton animation="wave" variant="text" height="50px" width="50px" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <Skeleton animation="wave" variant="text" height="50px" width="50px" />
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  )
}

export default Permission
