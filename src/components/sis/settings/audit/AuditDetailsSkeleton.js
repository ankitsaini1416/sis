import { Box, Grid, Paper, TableCell, TableRow } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

import CustomTable from '../../../table/CustomTable'

function AuditDetailsSkeleton() {
  return (
    <>
      <Box py={2}>
        <Skeleton animation="wave" variant="text" height="50px" width="250px" />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Skeleton animation="wave" variant="text" height="50px" width="250px" />
          </Grid>
          <Grid item xs={12} sm="auto">
            <Skeleton animation="wave" variant="text" height="50px" width="250px" />
          </Grid>
        </Grid>
      </Box>
      <Paper rounded={true} elevation={1} className="paper-round">
        <Box px={2} py={2}>
          <Skeleton animation="wave" variant="text" height="50px" width="250px" />
          <Box mt={3}>
            <Grid container>
              <Grid item xs={12} md={4} lg={3}>
                <Box mb={{ xs: 3, lg: 3 }}>
                  <Skeleton animation="wave" variant="text" height="50px" width="250px" />
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Box mb={{ xs: 3, lg: 3 }}>
                  <Skeleton animation="wave" variant="text" height="50px" width="250px" />
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Box mb={{ xs: 3, lg: 3 }}>
                  <Skeleton animation="wave" variant="text" height="50px" width="250px" />
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Box mb={{ xs: 3, lg: 3 }}>
                  <Skeleton animation="wave" variant="text" height="50px" width="250px" />
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Box mb={{ xs: 3, lg: 3 }}>
                  <Skeleton animation="wave" variant="text" height="50px" width="250px" />
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Box mb={{ xs: 3, lg: 3 }}>
                  <Skeleton animation="wave" variant="text" height="50px" width="250px" />
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Box mb={{ xs: 3, lg: 3 }}>
                  <Skeleton animation="wave" variant="text" height="50px" width="250px" />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box mt={3} mb={3}>
            <Skeleton animation="wave" variant="text" height="50px" width="250px" />
          </Box>
        </Box>
      </Paper>
      <Box mt={2}>
        <Paper rounded={true} elevation={1} className="paper-round">
          <CustomTable>
            <TableRow>
              <TableCell>
                <Skeleton animation="wave" variant="text" height="50px" width="250px" />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" variant="text" height="50px" width="250px" />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" variant="text" height="50px" width="250px" />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" variant="text" height="50px" width="250px" />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" variant="text" height="50px" width="250px" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton animation="wave" variant="text" height="50px" width="250px" />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" variant="text" height="50px" width="250px" />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" variant="text" height="50px" width="250px" />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" variant="text" height="50px" width="250px" />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" variant="text" height="50px" width="250px" />
              </TableCell>
            </TableRow>
          </CustomTable>
        </Paper>
      </Box>
      <Skeleton animation="wave" variant="text" height="50px" width="100%" />
    </>
  )
}

export default AuditDetailsSkeleton
