import {
  Box,
  Button,
  Grid,
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

import { CoreSchema } from '../../../../../clientFiles/validations'
import useStyles from '../Enrollment.Style'

const initialState = {
  points: '',
  reason: '',
}

function AddMoney({ open, onClose, addWalletPoints }) {
  const { t } = useTranslation()
  const classes = useStyles()

  const onSubmit = (values, { setErrors }) => {
    addWalletPoints(values, {
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
      tabIndex={-1}
    >
      <Formik
        onSubmit={onSubmit}
        initialValues={initialState}
        enableReinitialize={true}
        validationSchema={CoreSchema.addWalletMoney}
      >
        {() => {
          return (
            <Form className={classes.form} noValidate autoComplete="off">
              <DialogTitle disableTypography id="customized-dialog-title" onClose={onClose}>
                <Box pt={1} display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h5" tabIndex={0}>
                    <Box component="span" fontWeight="fontWeightBold">
                      {t('addMoneyToWallet')}
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
                          {t('fields:amount')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        className="custom-input-field"
                        name="points"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        type="number"
                        id="points"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:amountHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:amount')}) ({t('fields:required')}) (
                            {t('fields:amountHelp')})
                          </span>
                        }
                      />
                      <ErrorMessage name="points">
                        {(msg) => (
                          <span tabIndex={0} className="error">
                            {t(msg, { field: t('fields:amount') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:addMoneyReason')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:optional')}
                        </Box>
                      </Typography>
                      <Field
                        className="custom-input-field"
                        name="reason"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                        size="small"
                        id="reason"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:addMoneyReasonHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:addMoneyReason')}) ({t('fields:optional')}) (
                            {t('fields:addMoneyReasonHelp')})
                          </span>
                        }
                      />
                      <ErrorMessage name="reason">
                        {(msg) => (
                          <span tabIndex={0} className="error">
                            {t(msg, { field: t('fields:addMoneyReason') })}
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

AddMoney.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  addWalletPoints: PropTypes.func,
}

AddMoney.defaultProps = {
  open: false,
  onClose: () => {},
  addWalletPoints: () => {},
}

export default AddMoney
