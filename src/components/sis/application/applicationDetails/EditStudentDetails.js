import '../../../../assets/styles/CountryCode.scss'

import DateFnsUtils from '@date-io/date-fns'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { Calendar, Download, Edit2, HelpCircle, Upload, X } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { AGMSchema } from '../../../../../clientFiles/validations'
import UploadImg from '../../../../assets/images/upload.png'
import { UsPhoneCode } from '../../../../helpers/constants'
import { get, isEmpty, mapStateWithData } from '../../../../helpers/utils'
import FormikAutoComplete from '../../../common/formikComponents/FormikAutoComplete'
import useStyles from '../Application.Style'

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

const initialState = {
  prefix: '',
  avatar_file: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  suffix: '',
  nick_name: '',
  dob: '',
  gender: '',
  ethnicity: '',
  adr_address1: '',
  adr_address2: '',
  adr_country_iso: '',
  adr_state_iso: '',
  adr_city: '',
  adr_zipcode: '',
  email: '',
  adr_mobile_prefix: UsPhoneCode,
  adr_mobile: '',
  adr_phone_prefix: UsPhoneCode,
  adr_phone: '',
  ssn: '',
  uploadIdUrl: '',
  security_question: '',
  security_answer: '',
  upload_id_file: '',
}

let countryCode = ''
function EditStudentDetails({
  details,
  masterData,
  ethnicities,
  schooolCountries,
  states,
  searchStates,
  securityQuestions,
  editUser,
  toggleEditGeneralInfo,
}) {
  const classes = useStyles()

  const { t } = useTranslation()
  const { address, ...rest } = details

  const onSubmit = function (values, { setErrors }) {
    const {
      adr_address1,
      adr_address2,
      adr_country_iso,
      adr_state_iso,
      adr_city,
      adr_zipcode,
      email,
      adr_mobile_prefix,
      adr_mobile,
      adr_phone_prefix,
      adr_phone,
      ...rest
    } = values
    editUser(
      {
        ...rest,
        address: {
          adr_address1,
          adr_address2,
          adr_country_iso,
          adr_state_iso,
          adr_city,
          adr_zipcode,
          email,
          adr_mobile_prefix,
          adr_mobile,
          adr_phone_prefix,
          adr_phone,
        },
      },
      {
        setErrors,
        callback: () => {},
      }
    )
  }

  const download = () => {
    const element = document.createElement('a')
    element.setAttribute('href', details.upload_id)
    element.setAttribute('download', details.upload_id)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={mapStateWithData({ ...rest, ...address }, initialState)}
      validationSchema={AGMSchema.editUser}
      enableReinitialize={true}
    >
      {({ setFieldValue, values, dirty }) => {
        if (values.adr_country_iso && countryCode !== values.adr_country_iso) {
          searchStates(values.adr_country_iso)
          countryCode = values.adr_country_iso
        }
        return (
          <Form className={classes.form} noValidate autoComplete="off">
            <Box px={{ xs: 2, md: 0 }} pt={{ xs: 2, md: 0 }} pb={{ xs: 2, sm: 3, lg: 4 }}>
              <Box mb={2}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs="auto">
                    <Typography tabIndex={0} component="h6" align="left" variant="h6">
                      <Box fontWeight="600" fontSize="16px">
                        {t('generalInformation')}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs="auto">
                    <Button
                      className="custom-default-button text-transform-none"
                      size="large"
                      variant="contained"
                      disableElevation
                      color="primary"
                      onClick={toggleEditGeneralInfo}
                    >
                      {t('cancel')}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Box mb={2}>
                <Grid container>
                  <Grid item xs={12} xl={3}>
                    <Box
                      p={3}
                      mr={{ xs: 0, xl: 5 }}
                      className="profileSection"
                      mb={{ xs: 3, sm: 3, xl: 0 }}
                      align="center"
                    >
                      <Box align="center" position="relative" className="user-profile-progress">
                        <CircularProgressWithLabel value={details.profileCompletePercentage || 0} />

                        <Box
                          height="120px"
                          width="120px"
                          borderRadius="50%"
                          style={{ objectFit: 'cover', overflow: 'hidden' }}
                        >
                          <img
                            src={
                              values.avatar_file
                                ? URL.createObjectURL(values.avatar_file)
                                : details.avatar || UploadImg
                            }
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = UploadImg
                            }}
                            alt="Filter"
                          />
                        </Box>
                      </Box>

                      <Box
                        mt={1}
                        component="div"
                        fontWeight="600"
                        fonSize="14px"
                        align="center"
                        width="100%"
                        color="primary"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Tooltip title={t('editStudentAvatar')}>
                          <IconButton
                            aria-label={t('editStudentAvatar')}
                            color="primary"
                            className="upload-link-button"
                          >
                            <input
                              onChange={(e) => {
                                const reader = new FileReader()
                                const file = e.currentTarget.files[0]
                                if (!file || !reader.readAsDataURL) {
                                  return
                                }
                                reader.onloadend = () => {
                                  setFieldValue('avatar_file', file)
                                }
                                reader.readAsDataURL(file)
                              }}
                              accept="image/*"
                              id="contained-button-file"
                              type="file"
                              title=""
                            />
                            <label htmlFor="contained-button-file">
                              <Edit2 width="16px" height="16px" />
                            </label>
                          </IconButton>
                        </Tooltip>

                        <Tooltip title={t('deleteStudentAvatar')}>
                          <IconButton aria-label={t('deleteStudentAvatar')} color="secondary">
                            <X
                              width="16px"
                              height="16px"
                              onClick={() => setFieldValue('avatar_file', '')}
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} xl={9}>
                    <Box pb={3}>
                      <Typography
                        tabIndex={0}
                        component="p"
                        align="left"
                        variant="body2"
                        color="Primary"
                        className="bg-color-surface"
                      >
                        <Box component="span" fontWeight="600" fontSize="16px">
                          {t('basicDetails')}
                        </Box>
                      </Typography>
                    </Box>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:prefix')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className={classes.selectIcon + ' custom-input-field'}
                          name="prefix"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="prefix"
                          pr={0}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconPrefix')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          select
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:prefix')}) ({t('fields:required')}) (
                              {t('fields:helpIconPrefix')})
                            </span>
                          }
                        >
                          {(masterData?.userPrefixes || []).map((item) => (
                            <MenuItem value={item} key={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage name="prefix">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:prefix') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:firstName')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="first_name"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="first_name"
                          autoComplete="first_name"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconFirstName')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:firstName')}) ({t('fields:required')}) (
                              {t('fields:helpIconFirstName')})
                            </span>
                          }
                        />
                        <ErrorMessage name="first_name">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:firstName') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:middleName')}
                          </Box>
                          <Box component="span" className="optional">
                            ({t('fields:optional')})
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="middle_name"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="middle_name"
                          autoComplete="middle_name"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconMiddleName')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:middleName')}) ({t('fields:optional')}) (
                              {t('fields:helpIconMiddleName')})
                            </span>
                          }
                        />
                        <ErrorMessage name="middle_name">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:middleName') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:lastName')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="last_name"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="last_name"
                          autoComplete="last_name"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconLastName')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:lastName')}) ({t('fields:required')}) (
                              {t('fields:helpIconLastName')})
                            </span>
                          }
                        />
                        <ErrorMessage name="last_name">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:lastName') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:suffix')}
                          </Box>
                          <Box component="span" className="optional">
                            ({t('fields:optional')})
                          </Box>
                        </Typography>
                        <Field
                          className={classes.selectIcon + ' custom-input-field'}
                          name="suffix"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="suffix"
                          pr={0}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconSuffix')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          select
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:suffix')}) ({t('fields:optional')}) (
                              {t('fields:helpIconSuffix')})
                            </span>
                          }
                        >
                          {(masterData?.userSuffixes || []).map((item) => (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage name="suffix">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:suffix') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:preferredName')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="nick_name"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="nick_name"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconPreferredName')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:preferredName')}) ({t('fields:required')}) (
                              {t('fields:helpIconPreferredName')})
                            </span>
                          }
                        />
                        <ErrorMessage name="nick_name">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:preferredName') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Box className="custom-picker">
                          <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
                            <Box component="span" fontWeight="600">
                              {t('fields:dateOfBirth')}
                            </Box>
                            <Box component="span" className="mandatory">
                              {t('fields:mandatory')}
                            </Box>
                          </Typography>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              className="custom-input-field"
                              autoOk
                              variant="inline"
                              fullWidth
                              maxDate={new Date()}
                              maxDateMessage={t('fields:maxDateMessage')}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Tooltip
                                      title={t('fields:helpIconDateOfBirth')}
                                      placement="top"
                                    >
                                      <HelpCircle className="help-icon" />
                                    </Tooltip>
                                  </InputAdornment>
                                ),
                              }}
                              inputVariant="outlined"
                              keyboardIcon={<Calendar />}
                              size="small"
                              format="MM/dd/yyyy"
                              id="dob"
                              name="dob"
                              value={values.dob || null}
                              onChange={(date) => {
                                setFieldValue('dob', date)
                              }}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:dateOfBirth')}) ({t('fields:required')}) (
                                  {t('fields:helpIconDateOfBirth')})
                                </span>
                              }
                            />
                          </MuiPickersUtilsProvider>
                          <ErrorMessage name="dob">
                            {(msg) => (
                              <span tabIndex={0} className="error">
                                {t(msg, { field: t('fields:dateOfBirth') })}
                              </span>
                            )}
                          </ErrorMessage>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:gender')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className={classes.selectIcon + ' custom-input-field'}
                          name="gender"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="gender"
                          pr={0}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconGender')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          select
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:gender')}) ({t('fields:required')}) (
                              {t('fields:helpIconGender')})
                            </span>
                          }
                        >
                          {(masterData?.gender || []).map((gender) => (
                            <MenuItem key={gender} value={gender}>
                              {gender}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage name="gender">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:gender') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:ethnicity')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className={classes.selectIcon + ' custom-input-field'}
                          name="ethnicity"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="ethnicity"
                          pr={0}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconEthnicity')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          select
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:ethnicity')}) ({t('fields:required')}) (
                              {t('fields:helpIconEthnicity')})
                            </span>
                          }
                        >
                          {ethnicities.map((item) => (
                            <MenuItem key={item._id} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage name="ethnicity">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:ethnicity') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                    </Grid>

                    <Box py={3}>
                      <Typography
                        tabIndex={0}
                        component="p"
                        align="left"
                        variant="body2"
                        color="Primary"
                        className="bg-color-surface"
                      >
                        <Box component="span" fontWeight="600" fontSize="16px">
                          {t('contactInformation')}
                        </Box>
                      </Typography>
                    </Box>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:addressLine1')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="adr_address1"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="adr_address1"
                          autoComplete="adr_address1"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconAddressLine1')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:addressLine1')}) ({t('fields:required')}) (
                              {t('fields:helpIconAddressLine1')})
                            </span>
                          }
                        />
                        <ErrorMessage name="adr_address1">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:addressLine1') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:addressLine2')}
                          </Box>
                          <Box component="span" className="optional">
                            ({t('fields:optional')})
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="adr_address2"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="adr_address2"
                          autoComplete="adr_address2"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconAddressLine2')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:addressLine2')}) ({t('fields:optional')}) (
                              {t('fields:helpIconAddressLine2')})
                            </span>
                          }
                        />
                        <ErrorMessage name="adr_address2">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:addressLine2') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:country')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          id="adr_country_iso"
                          className={classes.selectIcon + ' custom-input-field'}
                          name="adr_country_iso"
                          value={values.adr_country_iso}
                          onChange={(e) => {
                            setFieldValue('adr_country_iso', e.target.value)
                            setFieldValue('adr_state_iso', '')
                          }}
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconCountry')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          select
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:country')}) ({t('fields:required')}) (
                              {t('fields:helpIconCountry')})
                            </span>
                          }
                        >
                          {schooolCountries.map((country) => (
                            <MenuItem key={country.iso} value={country.iso}>
                              {country.name}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage name="adr_country_iso">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:country') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:state')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        {!isEmpty(states) || !values.adr_country_iso ? (
                          <Field
                            className={classes.selectIcon + ' custom-input-field'}
                            name="adr_state_iso"
                            component={FormikAutoComplete}
                            options={states}
                            nameKey="name"
                            valueKey="isoCode"
                            optionId="isoCode"
                            variant="outlined"
                            fullWidth
                            size="small"
                            id="adr_state_iso"
                            pr={0}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Tooltip title={t('fields:helpIconState')} placement="top">
                                    <HelpCircle className="help-icon" />
                                  </Tooltip>
                                </InputAdornment>
                              ),
                            }}
                            select
                            label={
                              <span style={visuallyHidden}>
                                ({t('fields:state')}) ({t('fields:required')}) (
                                {t('fields:helpIconState')})
                              </span>
                            }
                          />
                        ) : (
                          <Field
                            className="custom-input-field"
                            name="adr_state_iso"
                            as={TextField}
                            variant="outlined"
                            fullWidth
                            size="small"
                            id="adr_state_iso"
                            autoComplete="adr_state_iso"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Tooltip title={t('fields:helpIconState')} placement="top">
                                    <HelpCircle className="help-icon" />
                                  </Tooltip>
                                </InputAdornment>
                              ),
                            }}
                            label={
                              <span style={visuallyHidden}>
                                ({t('fields:state')}) ({t('fields:required')}) (
                                {t('fields:helpIconState')})
                              </span>
                            }
                          />
                        )}
                        <ErrorMessage name="adr_state_iso">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:state') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:city')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="adr_city"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="adr_city"
                          autoComplete="adr_city"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconCity')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:city')}) ({t('fields:required')}) (
                              {t('fields:helpIconCity')})
                            </span>
                          }
                        />
                        <ErrorMessage name="adr_city">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:city') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:postalCodeZip')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="adr_zipcode"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="adr_zipcode"
                          autoComplete="adr_zipcode"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconPostalCodeZip')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:postalCodeZip')}) ({t('fields:required')}) (
                              {t('fields:helpIconPostalCodeZip')})
                            </span>
                          }
                        />
                        <ErrorMessage name="adr_zipcode">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:postalCodeZip') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:emailAddress')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="email"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          readOnly
                          size="small"
                          id="email"
                          autoComplete="email"
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconEmailAddress')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:emailAddress')}) ({t('fields:required')}) (
                              {t('fields:helpIconEmailAddress')})
                            </span>
                          }
                        />
                        <ErrorMessage name="email">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:emailAddress') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:primaryPhoneNumber')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          as={TextField}
                          type="text"
                          id="adr_mobile"
                          name="adr_mobile"
                          fullWidth
                          variant="outlined"
                          size="small"
                          placeholder={t('987 654 321')}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title={t('fields:helpIconPrimaryPhoneNumber')}
                                  placement="top"
                                >
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                            startAdornment: (
                              <InputAdornment position="start">
                                <InputLabel style={visuallyHidden} id="country-code-label">
                                  {t('fields:selectCountryCode')}
                                </InputLabel>
                                <Select
                                  labelId="country-code-label"
                                  value={values.adr_mobile_prefix}
                                  onChange={(e) =>
                                    setFieldValue('adr_mobile_prefix', e.target.value)
                                  }
                                  id="country-menu"
                                  classes={{ root: 'country-list' }}
                                  className="no-underline"
                                  inputProps={{
                                    'aria-label': 'Without label',
                                  }}
                                >
                                  {get(masterData, 'countries', []).map((country) => (
                                    <MenuItem
                                      value={country.phoneCode}
                                      key={country.id}
                                      className="country"
                                    >
                                      {/*<span className="country-flag">{`${country.code.toLowerCase()}`}</span>*/}
                                      <span
                                        className={`country-flag ${country.isoCode.toLowerCase()}`}
                                      ></span>
                                      <span className="country-name">{country.name}</span>
                                      <span className="dial-code">{`${country.phoneCode}`}</span>
                                    </MenuItem>
                                  ))}
                                </Select>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:primaryPhoneNumber')}) ({t('fields:required')}) (
                              {t('fields:helpIconPrimaryPhoneNumber')})
                            </span>
                          }
                        />
                        <ErrorMessage name="adr_mobile">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:primaryPhoneNumber') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:homePhoneNumber')}
                          </Box>
                          <Box component="span" className="optional">
                            ({t('fields:optional')})
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          as={TextField}
                          type="text"
                          id="adr_phone"
                          name="adr_phone"
                          fullWidth
                          variant="outlined"
                          size="small"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title={t('fields:helpIconHomePhoneNumber')}
                                  placement="top"
                                >
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                            startAdornment: (
                              <InputAdornment position="start">
                                <InputLabel style={visuallyHidden} id="country-code-label">
                                  {t('fields:selectCountryCode')}
                                </InputLabel>
                                <Select
                                  labelId="country-code-label"
                                  value={values.adr_phone_prefix}
                                  onChange={(e) =>
                                    setFieldValue('adr_phone_prefix', e.target.value)
                                  }
                                  id="country-menu-2"
                                  classes={{ root: 'country-list' }}
                                  className="no-underline"
                                  inputProps={{
                                    'aria-label': 'Without label',
                                  }}
                                >
                                  {get(masterData, 'countries', []).map((country) => (
                                    <MenuItem
                                      value={country.phoneCode}
                                      key={country.id}
                                      className="country"
                                    >
                                      {/*<span className="country-flag">{`${country.code.toLowerCase()}`}</span>*/}
                                      <span
                                        className={`country-flag ${country.isoCode.toLowerCase()}`}
                                      ></span>
                                      <span className="country-name">{country.name}</span>
                                      <span className="dial-code">{`${country.phoneCode}`}</span>
                                    </MenuItem>
                                  ))}
                                </Select>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:homePhoneNumber')}) ({t('fields:optional')}) (
                              {t('fields:helpIconHomePhoneNumber')})
                            </span>
                          }
                        />
                        <ErrorMessage name="adr_phone">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:homePhoneNumber') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                    </Grid>
                    <Box py={3}>
                      <Typography
                        tabIndex={0}
                        component="p"
                        align="left"
                        variant="body2"
                        color="Primary"
                        className="bg-color-surface"
                      >
                        <Box component="span" fontWeight="600" fontSize="16px">
                          {t('otherInfo')}
                        </Box>
                      </Typography>
                    </Box>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:ssn/passport')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="ssn"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="ssn"
                          autoComplete="ssn"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconSSN')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:ssn/passport')}) ({t('fields:required')}) (
                              {t('fields:helpIconSSN')})
                            </span>
                          }
                        />
                        <ErrorMessage name="ssn">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:ssnInfo') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:securityQuestion')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className={classes.selectIcon + ' custom-input-field'}
                          name="security_question"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="security_question"
                          autoComplete="security_question"
                          InputProps={{
                            // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title={t('fields:helpIconSecurityQuestion')}
                                  placement="top"
                                >
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          select
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:securityQuestion')}) ({t('fields:required')}) (
                              {t('fields:helpIconSecurityQuestion')})
                            </span>
                          }
                        >
                          {securityQuestions.map((item) => (
                            <MenuItem key={item.sq_question} value={item.sq_question}>
                              {item.sq_question}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage name="security_question">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:securityQuestion') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:answer')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="security_answer"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="security_answer"
                          autoComplete="security_answer"
                          InputProps={{
                            // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconAnswer')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:answer')}) ({t('fields:required')}) (
                              {t('fields:helpIconAnswer')})
                            </span>
                          }
                        />
                        <ErrorMessage name="security_answer">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:answer') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:uploadId')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Grid container justify="space-between">
                          <Grid
                            item
                            xs={values.upload_id_file.name ? 9 : 12}
                            sm={values.upload_id_file.name ? 10 : 12}
                            lg={values.upload_id_file.name ? 11 : 12}
                          >
                            <Box className="upload-input-text" tabIndex={0}>
                              <span style={visuallyHidden}>
                                ({t('fields:uploadId')}) ({t('fields:required')}) (
                              </span>
                              <input
                                // accept=".txt,.js,.html,.css"
                                id="upload_id"
                                name="upload_id"
                                type="file"
                                onChange={(e) => {
                                  let reader = new FileReader()
                                  let file = e.currentTarget.files[0]
                                  if (!file || !reader.readAsDataURL) {
                                    return
                                  }
                                  reader.onloadend = () => {
                                    setFieldValue('upload_id_file', file)
                                  }
                                  reader.readAsDataURL(file)
                                }}
                                title=""
                              />
                              <label htmlFor="contained-button-file">
                                <Box className="text-ellipsis">
                                  {' '}
                                  {values.upload_id_file.name
                                    ? values.upload_id_file.name
                                    : values.uploadIdUrl}
                                </Box>
                                <Box
                                  display="flex"
                                  minHeight="100%"
                                  alignItems="center"
                                  justifyContent="flex-end"
                                >
                                  <Box clone mr={1} color="primary" className="space-right1">
                                    <Upload width={22} height={22} />
                                  </Box>

                                  <Tooltip title={t('fields:helpIconSelectFile')} placement="top">
                                    <HelpCircle width={24} height={24} className="help-icon" />
                                  </Tooltip>
                                </Box>
                              </label>
                            </Box>
                          </Grid>
                          {values.upload_id_file.name ? (
                            <Grid item xs={3} sm={2} lg={1}>
                              <Tooltip title={t('fields:downloadUploadId')} placement="top">
                                <IconButton
                                  aria-label={t('fields:downloadUploadId')}
                                  color="primary"
                                  onClick={download}
                                >
                                  <Download width={22} height={22} />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                          ) : null}
                        </Grid>
                        <ErrorMessage name="selectFile">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('field:uploadId') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      {/* <Grid item xs={12} sm={12} md={6} lg={4}>
                  <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="600">
                      {t('fields:specialEducationStudent')}
                    </Box>
                    <Box component="span" className="mandatory">
                      {t('fields:mandatory')}
                    </Box>
                  </Typography>
                  <Field
                    className={classes.selectIcon + ' custom-input-field'}
                    name="specialEducationStudent"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    size="small"
                    id="specialEducationStudent"
                    pr={0}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={t('fields:specialEducationStudentHelp')} placement="top">
                            <HelpCircle className="help-icon" />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    select
                  >
                    <MenuItem value={'Yes'}>Yes</MenuItem>
                    <MenuItem value={'No'}>No</MenuItem>
                  </Field>
                  <ErrorMessage name="specialEducationStudent">
                    {(msg) => (
                      <span tabIndex={0} className="error">
                        {t(msg, {
                          field: t('field:specialEducationStudent'),
                        })}
                      </span>
                    )}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="600">
                      {t('fields:lastCompletedGrade')}
                    </Box>
                    <Box component="span" className="mandatory">
                      {t('fields:mandatory')}
                    </Box>
                  </Typography>
                  <Field
                    className="custom-input-field"
                    name="lastGradeCompleted"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    size="small"
                    id="lastGradeCompleted"
                    autoComplete="lastGradeCompleted"
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={t('fields:lastCompletedGradeHelp')} placement="top">
                            <HelpCircle className="help-icon" />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ErrorMessage name="lastGradeCompleted">
                    {(msg) => (
                      <span tabIndex={0} className="error">
                        {t(msg, { field: t('field:lastCompletedGrade') })}
                      </span>
                    )}
                  </ErrorMessage>
                </Grid> */}
                    </Grid>

                    <Box display="flex" alignItems="center" justifyContent="flex-start" mt={2}>
                      <Button
                        className="text-transform-none"
                        size="large"
                        variant="contained"
                        disableElevation
                        type="submit"
                        color="primary"
                        disabled={!dirty}
                      >
                        {t('update')}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Form>
        )
      }}
    </Formik>
  )
}

EditStudentDetails.propTypes = {
  details: PropTypes.object,
  masterData: PropTypes.object,
  ethnicities: PropTypes.array,
  schooolCountries: PropTypes.array,
  states: PropTypes.array,
  searchStates: PropTypes.func,
  securityQuestions: PropTypes.array,
  editUser: PropTypes.func,
  toggleEditGeneralInfo: PropTypes.func,
}

EditStudentDetails.defaultProps = {
  details: {},
  masterData: {},
  ethnicities: [],
  schooolCountries: [],
  states: [],
  searchStates: () => {},
  securityQuestions: [],
  editUser: () => {},
  toggleEditGeneralInfo: () => {},
}

export default EditStudentDetails
