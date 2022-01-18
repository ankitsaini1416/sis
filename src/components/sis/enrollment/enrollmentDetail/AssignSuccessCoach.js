import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
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

import { getFullName } from '../../../../helpers/utils'
import useStyles from '../Enrollment.Style'

const initialState = {
  sc_identifier: '',
}

function AssignSuccessCoach({ open, onClose, allCoaches, assignSuccessCoach }) {
  const { t } = useTranslation()
  const classes = useStyles()

  const onSubmit = function (values, { setErrors }) {
    assignSuccessCoach(values, {
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
      <Formik onSubmit={onSubmit} initialValues={initialState} enableReinitialize={true}>
        {() => {
          return (
            <Form className={classes.form} noValidate autoComplete="off">
              <DialogTitle disableTypography id="customized-dialog-title" onClose={onClose}>
                <Box pt={1} display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h5" tabIndex={0}>
                    <Box component="span" fontWeight="fontWeightBold">
                      {t('assignSuccessCoach')}
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
                          {t('fields:successCoach')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        className={classes.selectIcon + ' custom-input-field'}
                        name="sc_identifier"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="sc_identifier"
                        select
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:successCoachHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:successCoach')}) ({t('fields:required')}) (
                            {t('fields:successCoachHelp')})
                          </span>
                        }
                      >
                        {allCoaches.map((row) => (
                          <MenuItem key={row.id} value={row.id}>
                            {`${getFullName(row)} (${row.username})`}
                          </MenuItem>
                        ))}
                      </Field>
                      <ErrorMessage name="enr_success_coach">
                        {(msg) => (
                          <span tabIndex={0} className="error">
                            {t(msg, { field: t('fields:successCoach') })}
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
                  {t('assignCoach')}
                </Button>
              </DialogActions>
            </Form>
          )
        }}
      </Formik>
    </Dialog>
  )
}

AssignSuccessCoach.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  allCoaches: PropTypes.array,
  assignSuccessCoach: PropTypes.func,
}

AssignSuccessCoach.defaultProps = {
  open: false,
  onClose: () => {},
  allCoaches: [],
  assignSuccessCoach: () => {},
}

export default AssignSuccessCoach
