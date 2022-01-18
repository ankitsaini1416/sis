import { Box, Button, Divider, Grid, Paper, Tab, Tabs, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowLeft, Edit2, Globe } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import DistrictImg from '../../../../../assets/images/upload-logo.png'
import { ROUTES } from '../../../../../helpers/constants'
import { isEmpty } from '../../../../../helpers/utils'
import withRedirect from '../../../../../hocs/RedirectHOC'
import Breadcrumb from '../../../../breadcrumbs/Breadcrumbs'
import DetailsSection from './Details'
import DistrictSkeleton from './DistrictDetailSkeleton'
import SchoolsSection from './Schools'
// import useStyles from '../Organizations.Style'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function DistrictDetails({
  district,
  onChangePage,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  schools,
  allHeadCells,
  pageDetails,
  viewAdmin,
}) {
  //   const classes = useStyles()
  const history = useHistory()
  const { districtId } = useParams()
  const { t } = useTranslation()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbOrganizations'),
      href: ROUTES.DISTRICT,
    },
    {
      title: t('breadcrumbDistricts'),
      href: ROUTES.DISTRICT,
    },
    {
      title: t('breadcrumbDistrictDetails'),
      href: '',
    },
  ]
  const ButtonEnhanced = withRedirect(Button)

  if (isEmpty(district)) {
    return <DistrictSkeleton />
  }
  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography tabIndex={0} component="h4" align="left" variant="h5" color="textPrimary">
              <Box component="span" fontWeight="700">
                {t('districtDetails')}
              </Box>
              <Box ml={1} component="span" fontWeight="500" fontSize="20px" className="user-name">
                ({district.dst_name})
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
                sm: 'flex-end',
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
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="tabs"
          variant="scrollable"
          className="custom-tabs"
        >
          <Tab aria-label="District Details" label="District Details" id="userTab-0" />
          <Tab aria-label="Schools" label="Schools" id="userTab-1" />
        </Tabs>

        <TabPanel value={value} index={0} dir={theme.direction}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4} xl={3}>
              <Box
                mr={{ xs: 0, lg: 0, xl: 3 }}
                px={{ xs: 1, md: 2, lg: 3 }}
                py={{ xs: 3, sm: 3 }}
                className="profileSection"
                align="center"
                mb={{ xs: 3, sm: 3, lg: 0 }}
              >
                <Box
                  mx="auto"
                  width={{ xs: '200px', sm: '300px', md: '100%' }}
                  borderRadius={8}
                  className="image-container"
                  mb={2}
                >
                  <img
                    src={district.dst_logo || DistrictImg}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = DistrictImg
                    }}
                    alt="District's Logo"
                  />
                </Box>
                <Divider />

                <Box mt={2}>
                  {/*<Typography
                    component="h1"
                    align="center"
                    variant="h5"
                    color="textPrimary"
                    gutterBottom
                    className="word-break"
                  >
                    <Box component="span" fontWeight="fontWeightMedium" fontSize="24px">
                      {district.dst_name}
                    </Box>
                  </Typography>*/}

                  {district.dst_website ? (
                    <Typography
                      component="h6"
                      align="center"
                      variant="subtitle2"
                      gutterBottom
                      color="primary"
                      tabIndex={0}
                    >
                      <Box
                        component="span"
                        fontWeight="fontWeightMedium"
                        fontSize="14px"
                        color="primary"
                        display="flex"
                        alignItems="flex-start"
                        justifyContent="center"
                      >
                        <Globe
                          width={16}
                          height={16}
                          style={{ marginRight: '5px', marginTop: '4px' }}
                        />

                        <a
                          className="link-color-text word-break"
                          href={district.dst_website}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {district.dst_website}
                        </a>
                      </Box>
                    </Typography>
                  ) : null}
                  <Box
                    mt={2}
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {district.dst_is_active ? (
                      <Box
                        component="div"
                        mb={{ xs: 1, sm: 0 }}
                        mr={{ xs: 0, sm: 1 }}
                        className="button-label-success"
                        tabIndex={0}
                      >
                        <FiberManualRecordIcon fontSize="small" />
                        {t('active')}
                      </Box>
                    ) : (
                      <Box
                        component="div"
                        mb={{ xs: 1, sm: 0 }}
                        mr={{ xs: 0, sm: 1 }}
                        className="button-label-error"
                        tabIndex={0}
                      >
                        <FiberManualRecordIcon fontSize="small" />
                        {t('inActive')}
                      </Box>
                    )}

                    <ButtonEnhanced
                      className="text-transform-none"
                      variant="contained"
                      color="primary"
                      disableElevation
                      startIcon={<Edit2 width="18px" />}
                      to={`${ROUTES.EDITDISTRICT}/${districtId}`}
                    >
                      {t('editDistrict')}
                    </ButtonEnhanced>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={8} lg={8} xl={9}>
              <DetailsSection district={district} schools={schools} viewAdmin={viewAdmin} />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} className="horizontal-tabs-3">
          <SchoolsSection
            district={district}
            onChangePage={onChangePage}
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
            schools={schools}
            allHeadCells={allHeadCells}
            pageDetails={pageDetails}
          />
        </TabPanel>
      </Paper>
    </>
  )
}

DistrictDetails.propTypes = {
  district: PropTypes.object,
  onChangePage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  schools: PropTypes.array,
  allHeadCells: PropTypes.array,
  pageDetails: PropTypes.object,
  viewAdmin: PropTypes.func,
}

DistrictDetails.defaultProps = {
  district: {},
  onChangePage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  schools: [],
  allHeadCells: [],
  pageDetails: {},
  viewAdmin: () => {},
}

export default DistrictDetails
