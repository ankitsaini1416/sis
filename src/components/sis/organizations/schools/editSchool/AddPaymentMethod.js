import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
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
import React, { useState } from 'react'
import { Check, HelpCircle, X } from 'react-feather'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

import useStyles from '../../Organizations.Style'
import { get, isEmpty } from './../../../../../helpers/utils'

const CheckboxWithGreenCheck = withStyles({})(Checkbox)
/**
 * Defines a component Add Payment Method
 * @param props
 * @returns {*}
 * @constructor
 */

function AddEditPaymentMethod({ callback, open, onClose, siteObject = {}, paymentMaster }) {
  const { t } = useTranslation()
  const classes = useStyles()

  const createYupSchema = function (gateway) {
    // if (!yup[validationType]) {
    //   return schema
    // }
    const yupSchema = get(gateway, 'configurable_fields.fields', []).reduce((schema, config) => {
      if (config.type !== 'text' && config.type !== 'number') {
        return schema
      }
      let validator = yup.string().trim(t('message:errorSpace'))
      if (config.mandatory) {
        const params = ['message:required']
        validator = validator.required(...params)
      }
      if (config.maxlength) {
        const params = [parseInt(config.maxlength), 'message:maxCharactersLength']
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
    alaisValidator = alaisValidator.required(...[t('message:required', { field: t('alias') })])
    alaisValidator = alaisValidator.max(...[50, t('maxCharactersLength', { length: 50 })])
    yupSchema['alias'] = alaisValidator
    return yupSchema
  }
  const [selectedGateWay, setSelectedGateway] = useState(
    !isEmpty(siteObject)
      ? paymentMaster.find((item) => item.id === siteObject.payment_gateway_masters_id)
      : {}
  )

  const [initialState, setInitialState] = useState(
    !isEmpty(siteObject)
      ? {
          ...get(selectedGateWay, 'configurable_fields.fields', []).reduce((item, obj) => {
            item[obj.name] = get(siteObject, `config.${obj.name}`)
            return item
          }, {}),
          alias: siteObject.alias,
          active: siteObject.active,
        }
      : {}
  )
  const [schemaState, setSchemaState] = useState(
    !isEmpty(siteObject) ? yup.object().shape(createYupSchema(selectedGateWay)) : yup.object({})
  )
  const onSelectChange = function (event) {
    const gateway = paymentMaster.find((item) => item.id === event.target.value)
    const fields = get(gateway, 'configurable_fields.fields', []).reduce((acc, item) => {
      acc[item.name] = ''
      return acc
    }, {})
    fields.alias = ''
    const schema = yup.object().shape(createYupSchema(gateway))
    setInitialState(fields)
    setSchemaState(schema)
    setSelectedGateway(gateway)
  }
  const onSubmit = (values, { setErrors }) => {
    if (isEmpty(siteObject)) {
      const payload = {
        name: selectedGateWay.name,
        alias: values.alias,
        active: values.active,
        config: JSON.stringify(
          Object.keys(initialState).reduce((acc, item) => {
            acc[item] = values[item]
            return acc
          }, {})
        ),
        payment_gateway_masters_id: selectedGateWay.id,
      }
      callback(payload, { setErrors, callback: onPopupClose })
    } else {
      const payload = {
        name: siteObject.name,
        alias: values.alias,
        active: values.active,
        config: JSON.stringify(
          get(selectedGateWay, 'configurable_fields.fields', []).reduce((acc, item) => {
            acc[item.name] = values[item.name]
            return acc
          }, {})
        ),
        payment_gateway_masters_id: siteObject.payment_gateway_masters_id,
      }
      callback(siteObject.id, payload, { setErrors, callback: onPopupClose })
    }
  }
  const onPopupClose = function () {
    setInitialState({})
    setSchemaState({})
    setSelectedGateway({})
    onClose()
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
      {/* {!isEmpty(selectedGateWay) && !isEmpty(initialState) && !isEmpty(schemaState) && ( */}
      <Formik
        enableReinitialize={true}
        initialValues={initialState}
        onSubmit={onSubmit}
        validationSchema={schemaState}
      >
        {({ setFieldValue, values }) => {
          return (
            <Form>
              <DialogTitle disableTypography id="customized-dialog-title" onClose={onClose}>
                <Box pt={1} display="flex" alignItems="center" justifyContent="space-between">
                  <Typography tabIndex={0} variant="h5">
                    <Box component="span" fontWeight="fontWeightBold">
                      {!isEmpty(siteObject) ? t('editPaymentMethod') : t('addPaymentMethod')}
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
                <Box pb={2}>
                  {isEmpty(siteObject) && (
                    <Box mb={2}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:selectPaymentMethod')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <TextField
                        className={classes.selectIcon + ' custom-input-field'}
                        name="selectPaymentMethod"
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="selectPaymentMethod"
                        value={selectedGateWay.id}
                        onChange={onSelectChange}
                        select
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:selectPaymentMethodHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:selectPaymentMethod')}) ({t('fields:required')}) (
                            {t('fields:selectPaymentMethodHelp')})
                          </span>
                        }
                      >
                        {paymentMaster.map((item) => (
                          <MenuItem key={`payment_master_${item.id}`} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  )}
                  <Box mb={2}>
                    <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                      <Box component="span" fontWeight="600">
                        {t('fields:alias')}
                      </Box>
                      <Box component="span" className="mandatory">
                        {t('fields:mandatory')}
                      </Box>
                    </Typography>
                    <Field
                      className="custom-input-field"
                      name="alias"
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      size="small"
                      id="alias"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title={t('fields:aliasHelp')} placement="top">
                              <HelpCircle className="help-icon" />
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      label={
                        <span style={visuallyHidden}>
                          ({t('fields:alias')}) ({t('fields:required')}) ({t('fields:aliasHelp')})
                        </span>
                      }
                    />
                    <ErrorMessage name="alias">
                      {(msg) => (
                        <span tabIndex={0} className="error">
                          {t(msg, { field: t('field:alias') })}
                        </span>
                      )}
                    </ErrorMessage>
                  </Box>
                  {get(selectedGateWay, 'configurable_fields.fields', []).map((item) => (
                    <Box key={item.name} mb={2}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
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
                                title={t('enterThe', {
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
                          <span tabIndex={0} className="error">
                            {t(msg, {
                              field: t(item.name),
                              length: item.maxlength,
                            })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Box>
                  ))}
                  <Box className="custom-checkbox">
                    <FormControlLabel
                      control={
                        <CheckboxWithGreenCheck
                          checked={values.active}
                          onChange={(e) => {
                            setFieldValue(`active`, e.target.checked)
                          }}
                          value="checkedA"
                          checkedIcon={<Check aria-label={t('fields:status')} />}
                          color="primary"
                        />
                      }
                      label={t('fields:active')}
                    />
                  </Box>
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
                  type="submit"
                  color="primary"
                  variant="contained"
                  size="large"
                  disableElevation
                >
                  {!isEmpty(siteObject) ? t('update') : t('add')}
                </Button>
              </DialogActions>
            </Form>
          )
        }}
      </Formik>
      {/* )} */}
    </Dialog>
  )
}

AddEditPaymentMethod.propTypes = {
  callback: PropTypes.func,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  paymentMaster: PropTypes.array,
  siteObject: PropTypes.object,
}
AddEditPaymentMethod.defaultProps = {
  callback: () => {},
  open: false,
  onClose: () => {},
  paymentMaster: PropTypes.array,
  siteObject: {},
}
/**
 /**
 * Add Payment Method modal component
 */
export default AddEditPaymentMethod
