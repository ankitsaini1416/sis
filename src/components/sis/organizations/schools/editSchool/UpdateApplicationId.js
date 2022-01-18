import {
  Box,
  Button,
  IconButton,
  InputAdornment,
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
import React from 'react'
import { HelpCircle, X } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { CoreSchema } from './../../../../../../clientFiles/validations'
import { mapWithState } from './../../../../../helpers/utils'

const initialState = {
  application_email: '',
  application_name: '',
}

/**
 * Defines a component Add Payment Method
 * @param props
 * @returns {*}
 * @constructor
 */

function UpdateApplicationID({ callback, content, open, onClose, paymentIdSetting }) {
  const { t } = useTranslation()
  const initialValues =
    content.type === 'ADD' ? initialState : mapWithState(initialState, paymentIdSetting)
  const onSubmit = (values, { setErrors }) => {
    callback(values, {
      setErrors,
      callback: () => {
        onClose()
      },
    })
  }
  /**
   * Render JSX of Add Payment Method modal
   */
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
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={CoreSchema.paymentAppIdForm}
      >
        {() => {
          return (
            <Form>
              <DialogTitle disableTypography id="customized-dialog-title" onClose={onClose}>
                <Box pt={1} display="flex" alignItems="center" justifyContent="space-between">
                  <Typography tabIndex={0} variant="h5">
                    <Box component="span" fontWeight="fontWeightBold">
                      {content.title}
                    </Box>
                  </Typography>
                  <IconButton
                    tabIndex={-1}
                    aria-label="close"
                    className="close-button"
                    onClick={onClose}
                  >
                    <X />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent>
                {content.type === 'EDIT' && (
                  <>
                    <Box mb={2}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:paymentApplicationID')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <TextField
                        className="custom-input-field"
                        name="paymentID"
                        variant="outlined"
                        fullWidth
                        size="small"
                        readOnly
                        disabled
                        value={paymentIdSetting.app_id}
                        id="paymentID"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:paymentApplicationIDHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:paymentApplicationID')}) ({t('fields:optional')}) (
                            {t('fields:paymentApplicationIDHelp')})
                          </span>
                        }
                      />
                    </Box>
                  </>
                )}
                <Box mb={2}>
                  <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="600">
                      {t('fields:applicationName')}
                    </Box>
                    <Box component="span" className="mandatory">
                      {t('fields:mandatory')}
                    </Box>
                  </Typography>
                  <Field
                    className="custom-input-field"
                    name="application_name"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    size="small"
                    id="application_name"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={t('fields:applicationNameHelp')} placement="top">
                            <HelpCircle className="help-icon" />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    label={
                      <span style={visuallyHidden}>
                        ({t('fields:applicationName')}) ({t('fields:required')}) (
                        {t('fields:applicationNameHelp')})
                      </span>
                    }
                  />
                  <ErrorMessage name="application_name">
                    {(msg) => (
                      <span className="error">
                        {t(msg, { field: t('fields:applicationName') })}
                      </span>
                    )}
                  </ErrorMessage>
                </Box>
                <Box mb={2}>
                  <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="600">
                      {t('fields:applicationEmail')}
                    </Box>
                    <Box component="span" className="mandatory">
                      {t('fields:mandatory')}
                    </Box>
                  </Typography>
                  <Field
                    className="custom-input-field"
                    name="application_email"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    size="small"
                    id="application_email"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={t('fields:applicationEmailHelp')} placement="top">
                            <HelpCircle className="help-icon" />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    label={
                      <span style={visuallyHidden}>
                        ({t('fields:applicationEmail')}) ({t('fields:required')}) (
                        {t('fields:applicationEmailHelp')})
                      </span>
                    }
                  />
                  <ErrorMessage name="application_email">
                    {(msg) => (
                      <span className="error">
                        {t(msg, { field: t('field:applicationEmail') })}
                      </span>
                    )}
                  </ErrorMessage>
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
                  color="primary"
                  variant="contained"
                  size="large"
                  disableElevation
                  type="submit"
                >
                  {content.button_text}
                </Button>
              </DialogActions>
            </Form>
          )
        }}
      </Formik>
    </Dialog>
  )
}

UpdateApplicationID.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  content: PropTypes.object,
  callback: PropTypes.func,
  paymentIdSetting: PropTypes.object,
}
UpdateApplicationID.defaultProps = {
  open: false,
  onClose: () => {},
  content: {},
  callback: () => {},
  paymentIdSetting: {},
}
/**
 /**
 * Add Payment Method modal component
 */
export default UpdateApplicationID
