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
import { Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { HelpCircle, X } from 'react-feather'
import { useTranslation } from 'react-i18next'

const initialState = {
  instanceURL: '',
  toolSharedSecret: '',
  registrationPassword: '',
}

/**
 * Defines a component LMS Setup
 * @param props
 * @returns {*}
 * @constructor
 */

function LMSSetup({ open, onClose }) {
  const { t } = useTranslation()
  /**
   * Render JSX of  LMS SETUP modal
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
      <DialogTitle disableTypography id="customized-dialog-title" onClose={onClose}>
        <Box pt={1} display="flex" alignItems="center" justifyContent="space-between">
          <Typography tabIndex={0} variant="h5">
            <Box component="span" fontWeight="fontWeightBold">
              {t('lmsSetup')}
            </Box>
          </Typography>
          {onClose ? (
            <IconButton tabIndex={-1} className="close-button" onClick={onClose}>
              <X />
            </IconButton>
          ) : null}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Formik initialValues={initialState} onSubmit="">
          {() => {
            return (
              <Form>
                <Box mb={2}>
                  <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="600">
                      {t('fields:instanceURL')}
                    </Box>
                    <Box component="span" className="optional">
                      ({t('fields:optional')})
                    </Box>
                  </Typography>
                  <Field
                    className="custom-input-field"
                    name="instanceURL"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    size="small"
                    id="instanceURL"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={t('fields:instanceURLHelp')} placement="top">
                            <HelpCircle className="help-icon" />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    label={
                      <span style={visuallyHidden}>
                        ({t('fields:instanceURL')}) ({t('fields:optional')}) (
                        {t('fields:instanceURLHelp')})
                      </span>
                    }
                  />
                </Box>
                <Box mb={2}>
                  <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="600">
                      {t('fields:toolSharedSecret')}
                    </Box>
                    <Box component="span" className="optional">
                      ({t('fields:optional')})
                    </Box>
                  </Typography>
                  <Field
                    className="custom-input-field"
                    name="toolSharedSecret"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    size="small"
                    id="toolSharedSecret"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={t('fields:toolSharedSecretHelp')} placement="top">
                            <HelpCircle className="help-icon" />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    label={
                      <span style={visuallyHidden}>
                        ({t('fields:toolSharedSecret')}) ({t('fields:optional')}) (
                        {t('fields:toolSharedSecretHelp')})
                      </span>
                    }
                  />
                </Box>
                <Box>
                  <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="600">
                      {t('fields:toolRegistrationPassword')}
                    </Box>
                    <Box component="span" className="optional">
                      ({t('fields:optional')})
                    </Box>
                  </Typography>
                  <Field
                    className="custom-input-field"
                    name="registrationPassword"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    size="small"
                    id="registrationPassword"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={t('fields:toolRegistrationPasswordHelp')} placement="top">
                            <HelpCircle className="help-icon" />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    label={
                      <span style={visuallyHidden}>
                        ({t('fields:toolRegistrationPassword')}) ({t('fields:optional')}) (
                        {t('fields:toolRegistrationPasswordHelp')})
                      </span>
                    }
                  />
                </Box>
              </Form>
            )
          }}
        </Formik>
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
          onClick={onClose}
          color="primary"
          variant="contained"
          size="large"
          disableElevation
        >
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

LMSSetup.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
}
LMSSetup.defaultProps = {
  open: false,
  onClose: () => {},
}
/**
 /**
 * LMS Setup modal component
 */
export default LMSSetup
