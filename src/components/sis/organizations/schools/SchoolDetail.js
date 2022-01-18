import { Box, Button, Divider, Grid, Paper, Tooltip, Typography } from '@material-ui/core'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowLeft, Edit2, Globe } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import SchoolImg from '../../../../assets/images/upload-logo.png'
import { ROUTES } from '../../../../helpers/constants'
import { get, isEmpty, isNullOrEmpty } from '../../../../helpers/utils'
import withRedirect from '../../../../hocs/RedirectHOC'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import SchoolSkeleton from './SchoolDetailSkeleton'
const breadcrumbData = [
  {
    title: 'SIS',
    href: ROUTES.DASHBOARDLIST,
  },
  {
    title: 'Organizations',
    href: ROUTES.SCHOOLS,
  },
  {
    title: 'Schools',
    href: ROUTES.SCHOOLS,
  },
  {
    title: 'School Details',
    href: '',
  },
]

function SchoolDetails({ school, viewAdmin }) {
  const history = useHistory()
  const { schoolId } = useParams()
  const { t } = useTranslation()

  const ButtonEnhanced = withRedirect(Button)
  if (isEmpty(school)) {
    return <SchoolSkeleton />
  }
  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography tabIndex={0} component="h4" align="left" variant="h5" color="textPrimary">
              <Box component="span" fontWeight="700">
                {t('schoolDetail')}
              </Box>
              <Box ml={1} component="span" fontWeight="500" fontSize="20px" className="user-name">
                ({school.sch_name})
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
        <Box p={3}>
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
                  mb={2}
                  mx="auto"
                  width={{ xs: '200px', sm: '300px', md: '100%' }}
                  borderRadius={8}
                  className="image-container"
                >
                  <img
                    tabIndex={0}
                    src={school.sch_logo || SchoolImg}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = SchoolImg
                    }}
                    alt="School Logo"
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
                      {school.sch_name}
                    </Box>
                  </Typography>*/}
                  {school.sch_website ? (
                    <Typography
                      component="h6"
                      align="center"
                      variant="subtitle2"
                      gutterBottom
                      color="primary"
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
                          href={school.sch_website}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {school.sch_website}
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
                    {school.sch_is_active ? (
                      <Box
                        tabIndex={0}
                        component="div"
                        mb={{ xs: 1, sm: 0 }}
                        mr={{ xs: 0, sm: 1 }}
                        className="button-label-success"
                      >
                        <FiberManualRecordIcon fontSize="small" />
                        {t('active')}
                      </Box>
                    ) : (
                      <Box
                        tabIndex={0}
                        component="div"
                        mb={{ xs: 1, sm: 0 }}
                        mr={{ xs: 0, sm: 1 }}
                        className="button-label-error"
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
                      to={`${ROUTES.EDITSCHOOL}/${schoolId}`}
                    >
                      {t('editSchool')}
                    </ButtonEnhanced>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={8} lg={8} xl={9}>
              <Box pb={{ xs: 0, sm: 3, lg: 4 }}>
                <Typography
                  tabIndex={0}
                  component=""
                  align="left"
                  variant="body2"
                  color="Primary"
                  className="bg-color-surface"
                >
                  <Box component="span" fontWeight="600" fontSize="16px">
                    {t('generalInformation')}
                  </Box>
                </Typography>
                <Box mb={5} mt={5}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textDefault"
                        >
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {t('district')}
                          </Box>
                        </Typography>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="subtitle2"
                          color="textPrimary"
                          gutterBottom
                          className="word-break"
                        >
                          <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                            {get(school, 'sch_district.dst_name', '')}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textDefault"
                        >
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {t('schoolName')}
                          </Box>
                        </Typography>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="subtitle2"
                          color="textPrimary"
                          gutterBottom
                          className="word-break"
                        >
                          <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                            {school.sch_name}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textDefault"
                        >
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {t('schoolCode')}
                          </Box>
                        </Typography>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="subtitle2"
                          color="textPrimary"
                          gutterBottom
                          className="word-break"
                        >
                          <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                            {school.sch_school_short_name}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textDefault"
                        >
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {t(`schoolType`)}
                          </Box>
                        </Typography>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="subtitle2"
                          color="textPrimary"
                          gutterBottom
                          className="word-break"
                        >
                          <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                            {t(`reference:${school.sch_school_type}`)}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textDefault"
                        >
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {t('contactPerson')}
                          </Box>
                        </Typography>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="subtitle2"
                          color="textPrimary"
                          gutterBottom
                          className="word-break"
                        >
                          <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                            {school.sch_contact_person}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textDefault"
                        >
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {t('contactEmail')}
                          </Box>
                        </Typography>
                        <Typography
                          component="h6"
                          align="left"
                          variant="subtitle2"
                          color="textPrimary"
                          gutterBottom
                        >
                          <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                            <Tooltip title={school.sch_contact_email}>
                              <a
                                className="link-color-text text-ellipsis"
                                href={`mailto:${school.sch_contact_email}`}
                              >
                                {school.sch_contact_email}
                              </a>
                            </Tooltip>
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textDefault"
                        >
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {t('contactPhone')}
                          </Box>
                        </Typography>
                        <Typography
                          component="h6"
                          align="left"
                          variant="subtitle2"
                          color="textPrimary"
                          gutterBottom
                          className="word-break"
                        >
                          <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                            {school.sch_phone ? (
                              <a
                                className="link-color-text"
                                href={`tel:${school.sch_phone_prefix}${school.sch_phone}`}
                              >
                                ({school.sch_phone_prefix}){school.sch_phone}
                              </a>
                            ) : (
                              <Box className="icon-color-light" fontSize="15px">
                                {t('notAvailable')}
                              </Box>
                            )}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textPrimary"
                        >
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {t('slugLink')}
                          </Box>
                        </Typography>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="subtitle2"
                          color="textPrimary"
                          gutterBottom
                          className="word-break"
                        >
                          <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                            {school.sch_slug}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textDefault"
                        >
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {t('addressLine1')}
                          </Box>
                        </Typography>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="subtitle2"
                          color="textPrimary"
                          gutterBottom
                          className="word-break"
                        >
                          <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                            {get(school, 'sch_address.adr_address1', '')}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textDefault"
                        >
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {t('addressLine2')}
                          </Box>
                        </Typography>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="subtitle2"
                          color="textPrimary"
                          gutterBottom
                          className="word-break"
                        >
                          <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                            {get(school, 'sch_address.adr_address2', '') ? (
                              get(school, 'sch_address.adr_address2', '')
                            ) : (
                              <Box className="icon-color-light" fontSize="15px">
                                {t('notAvailable')}
                              </Box>
                            )}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textDefault"
                        >
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {t('country')}
                          </Box>
                        </Typography>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="subtitle2"
                          color="textPrimary"
                          gutterBottom
                          className="word-break"
                        >
                          <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                            {get(school, 'sch_address.adr_country_name')}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textDefault"
                        >
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {t('state')}
                          </Box>
                        </Typography>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="subtitle2"
                          color="textPrimary"
                          gutterBottom
                          className="word-break"
                        >
                          <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                            {isNullOrEmpty(school.sch_address?.adr_state_name)
                              ? get(school, 'sch_address.adr_state_iso', '')
                              : get(school, 'sch_address.adr_state_name')}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textDefault"
                        >
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {t('city')}
                          </Box>
                        </Typography>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="subtitle2"
                          color="textPrimary"
                          gutterBottom
                          className="word-break"
                        >
                          <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                            {get(school, 'sch_address.adr_city', '')}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textDefault"
                        >
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {t('postalCodeZip')}
                          </Box>
                        </Typography>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="subtitle2"
                          color="textPrimary"
                          gutterBottom
                          className="word-break"
                        >
                          <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                            {get(school, 'sch_address.adr_zipcode', '')}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textDefault"
                        >
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {t('officePhone')}
                          </Box>
                        </Typography>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="subtitle2"
                          color="textPrimary"
                          gutterBottom
                          className="word-break"
                        >
                          <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                            {get(school, 'sch_address.adr_phone', '') ? (
                              <a
                                className="link-color-text"
                                href={`tel:${school.sch_address.adr_phone_prefix}${school.sch_address.adr_phone}`}
                              >
                                ({get(school, 'sch_address.adr_phone_prefix', '')})
                                {get(school, 'sch_address.adr_phone', '')}
                              </a>
                            ) : (
                              <Box className="icon-color-light" fontSize="15px">
                                {t('notAvailable')}
                              </Box>
                            )}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textDefault"
                        >
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {t('fax')}
                          </Box>
                        </Typography>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="subtitle2"
                          color="textPrimary"
                          gutterBottom
                          className="word-break"
                        >
                          <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                            {get(school, 'sch_address.adr_fax', '') ? (
                              get(school, 'sch_address.adr_fax', '')
                            ) : (
                              <Box className="icon-color-light" fontSize="15px">
                                {t('notAvailable')}
                              </Box>
                            )}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textDefault"
                        >
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {t('phoneExtension')}
                          </Box>
                        </Typography>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="subtitle2"
                          color="textPrimary"
                          gutterBottom
                          className="word-break"
                        >
                          <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                            {get(school, 'sch_address.adr_phone_ext', '') ? (
                              get(school, 'sch_address.adr_phone_ext', '')
                            ) : (
                              <Box className="icon-color-light" fontSize="15px">
                                {t('notAvailable')}
                              </Box>
                            )}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textDefault"
                        >
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {t('createdDate')}
                          </Box>
                        </Typography>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="subtitle2"
                          color="textPrimary"
                          gutterBottom
                          className="word-break"
                        >
                          <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                            {school.createdTimeLabel}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Box mb={{ xs: 3, lg: 3 }}>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textDefault"
                        >
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {t('lastModifiedDate')}
                          </Box>
                        </Typography>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="subtitle2"
                          color="textPrimary"
                          gutterBottom
                          className="word-break"
                        >
                          <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                            {school.updatedTimeLabel}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                      <Box mb={{ xs: 3, lg: 0 }}>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textDefault"
                        >
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {t('detailsDescription')}
                          </Box>
                        </Typography>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="subtitle2"
                          color="textPrimary"
                          gutterBottom
                          className="word-break"
                        >
                          <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                            {school.sch_description ? (
                              school.sch_description
                            ) : (
                              <Box className="icon-color-light" fontSize="15px">
                                {t('notAvailable')}
                              </Box>
                            )}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={5} mb={3}>
                  <Button
                    className="custom-default-button text-transform-none"
                    size="large"
                    variant="contained"
                    disableElevation
                    onClick={viewAdmin}
                    color="primary"
                  >
                    {t('viewSchoolAdmin')}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  )
}

SchoolDetails.propTypes = {
  onChangePage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  school: PropTypes.object,
  viewAdmin: PropTypes.func,
}

SchoolDetails.propTypes = {
  onChangePage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  school: {},
  viewAdmin: () => {},
}

export default SchoolDetails
