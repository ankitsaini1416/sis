import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
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
import React, { useRef } from 'react'
import { Check, HelpCircle, X } from 'react-feather'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

import { get, isEmpty } from '../../../../../helpers/utils'
// import { ROUTES } from '../../../../../helpers/constants'
import useStyles from '../../Organizations.Style'
const CheckboxWithGreenCheck = withStyles({})(Checkbox)
function AddEditLMS({ lmsAction, open, onClose, configLmsList, callback, lmsList }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const selectedLMSIds = useRef(lmsList.map((item) => item.lmc_master_id))
  const createYupLmsSchema = function (lms) {
    const yupSchema = get(lms, 'lmm_config_fields.fields', []).reduce((schema, config) => {
      if (config.type !== 'text' && config.type !== 'number') {
        return schema
      }
      let validator = yup.string().trim(t('message:errorSpace'))
      if (config.mandatory) {
        const params = ['message:fieldRequired']
        validator = validator.required(...params)
      }
      if (config.maxlength) {
        const params = [parseInt(config.maxlength), 'message:maxLmsCharactersLength']
        validator = validator.max(...params)
      }
      if (config.type === 'number') {
        const params = ['message:errorNumber']
        validator = validator.test(config.name, ...params, (value) => {
          return !value || !isNaN(value)
        })
      }
      schema[config.name] = validator
      return schema
    }, {})
    let alaisValidator = yup.string().trim(t('message:errorSpace'))
    alaisValidator = alaisValidator.required(...[t('message:aliasRequired', { field: t('alias') })])
    alaisValidator = alaisValidator.max(...[50, t('message:maxCharactersLength', { length: 50 })])
    yupSchema['lmc_alias'] = alaisValidator
    return yupSchema
  }

  const [selectedLms, setSelectedLms] = React.useState(
    lmsAction.lmc_master_id
      ? configLmsList.find((item) => item.lmm_id === lmsAction.lmc_master_id)
      : {}
  )
  const [initialState, setInitialState] = React.useState(
    lmsAction.lmc_master_id
      ? {
          ...get(
            configLmsList.find((item) => item.lmm_id === lmsAction.lmc_master_id),
            'lmm_config_fields.fields',
            []
          ).reduce((item, obj) => {
            item[obj.name] = get(lmsAction, `lmc_config_fields.${obj.name}`)
            return item
          }, {}),
          lmc_alias: lmsAction?.lmc_config_fields?.lmc_alias || '',
          lmc_active: lmsAction?.lmc_active || '',
        }
      : {}
  )
  const [schemaState, setSchemaState] = React.useState(
    lmsAction.lmc_master_id ? yup.object().shape(createYupLmsSchema(selectedLms)) : yup.object({})
  )
  const onSelectChange = function (event) {
    const lms = configLmsList.find((item) => item.lmm_id === event.target.value)
    const fields = get(lms, 'lmm_config_fields.fields', []).reduce((acc, item) => {
      acc[item.name] = ''
      return acc
    }, {})
    fields.lmc_alias = ''
    const schema = yup.object().shape(createYupLmsSchema(lms))
    setInitialState(fields)
    setSchemaState(schema)
    setSelectedLms(lms)
  }
  const onSubmit = (values, { setErrors }) => {
    const payload = {
      lmc_name: selectedLms.lmm_name,
      lmc_alias: values.lmc_alias,
      lmc_active: values.lmc_active,
      lmc_config_fields: JSON.stringify(
        Object.keys(initialState).reduce((acc, item) => {
          acc[item] = values[item]
          return acc
        }, {})
      ),
      lmc_master_id: selectedLms.lmm_id,
    }
    callback(payload, { setErrors, callback: onPopupClose })
  }
  const onPopupClose = function () {
    onClose()
    setInitialState({})
    setSchemaState({})
    setSelectedLms({})
  }

  return (
    <Dialog
      paper
      className="custom-dialog"
      onClose={onPopupClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="sm"
    >
      <Paper rounded={true} elevation={1} className="paper-round">
        <Formik
          onSubmit={onSubmit}
          initialValues={initialState}
          enableReinitialize={true}
          validationSchema={schemaState}
        >
          {({ setFieldValue, values }) => {
            return (
              <Form className={classes.form} noValidate autoComplete="off">
                <DialogTitle disableTypography id="customized-dialog-title" onClose={onPopupClose}>
                  <Box pt={1} display="flex" alignItems="center" justifyContent="space-between">
                    <Typography tabIndex={0} variant="h5">
                      <Box component="span" fontWeight="fontWeightBold">
                        {lmsAction.action === 'add' ? t('addNewLMS') : t('editLms')}
                      </Box>
                    </Typography>
                    <IconButton
                      tabIndex={-1}
                      aria-label="close"
                      className="close-button"
                      onClick={onPopupClose}
                    >
                      <X />
                    </IconButton>
                  </Box>
                </DialogTitle>{' '}
                <DialogContent>
                  <Box pt={0} pb={{ xs: 2, lg: 2 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:lmsTypes')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <Field
                          className={classes.selectIcon + ' custom-input-field'}
                          as={TextField}
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="lmsType"
                          name="lmsType"
                          onChange={onSelectChange}
                          value={selectedLms.lmm_id}
                          pr={0}
                          disabled={lmsAction.action === 'edit'}
                          InputProps={{
                            readOnly: lmsAction.action === 'edit',
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:helpIconLmsType')} placement="top">
                                  <HelpCircle className="help-icon" />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                          select
                        >
                          {configLmsList.map((item) => (
                            <MenuItem
                              value={item.lmm_id}
                              key={`${item.lmm_id}`}
                              disabled={selectedLMSIds.current.includes(item.lmm_id)}
                            >
                              {item.lmm_name}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage name="lmsType">
                          {(msg) => (
                            <span tabIndex={0} className="error">
                              {t(msg, { field: t('field:lmsTypes') })}
                            </span>
                          )}
                        </ErrorMessage>
                      </Grid>
                      {!isEmpty(selectedLms) && (
                        <>
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box component="span" fontWeight="600">
                                {t('fields:alias')}
                              </Box>
                              <Box component="span" className="mandatory">
                                {t('fields:mandatory')}
                              </Box>
                            </Typography>
                            <Field
                              className="custom-input-field"
                              name="lmc_alias"
                              as={TextField}
                              variant="outlined"
                              fullWidth
                              size="small"
                              id="lmc_alias"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Tooltip title={t('fields:aliasNameHelp')} placement="top">
                                      <HelpCircle className="help-icon" />
                                    </Tooltip>
                                  </InputAdornment>
                                ),
                              }}
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:lmc_alias')}) ({t('fields:required')}) (
                                  {t('fields:aliasNameHelp')})
                                </span>
                              }
                            />

                            <ErrorMessage name="lmc_alias">
                              {(msg) => (
                                <span tabIndex={0} className="error">
                                  {t(msg, { field: t('fields:alias') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Grid>
                          {get(selectedLms, 'lmm_config_fields.fields', []).map((item) => (
                            <Grid key={item.name} item xs={12} sm={6} md={6} lg={6}>
                              <Typography
                                component="p"
                                variant="body2"
                                color="textPrimary"
                                gutterBottom
                              >
                                <Box component="span" fontWeight="600">
                                  {item.label}
                                </Box>
                                <Box component="span" className="mandatory">
                                  {t('fields:mandatory')}
                                </Box>
                              </Typography>
                              <Field
                                className="custom-input-field"
                                id={item.name}
                                name={item.name}
                                as={TextField}
                                variant="outlined"
                                fullWidth
                                size="small"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title={t(`Enter The ${item.label}`, {
                                          field: t(item.name),
                                        })}
                                        placement="top"
                                      >
                                        <HelpCircle className="help-icon" />
                                      </Tooltip>
                                    </InputAdornment>
                                  ),
                                }}
                                label={
                                  <span style={visuallyHidden}>
                                    ({item.label}) ({t('fields:required')}) (
                                    {t('enterThe', {
                                      field: t(item.name),
                                    })}
                                    )
                                  </span>
                                }
                              />
                              <ErrorMessage name={item.name}>
                                {(msg) => (
                                  <span className="error">
                                    {t(msg, {
                                      field: t(item.label),
                                    })}
                                  </span>
                                )}
                              </ErrorMessage>
                            </Grid>
                          ))}
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Box className="custom-checkbox">
                              <FormControlLabel
                                control={
                                  <CheckboxWithGreenCheck
                                    checked={values?.lmc_active}
                                    onChange={(e) => {
                                      setFieldValue('lmc_active', e.target.checked)
                                    }}
                                    checkedIcon={<Check aria-label={t('fields:status')} />}
                                    color="primary"
                                  />
                                }
                                label={t('fields:active')}
                              />
                            </Box>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Box>
                </DialogContent>
                {!isEmpty(selectedLms) && (
                  <DialogActions>
                    <Button
                      className="text-transform-none"
                      autoFocus
                      size="large"
                      variant="contained"
                      disableElevation
                      color="primary"
                      type="submit"
                    >
                      {lmsAction.action === 'add' ? t('add') : t('update')}
                    </Button>
                  </DialogActions>
                )}
              </Form>
            )
          }}
        </Formik>
      </Paper>
    </Dialog>
  )
}
AddEditLMS.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  lmsAction: PropTypes.object,
  configLmsList: PropTypes.array,
  siteObject: PropTypes.object,
  callback: PropTypes.func,
  lmsList: PropTypes.array,
}
AddEditLMS.defaultProps = {
  lmsAction: {},
  open: false,
  onClose: () => {},
  configLmsList: [],
  siteObject: {},
  callback: () => {},
  lmsList: [],
}
export default AddEditLMS
