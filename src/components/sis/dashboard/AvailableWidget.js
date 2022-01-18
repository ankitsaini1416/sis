// @ts-nocheck

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
import clsx from 'clsx'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { BarChart, HelpCircle, PieChart, X } from 'react-feather'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

import { WIZARD_TYPES } from '../../../helpers/constants'
import { get } from '../../../helpers/utils'
import FormikAutoComplete from './../../common/formikComponents/FormikAutoComplete'
import useStyles from './../settings/Settings.Style'

/**
 * Defines a component Available Widget
 * @param props
 * @returns {*}
 * @constructor
 */

const getWidgettIcon = (widget) => {
  switch (widget.type) {
    case WIZARD_TYPES.BAR:
      return <BarChart width={20} height={20} className="help-icon" />
    case WIZARD_TYPES.PIE:
      return <PieChart width={20} height={20} className="help-icon" />
    default:
      return <PieChart width={20} height={20} className="help-icon" />
  }
}

function AddDashboard({
  open,
  onClose,
  dashboardMasterWidgets,
  addDashboardWidget,
  fetchDistrictsCall,
  fetchInstituteDistrictsCall,
  fetchSchoolsCall,
  holderInfo,
}) {
  const { t } = useTranslation()
  const classes = useStyles()
  const [districts, setDistricts] = useState([])
  const [schools, setSchools] = useState([])
  const [selectedWidget, setSelectedWidget] = useState({})
  const [initialState, setInitialState] = useState({})
  const [schemaState, setSchemaState] = useState(yup.object({}))

  const fetchDistricts = function (q) {
    fetchDistrictsCall(
      {
        q,
        per_page: 1000,
        is_active: '',
        current_page: 1,
      },
      (records) => {
        setDistricts(get(records, 'content', []))
      },
      null,
      false
    )
  }
  const fetchInstituteDistricts = function (q) {
    fetchInstituteDistrictsCall(
      {
        q,
        per_page: 1000,
        is_active: '',
        current_page: 1,
      },
      (records) => {
        setDistricts(get(records, 'content', []))
      },
      null,
      false
    )
  }

  const fetchSchool = function () {
    fetchSchoolsCall(
      {
        q: '',
        current_page: 1,
        per_page: 1000,
        is_active: '',
      },
      (data) => {
        const { content } = data
        setSchools(content)
      },
      null,
      false
    )
  }

  const onSubmit = (values, { setErrors }) => {
    const payload = {
      widget_id: selectedWidget._id,
      config: Object.keys(initialState).reduce((acc, item) => {
        acc[item] = values[item]
        return acc
      }, {}),
      label: values.label,
      grid: 0,
      position: holderInfo.position,
    }
    addDashboardWidget(payload, { setErrors, callback: onClose })
  }

  const createYupSchema = function (gateway) {
    // if (!yup[validationType]) {
    //   return schema
    // }
    const yupSchema = get(gateway, 'configurable_fields.fields', []).reduce((schema, config) => {
      if (config.type !== 'text' && config.type !== 'number') {
        return schema
      }
      let validator = yup.string().trim(t('message:errorSpace'))
      if (config.mandatory === 'true') {
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
    let labelValidator = yup.string().trim(t('message:errorSpace'))
    labelValidator = labelValidator.required(...[t('message:required', { field: t('label') })])
    labelValidator = labelValidator.max(...[500, t('maxCharactersLength', { length: 500 })])
    yupSchema['label'] = labelValidator
    return yupSchema
  }
  const onSelectChange = function (event) {
    const widget = dashboardMasterWidgets.find((item) => item._id === event.target.value)
    const fields = get(widget, 'params', []).reduce((acc, item) => {
      if (item.instruction === 'school') {
        fetchSchool()
      }
      if (item.instruction === 'district') {
        fetchDistricts()
      }
      acc[item.name] = ''
      return acc
    }, {})
    const schema = yup.object().shape(createYupSchema(widget))
    setInitialState(fields)
    setSchemaState(schema)
    setSelectedWidget(widget)
  }
  const onSelectChangeInstitute = function (event) {
    const widget = dashboardMasterWidgets.find((item) => item._id === event.target.value)
    const fields = get(widget, 'params', []).reduce((acc, item) => {
      if (item.instruction === 'school') {
        fetchSchool()
      }
      if (item.instruction === 'district') {
        fetchInstituteDistricts()
      }
      acc[item.name] = ''
      return acc
    }, {})
    const schema = yup.object().shape(createYupSchema(widget))
    setInitialState(fields)
    setSchemaState(schema)
    setSelectedWidget(widget)
  }
  const onPopupClose = function () {
    setInitialState({})
    setSchemaState({})
    setSelectedWidget({})
    onClose()
  }
  /**
   * Render JSX of Available Widget modal
   */
  return (
    <Dialog
      paper
      className="custom-dialog"
      onClose={onPopupClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="md"
    >
      <Formik
        enableReinitialize={true}
        initialValues={initialState}
        onSubmit={onSubmit}
        validationSchema={schemaState}
      >
        {() => {
          return (
            <Form>
              <DialogTitle disableTypography id="customized-dialog-title" onClose={onClose}>
                <Box pt={1} display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h5" tabIndex={0}>
                    <Box component="span" fontWeight="fontWeightBold">
                      {t('availableWidget')}
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
                <Box p={0}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={6}>
                      <Box mb={2}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('fields:selectWidget')}
                          </Box>
                          <Box component="span" className="mandatory">
                            {t('fields:mandatory')}
                          </Box>
                        </Typography>
                        <TextField
                          className={clsx(
                            classes.selectIcon,
                            classes.widgetType + ' custom-input-field'
                          )}
                          name="widget_id"
                          select
                          value={selectedWidget._id}
                          onChange={onSelectChange}
                          variant="outlined"
                          fullWidth
                          size="small"
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
                              {t('fields:name')} ({t('fields:mandatory')}) (
                              {t('fields:helpIconName')}
                            </span>
                          }
                        >
                          {dashboardMasterWidgets.map((widget) => (
                            <MenuItem
                              className={classes.widgetTypeList}
                              key={widget._id}
                              value={widget._id}
                            >
                              {widget.name} {getWidgettIcon(widget)}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          className={clsx(
                            classes.selectIcon,
                            classes.widgetType + ' custom-input-field'
                          )}
                          name="widget_id"
                          select
                          value={selectedWidget._id}
                          onChange={onSelectChangeInstitute}
                          variant="outlined"
                          fullWidth
                          size="small"
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
                              {t('fields:name')} ({t('fields:mandatory')}) (
                              {t('fields:helpIconName')}
                            </span>
                          }
                        >
                          {dashboardMasterWidgets.map((widget) => (
                            <MenuItem
                              className={classes.widgetTypeList}
                              key={widget._id}
                              value={widget._id}
                            >
                              {widget.name} {getWidgettIcon(widget)}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Box>
                      {selectedWidget._id && (
                        <>
                          {get(selectedWidget, 'params', []).map((item) => (
                            <Box key={item.name} mb={2}>
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
                              {item.instruction === 'district' ? (
                                <Field
                                  className="custom-input-field"
                                  id={item.name}
                                  name={item.name}
                                  nameKey="dst_name"
                                  valueKey="dst_district_public_id"
                                  optionId="dst_district_public_id"
                                  options={districts}
                                  component={FormikAutoComplete}
                                  variant="outlined"
                                  fullWidth
                                  select
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
                              ) : item.instruction === 'school' ? (
                                <Field
                                  className="custom-input-field"
                                  id={item.name}
                                  name={item.name}
                                  nameKey="sch_name"
                                  valueKey="sch_school_public_id"
                                  optionId="sch_school_public_id"
                                  options={schools}
                                  component={FormikAutoComplete}
                                  variant="outlined"
                                  fullWidth
                                  select
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
                              ) : (
                                <Field
                                  className="custom-input-field"
                                  id={item.name}
                                  name={item.name}
                                  as={TextField}
                                  variant="outlined"
                                  fullWidth
                                  type={item.type}
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
                              )}
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
                          <Box mb={2}>
                            <Typography
                              component="p"
                              variant="body2"
                              color="textPrimary"
                              gutterBottom
                            >
                              <Box component="span" fontWeight="600">
                                {t('fields:label')}
                              </Box>
                              <Box component="span" className="mandatory">
                                {t('fields:mandatory')}
                              </Box>
                            </Typography>
                            <Field
                              className="custom-input-field"
                              id="label"
                              name="label"
                              as={TextField}
                              variant="outlined"
                              fullWidth
                              size="small"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Tooltip title={t('fields:labelHelp')} placement="top">
                                      <HelpCircle className="help-icon" />
                                    </Tooltip>
                                  </InputAdornment>
                                ),
                              }}
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:label')}) ({t('fields:required')}) (
                                  {t('fields:labelHelp')})
                                </span>
                              }
                            />
                            <ErrorMessage name="label">
                              {(msg) => (
                                <span tabIndex={0} className="error">
                                  {t(msg, { field: t('field:label') })}
                                </span>
                              )}
                            </ErrorMessage>
                          </Box>
                        </>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box mt={2} pl={{ xs: 0, sm: 4 }}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('selectedWidgetType')}
                          </Box>
                        </Typography>
                        <Typography component="p" variant="subtitle2" color="textSecondary">
                          {selectedWidget.name || '-'}
                        </Typography>
                      </Box>
                      <Box mt={2} pl={{ xs: 0, sm: 4 }}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                          <Box component="span" fontWeight="600">
                            {t('description')}
                          </Box>
                        </Typography>
                        <Typography component="p" variant="subtitle2" color="textSecondary">
                          {selectedWidget.description || '-'}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  className="custom-default-button text-transform-none"
                  onClick={onPopupClose}
                  size="large"
                  variant="contained"
                  disableElevation
                >
                  {t('cancel')}
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  size="large"
                  className="text-transform-none"
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

AddDashboard.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  dashboardMasterWidgets: PropTypes.array,
  addDashboardWidget: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchInstituteDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  holderInfo: PropTypes.func,
}
AddDashboard.defaultProps = {
  open: false,
  onClose: () => {},
  dashboardMasterWidgets: [],
  addDashboardWidget: () => {},
  fetchDistrictsCall: () => {},
  fetchInstituteDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
  holderInfo: {},
}
/**
 /**
 * Available Widget modal component
 */
export default AddDashboard
