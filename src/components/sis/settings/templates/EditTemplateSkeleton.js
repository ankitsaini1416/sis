import { Box, Grid, Hidden, Paper } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

function EditTemplateSkeleton() {
  return (
    <Box mb={2}>
      <Box py={2}>
        <Skeleton animation="wave" variant="text" height="40px" width="200px" />
      </Box>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={12} sm="auto">
          <Skeleton animation="wave" variant="text" height="40px" width="100px" />
        </Grid>
        <Grid item xs={12} sm="auto">
          <Box
            mt={{ xs: 1, sm: 0 }}
            display="flex"
            alignItems="center"
            justifyContent={{
              xs: 'flex-start',
              sm: 'flex-start',
              md: 'flex-end',
              lg: 'flex-end',
            }}
            flexWrap={{ xs: 'wrap', sm: 'wrap', md: 'nowrap' }}
          >
            <Box mr={{ xs: 1, sm: 1, md: 2 }} mb={{ xs: 1, sm: 1, md: 0, lg: 0 }}>
              <Skeleton animation="wave" variant="text" height="40px" width="100px" />
            </Box>
            <Box mr={{ xs: 1, sm: 1, md: 2 }} mb={{ xs: 1, sm: 1, md: 0, lg: 0 }}>
              <Skeleton animation="wave" variant="text" height="40px" width="100px" />
            </Box>
            <Box mr={{ xs: 1, sm: 1, md: 2 }} mb={{ xs: 1, sm: 1, md: 0, lg: 0 }}>
              <Skeleton animation="wave" variant="text" height="40px" width="100px" />
            </Box>
            <Box mr={{ xs: 1, sm: 1, md: 2 }} mb={{ xs: 1, sm: 1, md: 0, lg: 0 }}>
              <Skeleton animation="wave" variant="text" height="40px" width="100px" />
            </Box>
            <Hidden smDown>
              <Box mb={{ xs: 1, sm: 1, md: 0, lg: 0 }}>
                <Skeleton animation="wave" variant="text" height="40px" width="100px" />
              </Box>
            </Hidden>
          </Box>
        </Grid>
      </Grid>
      <Paper rounded={true} elevation={1} className="paper-round">
        <Box
          py={1}
          px={2}
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6}>
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                flexDirection="row"
                tabIndex={0}
              >
                <Skeleton animation="wave" variant="text" height="40px" width="100px" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent={{
                  xs: 'flex-start',
                  sm: 'flex-end',
                  md: 'flex-end',
                  lg: 'flex-end',
                  xl: 'flex-end',
                }}
                flexDirection="row"
                tabIndex={0}
              >
                <Skeleton animation="wave" variant="text" height="40px" width="100px" />
              </Box>
            </Grid>
          </Grid>
          <Box width="100%" my={1}>
            <Skeleton animation="wave" variant="text" height="40px" width="100px" />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent={{
              xs: 'flex-start',
              sm: 'flex-end',
              md: 'flex-end',
            }}
            pt={{ xs: 3, sm: 4, md: 4 }}
            pb={3}
            width="100%"
          >
            <Hidden mdUp>
              <Skeleton animation="wave" variant="text" height="40px" width="100px" />
            </Hidden>
            <Box ml={2}>
              <Skeleton animation="wave" variant="text" height="40px" width="100px" />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default EditTemplateSkeleton
