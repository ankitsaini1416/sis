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
  Paper,
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

// import CourseImg from '../../../../assets/images/course-big.png'
import UploadImg from '../../../../assets/images/upload-logo.png'
import { ROUTES } from '../../../../helpers/constants'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import EditCourseSkeleton from '../courses/EditCourseSkeleton'
import useStyles from '../Programs.Style'
import { CoreSchema } from './../../../../../clientFiles/validations'
import { getFullName, isEmpty, isNullOrEmpty, mapStateWithData } from './../../../../helpers/utils'
const initialState = {
  cr_school_id: '',
  cr_subject_id: '',
  cr_number: '',
  cr_name: '',
  cr_default_amount: '',
  cr_default_credits: '',
  cr_default_passing_grade: '',
  cr_instructor: '',
  cr_is_active: false,
  cr_description: '',
  sch_dst_id: '',
}
const CheckboxWithGreenCheck = withStyles({})(Checkbox)

function EditCourse({ course, updateCourse, editLogo, subjects, instructors }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const history = useHistory()
  const [logo, setLogo] = useState(null)

  useEffect(() => {
    if (course.cr_logo) {
      setLogo(course.cr_logo)
    }
  }, [course.cr_logo])
  const onSubmit = function (values, { setErrors }) {
    updateCourse(course.id, values, { setErrors })
  }

  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbPrograms'),
      href: ROUTES.PROGRAMS,
    },
    {
      title: t('breadcrumbAllCourses'),
      href: ROUTES.COURSES,
    },
    {
      title: t('breadcrumbEditCourses'),
      href: '',
    },
  ]
  if (isEmpty(course)) {
    return <EditCourseSkeleton />
  }
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={mapStateWithData(course, initialState)}
      enableReinitialize={true}
      validationSchema={CoreSchema.editCourse}
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
                    <Box component="span" fontWeight="700" fontSize="24px">
                      {t('editCourse')}
                    </Box>
                    <Box
                      ml={1}
                      component="span"
                      fontWeight="500"
                      fontSize="20px"
                      className="user-name"
                    >
                      ({course.cr_name})
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
              <Box px={{ xs: 2, lg: 3 }} pt={{ xs: 2, lg: 2 }} pb={5}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4} lg={4} xl={2}>
                    <Box
                      mt={2}
                      mx="auto"
                      width={{ xs: '200px', sm: '300px', lg: '100%' }}
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
                        alt="course image"
                        tabIndex={0}
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
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box mr={1}>
                        <Typography component="span" variant="body2" color="textPrimary">
                          {/* Course_log.png */}
                        </Typography>
                      </Box>
                      <Tooltip title={t('editCourseImage')}>
                        <IconButton
                          aria-label={t('editCourseImage')}
                          color="primary"
                          className="upload-link-button"
                        >
                          <input
                            accept="image/jpeg,image/png,image/"
                            id="contained-button-file"
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
                            type="file"
                            title=""
                          />
                          <label htmlFor="contained-button-file">
                            <Edit2 width="16px" height="16px" />
                          </label>
                        </IconButton>
                      </Tooltip>

                      {!isNullOrEmpty(logo) ? (
                        <Tooltip title={t('deleteCourseLogo')}>
                          <IconButton
                            aria-label={t('deleteCourseLogo')}
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
                  </Grid>
                  <Grid item xs={12} md={8} lg={8} xl={8}>
                    <Box pl={{ xs: 0, sm: 1, md: 2 }}>
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
                            className="custom-input-field"
                            id="sch_dst_id"
                            name="sch_dst_id"
                            as={TextField}
                            variant="outlined"
                            disabled
                            fullWidth
                            size="small"
                            value={course?.cr_school?.sch_district?.dst_name}
                            autoComplete="districtId"
                            pr={0}
                            InputProps={{
                              readOnly: true,
                            }}
                            label={
                              <span style={visuallyHidden}>
                                ({t('fields:selectDistrict')}) ({t('fields:required')}) (
                              </span>
                            }
                          />
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
                            disabled
                            size="small"
                            id="cr_school_id"
                            value={course.cr_school?.sch_name || ''}
                            pr={0}
                            InputProps={{
                              readOnly: true,
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
                                ({t('fields:selectSchool')}) ({t('fields:required')})
                              </span>
                            }
                          />
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
                              <span tabIndex={0} className="error">
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
                              <span tabIndex={0} className="error">
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
                              <span tabIndex={0} className="error">
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
                            pr={0}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Tooltip title={t('fields:assignInstructorHelp')} placement="top">
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
                                {`${getFullName(instructor)} (${instructor.username})`}
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
                            pr={0}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Tooltip title={t('fields:assignInstructorHelp')} placement="top">
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
                                {`${getFullName(instructor)} (${instructor.username})`}
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
                        <Grid item xs={12} className="custom-checkbox">
                          <Box mt={1} mb={1}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box component="span" fontWeight="600">
                                {t('fields:status')}
                              </Box>
                              <Box component="span" className="mandatory">
                                {t('fields:mandatory')}
                              </Box>
                            </Typography>
                          </Box>
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
                                  id="cr_is_active"
                                  name="cr_is_active"
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
                              <span tabIndex={0} className="error">
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
            </Paper>
            <FormikErrorFocus
              offset={0}
              align={'top'}
              focusDelay={5}
              ease={'linear'}
              duration={5}
            />
          </Form>
        )
      }}
    </Formik>
  )
}

EditCourse.propTypes = {
  course: PropTypes.object,
  updateCourse: PropTypes.func,
  editLogo: PropTypes.func,
  subjects: PropTypes.array,
  instructors: PropTypes.array,
}

EditCourse.defaultProps = {
  course: {},
  updateCourse: () => {},
  editLogo: () => {},
  subjects: [],
  instructors: [],
}

export default EditCourse
