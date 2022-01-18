import { Box, Grid, Paper } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

function EnrollmentDetailSkeleton() {
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
            <Grid item xs={12} sm={6} md={2} lg={2}>
              <Skeleton animation="wave" variant="text" height="50px" width="100px" />
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
              <Skeleton animation="wave" variant="text" height="50px" width="100px" />
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
              <Skeleton animation="wave" variant="text" height="50px" width="100px" />
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
              <Skeleton animation="wave" variant="text" height="50px" width="100px" />
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
              <Skeleton animation="wave" variant="text" height="50px" width="100px" />
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
              <Skeleton animation="wave" variant="text" height="50px" width="100px" />
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Paper>
        <Box
          p={3}
          display="flex"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDirection={{ xs: 'column', md: 'row' }}
        >
          <Skeleton animation="wave" variant="text" height="50px" width="100px" />
          <Box pl={{ xs: 0, md: 3 }}>
            <Grid container spacing={3} justify="space-between">
              <Grid item xs={12} sm={12} lg={12} xl={6}>
                <Box display="flex" alignItems="flex-start" justifyContent="flex-start" mb={1}>
                  <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                    <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                    <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                    <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                    <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                    <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                    <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                    <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                    <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                    <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                    <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2} xl={3}>
                    <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm="auto">
                <Box
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  flexDirection="column"
                >
                  <Box
                    mb={3}
                    width="100%"
                    display="flex"
                    justifyContent={{ xs: 'flex-start', lg: 'flex-end' }}
                    flexDirection={{ xs: 'column', sm: 'row' }}
                  >
                    <Box
                      width={{ xs: '100%', sm: 'auto' }}
                      display="inline-block"
                      mr={{ xs: 0, sm: 1 }}
                    >
                      <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                    </Box>
                    <Box
                      width={{ xs: '100%', sm: 'auto' }}
                      display="inline-block"
                      mt={{ xs: 1, sm: 0 }}
                    >
                      <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                    </Box>
                  </Box>
                  <Skeleton animation="wave" variant="text" height="50px" width="100px" />

                  <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={3} xl="auto">
              <Skeleton animation="wave" variant="text" height="50px" width="100px" />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} xl="auto">
              <Skeleton animation="wave" variant="text" height="50px" width="100px" />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} xl="auto">
              <Skeleton animation="wave" variant="text" height="50px" width="100px" />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} xl="auto">
              <Skeleton animation="wave" variant="text" height="50px" width="100px" />
            </Grid>
            <Grid container>
              <Grid item xs={12} lg="auto">
                <Box px={2} pt={2}>
                  <Skeleton animation="wave" variant="text" height="50px" width="100px" />

                  <Box mt={1} className="border-box" p={2} width="100%">
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6} md={4} lg="auto">
                        <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg="auto">
                        <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg="auto">
                        <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg="auto">
                        <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg="auto">
                        <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
              <Skeleton animation="wave" variant="text" height="50px" width="100px" />
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
              <Skeleton animation="wave" variant="text" height="50px" width="100px" />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  )
}

export default EnrollmentDetailSkeleton
