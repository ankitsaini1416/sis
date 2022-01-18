import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { Check, HelpCircle, X } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { CoreSchema } from '../../../../../clientFiles/validations'
import useStyles from '../Enrollment.Style'

const mapStateWithData = function (initialState, data) {
  const state = {
    enc_received_grade: data.enc_received_grade || initialState.enc_received_grade,
  }
  return state
}

const initialState = {
  enc_received_grade: '',
}
function EditReceivedGrade({ open, onClose, editCourseDetails, courseItem }) {
  const { t } = useTranslation()
  const classes = useStyles()

  const onSubmit = (values) => {
    editCourseDetails(values, { callback: onClose })
  }

  return (
    <Dialog
      paper
      className="custom-dialog"
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle disableTypography id="customized-dialog-title" onClose={onClose}>
        <Box pt={1} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">
            <Box component="span" fontWeight="fontWeightBold">
              {t('editReceivedGrade')}
            </Box>
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box pb={2}>
          <Formik
            onSubmit={onSubmit}
            initialValues={mapStateWithData(courseItem, initialState)}
            enableReinitialize={true}
            validationSchema={CoreSchema.editReceivedGrade}
          >
            {({ submitForm }) => {
              return (
                <Form className={classes.form} noValidate autoComplete="off">
                  <Grid container>
                    <Grid item xs={12} sm={8}>
                      <Field
                        className={classes.selectIcon + ' custom-input-field'}
                        name="enc_received_grade"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="enc_received_grade"
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:receivedGradeHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>({t('fields:receivedGradeHelp')})</span>
                        }
                      />
                      <ErrorMessage name="enc_received_grade">
                        {(msg) => (
                          <span tabIndex={0} className="error">
                            {t(msg, { field: t('fields:receivedGrade') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} sm="auto">
                      <Box
                        mt={{ xs: 2, sm: 0.2 }}
                        ml={{ xs: 0, sm: 2 }}
                        display="flex"
                        alignItems="flex-start"
                        justifyContent="flex-start"
                        flexDirection="row"
                      >
                        <Tooltip title={t('save')}>
                          <IconButton
                            disableElevation
                            color="primary"
                            className="icon-button-primary"
                            onClick={submitForm}
                          >
                            <Check width={16} height={16} />
                          </IconButton>
                        </Tooltip>
                        <Box ml={1}>
                          <Tooltip title={t('cancel')}>
                            <IconButton
                              className="icon-button-secondary"
                              disableElevation
                              color="secondary"
                              onClick={onClose}
                            >
                              <X width={16} height={16} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Form>
              )
            }}
          </Formik>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

EditReceivedGrade.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  editCourseDetails: PropTypes.func,
  courseItem: PropTypes.object,
}

EditReceivedGrade.defaultProps = {
  open: false,
  onClose: () => {},
  editCourseDetails: () => {},
  courseItem: {},
}

export default EditReceivedGrade
