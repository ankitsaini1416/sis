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
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { Check, HelpCircle, X } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { CoreSchema } from '../../../../../clientFiles/validations'
import CourseImg from '../../../../assets/images/course.png'
import useStyles from '../Programs.Style'

const mapStateWithData = function (initialState, data) {
  const state = {
    cgi_amount: data.cgi_amount || initialState.cgi_amount,
    cgi_passing_grade: data.cgi_passing_grade || initialState.cgi_passing_grade,
    cgi_credits: data.cgi_credits || initialState.cgi_credits,
    cgi_type: data.cgi_type || initialState.cgi_type,
    cgi_is_elective: data.cgi_is_elective || initialState.cgi_is_elective,
  }
  return state
}

const initialState = {
  cgi_amount: 0,
  cgi_passing_grade: '',
  cgi_credits: 0,
  cgi_type: '',
  cgi_is_elective: false,
}

const CheckboxWithGreenCheck = withStyles({})(Checkbox)

function EditCourse({ open, onClose, details, editCourseGroupItem, masterData }) {
  const classes = useStyles()
  const { t } = useTranslation()

  const onSubmit = function (values, { setErrors }) {
    editCourseGroupItem(
      details.id,
      {
        cgi_course_group_id: details.cgi_course_group_id,
        ...values,
      },
      { setErrors }
    )
    onClose()
  }

  return (
    <Dialog
      paper
      className="custom-dialog"
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      data-id={details.id}
      fullWidth={true}
      maxWidth="md"
    >
      <Formik
        onSubmit={onSubmit}
        initialValues={mapStateWithData(initialState, details)}
        enableReinitialize={true}
        validationSchema={CoreSchema.editCourseGroupItem}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className={classes.form} noValidate autoComplete="off">
              <DialogTitle disableTypography id="customized-dialog-title" onClose={onClose}>
                <Box pt={1} display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h5" tabIndex={0}>
                    <Box component="span" fontWeight="fontWeightBold">
                      {t('editCourse')}
                    </Box>
                    <Box
                      ml={1}
                      component="span"
                      fontWeight="500"
                      fontSize="20px"
                      className="user-name"
                    >
                      ({details.cgi_course?.cr_name})
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
                <Box py={3}>
                  <Grid spacing={3} container alignItems="center">
                    <Grid item xs={6} sm="auto">
                      <Box width={48} height={48} borderRadius={8} className="image-container">
                        <img tabIndex={0} src={CourseImg} alt="course image" />
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3} md={2} xl="auto">
                      <Box minWidth="150px">
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textSecondary"
                        >
                          <Box component="span" fontWeight="500" fontSize="14px">
                            {t('courseCode')}
                          </Box>
                        </Typography>
                        <Typography tabIndex={0} component="h6" color="textPrimary">
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {details.cgi_course?.cr_number}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3} md={2} xl="auto">
                      <Box minWidth="150px">
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textSecondary"
                        >
                          <Box component="span" fontWeight="500" fontSize="14px">
                            {t('courseSubject')}
                          </Box>
                        </Typography>
                        <Typography tabIndex={0} component="h6" color="textPrimary">
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {details.cgi_course?.cr_subject?.sub_name}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3} md={2} xl="auto">
                      <Box>
                        <Typography
                          tabIndex={0}
                          component="h6"
                          align="left"
                          variant="h6"
                          color="textSecondary"
                        >
                          <Box component="span" fontWeight="500" fontSize="14px">
                            {t('courseName')}
                          </Box>
                        </Typography>
                        <Typography tabIndex={0} component="h6" color="textPrimary">
                          <Box component="span" fontWeight="600" fontSize="14px">
                            {details.cgi_course?.cr_name}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box mt={3}>
                    <Grid spacing={2} container alignItems="flex-start">
                      <Grid item xs={12} sm={6} md={2} lg={2}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:coursePrice')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          id="cgi_amount"
                          name="cgi_amount"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          type="number"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:coursePriceHelp')} placement="top">
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
                              ({t('fields:coursePrice')}) ({t('fields:coursePriceHelp')})
                            </span>
                          }
                        />
                        <ErrorMessage name="cgi_amount">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:coursePrice') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2} lg={2}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:passingGrade')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          id="cgi_passing_grade"
                          name="cgi_passing_grade"
                          as={TextField}
                          variant="outlined"
                          type="number"
                          fullWidth
                          size="small"
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
                              ({t('fields:passingGrade')}) ({t('fields:passingGradeHelp')})
                            </span>
                          }
                        />
                        <ErrorMessage name="cgi_passing_grade">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:passingGrade') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2} lg={2}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:courseCredit')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          id="cgi_credits"
                          name="cgi_credits"
                          as={TextField}
                          variant="outlined"
                          type="number"
                          fullWidth
                          size="small"
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
                              ({t('fields:courseCredit')}) ({t('fields:courseCreditHelp')})
                            </span>
                          }
                        />
                        <ErrorMessage name="cgi_credits">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:courseCredit') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:selectCategory')}
                          </Box>
                        </Typography>
                        <Field
                          className={classes.selectIcon + ' custom-input-field'}
                          name="cgi_type"
                          id="cgi_type"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          select
                          pr={0}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:selectCategoryHelp')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:selectCategory')}) ({t('fields:required')}) (
                              {t('fields:selectCategoryHelp')})
                            </span>
                          }
                        >
                          {masterData?.course_type.map((type) => (
                            <MenuItem key={type} value={type}>
                              {t(`reference:${type}`)}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage name="category">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:selectCategory') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2} lg={2}>
                        <Box
                          mt={{ xs: 0, sm: 3 }}
                          minWidth={{ xs: 'auto', sm: 'auto', md: '150px' }}
                          align="left"
                        >
                          <FormControlLabel
                            control={
                              <CheckboxWithGreenCheck
                                checked={values.cgi_is_elective}
                                onChange={(e) => {
                                  setFieldValue('cgi_is_elective', e.target.checked)
                                }}
                                checkedIcon={<Check />}
                                color="primary"
                              />
                            }
                            className="custom-checkbox"
                            label={t('fields:isElective')}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
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
                  {t('save')}
                </Button>
              </DialogActions>
            </Form>
          )
        }}
      </Formik>
    </Dialog>
  )
}

EditCourse.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  details: PropTypes.object,
  editCourseGroupItem: PropTypes.func,
  masterData: PropTypes.object,
}

EditCourse.defaultProps = {
  open: false,
  onClose: () => {},
  details: {},
  editCourseGroupItem: () => {},
  masterData: {},
}

export default EditCourse
