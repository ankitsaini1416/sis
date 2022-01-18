import '../../../assets/styles/CountryCode.scss'

import DateFnsUtils from '@date-io/date-fns'
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
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
import { Calendar, HelpCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import UploadImg from '../../../../src/assets/images/upload.png'
import { ROUTES, UsPhoneCode } from '../../../helpers/constants'
import { get, isEmpty, mapStateWithData } from '../../../helpers/utils'
import Breadcrumb from '../../breadcrumbs/Breadcrumbs'
import FormikAutoComplete from '../../common/formikComponents/FormikAutoComplete'
import UserDetailsSkeleton from '../users/EditUserSkeleton'
import useStyles from '../users/User.Style'
import { AGMSchema } from './../../../../clientFiles/validations'

const initialState = {
  prefix: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  nick_name: '',
  dob: '',
  gender: '',
  adr_address1: '',
  adr_address2: '',
  adr_country_iso: '',
  adr_country_name: '',
  adr_state_iso: '',
  adr_state_name: '',
  adr_city: '',
  adr_zipcode: '',
  email: '',
  adr_mobile_prefix: UsPhoneCode,
  adr_mobile: '',
  adr_phone_prefix: UsPhoneCode,
  adr_phone: '',
  avatar: '',
}
function UserDetails({ user, masterData, searchStates, states, editUser }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const history = useHistory()
  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbUserManagement'),
      href: ROUTES.ALLUSERS,
    },
    {
      title: t('breadcrumbUser'),
      href: ROUTES.ALLUSERS,
    },
    {
      title: t('breadcrumbEditUser'),
      href: '',
    },
  ]
  const onSubmit = function (values, { setErrors }) {
    editUser(values, {
      setErrors,
      callback: () => {},
    })
  }
  if (isEmpty(user)) {
    return <UserDetailsSkeleton />
  }
  return (
    <Box mb={2}>
      <Formik
        onSubmit={onSubmit}
        initialValues={mapStateWithData(user.attributes || {}, initialState)}
        validationSchema={AGMSchema.editAGMUser}
        enableReinitialize={true}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className={classes.form} noValidate autoComplete="off">
              <Box py={2}>
                <Breadcrumb data={breadcrumbData} />
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={12} sm="auto">
                    <Typography
                      component="h4"
                      align="left"
                      variant="h5"
                      color="textPrimary"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="700">
                        {t('editProfile')}
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
                        onClick={history.goBack}
                      >
                        {t('cancel')}
                      </Button>
                      <Box ml={2}>
                        <Button
                          className="text-transform-none"
                          size="large"
                          variant="contained"
                          disableElevation
                          color="primary"
                          type="submit"
                        >
                          {t('save')}
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Paper rounded={true} elevation={1} className="paper-round">
                <Box px={{ xs: 2, lg: 4 }} py={{ xs: 2, lg: 4 }}>
                  <Box pb={3}>
                    <Typography
                      component="p"
                      align="left"
                      variant="body2"
                      color="Primary"
                      className="bg-color-surface"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600" fontSize="16px">
                        {t('personalDetails')}
                      </Box>
                    </Typography>
                  </Box>
                  {/* personal */}
                  <Grid container spacing={3} direction="row-reverse">
                    <Grid item xs={12} md={4} lg={4}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        mt={3}
                        flexDirection="column"
                      >
                        <Box
                          className="user-profile"
                          height={{ xs: 100, sm: 150, md: 200, xl: 200 }}
                          width={{ xs: 100, sm: 150, md: 200, xl: 200 }}
                        >
                          <img
                            src={
                              typeof values?.avatar === 'object'
                                ? URL.createObjectURL(values?.avatar)
                                : user.attributes?.avatar_full || UploadImg
                            }
                          />
                        </Box>
                        <Box
                          mt={1}
                          component="div"
                          fontWeight="600"
                          fonSize="14px"
                          align="center"
                          width="100%"
                          color="primary"
                          className="upload-link-text"
                        >
                          <input
                            onChange={(e) => {
                              let reader = new FileReader()
                              let file = e.currentTarget.files[0]
                              if (!file || !reader.readAsDataURL) {
                                return
                              }
                              reader.onloadend = () => {
                                setFieldValue('avatar', file)
                                // editLogo(file)
                              }
                              reader.readAsDataURL(file)
                            }}
                            accept="image/jpeg,image/png,image/"
                            id="contained-button-file"
                            type="file"
                            title=""
                          />
                          <Box display="flex" justifyContent="center">
                            <label className="link-color-text" htmlFor="contained-button-file">
                              {t('fields:editUpload')}
                            </label>
                            <Box ml={2} zIndex="9">
                              <Tooltip title={t('fields:uploadYourLatestPhoto')} placement="top">
                                <HelpCircle width={20} height={20} className="help-icon" />
                              </Tooltip>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <ErrorMessage name="avatar">
                        {(msg) => (
                          <span className="error text-center" tabIndex={0}>
                            {t(msg, { field: t('fields:avatar') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} md={8} lg={8}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Box mt={1} mb={1}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
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
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:prefix')}) ({t('fields:mandatory')}) (
                                  {t('fields:helpIconPrefix')})
                                </span>
                              }
                              select
                            >
                              {(masterData?.userPrefixes || []).map((item) => (
                                <MenuItem value={item} key={item}>
                                  {item}
                                </MenuItem>
                              ))}
                            </Field>
                            <ErrorMessage name="prefix">
                              {(msg) => (
                                <span className="error" tabIndex={0}>
                                  {t(msg, { field: t('fields:prefix') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Box mt={1} mb={1}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
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
                                  ({t('fields:firstName')}) ({t('fields:mandatory')}) (
                                  {t('fields:helpIconFirstName')})
                                </span>
                              }
                            />
                            <ErrorMessage name="first_name">
                              {(msg) => (
                                <span className="error" tabIndex={0}>
                                  {t(msg, { field: t('fields:firstName') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Box mt={1} mb={1}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
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
                                <span className="error" tabIndex={0}>
                                  {t(msg, { field: t('fields:middleName') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Box mt={1} mb={1}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
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
                                  ({t('fields:lastName')}) ({t('fields:mandatory')}) (
                                  {t('fields:helpIconLastName')})
                                </span>
                              }
                            />
                            <ErrorMessage name="last_name">
                              {(msg) => (
                                <span className="error" tabIndex={0}>
                                  {t(msg, { field: t('fields:lastName') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Box mt={1} mb={1}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
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
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:suffix')}) ({t('fields:optional')}) (
                                  {t('fields:helpIconSuffix')})
                                </span>
                              }
                              select
                            >
                              {(masterData?.userSuffixes || []).map((item) => (
                                <MenuItem key={item} value={item}>
                                  {item}
                                </MenuItem>
                              ))}
                            </Field>
                            <ErrorMessage name="suffix">
                              {(msg) => (
                                <span className="error" tabIndex={0}>
                                  {t(msg, { field: t('fields:suffix') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Box mt={1} mb={1} className="custom-picker">
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
                                    ({t('fields:dateOfBirth')}) ({t('fields:mandatory')}) (
                                    {t('fields:helpIconDateOfBirth')})
                                  </span>
                                }
                              />
                              <ErrorMessage name="dob">
                                {(msg) => (
                                  <span className="error" tabIndex={0}>
                                    {t(msg, { field: t('fields:dateOfBirth') })}
                                  </span>
                                )}
                              </ErrorMessage>
                            </MuiPickersUtilsProvider>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Box mt={1} mb={1}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
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
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:gender')}) ({t('fields:mandatory')}) (
                                  {t('fields:helpIconGender')})
                                </span>
                              }
                              select
                            >
                              {(masterData?.gender || []).map((gender) => (
                                <MenuItem key={gender} value={gender}>
                                  {gender}
                                </MenuItem>
                              ))}
                            </Field>
                            <ErrorMessage name="gender">
                              {(msg) => (
                                <span className="error">
                                  {t(msg, { field: t('fields:gender') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* personal */}
                  <Box py={3}>
                    <Typography
                      component="p"
                      align="left"
                      variant="body2"
                      color="Primary"
                      className="bg-color-surface"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600" fontSize="16px">
                        {t('contactDetails')}
                      </Box>
                    </Typography>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Box mt={1} mb={1}>
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
                              ({t('fields:addressLine1')}) ({t('fields:mandatory')}) (
                              {t('fields:helpIconAddressLine1')})
                            </span>
                          }
                        />
                        <ErrorMessage name="adr_address1">
                          {(msg) => (
                            <span className="error" tabIndex={0}>
                              {t(msg, { field: t('fields:addressLine1') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Box mt={1} mb={1}>
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
                            <span className="error">
                              {t(msg, { field: t('fields:addressLine2') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Box mt={1} mb={1}>
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
                          component={FormikAutoComplete}
                          options={get(masterData, 'countries', [])}
                          className={classes.selectIcon + ' custom-input-field'}
                          name="adr_country_iso"
                          nameKey="name"
                          valueKey="isoCode"
                          optionId="isoCode"
                          variant="outlined"
                          fullWidth
                          size="small"
                          onChangeFx={(country) => {
                            setFieldValue('adr_state_iso', '')
                            setFieldValue('adr_state_name', '')
                            setFieldValue('adr_country_name', country.name)
                            searchStates(country.isoCode)
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconCountry')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:country')}) ({t('fields:mandatory')}) (
                              {t('fields:helpIconCountry')})
                            </span>
                          }
                          select
                        />
                        <ErrorMessage name="adr_country_iso">
                          {(msg) => (
                            <span className="error" tabIndex={0}>
                              {t(msg, { field: t('fields:country') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Box mt={1} mb={1}>
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
                            onChangeFx={(state) => {
                              setFieldValue('adr_state_name', state.name)
                            }}
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
                            label={
                              <span style={visuallyHidden}>
                                ({t('fields:state')}) ({t('fields:mandatory')}) (
                                {t('fields:helpIconState')})
                              </span>
                            }
                            select
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
                                ({t('fields:state')}) ({t('fields:optional')}) (
                                {t('fields:helpIconState')})
                              </span>
                            }
                          />
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Box mt={1} mb={1}>
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
                                <Tooltip title={t('fields:helpIconCityUser')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:city')}) ({t('fields:mandatory')}) (
                              {t('fields:helpIconCityUser')})
                            </span>
                          }
                        />
                        <ErrorMessage name="adr_city">
                          {(msg) => (
                            <span className="error" tabIndex={0}>
                              {t(msg, { field: t('fields:city') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Box mt={1} mb={1}>
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
                              ({t('fields:postalCodeZip')}) ({t('fields:mandatory')}) (
                              {t('fields:helpIconPostalCodeZip')})
                            </span>
                          }
                        />
                        <ErrorMessage name="adr_zipcode">
                          {(msg) => (
                            <span className="error" tabIndex={0}>
                              {t(msg, { field: t('fields:postalCodeZip') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Box mt={1} mb={1}>
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
                          size="small"
                          id="email"
                          readOnly
                          autoComplete="email"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconEmailAddress')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                            readOnly: true,
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:emailAddress')}) ({t('fields:mandatory')}) (
                              {t('fields:helpIconEmailAddress')})
                            </span>
                          }
                        />
                        <ErrorMessage name="email">
                          {(msg) => (
                            <span className="error" tabIndex={0}>
                              {t(msg, { field: t('fields:emailAddress') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Box mt={1} mb={1}>
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
                              ({t('fields:primaryPhoneNumber')}) ({t('fields:mandatory')}) (
                              {t('fields:helpIconPrimaryPhoneNumber')})
                            </span>
                          }
                        />
                        <ErrorMessage name="adr_mobile">
                          {(msg) => (
                            <span className="error" tabIndex={0}>
                              {t(msg, {
                                field: t('fields:primaryPhoneNumber'),
                              })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Box mt={1} mb={1}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:homePhoneNumber')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
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
                                <Select
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
                              ({t('fields:homePhoneNumber')}) ({t('fields:mandatory')}) (
                              {t('fields:helpIconHomePhoneNumber')})
                            </span>
                          }
                        />
                        <ErrorMessage name="adr_phone">
                          {(msg) => (
                            <span className="error" tabIndex={0}>
                              {t(msg, { field: t('fields:homePhoneNumber') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Form>
          )
        }}
      </Formik>
    </Box>
  )
}

UserDetails.propTypes = {
  user: PropTypes.object,
  masterData: PropTypes.object,
  searchStates: PropTypes.func,
  states: PropTypes.array,
  editUser: PropTypes.func,
  // editLogo: PropTypes.func,
}

UserDetails.defaultProps = {
  user: {},
  masterData: {},
  searchStates: () => {},
  states: [],
  editUser: () => {},
  // editLogo: () => {},
}

export default UserDetails
