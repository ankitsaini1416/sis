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
import { GithubPicker } from 'react-color'
import { HelpCircle, X } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'

import { CoreSchema } from '../../../../../../clientFiles/validations'
import useStyles from '../../Organizations.Style'

const mapStateWithData = function (initialState, data) {
  const state = {
    pct_id: data.pct_id || initialState.pct_id,
    pct_school_id: data.pct_school_id || initialState.pct_school_id,
    pct_name: data.pct_name || initialState.pct_name,
    pct_color_hex: data.pct_color_hex || initialState.pct_color_hex,
  }
  return state
}

const initialState = {
  pct_name: '',
  pct_color_hex: '',
}

function AddCategories({ open, formActionType, onClose, addProgramCategory, categoryDetail }) {
  const { t } = useTranslation()
  const classes = useStyles()
  const { schoolId } = useParams()
  const [showColorPicker, setShowColorPicker] = React.useState(false)

  const onSubmit = function (values, { setErrors }) {
    addProgramCategory(categoryDetail.pct_id, schoolId, values, { setErrors, callback: onClose })
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
        initialValues={
          formActionType === 'add' ? initialState : mapStateWithData(initialState, categoryDetail)
        }
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={CoreSchema.addCategory}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <DialogTitle disableTypography id="customized-dialog-title" onClose={onClose}>
                <Box pt={1} display="flex" alignItems="center" justifyContent="space-between">
                  <Typography tabIndex={0} variant="h5">
                    <Box component="span" fontWeight="fontWeightBold">
                      {formActionType === 'add' ? t('addCategories') : t('editCategories')}
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
                  <Box mb={2}>
                    <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                      <Box component="span" fontWeight="600">
                        {t('fields:categoryName')}
                      </Box>
                      <Box component="span" className="mandatory">
                        {t('fields:mandatory')}
                      </Box>
                    </Typography>
                    <Field
                      className="custom-input-field"
                      name="pct_name"
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      size="small"
                      id="pct_name"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title={t('fields:categoryNameHelp')} placement="top">
                              <HelpCircle className="help-icon" />
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      label={
                        <span style={visuallyHidden}>
                          ({t('fields:categoryName')} ) ({t('fields:required')}) (
                          {t('fields:categoryNameHelp')})
                        </span>
                      }
                    />
                    <ErrorMessage name="pct_name">
                      {(msg) => (
                        <span tabIndex={0} className="error">
                          {t(msg, { field: t('field:Category Name') })}
                        </span>
                      )}
                    </ErrorMessage>
                  </Box>
                  <Box minHeight={150} style={{ position: 'relative' }}>
                    <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                      <Box component="span" fontWeight="600">
                        {t('fields:addColor')}
                      </Box>
                      <Box component="span" className="mandatory">
                        {t('fields:mandatory')}
                      </Box>
                    </Typography>
                    <Field
                      className="custom-input-field color-picker-field"
                      variant="outlined"
                      as={TextField}
                      fullWidth
                      id="pct_color_hex"
                      name="pct_color_hex"
                      onClick={() => setShowColorPicker(!showColorPicker)}
                      InputProps={{
                        disabled: true,
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <span
                              className="color-box cursor-pointer"
                              style={{
                                backgroundColor: values.pct_color_hex
                                  ? values.pct_color_hex
                                  : '#fff',
                              }}
                            >
                              {' '}
                            </span>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title={t('fields:addColorHelp')} placement="top">
                              <HelpCircle className="help-icon" />
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      label={
                        <span style={visuallyHidden}>
                          ({t('fields:addColor')} ) ({t('fields:required')}) (
                          {t('fields:addColorHelp')})
                        </span>
                      }
                    />
                    <ErrorMessage name="pct_color_hex">
                      {(msg) => (
                        <span tabIndex={0} className="error">
                          {t(msg, { field: t('fields:addColor') })}
                        </span>
                      )}
                    </ErrorMessage>
                    {showColorPicker ? (
                      <div className={classes.popoverSwatch}>
                        <div
                          className={classes.swatchCover}
                          onClick={() => setShowColorPicker(!showColorPicker)}
                        />
                        <GithubPicker
                          triangle="hide"
                          width={213}
                          color={values.pct_color_hex}
                          disableAlpha
                          onChange={(color) => setFieldValue('pct_color_hex', color.hex)}
                        />
                      </div>
                    ) : null}
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
                  color="primary"
                  variant="contained"
                  size="large"
                  disableElevation
                  type="submit"
                >
                  {formActionType === 'add' ? t('add') : t('update')}
                </Button>
              </DialogActions>
            </Form>
          )
        }}
      </Formik>
    </Dialog>
  )
}

AddCategories.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  addProgramCategory: PropTypes.func,
  formActionType: PropTypes.func,
  categoryDetail: {},
}
AddCategories.defaultProps = {
  open: false,
  onClose: () => {},
  addProgramCategory: () => {},
  formActionType: () => {},
  categoryDetail: {},
}
/**
  /**
  * Add Categories modal component
  */
export default AddCategories
