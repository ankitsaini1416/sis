import { Box, Button, Grid, IconButton, TextField, Tooltip, Typography } from '@material-ui/core'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { Check, Edit2, Plus, Trash, X } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'

import { CoreSchema } from '../../../../../../clientFiles/validations'
import { get, isEmpty } from '../../../../../helpers/utils'
import ConfirmBox from '../../../../common/ConfirmBox'
import useStyles from '../../../programs/Programs.Style'

function GradeScale({ addGradeScale, gradeScale }) {
  const classes = useStyles()
  const { t } = useTranslation()

  const [openDeletePopup, setOpenDeletePopup] = React.useState('')

  const toggleDeletePopup = function (event) {
    if (!openDeletePopup) {
      const id = event.currentTarget.attributes['data-id'].value
      setOpenDeletePopup(id)
    } else {
      setOpenDeletePopup('')
    }
  }

  const onSubmit = function (values) {
    addGradeScale(values.state)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={11} md={11} xl={10}>
        <Formik
          initialValues={{ state: gradeScale }}
          onSubmit={onSubmit}
          enableReinitialize={true}
          validationSchema={CoreSchema.addUpdateGradeScales}
        >
          {({ setFieldValue, values, resetForm, errors }) => (
            <Form className={classes.form} noValidate autoComplete="off">
              <Box mb={2}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={12} sm="auto">
                    <Typography component="" align="left" variant="body2" gutterBottom tabIndex={0}>
                      <Box component="span" fontWeight="600" fontSize="16px">
                        {t('gradeScale')}
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
                        type="submit"
                      >
                        {t('submit')}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              {values.state.map((data, index) => {
                return (
                  <>
                    <Box
                      mt={{ xs: 2, sm: 2, md: 2, lg: 0, xl: 0 }}
                      px={3}
                      py={2}
                      position="relative"
                      className="grade-scale"
                      hover
                      key={data.gr_id}
                      mb={2}
                    >
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={4} md={4} lg={2}>
                          <Box mb={{ xs: 2, lg: 0 }}>
                            <Typography
                              component="h6"
                              align="left"
                              variant="h6"
                              color="textPrimary"
                            >
                              <Box component="span" fontWeight="600" fontSize="14px">
                                {t('gradeName')}
                              </Box>
                            </Typography>

                            <Typography
                              component="h6"
                              align="left"
                              variant="subtitle2"
                              color="textPrimary"
                              gutterBottom
                            >
                              {data.isEdit ? (
                                <>
                                  <Field
                                    className="custom-input-field"
                                    as={TextField}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    id={`state[${index}].gr_name`}
                                    name={`state[${index}].gr_name`}
                                    label={
                                      <span style={visuallyHidden}>
                                        ({t('gradeName')}) ({t('fields:gradeNameHelp')})
                                      </span>
                                    }
                                  />

                                  <ErrorMessage name={`state[${index}].gr_name`}>
                                    {(msg) => (
                                      <span className="error" tabIndex={0}>
                                        {t(msg, { field: t('fields:gradeName') })}
                                      </span>
                                    )}
                                  </ErrorMessage>
                                </>
                              ) : (
                                <Box
                                  className="break-word"
                                  component="span"
                                  fontWeight="fontWeightRegular"
                                  fontSize="16px"
                                  tabIndex={0}
                                >
                                  {data.gr_name}
                                </Box>
                              )}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={2}>
                          <Box mb={{ xs: 2, lg: 0 }}>
                            <Typography
                              component="h6"
                              align="left"
                              variant="h6"
                              color="textPrimary"
                            >
                              <Box component="span" fontWeight="600" fontSize="14px">
                                {t('performance')}
                              </Box>
                            </Typography>

                            <Typography
                              component="h6"
                              align="left"
                              variant="subtitle2"
                              color="textPrimary"
                              gutterBottom
                            >
                              {data.isEdit ? (
                                <>
                                  <Field
                                    className="custom-input-field"
                                    as={TextField}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    id={`state[${index}].gr_label`}
                                    name={`state[${index}].gr_label`}
                                    label={
                                      <span style={visuallyHidden}>
                                        ({t('performance')}) ({t('fields:performanceHelp')})
                                      </span>
                                    }
                                  />{' '}
                                  <ErrorMessage name={`state[${index}].gr_label`}>
                                    {(msg) => (
                                      <span className="error" tabIndex={0}>
                                        {t(msg, { field: t('fields:performance') })}
                                      </span>
                                    )}
                                  </ErrorMessage>
                                </>
                              ) : (
                                <Box
                                  className="break-word"
                                  component="span"
                                  fontWeight="fontWeightRegular"
                                  fontSize="16px"
                                  tabIndex={0}
                                >
                                  {data.gr_label}
                                </Box>
                              )}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={3}>
                          <Box mb={{ xs: 2, lg: 0 }}>
                            <Typography
                              component="h6"
                              align="left"
                              variant="h6"
                              color="textPrimary"
                            >
                              <Box component="span" fontWeight="600" fontSize="14px">
                                {t('gradeRange')}
                              </Box>
                            </Typography>

                            <Typography
                              component="h6"
                              align="left"
                              variant="subtitle2"
                              color="textPrimary"
                            >
                              {data.isEdit ? (
                                <Box display="flex" alignItems="center">
                                  <Box mr={2}>
                                    <Field
                                      className="custom-input-field"
                                      as={TextField}
                                      variant="outlined"
                                      fullWidth
                                      size="small"
                                      type="number"
                                      id={`state[${index}].gr_lower_limit`}
                                      name={`state[${index}].gr_lower_limit`}
                                      label={
                                        <span style={visuallyHidden}>
                                          ({t('gradeRangeTo')}) ({t('fields:gradeRangeFromHelp')})
                                        </span>
                                      }
                                    />
                                    <ErrorMessage name={`state[${index}].gr_lower_limit`}>
                                      {(msg) => (
                                        <span className="error" tabIndex={0}>
                                          {t(msg, { field: t('fields:minRange') })}
                                        </span>
                                      )}
                                    </ErrorMessage>
                                  </Box>
                                  <Typography
                                    component="h6"
                                    align="left"
                                    variant="h6"
                                    color="textPrimary"
                                  >
                                    <Box component="span" fontWeight="600" fontSize="14px">
                                      {t('to')}
                                    </Box>
                                  </Typography>
                                  <Box ml={2}>
                                    <Field
                                      className="custom-input-field"
                                      as={TextField}
                                      variant="outlined"
                                      fullWidth
                                      size="small"
                                      type="number"
                                      disabled={index !== 0}
                                      id={`state[${index}].gr_upper_limit`}
                                      name={`state[${index}].gr_upper_limit`}
                                      label={
                                        <span style={visuallyHidden}>
                                          ({t('gradeRangeTo')}) ({t('fields:gradeRangeToHelp')})
                                        </span>
                                      }
                                    />
                                    <ErrorMessage name={`state[${index}].gr_upper_limit`}>
                                      {(msg) => (
                                        <span className="error" tabIndex={0}>
                                          {t(msg, { field: t('fields:maxRange') })}
                                        </span>
                                      )}
                                    </ErrorMessage>
                                  </Box>
                                </Box>
                              ) : (
                                <Box
                                  className="break-word"
                                  component="span"
                                  fontWeight="fontWeightRegular"
                                  fontSize="16px"
                                  tabIndex={0}
                                >
                                  {data.gr_lower_limit &&
                                    `${data.gr_lower_limit} to 
                                  ${data.gr_upper_limit}`}
                                </Box>
                              )}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={2}>
                          <Box mb={{ xs: 2, lg: 0 }}>
                            <Typography
                              component="h6"
                              align="left"
                              variant="h6"
                              color="textPrimary"
                            >
                              <Box component="span" fontWeight="600" fontSize="14px">
                                {t('regular')}
                              </Box>
                            </Typography>

                            <Typography
                              component="h6"
                              align="left"
                              variant="subtitle2"
                              color="textPrimary"
                              gutterBottom
                            >
                              {data.isEdit ? (
                                <>
                                  <Field
                                    className="custom-input-field"
                                    as={TextField}
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    size="small"
                                    id={`state[${index}].gr_regular`}
                                    name={`state[${index}].gr_regular`}
                                    label={
                                      <span style={visuallyHidden}>
                                        ({t('regular')}) ({t('fields:regularHelp')})
                                      </span>
                                    }
                                  />
                                  <ErrorMessage name={`state[${index}].gr_regular`}>
                                    {(msg) => (
                                      <span className="error" tabIndex={0}>
                                        {t(msg, { field: t('fields:regular') })}
                                      </span>
                                    )}
                                  </ErrorMessage>
                                </>
                              ) : (
                                <Box
                                  className="break-word"
                                  component="span"
                                  fontWeight="fontWeightRegular"
                                  fontSize="16px"
                                  tabIndex={0}
                                >
                                  {data.gr_regular}
                                </Box>
                              )}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={2}>
                          <Box mb={{ xs: 2, lg: 0 }}>
                            <Typography
                              component="h6"
                              align="left"
                              variant="h6"
                              color="textPrimary"
                            >
                              <Box component="span" fontWeight="600" fontSize="14px">
                                {t('honours')}
                              </Box>
                            </Typography>

                            <Typography
                              component="h6"
                              align="left"
                              variant="subtitle2"
                              color="textPrimary"
                              gutterBottom
                            >
                              {data.isEdit ? (
                                <>
                                  <Field
                                    className="custom-input-field"
                                    as={TextField}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    type="number"
                                    id={`state[${index}].gr_honours`}
                                    name={`state[${index}].gr_honours`}
                                    label={
                                      <span style={visuallyHidden}>
                                        ({t('honours')}) ({t('fields:honoursHelp')})
                                      </span>
                                    }
                                  />
                                  <ErrorMessage name={`state[${index}].gr_honours`}>
                                    {(msg) => (
                                      <span className="error" tabIndex={0}>
                                        {t(msg, { field: t('fields:honours') })}
                                      </span>
                                    )}
                                  </ErrorMessage>
                                </>
                              ) : (
                                <Box
                                  className="break-word"
                                  component="span"
                                  fontWeight="fontWeightRegular"
                                  fontSize="16px"
                                  tabIndex={0}
                                >
                                  {data.gr_honours}
                                </Box>
                              )}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={1}>
                          <Box mb={{ xs: 2, lg: 0 }}>
                            <Typography
                              component="h6"
                              align="left"
                              variant="h6"
                              color="textPrimary"
                            >
                              <Box component="span" fontWeight="600" fontSize="14px">
                                {t('apde')}
                              </Box>
                            </Typography>
                            <Typography
                              component="h6"
                              align="left"
                              variant="subtitle2"
                              color="textPrimary"
                              gutterBottom
                            >
                              {data.isEdit ? (
                                <>
                                  <Field
                                    className="custom-input-field"
                                    as={TextField}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    type="number"
                                    id={`state[${index}].gr_ap_de`}
                                    name={`state[${index}].gr_ap_de`}
                                    label={
                                      <span style={visuallyHidden}>
                                        ({t('apde')}) ({t('fields:apdeHelp')})
                                      </span>
                                    }
                                  />
                                  <ErrorMessage name={`state[${index}].gr_ap_de`}>
                                    {(msg) => (
                                      <span className="error" tabIndex={0}>
                                        {t(msg, { field: t('fields:apde') })}
                                      </span>
                                    )}
                                  </ErrorMessage>
                                </>
                              ) : (
                                <Box
                                  className="break-word"
                                  component="span"
                                  fontWeight="fontWeightRegular"
                                  fontSize="16px"
                                  tabIndex={0}
                                >
                                  {data.gr_ap_de}
                                </Box>
                              )}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      {data.isEdit ? (
                        <Box
                          mt={{ xs: 1, sm: 1.5, md: 0, lg: 0, xl: 0 }}
                          display="flex"
                          alignItems={{ xs: 'flex-start', sm: 'center' }}
                          justifyContent={{ xs: 'flex-start', sm: 'center' }}
                          flexDirection={{ xs: 'row', sm: 'column' }}
                          height="100%"
                          className="certificate-edit"
                        >
                          <Tooltip title={t('save')}>
                            <IconButton
                              aria-label={t('save')}
                              disableElevation
                              color="primary"
                              className="icon-button-primary"
                              disabled={
                                !isEmpty((errors.state || [])[index]) ||
                                !get(values, `state[${index}].gr_name`, '')
                              }
                              onClick={() => {
                                CoreSchema.addUpdateGradeScales.val
                                setFieldValue(
                                  'state',
                                  values.state.map((item) => {
                                    if (item.gr_id === data.gr_id) {
                                      return {
                                        ...data,
                                        isEdit: false,
                                      }
                                    }
                                    return item
                                  })
                                )
                              }}
                            >
                              <Check width={12} height={12} />
                            </IconButton>
                          </Tooltip>
                          <Box ml={{ xs: 1, sm: 0 }} mt={{ xs: 0, sm: 1 }}>
                            <Tooltip title={t('remove')}>
                              <IconButton
                                aria-label={t('remove')}
                                className="icon-button-secondary"
                                disableElevation
                                color="secondary"
                                onClick={() => {
                                  resetForm()
                                  setFieldValue(
                                    'state',
                                    values.state.map((item) => {
                                      if (item.gr_id === data.gr_id) {
                                        return {
                                          ...item,
                                          ...(gradeScale.find(
                                            (grade) => grade.gr_id === item.gr_id
                                          ) || {}),
                                          isEdit: false,
                                        }
                                      }
                                      return item
                                    })
                                  )
                                }}
                              >
                                <X width={12} height={12} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                      ) : (
                        <Box
                          mt={{ xs: 1, sm: 0 }}
                          display="flex"
                          alignItems={{ xs: 'flex-start', sm: 'center' }}
                          justifyContent={{ xs: 'flex-start', sm: 'center' }}
                          flexDirection={{ xs: 'row', sm: 'column' }}
                          className="certificate-edit"
                          height="100%"
                        >
                          <Tooltip title={t('edit')}>
                            <IconButton
                              aria-label={t('edit')}
                              color="primary"
                              className="icon-button-primary"
                              onClick={() => {
                                setFieldValue(
                                  'state',
                                  values.state.map((item) => {
                                    if (data.gr_id === item.gr_id) {
                                      return {
                                        ...item,
                                        isEdit: true,
                                      }
                                    }
                                    return item
                                  })
                                )
                              }}
                            >
                              <Edit2 width={12} height={12} />
                            </IconButton>
                          </Tooltip>
                          <Box ml={{ xs: 1, sm: 0 }} mt={{ xs: 0, sm: 1 }}>
                            <Tooltip title={t('delete')}>
                              <IconButton
                                aria-label={t('delete')}
                                className="icon-button-secondary"
                                disableElevation
                                color="secondary"
                                data-id={data.gr_id}
                                onClick={(e) => {
                                  toggleDeletePopup(e)
                                }}
                                disabled={index === 0}
                              >
                                <Trash width="12px" height="12px" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </>
                )
              })}
              <Box width="100%" display="flex" alignItems="flex-end" justifyContent="flex-end">
                <Button
                  className="text-transform-none"
                  color="primary"
                  disableElevation
                  data-id={1}
                  onClick={() => {
                    setFieldValue('state', [
                      ...values.state,
                      {
                        gr_name: '',
                        gr_label: '',
                        gr_lower_limit: '',
                        gr_upper_limit: values.state[values.state.length - 1].gr_lower_limit,
                        gr_regular: '',
                        gr_honours: '',
                        gr_ap_de: '',
                        isEdit: true,
                        gr_id: uuid(),
                      },
                    ])
                  }}
                  disabled={values.state[values.state.length - 1]?.isEdit === true}
                  startIcon={<Plus width={16} height={16} />}
                >
                  {t('addMore')}
                </Button>
              </Box>
              <ConfirmBox
                maxWidth="xs"
                open={!!openDeletePopup}
                close={toggleDeletePopup}
                onConfirm={() => {
                  setFieldValue(
                    'state',
                    values.state.filter((item) => item.gr_id !== openDeletePopup)
                  )
                  toggleDeletePopup()
                }}
                defaultProps={{ message: 'archiveConfirmation', buttonText: 'delete' }}
              />
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  )
}
GradeScale.propTypes = {
  addGradeScale: PropTypes.func,
  gradeScale: PropTypes.func,
}

GradeScale.defaultProps = {
  addGradeScale: () => {},
  gradeScale: () => {},
}
export default GradeScale
