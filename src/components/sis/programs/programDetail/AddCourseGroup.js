import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
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
import { withStyles } from '@material-ui/core/styles'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { Check, HelpCircle, X } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { CoreSchema } from '../../../../../clientFiles/validations'
import useStyles from '../Programs.Style'

const mapStateWithData = function (initialState, data) {
  const state = {
    cg_course_group_name: data.cg_course_group_name || initialState.cg_course_group_name,
    cg_rule_type: data.cg_rule_type || initialState.cg_rule_type,
    cg_rule_value: data.cg_rule_value || initialState.cg_rule_value,
    cg_is_active: data.cg_is_active || initialState.cg_is_active,
  }
  return state
}

const initialState = {
  cg_course_group_name: '',
  cg_rule_type: '',
  cg_rule_value: 0,
  cg_is_active: false,
}

const CheckboxWithGreenCheck = withStyles({})(Checkbox)

function AddCourseGroup({
  open,
  onClose,
  content,
  addUpdateCourseGroup,
  masterData,
  actionType,
  details,
}) {
  const classes = useStyles()
  const { t } = useTranslation()

  const onSubmit = function (values, { setErrors }) {
    addUpdateCourseGroup(values, { setErrors })
    onClose()
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
        initialValues={
          actionType === 'add' ? initialState : mapStateWithData(initialState, details)
        }
        enableReinitialize={true}
        validationSchema={CoreSchema.addProgramCourse}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className={classes.form} noValidate autoComplete="off">
              <DialogTitle disableTypography id="customized-dialog-title" onClose={onClose}>
                <Box pt={1} display="flex" alignItems="center" justifyContent="space-between">
                  <Typography tabIndex={0} variant="h5">
                    <Box component="span" fontWeight="700" fontSize="24px">
                      {content.title}
                      {actionType === 'add' ? 'Add Course Group' : 'Edit Course Group'}
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
                    <Grid item xs={12}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:groupName')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        className="custom-input-field"
                        name="cg_course_group_name"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="cg_course_group_name"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:groupNameHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:groupName')}) ({t('fields:required')}) (
                            {t('fields:groupNameHelp')})
                          </span>
                        }
                      />
                      <ErrorMessage name="cg_course_group_name">
                        {(msg) => (
                          <span tabIndex={0} className="error">
                            {t(msg, { field: t('fields:groupName') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:selectRuleType')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        className={classes.selectIcon + ' custom-input-field'}
                        name="cg_rule_type"
                        disabled={actionType === 'edit'}
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="cg_rule_type"
                        select
                        pr={0}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:selectRuleTypeHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:selectRuleType')}) ({t('fields:required')}) (
                            {t('fields:selectRuleTypeHelp')})
                          </span>
                        }
                      >
                        {masterData?.rule_type.map((type) => (
                          <MenuItem key={type} value={type}>
                            {t(`reference:${type}`)}
                          </MenuItem>
                        ))}
                      </Field>
                      <ErrorMessage name="cg_rule_type">
                        {(msg) => (
                          <span tabIndex={0} className="error">
                            {t(msg, { field: t('fields:selectRuleType') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    {values.cg_rule_type && (
                      <Grid item xs={12}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:ruleValue')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className="custom-input-field"
                          name="cg_rule_value"
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="cg_rule_value"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:ruleValueHelp')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          label={
                            <span style={visuallyHidden}>
                              ({t('fields:ruleValue')}) ({t('fields:required')}) (
                              {t('fields:ruleValueHelp')})
                            </span>
                          }
                        />
                        <ErrorMessage name="cg_rule_value">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('fields:ruleValue') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                    )}
                    <Grid item xs={12} className="custom-checkbox">
                      <Box mt={1} mb={1}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:status')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                      </Box>
                      <Box minWidth={{ xs: 'auto', sm: 'auto', md: '150px' }} align="left">
                        <FormControlLabel
                          control={
                            <CheckboxWithGreenCheck
                              checked={values.cg_is_active}
                              onChange={(e) => {
                                setFieldValue('cg_is_active', e.target.checked)
                              }}
                              checkedIcon={<Check aria-label={t('status')} />}
                              color="primary"
                              aria-label={t('status')}
                            />
                          }
                          label={t('fields:active')}
                        />
                      </Box>
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
                  {actionType === 'add' ? 'Add' : 'Update'}
                </Button>
              </DialogActions>
            </Form>
          )
        }}
      </Formik>
    </Dialog>
  )
}

AddCourseGroup.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  content: PropTypes.array,
  addUpdateCourseGroup: PropTypes.func,
  masterData: PropTypes.object,
  actionType: PropTypes.func,
  details: PropTypes.object,
}

AddCourseGroup.defaultProps = {
  open: false,
  onClose: () => {},
  content: {},
  addUpdateCourseGroup: () => {},
  masterData: {},
  actionType: () => {},
  details: {},
}

export default AddCourseGroup
