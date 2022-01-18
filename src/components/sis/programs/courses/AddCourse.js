/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles'
import { Autocomplete } from '@material-ui/lab'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import { Check, HelpCircle, X } from 'react-feather'
import { useTranslation } from 'react-i18next'

import UploadImg from '../../../../assets/images/upload-logo.png'
import { isEmpty } from '../../../../helpers/utils'
import FormikAutoComplete from '../../../common/formikComponents/FormikAutoComplete'
import useStyles from '../Programs.Style'
import { CoreSchema } from './../../../../../clientFiles/validations'

const initialState = {
  cr_school_id: '',
  cr_subject_id: '',
  cr_number: '',
  cr_name: '',
  cr_default_amount: '',
  cr_default_credits: '',
  cr_default_passing_grade: '',
  cr_is_active: false,
  cr_instructor: '',
  cr_description: '',
  cr_logo: '',
  sch_dst_id: '',
}
const CheckboxWithGreenCheck = withStyles({})(Checkbox)
let schoolId

function AddCourse({
  open,
  onClose,
  districts,
  fetchSchools,
  schools,
  addCourse,
  fetchSubjects,
  getInstructors,
  subjects,
  instructors,
}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const districtCode = useRef('')
  const [districtId, setDistrictId] = useState('')
  const onSubmit = function (values, { setErrors }) {
    addCourse(values, {
      setErrors,
      callback: () => {
        onClose()
      },
    })
  }

  return (
    <Dialog
      paper
      className="custom-dialog"
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="md"
    >
      <Formik
        onSubmit={onSubmit}
        initialValues={initialState}
        enableReinitialize={true}
        validationSchema={CoreSchema.addCourse}
      >
        {({ values, setFieldValue }) => {
          if (values.cr_school_id && values.cr_school_id !== schoolId) {
            fetchSubjects(values.cr_school_id)
            getInstructors(values)
            schoolId = values.cr_school_id
          }
          if (values.sch_dst_id !== districtCode.current) {
            fetchSchools(values.sch_dst_id)
            districtCode.current = values.sch_dst_id
          }
          return (
            <Form className={classes.form} noValidate autoComplete="off">
              <DialogTitle disableTypography id="customized-dialog-title" onClose={onClose}>
                <Box pt={1} display="flex" alignItems="center" justifyContent="space-between">
                  <Typography tabIndex={0} variant="h5">
                    <Box component="span" fontWeight="fontWeightBold">
                      {t('addNewCourse')}
                    </Box>
                  </Typography>
                  {onClose ? (
                    <IconButton
                      tabIndex={-1}
                      aria-label="close"
                      className="close-button"
                      onClick={onClose}
                    >
                      <X />
                    </IconButton>
                  ) : null}
                </Box>
              </DialogTitle>
              <DialogContent>
                <Box pb={2}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4} md={3}>
                      <Box
                        width={{ xs: '250px', sm: '300px', lg: '100%' }}
                        borderRadius={8}
                        className="image-container"
                      >
                        <img
                          src={values.cr_logo ? URL.createObjectURL(values.cr_logo) : UploadImg}
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = UploadImg
                          }}
                          alt="Filter"
                        />
                      </Box>
                      <ErrorMessage name="cr_logo">
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
                              setFieldValue('cr_logo', file)
                            }
                            reader.readAsDataURL(file)
                          }}
                          accept="image/jpeg,image/png,image/"
                          id="contained-button-file"
                          type="file"
                          title=""
                        />
                        <label htmlFor="contained-button-file">{t('uploadCourseImage')}</label>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Box width="100%" pl={{ xs: 0, lg: 2, xl: 3 }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={12} md={6}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box component="span" fontWeight="600">
                                {t('fields:selectDistrict')}
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
                              component={FormikAutoComplete}
                              nameKey="dst_name"
                              valueKey="dst_id"
                              variant="outlined"
                              fullWidth
                              size="small"
                              select
                              pr={0}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton>
                                    <Tooltip title={t('fields:helpIconSchoolType')} placement="top">
                                      <HelpCircle className="help-icon" />
                                    </Tooltip>
                                  </IconButton>
                                </InputAdornment>
                              }
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:selectDistrict')}) ({t('fields:required')}) (
                                  {t('fields:helpIconSchoolType')})
                                </span>
                              }
                            />
                            <ErrorMessage name="sch_dst_id">
                              {(msg) => (
                                <span tabIndex={0} className="error">
                                  {t(msg, { field: t('fields:selectDistrict') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box component="span" fontWeight="600">
                                {t('fields:selectSchool')}
                              </Box>
                              <Box component="span" className="mandatory">
                                {t('fields:mandatory')}
                              </Box>
                            </Typography>
                            <Field
                              className={classes.selectIcon + ' custom-input-field'}
                              name="cr_school_id"
                              as={TextField}
                              variant="outlined"
                              fullWidth
                              size="small"
                              id="cr_school_id"
                              disabled={!values.sch_dst_id}
                              select
                              pr={0}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Tooltip title={t('fields:selectSchoolHelp')} placement="top">
                                      <HelpCircle className="help-icon" />
                                    </Tooltip>
                                  </InputAdornment>
                                ),
                              }}
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:selectSchool')}) ({t('fields:required')}) (
                                  {t('fields:selectSchoolHelp')})
                                </span>
                              }
                            >
                              {schools.map((school) => (
                                <MenuItem key={school.sch_id} value={school.sch_id}>
                                  {school.sch_name}
                                </MenuItem>
                              ))}
                            </Field>
                            <ErrorMessage name="cr_school_id">
                              {(msg) => (
                                <span tabIndex={0} className="error">
                                  {t(msg, { field: t('fields:selectSchool') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box component="span" fontWeight="600">
                                {t('fields:selectSubjects')}
                              </Box>
                              <Box component="span" className="mandatory">
                                {t('fields:mandatory')}
                              </Box>
                            </Typography>
                            <Field
                              className={classes.selectIcon + ' custom-input-field'}
                              name="cr_subject_id"
                              as={TextField}
                              variant="outlined"
                              fullWidth
                              size="small"
                              id="cr_subject_id"
                              disabled={!values.cr_school_id}
                              select
                              pr={0}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Tooltip title={t('fields:selectSubjectHelp')} placement="top">
                                      <HelpCircle className="help-icon" />
                                    </Tooltip>
                                  </InputAdornment>
                                ),
                              }}
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:selectSubjects')}) ({t('fields:required')}) (
                                  {t('fields:selectSubjectHelp')})
                                </span>
                              }
                            >
                              {subjects.map((subject) => (
                                <MenuItem key={subject.sub_id} value={subject.sub_id}>
                                  {subject.sub_name}
                                </MenuItem>
                              ))}
                            </Field>
                            <ErrorMessage name="cr_subject_id">
                              {(msg) => (
                                <span tabIndex={0} className="error">
                                  {t(msg, { field: t('fields:selectSubjects') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box component="span" fontWeight="600">
                                {t('fields:courseCode')}
                              </Box>
                              <Box component="span" className="mandatory">
                                {t('fields:mandatory')}
                              </Box>
                            </Typography>
                            <Field
                              className="custom-input-field"
                              name="cr_number"
                              as={TextField}
                              variant="outlined"
                              fullWidth
                              size="small"
                              id="cr_number"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Tooltip title={t('fields:courseCodeHelp')} placement="top">
                                      <HelpCircle className="help-icon" />
                                    </Tooltip>
                                  </InputAdornment>
                                ),
                              }}
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:courseCode')}) ({t('fields:required')}) (
                                  {t('fields:courseCodeHelp')})
                                </span>
                              }
                            />
                            <ErrorMessage name="cr_number">
                              {(msg) => (
                                <span tabIndex={0} className="error">
                                  {t(msg, { field: t('fields:courseCode') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box component="span" fontWeight="600">
                                {t('fields:courseName')}
                              </Box>
                              <Box component="span" className="mandatory">
                                {t('fields:mandatory')}
                              </Box>
                            </Typography>
                            <Field
                              className="custom-input-field"
                              name="cr_name"
                              as={TextField}
                              variant="outlined"
                              fullWidth
                              size="small"
                              id="cr_name"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Tooltip title={t('fields:courseNameHelp')} placement="top">
                                      <HelpCircle className="help-icon" />
                                    </Tooltip>
                                  </InputAdornment>
                                ),
                              }}
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:courseName')}) ({t('fields:required')}) (
                                  {t('fields:courseNameHelp')})
                                </span>
                              }
                            />
                            <ErrorMessage name="cr_name">
                              {(msg) => (
                                <span tabIndex={0} className="error">
                                  {t(msg, { field: t('fields:courseName') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box component="span" fontWeight="600">
                                {t('fields:courseFee')}
                              </Box>
                              <Box component="span" className="optional">
                                ({t('fields:optional')})
                              </Box>
                            </Typography>
                            <Field
                              className="custom-input-field"
                              name="cr_default_amount"
                              as={TextField}
                              variant="outlined"
                              fullWidth
                              size="small"
                              id="cr_default_amount"
                              type="number"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Tooltip title={t('fields:courseFeeHelp')} placement="top">
                                      <HelpCircle className="help-icon" />
                                    </Tooltip>
                                  </InputAdornment>
                                ),
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {t('fields:currency')}
                                  </InputAdornment>
                                ),
                              }}
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:courseFee')}) ({t('fields:optional')}) (
                                  {t('fields:courseFeeHelp')})
                                </span>
                              }
                            />

                            <ErrorMessage name="cr_default_amount">
                              {(msg) => (
                                <span className="error">
                                  {t(msg, { field: t('fields:courseFee') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box component="span" fontWeight="600">
                                {t('fields:courseCredit')}
                              </Box>
                              <Box component="span" className="optional">
                                ({t('fields:optional')})
                              </Box>
                            </Typography>
                            <Field
                              className="custom-input-field"
                              name="cr_default_credits"
                              as={TextField}
                              variant="outlined"
                              fullWidth
                              size="small"
                              id="cr_default_credits"
                              type="number"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Tooltip title={t('fields:courseCreditHelp')} placement="top">
                                      <HelpCircle className="help-icon" />
                                    </Tooltip>
                                  </InputAdornment>
                                ),
                              }}
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:courseCredit')}) ({t('fields:optional')}) (
                                  {t('fields:courseCreditHelp')})
                                </span>
                              }
                            />

                            <ErrorMessage name="cr_default_credits">
                              {(msg) => (
                                <span className="error">
                                  {t(msg, { field: t('fields:courseCredit') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box component="span" fontWeight="600">
                                {t('fields:passingGrade')}
                              </Box>
                              <Box component="span" className="optional">
                                ({t('fields:optional')})
                              </Box>
                            </Typography>
                            <Field
                              className="custom-input-field"
                              name="cr_default_passing_grade"
                              as={TextField}
                              variant="outlined"
                              fullWidth
                              size="small"
                              id="cr_default_passing_grade"
                              type="number"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Tooltip title={t('fields:passingGradeHelp')} placement="top">
                                      <HelpCircle className="help-icon" />
                                    </Tooltip>
                                  </InputAdornment>
                                ),
                              }}
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:passingGrade')}) ({t('fields:optional')}) (
                                  {t('fields:passingGradeHelp')})
                                </span>
                              }
                            />
                            <ErrorMessage name="cr_default_passing_grade">
                              {(msg) => (
                                <span className="error">
                                  {t(msg, { field: t('fields:passingGrade') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box component="span" fontWeight="600">
                                {t('fields:assignInstructor')}
                              </Box>
                              <Box component="span" className="optional">
                                ({t('fields:optional')})
                              </Box>
                            </Typography>
                            <Field
                              className={classes.selectIcon + ' custom-input-field'}
                              name="cr_instructor"
                              as={TextField}
                              variant="outlined"
                              fullWidth
                              size="small"
                              id="cr_instructor"
                              select
                              disabled={!values.cr_school_id}
                              pr={0}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Tooltip
                                      title={t('fields:assignInstructorHelp')}
                                      placement="top"
                                    >
                                      <HelpCircle className="help-icon" />
                                    </Tooltip>
                                  </InputAdornment>
                                ),
                              }}
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:assignInstructor')}) ({t('fields:optional')}) (
                                  {t('fields:assignInstructorHelp')})
                                </span>
                              }
                            >
                              {instructors.map((instructor) => (
                                <MenuItem key={instructor.id} value={instructor.id}>
                                  {instructor.full_name}
                                </MenuItem>
                              ))}
                            </Field>
                            <ErrorMessage name="assign_instructor">
                              {(msg) => (
                                <span className="error">
                                  {t(msg, { field: t('fields:assignInstructor') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} className="custom-checkbox">
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box display="flex" alignItems="center">
                                <Box component="span" fontWeight="600">
                                  {t('fields:status')}
                                </Box>
                                <Box ml={2} zIndex="9" display="flex" alignItems="center">
                                  <Tooltip title={t('fields:helpIconStatus')} placement="top">
                                    <HelpCircle width={16} height={16} className="help-icon" />
                                  </Tooltip>
                                </Box>
                                <Box component="span" className="mandatory">
                                  {t('fields:mandatory')}
                                </Box>
                              </Box>
                            </Typography>

                            <Box minWidth={{ xs: 'auto', sm: 'auto', md: '150px' }} align="left">
                              <FormControlLabel
                                control={
                                  <CheckboxWithGreenCheck
                                    checked={values.cr_is_active}
                                    onChange={(e) => {
                                      setFieldValue('cr_is_active', e.target.checked)
                                    }}
                                    checkedIcon={<Check />}
                                    color="primary"
                                    aria-label={t('status')}
                                  />
                                }
                                label={t('fields:active')}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box component="span" fontWeight="600">
                                {t('fields:description')}
                              </Box>
                              <Box component="span" className="optional">
                                ({t('fields:optional')})
                              </Box>
                            </Typography>
                            <Field
                              className="custom-input-field"
                              multiline
                              rows={2}
                              rowsMax={3}
                              name="cr_description"
                              as={TextField}
                              variant="outlined"
                              fullWidth
                              size="small"
                              id="cr_description"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Tooltip
                                      title={t('fields:courseDescriptionHelp')}
                                      placement="top"
                                    >
                                      <HelpCircle className="help-icon" />
                                    </Tooltip>
                                  </InputAdornment>
                                ),
                              }}
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:description')}) ({t('fields:optional')}) (
                                  {t('fields:courseDescriptionHelp')})
                                </span>
                              }
                            />
                            <ErrorMessage name="cr_description">
                              {(msg) => (
                                <span className="error">
                                  {t(msg, { field: t('fields:description') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  className="text-transform-none custom-default-button"
                  onClick={onClose}
                  size="large"
                  variant="contained"
                  disableElevation
                >
                  {t('cancel')}
                </Button>
                <Button
                  className="text-transform-none"
                  autoFocus
                  type="submit"
                  color="primary"
                  variant="contained"
                  size="large"
                  disableElevation
                >
                  {t('add')}
                </Button>
              </DialogActions>
            </Form>
          )
        }}
      </Formik>
    </Dialog>
  )
}

AddCourse.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  districts: PropTypes.array,
  fetchSchools: PropTypes.func,
  schools: PropTypes.array,
  addCourse: PropTypes.func,
  fetchSubjects: PropTypes.func,
  getInstructors: PropTypes.func,
  subjects: PropTypes.array,
  instructors: PropTypes.array,
}

AddCourse.defaultProps = {
  open: false,
  onClose: () => {},
  districts: [],
  fetchSchools: () => {},
  schools: [],
  addCourse: () => {},
  fetchSubjects: () => {},
  getInstructors: () => {},
  subjects: [],
  instructors: [],
}

export default AddCourse
