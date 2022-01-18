import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import FormikErrorFocus from 'formik-error-focus'
import PropTypes from 'prop-types'
import React from 'react'
import { HelpCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { CoreSchema } from '../../../../../clientFiles/validations'
import { ROUTES } from '../../../../helpers/constants'
import { isEmpty } from '../../../../helpers/utils'
import { mapStateWithData } from '../../../../helpers/utils'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import useStyles from '../Programs.Style'
import EditSubjectSkeleton from './EditSubjectSkeleton'
function EditSubject({ editSubject, subject, formState }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const history = useHistory()

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
      title: t('breadcrumbAllSubjects'),
      href: ROUTES.SUBJECTS,
    },
    {
      title: t('breadcrumbEditSubject'),
      href: '',
    },
  ]

  const onSubmit = function (values, { setErrors }) {
    editSubject(subject.sub_id, values, { setErrors })
  }
  if (isEmpty(formState)) {
    return <EditSubjectSkeleton />
  }
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={mapStateWithData(subject, formState)}
      enableReinitialize={true}
      validationSchema={CoreSchema.addSubject}
    >
      {() => {
        return (
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
                    <Box component="span" fontWeight="700" fontSize="24px">
                      {t('editSubject')}
                    </Box>
                    <Box
                      ml={1}
                      component="span"
                      fontWeight="500"
                      fontSize="20px"
                      className="user-name"
                    >
                      ({formState.sub_name})
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
              <Box px={{ xs: 2, lg: 3 }} pt={{ xs: 2, lg: 3 }} pb={5}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={12} md={12}>
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
                          id="sub_district_id"
                          name="sub_district_id"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          pr={0}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:selectDistrictHelp')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:district')}) ({t('fields:required')}) (
                              {t('fields:selectDistrictHelp')})
                            </span>
                          }
                        />
                        <ErrorMessage name="sub_district_id">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:selectDistrict') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:school')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className={classes.selectIcon + ' custom-input-field'}
                          name="sub_school_id"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="sub_school_id"
                          value={formState.sub_school_id}
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
                              ({t('fields:school')}) ({t('fields:required')}) (
                              {t('fields:selectSchoolHelp')})
                            </span>
                          }
                        />
                        <ErrorMessage name="sub_school_id">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:selectSchool') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:subjectName')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="sub_name"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="sub_name"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:subjectNameHelp')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:subjectName')}) ({t('fields:required')}) (
                              {t('fields:subjectNameHelp')})
                            </span>
                          }
                        />
                        <ErrorMessage name="sub_name">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:subjectName') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:subjectCode')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="sub_code"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="sub_code"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:subjectCodeHelp')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:subjectCode')}) ({t('fields:required')}) (
                              {t('fields:subjectCodeHelp')})
                            </span>
                          }
                        />
                        <ErrorMessage name="sub_code">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:subjectCode') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                    </Grid>
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
EditSubject.propTypes = {
  editSubject: PropTypes.func,
  subject: PropTypes.object,
  formState: PropTypes.object,
}

EditSubject.defaultProps = {
  editSubject: () => {},
  subject: {},
  formState: {},
}

export default EditSubject
