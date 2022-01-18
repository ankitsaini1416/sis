import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
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
import { withStyles } from '@material-ui/core/styles'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import FormikErrorFocus from 'formik-error-focus'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Check, Edit2, HelpCircle, X } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import UploadImg from '../../../../../assets/images/upload-logo.png'
import useStyles from '../../Organizations.Style'
import { CoreSchema } from './../../../../../../clientFiles/validations'
import { get, isEmpty, isNullOrEmpty } from './../../../../../helpers/utils'
import FormikAutocomplete from './../../../../common/formikComponents/FormikAutoComplete'
import FormikAutoComplete from './../../../../common/formikComponents/FormikAutoComplete'

const CheckboxWithGreenCheck = withStyles({})(Checkbox)
function GeneralInfo({
  formState,
  masterData,
  editSchool,
  districts,
  states,
  school,
  searchStates,
  editLogo,
}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const history = useHistory()
  const [logo, setLogo] = useState(null)

  const onSubmit = function (values, { setErrors }) {
    editSchool(school.id, values, { setErrors })
  }

  useEffect(() => {
    if (school.sch_logo) {
      setLogo(school.sch_logo)
    }
  }, [school.sch_logo])

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={formState}
      enableReinitialize={true}
      validationSchema={CoreSchema.addSchool}
    >
      {({ values, setFieldValue, dirty }) => (
        <Form className={classes.form} noValidate autoComplete="off">
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={12} sm="auto">
              <Typography
                tabIndex={0}
                component="p"
                align="left"
                variant="body2"
                color="textPrimary"
              >
                <Box component="span" fontWeight="600" fontSize="16px">
                  {t('generalInfo')}
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
                    disabled={!dirty}
                  >
                    {t('update')}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box py={{ xs: 2, lg: 0 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={3} xl={2}>
                <Box
                  mt={2}
                  mx="auto"
                  width={{ xs: '200px', sm: '300px', md: '100%' }}
                  borderRadius={8}
                  className="image-container"
                >
                  <img
                    src={
                      logo
                        ? typeof logo === 'string'
                          ? logo
                          : URL.createObjectURL(logo)
                        : UploadImg
                    }
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = UploadImg
                    }}
                    alt="School Logo"
                  />
                </Box>
                <ErrorMessage name="sch_logo">
                  {(msg) => (
                    <span tabIndex={0} className="error">
                      {t(msg, { field: t('file') })}
                    </span>
                  )}
                </ErrorMessage>
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
                  <Tooltip title={t('editSchoolLogo')}>
                    <IconButton
                      aria-label={t('editSchoolLogo')}
                      color="primary"
                      className="upload-link-button"
                    >
                      <input
                        onChange={(e) => {
                          let reader = new FileReader()
                          let file = e.currentTarget.files[0]
                          if (!file || !reader.readAsDataURL) {
                            return
                          }
                          reader.onloadend = () => {
                            setLogo(file)
                            editLogo(file)
                          }
                          reader.readAsDataURL(file)
                        }}
                        accept="image/jpeg,image/png,image/"
                        id="contained-button-file"
                        type="file"
                        title=""
                      />
                      <label htmlFor="contained-button-file">
                        <Edit2 width="16px" height="16px" />
                      </label>
                    </IconButton>
                  </Tooltip>

                  {!isNullOrEmpty(logo) ? (
                    <Tooltip title={t('deleteSchoolLogo')}>
                      <IconButton
                        aria-label={t('deleteSchoolLogo')}
                        onClick={() => {
                          setLogo(null)
                          editLogo('')
                        }}
                        color="secondary"
                      >
                        <X width="16px" height="16px" />
                      </IconButton>
                    </Tooltip>
                  ) : null}
                </Box>

                {/*<Box
                      mt={1}
                      component="div"
                      fontWeight="600"
                      fonSize="14px"
                      align="center"
                      width="100%"
                      color="primary"
                      className="upload-link-text"
                    >
                      <input accept="image/*" id="contained-button-file" type="file" />
                      <label htmlFor="contained-button-file">{t('uploadDistrictLogo')}</label>
                    </Box>*/}
              </Grid>

              <Grid item xs={12} md={8} lg={8} xl={8}>
                <Box pl={{ xs: 0, sm: 1, md: 2 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:district')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        className={classes.selectIcon + ' custom-input-field'}
                        id="sch_dst_id"
                        name="sch_dst_id"
                        options={districts}
                        valueKey="dst_id"
                        nameKey="dst_name"
                        optionId="dst_id"
                        component={FormikAutocomplete}
                        variant="outlined"
                        fullWidth
                        size="small"
                        pr={0}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:helpIconDistrict')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:district')}) ({t('fields:required')}) (
                            {t('fields:helpIconDistrict')})
                          </span>
                        }
                      />
                      <ErrorMessage name="sch_dst_id">
                        {(msg) => (
                          <span tabIndex={0} className="error">
                            {t(msg, { field: t('fields:district') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6} className="custom-checkbox">
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:status')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>

                      <Box minWidth={{ xs: 'auto', sm: 'auto', md: '150px' }} align="left">
                        <FormControlLabel
                          control={
                            <CheckboxWithGreenCheck
                              checked={values.sch_is_active}
                              onChange={(e) => {
                                setFieldValue('sch_is_active', e.target.checked)
                              }}
                              value="checkedA"
                              checkedIcon={<Check aria-label={t('fields:status')} />}
                              color="Primary"
                            />
                          }
                          label={t('fields:active')}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:schoolName')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        className="custom-input-field"
                        name="sch_name"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="sch_name"
                        autoComplete="sch_name"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:helpIconSchoolName')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:schoolName')}) ({t('fields:required')}) (
                            {t('fields:helpIconSchoolName')})
                          </span>
                        }
                      />
                      <ErrorMessage name="sch_name">
                        {(msg) => (
                          <span tabIndex={0} className="error">
                            {t(msg, { field: t('fields:schoolName') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:schoolCode')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        className="custom-input-field"
                        name="sch_school_short_name"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="sch_school_short_name"
                        autoComplete="sch_school_short_name"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:helpIconSchoolCode')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:schoolCode')}) ({t('fields:required')}) (
                            {t('fields:helpIconSchoolCode')})
                          </span>
                        }
                      />
                      <ErrorMessage name="sch_school_short_name">
                        {(msg) => (
                          <span className="error">{t(msg, { field: t('fields:schoolCode') })}</span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:schoolType')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        className={classes.selectIcon + ' custom-input-field'}
                        name="sch_school_type"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="sch_school_type"
                        pr={0}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:helpIconSchoolType')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        select
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:schoolType')}) ({t('fields:required')}) (
                            {t('fields:helpIconSchoolType')})
                          </span>
                        }
                      >
                        {masterData?.school_type.map((type) => (
                          <MenuItem key={type} value={type}>
                            {t(`reference:${type}`)}
                          </MenuItem>
                        ))}
                      </Field>
                      <ErrorMessage name="sch_school_type">
                        {(msg) => (
                          <span tabIndex={0} className="error">
                            {t(msg, { field: t('fields:schoolType') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:contactPerson')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        className={classes.selectIcon + ' custom-input-field'}
                        name="sch_contact_person"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="sch_contact_person"
                        pr={0}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:helpIconContactPerson')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:contactPerson')}) ({t('fields:required')}) (
                            {t('fields:helpIconContactPerson')})
                          </span>
                        }
                      />
                      <ErrorMessage name="sch_contact_person">
                        {(msg) => (
                          <span tabIndex={0} className="error">
                            {t(msg, { field: t('fields:contactPerson') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:contactEmail')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        className={classes.selectIcon + ' custom-input-field'}
                        name="sch_contact_email"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="sch_contact_email"
                        pr={0}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:helpIconContactEmail')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:contactEmail')}) ({t('fields:required')}) (
                            {t('fields:helpIconContactEmail')})
                          </span>
                        }
                      />
                      <ErrorMessage name="sch_contact_email">
                        {(msg) => (
                          <span tabIndex={0} className="error">
                            {t(msg, { field: t('fields:contactEmail') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:contactPhone')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        className="custom-input-field"
                        as={TextField}
                        type="text"
                        id="sch_phone"
                        name="sch_phone"
                        fullWidth
                        variant="outlined"
                        size="small"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:helpIconOfficePhone')} placement="top">
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
                                value={values.sch_phone_prefix}
                                onChange={(e) => {
                                  setFieldValue('sch_phone_prefix', e.target.value)
                                }}
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
                            ({t('fields:contactPhone')}) ({t('fields:required')}) (
                            {t('fields:helpIconOfficePhone')})
                          </span>
                        }
                      />
                      <ErrorMessage name="sch_phone">
                        {(msg) => (
                          <span tabIndex={0} className="error">
                            {t(msg, { field: t('fields:contactPhone') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
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
                    <Grid item xs={12} sm={6} lg={6}>
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
                    <Grid item xs={12} sm={6} lg={6}>
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
                        select
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:country')}) ({t('fields:required')}) (
                            {t('fields:helpIconCountry')})
                          </span>
                        }
                      />
                      <ErrorMessage name="adr_country_iso">
                        {(msg) => (
                          <span tabIndex={0} className="error">
                            {t(msg, { field: t('fields:country') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
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
                    <Grid item xs={12} sm={6} lg={6}>
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
                    <Grid item xs={12} sm={6} lg={6}>
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
                    <Grid item xs={12} sm={6} lg={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:officePhone')}
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
                              <Tooltip title={t('fields:helpIconContactPhone')} placement="top">
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
                                onChange={(e) => {
                                  setFieldValue('adr_phone_prefix', e.target.value)
                                }}
                                id="country-menu-address"
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
                            ({t('fields:officePhone')}) ({t('fields:optional')}) (
                            {t('fields:helpIconContactPhone')})
                          </span>
                        }
                      />
                      <ErrorMessage name="adr_phone">
                        {(msg) => (
                          <span tabIndex={0} className="error">
                            {t(msg, { field: t('fields:officePhone') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:fax')}
                        </Box>
                        <Box component="span" className="optional">
                          ({t('fields:optional')})
                        </Box>
                      </Typography>
                      <Field
                        className="custom-input-field"
                        name="adr_fax"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="adr_fax"
                        autoComplete="adr_fax"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:helpIconFax')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:fax')}) ({t('fields:optional')}) ({t('fields:helpIconFax')})
                          </span>
                        }
                      />
                      <ErrorMessage name="adr_fax">
                        {(msg) => (
                          <span tabIndex={0} className="error">
                            {t(msg, { field: t('fields:fax') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:extension')}
                        </Box>
                        <Box component="span" className="optional">
                          ({t('fields:optional')})
                        </Box>
                      </Typography>
                      <Field
                        className="custom-input-field"
                        name="adr_phone_ext"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="adr_phone_ext"
                        autoComplete="adr_phone_ext"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:helpIconExtension')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:extension')}) ({t('fields:optional')}) (
                            {t('fields:helpIconExtension')})
                          </span>
                        }
                      />
                      <ErrorMessage name="adr_phone_ext">
                        {(msg) => (
                          <span tabIndex={0} className="error">
                            {t(msg, { field: t('fields:extension') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:link')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        className="custom-input-field"
                        name="sch_slug"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="sch_slug"
                        autoComplete="sch_slug"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:helpIconLink')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:link')}) ({t('fields:required')}) (
                            {t('fields:helpIconLink')})
                          </span>
                        }
                      />
                      <ErrorMessage name="sch_slug">
                        {(msg) => (
                          <span tabIndex={0} className="error">
                            {t(msg, { field: t('fields:link') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:website')}
                        </Box>
                        <Box component="span" className="optional">
                          ({t('fields:optional')})
                        </Box>
                      </Typography>
                      <Field
                        className="custom-input-field"
                        name="sch_website"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="sch_website"
                        autoComplete="sch_website"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:helpIconWebsite')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:website')}) ({t('fields:optional')}) (
                            {t('fields:helpIconWebsite')})
                          </span>
                        }
                      />
                      <ErrorMessage name="sch_website">
                        {(msg) => (
                          <span tabIndex={0} className="error">
                            {t(msg, { field: t('fields:website') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:detailsDescription')}
                        </Box>
                        <Box component="span" className="optional">
                          ({t('fields:optional')})
                        </Box>
                      </Typography>
                      <Field
                        className="custom-input-field"
                        name="sch_description"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="sch_description"
                        pr={0}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip
                                title={t('fields:helpIconSchoolDetailsDescription')}
                                placement="top"
                              >
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        multiline
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:detailsDescription')}) ({t('fields:optional')}) (
                            {t('fields:helpIconSchoolDetailsDescription')})
                          </span>
                        }
                      />
                      <ErrorMessage name="sch_description">
                        {(msg) => (
                          <span className="error">{t(msg, { field: t('sch_description') })}</span>
                        )}
                      </ErrorMessage>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <FormikErrorFocus offset={0} align={'top'} focusDelay={5} ease={'linear'} duration={5} />
        </Form>
      )}
    </Formik>
  )
}

GeneralInfo.propTypes = {
  masterData: PropTypes.object,
  editSchool: PropTypes.func,
  school: PropTypes.object,
  formState: PropTypes.object,
  districts: PropTypes.array,
  states: PropTypes.array,
  searchStates: PropTypes.func,
  editLogo: PropTypes.func,
}

GeneralInfo.defaultProps = {
  masterData: {},
  editSchool: () => {},
  school: {},
  formState: {},
  districts: [],
  states: [],
  searchStates: () => {},
  editLogo: () => {},
}

export default GeneralInfo
