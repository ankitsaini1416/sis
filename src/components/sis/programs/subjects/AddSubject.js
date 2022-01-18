import {
  Box,
  Button,
  FormControl,
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
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { HelpCircle, X } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { CoreSchema } from '../../../../../clientFiles/validations'
import useStyles from '../Programs.Style'
import FormikAutoComplete from './../../../common/formikComponents/FormikAutoComplete'

const initialState = {
  sub_district_id: '',
  sub_name: '',
  sub_code: '',
  sub_school_id: '',
}

function AddSubject({ open, onClose, createSubject, districts, schools, fetchSchool }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const districtCode = useRef('')
  const onSubmit = function (values, { setErrors }) {
    createSubject(values, {
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
      maxWidth="sm"
    >
      <Formik
        onSubmit={onSubmit}
        initialValues={initialState}
        enableReinitialize={true}
        validationSchema={CoreSchema.addSubject}
      >
        {({ values, setFieldValue }) => {
          if (values.sub_district_id !== districtCode.current) {
            fetchSchool(values.sub_district_id)
            districtCode.current = values.sub_district_id
          }
          return (
            <Form className={classes.form} noValidate autoComplete="off">
              <DialogTitle disableTypography id="customized-dialog-title" onClose={onClose}>
                <Box pt={1} display="flex" alignItems="center" justifyContent="space-between">
                  <Typography tabIndex={0} variant="h5">
                    <Box component="span" fontWeight="fontWeightBold">
                      {t('addNewSubject')}
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
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:selectDistrict')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        className={classes.selectIcon + ' custom-input-field'}
                        id="sub_district_id"
                        name="sub_district_id"
                        options={districts}
                        component={FormikAutoComplete}
                        nameKey="dst_name"
                        valueKey="dst_id"
                        optionId="dst_id"
                        variant="outlined"
                        fullWidth
                        size="small"
                        select
                        pr={0}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton>
                              <Tooltip title={t('fields:helpIconDistrict')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </IconButton>
                          </InputAdornment>
                        }
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:selectDistrict')}) ({t('fields:required')}) (
                            {t('fields:helpIconDistrict')})
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
                          {t('fields:selectSchool')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <FormControl size="small" variant="outlined" fullWidth>
                        <InputLabel style={visuallyHidden} id="select-school-label">
                          ({t('fields:selectSchool')}) ({t('fields:required')}) (
                          {t('fields:helpIconSelectSchool')})
                        </InputLabel>
                        <Select
                          labelId="select-school-label"
                          className={classes.selectIcon + ' custom-input-field custom-select-field'}
                          fullWidth
                          size="small"
                          value={values.sub_school_id}
                          name="sub_school_id"
                          id="sub_school_id"
                          onChange={(e) => {
                            setFieldValue('sub_school_id', e.target.value)
                          }}
                          limitTags={2}
                          endAdornment={
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:helpIconSelectSchool')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          }
                        >
                          {schools.map((school) => (
                            <MenuItem key={school.sch_id} value={school.sch_id}>
                              {school.sch_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
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

AddSubject.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  createSubject: PropTypes.func,
  districts: PropTypes.array,
  schools: PropTypes.array,
  fetchSchool: PropTypes.func,
}

AddSubject.defaultProps = {
  open: false,
  onClose: () => {},
  createSubject: () => {},
  districts: [],
  schools: [],
  fetchSchool: () => {},
}

export default AddSubject
