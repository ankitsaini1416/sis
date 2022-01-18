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
import { HelpCircle, Info, Upload, X } from 'react-feather'
import { useTranslation } from 'react-i18next'

const initialState = {
  selectFile: '',
  fileName: '',
}

/**
 * Defines a component Upload Files
 * @param props
 * @returns {*}
 * @constructor
 */

function UploadFiles({ open, onClose }) {
  const { t } = useTranslation()
  /**
   * Render JSX of  Upload Files modal
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
      <Formik initialValues={initialState} onSubmit="">
        {({ setFieldValue }) => {
          return (
            <Form>
              <DialogTitle disableTypography id="customized-dialog-title" onClose={onClose}>
                <Box pt={1} display="flex" alignItems="center" justifyContent="space-between">
                  <Typography tabIndex={0} variant="h5">
                    <Box component="span" fontWeight="fontWeightBold">
                      {t('uploadFile')}
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
                <Box>
                  <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="600">
                      {t('fields:fileName')}
                    </Box>
                    <Box component="span" className="mandatory">
                      {t('fields:mandatory')}
                    </Box>
                  </Typography>
                  <Field
                    className="custom-input-field"
                    name="fileName"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    size="small"
                    id="fileName"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={t('fields:helpIconNameOfFile')} placement="top">
                            <HelpCircle className="help-icon" />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    label={
                      <span style={visuallyHidden}>
                        ({t('fields:fileName')}) ({t('fields:required')}) (
                        {t('fields:helpIconNameOfFile')})
                      </span>
                    }
                  />
                  <ErrorMessage name="fileName">
                    {(msg) => (
                      <span tabIndex={0} className="error">
                        {t(msg, { field: t('fields:fileName') })}
                      </span>
                    )}
                  </ErrorMessage>
                </Box>
                <Box mt={2}>
                  <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="600">
                      {t('fields:fileDescription')}
                    </Box>
                    <Box component="span" className="mandatory">
                      {t('fields:mandatory')}
                    </Box>
                  </Typography>
                  <Field
                    className="custom-input-field"
                    name="fileDescription"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    size="small"
                    id="fileDescription"
                    multiline
                    rows={3}
                    rowsMax={5}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={t('fields:fileDescriptionHelp')} placement="top">
                            <HelpCircle className="help-icon" />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    label={
                      <span style={visuallyHidden}>
                        ({t('fields:fileDescription')}) ({t('fields:required')}) (
                        {t('fields:fileDescriptionHelp')})
                      </span>
                    }
                  />
                  <ErrorMessage name="fileDescription">
                    {(msg) => (
                      <span tabIndex={0} className="error">
                        {t(msg, { field: t('fields:fileDescription') })}
                      </span>
                    )}
                  </ErrorMessage>
                </Box>
                <Box mt={2}>
                  <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="600">
                      {t('fields:uploadFile')}
                    </Box>
                    <Box component="span" className="mandatory">
                      {t('fields:mandatory')}
                    </Box>
                  </Typography>
                  <Field
                    className="custom-input-field uploadFiles"
                    fullWidth
                    as={TextField}
                    id="selectFile"
                    variant="outlined"
                    size="small"
                    placeholder={t('selectFile')}
                    type="file"
                    name="selectFile"
                    title=""
                    InputProps={{
                      endAdornment: (
                        <>
                          <Box clone mr={1} color="primary">
                            <Upload />
                          </Box>
                          <InputAdornment position="end">
                            <Tooltip title={t('fields:helpIconSelectFile')} placement="top">
                              <HelpCircle className="help-icon" />
                            </Tooltip>
                          </InputAdornment>
                        </>
                      ),
                    }}
                    onChange={(event) => {
                      setFieldValue('selectFile', event.currentTarget.files[0])
                    }}
                    label={
                      <span style={visuallyHidden}>
                        ({t('fields:uploadFile')}) ({t('fields:required')}) (
                        {t('fields:helpIconSelectFile')})
                      </span>
                    }
                  />
                  <ErrorMessage name="selectFile">
                    {(msg) => (
                      <span tabIndex={0} className="error">
                        {t(msg, { field: t('fields:selectFile') })}
                      </span>
                    )}
                  </ErrorMessage>
                </Box>
                <Box
                  mt={1}
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  tabIndex={0}
                >
                  <Box mr={1} component="span">
                    <Info width={20} height={20} className="icon-color-light" />
                  </Box>
                  <Typography variant="body2" component="span" color="textSecondary">
                    {t('fileAllowedSize')}
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  className="custom-default-button text-transform-none"
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
            </Form>
          )
        }}
      </Formik>
    </Dialog>
  )
}

UploadFiles.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
}
UploadFiles.defaultProps = {
  open: false,
  onClose: () => {},
}
/**
 /**
 * Upload Files modal component
 */
export default UploadFiles
