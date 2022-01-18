import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { Check, HelpCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { isNullOrEmpty } from '../../../../helpers/utils'
import useStyles from '../Programs.Style'
import { CoreSchema } from './../../../../../clientFiles/validations'

const CheckboxWithGreenCheck = withStyles({})(Checkbox)
const initialState = {
  cgi_amount: 0,
  cgi_passing_grade: '',
  cgi_credits: 0,
  cgi_is_elective: false,
}

const mapStateWithData = function (data, initialState) {
  return {
    cgi_amount: !isNullOrEmpty(data.cr_default_amount)
      ? data.cr_default_amount
      : initialState.cgi_amount,
    cgi_passing_grade: !isNullOrEmpty(data.cr_default_passing_grade)
      ? data.cr_default_passing_grade
      : initialState.cgi_passing_grade,
    cgi_credits: !isNullOrEmpty(data.cr_default_credits)
      ? data.cr_default_credits
      : initialState.cgi_credits,
    cgi_is_elective: !isNullOrEmpty(data.cr_is_elective)
      ? data.cr_is_elective
      : initialState.cgi_is_elective,
  }
}

function AssignCourse({ course, courseGroupId, addCourseGroupItem, onClose }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const onSubmit = function (values, { setErrors, resetForm }) {
    addCourseGroupItem(
      {
        cgi_course_group_id: courseGroupId,
        cgi_course_id: course.id,
        ...values,
      },
      {
        setErrors,
        callback: () => {
          onClose()
          resetForm()
        },
      }
    )
  }
  const [category, setCategory] = React.useState('')

  const handleChangeCategory = (event) => {
    setCategory(event.target.value)
  }
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={mapStateWithData(course, initialState)}
      enableReinitialize={true}
      validationSchema={CoreSchema.addCourseGroupItem}
      key={course.id}
    >
      {({ values, setFieldValue }) => (
        <Form className={classes.form} noValidate autoComplete="off">
          <Grid spacing={2} container alignItems="flex-start">
            <Grid item xs={12} sm={6} md={4} lg={2}>
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
                type="number"
                fullWidth
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title={t('fields:coursePriceHelp')} placement="top">
                        <HelpCircle className="help-icon" />
                      </Tooltip>
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position="start">{t('fields:currency')}</InputAdornment>
                  ),
                }}
                label={
                  <span style={visuallyHidden}>
                    ({t('fields:coursePrice')}) ({t('fields:required')}) (
                    {t('fields:coursePriceHelp')})
                  </span>
                }
              />
              <ErrorMessage name="cgi_amount">
                {(msg) => (
                  <span className="error">{t(msg, { field: t('fields:coursePrice') })}</span>
                )}
              </ErrorMessage>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                <Box component="span" fontWeight="600">
                  {t('fields:passingGrade')}
                </Box>
              </Typography>
              <Field
                className="custom-input-field"
                id="cgi_passing_grade"
                type="number"
                name="cgi_passing_grade"
                as={TextField}
                variant="outlined"
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
                    ({t('fields:passingGrade')}) ({t('fields:required')}) (
                    {t('fields:passingGradeHelp')})
                  </span>
                }
              />
              <ErrorMessage name="cgi_passing_grade">
                {(msg) => (
                  <span className="error">{t(msg, { field: t('fields:passingGrade') })}</span>
                )}
              </ErrorMessage>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
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
                    ({t('fields:courseCredit')}) ({t('fields:required')}) (
                    {t('fields:courseCreditHelp')})
                  </span>
                }
              />
              <ErrorMessage name="cgi_credits">
                {(msg) => (
                  <span className="error">{t(msg, { field: t('fields:courseCredit') })}</span>
                )}
              </ErrorMessage>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                <Box component="span" fontWeight="600">
                  {t('fields:selectCategory')}
                </Box>
              </Typography>
              <Field
                className={classes.selectIcon + ' custom-input-field'}
                name="category"
                as={TextField}
                variant="outlined"
                fullWidth
                size="small"
                id="category"
                value={category}
                onChange={handleChangeCategory}
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
                <MenuItem value="Regular">Regular</MenuItem>
                <MenuItem value="Honours">Honours</MenuItem>
                <MenuItem value="AP/DE">AP/DE</MenuItem>
              </Field>
              <ErrorMessage name="category">
                {(msg) => (
                  <span tabIndex={0} className="error">
                    {t(msg, { field: t('fields:selectCategory') })}
                  </span>
                )}
              </ErrorMessage>
            </Grid>
            <Grid item xs={12} sm="auto" className="custom-checkbox">
              <Box mt={{ xs: 0, sm: 3 }} align="left">
                <FormControlLabel
                  control={
                    <CheckboxWithGreenCheck
                      checked={values.cgi_is_elective}
                      onChange={(e) => {
                        setFieldValue('cgi_is_elective', e.target.checked)
                      }}
                      checkedIcon={<Check />}
                      color="Primary"
                    />
                  }
                  label={t('fields:isElective')}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm="auto">
              <Box mt={{ xs: 0, sm: 3 }} align="left">
                <Button
                  className="text-transform-none"
                  size="large"
                  variant="contained"
                  disableElevation
                  color="primary"
                  type="submit"
                >
                  {t('addCourse')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}
AssignCourse.propTypes = {
  courseGroupId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  course: PropTypes.object,
  addCourseGroupItem: PropTypes.func,
  onClose: PropTypes.func,
}
AssignCourse.defaultProps = {
  courseGroupId: '',
  course: {},
  addCourseGroupItem: () => {},
  onClose: () => {},
}
export default AssignCourse
