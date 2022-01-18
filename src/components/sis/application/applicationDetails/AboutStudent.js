import { Avatar, Box, Button, Grid, Hidden, Paper, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { Calendar, Check, Hash, Image, X } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { REGISTERATION_STATUS } from '../../../../helpers/constants'
import { get } from '../../../../helpers/utils'

function AboutStudentApplication({ details, school, editDetailAction }) {
  const { t } = useTranslation()
  const approval_status = get(details, 'attributes.approval_status[0]', '')

  return (
    <>
      <Paper rounded={true} elevation={1} className="paper-round">
        <Box px={3} pt={2} pb={4}>
          {/* <Typography
            component=""
            align="left"
            variant="body2"
            color="primary"
            className="bg-color-surface"
            gutterBottom
          >
            <Box component="span" fontWeight="600" fontSize="16px">
              {t('personalDetails')}
            </Box>
          </Typography> */}
          <Grid container spacing={3}>
            <Hidden mdUp>
              <Grid item xs={12}>
                <Box>
                  {/* Status visible if request is accepted rejected or Admin approval is not checked */}
                  <Typography
                    component="h6"
                    align="left"
                    variant="h5"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box mr={2} component="span" fontWeight="600" fontSize="14px">
                      {t('status')}
                    </Box>
                    <Box
                      component="span"
                      className={
                        approval_status === REGISTERATION_STATUS.REJECTED
                          ? 'label-red'
                          : approval_status === REGISTERATION_STATUS.APPROVED
                          ? 'label-green'
                          : 'label-warning'
                      }
                      fontSize="14px"
                    >
                      {approval_status}
                    </Box>
                  </Typography>
                </Box>

                <Box mt={2}>
                  {/* Accept/ Reject Button if admin Approval is checked */}
                  <Box component="span" mr={1}>
                    <Button
                      className="custom-contained-success-button text-transform-none"
                      variant="contained"
                      disabled={
                        approval_status === REGISTERATION_STATUS.PENDING
                          ? false
                          : approval_status === REGISTERATION_STATUS.APPROVED
                          ? true
                          : false
                      }
                      startIcon={<Check width="16px" />}
                    >
                      {t('accept')}
                    </Button>
                  </Box>
                  <Button
                    className="text-transform-none"
                    variant="contained"
                    color="secondary"
                    disabled={
                      approval_status === REGISTERATION_STATUS.PENDING
                        ? false
                        : approval_status === REGISTERATION_STATUS.REJECTED
                        ? true
                        : false
                    }
                    startIcon={<X width="16px" />}
                  >
                    {t('reject')}
                  </Button>
                </Box>
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box display="flex" alignItems="center">
                <Box component="span">
                  {school.sch_district?.dst_logo ? (
                    <Avatar alt="Avatar" src={school.sch_district?.dst_logo} />
                  ) : (
                    <Avatar className="dp">
                      <Image />
                    </Avatar>
                  )}
                </Box>
                <Box ml={2}>
                  <Typography
                    component="h6"
                    align="left"
                    variant="h5"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('districtName')}
                    </Box>
                  </Typography>
                  <Typography
                    component="p"
                    align="left"
                    variant="h5"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {school.sch_district?.dst_name}
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box display="flex" alignItems="center">
                <Box component="span">
                  {school.sch_logo ? (
                    <Avatar alt="Remy Sharp" src={school.sch_logo} />
                  ) : (
                    <Avatar className="dp">
                      <Image />
                    </Avatar>
                  )}
                </Box>
                <Box ml={2}>
                  <Typography
                    component="h6"
                    align="left"
                    variant="h5"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('schoolName')}
                    </Box>
                  </Typography>
                  <Typography
                    component="p"
                    align="left"
                    variant="h5"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {school.sch_name}
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Hidden smDown>
              <Grid item xs={12} sm={6} md={4} lg={6}>
                {/* Status visible if request is accepted rejected or Admin approval is not checked */}
                <Typography
                  component="h6"
                  align="left"
                  variant="h5"
                  color="textPrimary"
                  tabIndex={0}
                >
                  <Box component="span" fontWeight="600" fontSize="14px">
                    {t('status')}
                  </Box>
                </Typography>
                <Box display="flex" alignItems="center" flexWrap="wrap">
                  <Typography
                    component="span"
                    align="left"
                    variant="h5"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box
                      component="div"
                      className={
                        approval_status === REGISTERATION_STATUS.DENIED
                          ? 'label-red'
                          : approval_status === REGISTERATION_STATUS.APPROVED
                          ? 'label-green'
                          : 'label-warning'
                      }
                      fontSize="14px"
                      mr={1}
                    >
                      {approval_status}
                    </Box>
                  </Typography>

                  <Box ml={{ xs: 0, xl: 2 }} mt={{ xs: 0, sm: 2, md: 1, lg: 0, xl: 0 }}>
                    {/* Accept/ Reject Button if admin Approval is checked */}
                    <Box component="span" mr={1}>
                      <Button
                        className="custom-contained-success-button text-transform-none"
                        disableElevation
                        variant="contained"
                        data-action={REGISTERATION_STATUS.APPROVED}
                        onClick={editDetailAction}
                        disabled={
                          approval_status === REGISTERATION_STATUS.INPROCESS
                            ? false
                            : approval_status === REGISTERATION_STATUS.APPROVED
                            ? true
                            : false
                        }
                        startIcon={<Check width="16px" />}
                      >
                        {t('accept')}
                      </Button>
                    </Box>
                    <Button
                      className="text-transform-none"
                      disableElevation
                      variant="contained"
                      color="secondary"
                      data-action={REGISTERATION_STATUS.DENIED}
                      startIcon={<X width="16px" />}
                      onClick={editDetailAction}
                      disabled={
                        approval_status === REGISTERATION_STATUS.INPROCESS
                          ? false
                          : approval_status === REGISTERATION_STATUS.DENIED
                          ? true
                          : false
                      }
                    >
                      {t('reject')}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Hidden>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box display="flex" alignItems="center">
                <Box className="custom-icon-btn" borderRadius="100%">
                  <Hash height={22} width={22} />
                </Box>
                <Box ml={2}>
                  <Typography
                    component="h6"
                    align="left"
                    variant="h5"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('applicationsId')}
                    </Box>
                  </Typography>
                  <Typography
                    component="p"
                    align="left"
                    variant="h5"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details.attributes?.public_id}
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box display="flex" alignItems="center">
                <Box className="custom-icon-btn" borderRadius="100%">
                  <Calendar height={22} width={22} />
                </Box>
                <Box ml={2}>
                  <Typography
                    component="h6"
                    align="left"
                    variant="h5"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('dateOfApplication')}
                    </Box>
                  </Typography>
                  <Typography
                    component="p"
                    align="left"
                    variant="h5"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details.createdDate}
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box display="flex" alignItems="center">
                <Box className="custom-icon-btn" borderRadius="100%">
                  <Calendar height={22} width={22} />
                </Box>
                <Box ml={2}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h5"
                    color="textPrimary"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('lastModifiedDate')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="p"
                    align="left"
                    variant="h5"
                    color="textPrimary"
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details.updatedDate}
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  )
}
AboutStudentApplication.propTypes = {
  details: PropTypes.object,
  school: PropTypes.array,
  editDetailAction: PropTypes.func,
}

AboutStudentApplication.defaultProps = {
  details: {},
  school: [],
  editDetailAction: () => {},
}

export default AboutStudentApplication
