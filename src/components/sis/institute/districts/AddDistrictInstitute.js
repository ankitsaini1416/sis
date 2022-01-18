import '../../../../assets/styles/CountryCode.scss'

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
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { Check, Edit2, HelpCircle, X } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { CoreSchema } from '../../../../../clientFiles/validations'
import UploadImg from '../../../../assets/images/upload.png'
import { ROUTES } from '../../../../helpers/constants'
import { get } from '../../../../helpers/utils'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import useStyles from '../Institute.Style'

const CheckboxWithGreenCheck = withStyles({})(Checkbox)
const usPhoneCode = '1'
const initialState = {
  dst_category: '',
  dst_is_active: true,
  dst_name: '',
  dst_organization: '',
  dst_contact_person: '',
  dst_contact_email: '',
  dst_phone_prefix: usPhoneCode,
  dst_phone: '',
  dst_type: '',
  dst_description: '',
  dst_slug: '',
  dst_website: '',
  dst_logo: '',
  dst_school_count: 1,
}

/**
 * Add district component
 * @returns {JSX.Element}
 * @constructor
 */
function AddDistrictInstitute({ masterData, addDistrict }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const history = useHistory()

  const onSubmit = function (values, { setErrors }) {
    addDistrict(values, { setErrors })
  }
  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbInstitute'),
      href: ROUTES.DISTRICTINSTITUTE,
    },
    {
      title: t('breadcrumbInstituteDistricts'),
      href: ROUTES.DISTRICTINSTITUTE,
    },
    {
      title: t('breadcrumbAddDistrict'),
      href: ROUTES.ADDDISTRICTINSTITUTE,
    },
  ]

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialState}
      validationSchema={CoreSchema.addDistrict}
    >
      {({ values, setFieldValue }) => (
        <Form className={classes.form} noValidate autoComplete="off">
          <Box py={2}>
            <Breadcrumb data={breadcrumbData} />
            <Grid container justify="space-between" alignItems="center">
              <Grid item xs={12} sm="auto">
                <Typography
                  tabIndex={0}
                  component="h4"
                  align="left"
                  variant="h5"
                  color="textPrimary"
                >
                  <Box component="span" fontWeight="700">
                    {t('addNewDistrict')}
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
            <Box px={{ xs: 2, lg: 3 }} py={{ xs: 2, lg: 2 }}>
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
                      src={values.dst_logo ? URL.createObjectURL(values.dst_logo) : UploadImg}
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = UploadImg
                      }}
                      alt="District Logo"
                    />
                  </Box>
                  <ErrorMessage name="dst_logo">
                    {(msg) => (
                      <span tabIndex={0} className="error">
                        {t(msg, { field: t('image') })}
                      </span>
                    )}
                  </ErrorMessage>
                  <Box
                    mt={1}
                    display={!values.dst_logo ? 'flex' : 'none'}
                    component="div"
                    fontWeight="600"
                    fonSize="14px"
                    align="center"
                    width="100%"
                    color="primary"
                    className="upload-link-text"
                    justifyContent="center"
                  >
                    <input
                      onChange={(e) => {
                        let reader = new FileReader()
                        let file = e.currentTarget.files[0]
                        if (!file || !reader.readAsDataURL) {
                          return
                        }
                        reader.onloadend = () => {
                          setFieldValue('dst_logo', file)
                        }
                        reader.readAsDataURL(file)
                      }}
                      accept="image/jpeg,image/png,image/"
                      id="contained-button-file"
                      type="file"
                      title={''}
                    />
                    <label htmlFor="contained-button-file">{t('fields:uploadDistrictLogo')}</label>
                  </Box>
                  <Box
                    display={values.dst_logo ? 'flex' : 'none'}
                    mt={2}
                    component="div"
                    fontWeight="600"
                    fonSize="14px"
                    align="center"
                    width="100%"
                    color="primary"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box mr={1}>
                      <Typography
                        className="word-break"
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {get(values, 'dst_logo.name', '')}
                      </Typography>
                    </Box>
                    <Tooltip title={t('editDistrictLogo')}>
                      <IconButton
                        aria-label={t('editDistrictLogo')}
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
                              setFieldValue('dst_logo', file)
                            }
                            reader.readAsDataURL(file)
                          }}
                          accept="image/jpeg,image/png,image/"
                          id="contained-button-file-edit"
                          type="file"
                          title={''}
                        />
                        <label htmlFor="contained-button-file-edit">
                          <Edit2 width="16px" height="16px" />
                        </label>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('deleteDistrictLogo')}>
                      <IconButton
                        aria-label={t('deleteDistrictLogo')}
                        onClick={() => setFieldValue('dst_logo', '')}
                        color="secondary"
                      >
                        <X width="16px" height="16px" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>
                <Grid item xs={12} md={8} lg={8} xl={8}>
                  <Box pl={{ xs: 0, sm: 1, md: 2 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6} lg={6}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:category')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:category')}) ({t('fields:required')}) (
                              {t('fields:helpIconCategory')})
                            </span>
                          }
                          className={classes.selectIcon + ' custom-input-field'}
                          name="dst_category"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="dst_category"
                          pr={0}
                          select
                          InputProps={{
                            ariaLabel: 'Without label',
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconCategory')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                        >
                          {masterData?.district_category.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                              {t(`reference:${cat}`)}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage name="dst_category">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:category') })}
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
                                checked={values.dst_is_active}
                                onChange={(e) => {
                                  setFieldValue('dst_is_active', e.target.checked)
                                }}
                                checkedIcon={<Check aria-label="status" />}
                                color="primary"
                              />
                            }
                            label={t('fields:active')}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} lg={6}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:districtName')}
                          </Box>
                          <Box data-srtext="Required" component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>

                        <Field
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:districtName')}) ({t('fields:required')}) (
                              {t('fields:helpIconDistrictName')})
                            </span>
                          }
                          className="custom-input-field"
                          name="dst_name"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="dst_name"
                          autoComplete="dst_name"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconDistrictName')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                        />

                        <ErrorMessage name="dst_name">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:districtName') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} lg={6}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:schoolBoard')}
                          </Box>
                          <Box component="span" className="optional">
                            ({t('fields:optional')})
                          </Box>
                        </Typography>
                        <Field
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:schoolBoard')}) ({t('fields:optional')}) (
                              {t('fields:helpIconSchoolBoard')})
                            </span>
                          }
                          className="custom-input-field"
                          name="dst_organization"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="dst_organization"
                          autoComplete="dst_organization"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconSchoolBoard')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <ErrorMessage name="dst_organization">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:schoolBoard') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} lg={6}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:superintendent')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="dst_contact_person"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="dst_contact_person"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconSuperintendent')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:superintendent')}) ({t('fields:required')}) (
                              {t('fields:helpIconSuperintendent')})
                            </span>
                          }
                        />
                        <ErrorMessage name="dst_contact_person">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:superintendent') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} lg={6}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:superintendentEmail')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="dst_contact_email"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="dst_contact_email"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title={t('fields:helpIconSuperintendentEmail')}
                                  placement="top"
                                >
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:superintendentEmail')}) ({t('fields:required')}) (
                              {t('fields:helpIconSuperintendentEmail')})
                            </span>
                          }
                        />
                        <ErrorMessage name="dst_contact_email">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, {
                                field: t('fields:superintendentEmail'),
                              })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} lg={6}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:superintendentPhone')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          as={TextField}
                          type="text"
                          id="dst_phone"
                          name="dst_phone"
                          fullWidth
                          variant="outlined"
                          size="small"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title={t('fields:helpIconSuperintendentPhone')}
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
                                  value={values.dst_phone_prefix}
                                  onChange={(e) => {
                                    setFieldValue('dst_phone_prefix', e.target.value)
                                  }}
                                  id="country-menu"
                                  classes={{ root: 'country-list' }}
                                  className="no-underline"
                                  inputProps={{
                                    'aria-label': t('fields:selectCountryCode'),
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
                              ({t('fields:superintendentPhone')}) ({t('fields:required')}) (
                              {t('fields:helpIconSuperintendentPhone')})
                            </span>
                          }
                        />
                        <ErrorMessage name="dst_phone">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, {
                                field: t('fields:superintendentPhone'),
                              })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} lg={6}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:districtType')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className={classes.selectIcon + ' custom-input-field'}
                          name="dst_type"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="dst_type"
                          pr={0}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconDistrictType')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          select
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:districtType')}) ({t('fields:required')}) (
                              {t('fields:helpIconDistrictType')})
                            </span>
                          }
                        >
                          {masterData?.district_type.map((type) => (
                            <MenuItem key={type} value={type}>
                              {t(`reference:${type}`)}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage name="dst_type">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:districtType') })}
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
                          name="dst_description"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="dst_description"
                          pr={0}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title={t('fields:helpIconDetailsDescriptionDistrict')}
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
                              {t('fields:helpIconDetailsDescriptionDistrict')})
                            </span>
                          }
                        />
                        <ErrorMessage name="dst_description">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, {
                                field: t('fields:detailsDescription'),
                              })}
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
                          name="dst_website"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="dst_website"
                          autoComplete="dst_website"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title={t('fields:helpIconDistrictWebsite')}
                                  placement="top"
                                >
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:website')}) ({t('fields:optional')}) (
                              {t('fields:helpIconDistrictWebsite')})
                            </span>
                          }
                        />
                        <ErrorMessage name="dst_website">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:website') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} lg={6}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:schoolCount')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="dst_school_count"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="dst_school_count"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconSchoolCount')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:schoolCount')}) ({t('fields:required')}) (
                              {t('fields:helpIconSchoolCount')})
                            </span>
                          }
                        />
                        <ErrorMessage name="dst_school_count">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, {
                                field: t('fields:schoolCount'),
                                min: 1,
                                max: 50,
                              })}
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
                          name="dst_slug"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="dst_slug"
                          autoComplete="dst_slug"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconDistrictLink')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:link')}) ({t('fields:required')}) (
                              {t('fields:helpIconDistrictLink')})
                            </span>
                          }
                        />
                        <ErrorMessage name="dst_slug">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:link') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Form>
      )}
    </Formik>
  )
}

AddDistrictInstitute.propTypes = {
  masterData: PropTypes.object,
  addDistrict: PropTypes.func,
}

AddDistrictInstitute.defaultProps = {
  masterData: {},
  addDistrict: () => {},
}

export default AddDistrictInstitute
