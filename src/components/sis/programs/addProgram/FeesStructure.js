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
import { withStyles } from '@material-ui/core/styles'
import { visuallyHidden } from '@mui/utils'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { Check, HelpCircle, Info, Plus, Trash } from 'react-feather'
import { useTranslation } from 'react-i18next'
import Fade from 'react-reveal/Fade'

import { CoreSchema } from '../../../../../clientFiles/validations'
import { get } from '../../../../helpers/utils'
import { decimalFinalFee, getFinalFee } from '../../../../helpers/utils'
import useStyles from '../Programs.Style'
const CheckboxWithGreenCheck = withStyles({})(Checkbox)

function FeeStructure({ addProgramFees, program }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const initialState = {
    fee_payable_entity: 'program',
    fee_payable_id: program.pgm_id,
    fee_name: '',
    fee_payment_full: false,
    fee_installment_count: '',
    fee_installment_duration: '',
    fee_per_installment: '',
    fee_line_items: [
      {
        fli_name: '',
        fli_amount: 0,
      },
    ],
    fee_shipping_fee: false,
    fee_hide_fee: false,
    fee_discount_note: '',
  }
  const onSubmit = function (values, { setErrors }) {
    addProgramFees(values, { setErrors })
  }

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialState}
      validationSchema={CoreSchema.addProgramFee}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form className={classes.form} noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={8} xl={8}>
                <Box mb={2} width="100%">
                  <Typography
                    component=""
                    align="left"
                    variant="body2"
                    color="primary"
                    className="bg-color-surface"
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600" fontSize="16px">
                      {t('feeStructure')}
                    </Box>
                  </Typography>
                </Box>

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
                    <Box mt={3} minWidth={{ xs: 'auto', sm: 'auto', md: '150px' }} align="left">
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
                  {!values.fee_payment_full ? (
                    <>
                      <Grid item xs={12} sm={6}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
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
                          fullWidth
                          size="small"
                          id="fee_installment_count"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:numberInstallmentsHelp')} placement="top">
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
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
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
                  ) : null}
                  <Grid item xs={12}>
                    {get(values, 'fee_line_items', []).map((feeItem, index) => {
                      return (
                        <Grid container spacing={3} justify="flex-start" key={`${index}`}>
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
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:feeName')}) ({t('fields:required')}) (
                                  {t('fields:feeNameHelp')})
                                </span>
                              }
                              className="custom-input-field"
                              as={TextField}
                              variant="outlined"
                              fullWidth
                              size="small"
                              type="text"
                              id={`fee_line_items[${index}].fli_name`}
                              name={`fee_line_items[${index}].fli_name`}
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
                              as={TextField}
                              className={classes.selectIcon + ' custom-input-field'}
                              id="fee_line_items[fli_amount]"
                              name={`fee_line_items[${index}].fli_amount`}
                              value={feeItem.fli_amount}
                              type="number"
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
                              }}
                              defaultValue=""
                              variant="outlined"
                              size="small"
                              pr={0}
                              fullWidth
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
                              label={
                                <span style={visuallyHidden}>
                                  ({t('fields:amount')}) ({t('fields:required')}) (
                                  {t('fields:amountHelp')})
                                </span>
                              }
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
                            <Grid item xs="auto" sm={1} className={classes.removeField2}>
                              <Box mt={{ xs: 4, sm: 3.5 }}>
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
                          values.fee_line_items[values.fee_line_items.length - 1].fli_name === '' ||
                          values.fee_line_items[values.fee_line_items.length - 1].fli_amount === ''
                        }
                        data-id={1}
                        onClick={() => {
                          let newValues = [...values.fee_line_items]
                          newValues.push({
                            fli_name: '',
                            fli_amount: '',
                          })
                          setFieldValue('fee_line_items', newValues)
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
                      alignItems="center"
                      justifyContent="flex-start"
                      flexDirection-={{ xs: 'column', sm: 'row' }}
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
                              name="fee_hide_fee"
                              id="fee_hide_fee"
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
                        tabIndex={0}
                        fontWeight={500}
                        fontSize={14}
                        ml={1.5}
                        className="text-secondary"
                      >
                        (
                        {t('programShippingFeeMessage', {
                          amount: t('with$', {
                            amount: program.pgm_shipping_fee,
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
                            {t('fields:currency')} {getFinalFee(values, program)}
                          </Box>

                          <Tooltip title={t('fields:finalPriceInfo')} placement="top">
                            <Info className="help-icon" width={18} height={18} />
                          </Tooltip>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
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
                          value={decimalFinalFee(values, program) || 0}
                          id="fee_per_installment"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={t('fields:feePerInstallmentHelp')} placement="top">
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
                              {t(msg, { field: t('fields:feePerInstallment') })}
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
                  </Grid>
                </Grid>

                <Box
                  mt={3}
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  flexDirection="row"
                >
                  {/* <Box mr={1}>
                    <Button
                      onClick={handleBack}
                      className="custom-default-button text-transform-none"
                      size="large"
                      variant="contained"
                      disableElevation
                    >
                      {t('previous')}
                    </Button>
                  </Box> */}
                  <Button
                    className="text-transform-none"
                    size="large"
                    variant="contained"
                    disableElevation
                    color="primary"
                    type="submit"
                  >
                    {t('save')}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

FeeStructure.propTypes = {
  handleBack: PropTypes.func,
  addProgramFees: PropTypes.func,
  program: PropTypes.object,
}

FeeStructure.defaultProps = {
  handleBack: () => {},
  addProgramFees: () => {},
  program: {},
}

export default FeeStructure
