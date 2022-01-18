import { Box, Button, Grid, Tooltip, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Details({ district, viewAdmin }) {
  const { t } = useTranslation()

  return (
    <Box pb={{ xs: 0, sm: 3, lg: 4 }}>
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
      <Box mb={5} mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Box mb={{ xs: 3, lg: 3 }}>
              <Typography tabIndex={0} component="h6" align="left" variant="h6" color="textPrimary">
                <Box component="span" fontWeight="600" fontSize="14px">
                  {t('category')}
                </Box>
              </Typography>
              <Typography
                component="h6"
                align="left"
                variant="subtitle2"
                color="textPrimary"
                gutterBottom
                className="word-break"
                tabIndex={0}
              >
                <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                  {t(`reference:${district.dst_category}`)}
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Box mb={{ xs: 3, lg: 3 }}>
              <Typography tabIndex={0} component="h6" align="left" variant="h6" color="textPrimary">
                <Box component="span" fontWeight="600" fontSize="14px">
                  {t('districtName')}
                </Box>
              </Typography>
              <Typography
                tabIndex={0}
                className="word-break"
                component="h6"
                align="left"
                variant="subtitle2"
                color="textPrimary"
              >
                <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                  {district.dst_name}
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Box mb={{ xs: 3, lg: 3 }}>
              <Typography tabIndex={0} component="h6" align="left" variant="h6" color="textPrimary">
                <Box component="span" fontWeight="600" fontSize="14px">
                  {t('schoolBoard')}
                </Box>
              </Typography>
              <Typography
                tabIndex={0}
                className="word-break"
                component="h6"
                align="left"
                variant="subtitle2"
                color="textPrimary"
                gutterBottom
              >
                <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                  {district.dst_organization ? (
                    district.dst_organization
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
              <Typography tabIndex={0} component="h6" align="left" variant="h6" color="textPrimary">
                <Box component="span" fontWeight="600" fontSize="14px">
                  {t('superintendent')}
                </Box>
              </Typography>
              <Typography
                tabIndex={0}
                className="word-break"
                component="h6"
                align="left"
                variant="subtitle2"
                color="textPrimary"
                gutterBottom
              >
                <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                  {district.dst_contact_person}
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Box mb={{ xs: 3, lg: 3 }}>
              <Typography tabIndex={0} component="h6" align="left" variant="h6" color="textPrimary">
                <Box component="span" fontWeight="600" fontSize="14px">
                  {t('superintendentEmail')}
                </Box>
              </Typography>
              <Typography
                className="text-ellipsis"
                component="h6"
                align="left"
                variant="subtitle2"
                color="textPrimary"
                gutterBottom
              >
                <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                  <Tooltip title={district.dst_contact_email}>
                    <a
                      className="link-color-text text-ellipsis"
                      href={`mailto:${district.dst_contact_email}`}
                    >
                      {district.dst_contact_email}
                    </a>
                  </Tooltip>
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Box mb={{ xs: 3, lg: 3 }}>
              <Typography tabIndex={0} component="h6" align="left" variant="h6" color="textPrimary">
                <Box component="span" fontWeight="600" fontSize="14px">
                  {t('districtType')}
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
                  {t(`reference:${district.dst_type}`)}
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Box mb={{ xs: 3, lg: 3 }}>
              <Typography tabIndex={0} component="h6" align="left" variant="h6" color="textPrimary">
                <Box component="span" fontWeight="600" fontSize="14px">
                  {t('superintendentPhone')}
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
                  <a
                    className="link-color-text"
                    href={`tel:${district.dst_phone_prefix}${district.dst_phone}`}
                  >
                    ({district.dst_phone_prefix}){district.dst_phone}
                  </a>
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Box mb={{ xs: 3, lg: 3 }}>
              <Typography tabIndex={0} component="h6" align="left" variant="h6" color="textPrimary">
                <Box component="span" fontWeight="600" fontSize="14px">
                  {t('schoolCount')}
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
                  {district.dst_school_count}
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Box mb={{ xs: 3, lg: 3 }}>
              <Typography tabIndex={0} component="h6" align="left" variant="h6" color="textPrimary">
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
                  {district.dst_slug}
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Box mb={{ xs: 3, lg: 3 }}>
              <Typography tabIndex={0} component="h6" align="left" variant="h6" color="textPrimary">
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
                  {district.createdTimeLabel}
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Box mb={{ xs: 3, lg: 3 }}>
              <Typography tabIndex={0} component="h6" align="left" variant="h6" color="textPrimary">
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
                  {district.updatedTimeLabel}
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Box mb={{ xs: 3, lg: 0 }}>
              <Typography tabIndex={0} component="h6" align="left" variant="h6" color="textPrimary">
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
                  {district.dst_description ? (
                    district.dst_description
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
      <Button
        className="custom-default-button text-transform-none"
        size="large"
        variant="contained"
        disableElevation
        onClick={viewAdmin}
        color="primary"
      >
        {t('viewDistrictAdmin')}
      </Button>
    </Box>
  )
}

Details.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  district: PropTypes.object,
  viewAdmin: PropTypes.func,
}

Details.defaultProps = {
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  district: {},
  viewAdmin: () => {},
}

export default Details
