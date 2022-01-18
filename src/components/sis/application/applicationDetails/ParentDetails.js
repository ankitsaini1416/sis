import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { Check, Edit2, LogIn, MessageCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'

import UploadImg from '../../../../assets/images/upload.png'
import { getFullName, isEmpty } from '../../../../helpers/utils'

function CircularProgressWithLabel(props) {
  return (
    <Box top={0} left={0} position="absolute" display="inline-flex" className="profile-circle">
      <CircularProgress
        variant="determinate"
        thickness={1.5}
        {...props}
        style={{ height: '140px', width: '140px', transform: 'rotate(90deg)' }}
      />
      <Box
        top={0}
        left={0}
        bottom={-5}
        right={0}
        position="absolute"
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
}
function Permission({ details, toggleEditParentInfo }) {
  const { t } = useTranslation()

  const [courseStatus, setCourseStatus] = React.useState(0)
  const handleStatus = (event) => {
    setCourseStatus(event.target.value)
  }

  const statusType = [
    {
      value: '0',
      label: 'Active',
    },
    {
      value: '1',
      label: 'In Active',
    },
  ]
  return (
    <Box px={{ xs: 2, md: 0 }} pt={{ xs: 2, md: 0 }} pb={{ xs: 2, sm: 3, lg: 4 }}>
      <Box mb={2}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs="auto">
            <Typography tabIndex={0} component="h4" align="left" variant="h5" color="textPrimary">
              <Box fontWeight="600" fontSize="16px">
                {t('generalInformation')}
              </Box>
            </Typography>
          </Grid>

          <Grid item xs="auto">
            <Button
              className="text-transform-none"
              size="large"
              variant="contained"
              disableElevation
              startIcon={<Edit2 width={16} height={16} />}
              color="primary"
              onClick={toggleEditParentInfo}
            >
              {t('edit')}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Grid container>
        <Grid item xs={12} xl={4}>
          <Box
            p={3}
            mr={{ xs: 0, xl: 5 }}
            className="profileSection"
            mb={{ xs: 3, xl: 0 }}
            display="flex"
            alignItems="center"
            justifyContent={{ xs: 'center', sm: 'flex-start', xl: 'center' }}
            flexDirection={{ xs: 'column', sm: 'row', xl: 'column' }}
          >
            <Box align="center" position="relative" className="user-profile-progress">
              <CircularProgressWithLabel value={details?.parents[0]?.parentProfileComplete || 0} />
              <img
                src={UploadImg}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = UploadImg
                }}
                alt="Filter"
              />
            </Box>

            <Box
              display="flex"
              alignItems={{ xs: 'center', sm: 'flex-start', xl: 'center' }}
              justifyContent={{ xs: 'center', sm: 'flex-start', xl: 'center' }}
              flexDirection={{ xs: 'column', sm: 'column', xl: 'column' }}
              ml={{ xs: 0, sm: 3, xl: 0 }}
              mt={{ xs: 3, sm: 0, xl: 3 }}
              width={{ xs: '100%', sm: 'auto' }}
            >
              <Typography tabIndex={0} component="h1" variant="h5" color="textPrimary">
                <Box component="span" fontWeight="500">
                  {!isEmpty(details?.parents) && getFullName(details?.parents[0])}
                </Box>
              </Typography>
              <Box
                mt={2}
                flexDirection={{ xs: 'column', sm: 'row' }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
              >
                <Button
                  className="text-transform-none custom-default-button"
                  variant="contained"
                  color="primary"
                  disableElevation
                  startIcon={<LogIn width="18px" />}
                  disabled
                >
                  {t('loginAsParent1')}
                </Button>

                <Box mt={{ xs: 1, sm: 0, xl: 0 }} ml={{ xs: 0, sm: 2, xl: 2 }}>
                  <Button
                    className="text-transform-none custom-default-button"
                    variant="contained"
                    color="primary"
                    disableElevation
                    startIcon={<MessageCircle width="18px" />}
                    disabled
                  >
                    {t('chat')}
                  </Button>
                </Box>
              </Box>
              <Box mt={2}>
                <TextField
                  className="status-select-field-primary contained-select-field"
                  id="select-course-status"
                  select
                  value={courseStatus}
                  onChange={handleStatus}
                  disabled
                  variant="outlined"
                  color="primary"
                  size={'small'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Check width={18} height={18} />
                      </InputAdornment>
                    ),
                  }}
                >
                  {statusType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} xl={8}>
          <Box mb={4} width="100%">
            <Typography
              tabIndex={0}
              component=""
              align="left"
              variant="body2"
              color="Primary"
              className="bg-color-surface"
            >
              <Box component="span" fontWeight="600" fontSize="16px">
                {t('parent1Details')}
              </Box>
            </Typography>
            <Box mt={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('prefix')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    name="email"
                    id="email"
                    pr={0}
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details?.parents[0]?.prefix ? (
                        details?.parents[0]?.prefix
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('firstName')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details?.parents[0]?.first_name ? (
                        details?.parents[0]?.first_name
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('middleName')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details?.parents[0]?.middle_name ? (
                        details?.parents[0]?.middle_name
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('lastName')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details?.parents[0]?.last_name ? (
                        details?.parents[0]?.last_name
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('suffix')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details?.parents[0]?.suffix ? (
                        details?.parents[0]?.suffix
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('preferredName')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details?.parents[0]?.nick_name ? (
                        details?.parents[0]?.nick_name
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('emailAddress')}
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
                      {details?.parents[0]?.email ? (
                        <Tooltip title={details?.parents[0]?.email}>
                          <a
                            className="link-color-text text-ellipsis"
                            href={`mailto:${details?.parents[0]?.email}`}
                          >
                            {details?.parents[0]?.email}
                          </a>
                        </Tooltip>
                      ) : (
                        <Box tabIndex={0} className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('phoneNumber')}
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
                      {details?.parents[1]?.primary_phone_number ? (
                        <a
                          className="link-color-text"
                          href={`tel:${details?.parents[0]?.primary_phone_number_prefix}${details?.parents[1]?.primary_phone_number}`}
                        >
                          ({details?.parents[0]?.primary_phone_number_prefix})
                          {details?.parents[0]?.primary_phone_number}
                        </a>
                      ) : (
                        <Box tabIndex={0} className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('homePhoneNumber')}
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
                      {details?.parents[1]?.home_phone_number ? (
                        <a
                          className="link-color-text"
                          href={`tel:${details?.parents[1]?.home_phone_number_prefix}${details?.parents[1]?.home_phone_number}`}
                        >
                          ({details?.parents[1]?.home_phone_number_prefix})
                          {details?.parents[1]?.home_phone_number}
                        </a>
                      ) : (
                        <Box tabIndex={0} className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('relationshipWithStudent')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details?.parents[0]?.relationship_with_student ? (
                        details?.parents[0]?.relationship_with_student
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('ssn/passport')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details?.parents[0]?.ssn ? (
                        details?.parents[0]?.ssn
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                {/*<Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('ethnicity')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details?.parents[0]?.ethnicity ? (
                        details?.parents[0]?.ethnicity
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>*/}
                {/* Todo */}
                {/*<Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('gender')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details?.parents[0]?.gender ? (
                        details?.parents[0]?.gender
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('dateOfBirth')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details?.parents[0]?.dobLabel ? (
                        details?.parents[0]?.dobLabel
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>*/}

                {/*<Grid item xs={12} sm={6} md={4} lg={3}>
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
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details.address?.adr_address1 ? (
                        details.address?.adr_address1
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
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
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details.address?.adr_address2 ? (
                        details.address?.adr_address2
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="h6"
                    color="textDefault"
                  >
                    <Box component="span" fontWeight="600" fontSize="14px">
                      {t('Country')}
                    </Box>
                  </Typography>
                  <Typography
                    tabIndex={0}
                    component="h6"
                    align="left"
                    variant="subtitle2"
                    color="textPrimary"
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details.address?.adr_country_name ? (
                        details.address?.adr_country_name
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
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
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details.address?.adr_state_name || details.address?.adr_state_iso ? (
                        isNullOrEmpty(details.address?.adr_state_name) ? (
                          details.address?.adr_state_iso
                        ) : (
                          details.address?.adr_state_name
                        )
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
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
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details.address?.adr_city ? (
                        details.address?.adr_city
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
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
                  >
                    <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                      {details.address?.adr_zipcode ? (
                        details.address?.adr_zipcode
                      ) : (
                        <Box className="icon-color-light" fontSize="15px">
                          {t('notAvailable')}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </Grid>*/}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box mt={5}>
        <Grid container>
          <Grid item xs={12} xl={4}>
            <Box
              p={3}
              mr={{ xs: 0, xl: 5 }}
              className="profileSection"
              mb={{ xs: 3, xl: 0 }}
              display="flex"
              alignItems="center"
              justifyContent={{ xs: 'center', sm: 'flex-start', xl: 'center' }}
              flexDirection={{ xs: 'column', sm: 'row', xl: 'column' }}
            >
              <Box align="center" position="relative" className="user-profile-progress">
                <CircularProgressWithLabel
                  value={details?.parents[1]?.parentProfileComplete || 0}
                />
                <img
                  src={UploadImg}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = UploadImg
                  }}
                  alt="Filter"
                />
              </Box>

              <Box
                display="flex"
                alignItems={{ xs: 'center', sm: 'flex-start', xl: 'center' }}
                justifyContent={{ xs: 'center', sm: 'flex-start', xl: 'center' }}
                flexDirection={{ xs: 'column', sm: 'column', xl: 'column' }}
                ml={{ xs: 0, sm: 3, xl: 0 }}
                mt={{ xs: 3, sm: 0, xl: 3 }}
                width={{ xs: '100%', sm: 'auto' }}
              >
                <Typography tabIndex={0} component="h1" variant="h5" color="textPrimary">
                  <Box component="span" fontWeight="500">
                    {!isEmpty(details?.parents) && getFullName(details?.parents[1])}
                  </Box>
                </Typography>
                <Box
                  mt={2}
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                >
                  <Button
                    className="text-transform-none custom-default-button"
                    variant="contained"
                    color="primary"
                    disableElevation
                    startIcon={<LogIn width="18px" />}
                    disabled
                  >
                    {t('loginAsParent2')}
                  </Button>
                  <Box mt={{ xs: 1, sm: 0, xl: 0 }} ml={{ xs: 0, sm: 2, xl: 2 }}>
                    <Button
                      className="text-transform-none custom-default-button"
                      variant="contained"
                      color="primary"
                      disableElevation
                      startIcon={<MessageCircle width="18px" />}
                      disabled
                    >
                      {t('chat')}
                    </Button>
                  </Box>
                </Box>

                <Box mt={2}>
                  <TextField
                    className="status-select-field-primary contained-select-field"
                    id="select-course-status"
                    select
                    value={courseStatus}
                    disabled
                    onChange={handleStatus}
                    variant="outlined"
                    color="primary"
                    size={'small'}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Check width={18} height={18} />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {statusType.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} xl={8}>
            <Box mb={4} width="100%">
              <Typography
                tabIndex={0}
                component=""
                align="left"
                variant="body2"
                color="Primary"
                className="bg-color-surface"
              >
                <Box component="span" fontWeight="600" fontSize="16px">
                  {t('parent2Details')}
                </Box>
              </Typography>

              <Box mt={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('prefix')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details?.parents[1]?.prefix ? (
                          details?.parents[1]?.prefix
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('firstName')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details?.parents[1]?.first_name ? (
                          details?.parents[1]?.first_name
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('middleName')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details?.parents[1]?.middle_name ? (
                          details?.parents[1]?.middle_name
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('lastName')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details?.parents[1]?.last_name ? (
                          details?.parents[1]?.last_name
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('suffix')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details?.parents[1]?.suffix ? (
                          details?.parents[1]?.suffix
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('preferredName')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details?.parents[0]?.nick_name ? (
                          details?.parents[0]?.nick_name
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('emailAddress')}
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
                        {details?.parents[1]?.email ? (
                          <Tooltip title={details?.parents[1]?.email}>
                            <a
                              className="link-color-text text-ellipsis"
                              href={`mailto:${details?.parents[1]?.email}`}
                            >
                              {details?.parents[1]?.email}
                            </a>
                          </Tooltip>
                        ) : (
                          <Box tabIndex={0} className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('phoneNumber')}
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
                        {details?.parents[1]?.primary_phone_number ? (
                          <a
                            className="link-color-text"
                            href={`tel:${details?.parents[1]?.primary_phone_number_prefix}${details?.parents[1]?.primary_phone_number}`}
                          >
                            ({details?.parents[1]?.primary_phone_number_prefix})
                            {details?.parents[1]?.primary_phone_number}
                          </a>
                        ) : (
                          <Box tabIndex={0} className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('homePhoneNumber')}
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
                        {details?.parents[1]?.home_phone_number ? (
                          <a
                            className="link-color-text"
                            href={`tel:${details?.parents[1]?.home_phone_number_prefix}${details?.parents[1]?.home_phone_number}`}
                          >
                            ({details?.parents[1]?.home_phone_number_prefix})
                            {details?.parents[1]?.home_phone_number}
                          </a>
                        ) : (
                          <Box tabIndex={0} className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('relationshipWithStudent')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details?.parents[1]?.relationship_with_student ? (
                          details?.parents[1]?.relationship_with_student
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('ssn/passport')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details?.parents[1]?.ssn ? (
                          details?.parents[1]?.ssn
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  {/*  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('ethnicity')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details?.parents[0]?.ethnicity ? (
                          details?.parents[0]?.ethnicity
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('gender')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details?.parents[0]?.gender ? (
                          details?.parents[0]?.gender
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('dateOfBirth')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details?.parents[0]?.dobLabel ? (
                          details?.parents[0]?.dobLabel
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>*/}

                  {/*<Grid item xs={12} sm={6} md={4} lg={3}>
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
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.address?.adr_address1 ? (
                          details.address?.adr_address1
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
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
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.address?.adr_address2 ? (
                          details.address?.adr_address2
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textDefault"
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('Country')}
                      </Box>
                    </Typography>
                    <Typography
                      tabIndex={0}
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.address?.adr_country_name ? (
                          details.address?.adr_country_name
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
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
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.address?.adr_state_name || details.address?.adr_state_iso ? (
                          isNullOrEmpty(details.address?.adr_state_name) ? (
                            details.address?.adr_state_iso
                          ) : (
                            details.address?.adr_state_name
                          )
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
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
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.address?.adr_city ? (
                          details.address?.adr_city
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
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
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.address?.adr_zipcode ? (
                          details.address?.adr_zipcode
                        ) : (
                          <Box className="icon-color-light" fontSize="15px">
                            {t('notAvailable')}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Grid>*/}
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
Permission.propTypes = {
  details: PropTypes.object,
  toggleEditParentInfo: PropTypes.func,
}

Permission.defaultProps = {
  details: {},
  toggleEditParentInfo: () => {},
}
export default Permission
