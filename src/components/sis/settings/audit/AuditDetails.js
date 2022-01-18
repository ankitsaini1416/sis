import {
  Box,
  Button,
  Grid,
  Paper,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core'
// import useStyles from '../Settings.Style'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { ArrowLeft } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ROUTES } from '../../../../helpers/constants'
import { getDate } from '../../../../helpers/utils'
import { isEmpty } from '../../../../helpers/utils'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import CustomTable from '../../../table/CustomTable'
import AuditDetailsSkeleton from './AuditDetailsSkeleton'
function AuditDetails({
  order,
  orderBy,
  setOrder,
  setOrderBy,
  pageContent,
  pageData,
  getActionString,
  headCells,
}) {
  // const classes = useStyles()
  const { t } = useTranslation()
  const dataParameter = 'id'
  const history = useHistory()
  const breadcrumbData = [
    {
      title: 'SIS',
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: 'Settings',
      href: ROUTES.AUDIT,
    },
    {
      title: 'Audit',
      href: ROUTES.AUDIT,
    },
    {
      title: 'Audit Details',
      href: '',
    },
  ]

  // const auditAction = (row) => {
  //   return (
  //     <Typography variant="body2" data-id={row.id} id={row.id} component="p">
  //       <Box component="div" display="flex" alignItems="center">
  //         <CheckCircle height="16px" width="16px" className="text-success" />
  //         <Box component="span" ml={1}>
  //           Create Successfully
  //         </Box>
  //       </Box>
  //     </Typography>
  //   )
  // }
  if (isEmpty(pageContent)) {
    return <AuditDetailsSkeleton />
  }
  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="700">
                {t('auditDetails')}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Box
              mt={{ xs: 1, sm: 0 }}
              display="flex"
              alignItems="center"
              justifyContent={{
                xs: 'flex-start',
                sm: 'flex-start',
                md: 'space-between',
              }}
            >
              <Button
                className="custom-default-button text-transform-none"
                size="large"
                variant="contained"
                disableElevation
                startIcon={<ArrowLeft />}
                onClick={history.goBack}
              >
                {t('back')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Paper rounded={true} elevation={1} className="paper-round">
        <Box px={2} py={2}>
          <Typography
            component=""
            align="left"
            variant="body2"
            color="Primary"
            className="bg-color-surface"
            tabIndex={0}
          >
            <Box component="span" fontWeight="600" fontSize="16px">
              {t('generalInformation')}
            </Box>
          </Typography>
          <Box mt={3}>
            <Grid container>
              <Grid item xs={12} md={4} lg={3}>
                <Box mb={{ xs: 3, lg: 3 }}>
                  <Typography
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('userPrincipal')}
                    </Box>
                  </Typography>
                  <Typography
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {pageContent.principal}
                    </Box>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Box mb={{ xs: 3, lg: 3 }}>
                  <Typography
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('eventCode')}
                    </Box>
                  </Typography>
                  <Typography
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {pageContent.event_code}
                    </Box>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Box mb={{ xs: 3, lg: 3 }}>
                  <Typography
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('auditLogId')}
                    </Box>
                  </Typography>
                  <Typography
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {pageContent.id}
                    </Box>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Box mb={{ xs: 3, lg: 3 }}>
                  <Typography
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('serviceCode')}
                    </Box>
                  </Typography>
                  <Typography
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {pageContent.service_code}
                    </Box>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Box mb={{ xs: 3, lg: 3 }}>
                  <Typography
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('updatedTime')}
                    </Box>
                  </Typography>
                  <Typography
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {pageContent.update_time}
                    </Box>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Box mb={{ xs: 3, lg: 3 }}>
                  <Typography
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('roles')}
                    </Box>
                  </Typography>
                  <Typography
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {pageContent.effective_roles ? pageContent.effective_roles.join(', ') : ''}
                    </Box>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Box mb={{ xs: 3, lg: 3 }}>
                  <Typography
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('description')}
                    </Box>
                  </Typography>
                  <Typography
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {pageContent.description ? pageContent.description : 'N/A'}
                    </Box>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box mt={3} mb={3}>
            <Typography
              component=""
              align="left"
              variant="body2"
              color="Primary"
              className="bg-color-surface"
              tabIndex={0}
            >
              <Box component="span" fontWeight="600" fontSize="16px">
                {t('auditDetails')}
              </Box>
            </Typography>
          </Box>
          <CustomTable
            noDataMessage={t('dataNotFound')}
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
            data={pageData}
            headCells={headCells}
            dataParameter={dataParameter}
            isSelection={false}
          >
            {pageData.map((row) => {
              return (
                <TableRow hover data-id={row.id} key={row.id}>
                  {/* <TableCell className={classes.verticalSpaceRemove}>{auditAction(row)}</TableCell> */}
                  <TableCell>{getActionString(row.action, row.success)}</TableCell>
                  <TableCell tabIndex={0}>
                    <Tooltip title={row.resource}>
                      <Box className="block-ellipsis">{row.resource}</Box>
                    </Tooltip>
                  </TableCell>

                  <TableCell tabIndex={0}>
                    {row.before ? (
                      <Tooltip title={row.before}>
                        <Box className="block-ellipsis break-word">{row.before}</Box>
                      </Tooltip>
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                  <TableCell tabIndex={0}>
                    {row.before ? (
                      <Tooltip title={row.current}>
                        <Box className="block-ellipsis break-word">{row.current}</Box>
                      </Tooltip>
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                  <TableCell tabIndex={0}>{getDate(row.timestamp)}</TableCell>
                </TableRow>
              )
            })}
          </CustomTable>
        </Box>
      </Paper>
      <Box mt={2}>
        <Paper rounded={true} elevation={1} className="paper-round">
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Misc</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Fragment>
                <div style={{ width: '100%' }}>
                  <Grid container spacing={1} className="customTable">
                    {pageContent.data_area
                      ? Object.keys(pageContent.data_area).map((item) => {
                          return (
                            <>
                              <Grid item xs={6} sm={6} md={4}>
                                <Typography component="h5" variant="body1">
                                  <b>{item}:</b>
                                </Typography>
                              </Grid>
                              <Grid item xs={6} sm={6} md={8}>
                                <Typography component="h5" variant="body1" noWrap>
                                  {pageContent.data_area[item]}
                                </Typography>
                              </Grid>
                            </>
                          )
                        })
                      : 'Data Not Available'}
                  </Grid>
                </div>
              </Fragment>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Paper>
      </Box>
    </>
  )
}
AuditDetails.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  pageContent: PropTypes.object,
  pageData: PropTypes.array,
  headCells: PropTypes.array,
  getActionString: PropTypes.func,
}

AuditDetails.defaultProps = {
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  pageContent: {},
  pageData: [],
  headCells: [],
  getActionString: () => {},
}

export default AuditDetails
