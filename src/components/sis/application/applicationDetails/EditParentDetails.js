import '../../../../assets/styles/CountryCode.scss'

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
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { Edit2, HelpCircle, X } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { CoreSchema } from '../../../../../clientFiles/validations'
import UploadImg from '../../../../assets/images/upload.png'
import { UsPhoneCode } from '../../../../helpers/constants'
import { get, mapStateWithData } from '../../../../helpers/utils'
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
  email: '',
  prefix: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  suffix: '',
  nick_name: '',
  primary_phone_number_prefix: UsPhoneCode,
  primary_phone_number: '',
  home_phone_number_prefix: UsPhoneCode,
  home_phone_number: '',
  relationship_with_student: '',
  ssn: '',
}

let countryCode = ''

function EditParentDetails({ details, masterData, editUser, toggleEditParentInfo, searchStates }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const onSubmit = function (values, { setErrors }) {
    let parents = []
    if ((details.parents || []).length === 0) {
      parents.push({
        ...values,
        is_primary_parent: true,
      })
    } else if ((details.parents || []).length === 1) {
      if (get(details, 'parents[0].email', '') === values.email) {
        parents.push({
          ...details.parents[0],
          ...values,
          is_primary_parent: true,
        })
      } else {
        parents.push(
          {
            ...details.parents[0],
            is_primary_parent: true,
          },
          {
            ...values,
          }
        )
      }
    } else {
      parents = details.parents.map((parent, i) => {
        if (values.email === parent.email) {
          return {
            ...values,
            is_primary_parent: i === 0,
          }
        }
        return parent
      })
    }
    editUser(
      { parents },
      {
        setErrors,
        callback: () => {},
      }
    )
  }

  return (
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
              onClick={toggleEditParentInfo}
            >
              {t('cancel')}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box mb={2}>
        <Formik
          onSubmit={onSubmit}
          initialValues={mapStateWithData(get(details, 'parents[0]', {}), initialState)}
          validationSchema={CoreSchema.parentInfoForm}
          enableReinitialize={true}
        >
          {({ values, setFieldValue, dirty }) => {
            if (values.adr_country_iso && countryCode !== values.adr_country_iso) {
              searchStates(values.adr_country_iso)
              countryCode = values.adr_country_iso
            }
            return (
              <Form className={classes.form} noValidate autoComplete="off">
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
                        <CircularProgressWithLabel
                          value={details.parents[0]?.parentProfileComplete || 0}
                        />
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
                                : get(details, 'parents[0].avatar', UploadImg)
                            }
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
                        <Tooltip title={t('editParentAvatar')}>
                          <IconButton
                            aria-label={t('editParentAvatar')}
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

                        <Tooltip title={t('deleteParentAvatar')}>
                          <IconButton aria-label={t('deleteParentAvatar')} color="secondary">
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
                          {t('parent1Details')}
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
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:prefix')}) ({t('fields:required')}) (
                              {t('fields:helpIconPrefix')})
                            </span>
                          }
                          select
                        >
                          {masterData.userPrefixes.map((item) => (
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
                          defaultValue="John"
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
                          defaultValue="Convoy"
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
                          defaultValue="Doe"
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
                          {masterData.userSuffixes.map((item) => (
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
                          autoComplete="email"
                          InputProps={{
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
                          id="primary_phone_number"
                          name="primary_phone_number"
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
                                  value={values.primary_phone_number_prefix}
                                  onChange={(e) =>
                                    setFieldValue('primary_phone_number_prefix', e.target.value)
                                  }
                                  id="country-menu"
                                  classes={{ root: 'country-list' }}
                                  className="no-underline"
                                  inputProps={{
                                    'aria-label': 'Without label',
                                  }}
                                  label={
                                    <span style={visuallyHidden}>
                                      ({t('fields:ssn/passport')}) ({t('fields:required')}) (
                                      {t('fields:helpIconSSN')})
                                    </span>
                                  }
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
                        <ErrorMessage name="primary_phone_number">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, {
                                field: t('fields:primaryPhoneNumber'),
                              })}
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
                          id="home_phone_number"
                          name="home_phone_number"
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
                                  value={values.primary_phone_number_prefix}
                                  onChange={(e) =>
                                    setFieldValue('primary_phone_number_prefix', e.target.value)
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
                        <ErrorMessage name="home_phone_number">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, {
                                field: t('fields:homePhoneNumber'),
                              })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:relationshipWithStudent')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          id="relationship_with_student"
                          className={classes.selectIcon + ' custom-input-field'}
                          name="relationship_with_student"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title={t('fields:helpIconRelationshipWithStudent')}
                                  placement="top"
                                >
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:relationshipWithStudent')}) ({t('fields:required')}) (
                              {t('fields:helpIconRelationshipWithStudent')})
                            </span>
                          }
                          select
                        >
                          {get(masterData, 'relationship', []).map((relation) => (
                            <MenuItem key={relation} value={relation}>
                              {t(`reference:${relation}`)}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage name="relationship_with_student">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, {
                                field: t('fields:relationshipWithStudent'),
                              })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
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
                          defaultValue="4423"
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
                              {t(msg, {
                                field: t('fields:ssn/passport'),
                              })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      {/* <Grid item xs={12} sm={6} md={6} lg={4}>
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
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:dateOfBirth')}) ({t('fields:required')}) (
                                  {t('fields:maxDateMessage')})
                                </span>
                              }
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
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
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:ethnicity')}) ({t('fields:required')}) (
                              {t('fields:helpIconEthnicity')})
                            </span>
                          }
                          select
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
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:gender')}) ({t('fields:required')}) (
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
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:gender') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid> */}
                    </Grid>
                    {/* <Box width="100%" mt={1.5} pb={2}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                          <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
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
                          <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
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
                          <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
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
                            label={
                              <span style={visuallyHidden}>
                                ({t('fields:country')}) ({t('fields:required')}) (
                                {t('fields:helpIconCountry')})
                              </span>
                            }
                            select
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
                          <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
                            <Box component="span" fontWeight="600">
                              {t('fields:state')}
                            </Box>
                            <Box component="span" className="mandatory">
                              {t('fields:mandatory')}
                            </Box>
                          </Typography>
                          {!isEmpty(states) || !values.adr_country_iso ? (
                            <Field
                              className="custom-input-field"
                              name="adr_state_iso"
                              as={TextField}
                              variant="outlined"
                              component={FormikAutoComplete}
                              options={states}
                              nameKey="name"
                              valueKey="isoCode"
                              optionId="isoCode"
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
                          <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
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
                          <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
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
                                  <Tooltip
                                    title={t('fields:helpIconPostalCodeZip')}
                                    placement="top"
                                  >
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
                      </Grid>
                    </Box> */}

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
              </Form>
            )
          }}
        </Formik>
        <Box mt={5}>
          <Formik
            onSubmit={onSubmit}
            initialValues={mapStateWithData(get(details, 'parents[1]', {}), initialState)}
            validationSchema={CoreSchema.parentInfoForm}
            enableReinitialize={true}
          >
            {({ values, setFieldValue, dirty }) => {
              return (
                <Form className={classes.form} noValidate autoComplete="off">
                  <Grid container>
                    <Grid item xs={12} xl={3}>
                      <Box
                        p={3}
                        mr={{ xs: 0, xl: 5 }}
                        className="profileSection"
                        mb={{ xs: 3, sm: 3, lg: 0 }}
                        align="center"
                      >
                        <Box align="center" position="relative" className="user-profile-progress">
                          <CircularProgressWithLabel
                            value={details.parents[1]?.parentProfileComplete || 0}
                          />
                          <img
                            src={
                              values.avatar_file
                                ? URL.createObjectURL(values.avatar_file)
                                : get(details, 'parents[1].avatar', UploadImg)
                            }
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = UploadImg
                            }}
                            alt="Filter"
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
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Tooltip title={t('editParentAvatar')}>
                            <IconButton
                              aria-label={t('editParentAvatar')}
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

                          <Tooltip title={t('deleteParentAvatar')}>
                            <IconButton aria-label={t('deleteParentAvatar')} color="secondary">
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
                      <Box pt={{ xs: 3, xl: 0 }} pb={3}>
                        <Typography
                          tabIndex={0}
                          component="p"
                          align="left"
                          variant="body2"
                          color="Primary"
                          className="bg-color-surface"
                        >
                          <Box component="span" fontWeight="600" fontSize="16px">
                            {t('parent2Details')}
                          </Box>
                        </Typography>
                      </Box>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                          <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
                            <Box component="span" fontWeight="600">
                              {t('fields:prefix')}
                            </Box>
                            <Box component="span" className="optional">
                              ({t('fields:optional')})
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
                                ({t('fields:prefix')}) ({t('fields:optional')}) (
                                {t('fields:helpIconPrefix')})
                              </span>
                            }
                          >
                            {masterData.userPrefixes.map((item) => (
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
                            defaultValue="John"
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
                            defaultValue="Convoy"
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
                            defaultValue="Doe"
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
                            {masterData.userSuffixes.map((item) => (
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
                          <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
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
                            autoComplete="email"
                            InputProps={{
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
                          <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
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
                            id="primary_phone_number"
                            name="primary_phone_number"
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
                                    value={values.primary_phone_number_prefix}
                                    onChange={(e) =>
                                      setFieldValue('primary_phone_number_prefix', e.target.value)
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
                          <ErrorMessage name="primary_phone_number">
                            {(msg) => (
                              <span tabIndex={0} className="error">
                                {t(msg, {
                                  field: t('fields:primaryPhoneNumber'),
                                })}
                              </span>
                            )}
                          </ErrorMessage>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                          <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
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
                            id="home_phone_number"
                            name="home_phone_number"
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
                                    value={values.primary_phone_number_prefix}
                                    onChange={(e) =>
                                      setFieldValue('primary_phone_number_prefix', e.target.value)
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
                          <ErrorMessage name="primary_phone_number">
                            {(msg) => (
                              <span tabIndex={0} className="error">
                                {t(msg, {
                                  field: t('fields:homePhoneNumber'),
                                })}
                              </span>
                            )}
                          </ErrorMessage>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                          <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
                            <Box component="span" fontWeight="600">
                              {t('fields:relationshipWithStudent')}
                            </Box>
                            <Box component="span" className="mandatory">
                              {t('fields:mandatory')}
                            </Box>
                          </Typography>
                          <Field
                            id="relationship_with_student"
                            className={classes.selectIcon + ' custom-input-field'}
                            name="relationship_with_student"
                            as={TextField}
                            variant="outlined"
                            fullWidth
                            size="small"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Tooltip
                                    title={t('fields:helpIconRelationshipWithStudent')}
                                    placement="top"
                                  >
                                    <HelpCircle className="help-icon" />
                                  </Tooltip>
                                </InputAdornment>
                              ),
                            }}
                            label={
                              <span style={visuallyHidden}>
                                ({t('fields:relationshipWithStudent')}) ({t('fields:required')}) (
                                {t('fields:helpIconRelationshipWithStudent')})
                              </span>
                            }
                            select
                          >
                            {get(masterData, 'relationship', []).map((relation) => (
                              <MenuItem key={relation} value={relation}>
                                {relation}
                              </MenuItem>
                            ))}
                          </Field>
                          <ErrorMessage name="relationship_with_student">
                            {(msg) => (
                              <span tabIndex={0} className="error">
                                {t(msg, {
                                  field: t('fields:relationshipWithStudent'),
                                })}
                              </span>
                            )}
                          </ErrorMessage>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
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
                            defaultValue="4423"
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
                                {t(msg, {
                                  field: t('fields:ssn/passport'),
                                })}
                              </span>
                            )}
                          </ErrorMessage>
                        </Grid>
                        {/* <Grid item xs={12} sm={12} md={6} lg={4}>
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
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
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
                            label={
                              <span style={visuallyHidden}>
                                ({t('fields:ethnicity')}) ({t('fields:required')}) (
                                {t('fields:helpIconEthnicity')})
                              </span>
                            }
                            select
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
                        <Grid item xs={12} sm={12} md={6} lg={4}>
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
                                ({t('fields:gender')}) ({t('fields:required')}) (
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
                              <span tabIndex={0} className="error">
                                {t(msg, { field: t('fields:gender') })}
                              </span>
                            )}
                          </ErrorMessage>
                        </Grid> */}
                      </Grid>
                      {/* <Box width="100%" mt={1.5} pb={2}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6} md={6} lg={4}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
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
                                    <Tooltip
                                      title={t('fields:helpIconAddressLine1')}
                                      placement="top"
                                    >
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
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
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
                                    <Tooltip
                                      title={t('fields:helpIconAddressLine2')}
                                      placement="top"
                                    >
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
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
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
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:country')}) ({t('fields:required')}) (
                                  {t('fields:helpIconCountry')})
                                </span>
                              }
                              select
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
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box component="span" fontWeight="600">
                                {t('fields:state')}
                              </Box>
                              <Box component="span" className="mandatory">
                                {t('fields:mandatory')}
                              </Box>
                            </Typography>
                            {!isEmpty(states) || !values.adr_country_iso ? (
                              <Field
                                className="custom-input-field"
                                name="adr_state_iso"
                                as={TextField}
                                variant="outlined"
                                component={FormikAutoComplete}
                                options={states}
                                nameKey="name"
                                valueKey="isoCode"
                                optionId="isoCode"
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
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
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
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
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
                                    <Tooltip
                                      title={t('fields:helpIconPostalCodeZip')}
                                      placement="top"
                                    >
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
                        </Grid>
                      </Box> */}
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
                </Form>
              )
            }}
          </Formik>
        </Box>
      </Box>
    </Box>
  )
}

EditParentDetails.propTypes = {
  details: PropTypes.object,
  masterData: PropTypes.object,
  editUser: PropTypes.func,
  toggleEditParentInfo: PropTypes.func,
  schooolCountries: PropTypes.array,
  states: PropTypes.array,
  searchStates: PropTypes.func,
  ethnicities: PropTypes.array,
}
EditParentDetails.defaultProps = {
  details: {},
  masterData: {},
  editUser: () => {},
  toggleEditParentInfo: () => {},
  schooolCountries: [],
  states: [],
  searchStates: () => {},
  ethnicities: () => {},
}

export default EditParentDetails
