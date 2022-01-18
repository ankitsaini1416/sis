// @ts-nocheck

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

const initialState = {
  name: '',
}

/**
 * Defines a component Add Dashboard
 * @param props
 * @returns {*}
 * @constructor
 */

function AddDashboard({ open, onClose, addDashboard }) {
  const { t } = useTranslation()

  const onSubmit = (values, { setErrors }) => {
    addDashboard(values, { setErrors, callback: onClose })
  }

  /**
   * Render JSX of  Add dashboard modal
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
      <Formik initialValues={initialState} onSubmit={onSubmit}>
        {() => {
          return (
            <Form>
              <DialogTitle disableTypography id="customized-dialog-title" onClose={onClose}>
                <Box pt={1} display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h5" tabIndex={0}>
                    <Box component="span" fontWeight="fontWeightBold">
                      {t('addDashboard')}
                    </Box>
                  </Typography>
                  {onClose ? (
                    <IconButton aria-label="close" className="close-button" onClick={onClose}>
                      <X />
                    </IconButton>
                  ) : null}
                </Box>
              </DialogTitle>
              <DialogContent>
                <Box>
                  <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="600">
                      {t('fields:name')}
                    </Box>
                    <Box component="span" className="mandatory">
                      {t('fields:mandatory')}
                    </Box>
                  </Typography>
                  <Field
                    className="custom-input-field"
                    name="name"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    size="small"
                    id="name"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={t('fields:helpIconName')} placement="top">
                            <HelpCircle className="help-icon" />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    label={
                      <span style={visuallyHidden}>
                        {t('fields:name')} ({t('fields:mandatory')}) ({t('fields:helpIconName')}
                      </span>
                    }
                  />
                  <ErrorMessage name="name">
                    {(msg) => (
                      <span className="error" tabIndex={0}>
                        {t(msg, { field: t('fields:name') })}
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
                  autoFocus
                  color="primary"
                  variant="contained"
                  size="large"
                  disableElevation
                  type="submit"
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

AddDashboard.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  addDashboard: PropTypes.func,
}
AddDashboard.defaultProps = {
  open: false,
  onClose: () => {},
  addDashboard: () => {},
}
/**
 /**
 * Add Dashboard modal component
 */
export default AddDashboard
