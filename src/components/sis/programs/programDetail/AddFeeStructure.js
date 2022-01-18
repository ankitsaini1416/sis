import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
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
import { withStyles } from '@material-ui/core/styles'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Check, HelpCircle, Info, Plus, Trash, X } from 'react-feather'
import { useTranslation } from 'react-i18next'
import Fade from 'react-reveal/Fade'

import { CoreSchema } from '../../../../../clientFiles/validations'
import { decimalFinalFee, getFinalFee } from '../../../../helpers/utils'
import { get, isEmpty } from '../../../../helpers/utils'
import useStyles from '../Programs.Style'

const CheckboxWithGreenCheck = withStyles({})(Checkbox)

const mapStateWithData = function (initialState, data) {
  const state = {
    fee_name: data.fee_name || initialState.fee_name,
    fee_payment_full: data.fee_payment_full || initialState.fee_payment_full,
    fee_installment_count: data.fee_installment_count || initialState.fee_installment_count,
    fee_installment_duration:
      data.fee_installment_duration || initialState.fee_installment_duration,
    fee_line_items: !isEmpty(data.fee_line_items)
      ? data.fee_line_items
      : initialState.fee_line_items,
    fee_shipping_fee: data.fee_shipping_fee || initialState.fee_shipping_fee,
    fee_hide_fee: data.fee_hide_fee || initialState.fee_hide_fee,
    fee_discount_note: data.fee_discount_note || initialState.fee_discount_note,
    fee_per_installment: data.fee_per_installment || initialState.fee_per_installment,
  }
  return state
}

const initialState = {
  fee_name: '',
  fee_payment_full: false,
  fee_installment_count: 1,
  fee_installment_duration: 0,
  fee_line_items: [
    {
      fli_name: '',
      fli_amount: '',
    },
  ],
  fee_shipping_fee: false,
  fee_hide_fee: false,
  fee_discount_note: '',
  fee_per_installment: '',
}

function AddNewFeeStructure({
  open,
  onClose,
  addProgramFees,
  actionType,
  programfeeDetail,
  programDetail,
}) {
  const classes = useStyles()
  const { t } = useTranslation()

  const [fee, setFee] = useState([])
  const [isNewFee, setIsNewFee] = useState(true)

  const onSubmit = function (values, { setErrors }) {
    addProgramFees(values, {
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
      maxWidth="md"
    >
      <Formik
        initialValues={
          actionType === 'add' ? initialState : mapStateWithData(initialState, programfeeDetail)
        }
        enableReinitialize={true}
        onSubmit={onSubmit}
        validationSchema={CoreSchema.addProgramFee}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className={classes.form} noValidate autoComplete="off">
              <DialogTitle disableTypography id="customized-dialog-title" onClose={onClose}>
                <Box pt={1} display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h5" tabIndex={0}>
                    <Box component="span" fontWeight="600">
                      {actionType === 'add' ? 'Add Fee Structure' : 'Edit Fee Structure'}
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
                    <Grid item xs={12} sm={6}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:structureName')}
                        </Box>
                        <Box component="span" className="mandatory">
                          {t('fields:mandatory')}
                        </Box>
                      </Typography>
                      <Field
                        className="custom-input-field"
                        name="fee_name"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="fee_name"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:structureNameHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:structureName')}) ({t('fields:required')}) (
                            {t('fields:structureNameHelp')})
                          </span>
                        }
                      />
                      <ErrorMessage name="fee_name">
                        {(msg) => (
                          <span className="error" tabIndex={0}>
                            {t(msg, { field: t('fields:structureName') })}
                          </span>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12} sm={6} className="custom-checkbox">
                      <Box
                        mt={{ xs: 0, sm: 3 }}
                        minWidth={{ xs: 'auto', sm: 'auto', md: '150px' }}
                        align="left"
                      >
                        <FormControlLabel
                          control={
                            <CheckboxWithGreenCheck
                              checked={values.fee_payment_full}
                              onChange={(e) => {
                                setFieldValue('fee_payment_full', e.target.checked)
                                setFieldValue('fee_installment_count', 1)
                                setFieldValue('fee_installment_duration', 0)
                              }}
                              checkedIcon={<Check />}
                              color="primary"
                            />
                          }
                          label={t('fields:paymentFull')}
                        />
                      </Box>
                    </Grid>
                    {!values.fee_payment_full && (
                      <>
                        <Grid item xs={12} sm={6}>
                          <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
                            <Box component="span" fontWeight="600">
                              {t('fields:numberInstallments')}
                            </Box>
                            <Box component="span" className="mandatory">
                              {t('fields:mandatory')}
                            </Box>
                          </Typography>
                          <Field
                            className="custom-input-field"
                            name="fee_installment_count"
                            as={TextField}
                            variant="outlined"
                            type="number"
                            fullWidth
                            size="small"
                            id="fee_installment_count"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Tooltip
                                    title={t('fields:numberInstallmentsHelp')}
                                    placement="top"
                                  >
                                    <HelpCircle className="help-icon" />
                                  </Tooltip>
                                </InputAdornment>
                              ),
                            }}
                            label={
                              <span style={visuallyHidden}>
                                ({t('fields:numberInstallments')}) ({t('fields:required')}) (
                                {t('fields:numberInstallmentsHelp')})
                              </span>
                            }
                          />
                          <ErrorMessage name="fee_installment_count">
                            {(msg) => (
                              <span className="error" tabIndex={0}>
                                {t(msg, {
                                  field: t('fields:numberInstallments'),
                                })}
                              </span>
                            )}
                          </ErrorMessage>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
                            <Box component="span" fontWeight="600">
                              {t('fields:installmentDuration')}
                            </Box>
                            <Box component="span" className="mandatory">
                              {t('fields:mandatory')}
                            </Box>
                          </Typography>
                          <Field
                            className="custom-input-field"
                            name="fee_installment_duration"
                            as={TextField}
                            variant="outlined"
                            fullWidth
                            size="small"
                            type="number"
                            id="fee_installment_duration"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Tooltip
                                    title={t('fields:installmentDurationHelp')}
                                    placement="top"
                                  >
                                    <HelpCircle className="help-icon" />
                                  </Tooltip>
                                </InputAdornment>
                              ),
                            }}
                            label={
                              <span style={visuallyHidden}>
                                ({t('fields:installmentDuration')}) ({t('fields:required')}) (
                                {t('fields:installmentDurationHelp')})
                              </span>
                            }
                          />
                          <ErrorMessage name="fee_installment_duration">
                            {(msg) => (
                              <span className="error" tabIndex={0}>
                                {t(msg, {
                                  field: t('fields:installmentDuration'),
                                })}
                              </span>
                            )}
                          </ErrorMessage>
                        </Grid>
                      </>
                    )}
                    <Grid item xs={12}>
                      {get(values, 'fee_line_items', []).map((feeItem, index) => {
                        return (
                          <Grid
                            className={classes.positionRelative}
                            container
                            spacing={3}
                            justify="flex-start"
                            key={`${index}`}
                          >
                            <Grid item xs={12} sm={6}>
                              <Typography
                                component="p"
                                variant="body2"
                                color="textPrimary"
                                gutterBottom
                              >
                                <Box component="span" fontWeight="600">
                                  {t('fields:feeName')}
                                </Box>
                                <Box component="span" className="mandatory">
                                  {t('fields:mandatory')}
                                </Box>
                              </Typography>
                              <Field
                                className="custom-input-field"
                                as={TextField}
                                variant="outlined"
                                fullWidth
                                size="small"
                                name={`fee_line_items_fli_name_${index}`}
                                id={`fee_line_items_fli_name_${index}`}
                                value={feeItem.fli_name}
                                onChange={(e) => {
                                  setFieldValue(
                                    'fee_line_items',
                                    values.fee_line_items.map((item) => {
                                      if (item === feeItem) {
                                        return {
                                          ...feeItem,
                                          fli_name: e.target.value,
                                        }
                                      }
                                      return item
                                    })
                                  )
                                }}
                                label={
                                  <span style={visuallyHidden}>
                                    ({t('fields:feeName')}) ({t('fields:required')}) (
                                    {t('fields:feeNameHelp')})
                                  </span>
                                }
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip title={t('fields:feeNameHelp')} placement="top">
                                        <HelpCircle className="help-icon" />
                                      </Tooltip>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              <ErrorMessage name={`fee_line_items[${index}].fli_name`}>
                                {(msg) => (
                                  <span className="error" tabIndex={0}>
                                    {t(msg, { field: t('fields:feeName') })}
                                  </span>
                                )}
                              </ErrorMessage>
                            </Grid>
                            <Grid item xs={index !== 0 ? 10 : 12} sm={5} md={5}>
                              <Typography
                                component="p"
                                variant="body2"
                                color="textPrimary"
                                gutterBottom
                              >
                                <Box component="span" fontWeight="600">
                                  {t('fields:amount')}
                                </Box>
                                <Box component="span" className="mandatory">
                                  {t('fields:mandatory')}
                                </Box>
                              </Typography>
                              <Field
                                className="custom-input-field"
                                as={TextField}
                                variant="outlined"
                                type="number"
                                fullWidth
                                size="small"
                                id="fee_line_items[fli_amount]"
                                name={`fee_line_items_fli_amount_${index}`}
                                value={feeItem.fli_amount}
                                onChange={(e) => {
                                  setFieldValue(
                                    'fee_line_items',
                                    values.fee_line_items.map((item) => {
                                      if (item === feeItem) {
                                        return {
                                          ...feeItem,
                                          fli_amount: e.target.valueAsNumber,
                                        }
                                      }
                                      return item
                                    })
                                  )

                                  if (!isNewFee) {
                                    let f = fee.splice(0, fee.length - 1)
                                    setFee([...f, e.target.value])
                                  } else {
                                    setFee([...fee, e.target.value])
                                  }
                                  setIsNewFee(false)
                                }}
                                label={
                                  <span style={visuallyHidden}>
                                    ({t('fields:amount')}) ({t('fields:required')}) (
                                    {t('fields:amountHelp')})
                                  </span>
                                }
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip title={t('fields:amountHelp')} placement="top">
                                        <HelpCircle className="help-icon" />
                                      </Tooltip>
                                    </InputAdornment>
                                  ),
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      {t('fields:currency')}
                                    </InputAdornment>
                                  ),
                                }}
                              />

                              <ErrorMessage name={`fee_line_items[${index}].fli_amount`}>
                                {(msg) => (
                                  <span className="error" tabIndex={0}>
                                    {t(msg, { field: t('fields:amount') })}
                                  </span>
                                )}
                              </ErrorMessage>
                            </Grid>
                            {index !== 0 ? (
                              <Grid item xs={1} sm={1} className={classes.removeField2}>
                                <Box mt={{ xs: 3.5, sm: 3.5 }}>
                                  <IconButton
                                    aria-label={t('remove')}
                                    disableElevation
                                    data-id={index}
                                    onClick={() => {
                                      setFieldValue(
                                        'fee_line_items',
                                        values.fee_line_items.filter(
                                          (item) => item.fli_name !== feeItem.fli_name
                                        )
                                      )
                                    }}
                                    color="secondary"
                                  >
                                    <Trash width={16} height={16} />
                                  </IconButton>
                                </Box>
                              </Grid>
                            ) : null}
                          </Grid>
                        )
                      })}

                      <Box
                        mt={2}
                        width={{ xs: '100%', sm: '92%' }}
                        display="flex"
                        alignItems="flex-end"
                        justifyContent="flex-end"
                      >
                        <Button
                          className="text-transform-none"
                          color="primary"
                          disableElevation
                          disabled={
                            values.fee_line_items[values.fee_line_items.length - 1].fli_name ===
                              '' ||
                            values.fee_line_items[values.fee_line_items.length - 1].fli_amount ===
                              ''
                          }
                          data-id={1}
                          onClick={() => {
                            setFieldValue('fee_line_items', [
                              ...values.fee_line_items,
                              {
                                fli_name: '',
                                fli_amount: '',
                              },
                            ])
                          }}
                          startIcon={<Plus width={16} height={16} />}
                        >
                          {t('addMore')}
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        display="flex"
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                        justifyContent="flex-start"
                        flexDirection={{ xs: 'column', sm: 'row' }}
                      >
                        <Box className="custom-checkbox">
                          <FormControlLabel
                            control={
                              <CheckboxWithGreenCheck
                                checked={values.fee_shipping_fee}
                                onChange={(e) => {
                                  setFieldValue('fee_shipping_fee', e.target.checked)
                                }}
                                checkedIcon={<Check />}
                                color="primary"
                                id="fee_shipping_fee"
                                name="fee_shipping_fee"
                              />
                            }
                            label={t('fields:enableShippingFee')}
                          />
                        </Box>
                        <Box ml={{ xs: 0, sm: 2 }} className="custom-checkbox">
                          <FormControlLabel
                            control={
                              <CheckboxWithGreenCheck
                                checked={values.fee_hide_fee}
                                onChange={(e) => {
                                  setFieldValue('fee_hide_fee', e.target.checked)
                                }}
                                checkedIcon={<Check />}
                                color="primary"
                                id="fee_hide_fee"
                                name="fee_hide_fee"
                              />
                            }
                            label={t('fields:hideFee')}
                          />
                        </Box>
                      </Box>
                    </Grid>
                    {values.fee_shipping_fee && (
                      <Fade left>
                        <Box
                          fontWeight={500}
                          fontSize={14}
                          ml={1.5}
                          className="text-secondary"
                          tabIndex={0}
                        >
                          (
                          {t('programShippingFeeMessage', {
                            amount: t('with$', {
                              amount: programDetail.pgm_shipping_fee,
                            }),
                          })}
                          )
                        </Box>
                      </Fade>
                    )}
                    <Grid item xs={12}>
                      <Grid
                        container
                        spacing={3}
                        display="flex"
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid item xs={12} sm={6}>
                          <Box component="div" display="flex" alignItems="center" tabIndex={0}>
                            <Box component="span" fontSize="16px" fontWeight="600">
                              {t('fields:finalFee') + ':'}
                            </Box>
                            <Box fontSize="24px" mx={1} component="span" fontWeight="500">
                              {t('fields:currency')} {getFinalFee(values, programDetail)}
                            </Box>

                            <Tooltip title={t('fields:finalPriceInfo')} placement="top">
                              <Info className="help-icon" width={18} height={18} />
                            </Tooltip>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
                            <Box component="span" fontWeight="600">
                              {t('fields:feePerInstallment')}
                            </Box>
                            <Box component="span" className="mandatory">
                              {t('fields:mandatory')}
                            </Box>
                          </Typography>
                          <Field
                            className="custom-input-field"
                            name="fee_per_installment"
                            as={TextField}
                            variant="outlined"
                            fullWidth
                            size="small"
                            id="fee_per_installment"
                            value={decimalFinalFee(values, programDetail) || 0}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Tooltip
                                    title={t('fields:feePerInstallmentHelp')}
                                    placement="top"
                                  >
                                    <HelpCircle className="help-icon" />
                                  </Tooltip>
                                </InputAdornment>
                              ),
                              startAdornment: (
                                <InputAdornment position="start">
                                  {t('fields:currency')}
                                </InputAdornment>
                              ),
                            }}
                            label={
                              <span style={visuallyHidden}>
                                ({t('fields:feePerInstallment')}) ({t('fields:required')}) (
                                {t('fields:feePerInstallmentHelp')})
                              </span>
                            }
                          />
                          <ErrorMessage name="fee_per_installment">
                            {(msg) => (
                              <span className="error" tabIndex={0}>
                                {t(msg, {
                                  field: t('fields:feePerInstallment'),
                                })}
                              </span>
                            )}
                          </ErrorMessage>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
                        <Box component="span" fontWeight="600">
                          {t('fields:discountNote')}
                        </Box>
                        <Box component="span" className="optional">
                          ({t('fields:optional')})
                        </Box>
                      </Typography>
                      <Field
                        className="custom-input-field"
                        multiline
                        rows={2}
                        rowsMax={3}
                        name="fee_discount_note"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="fee_discount_note"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title={t('fields:discountNoteHelp')} placement="top">
                                <HelpCircle className="help-icon" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        label={
                          <span style={visuallyHidden}>
                            ({t('fields:discountNote')}) ({t('fields:optional')}) (
                            {t('fields:discountNoteHelp')})
                          </span>
                        }
                      />
                      <ErrorMessage name="fee_discount_note">
                        {(msg) => (
                          <span className="error" tabIndex={0}>
                            {t(msg, { field: t('fields:feePerInstallment') })}
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

AddNewFeeStructure.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  addProgramFees: PropTypes.func,
  actionType: PropTypes.func,
  programfeeDetail: PropTypes.object,
  programDetail: PropTypes.object,
}

AddNewFeeStructure.defaultProps = {
  open: false,
  onClose: () => {},
  addProgramFees: () => {},
  actionType: () => {},
  programfeeDetail: {},
  programDetail: {},
}

export default AddNewFeeStructure
