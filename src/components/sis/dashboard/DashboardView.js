import { Box, Grid, IconButton, Paper, Tooltip, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { Trash } from 'react-feather'
import { useTranslation } from 'react-i18next'

import adddashboard from '../../../assets/eden/images/add.svg'
import { ROUTES } from '../../../helpers/constants'
import { isEmpty } from '../../../helpers/utils'
import Breadcrumb from '../../breadcrumbs/Breadcrumbs'
import ConfirmBox from '../../common/ConfirmBox'
import useStyles from './../settings/Settings.Style'
import AvailableWidget from './AvailableWidget'
import Widgets from './Widgets'

function DashboardView({
  dashboardMasterWidgets,
  dashboardWidgetsList,
  addDashboardWidget,
  fetchDistrictsCall,
  fetchInstituteDistrictsCall,
  fetchSchoolsCall,
  archiveDetail,
  openArchivePopup,
  toggleArchivePopup,
  dashboard,
}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const [addDashboardModal, setAddDashboardModal] = React.useState({})
  const toggleAddDashboard = (event) => {
    if (isEmpty(addDashboardModal)) {
      const index = event.currentTarget.attributes['data-index'].value
      setAddDashboardModal({ position: index })
    } else {
      setAddDashboardModal({})
    }
  }
  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbDashboard'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: dashboard.name,
      href: '',
    },
  ]
  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={6} sm="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="700">
                {dashboard.name}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs="auto">
            <Box
              display="flex"
              alignItems="center"
              justifyContent={{
                xs: 'flex-start',
                sm: 'flex-end',
                md: 'flex-end',
              }}
            >
              {/* <Box ml={2}>
                <Button
                  classes="text-transform-none"
                  variant="contained"
                  color="primary"
                  disableElevation
                  className="text-transform-none"
                  size="large"
                  type="submit"
                >
                  {t('update')}
                </Button>
              </Box> */}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Paper rounded={true} elevation={1} className="paper-round">
        <Box px={2} py={2} width="100%" className="grid-list">
          <Grid container spacing={3}>
            {dashboardWidgetsList.map((widget, index) => {
              return widget.filled ? (
                <Grid key={index} item xs={12} sm={6} lg={4} xl={4}>
                  <Box className={classes.topicGridBox + ' grid-box-border'}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-start"
                      height="100%"
                      width="100%"
                      position="relative"
                    >
                      <Box display="flex" justifyContent="space-between">
                        <Typography component="span" variant="h6">
                          {widget.label}
                        </Typography>

                        <Tooltip title={t('delete')}>
                          <IconButton
                            id={`action-button`}
                            edge="end"
                            aria-controls="action-menu"
                            aria-haspopup="true"
                            data-id={widget._id}
                            onClick={toggleArchivePopup}
                          >
                            <Trash className="text-secondary" height="16px" width="16px" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Box className={classes.widgetBox}>
                        <Widgets widget={widget} />
                      </Box>
                      <Box mt={{ xs: 4, md: 2 }}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {widget.widget_info?.name}
                          </Box>
                        </Typography>
                        <Typography component="p" variant="body2" color="textSecondary">
                          {widget.widget_info?.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ) : (
                <Grid key={index} item xs={12} sm={6} lg={4} xl={4}>
                  <Box
                    className={classes.topicGridBox + ' grid-box-border cursor-pointer'}
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                    flexGrow="1"
                    data-index={index}
                    justifyContent="center"
                    minHeight={{ xs: '210px', sm: '150px', md: '300px' }}
                    onClick={toggleAddDashboard}
                  >
                    <img height="50px" src={adddashboard} alt="Graph" />
                    <Box
                      textAlign="center"
                      component="span"
                      fontSize={18}
                      width="250px"
                      pt={2}
                      fontWeight="500"
                    >
                      {t('addWidget')}
                    </Box>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Paper>
      <AvailableWidget
        open={!isEmpty(addDashboardModal)}
        onClose={toggleAddDashboard}
        dashboardMasterWidgets={dashboardMasterWidgets}
        addDashboardWidget={addDashboardWidget}
        fetchDistrictsCall={fetchDistrictsCall}
        fetchInstituteDistrictsCall={fetchInstituteDistrictsCall}
        fetchSchoolsCall={fetchSchoolsCall}
        holderInfo={addDashboardModal}
      />
      <ConfirmBox
        maxWidth="xs"
        open={openArchivePopup}
        close={toggleArchivePopup}
        onConfirm={archiveDetail}
        defaultProps={{ message: 'removeConfirmation', buttonText: 'remove' }}
      />
    </>
  )
}

DashboardView.propTypes = {
  dashboardMasterWidgets: PropTypes.array,
  addDashboardWidget: PropTypes.func,
  dashboardWidgetsList: PropTypes.array,
  fetchDistrictsCall: PropTypes.func,
  fetchInstituteDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  archiveDetail: PropTypes.func,
  openArchivePopup: PropTypes.bool,
  toggleArchivePopup: PropTypes.func,
  dashboard: PropTypes.object,
}

DashboardView.defaultProps = {
  dashboardMasterWidgets: [],
  addDashboardWidget: () => {},
  dashboardWidgetsList: [],
  fetchDistrictsCall: () => {},
  fetchInstituteDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
  archiveDetail: () => {},
  openArchivePopup: false,
  toggleArchivePopup: () => {},
  dashboard: {},
}

export default DashboardView
