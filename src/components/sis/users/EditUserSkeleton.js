import { Box, Grid, Paper } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

function UserDetails() {
  return (
    <Box mb={2}>
      <Box py={2}>
        <Skeleton animation="wave" variant="text" height="40px" width="250px" />
      </Box>

      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={12} sm="auto">
          <Skeleton animation="wave" variant="text" height="40px" width="150px" />
        </Grid>
        <Grid item xs={12} sm="auto">
          <Box mt={{ xs: 1, sm: 0 }}>
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
          </Box>
        </Grid>
      </Grid>
      <Paper rounded={true} elevation={1} className="paper-round">
        <Box px={{ xs: 2, lg: 4 }} py={{ xs: 2, lg: 4 }}>
          <Box pb={3}>
            <Skeleton animation="wave" variant="text" height="50px" width="100px" />
          </Box>
          {/* personal */}
          <Grid container spacing={3} direction="row-reverse">
            <Grid item xs={12} md={4} lg={4}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt={3}
                flexDirection="column"
              >
                <Box mx="auto" width="150px" borderRadius={8} mb={2}>
                  <Skeleton variant="circle" animation="wave" width="150px" height="150px" />
                </Box>
                <Box
                  mt={1}
                  component="div"
                  fontWeight="600"
                  fonSize="14px"
                  align="center"
                  width="100%"
                  color="primary"
                  className="upload-link-text"
                >
                  <Box display="flex" justifyContent="center">
                    <Skeleton animation="wave" variant="text" height="50px" width="100px" />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Box mt={1} mb={1}>
                    <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Box mt={1} mb={1}>
                    <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Box mt={1} mb={1}>
                    <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Box mt={1} mb={1}>
                    <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Box mt={1} mb={1}>
                    <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Box mt={1} mb={1} className="custom-picker">
                    <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Box mt={1} mb={1}>
                    <Skeleton animation="wave" variant="text" height="50px" width="100%" />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* personal */}
          <Box py={3}>
            <Box
              component="p"
              align="left"
              variant="body2"
              color="Primary"
              className="bg-color-surface"
              tabIndex={0}
            >
              <Skeleton animation="wave" variant="text" height="50px" width="100%" />
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box mt={1} mb={1}>
                <Skeleton animation="wave" variant="text" height="50px" width="100%" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box mt={1} mb={1}>
                <Skeleton animation="wave" variant="text" height="50px" width="100%" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box mt={1} mb={1}>
                <Skeleton animation="wave" variant="text" height="50px" width="100%" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box mt={1} mb={1}>
                <Skeleton animation="wave" variant="text" height="50px" width="100%" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box mt={1} mb={1}>
                <Skeleton animation="wave" variant="text" height="50px" width="100%" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box mt={1} mb={1}>
                <Skeleton animation="wave" variant="text" height="50px" width="100%" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box mt={1} mb={1}>
                <Skeleton animation="wave" variant="text" height="50px" width="100%" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box mt={1} mb={1}>
                <Skeleton animation="wave" variant="text" height="50px" width="100%" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box mt={1} mb={1}>
                <Skeleton animation="wave" variant="text" height="50px" width="100%" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  )
}

export default UserDetails
